import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

export interface ProviderProfileData {
  id: string
  slug: string
  business_name: string
  trading_name: string | null
  short_description: string | null
  description: string | null
  phone: string | null
  phone_secondary: string | null
  email: string | null
  website: string | null
  address_line1: string | null
  address_line2: string | null
  city_name: string | null
  postcode: string | null
  latitude: number | null
  longitude: number | null
  operating_hours: Record<string, string> | null
  average_rating: number | null
  review_count: number
  status: string
  is_featured: boolean
  is_verified: boolean
  // Business details
  years_trading: number | null
  number_of_engineers: number | null
  // Pricing
  callout_fee_from: number | null
  callout_fee_to: number | null
  no_fix_no_fee: boolean
  free_quotes: boolean
  // Availability
  offers_same_day: boolean
  offers_next_day: boolean
  offers_emergency: boolean
  offers_weekend: boolean
  offers_evening: boolean
  typical_response_time: string | null
  // Certifications
  gas_safe_registered: boolean
  gas_safe_number: string | null
  fgas_certified: boolean
  which_trusted_trader: boolean
  checkatrade_member: boolean
  checkatrade_id: string | null
  trustatrader_member: boolean
  public_liability_insurance: boolean
  insurance_amount: number | null
  // Warranty
  warranty_on_repairs_months: number | null
  warranty_on_parts_months: number | null
  uses_genuine_parts: boolean
  // Media
  logo_url: string | null
  cover_image_url: string | null
  // SEO
  seo_title: string | null
  seo_meta_description: string | null
  is_indexable: boolean
  // Service area
  business_location_type: string | null
  service_radius_miles: number | null
}

export interface ProviderCategory {
  id: string
  name: string
  name_plural: string
  slug: string
  icon: string | null
}

export interface AuthorizedBrand {
  id: string
  name: string
  slug: string
  logo_url: string | null
  authorisation_type: string | null
}

export interface ProviderReview {
  id: string
  rating: number
  title: string | null
  content: string | null
  reviewer_name: string | null
  reviewer_location: string | null
  is_verified_customer: boolean
  created_at: string
  response: string | null
  response_at: string | null
}

export interface PlaceInfo {
  id: string
  name: string
  slug: string
}

export interface CountryInfo {
  id: string
  name: string
  slug: string
}

export interface OtherProvider {
  id: string
  business_name: string
  slug: string
  average_rating: number | null
  review_count: number
  offers_same_day: boolean
}

export interface ProviderPageData {
  provider: ProviderProfileData
  place: PlaceInfo
  country: CountryInfo
  categories: ProviderCategory[]
  authorizedBrands: AuthorizedBrand[]
  reviews: ProviderReview[]
  otherProviders: OtherProvider[]
}

/**
 * Fetch all data for a provider profile page
 */
export const getProviderProfileData = cache(
  async (providerSlug: string): Promise<ProviderPageData | null> => {
    const supabase = await createClient()

    // 1. Get provider with place and country
    const { data: providerData, error: providerError } = await supabase
      .from('service_providers')
      .select(
        `
        *,
        places!inner (
          id,
          name,
          slug,
          countries!inner (
            id,
            name,
            slug
          )
        )
      `
      )
      .eq('slug', providerSlug)
      .eq('is_active', true)
      .single()

    if (providerError || !providerData) {
      console.error('Error fetching provider:', providerError)
      return null
    }

    // Extract place and country
    const placeData = Array.isArray(providerData.places)
      ? providerData.places[0]
      : providerData.places
    const countryData = placeData?.countries
      ? Array.isArray(placeData.countries)
        ? placeData.countries[0]
        : placeData.countries
      : null

    if (!placeData || !countryData) {
      console.error('Missing place or country data')
      return null
    }

    // 2. Get provider services (categories)
    const { data: servicesData } = await supabase
      .from('provider_services')
      .select(
        `
        appliance_categories (
          id,
          name,
          name_plural,
          slug,
          icon
        )
      `
      )
      .eq('provider_id', providerData.id)

    // 3. Get authorized brands
    const { data: brandsData } = await supabase
      .from('provider_brand_authorisations')
      .select(
        `
        authorisation_type,
        brands (
          id,
          name,
          slug,
          logo_url
        )
      `
      )
      .eq('provider_id', providerData.id)

    // 4. Get reviews
    const { data: reviewsData } = await supabase
      .from('reviews')
      .select('*')
      .eq('subject_type', 'provider')
      .eq('subject_id', providerData.id)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(10)

    // 5. Get other providers in same city
    const { data: otherProvidersData } = await supabase
      .from('service_providers')
      .select('id, business_name, slug, average_rating, review_count, offers_same_day')
      .eq('place_id', placeData.id)
      .eq('is_active', true)
      .neq('id', providerData.id)
      .order('average_rating', { ascending: false, nullsFirst: false })
      .limit(4)

    // Transform categories
    const categories: ProviderCategory[] = (servicesData || [])
      .map((item) => {
        const cat = Array.isArray(item.appliance_categories)
          ? item.appliance_categories[0]
          : item.appliance_categories
        return cat
      })
      .filter(Boolean) as ProviderCategory[]

    // Transform authorized brands
    const authorizedBrands: AuthorizedBrand[] = (brandsData || [])
      .map((item) => {
        const brand = Array.isArray(item.brands) ? item.brands[0] : item.brands
        if (!brand) return null
        return {
          ...brand,
          authorisation_type: item.authorisation_type,
        }
      })
      .filter(Boolean) as AuthorizedBrand[]

    return {
      provider: providerData as ProviderProfileData,
      place: {
        id: placeData.id,
        name: placeData.name,
        slug: placeData.slug,
      },
      country: {
        id: countryData.id,
        name: countryData.name,
        slug: countryData.slug,
      },
      categories,
      authorizedBrands,
      reviews: (reviewsData || []) as ProviderReview[],
      otherProviders: (otherProvidersData || []) as OtherProvider[],
    }
  }
)

/**
 * Get provider profile data with fallback
 */
export async function getProviderProfileDataSafe(
  providerSlug: string
): Promise<ProviderPageData | null> {
  try {
    return await getProviderProfileData(providerSlug)
  } catch (error) {
    console.error('Error fetching provider profile data:', error)
    return null
  }
}
