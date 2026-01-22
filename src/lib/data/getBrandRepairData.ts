import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

// Types for Brand Repair Page (Spec 15)

export interface BrandData {
  id: string
  name: string
  slug: string
  tier: string
  logo_url: string | null
  website: string | null
  country_of_origin: string | null
  description: string | null
  has_authorised_network: boolean
}

export interface PlaceData {
  id: string
  name: string
  slug: string
  latitude: number | null
  longitude: number | null
}

export interface CountryData {
  id: string
  name: string
  slug: string
  flag_emoji: string | null
}

export interface BrandAuthorization {
  brand_id: string
  authorisation_type: string | null
  certificate_number: string | null
  valid_from: string | null
  valid_until: string | null
  is_verified: boolean
}

export interface ProviderWithAuthorization {
  id: string
  name: string
  slug: string
  phone: string | null
  email: string | null
  website: string | null
  address_line1: string | null
  city_name: string | null
  postcode: string | null
  latitude: number | null
  longitude: number | null
  description: string | null
  short_description: string | null
  years_trading: number | null
  callout_fee_from: number | null
  callout_fee_to: number | null
  no_fix_no_fee: boolean
  free_quotes: boolean
  offers_same_day: boolean
  offers_next_day: boolean
  offers_emergency: boolean
  offers_weekend: boolean
  gas_safe_registered: boolean
  fgas_certified: boolean
  which_trusted_trader: boolean
  checkatrade_member: boolean
  checkatrade_rating: number | null
  public_liability_insurance: boolean
  warranty_on_repairs_months: number | null
  warranty_on_parts_months: number | null
  uses_genuine_parts: boolean
  average_rating: number | null
  review_count: number
  provider_score: number | null
  is_verified: boolean
  is_featured: boolean
  status: string
  authorization: BrandAuthorization
  services: ProviderServiceData[]
}

export interface ProviderServiceData {
  appliance_category_id: string
  is_active: boolean
  offers_same_day: boolean
  callout_fee_min: number | null
  callout_fee_max: number | null
  repair_warranty_months: number | null
  category_name: string
  category_slug: string
  category_icon: string | null
}

export interface ApplianceCategoryWithCount {
  id: string
  name: string
  name_singular: string | null
  slug: string
  tier: string
  icon: string | null
  provider_count: number
}

export interface BrandWithCount {
  id: string
  name: string
  slug: string
  tier: string
  logo_url: string | null
  provider_count: number
  verified_count: number
}

export interface NearbyCityWithCount {
  id: string
  name: string
  slug: string
  country_slug: string
  provider_count: number
  distance_km: number
}

export interface BrandRepairStats {
  providerCount: number
  verifiedCount: number
  sameDayCount: number
  minCalloutFee: number | null
  avgRating: string | null
}

export interface BrandRepairFAQ {
  question: string
  answer: string
}

export interface BrandRepairPageData {
  brand: BrandData
  place: PlaceData
  country: CountryData
  providers: ProviderWithAuthorization[]
  applianceCategories: ApplianceCategoryWithCount[]
  otherBrands: BrandWithCount[]
  nearbyCities: NearbyCityWithCount[]
  stats: BrandRepairStats
  faqs: BrandRepairFAQ[]
  isIndexable: boolean
}

/**
 * Check if a slug is a brand repair slug (ends with -repair)
 */
export function isBrandRepairSlug(slug: string): boolean {
  return slug.endsWith('-repair')
}

/**
 * Extract brand slug from brand repair slug
 */
export function parseBrandFromRepairSlug(brandRepairSlug: string): string {
  return brandRepairSlug.replace(/-repair$/, '')
}

/**
 * Validate that a brand repair slug corresponds to a real brand
 */
export async function isValidBrandRepairSlug(
  brandRepairSlug: string,
  countrySlug: string,
  citySlug: string
): Promise<boolean> {
  if (!isBrandRepairSlug(brandRepairSlug)) return false

  const brandSlug = parseBrandFromRepairSlug(brandRepairSlug)
  const supabase = await createClient()

  // Check if brand exists
  const { data: brand } = await supabase
    .from('brands')
    .select('id')
    .eq('slug', brandSlug)
    .eq('is_active', true)
    .single()

  if (!brand) return false

  // Check if place exists
  const { data: place } = await supabase
    .from('places')
    .select(`
      id,
      countries!inner (slug)
    `)
    .eq('slug', citySlug)
    .eq('is_active', true)
    .single()

  if (!place) return false

  const country = Array.isArray(place.countries) ? place.countries[0] : place.countries
  return country?.slug === countrySlug
}

/**
 * Compute stats from providers
 */
