import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

// Types for the Brands Index Page

export interface BrandWithStats {
  id: string
  name: string
  slug: string
  logo_url: string | null
  tier: 'premium' | 'mid_range' | 'value'
  store_count: number
  provider_count: number
  has_authorised_network: boolean
  country_of_origin: string | null
  popularity_score: number
}

export interface BrandsIndexStats {
  totalBrands: number
  premiumCount: number
  midRangeCount: number
  valueCount: number
  totalStores: number
}

export interface BrandsIndexData {
  premiumBrands: BrandWithStats[]
  midRangeBrands: BrandWithStats[]
  valueBrands: BrandWithStats[]
  stats: BrandsIndexStats
}

/**
 * Fetch all data for the brands index page
 */
export const getBrandsIndexData = cache(
  async (): Promise<BrandsIndexData | null> => {
    const supabase = await createClient()

    // Get all active brands with store counts > 0
    const { data: brands, error: brandsError } = await supabase
      .from('brands')
      .select(`
        id,
        name,
        slug,
        logo_url,
        tier,
        store_count,
        provider_count,
        has_authorised_network,
        country_of_origin,
        popularity_score
      `)
      .eq('is_active', true)
      .order('popularity_score', { ascending: false })

    if (brandsError) {
      console.error('Error fetching brands:', brandsError)
      return null
    }

    const allBrands: BrandWithStats[] = (brands || []).map((b) => ({
      id: b.id,
      name: b.name,
      slug: b.slug,
      logo_url: b.logo_url,
      tier: b.tier as 'premium' | 'mid_range' | 'value',
      store_count: b.store_count || 0,
      provider_count: b.provider_count || 0,
      has_authorised_network: b.has_authorised_network || false,
      country_of_origin: b.country_of_origin,
      popularity_score: b.popularity_score || 0,
    }))

    // Group by tier
    const premiumBrands = allBrands.filter((b) => b.tier === 'premium')
    const midRangeBrands = allBrands.filter((b) => b.tier === 'mid_range')
    const valueBrands = allBrands.filter((b) => b.tier === 'value')

    // Calculate totals
    const totalStores = allBrands.reduce((sum, b) => sum + b.store_count, 0)

    return {
      premiumBrands,
      midRangeBrands,
      valueBrands,
      stats: {
        totalBrands: allBrands.length,
        premiumCount: premiumBrands.length,
        midRangeCount: midRangeBrands.length,
        valueCount: valueBrands.length,
        totalStores,
      },
    }
  }
)

/**
 * Get brands index data with fallback
 */
export async function getBrandsIndexDataSafe(): Promise<BrandsIndexData | null> {
  try {
    return await getBrandsIndexData()
  } catch (error) {
    console.error('Error fetching brands index data:', error)
    return null
  }
}
