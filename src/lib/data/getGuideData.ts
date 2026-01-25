import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'
import type { Guide, GuideCategory } from './getGuidesIndexData'

export interface GuideData {
  guide: Guide
  relatedGuides: Guide[]
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
 * Fetch a single guide by slug with related guides
 */
export const getGuideData = cache(
  async (slug: string): Promise<GuideData | null> => {
    const supabase = await createClient()

    // Fetch the guide
    const { data: guide, error: guideError } = await supabase
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
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (guideError || !guide) {
      console.error('Error fetching guide:', guideError)
      return null
    }

    // Transform the guide data
    const transformedGuide: Guide = {
      id: guide.id,
      title: guide.title,
      slug: guide.slug,
      excerpt: guide.excerpt,
      content: guide.content,
      featured_image_url: guide.featured_image_url,
      category_id: guide.category_id,
      category: extractCategory(guide.guide_categories),
      reading_time_minutes: guide.reading_time_minutes,
      is_featured: guide.is_featured || false,
      published_at: guide.published_at,
      created_at: guide.created_at,
      updated_at: guide.updated_at,
    }

    // Fetch related guides (same category, excluding current guide)
    let relatedGuidesQuery = supabase
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
      .neq('id', guide.id)
      .limit(3)

    // If the guide has a category, prioritize same-category guides
    if (guide.category_id) {
      relatedGuidesQuery = relatedGuidesQuery.eq('category_id', guide.category_id)
    }

    const { data: relatedGuides, error: relatedError } = await relatedGuidesQuery

    if (relatedError) {
      console.error('Error fetching related guides:', relatedError)
      // Continue without related guides
    }

    // Transform related guides
    const transformedRelated: Guide[] = (relatedGuides || []).map((g) => ({
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

    return {
      guide: transformedGuide,
      relatedGuides: transformedRelated,
    }
  }
)

/**
 * Get guide data with fallback
 */
export async function getGuideDataSafe(slug: string): Promise<GuideData | null> {
  try {
    return await getGuideData(slug)
  } catch (error) {
    console.error('Error fetching guide data:', error)
    return null
  }
}

/**
 * Get all published guide slugs for static generation
 */
export const getGuidesSlugs = cache(
  async (): Promise<string[]> => {
    const supabase = await createClient()

    const { data: guides, error } = await supabase
      .from('guides')
      .select('slug')
      .eq('status', 'published')

    if (error) {
      console.error('Error fetching guide slugs:', error)
      return []
    }

    return (guides || []).map(g => g.slug)
  }
)