function computeStats(providers: ProviderWithAuthorization[]): BrandRepairStats {
  const count = providers.length
  const verifiedCount = providers.filter((p) => p.authorization?.is_verified).length
  const sameDayCount = providers.filter((p) => p.offers_same_day).length

  const fees = providers
    .map((p) => p.callout_fee_from)
    .filter((fee): fee is number => fee !== null)
    .sort((a, b) => a - b)

  const ratings = providers
    .map((p) => p.average_rating)
    .filter((rating): rating is number => rating !== null)

  const avgRating =
    ratings.length > 0
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : null

  return {
    providerCount: count,
    verifiedCount,
    sameDayCount,
    minCalloutFee: fees[0] || null,
    avgRating,
  }
}

/**
 * Generate FAQs for brand repair page
 */
function generateBrandRepairFAQs(
  brand: BrandData,
  place: PlaceData,
  stats: BrandRepairStats
): BrandRepairFAQ[] {
  const faqs: BrandRepairFAQ[] = [
    {
      question: `Is it worth using a ${brand.name}-authorized engineer?`,
      answer: `Yes, ${brand.name}-authorized engineers are trained by the manufacturer, use genuine parts, and won't void your warranty. They also have access to ${brand.name}'s technical documentation and error codes.`,
    },
    {
      question: `Will using a non-authorized engineer void my ${brand.name} warranty?`,
      answer: `It depends on the terms of your warranty. Using an authorized ${brand.name} engineer ensures your warranty remains valid. Non-authorized repairs may void the warranty if improper parts or techniques are used.`,
    },
    {
      question: `How much does ${brand.name} repair cost in ${place.name}?`,
      answer: `${brand.name} repair in ${place.name} typically costs £${stats.minCalloutFee || 55}-£75 for callout/diagnosis, with average total repairs ranging from £95-£160. Authorized repairs may cost slightly more but include genuine parts and warranty protection.`,
    },
    {
      question: `Do ${brand.name}-authorized engineers use genuine parts?`,
      answer: `Yes, authorized ${brand.name} engineers are required to use genuine ${brand.name} parts as part of their authorization agreement. This ensures compatibility and maintains your appliance's warranty.`,
    },
    {
      question: `How can I verify an engineer is actually ${brand.name}-authorized?`,
      answer: `You can ask to see their authorization certificate from ${brand.name}, which includes a unique certificate number. Our listings display verified authorization status for engineers who have provided proof of their ${brand.name} certification.`,
    },
  ]

  return faqs
}

/**
 * Fetch all data for a brand repair page
 */
