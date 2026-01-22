import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

export interface CategoryData {
  id: string
  name: string
  name_plural: string | null
  name_singular: string | null
  slug: string
  tier: string
  icon: string | null
  description: string | null
  buying_guide: string | null
  common_issues: string | null
  supports_repair: boolean
  avg_repair_cost_min: number | null
  avg_repair_cost_max: number | null
  avg_lifespan_years: number | null
  seo_title_template: string | null
  seo_meta_template: string | null
  h1_template: string | null
  intro_template: string | null
  min_stores_for_index: number | null
}

export interface PlaceData {
  id: string
  name: string
  slug: string
  latitude: number | null
  longitude: number | null
  admin_area_id: string | null
}

export interface CountryData {
  id: string
  name: string
  slug: string
}

export interface StoreCategoryData {
  grades_available: string[] | null
  price_min: number | null
  price_max: number | null
}

export interface BrandData {
  id: string
  name: string
  slug: string
  tier: string | null
  logo_url: string | null
}

export interface StoreData {
  id: string
  business_name: string
  slug: string
  short_description: string | null
  address_line1: string | null
  postcode: string | null
  phone: string | null
  website: string | null
  logo_url: string | null
  latitude: number | null
  longitude: number | null
  average_rating: number | null
  review_count: number
  is_featured: boolean
  is_verified: boolean
  status: string
  // Services
  offers_delivery: boolean
  offers_free_delivery: boolean
  offers_next_day_delivery: boolean
  offers_same_day_delivery: boolean
  offers_installation: boolean
  offers_free_installation: boolean
  offers_old_appliance_removal: boolean
  warranty_months: number | null
  offers_finance: boolean
  offers_zero_percent_finance: boolean
  finance_providers: string[] | null
  offers_click_collect: boolean
  grades_stocked: string[] | null
  // Category-specific data
  categoryData?: StoreCategoryData
  brands: BrandData[]
}

export interface GradeData {
  code: string
  name: string
  short_description: string
  typical_discount_percent: number
  display_order: number
}

export interface FAQData {
  id: string
  question: string
  answer: string
  category: string | null
  display_order: number
}

export interface NearbyCityData {
  id: string
  name: string
  slug: string
  store_count: number
}

export interface RelatedCategoryData {
  id: string
  name: string
  slug: string
  icon: string | null
}

export interface PageStats {
  storeCount: number
  storesWithFreeDelivery: number
  storesWithFinance: number
  storesWithInstallation: number
  storesWithNextDay: number
  priceMin: number | null
  priceMax: number | null
  avgDiscount: number
  gradesAvailable: string[]
  topBrands: string[]
}

export interface RetailCategoryPageData {
  category: CategoryData
  place: PlaceData
  country: CountryData
  stores: StoreData[]
  grades: GradeData[]
  faqs: FAQData[]
  nearbyCities: NearbyCityData[]
  relatedCategories: RelatedCategoryData[]
  stats: PageStats
  isIndexable: boolean
}

/**
 * Fetch all data for a retail category page
 */
