import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

// Types for Individual Brand Page

export interface Brand {
  id: string
  name: string
  slug: string
  logo_url: string | null
  description: string | null
  tier: 'premium' | 'mid_range' | 'value'
  website: string | null
  country_of_origin: string | null
  has_authorised_network: boolean
  store_count: number
  provider_count: number
  popularity_score: number
}

export interface Country {
  id: string
  name: string
  slug: string
  flag_emoji: string | null
}

export interface CityWithCounts {
  id: string
  name: string
  slug: string
  country_slug: string
  store_count: number
  provider_count: number
}

export interface CountryWithCities {
  country: Country
  cities: CityWithCounts[]
}

export interface CategoryWithCounts {
  id: string
  name: string
  name_plural: string | null
  slug: string
  icon: string | null
  store_count: number
}

export interface StorePreview {
  id: string
  business_name: string
  slug: string
  city_name: string | null
  country_slug: string
  average_rating: number | null
  review_count: number
  is_verified: boolean
}

export interface BrandPageStats {
  totalStores: number
  totalProviders: number
  totalCities: number
  hasAuthorisedNetwork: boolean
}

export interface BrandPageData {
  brand: Brand
  citiesByCountry: CountryWithCities[]
  popularCities: CityWithCounts[]
  topStores: StorePreview[]
  categories: CategoryWithCounts[]
  otherBrands: Brand[]
  stats: BrandPageStats
  isIndexable: boolean
}

/**
 * Fetch all data for an individual brand page
 */
