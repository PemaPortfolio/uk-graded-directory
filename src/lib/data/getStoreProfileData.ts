import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

export interface StoreProfileData {
  id: string
  slug: string
  business_name: string
  trading_name: string | null
  short_description: string | null
  description: string | null
  year_established: number | null
  logo_url: string | null
  cover_image_url: string | null
  phone: string | null
  phone_secondary: string | null
  email: string | null
  website: string | null
  address_line1: string | null
  address_line2: string | null
  postcode: string | null
  latitude: number | null
  longitude: number | null
  operating_hours: Record<string, string> | null
  average_rating: number | null
  review_count: number
  status: string
  is_featured: boolean
  is_verified: boolean
  // Services
  offers_delivery: boolean
  offers_free_delivery: boolean
  free_delivery_threshold: number | null
  delivery_radius_miles: number | null
  offers_same_day_delivery: boolean
  offers_next_day_delivery: boolean
  offers_installation: boolean
  offers_free_installation: boolean
  installation_cost: number | null
  offers_old_appliance_removal: boolean
  offers_weee_recycling: boolean
  offers_finance: boolean
  offers_zero_percent_finance: boolean
  finance_providers: string[] | null
  offers_click_collect: boolean
  offers_repair_service: boolean
  warranty_months: number | null
  // SEO
  seo_title: string | null
  seo_meta_description: string | null
  is_indexable: boolean
}

export interface StoreCategory {
  id: string
  name: string
  name_plural: string
  slug: string
  icon: string | null
  tier: string
}

export interface StoreBrand {
  id: string
  name: string
  slug: string
  logo_url: string | null
  tier: string
}

export interface StoreReview {
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

export interface OtherStore {
  id: string
  business_name: string
  slug: string
  average_rating: number | null
  review_count: number
}

export interface StorePageData {
  store: StoreProfileData
  place: PlaceInfo
  country: CountryInfo
  categories: StoreCategory[]
  brands: StoreBrand[]
  reviews: StoreReview[]
  otherStores: OtherStore[]
}

/**
 * Fetch all data for a store profile page
 */
export const getStoreProfileData = cache(
  async (storeSlug: string): Promise<StorePageData | null> => {
    const supabase = await createClient()

    // 1. Get store with place and country
    const { data: storeData, error: storeError } = await supabase
      .from('stores')
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
      .eq('slug', storeSlug)
      .eq('is_active', true)
      .single()

    if (storeError || !storeData) {
      console.error('Error fetching store:', storeError)
      return null
    }

    // Extract place and country
    const placeData = Array.isArray(storeData.places)
      ? storeData.places[0]
      : storeData.places
    const countryData = placeData?.countries
      ? Array.isArray(placeData.countries)
        ? placeData.countries[0]
        : placeData.countries
      : null

    if (!placeData || !countryData) {
      console.error('Missing place or country data')
      return null
    }

    // 2. Get store categories
    const { data: categoriesData } = await supabase
      .from('store_categories')
      .select(
        `
        appliance_categories (
          id,
          name,
          name_plural,
          slug,
          icon,
          tier
        )
      `
      )
      .eq('store_id', storeData.id)

    // 3. Get store brands
    const { data: brandsData } = await supabase
      .from('store_brands')
      .select(
        `
        brands (
          id,
          name,
          slug,
          logo_url,
          tier
        )
      `
      )
      .eq('store_id', storeData.id)

    // 4. Get reviews
    const { data: reviewsData } = await supabase
      .from('reviews')
      .select('*')
      .eq('subject_type', 'store')
      .eq('subject_id', storeData.id)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(10)

    // 5. Get other stores in same city
    const { data: otherStoresData } = await supabase
      .from('stores')
      .select('id, business_name, slug, average_rating, review_count')
      .eq('place_id', placeData.id)
      .eq('is_active', true)
      .neq('id', storeData.id)
      .order('average_rating', { ascending: false, nullsFirst: false })
      .limit(4)

    // Transform categories
    const categories: StoreCategory[] = (categoriesData || [])
      .map((item) => {
        const cat = Array.isArray(item.appliance_categories)
          ? item.appliance_categories[0]
          : item.appliance_categories
        return cat
      })
      .filter(Boolean) as StoreCategory[]

    // Transform brands
    const brands: StoreBrand[] = (brandsData || [])
      .map((item) => {
        const brand = Array.isArray(item.brands) ? item.brands[0] : item.brands
        return brand
      })
      .filter(Boolean) as StoreBrand[]

    return {
      store: storeData as StoreProfileData,
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
      brands,
      reviews: (reviewsData || []) as StoreReview[],
      otherStores: (otherStoresData || []) as OtherStore[],
    }
  }
)

/**
 * Get store profile data with fallback
 */
export async function getStoreProfileDataSafe(
  storeSlug: string
): Promise<StorePageData | null> {
  try {
    return await getStoreProfileData(storeSlug)
  } catch (error) {
    console.error('Error fetching store profile data:', error)
    return null
  }
}
