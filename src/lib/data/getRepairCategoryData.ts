import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

export interface RepairCategoryData {
  id: string
  name: string
  name_plural: string | null
  name_singular: string | null
  slug: string
  tier: string
  icon: string | null
  description: string | null
  common_issues: string[] | null
  avg_repair_cost_min: number | null
  avg_repair_cost_max: number | null
  avg_lifespan_years: number | null
  supports_repair: boolean
  repair_seo_title_template: string | null
  repair_h1_template: string | null
  repair_intro_template: string | null
  min_providers_for_index: number | null
}

export interface RepairPlaceData {
  id: string
  name: string
  slug: string
  latitude: number | null
  longitude: number | null
  admin_area_id: string | null
}

export interface RepairCountryData {
  id: string
  name: string
  slug: string
}

export interface BrandAuthorization {
  id: string
  name: string
  slug: string
  logo_url: string | null
  is_verified: boolean
}

export interface ProviderData {
  id: string
  business_name: string
  slug: string
  short_description: string | null
  phone: string | null
  phone_secondary: string | null
  email: string | null
  website: string | null
  address_line1: string | null
  postcode: string | null
  logo_url: string | null
  latitude: number | null
  longitude: number | null
  average_rating: number | null
  review_count: number
  is_featured: boolean
  is_verified: boolean
  status: string
  // Repair-specific
  callout_fee_from: number | null
  callout_fee_to: number | null
  no_fix_no_fee: boolean
  free_quotes: boolean
  offers_same_day: boolean
  offers_next_day: boolean
  offers_emergency: boolean
  offers_weekend: boolean
  offers_evening: boolean
  typical_response_time: string | null
  years_trading: number | null
  // Certifications
  gas_safe_registered: boolean
  gas_safe_number: string | null
  fgas_certified: boolean
  which_trusted_trader: boolean
  checkatrade_member: boolean
  // Warranty
  warranty_on_repairs_months: number | null
  warranty_on_parts_months: number | null
  // Authorized brands
  authorizedBrands: BrandAuthorization[]
}

export interface RepairFAQData {
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
  provider_count: number
}

export interface RelatedRepairCategoryData {
  id: string
  name: string
  name_singular: string | null
  slug: string
  icon: string | null
}

export interface RepairPageStats {
  providerCount: number
  avgCalloutFee: number | null
  minCalloutFee: number | null
  maxCalloutFee: number | null
  providersWithSameDay: number
  providersWithNoFixNoFee: number
  providersWithWarranty: number
  providersGasSafe: number
  avgRating: number | null
  topBrands: string[]
}

export interface RepairCategoryPageData {
  category: RepairCategoryData
  place: RepairPlaceData
  country: RepairCountryData
  providers: ProviderData[]
  faqs: RepairFAQData[]
  nearbyCities: NearbyCityData[]
  relatedCategories: RelatedRepairCategoryData[]
  stats: RepairPageStats
  isIndexable: boolean
}

/**
 * Parse repair category slug to get category slug
 * e.g., "washing-machine-repair" -> "washing-machines"
 */
function parseRepairSlug(repairSlug: string): string {
  // Remove "-repair" suffix
  const categorySlug = repairSlug.replace(/-repair$/, '')

  // Handle singular to plural conversions
  const singularToPlural: Record<string, string> = {
    'washing-machine': 'washing-machines',
    'fridge-freezer': 'fridge-freezers',
    'tumble-dryer': 'tumble-dryers',
    dishwasher: 'dishwashers',
    oven: 'ovens',
    cooker: 'cookers',
    hob: 'hobs',
    microwave: 'microwaves',
    'american-fridge-freezer': 'american-fridge-freezers',
    freezer: 'freezers',
    'washer-dryer': 'washer-dryers',
    'cooker-hood': 'cooker-hoods',
    'wine-cooler': 'wine-coolers',
    'range-cooker': 'range-cookers',
    'coffee-machine': 'coffee-machines',
  }

  return singularToPlural[categorySlug] || categorySlug
}

/**
 * Fetch all data for a repair category page
 */