export const getRetailCategoryData = cache(
  async (
    countrySlug: string,
    citySlug: string,
    categorySlug: string
  ): Promise<RetailCategoryPageData | null> => {
    const supabase = await createClient()

    // 1. Get place with country
    const { data: placeData, error: placeError } = await supabase
      .from('places')
      .select(
        `
        id,
        name,
        slug,
        latitude,
        longitude,
        admin_area_id,
        countries!inner (
          id,
          name,
          slug
        )
      `
      )
      .eq('slug', citySlug)
      .single()

    if (placeError || !placeData) {
      console.error('Error fetching place:', placeError)
      return null
    }

    // Validate country matches
    const countryData = Array.isArray(placeData.countries)
      ? placeData.countries[0]
      : placeData.countries

    if (!countryData || countryData.slug !== countrySlug) {
      console.error('Country mismatch')
      return null
    }

    // 2. Get category
    const { data: categoryData, error: categoryError } = await supabase
      .from('appliance_categories')
      .select('*')
      .eq('slug', categorySlug)
      .single()

    if (categoryError || !categoryData) {
      console.error('Error fetching category:', categoryError)
      return null
    }

    // 3. Get stores with category and brands
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
        latitude,
        longitude,
        average_rating,
        review_count,
        is_featured,
        is_verified,
        status,
        offers_delivery,
        offers_free_delivery,
        offers_next_day_delivery,
        offers_same_day_delivery,
        offers_installation,
        offers_free_installation,
        offers_old_appliance_removal,
        warranty_months,
        offers_finance,
        offers_zero_percent_finance,
        finance_providers,
        offers_click_collect,
        grades_stocked,
        store_categories!inner (
          grades_available,
          price_min,
          price_max
        ),
        store_brands (
          brands (
            id,
            name,
            slug,
            tier,
            logo_url
          )
        )
      `
      )
      .eq('place_id', placeData.id)
      .eq('store_categories.category_id', categoryData.id)
      .eq('is_active', true)
      .in('status', ['active', 'claimed', 'verified'])
      .order('is_featured', { ascending: false })
      .order('average_rating', { ascending: false, nullsFirst: false })

    // Transform stores data
    const stores: StoreData[] = (storesData || []).map((store) => {
      const storeCategory = Array.isArray(store.store_categories)
        ? store.store_categories[0]
        : store.store_categories

      const brands: BrandData[] = (store.store_brands || [])
        .map((sb: { brands: BrandData | BrandData[] | null }) => {
          const brand = Array.isArray(sb.brands) ? sb.brands[0] : sb.brands
          return brand
        })
        .filter(Boolean) as BrandData[]

      return {
        id: store.id,
        business_name: store.business_name,
        slug: store.slug,
        short_description: store.short_description,
        address_line1: store.address_line1,
        postcode: store.postcode,
        phone: store.phone,
        website: store.website,
        logo_url: store.logo_url,
        latitude: store.latitude,
        longitude: store.longitude,
        average_rating: store.average_rating,
        review_count: store.review_count,
        is_featured: store.is_featured,
        is_verified: store.is_verified,
        status: store.status,
        offers_delivery: store.offers_delivery,
        offers_free_delivery: store.offers_free_delivery,
        offers_next_day_delivery: store.offers_next_day_delivery,
        offers_same_day_delivery: store.offers_same_day_delivery,
        offers_installation: store.offers_installation,
        offers_free_installation: store.offers_free_installation,
        offers_old_appliance_removal: store.offers_old_appliance_removal,
        warranty_months: store.warranty_months,
        offers_finance: store.offers_finance,
        offers_zero_percent_finance: store.offers_zero_percent_finance,
        finance_providers: store.finance_providers,
        offers_click_collect: store.offers_click_collect,
        grades_stocked: store.grades_stocked,
        categoryData: storeCategory || undefined,
        brands,
      }
    })

    // 4. Get grade levels
    const { data: gradesData } = await supabase
      .from('grade_levels')
      .select('code, name, short_description, typical_discount_percent, display_order')
      .order('display_order')

    // 5. Get FAQs for this category (non-repair)
    const { data: faqsData } = await supabase
      .from('faqs')
      .select('id, question, answer, category, display_order')
      .eq('is_repair_faq', false)
      .order('display_order')
      .limit(6)

    // 6. Get nearby cities (same admin area)
    const { data: nearbyCitiesData } = await supabase
      .from('places')
      .select('id, name, slug, store_count')
      .eq('admin_area_id', placeData.admin_area_id)
      .neq('slug', citySlug)
      .gt('store_count', 0)
      .order('store_count', { ascending: false })
      .limit(6)

    // 7. Get related categories (same tier, different category)
    const { data: relatedCategoriesData } = await supabase
      .from('appliance_categories')
      .select('id, name, slug, icon')
      .eq('tier', categoryData.tier)
      .neq('id', categoryData.id)
      .is('parent_id', null)
      .order('display_order')
      .limit(6)

    // Calculate page stats
    const stats: PageStats = calculatePageStats(stores)

    // Determine indexability (min 2 stores)
    const minStores = categoryData.min_stores_for_index || 2
    const isIndexable = stores.length >= minStores

    return {
      category: categoryData as CategoryData,
      place: {
        id: placeData.id,
        name: placeData.name,
        slug: placeData.slug,
        latitude: placeData.latitude,
        longitude: placeData.longitude,
        admin_area_id: placeData.admin_area_id,
      },
      country: {
        id: countryData.id,
        name: countryData.name,
        slug: countryData.slug,
      },
      stores,
      grades: (gradesData || []) as GradeData[],
      faqs: (faqsData || []) as FAQData[],
      nearbyCities: (nearbyCitiesData || []) as NearbyCityData[],
      relatedCategories: (relatedCategoriesData || []) as RelatedCategoryData[],
      stats,
      isIndexable,
    }
  }
)

/**
 * Calculate page statistics from stores
 */
function calculatePageStats(stores: StoreData[]): PageStats {
  const storeCount = stores.length
  const storesWithFreeDelivery = stores.filter((s) => s.offers_free_delivery).length
  const storesWithFinance = stores.filter((s) => s.offers_finance).length
  const storesWithInstallation = stores.filter((s) => s.offers_installation).length
  const storesWithNextDay = stores.filter((s) => s.offers_next_day_delivery).length

  // Price range from category data
  const prices = stores
    .filter((s) => s.categoryData?.price_min)
    .map((s) => s.categoryData!.price_min!)

  const maxPrices = stores
    .filter((s) => s.categoryData?.price_max)
    .map((s) => s.categoryData!.price_max!)

  const priceMin = prices.length > 0 ? Math.min(...prices) : null
  const priceMax = maxPrices.length > 0 ? Math.max(...maxPrices) : null

  // Grades available
  const gradesSet = new Set<string>()
  stores.forEach((s) => {
    s.grades_stocked?.forEach((g) => gradesSet.add(g))
    s.categoryData?.grades_available?.forEach((g) => gradesSet.add(g))
  })
  const gradesAvailable = Array.from(gradesSet)

  // Top brands
  const brandCounts = new Map<string, number>()
  stores.forEach((s) => {
    s.brands.forEach((b) => {
      brandCounts.set(b.name, (brandCounts.get(b.name) || 0) + 1)
    })
  })
  const topBrands = Array.from(brandCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name]) => name)

  return {
    storeCount,
    storesWithFreeDelivery,
    storesWithFinance,
    storesWithInstallation,
    storesWithNextDay,
    priceMin,
    priceMax,
    avgDiscount: 40, // Average discount for graded appliances
    gradesAvailable,
    topBrands,
  }
}

/**
 * Get retail category data with fallback
 */
export async function getRetailCategoryDataSafe(
  countrySlug: string,
  citySlug: string,
  categorySlug: string
): Promise<RetailCategoryPageData | null> {
  try {
    return await getRetailCategoryData(countrySlug, citySlug, categorySlug)
  } catch (error) {
    console.error('Error fetching retail category data:', error)
    return null
  }
}
