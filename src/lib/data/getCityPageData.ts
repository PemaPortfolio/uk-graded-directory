import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

export interface CityData {
  id: string
  name: string
  slug: string
  place_type: string
  population: number | null
  latitude: number | null
  longitude: number | null
  h1_heading: string | null
  intro_paragraph: string | null
  seo_title: string | null
  seo_meta_description: string | null
  store_count: number
  provider_count: number
  is_active: boolean
  is_indexable: boolean
}

export interface CountryInfo {
  id: string
  name: string
  slug: string
  flag_emoji: string
}

export interface AdminAreaInfo {
  id: string
  name: string
  slug: string
}

export interface StoreBasic {
  id: string
  business_name: string
  slug: string
  short_description: string | null
  address_line1: string | null
  postcode: string | null
  phone: string | null
  website: string | null
  logo_url: string | null
  average_rating: number | null
  review_count: number
  is_featured: boolean
  status: string
  offers_delivery: boolean
  offers_free_delivery: boolean
  warranty_months: number | null
  offers_finance: boolean
}

export interface ProviderBasic {
  id: string
  business_name: string
  slug: string
  short_description: string | null
  phone: string | null
  average_rating: number | null
  review_count: number
  is_gas_safe: boolean
  offers_same_day: boolean
  callout_fee: number | null
}

export interface NearbyCity {
  id: string
  name: string
  slug: string
  store_count: number
  provider_count: number
  country_slug: string
}

export interface CategoryBasic {
  id: string
  name: string
  name_plural: string
  slug: string
  icon: string | null
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface CityPageData {
  city: CityData
  country: CountryInfo
  adminArea: AdminAreaInfo | null
  stores: StoreBasic[]
  providers: ProviderBasic[]
  nearbyCities: NearbyCity[]
  categories: CategoryBasic[]
  faqs: FAQ[]
}

/**
 * Fetch all data needed for a city hub page
 */
export const getCityPageData = cache(
  async (countrySlug: string, citySlug: string): Promise<CityPageData | null> => {
    const supabase = await createClient()

    // 1. Get city/place with country info
    const { data: placeData, error: placeError } = await supabase
      .from('places')
      .select(
        `
        id,
        name,
        slug,
        place_type,
        population,
        latitude,
        longitude,
        h1_heading,
        intro_paragraph,
        seo_title,
        seo_meta_description,
        store_count,
        provider_count,
        is_active,
        is_indexable,
        countries!inner (
          id,
          name,
          slug,
          flag_emoji
        ),
        admin_areas (
          id,
          name,
          slug
        )
      `
      )
      .eq('slug', citySlug)
      .eq('is_active', true)
      .single()

    if (placeError || !placeData) {
      console.error('Error fetching place:', placeError)
      return null
    }

    // Extract country info (handle array from Supabase)
    const countryData = Array.isArray(placeData.countries)
      ? placeData.countries[0]
      : placeData.countries

    // Verify country slug matches
    if (countryData?.slug !== countrySlug) {
      console.error('Country slug mismatch')
      return null
    }

    // Extract admin area info
    const adminAreaData = Array.isArray(placeData.admin_areas)
      ? placeData.admin_areas[0]
      : placeData.admin_areas

    // 2. Get stores in this city
    const { data: storesData } = await supabase
      .from('stores')
      .select(
        `
        id,
        business_name,
        slug,
        short_description,
        address_line1,
        postcode,
        phone,
        website,
        logo_url,
        average_rating,
        review_count,
        is_featured,
        status,
        offers_delivery,
        offers_free_delivery,
        warranty_months,
        offers_finance
      `
      )
      .eq('place_id', placeData.id)
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .order('average_rating', { ascending: false, nullsFirst: false })
      .limit(20)

    // 3. Get providers in this city
    const { data: providersData } = await supabase
      .from('service_providers')
      .select(
        `
        id,
        business_name,
        slug,
        short_description,
        phone,
        average_rating,
        review_count,
        is_gas_safe,
        offers_same_day,
        callout_fee
      `
      )
      .eq('place_id', placeData.id)
      .eq('is_active', true)
      .order('average_rating', { ascending: false, nullsFirst: false })
      .limit(10)

    // 4. Get nearby cities (same country, ordered by population)
    const { data: nearbyCitiesData } = await supabase
      .from('places')
      .select('id, name, slug, store_count, provider_count')
      .eq('country_id', countryData.id)
      .eq('is_active', true)
      .neq('id', placeData.id)
      .order('store_count', { ascending: false })
      .order('population', { ascending: false })
      .limit(8)

    // 5. Get categories
    const { data: categoriesData } = await supabase
      .from('appliance_categories')
      .select('id, name, name_plural, slug, icon')
      .is('parent_id', null)
      .eq('is_active', true)
      .in('tier', ['tier_1', 'tier_2'])
      .order('display_order')
      .limit(8)

    // 6. Get FAQs (general + location template)
    const { data: faqsData } = await supabase
      .from('faqs')
      .select('id, question, answer')
      .eq('is_active', true)
      .eq('is_repair_faq', false)
      .order('display_order')
      .limit(6)

    return {
      city: {
        id: placeData.id,
        name: placeData.name,
        slug: placeData.slug,
        place_type: placeData.place_type,
        population: placeData.population,
        latitude: placeData.latitude,
        longitude: placeData.longitude,
        h1_heading: placeData.h1_heading,
        intro_paragraph: placeData.intro_paragraph,
        seo_title: placeData.seo_title,
        seo_meta_description: placeData.seo_meta_description,
        store_count: placeData.store_count,
        provider_count: placeData.provider_count,
        is_active: placeData.is_active,
        is_indexable: placeData.is_indexable,
      },
      country: countryData as CountryInfo,
      adminArea: adminAreaData as AdminAreaInfo | null,
      stores: (storesData || []) as StoreBasic[],
      providers: (providersData || []) as ProviderBasic[],
      nearbyCities: (nearbyCitiesData || []).map((city) => ({
        ...city,
        country_slug: countrySlug,
      })) as NearbyCity[],
      categories: (categoriesData || []) as CategoryBasic[],
      faqs: (faqsData || []) as FAQ[],
    }
  }
)

/**
 * Get city page data with fallback for build time
 */
export async function getCityPageDataSafe(
  countrySlug: string,
  citySlug: string
): Promise<CityPageData | null> {
  try {
    return await getCityPageData(countrySlug, citySlug)
  } catch (error) {
    console.error('Error fetching city page data:', error)
    return null
  }
}