export const getBrandRepairPageData = cache(
  async (
    countrySlug: string,
    citySlug: string,
    brandRepairSlug: string
  ): Promise<BrandRepairPageData | null> => {
    const supabase = await createClient()
    const brandSlug = parseBrandFromRepairSlug(brandRepairSlug)

    // 1. Get brand details
    const { data: brandData, error: brandError } = await supabase
      .from('brands')
      .select('*')
      .eq('slug', brandSlug)
      .eq('is_active', true)
      .single()

    if (brandError || !brandData) {
      console.error('Error fetching brand:', brandError)
      return null
    }

    // 2. Get place (city) details with country
    const { data: placeData, error: placeError } = await supabase
      .from('places')
      .select(`
        id, name, slug, latitude, longitude,
        countries!inner (id, name, slug, flag_emoji)
      `)
      .eq('slug', citySlug)
      .eq('is_active', true)
      .single()

    if (placeError || !placeData) {
      console.error('Error fetching place:', placeError)
      return null
    }

    const country = Array.isArray(placeData.countries)
      ? placeData.countries[0]
      : placeData.countries

    if (!country || country.slug !== countrySlug) {
      return null
    }

    // 3. Get providers authorized for this brand who cover this city
    const { data: providersData } = await supabase
      .from('service_providers')
      .select(`
        *,
        provider_brand_authorisations!inner (
          brand_id,
          authorisation_type,
          certificate_number,
          valid_from,
          valid_until,
          is_verified
        ),
        provider_coverage_places!inner (
          place_id,
          is_primary,
          additional_callout_fee,
          same_day_available
        ),
        provider_services (
          appliance_category_id,
          is_active,
          offers_same_day,
          callout_fee_min,
          callout_fee_max,
          repair_warranty_months,
          appliance_categories (
            id, name, name_singular, slug, tier, icon
          )
        )
      `)
      .eq('provider_brand_authorisations.brand_id', brandData.id)
      .eq('provider_coverage_places.place_id', placeData.id)
      .eq('is_active', true)
      .in('status', ['active', 'claimed', 'verified'])
      .order('is_featured', { ascending: false })
      .order('is_verified', { ascending: false })
      .order('average_rating', { ascending: false, nullsFirst: false })
      .order('provider_score', { ascending: false })

    // Transform providers data
    const providers: ProviderWithAuthorization[] = (providersData || []).map((p) => {
      const auth = Array.isArray(p.provider_brand_authorisations)
        ? p.provider_brand_authorisations[0]
        : p.provider_brand_authorisations

      const services: ProviderServiceData[] = (p.provider_services || [])
        .filter((ps: { is_active: boolean }) => ps.is_active)
        .map((ps: { appliance_category_id: string; is_active: boolean; offers_same_day: boolean; callout_fee_min: number | null; callout_fee_max: number | null; repair_warranty_months: number | null; appliance_categories: { id: string; name: string; name_singular: string | null; slug: string; tier: string; icon: string | null } | { id: string; name: string; name_singular: string | null; slug: string; tier: string; icon: string | null }[] | null }) => {
          const cat = Array.isArray(ps.appliance_categories)
            ? ps.appliance_categories[0]
            : ps.appliance_categories
          return {
            appliance_category_id: ps.appliance_category_id,
            is_active: ps.is_active,
            offers_same_day: ps.offers_same_day,
            callout_fee_min: ps.callout_fee_min,
            callout_fee_max: ps.callout_fee_max,
            repair_warranty_months: ps.repair_warranty_months,
            category_name: cat?.name || '',
            category_slug: cat?.slug || '',
            category_icon: cat?.icon || null,
          }
        })

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        phone: p.phone,
        email: p.email,
        website: p.website,
        address_line1: p.address_line1,
        city_name: p.city_name,
        postcode: p.postcode,
        latitude: p.latitude,
        longitude: p.longitude,
        description: p.description,
        short_description: p.short_description,
        years_trading: p.years_trading,
        callout_fee_from: p.callout_fee_from,
        callout_fee_to: p.callout_fee_to,
        no_fix_no_fee: p.no_fix_no_fee,
        free_quotes: p.free_quotes,
        offers_same_day: p.offers_same_day,
        offers_next_day: p.offers_next_day,
        offers_emergency: p.offers_emergency,
        offers_weekend: p.offers_weekend,
        gas_safe_registered: p.gas_safe_registered,
        fgas_certified: p.fgas_certified,
        which_trusted_trader: p.which_trusted_trader,
        checkatrade_member: p.checkatrade_member,
        checkatrade_rating: p.checkatrade_rating,
        public_liability_insurance: p.public_liability_insurance,
        warranty_on_repairs_months: p.warranty_on_repairs_months,
        warranty_on_parts_months: p.warranty_on_parts_months,
        uses_genuine_parts: p.uses_genuine_parts,
        average_rating: p.average_rating,
        review_count: p.review_count,
        provider_score: p.provider_score,
        is_verified: p.is_verified,
        is_featured: p.is_featured,
        status: p.status,
        authorization: {
          brand_id: auth?.brand_id || brandData.id,
          authorisation_type: auth?.authorisation_type || null,
          certificate_number: auth?.certificate_number || null,
          valid_from: auth?.valid_from || null,
          valid_until: auth?.valid_until || null,
          is_verified: auth?.is_verified || false,
        },
        services,
      }
    })

    // 4. Aggregate appliance categories from providers
    const categoryMap = new Map<string, ApplianceCategoryWithCount>()
    providers.forEach((provider) => {
      provider.services.forEach((service) => {
        const existing = categoryMap.get(service.appliance_category_id)
        if (existing) {
          existing.provider_count++
        } else {
          // Need to fetch category details
          categoryMap.set(service.appliance_category_id, {
            id: service.appliance_category_id,
            name: service.category_name,
            name_singular: null,
            slug: service.category_slug,
            tier: '',
            icon: service.category_icon,
            provider_count: 1,
          })
        }
      })
    })

    const applianceCategories = Array.from(categoryMap.values())
      .sort((a, b) => b.provider_count - a.provider_count)
      .slice(0, 8)

    // 5. Get other brands with providers in this city
    const { data: otherBrandsData } = await supabase
      .from('provider_brand_authorisations')
      .select(`
        brand_id,
        is_verified,
        brands!inner (id, name, slug, tier, logo_url),
        service_providers!inner (
          id,
          provider_coverage_places!inner (place_id)
        )
      `)
      .eq('service_providers.provider_coverage_places.place_id', placeData.id)
      .eq('service_providers.is_active', true)
      .neq('brand_id', brandData.id)

    // Aggregate other brands
    const brandMap = new Map<string, BrandWithCount>()
    ;(otherBrandsData || []).forEach((pba) => {
      const brand = Array.isArray(pba.brands) ? pba.brands[0] : pba.brands
      if (!brand) return

      const existing = brandMap.get(brand.id)
      if (existing) {
        existing.provider_count++
        if (pba.is_verified) existing.verified_count++
      } else {
        brandMap.set(brand.id, {
          id: brand.id,
          name: brand.name,
          slug: brand.slug,
          tier: brand.tier,
          logo_url: brand.logo_url,
          provider_count: 1,
          verified_count: pba.is_verified ? 1 : 0,
        })
      }
    })

    const otherBrands = Array.from(brandMap.values())
      .sort((a, b) => b.provider_count - a.provider_count)
      .slice(0, 8)

    // 6. Get nearby cities with this brand's providers
    // For simplicity, we'll query nearby places and check for brand providers
    const { data: nearbyPlacesData } = await supabase
      .from('places')
      .select(`
        id, name, slug, latitude, longitude,
        countries!inner (slug)
      `)
      .eq('is_active', true)
      .neq('id', placeData.id)
      .limit(50)

    // Filter to places with this brand's providers and calculate distance
    const nearbyCitiesPromises = (nearbyPlacesData || []).map(async (nearbyPlace) => {
      const nearbyCountry = Array.isArray(nearbyPlace.countries)
        ? nearbyPlace.countries[0]
        : nearbyPlace.countries

      if (!nearbyCountry) return null

      // First get provider_ids that cover this place
      const { data: coverageData } = await supabase
        .from('provider_coverage_places')
        .select('provider_id')
        .eq('place_id', nearbyPlace.id)

      if (!coverageData || coverageData.length === 0) return null

      const providerIds = coverageData.map((c) => c.provider_id)

      // Then check how many of those providers are authorized for this brand
      const { count } = await supabase
        .from('provider_brand_authorisations')
        .select('*', { count: 'exact', head: true })
        .eq('brand_id', brandData.id)
        .in('provider_id', providerIds)

      if (!count || count === 0) return null

      // Calculate distance using Haversine formula
      let distanceKm = 0
      if (placeData.latitude && placeData.longitude && nearbyPlace.latitude && nearbyPlace.longitude) {
        const R = 6371 // Earth's radius in km
        const dLat = ((nearbyPlace.latitude - placeData.latitude) * Math.PI) / 180
        const dLon = ((nearbyPlace.longitude - placeData.longitude) * Math.PI) / 180
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((placeData.latitude * Math.PI) / 180) *
            Math.cos((nearbyPlace.latitude * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        distanceKm = R * c
      }

      return {
        id: nearbyPlace.id,
        name: nearbyPlace.name,
        slug: nearbyPlace.slug,
        country_slug: nearbyCountry.slug,
        provider_count: count,
        distance_km: Math.round(distanceKm * 10) / 10,
      }
    })

    const nearbyCitiesResults = await Promise.all(nearbyCitiesPromises)
    const nearbyCities = nearbyCitiesResults
      .filter((city): city is NearbyCityWithCount => city !== null)
      .sort((a, b) => a.distance_km - b.distance_km)
      .slice(0, 6)

    // 7. Compute stats
    const stats = computeStats(providers)

    // 8. Generate FAQs
    const place: PlaceData = {
      id: placeData.id,
      name: placeData.name,
      slug: placeData.slug,
      latitude: placeData.latitude,
      longitude: placeData.longitude,
    }

    const brand: BrandData = {
      id: brandData.id,
      name: brandData.name,
      slug: brandData.slug,
      tier: brandData.tier,
      logo_url: brandData.logo_url,
      website: brandData.website,
      country_of_origin: brandData.country_of_origin,
      description: brandData.description,
      has_authorised_network: brandData.has_authorised_network,
    }

    const faqs = generateBrandRepairFAQs(brand, place, stats)

    // 9. Determine indexability (min 3 providers for brand repair)
    const isIndexable = providers.length >= 3

    return {
      brand,
      place,
      country: {
        id: country.id,
        name: country.name,
        slug: country.slug,
        flag_emoji: country.flag_emoji,
      },
      providers,
      applianceCategories,
      otherBrands,
      nearbyCities,
      stats,
      faqs,
      isIndexable,
    }
  }
)

/**
 * Get brand repair page data with error handling
 */
export async function getBrandRepairPageDataSafe(
  countrySlug: string,
  citySlug: string,
  brandRepairSlug: string
): Promise<BrandRepairPageData | null> {
  try {
    return await getBrandRepairPageData(countrySlug, citySlug, brandRepairSlug)
  } catch (error) {
    console.error('Error fetching brand repair page data:', error)
    return null
  }
}
