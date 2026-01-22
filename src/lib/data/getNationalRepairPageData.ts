import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'
import { isRepairSlug, parseCategoryFromRepairSlug } from '@/lib/utils/repairSlugUtils'

// Re-export the utility functions for convenience
export { isRepairSlug, getRepairSlug } from '@/lib/utils/repairSlugUtils'

// Types for the National Repair Page

export interface RepairCategoryData {
  id: string
  name: string
  name_plural: string | null
  name_singular: string | null
  slug: string
  tier: string
  icon: string | null
  common_issues: string[] | null
  avg_repair_cost_min: number | null
  avg_repair_cost_max: number | null
  avg_lifespan_years: number | null
  supports_repair: boolean
}

export interface CountryData {
  id: string
  name: string
  slug: string
  flag_emoji: string | null
}

export interface CityWithProviderCount {
  id: string
  name: string
  slug: string
  country_slug: string
  provider_count: number
}

export interface CountryWithCities {
  country: CountryData
  cities: CityWithProviderCount[]
}

export interface RelatedRepairCategoryData {
  id: string
  name: string
  name_singular: string | null
  slug: string
  icon: string | null
}

export interface FAQData {
  id: string
  question: string
  answer: string
  display_order: number
}

export interface NationalRepairStats {
  totalProviders: number
  totalCities: number
  avgCostMin: number
  avgCostMax: number
  avgLifespan: number
  commonIssues: string[]
}

export interface NationalRepairPageData {
  category: RepairCategoryData
  citiesByCountry: CountryWithCities[]
  popularCities: CityWithProviderCount[]
  totalProviders: number
  totalCities: number
  relatedCategories: RelatedRepairCategoryData[]
  stats: NationalRepairStats
  faqs: FAQData[]
  isIndexable: boolean
}

/**
 * Fetch all data for a national repair page
 */
