import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

// Types for Search Results

export interface SearchResultStore {
  id: string
  name: string
  slug: string
  short_description: string | null
  city_name: string | null
  postcode: string | null
  average_rating: number | null
  review_count: number
  is_verified: boolean
  is_featured: boolean
  has_delivery_nationwide: boolean
  has_delivery_local: boolean
  logo_url: string | null
  country_slug: string | null
  city_slug: string | null
}

export interface SearchResultProvider {
  id: string
  name: string
  slug: string
  short_description: string | null
  city_name: string | null
  postcode: string | null
  average_rating: number | null
  review_count: number
  is_verified: boolean
  is_featured: boolean
  offers_same_day: boolean
  offers_emergency: boolean
  callout_fee_from: number | null
  country_slug: string | null
  city_slug: string | null
}

export interface SearchResultCategory {
  id: string
  name: string
  name_plural: string | null
  name_singular: string | null
  slug: string
  icon: string | null
  supports_repair: boolean
}

export interface SearchResultBrand {
  id: string
  name: string
  slug: string
  logo_url: string | null
  tier: string
}

export interface SearchResultPlace {
  id: string
  name: string
  slug: string
  country_slug: string
  store_count?: number
  provider_count?: number
}

export interface SearchResults {
  query: string
  filter: 'all' | 'buy' | 'repair'
  location: SearchResultPlace | null
  stores: SearchResultStore[]
  providers: SearchResultProvider[]
  matchedCategories: SearchResultCategory[]
  matchedBrands: SearchResultBrand[]
  suggestedPlaces: SearchResultPlace[]
  totalStores: number
  totalProviders: number
}

/**
 * Parse search filter type from URL parameter
 */
export function parseFilterType(type: string | undefined): 'all' | 'buy' | 'repair' {
  if (type === 'buy' || type === 'repair') return type
  return 'all'
}

/**
 * Fetch search results
 */
