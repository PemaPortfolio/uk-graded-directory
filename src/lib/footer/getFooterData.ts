import { createClient } from '@/lib/supabase/server'
import { FooterData, FooterCountry, FooterCity, FooterStats } from '@/types/footer'
import { getActiveSocialLinks } from '@/config/social'
import { cache } from 'react'

/**
 * Footer Data Fetching (Spec 05)
 *
 * Fetches all data needed for the footer:
 * - 217 admin areas grouped by 4 countries
 * - Top 20 popular cities
 * - Aggregate stats
 * - Social links configuration
 *
 * Cached with React cache() for performance.
 */
export const getFooterData = cache(async (): Promise<FooterData> => {
  const supabase = await createClient()

  // Fetch admin areas with country info
  const { data: adminAreasData, error: adminAreasError } = await supabase
    .from('admin_areas')
    .select(`
      id,
      name,
      slug,
      store_count,
      provider_count,
      countries!inner (
        id,
        name,
        slug,
        flag_emoji
      )
    `)
    .eq('is_active', true)
    .order('name')

  if (adminAreasError) {
    console.error('Error fetching admin areas:', adminAreasError)
  }

  // Fetch popular cities (top 20 by population/store count)
  const { data: citiesData, error: citiesError } = await supabase
    .from('places')
    .select('id, name, slug, population, countries(slug)')
    .eq('is_active', true)
    .order('population', { ascending: false })
    .limit(20)

  if (citiesError) {
    console.error('Error fetching cities:', citiesError)
  }

  // Fetch aggregate stats
  const [storesResult, providersResult, locationsResult] = await Promise.all([
    supabase.from('stores').select('id', { count: 'exact', head: true }),
    supabase.from('service_providers').select('id', { count: 'exact', head: true }),
    supabase.from('places').select('id', { count: 'exact', head: true }).eq('is_active', true),
  ])

  // Transform admin areas into grouped countries
  const countries = groupAdminAreasByCountry(adminAreasData || [])

  // Transform cities data
  const popularCities: FooterCity[] = (citiesData || []).map(city => {
    // Supabase returns foreign keys as arrays, get first element
    const countryData = Array.isArray(city.countries) ? city.countries[0] : city.countries
    return {
      id: city.id,
      name: city.name,
      slug: city.slug,
      countrySlug: (countryData as { slug: string } | null)?.slug || 'england',
      population: city.population,
    }
  })

  // Compile stats
  const stats: FooterStats = {
    totalStores: storesResult.count || 0,
    totalProviders: providersResult.count || 0,
    totalLocations: locationsResult.count || 565,
  }

  return {
    countries,
    popularCities,
    stats,
    socialLinks: getActiveSocialLinks(),
  }
})

/**
 * Group admin areas by country
 */
function groupAdminAreasByCountry(adminAreas: Array<{
  id: string
  name: string
  slug: string
  store_count: number
  provider_count: number
  countries: {
    id: string
    name: string
    slug: string
    flag_emoji: string
  } | {
    id: string
    name: string
    slug: string
    flag_emoji: string
  }[]
}>): FooterCountry[] {
  const countryMap = new Map<string, FooterCountry>()

  // Define country order
  const countryOrder = ['england', 'scotland', 'wales', 'northern-ireland']

  for (const area of adminAreas) {
    // Supabase returns foreign keys as arrays, get first element
    const country = Array.isArray(area.countries) ? area.countries[0] : area.countries
    if (!country) continue

    if (!countryMap.has(country.id)) {
      countryMap.set(country.id, {
        id: country.id,
        name: country.name,
        slug: country.slug,
        flagEmoji: country.flag_emoji,
        adminAreas: [],
      })
    }

    const footerCountry = countryMap.get(country.id)!
    footerCountry.adminAreas.push({
      id: area.id,
      name: area.name,
      slug: area.slug,
      countrySlug: country.slug,
      storeCount: area.store_count || 0,
      providerCount: area.provider_count || 0,
    })
  }

  // Sort countries by predefined order
  return Array.from(countryMap.values()).sort((a, b) => {
    const aIndex = countryOrder.indexOf(a.slug)
    const bIndex = countryOrder.indexOf(b.slug)
    return aIndex - bIndex
  })
}

/**
 * Get footer data with fallback for static/build time
 */
export async function getFooterDataSafe(): Promise<FooterData> {
  try {
    return await getFooterData()
  } catch (error) {
    console.error('Error fetching footer data, using fallback:', error)
    return {
      countries: [],
      popularCities: [],
      stats: {
        totalStores: 500,
        totalProviders: 200,
        totalLocations: 565,
      },
      socialLinks: getActiveSocialLinks(),
    }
  }
}
