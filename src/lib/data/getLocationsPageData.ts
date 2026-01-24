import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

export interface LocationCity {
  id: string
  name: string
  slug: string
  store_count: number
  provider_count: number
  countrySlug: string
}

export interface LocationCountry {
  id: string
  name: string
  slug: string
  flag_emoji: string
  cities: LocationCity[]
  cityCount: number
}

export interface LocationsPageStats {
  totalCities: number
  totalStores: number
  totalProviders: number
}

export interface LocationsPageData {
  countries: LocationCountry[]
  stats: LocationsPageStats
}

/**
 * Fetch all data needed for the /locations page
 * Cached with React cache() for deduplication
 */
export const getLocationsPageData = cache(async (): Promise<LocationsPageData | null> => {
  const supabase = await createClient()

  // 1. Get all countries ordered by display_order
  const { data: countries, error: countriesError } = await supabase
    .from('countries')
    .select('id, name, slug, flag_emoji')
    .eq('is_active', true)
    .order('display_order')

  if (countriesError || !countries) {
    console.error('Error fetching countries:', countriesError)
    return null
  }

  // 2. Get all places with their country info
  const { data: places, error: placesError } = await supabase
    .from('places')
    .select(`
      id,
      name,
      slug,
      store_count,
      provider_count,
      country_id,
      countries!inner (
        slug
      )
    `)
    .eq('is_active', true)
    .order('store_count', { ascending: false })
    .order('name')

  if (placesError) {
    console.error('Error fetching places:', placesError)
    return null
  }

  // 3. Group cities by country
  const countryMap = new Map<string, LocationCity[]>()
  countries.forEach((country) => {
    countryMap.set(country.id, [])
  })

  let totalStores = 0
  let totalProviders = 0

  places?.forEach((place) => {
    const countryData = place.countries as unknown as { slug: string }
    const city: LocationCity = {
      id: place.id,
      name: place.name,
      slug: place.slug,
      store_count: place.store_count || 0,
      provider_count: place.provider_count || 0,
      countrySlug: countryData.slug,
    }

    const citiesArray = countryMap.get(place.country_id)
    if (citiesArray) {
      citiesArray.push(city)
    }

    totalStores += place.store_count || 0
    totalProviders += place.provider_count || 0
  })

  // 4. Build final countries array with cities
  const countriesWithCities: LocationCountry[] = countries.map((country) => ({
    id: country.id,
    name: country.name,
    slug: country.slug,
    flag_emoji: country.flag_emoji,
    cities: countryMap.get(country.id) || [],
    cityCount: countryMap.get(country.id)?.length || 0,
  }))

  return {
    countries: countriesWithCities,
    stats: {
      totalCities: places?.length || 0,
      totalStores,
      totalProviders,
    },
  }
})

/**
 * Get locations page data with fallback for build time
 */
export async function getLocationsPageDataSafe(): Promise<LocationsPageData | null> {
  try {
    return await getLocationsPageData()
  } catch (error) {
    console.error('Error fetching locations page data:', error)
    return null
  }
}
