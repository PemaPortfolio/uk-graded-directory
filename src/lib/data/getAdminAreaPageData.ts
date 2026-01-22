import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

export interface AdminAreaData {
  id: string
  name: string
  slug: string
  h1_heading: string | null
  intro_paragraph: string | null
  seo_title: string | null
  seo_meta_description: string | null
  latitude: number | null
  longitude: number | null
  place_count: number
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

export interface PlaceInArea {
  id: string
  name: string
  slug: string
  place_type: string
  population: number | null
  store_count: number
  provider_count: number
}

export interface CategoryBasic {
  id: string
  name: string
  name_plural: string
  slug: string
  icon: string | null
}

export interface NearbyAdminArea {
  id: string
  name: string
  slug: string
  place_count: number
  store_count: number
  provider_count: number
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface AdminAreaPageData {
  adminArea: AdminAreaData
  country: CountryInfo
  places: PlaceInArea[]
  categories: CategoryBasic[]
  nearbyAdminAreas: NearbyAdminArea[]
  faqs: FAQ[]
  totalStores: number
  totalProviders: number
}

/**
 * Fetch all data needed for an admin area page
 */
export const getAdminAreaPageData = cache(
  async (countrySlug: string, adminAreaSlug: string): Promise<AdminAreaPageData | null> => {
    const supabase = await createClient()

    // 1. Get admin area with country info
    const { data: adminAreaData, error: adminAreaError } = await supabase
      .from('admin_areas')
      .select(
        `
        id,
        name,
        slug,
        h1_heading,
        intro_paragraph,
        seo_title,
        seo_meta_description,
        latitude,
        longitude,
        place_count,
        store_count,
        provider_count,
        is_active,
        is_indexable,
        countries!inner (
          id,
          name,
          slug,
          flag_emoji
        )
      `
      )
      .eq('slug', adminAreaSlug)
      .eq('is_active', true)
      .single()

    if (adminAreaError || !adminAreaData) {
      console.error('Error fetching admin area:', adminAreaError)
      return null
    }

    // Extract country info
    const countryData = Array.isArray(adminAreaData.countries)
      ? adminAreaData.countries[0]
      : adminAreaData.countries

    // Verify country slug matches
    if (countryData?.slug !== countrySlug) {
      console.error('Country slug mismatch for admin area')
      return null
    }

    // 2. Get places within this admin area
    const { data: placesData } = await supabase
      .from('places')
      .select(
        `
        id,
        name,
        slug,
        place_type,
        population,
        store_count,
        provider_count
      `
      )
      .eq('admin_area_id', adminAreaData.id)
      .eq('is_active', true)
      .order('store_count', { ascending: false })
      .order('population', { ascending: false, nullsFirst: false })

    // 3. Get categories (for browsing appliances in this area)
    const { data: categoriesData } = await supabase
      .from('appliance_categories')
      .select('id, name, name_plural, slug, icon')
      .is('parent_id', null)
      .eq('is_active', true)
      .in('tier', ['tier_1', 'tier_2'])
      .order('display_order')
      .limit(8)

    // 4. Get nearby admin areas (same country, excluding current)
    const { data: nearbyData } = await supabase
      .from('admin_areas')
      .select('id, name, slug, place_count, store_count, provider_count')
      .eq('country_id', countryData.id)
      .eq('is_active', true)
      .neq('id', adminAreaData.id)
      .gt('place_count', 0)
      .order('store_count', { ascending: false })
      .order('place_count', { ascending: false })
      .limit(8)

    // 5. Get FAQs
    const { data: faqsData } = await supabase
      .from('faqs')
      .select('id, question, answer')
      .eq('is_active', true)
      .eq('is_repair_faq', false)
      .order('display_order')
      .limit(6)

    // Calculate totals from places
    const totalStores = placesData?.reduce((sum, p) => sum + (p.store_count || 0), 0) || 0
    const totalProviders = placesData?.reduce((sum, p) => sum + (p.provider_count || 0), 0) || 0

    return {
      adminArea: {
        id: adminAreaData.id,
        name: adminAreaData.name,
        slug: adminAreaData.slug,
        h1_heading: adminAreaData.h1_heading,
        intro_paragraph: adminAreaData.intro_paragraph,
        seo_title: adminAreaData.seo_title,
        seo_meta_description: adminAreaData.seo_meta_description,
        latitude: adminAreaData.latitude,
        longitude: adminAreaData.longitude,
        place_count: adminAreaData.place_count,
        store_count: adminAreaData.store_count,
        provider_count: adminAreaData.provider_count,
        is_active: adminAreaData.is_active,
        is_indexable: adminAreaData.is_indexable,
      },
      country: {
        id: countryData.id,
        name: countryData.name,
        slug: countryData.slug,
        flag_emoji: countryData.flag_emoji,
      },
      places: placesData || [],
      categories: categoriesData || [],
      nearbyAdminAreas: nearbyData || [],
      faqs: faqsData || [],
      totalStores,
      totalProviders,
    }
  }
)

/**
 * Safe version that catches errors and returns null
 */
export async function getAdminAreaPageDataSafe(
  countrySlug: string,
  adminAreaSlug: string
): Promise<AdminAreaPageData | null> {
  try {
    return await getAdminAreaPageData(countrySlug, adminAreaSlug)
  } catch (error) {
    console.error('Error in getAdminAreaPageDataSafe:', error)
    return null
  }
}

/**
 * Check if a slug is a valid admin area slug (not matching any place)
 */
export const isAdminAreaSlug = cache(async (slug: string): Promise<boolean> => {
  const supabase = await createClient()

  // First check if it's a place slug
  const { data: placeData } = await supabase
    .from('places')
    .select('id')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle()

  // If it's a place, it's not an admin area page
  if (placeData) {
    return false
  }

  // Check if it's an admin area slug
  const { data: adminAreaData } = await supabase
    .from('admin_areas')
    .select('id')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle()

  return !!adminAreaData
})
