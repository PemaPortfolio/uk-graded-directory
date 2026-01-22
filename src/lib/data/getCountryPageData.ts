import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

export interface CountryData {
  id: string
  name: string
  slug: string
  flag_emoji: string
  display_order: number
  seo_title: string | null
  seo_meta_description: string | null
  h1_heading: string | null
  intro_paragraph: string | null
  admin_area_count: number
  place_count: number
  store_count: number
  provider_count: number
  is_active: boolean
  is_indexable: boolean
}

export interface AdminArea {
  id: string
  name: string
  slug: string
  place_count: number
  store_count: number
  provider_count: number
}

export interface PopularCity {
  id: string
  name: string
  slug: string
  store_count: number
  provider_count: number
  population: number
}

export interface Category {
  id: string
  name: string
  name_plural: string
  slug: string
  icon: string | null
  tier: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface OtherCountry {
  name: string
  slug: string
  flag_emoji: string
  place_count: number
  store_count: number
  provider_count: number
}

export interface CountryPageData {
  country: CountryData
  adminAreas: AdminArea[]
  popularCities: PopularCity[]
  totalCities: number
  categories: Category[]
  faqs: FAQ[]
  otherCountries: OtherCountry[]
}

/**
 * Fetch all data needed for a country page
 * Cached with React cache() for deduplication
 */
export const getCountryPageData = cache(async (countrySlug: string): Promise<CountryPageData | null> => {
  const supabase = await createClient()

  // 1. Get country details
  const { data: country, error: countryError } = await supabase
    .from('countries')
    .select('*')
    .eq('slug', countrySlug)
    .eq('is_active', true)
    .single()

  if (countryError || !country) {
    console.error('Error fetching country:', countryError)
    return null
  }

  // 2. Get admin areas for this country
  const { data: adminAreas } = await supabase
    .from('admin_areas')
    .select('id, name, slug, place_count, store_count, provider_count')
    .eq('country_id', country.id)
    .eq('is_active', true)
    .order('name')

  // 3. Get popular cities (top 12 by store count, then by population)
  const { data: popularCities } = await supabase
    .from('places')
    .select('id, name, slug, store_count, provider_count, population')
    .eq('country_id', country.id)
    .eq('is_active', true)
    .order('store_count', { ascending: false })
    .order('population', { ascending: false })
    .limit(12)

  // 4. Get total cities count
  const { count: totalCities } = await supabase
    .from('places')
    .select('id', { count: 'exact', head: true })
    .eq('country_id', country.id)
    .eq('is_active', true)

  // 5. Get categories (Tier 1 + Tier 2 + Tier 3)
  const { data: categories } = await supabase
    .from('appliance_categories')
    .select('id, name, name_plural, slug, icon, tier')
    .is('parent_id', null)
    .eq('is_active', true)
    .in('tier', ['tier_1', 'tier_2', 'tier_3'])
    .order('display_order')
    .limit(9)

  // 6. Get general FAQs (not repair, not location-templated)
  const { data: faqs } = await supabase
    .from('faqs')
    .select('id, question, answer')
    .eq('is_active', true)
    .eq('is_repair_faq', false)
    .eq('is_location_template', false)
    .order('display_order')
    .limit(6)

  // 7. Get other countries for cross-linking
  const { data: otherCountries } = await supabase
    .from('countries')
    .select('name, slug, flag_emoji, place_count, store_count, provider_count')
    .neq('slug', countrySlug)
    .eq('is_active', true)
    .order('display_order')

  return {
    country: country as CountryData,
    adminAreas: (adminAreas || []) as AdminArea[],
    popularCities: (popularCities || []) as PopularCity[],
    totalCities: totalCities || 0,
    categories: (categories || []) as Category[],
    faqs: (faqs || []) as FAQ[],
    otherCountries: (otherCountries || []) as OtherCountry[],
  }
})

/**
 * Get country page data with fallback for build time
 */
export async function getCountryPageDataSafe(countrySlug: string): Promise<CountryPageData | null> {
  try {
    return await getCountryPageData(countrySlug)
  } catch (error) {
    console.error('Error fetching country page data:', error)
    return null
  }
}