export const getRepairCategoryData = cache(
  async (
    countrySlug: string,
    citySlug: string,
    repairSlug: string
  ): Promise<RepairCategoryPageData | null> => {
    const supabase = await createClient()

    // Parse the repair slug to get category slug
    const categorySlug = parseRepairSlug(repairSlug)

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

    // 2. Get category (must support repair)
    const { data: categoryData, error: categoryError } = await supabase
      .from('appliance_categories')
      .select('*')
      .eq('slug', categorySlug)
      .eq('supports_repair', true)
      .single()

    if (categoryError || !categoryData) {
      console.error('Error fetching category:', categoryError)
      return null
    }

    // 3. Get providers that service this category in this city
    const { data: providersData } = await supabase
      .from('service_providers')
      .select(
        `
        id,
        business_name,
        slug,
        short_description,
        phone,
        phone_secondary,
        email,
        website,
        address_line1,
        postcode,
        logo_url,
        latitude,
        longitude,
        average_rating,
        review_count,
        is_featured,
        is_verified,
        status,
        callout_fee_from,
        callout_fee_to,
        no_fix_no_fee,
        free_quotes,
        offers_same_day,
        offers_next_day,
        offers_emergency,
        offers_weekend,
        offers_evening,
        typical_response_time,
        years_trading,
        gas_safe_registered,
        gas_safe_number,
        fgas_certified,
        which_trusted_trader,
        checkatrade_member,
        warranty_on_repairs_months,
        warranty_on_parts_months,
        provider_services!inner (
          appliance_category_id
        ),
        provider_brand_authorisations (
          authorisation_type,
          brands (
            id,
            name,
            slug,
            logo_url
          )
        )
      `
      )
      .eq('place_id', placeData.id)
      .eq('provider_services.appliance_category_id', categoryData.id)
      .eq('is_active', true)
      .in('status', ['active', 'claimed', 'verified'])
      .order('is_featured', { ascending: false })
      .order('average_rating', { ascending: false, nullsFirst: false })

    // Transform providers data
    const providers: ProviderData[] = (providersData || []).map((provider) => {
      const authorizedBrands: BrandAuthorization[] = (provider.provider_brand_authorisations || [])
        .map((pba: { brands: { id: string; name: string; slug: string; logo_url: string | null }[] | { id: string; name: string; slug: string; logo_url: string | null } | null; authorisation_type: string }) => {
          const brand = Array.isArray(pba.brands) ? pba.brands[0] : pba.brands
          if (!brand) return null
          return {
            id: brand.id,
            name: brand.name,
            slug: brand.slug,
            logo_url: brand.logo_url,
            is_verified: pba.authorisation_type === 'authorized',
          }
        })
        .filter(Boolean) as BrandAuthorization[]

      return {
        id: provider.id,
        business_name: provider.business_name,
        slug: provider.slug,
        short_description: provider.short_description,
        phone: provider.phone,
        phone_secondary: provider.phone_secondary,
        email: provider.email,
        website: provider.website,
        address_line1: provider.address_line1,
        postcode: provider.postcode,
        logo_url: provider.logo_url,
        latitude: provider.latitude,
        longitude: provider.longitude,
        average_rating: provider.average_rating,
        review_count: provider.review_count,
        is_featured: provider.is_featured,
        is_verified: provider.is_verified,
        status: provider.status,
        callout_fee_from: provider.callout_fee_from,
        callout_fee_to: provider.callout_fee_to,
        no_fix_no_fee: provider.no_fix_no_fee,
        free_quotes: provider.free_quotes,
        offers_same_day: provider.offers_same_day,
        offers_next_day: provider.offers_next_day,
        offers_emergency: provider.offers_emergency,
        offers_weekend: provider.offers_weekend,
        offers_evening: provider.offers_evening,
        typical_response_time: provider.typical_response_time,
        years_trading: provider.years_trading,
        gas_safe_registered: provider.gas_safe_registered,
        gas_safe_number: provider.gas_safe_number,
        fgas_certified: provider.fgas_certified,
        which_trusted_trader: provider.which_trusted_trader,
        checkatrade_member: provider.checkatrade_member,
        warranty_on_repairs_months: provider.warranty_on_repairs_months,
        warranty_on_parts_months: provider.warranty_on_parts_months,
        authorizedBrands,
      }
    })

    // 4. Get repair FAQs
    const { data: faqsData } = await supabase
      .from('faqs')
      .select('id, question, answer, category, display_order')
      .eq('is_repair_faq', true)
      .order('display_order')
      .limit(6)

    // 5. Get nearby cities (same admin area)
    const { data: nearbyCitiesData } = await supabase
      .from('places')
      .select('id, name, slug, provider_count')
      .eq('admin_area_id', placeData.admin_area_id)
      .neq('slug', citySlug)
      .gt('provider_count', 0)
      .order('provider_count', { ascending: false })
      .limit(6)

    // 6. Get related repair categories
    const { data: relatedCategoriesData } = await supabase
      .from('appliance_categories')
      .select('id, name, name_singular, slug, icon')
      .eq('supports_repair', true)
      .neq('id', categoryData.id)
      .in('tier', ['tier_1', 'tier_2'])
      .order('display_order')
      .limit(6)

    // Calculate page stats
    const stats = calculateRepairStats(providers)

    // Determine indexability (min 2 providers)
    const minProviders = categoryData.min_providers_for_index || 2
    const isIndexable = providers.length >= minProviders

    return {
      category: categoryData as RepairCategoryData,
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
      providers,
      faqs: (faqsData || []) as RepairFAQData[],
      nearbyCities: (nearbyCitiesData || []) as NearbyCityData[],
      relatedCategories: (relatedCategoriesData || []) as RelatedRepairCategoryData[],
      stats,
      isIndexable,
    }
  }
)

