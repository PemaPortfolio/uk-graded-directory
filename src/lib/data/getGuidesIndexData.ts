import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

// Types for the Guides Index Page

export interface GuideCategory {
  id: string
  name: string
  slug: string
  description: string | null
}

export interface Guide {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image_url: string | null
  category_id: string | null
  category: GuideCategory | null
  reading_time_minutes: number | null
  is_featured: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface GuidesIndexData {
  guides: Guide[]
  categories: GuideCategory[]
  featuredGuides: Guide[]
}

// Helper function to extract category from Supabase join result
function extractCategory(guideCategories: unknown): GuideCategory | null {
  if (!guideCategories) return null

  // Handle both array and object cases from Supabase joins
  const cat = Array.isArray(guideCategories) ? guideCategories[0] : guideCategories
  if (!cat) return null

  return {
    id: (cat as Record<string, unknown>).id as string,
    name: (cat as Record<string, unknown>).name as string,
    slug: (cat as Record<string, unknown>).slug as string,
    description: (cat as Record<string, unknown>).description as string | null,
  }
}

/**
 * Fetch all data for the guides index page
 * Supports optional category filtering via categorySlug parameter
 */
export const getGuidesIndexData = cache(
  async (categorySlug?: string): Promise<GuidesIndexData | null> => {
    const supabase = await createClient()

    // Fetch all guide categories
    const { data: categories, error: categoriesError } = await supabase
      .from('guide_categories')
      .select('id, name, slug, description')
      .order('name')

    if (categoriesError) {
      console.error('Error fetching guide categories:', categoriesError)
      // Continue even if categories fail - guides are more important
    }

    // Build guides query
    let guidesQuery = supabase
      .from('guides')
      .select(`
        id,
        title,
        slug,
        excerpt,
        content,
        featured_image_url,
        category_id,
        reading_time_minutes,
        is_featured,
        published_at,
        created_at,
        updated_at,
        guide_categories (
          id,
          name,
          slug,
          description
        )
      `)
      .eq('status', 'published')
      .order('is_featured', { ascending: false })
      .order('published_at', { ascending: false })

    // Filter by category if provided
    if (categorySlug && categories) {
      const category = categories.find(c => c.slug === categorySlug)
      if (category) {
        guidesQuery = guidesQuery.eq('category_id', category.id)
      }
    }

    const { data: guides, error: guidesError } = await guidesQuery

    if (guidesError) {
      console.error('Error fetching guides:', guidesError)
      return null
    }

    // Transform the data
    const transformedGuides: Guide[] = (guides || []).map((g) => ({
      id: g.id,
      title: g.title,
      slug: g.slug,
      excerpt: g.excerpt,
      content: g.content,
      featured_image_url: g.featured_image_url,
      category_id: g.category_id,
      category: extractCategory(g.guide_categories),
      reading_time_minutes: g.reading_time_minutes,
      is_featured: g.is_featured || false,
      published_at: g.published_at,
      created_at: g.created_at,
      updated_at: g.updated_at,
    }))

    // Get featured guides (max 3)
    const featuredGuides = transformedGuides.filter(g => g.is_featured).slice(0, 3)

    return {
      guides: transformedGuides,
      categories: (categories || []) as GuideCategory[],
      featuredGuides,
    }
  }
)

/**
 * Get guides index data with fallback
 */
export async function getGuidesIndexDataSafe(categorySlug?: string): Promise<GuidesIndexData | null> {
  try {
    return await getGuidesIndexData(categorySlug)
  } catch (error) {
    console.error('Error fetching guides index data:', error)
    return null
  }
}
