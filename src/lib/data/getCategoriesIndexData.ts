import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

// Types for the Categories Index Page

export interface CategoryWithStats {
  id: string
  name: string
  name_plural: string | null
  slug: string
  tier: 'tier_1' | 'tier_2' | 'tier_3' | 'supplementary'
  icon: string | null
  description: string | null
  store_count: number
}

export interface CategoriesIndexStats {
  totalCategories: number
  totalStores: number
  totalCities: number
}

export interface CategoriesIndexData {
  tier1Categories: CategoryWithStats[]
  tier2Categories: CategoryWithStats[]
  tier3Categories: CategoryWithStats[]
  supplementaryCategories: CategoryWithStats[]
  stats: CategoriesIndexStats
}

/**
 * Fetch all data for the categories index page
 */
export const getCategoriesIndexData = cache(
  async (): Promise<CategoriesIndexData | null> => {
    const supabase = await createClient()

    // 1. Get all top-level active categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('appliance_categories')
      .select('id, name, name_plural, slug, tier, icon, description')
      .eq('is_active', true)
      .is('parent_id', null)
      .order('display_order', { ascending: true })

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError)
      return null
    }

    // 2. Get store counts per category
    const { data: storesWithCategories } = await supabase
      .from('stores')
      .select(`
        id,
        store_categories (
          category_id
        )
      `)
      .eq('is_active', true)
      .in('status', ['active', 'claimed', 'verified'])

    // Count stores per category
    const categoryStoreCountMap = new Map<string, number>()

    ;(storesWithCategories || []).forEach((store) => {
      const categories = store.store_categories || []
      categories.forEach((sc: { category_id: string }) => {
        const count = categoryStoreCountMap.get(sc.category_id) || 0
        categoryStoreCountMap.set(sc.category_id, count + 1)
      })
    })

    // 3. Get total unique cities with stores
    const { data: storesWithPlaces } = await supabase
      .from('stores')
      .select('place_id')
      .eq('is_active', true)
      .in('status', ['active', 'claimed', 'verified'])

    const uniquePlaceIds = new Set(
      (storesWithPlaces || []).map((s) => s.place_id).filter(Boolean)
    )

    // Build categories with stats
    const categoriesWithStats: CategoryWithStats[] = (categoriesData || []).map((cat) => ({
      id: cat.id,
      name: cat.name,
      name_plural: cat.name_plural,
      slug: cat.slug,
      tier: cat.tier as 'tier_1' | 'tier_2' | 'tier_3' | 'supplementary',
      icon: cat.icon,
      description: cat.description,
      store_count: categoryStoreCountMap.get(cat.id) || 0,
    }))

    // Group by tier
    const tier1Categories = categoriesWithStats.filter((c) => c.tier === 'tier_1')
    const tier2Categories = categoriesWithStats.filter((c) => c.tier === 'tier_2')
    const tier3Categories = categoriesWithStats.filter((c) => c.tier === 'tier_3')
    const supplementaryCategories = categoriesWithStats.filter((c) => c.tier === 'supplementary')

    // Calculate stats
    const totalCategories = categoriesWithStats.length
    const totalStores = storesWithCategories?.length || 0
    const totalCities = uniquePlaceIds.size

    return {
      tier1Categories,
      tier2Categories,
      tier3Categories,
      supplementaryCategories,
      stats: {
        totalCategories,
        totalStores,
        totalCities,
      },
    }
  }
)

/**
 * Get categories index data with fallback
 */
export async function getCategoriesIndexDataSafe(): Promise<CategoriesIndexData | null> {
  try {
    return await getCategoriesIndexData()
  } catch (error) {
    console.error('Error fetching categories index data:', error)
    return null
  }
}