/**
 * Calculate page statistics from providers
 */
function calculateRepairStats(providers: ProviderData[]): RepairPageStats {
  const providerCount = providers.length

  const calloutFees = providers
    .filter((p) => p.callout_fee_from !== null)
    .map((p) => p.callout_fee_from!)

  const minCalloutFee = calloutFees.length > 0 ? Math.min(...calloutFees) : null
  const maxCalloutFees = providers
    .filter((p) => p.callout_fee_to !== null)
    .map((p) => p.callout_fee_to!)
  const maxCalloutFee = maxCalloutFees.length > 0 ? Math.max(...maxCalloutFees) : null
  const avgCalloutFee =
    calloutFees.length > 0
      ? Math.round(calloutFees.reduce((a, b) => a + b, 0) / calloutFees.length)
      : null

  const providersWithSameDay = providers.filter((p) => p.offers_same_day).length
  const providersWithNoFixNoFee = providers.filter((p) => p.no_fix_no_fee).length
  const providersWithWarranty = providers.filter(
    (p) => p.warranty_on_repairs_months && p.warranty_on_repairs_months > 0
  ).length
  const providersGasSafe = providers.filter((p) => p.gas_safe_registered).length

  const ratings = providers.filter((p) => p.average_rating !== null).map((p) => p.average_rating!)
  const avgRating =
    ratings.length > 0
      ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10
      : null

  // Top brands
  const brandCounts = new Map<string, number>()
  providers.forEach((p) => {
    p.authorizedBrands.forEach((b) => {
      brandCounts.set(b.name, (brandCounts.get(b.name) || 0) + 1)
    })
  })
  const topBrands = Array.from(brandCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name]) => name)

  return {
    providerCount,
    avgCalloutFee,
    minCalloutFee,
    maxCalloutFee,
    providersWithSameDay,
    providersWithNoFixNoFee,
    providersWithWarranty,
    providersGasSafe,
    avgRating,
    topBrands,
  }
}

/**
 * Get repair category data with fallback
 */
export async function getRepairCategoryDataSafe(
  countrySlug: string,
  citySlug: string,
  repairSlug: string
): Promise<RepairCategoryPageData | null> {
  try {
    return await getRepairCategoryData(countrySlug, citySlug, repairSlug)
  } catch (error) {
    console.error('Error fetching repair category data:', error)
    return null
  }
}