export const getBrandPageData = cache(
  async (brandSlug: string): Promise<BrandPageData | null> => {
    const supabase = await createClient()

    // 1. Get brand details
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('*')
      .eq('slug', brandSlug)
      .eq('is_active', true)
      .single()

    if (brandError || !brand) {
      console.error('Error fetching brand:', brandError)
      return null
    }

    // 2. Get stores with this brand
    const { data: storesWithBrand } = await supabase
      .from('store_brands')
      .select(`
        store_id,
        stores!inner (
          id,
          business_name,
          slug,
          city_name,
          average_rating,
          review_count,
          is_active,
          status,
          place_id,
          places!inner (
            id,
            name,
            slug,
            countries!inner (
              id,
              name,
              slug,
              flag_emoji
            )
          )
        )
      `)
      .eq('brand_id', brand.id)
      .eq('has_current_stock', true)

    // Filter active stores
    const activeStores = (storesWithBrand || [])
      .filter((sb) => {
        const store = sb.stores as any
        return store?.is_active && ['active', 'claimed', 'verified'].includes(store?.status)
      })
      .map((sb) => sb.stores as any)

    // 3. Build cities with counts
    const cityMap = new Map<string, CityWithCounts>()
    const countryMap = new Map<string, Country>()

    activeStores.forEach((store) => {
      const place = store.places
      const country = place?.countries

      if (!place || !country) return

      // Track country
      if (!countryMap.has(country.slug)) {
        countryMap.set(country.slug, {
          id: country.id,
          name: country.name,
          slug: country.slug,
          flag_emoji: country.flag_emoji,
        })
      }

      // Track city
      const cityKey = `${country.slug}/${place.slug}`
      if (!cityMap.has(cityKey)) {
        cityMap.set(cityKey, {
          id: place.id,
          name: place.name,
          slug: place.slug,
          country_slug: country.slug,
          store_count: 0,
          provider_count: 0,
        })
      }

      const city = cityMap.get(cityKey)!
      city.store_count += 1
    })

    // 4. Get providers with this brand authorization
    const { data: providersWithBrand } = await supabase
      .from('provider_brand_authorisations')
      .select(`
        provider_id,
        service_providers!inner (
          id,
          is_active,
          status,
          place_id,
          places!inner (
            id,
            name,
            slug,
            countries!inner (
              slug
            )
          )
        )
      `)
      .eq('brand_id', brand.id)

    // Add provider counts to cities
    const activeProviders = (providersWithBrand || [])
      .filter((pb) => {
        const provider = pb.service_providers as any
        return provider?.is_active && ['active', 'claimed', 'verified'].includes(provider?.status)
      })

    activeProviders.forEach((pb) => {
      const provider = pb.service_providers as any
      const place = provider?.places
      const country = place?.countries

      if (!place || !country) return

      const cityKey = `${country.slug}/${place.slug}`
      if (cityMap.has(cityKey)) {
        const city = cityMap.get(cityKey)!
        city.provider_count += 1
      }
    })

    // 5. Group cities by country
    const countries = Array.from(countryMap.values())
    const citiesArray = Array.from(cityMap.values())

    const citiesByCountry: CountryWithCities[] = countries
      .map((country) => ({
        country,
        cities: citiesArray
          .filter((c) => c.country_slug === country.slug)
          .sort((a, b) => b.store_count - a.store_count),
      }))
      .filter((group) => group.cities.length > 0)
      .sort((a, b) => {
        // Sort by total stores in country
        const aTotal = a.cities.reduce((sum, c) => sum + c.store_count, 0)
        const bTotal = b.cities.reduce((sum, c) => sum + c.store_count, 0)
        return bTotal - aTotal
      })

    // 6. Get top 12 cities by store count
    const popularCities = [...citiesArray]
      .sort((a, b) => b.store_count - a.store_count)
      .slice(0, 12)

    // 7. Get top stores for this brand
    const topStores: StorePreview[] = activeStores
      .sort((a, b) => {
        // Verified first, then by rating
        if (a.status === 'verified' && b.status !== 'verified') return -1
        if (b.status === 'verified' && a.status !== 'verified') return 1
        return (b.average_rating || 0) - (a.average_rating || 0)
      })
      .slice(0, 6)
      .map((store) => ({
        id: store.id,
        business_name: store.business_name,
        slug: store.slug,
        city_name: store.city_name || store.places?.name || null,
        country_slug: store.places?.countries?.slug || 'england',
        average_rating: store.average_rating,
        review_count: store.review_count || 0,
        is_verified: store.status === 'verified',
      }))

    // 8. Get categories with store counts for this brand
    const { data: storeCategories } = await supabase
      .from('store_categories')
      .select(`
        category_id,
        store_id,
        appliance_categories!inner (
          id,
          name,
          name_plural,
          slug,
          icon,
          is_active
        )
      `)
      .eq('has_current_stock', true)
      .in(
        'store_id',
        activeStores.map((s) => s.id)
      )

    // Count stores per category
    const categoryMap = new Map<string, CategoryWithCounts>()

    ;(storeCategories || []).forEach((sc) => {
      const cat = sc.appliance_categories as any
      if (!cat?.is_active) return

      if (!categoryMap.has(cat.id)) {
        categoryMap.set(cat.id, {
          id: cat.id,
          name: cat.name,
          name_plural: cat.name_plural,
          slug: cat.slug,
          icon: cat.icon,
          store_count: 0,
        })
      }

      categoryMap.get(cat.id)!.store_count += 1
    })

    const categories = Array.from(categoryMap.values())
      .sort((a, b) => b.store_count - a.store_count)
      .slice(0, 8)

    // 9. Get other brands (same tier)
    const { data: otherBrands } = await supabase
      .from('brands')
      .select('id, name, slug, logo_url, tier, store_count, provider_count, has_authorised_network, country_of_origin, popularity_score, description, website')
      .eq('is_active', true)
      .eq('tier', brand.tier)
      .neq('id', brand.id)
      .gt('store_count', 0)
      .order('popularity_score', { ascending: false })
      .limit(6)

    // 10. Compute stats
    const totalStores = activeStores.length
    const totalProviders = activeProviders.length
    const totalCities = citiesArray.length

    // 11. Check indexability (minimum 2 stores)
    const isIndexable = totalStores >= 2

    const brandData: Brand = {
      id: brand.id,
      name: brand.name,
      slug: brand.slug,
      logo_url: brand.logo_url,
      description: brand.description,
      tier: brand.tier as 'premium' | 'mid_range' | 'value',
      website: brand.website,
      country_of_origin: brand.country_of_origin,
      has_authorised_network: brand.has_authorised_network || false,
      store_count: totalStores,
      provider_count: totalProviders,
      popularity_score: brand.popularity_score || 0,
    }

    return {
      brand: brandData,
      citiesByCountry,
      popularCities,
      topStores,
      categories,
      otherBrands: (otherBrands || []).map((b) => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        logo_url: b.logo_url,
        description: b.description,
        tier: b.tier as 'premium' | 'mid_range' | 'value',
        website: b.website,
        country_of_origin: b.country_of_origin,
        has_authorised_network: b.has_authorised_network || false,
        store_count: b.store_count || 0,
        provider_count: b.provider_count || 0,
        popularity_score: b.popularity_score || 0,
      })),
      stats: {
        totalStores,
        totalProviders,
        totalCities,
        hasAuthorisedNetwork: brand.has_authorised_network || false,
      },
      isIndexable,
    }
  }
)

/**
 * Get brand page data with fallback
 */
export async function getBrandPageDataSafe(
  brandSlug: string
): Promise<BrandPageData | null> {
  try {
    return await getBrandPageData(brandSlug)
  } catch (error) {
    console.error('Error fetching brand page data:', error)
    return null
  }
}

/**
 * Get all brand slugs for static generation
 */
export async function getAllBrandSlugs(): Promise<string[]> {
  const supabase = await createClient()

  const { data: brands } = await supabase
    .from('brands')
    .select('slug')
    .eq('is_active', true)

  return (brands || []).map((b) => b.slug)
}
