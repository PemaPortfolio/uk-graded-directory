import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

// Types for the National Retail Category Page

export interface ApplianceCategoryData {
  id: string
  name: string
  name_plural: string | null
  name_singular: string | null
  slug: string
  tier: string
  icon: string | null
  description: string | null
  buying_guide: string | null
  supports_repair: boolean
  avg_lifespan_years: number | null
  seo_title_template: string | null
  seo_meta_template: string | null
  min_stores_for_index: number | null
}

export interface CountryData {
  id: string
  name: string
  slug: string
  flag_emoji: string | null
}

export interface CityWithStoreCount {
  id: string
  name: string
  slug: string
  country_slug: string
  store_count: number
}

export interface CountryWithCities {
  country: CountryData
  cities: CityWithStoreCount[]
}

export interface BrandData {
  id: string
  name: string
  slug: string
  tier: string | null
  logo_url: string | null
  store_count: number
}

export interface GradeLevelData {
  code: string
  name: string
  short_description: string
  typical_discount_percent: number
  display_order: number
}

export interface SubcategoryData {
  id: string
  name: string
  name_plural: string | null
  slug: string
  icon: string | null
}

export interface RelatedCategoryData {
  id: string
  name: string
  name_plural: string | null
  slug: string
  icon: string | null
}

export interface FAQData {
  id: string
  question: string
  answer: string
  display_order: number
}

export interface NationalRetailStats {
  totalStores: number
  totalCities: number
  avgDiscountMin: number
  avgDiscountMax: number
  avgLifespan: number
  storesWithFreeDelivery: number
  storesWithFinance: number
}

export interface NationalRetailCategoryData {
  category: ApplianceCategoryData
  citiesByCountry: CountryWithCities[]
  popularCities: CityWithStoreCount[]
  totalStores: number
  totalCities: number
  popularBrands: BrandData[]
  relatedCategories: RelatedCategoryData[]
  subcategories: SubcategoryData[]
  grades: GradeLevelData[]
  stats: NationalRetailStats
  faqs: FAQData[]
  isIndexable: boolean
}

/**
 * Fetch all data for a national retail category page
 */