export const getSearchResults = cache(
  async (
    query: string,
    locationSlug: string | null,
    filterType: 'all' | 'buy' | 'repair'
  ): Promise<SearchResults> => {
    const supabase = await createClient()
    const queryLower = query.toLowerCase().trim()

    // Initialize results
    let location: SearchResultPlace | null = null
    let stores: SearchResultStore[] = []
    let providers: SearchResultProvider[] = []
    let matchedCategories: SearchResultCategory[] = []
    let matchedBrands: SearchResultBrand[] = []
    let suggestedPlaces: SearchResultPlace[] = []

    // 1. Get location if specified
    if (locationSlug) {
      const { data: placeData } = await supabase
        .from('places')
        .select(`
          id, name, slug,
          countries!inner (slug)
        `)
        .eq('slug', locationSlug)
        .eq('is_active', true)
        .single()

      if (placeData) {
        const country = Array.isArray(placeData.countries)
          ? placeData.countries[0]
          : placeData.countries
        location = {
          id: placeData.id,
          name: placeData.name,
          slug: placeData.slug,
          country_slug: country?.slug || 'england',
        }
      }
    }

    // 2. Search for matching categories
    if (queryLower.length > 0) {
      const { data: categoriesData } = await supabase
        .from('appliance_categories')
        .select('id, name, name_plural, name_singular, slug, icon, supports_repair')
        .eq('is_active', true)
        .or(`name.ilike.%${queryLower}%,name_plural.ilike.%${queryLower}%,name_singular.ilike.%${queryLower}%`)
        .limit(5)

      matchedCategories = (categoriesData || []) as SearchResultCategory[]
    }

    // 3. Search for matching brands
    if (queryLower.length > 0) {
      const { data: brandsData } = await supabase
        .from('brands')
        .select('id, name, slug, logo_url, tier')
        .eq('is_active', true)
        .ilike('name', `%${queryLower}%`)
        .limit(5)

      matchedBrands = (brandsData || []) as SearchResultBrand[]
    }

    // 4. Search for stores (if filter is 'all' or 'buy')
    if (filterType === 'all' || filterType === 'buy') {
      let storeQuery = supabase
        .from('stores')
        .select(`
          id, name, slug, short_description,
          city_name, postcode, average_rating, review_count,
          is_verified, is_featured,
          has_delivery_nationwide, has_delivery_local, logo_url,
          places!inner (slug, countries!inner (slug))
        `)
        .eq('is_active', true)
        .in('status', ['active', 'claimed', 'verified'])

      // Filter by location if provided
      if (location) {
        storeQuery = storeQuery.eq('places.id', location.id)
      }

      // Search by name if query provided
      if (queryLower.length > 0) {
        storeQuery = storeQuery.or(`name.ilike.%${queryLower}%,short_description.ilike.%${queryLower}%`)
      }

      const { data: storesData } = await storeQuery
        .order('is_featured', { ascending: false })
        .order('average_rating', { ascending: false, nullsFirst: false })
        .limit(20)

      stores = (storesData || []).map((store) => {
        const place = Array.isArray(store.places) ? store.places[0] : store.places
        const country = place?.countries
          ? (Array.isArray(place.countries) ? place.countries[0] : place.countries)
          : null

        return {
          id: store.id,
          name: store.name,
          slug: store.slug,
          short_description: store.short_description,
          city_name: store.city_name,
          postcode: store.postcode,
          average_rating: store.average_rating,
          review_count: store.review_count,
          is_verified: store.is_verified,
          is_featured: store.is_featured,
          has_delivery_nationwide: store.has_delivery_nationwide,
          has_delivery_local: store.has_delivery_local,
          logo_url: store.logo_url,
          country_slug: country?.slug || null,
          city_slug: place?.slug || null,
        }
      })
    }

    // 5. Search for providers (if filter is 'all' or 'repair')
    if (filterType === 'all' || filterType === 'repair') {
      let providerQuery = supabase
        .from('service_providers')
        .select(`
          id, name, slug, short_description,
          city_name, postcode, average_rating, review_count,
          is_verified, is_featured,
          offers_same_day, offers_emergency, callout_fee_from,
          provider_coverage_places!inner (
            places!inner (slug, countries!inner (slug))
          )
        `)
        .eq('is_active', true)
        .in('status', ['active', 'claimed', 'verified'])

      // Filter by location if provided
      if (location) {
        providerQuery = providerQuery.eq('provider_coverage_places.place_id', location.id)
      }

      // Search by name if query provided
      if (queryLower.length > 0) {
        providerQuery = providerQuery.or(`name.ilike.%${queryLower}%,short_description.ilike.%${queryLower}%`)
      }

      const { data: providersData } = await providerQuery
        .order('is_featured', { ascending: false })
        .order('average_rating', { ascending: false, nullsFirst: false })
        .limit(20)

      providers = (providersData || []).map((provider) => {
        const coverage = Array.isArray(provider.provider_coverage_places)
          ? provider.provider_coverage_places[0]
          : provider.provider_coverage_places
        const place = coverage?.places
          ? (Array.isArray(coverage.places) ? coverage.places[0] : coverage.places)
          : null
        const country = place?.countries
          ? (Array.isArray(place.countries) ? place.countries[0] : place.countries)
          : null

        return {
          id: provider.id,
          name: provider.name,
          slug: provider.slug,
          short_description: provider.short_description,
          city_name: provider.city_name,
          postcode: provider.postcode,
          average_rating: provider.average_rating,
          review_count: provider.review_count,
          is_verified: provider.is_verified,
          is_featured: provider.is_featured,
          offers_same_day: provider.offers_same_day,
          offers_emergency: provider.offers_emergency,
          callout_fee_from: provider.callout_fee_from,
          country_slug: country?.slug || null,
          city_slug: place?.slug || null,
        }
      })
    }

    // 6. Get suggested places if no location specified and few results
    if (!location && (stores.length < 5 || providers.length < 5)) {
      const { data: placesData } = await supabase
        .from('places')
        .select(`
          id, name, slug,
          countries!inner (slug)
        `)
        .eq('is_active', true)
        .order('population', { ascending: false })
        .limit(6)

      suggestedPlaces = (placesData || []).map((place) => {
        const country = Array.isArray(place.countries)
          ? place.countries[0]
          : place.countries
        return {
          id: place.id,
          name: place.name,
          slug: place.slug,
          country_slug: country?.slug || 'england',
        }
      })
    }

    return {
      query,
      filter: filterType,
      location,
      stores,
      providers,
      matchedCategories,
      matchedBrands,
      suggestedPlaces,
      totalStores: stores.length,
      totalProviders: providers.length,
    }
  }
)

/**
 * Get search results with error handling
 */
export async function getSearchResultsSafe(
  query: string,
  locationSlug: string | null,
  filterType: 'all' | 'buy' | 'repair'
): Promise<SearchResults> {
  try {
    return await getSearchResults(query, locationSlug, filterType)
  } catch (error) {
    console.error('Error fetching search results:', error)
    return {
      query,
      filter: filterType,
      location: null,
      stores: [],
      providers: [],
      matchedCategories: [],
      matchedBrands: [],
      suggestedPlaces: [],
      totalStores: 0,
      totalProviders: 0,
    }
  }
}