export const getNationalRepairPageData = cache(
  async (repairSlug: string): Promise<NationalRepairPageData | null> => {
    const supabase = await createClient()

    // Parse category slug from repair URL
    const categorySlug = parseCategoryFromRepairSlug(repairSlug)

    // 1. Get category details
    const { data: categoryData, error: categoryError } = await supabase
      .from('appliance_categories')
      .select('*')
      .eq('slug', categorySlug)
      .eq('is_active', true)
      .eq('supports_repair', true)
      .single()

    if (categoryError || !categoryData) {
      console.error('Error fetching category for repair:', categoryError)
      return null
    }

    // 2. Get all countries
    const { data: countriesData } = await supabase
      .from('countries')
      .select('id, name, slug, flag_emoji')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    // 3. Get all providers with their coverage and services
    const { data: providersWithService } = await supabase
      .from('service_providers')
      .select(`
        id,
        provider_services!inner (
          appliance_category_id
        ),
        provider_coverage_places (
          place_id,
          places (
            id,
            name,
            slug,
            country_id,
            countries!inner (
              slug
            )
          )
        )
      `)
      .eq('provider_services.appliance_category_id', categoryData.id)
      .eq('is_active', true)
      .in('status', ['active', 'claimed', 'verified'])

    // Aggregate cities with provider counts
    const cityProviderMap = new Map<string, { city: CityWithProviderCount; count: number }>()

    ;(providersWithService || []).forEach((provider) => {
      (provider.provider_coverage_places || []).forEach((pcp: { places: { id: string; name: string; slug: string; countries: { slug: string } | { slug: string }[] } | { id: string; name: string; slug: string; countries: { slug: string } | { slug: string }[] }[] | null }) => {
        const place = Array.isArray(pcp.places) ? pcp.places[0] : pcp.places
        if (!place) return

        const country = Array.isArray(place.countries) ? place.countries[0] : place.countries
        if (!country) return

        const key = place.id
        if (cityProviderMap.has(key)) {
          cityProviderMap.get(key)!.count++
        } else {
          cityProviderMap.set(key, {
            city: {
              id: place.id,
              name: place.name,
              slug: place.slug,
              country_slug: country.slug,
              provider_count: 1,
            },
            count: 1,
          })
        }
      })
    })

    // Convert to array with proper provider counts
    const citiesWithProviders: CityWithProviderCount[] = Array.from(cityProviderMap.values())
      .map((entry) => ({
        ...entry.city,
        provider_count: entry.count,
      }))
      .sort((a, b) => b.provider_count - a.provider_count)

    // Group cities by country
    const citiesByCountry: CountryWithCities[] = (countriesData || [])
      .map((country) => ({
        country: {
          id: country.id,
          name: country.name,
          slug: country.slug,
          flag_emoji: country.flag_emoji,
        },
        cities: citiesWithProviders
          .filter((city) => city.country_slug === country.slug)
          .sort((a, b) => b.provider_count - a.provider_count || a.name.localeCompare(b.name)),
      }))
      .filter((group) => group.cities.length > 0)

    // Get popular cities (top 12 by provider count)
    const popularCities = [...citiesWithProviders]
      .sort((a, b) => b.provider_count - a.provider_count)
      .slice(0, 12)

    // Calculate totals
    const totalProviders = providersWithService?.length || 0
    const totalCities = citiesWithProviders.length

    // 4. Get related repair categories (same tier, supports repair)
    const { data: relatedCategoriesData } = await supabase
      .from('appliance_categories')
      .select('id, name, name_singular, slug, icon')
      .eq('supports_repair', true)
      .eq('is_active', true)
      .neq('id', categoryData.id)
      .in('tier', ['tier_1', 'tier_2', 'tier_3'])
      .order('display_order', { ascending: true })
      .limit(6)

    // 5. Get FAQs for repair pages
    const { data: faqsData } = await supabase
      .from('faqs')
      .select('id, question, answer, display_order')
      .eq('is_repair_faq', true)
      .order('display_order', { ascending: true })
      .limit(8)

    // Compute stats
    const stats: NationalRepairStats = {
      totalProviders,
      totalCities,
      avgCostMin: categoryData.avg_repair_cost_min || 45,
      avgCostMax: categoryData.avg_repair_cost_max || 150,
      avgLifespan: categoryData.avg_lifespan_years || 10,
      commonIssues: categoryData.common_issues || [],
    }

    // Determine indexability (min 10 providers for national pages)
    const minProviders = 10
    const isIndexable = totalProviders >= minProviders

    return {
      category: {
        id: categoryData.id,
        name: categoryData.name,
        name_plural: categoryData.name_plural,
        name_singular: categoryData.name_singular,
        slug: categoryData.slug,
        tier: categoryData.tier,
        icon: categoryData.icon,
        common_issues: categoryData.common_issues,
        avg_repair_cost_min: categoryData.avg_repair_cost_min,
        avg_repair_cost_max: categoryData.avg_repair_cost_max,
        avg_lifespan_years: categoryData.avg_lifespan_years,
        supports_repair: categoryData.supports_repair,
      },
      citiesByCountry,
      popularCities,
      totalProviders,
      totalCities,
      relatedCategories: (relatedCategoriesData || []) as RelatedRepairCategoryData[],
      stats,
      faqs: (faqsData || []) as FAQData[],
      isIndexable,
    }
  }
)

/**
 * Get national repair page data with fallback
 */
export async function getNationalRepairPageDataSafe(
  repairSlug: string
): Promise<NationalRepairPageData | null> {
  try {
    return await getNationalRepairPageData(repairSlug)
  } catch (error) {
    console.error('Error fetching national repair page data:', error)
    return null
  }
}

/**
 * Check if a repair slug is valid (maps to a repair-enabled category)
 */
export async function isValidRepairSlug(slug: string): Promise<boolean> {
  if (!isRepairSlug(slug)) return false

  const supabase = await createClient()
  const categorySlug = parseCategoryFromRepairSlug(slug)

  const { data } = await supabase
    .from('appliance_categories')
    .select('id')
    .eq('slug', categorySlug)
    .eq('is_active', true)
    .eq('supports_repair', true)
    .single()

  return !!data
}