export const getNationalRetailCategoryData = cache(
  async (categorySlug: string): Promise<NationalRetailCategoryData | null> => {
    const supabase = await createClient()

    // 1. Get category details
    const { data: categoryData, error: categoryError } = await supabase
      .from('appliance_categories')
      .select('*')
      .eq('slug', categorySlug)
      .eq('is_active', true)
      .single()

    if (categoryError || !categoryData) {
      console.error('Error fetching category:', categoryError)
      return null
    }

    // 2. Get all countries
    const { data: countriesData } = await supabase
      .from('countries')
      .select('id, name, slug, flag_emoji')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    // 3. Get all places with stores that have this category
    // We query stores with store_categories to get cities with active stores in this category
    const { data: storesWithCategory } = await supabase
      .from('stores')
      .select(`
        id,
        place_id,
        places!inner (
          id,
          name,
          slug,
          country_id,
          countries!inner (
            slug
          )
        ),
        store_categories!inner (
          category_id
        )
      `)
      .eq('store_categories.category_id', categoryData.id)
      .eq('is_active', true)
      .in('status', ['active', 'claimed', 'verified'])

    // Aggregate cities with store counts
    const cityStoreMap = new Map<string, { city: CityWithStoreCount; count: number }>()

    ;(storesWithCategory || []).forEach((store) => {
      const place = Array.isArray(store.places) ? store.places[0] : store.places
      if (!place) return

      const country = Array.isArray(place.countries) ? place.countries[0] : place.countries
      if (!country) return

      const key = place.id
      if (cityStoreMap.has(key)) {
        cityStoreMap.get(key)!.count++
      } else {
        cityStoreMap.set(key, {
          city: {
            id: place.id,
            name: place.name,
            slug: place.slug,
            country_slug: country.slug,
            store_count: 1,
          },
          count: 1,
        })
      }
    })

    // Convert to array with proper store counts
    const citiesWithStores: CityWithStoreCount[] = Array.from(cityStoreMap.values())
      .map((entry) => ({
        ...entry.city,
        store_count: entry.count,
      }))
      .sort((a, b) => b.store_count - a.store_count)

    // Group cities by country
    const citiesByCountry: CountryWithCities[] = (countriesData || [])
      .map((country) => ({
        country: {
          id: country.id,
          name: country.name,
          slug: country.slug,
          flag_emoji: country.flag_emoji,
        },
        cities: citiesWithStores
          .filter((city) => city.country_slug === country.slug)
          .sort((a, b) => b.store_count - a.store_count || a.name.localeCompare(b.name)),
      }))
      .filter((group) => group.cities.length > 0)

    // Get popular cities (top 12 by store count)
    const popularCities = [...citiesWithStores]
      .sort((a, b) => b.store_count - a.store_count)
      .slice(0, 12)

    // Calculate totals
    const totalStores = citiesWithStores.reduce((sum, city) => sum + city.store_count, 0)
    const totalCities = citiesWithStores.length

    // 4. Get popular brands for this category
    // Query stores that have this category and their brands
    const { data: storesWithBrands } = await supabase
      .from('stores')
      .select(`
        id,
        store_categories!inner (
          category_id
        ),
        store_brands (
          brand_id,
          brands (
            id,
            name,
            slug,
            tier,
            logo_url
          )
        )
      `)
      .eq('store_categories.category_id', categoryData.id)
      .eq('is_active', true)
      .in('status', ['active', 'claimed', 'verified'])

    // Count brand occurrences
    const brandCountMap = new Map<string, { brand: BrandData; count: number }>()

    ;(storesWithBrands || []).forEach((store) => {
      (store.store_brands || []).forEach((sb: { brands: { id: string; name: string; slug: string; tier: string | null; logo_url: string | null } | { id: string; name: string; slug: string; tier: string | null; logo_url: string | null }[] | null }) => {
        const brand = Array.isArray(sb.brands) ? sb.brands[0] : sb.brands
        if (!brand) return

        const key = brand.id
        if (brandCountMap.has(key)) {
          brandCountMap.get(key)!.count++
        } else {
          brandCountMap.set(key, {
            brand: {
              id: brand.id,
              name: brand.name,
              slug: brand.slug,
              tier: brand.tier,
              logo_url: brand.logo_url,
              store_count: 1,
            },
            count: 1,
          })
        }
      })
    })

    const popularBrands: BrandData[] = Array.from(brandCountMap.values())
      .map((entry) => ({
        ...entry.brand,
        store_count: entry.count,
      }))
      .sort((a, b) => b.store_count - a.store_count)
      .slice(0, 8)

    // 5. Get related categories (same tier, excluding current)
    const { data: relatedCategoriesData } = await supabase
      .from('appliance_categories')
      .select('id, name, name_plural, slug, icon')
      .eq('is_active', true)
      .neq('id', categoryData.id)
      .is('parent_id', null)
      .in('tier', ['tier_1', 'tier_2', 'tier_3'])
      .order('display_order', { ascending: true })
      .limit(6)

    // 6. Get subcategories (if any)
    const { data: subcategoriesData } = await supabase
      .from('appliance_categories')
      .select('id, name, name_plural, slug, icon')
      .eq('parent_id', categoryData.id)
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    // 7. Get grade levels
    const { data: gradesData } = await supabase
      .from('grade_levels')
      .select('code, name, short_description, typical_discount_percent, display_order')
      .order('display_order', { ascending: true })

    // 8. Get FAQs for retail pages
    const { data: faqsData } = await supabase
      .from('faqs')
      .select('id, question, answer, display_order')
      .eq('is_repair_faq', false)
      .order('display_order', { ascending: true })
      .limit(8)

    // Compute stats
    const stats: NationalRetailStats = {
      totalStores,
      totalCities,
      avgDiscountMin: 30,
      avgDiscountMax: 70,
      avgLifespan: categoryData.avg_lifespan_years || 10,
      storesWithFreeDelivery: Math.round(totalStores * 0.4), // Estimate
      storesWithFinance: Math.round(totalStores * 0.3), // Estimate
    }

    // Determine indexability (min 10 stores for national pages)
    const minStores = 10
    const isIndexable = totalStores >= minStores

    return {
      category: {
        id: categoryData.id,
        name: categoryData.name,
        name_plural: categoryData.name_plural,
        name_singular: categoryData.name_singular,
        slug: categoryData.slug,
        tier: categoryData.tier,
        icon: categoryData.icon,
        description: categoryData.description,
        buying_guide: categoryData.buying_guide,
        supports_repair: categoryData.supports_repair,
        avg_lifespan_years: categoryData.avg_lifespan_years,
        seo_title_template: categoryData.seo_title_template,
        seo_meta_template: categoryData.seo_meta_template,
        min_stores_for_index: categoryData.min_stores_for_index,
      },
      citiesByCountry,
      popularCities,
      totalStores,
      totalCities,
      popularBrands,
      relatedCategories: (relatedCategoriesData || []) as RelatedCategoryData[],
      subcategories: (subcategoriesData || []) as SubcategoryData[],
      grades: (gradesData || []) as GradeLevelData[],
      stats,
      faqs: (faqsData || []) as FAQData[],
      isIndexable,
    }
  }
)

/**
 * Get national retail category data with fallback
 */
export async function getNationalRetailCategoryDataSafe(
  categorySlug: string
): Promise<NationalRetailCategoryData | null> {
  try {
    return await getNationalRetailCategoryData(categorySlug)
  } catch (error) {
    console.error('Error fetching national retail category data:', error)
    return null
  }
}

/**
 * Check if a slug is a valid appliance category
 */
export async function isValidCategorySlug(slug: string): Promise<boolean> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('appliance_categories')
    .select('id')
    .eq('slug', slug)
    .eq('is_active', true)
    .is('parent_id', null)
    .single()

  return !!data
}
