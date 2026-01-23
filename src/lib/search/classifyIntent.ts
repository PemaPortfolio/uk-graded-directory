import { createClient } from '@/lib/supabase/server'

/**
 * Search Intent Classification (Spec 02)
 *
 * This is a server-side utility function that can be called from:
 * - Route handlers (API routes)
 * - Server Components
 * - Server Actions
 *
 * Classifies user search queries and returns the appropriate URL to navigate to.
 * Priority order:
 * 1. Exact place match → /{countrySlug}/{placeSlug}/ (cities/towns)
 * 2. Exact admin area match → /{countrySlug}/{adminAreaSlug}/ (boroughs/counties)
 * 3. Exact category match → /{categorySlug}/ (national)
 * 4. Exact brand match → /{brandSlug}/ (national)
 * 5. Repair intent + category → /{categorySlug}-repair/ (national)
 * 6. Fallback → /search?q={query}
 */

export interface ClassificationResult {
  type: 'place' | 'category' | 'brand' | 'repair' | 'search'
  url: string
  matchedName?: string
}

// Keywords that indicate repair intent
const REPAIR_KEYWORDS = [
  'repair', 'fix', 'broken', 'engineer', 'service',
  'maintenance', 'not working', 'fault', 'error',
  'leaking', 'noise', 'technician', 'call out'
]

/**
 * Classify a search query and return the best URL to navigate to
 */
export async function classifySearchIntent(
  query: string,
  filter: 'all' | 'buy' | 'repair' = 'all'
): Promise<ClassificationResult> {
  try {
    const supabase = await createClient()
    const queryLower = query.toLowerCase().trim()
    const queryNormalized = queryLower.replace(/[^a-z0-9\s]/g, '')
    const querySlug = queryNormalized.replace(/\s+/g, '-')

    if (!queryNormalized) {
      return { type: 'search', url: '/search' }
    }

    // 1. Check for place match (highest priority for location searches)
    // Try: exact slug → exact name → partial name (starts with) → partial name (contains)
    const { data: placeBySlug } = await supabase
      .from('places')
      .select(`
        id, name, slug,
        countries!inner (slug)
      `)
      .eq('is_active', true)
      .eq('slug', querySlug)
      .limit(1)

    let placeMatch = placeBySlug?.[0]

    // If no slug match, try exact case-insensitive name match
    if (!placeMatch) {
      const { data: placeByName } = await supabase
        .from('places')
        .select(`
          id, name, slug,
          countries!inner (slug)
        `)
        .eq('is_active', true)
        .ilike('name', queryNormalized)
        .order('population', { ascending: false, nullsFirst: false })
        .limit(1)

      placeMatch = placeByName?.[0]
    }

    // If no exact match, try partial match (name starts with query)
    if (!placeMatch) {
      const { data: placeByPartial } = await supabase
        .from('places')
        .select(`
          id, name, slug,
          countries!inner (slug)
        `)
        .eq('is_active', true)
        .ilike('name', `${queryNormalized}%`)
        .order('population', { ascending: false, nullsFirst: false })
        .limit(1)

      placeMatch = placeByPartial?.[0]
    }

    // If still no match, try contains match (for queries like "london" → "City of London")
    if (!placeMatch) {
      const { data: placeByContains } = await supabase
        .from('places')
        .select(`
          id, name, slug,
          countries!inner (slug)
        `)
        .eq('is_active', true)
        .ilike('name', `%${queryNormalized}%`)
        .order('population', { ascending: false, nullsFirst: false })
        .limit(1)

      placeMatch = placeByContains?.[0]
    }

    if (placeMatch) {
      const country = Array.isArray(placeMatch.countries)
        ? placeMatch.countries[0]
        : placeMatch.countries
      const countrySlug = country?.slug || 'england'

      return {
        type: 'place',
        url: `/${countrySlug}/${placeMatch.slug}/`,
        matchedName: placeMatch.name
      }
    }

    // 2. Check for admin area match (boroughs, counties, regions)
    // Only if no place was found - admin areas are lower priority than specific places
    const { data: adminAreaBySlug } = await supabase
      .from('admin_areas')
      .select(`
        id, name, slug,
        countries!inner (slug)
      `)
      .eq('is_active', true)
      .eq('slug', querySlug)
      .limit(1)

    let adminAreaMatch = adminAreaBySlug?.[0]

    // If no slug match, try name match
    if (!adminAreaMatch) {
      const { data: adminAreaByName } = await supabase
        .from('admin_areas')
        .select(`
          id, name, slug,
          countries!inner (slug)
        `)
        .eq('is_active', true)
        .ilike('name', `%${queryNormalized}%`)
        .limit(1)

      adminAreaMatch = adminAreaByName?.[0]
    }

    if (adminAreaMatch) {
      const country = Array.isArray(adminAreaMatch.countries)
        ? adminAreaMatch.countries[0]
        : adminAreaMatch.countries
      const countrySlug = country?.slug || 'england'

      return {
        type: 'place', // Use 'place' type since it routes to same page structure
        url: `/${countrySlug}/${adminAreaMatch.slug}/`,
        matchedName: adminAreaMatch.name
      }
    }

    // 3. Check for repair intent in query
    const hasRepairIntent = filter === 'repair' ||
      REPAIR_KEYWORDS.some(keyword => queryLower.includes(keyword))

    // 4. Check for category match
    // Try slug match first, then name match
    const { data: categoryBySlug } = await supabase
      .from('appliance_categories')
      .select('id, name, name_plural, name_singular, slug, supports_repair')
      .eq('is_active', true)
      .eq('slug', querySlug)
      .limit(1)

    let categoryMatch = categoryBySlug?.[0]

    if (!categoryMatch) {
      // Try matching by name (partial match)
      const { data: categoryByName } = await supabase
        .from('appliance_categories')
        .select('id, name, name_plural, name_singular, slug, supports_repair')
        .eq('is_active', true)
        .ilike('name', `%${queryNormalized}%`)
        .limit(1)

      categoryMatch = categoryByName?.[0]
    }

    if (!categoryMatch) {
      // Try matching by plural name
      const { data: categoryByPlural } = await supabase
        .from('appliance_categories')
        .select('id, name, name_plural, name_singular, slug, supports_repair')
        .eq('is_active', true)
        .ilike('name_plural', `%${queryNormalized}%`)
        .limit(1)

      categoryMatch = categoryByPlural?.[0]
    }

    if (categoryMatch) {
      // If repair intent and category supports repair, go to repair page
      if (hasRepairIntent && categoryMatch.supports_repair) {
        return {
          type: 'repair',
          url: `/${categoryMatch.slug}-repair/`,
          matchedName: categoryMatch.name
        }
      }

      // Otherwise go to retail category page
      return {
        type: 'category',
        url: `/${categoryMatch.slug}/`,
        matchedName: categoryMatch.name_plural || categoryMatch.name
      }
    }

    // 5. Check for brand match
    const { data: brandBySlug } = await supabase
      .from('brands')
      .select('id, name, slug')
      .eq('is_active', true)
      .eq('slug', querySlug)
      .limit(1)

    let brandMatch = brandBySlug?.[0]

    if (!brandMatch) {
      const { data: brandByName } = await supabase
        .from('brands')
        .select('id, name, slug')
        .eq('is_active', true)
        .ilike('name', queryNormalized)
        .limit(1)

      brandMatch = brandByName?.[0]
    }

    if (brandMatch) {
      // Brand pages are repair-focused, so route to brand repair page
      return {
        type: 'brand',
        url: `/${brandMatch.slug}-repair/`,
        matchedName: brandMatch.name
      }
    }

    // 6. Fallback to search page
    return {
      type: 'search',
      url: `/search?q=${encodeURIComponent(query.trim())}${filter !== 'all' ? `&type=${filter}` : ''}`
    }
  } catch (error) {
    console.error('Error in classifySearchIntent:', error)
    // Fallback to search page on any error
    return {
      type: 'search',
      url: `/search?q=${encodeURIComponent(query.trim())}${filter !== 'all' ? `&type=${filter}` : ''}`
    }
  }
}

/**
 * Get suggestions for autocomplete (places, categories, brands)
 * Returns top matches for each type
 */
export async function getSearchSuggestions(query: string): Promise<{
  places: Array<{ name: string; slug: string; countrySlug: string }>
  categories: Array<{ name: string; slug: string; icon: string | null }>
  brands: Array<{ name: string; slug: string }>
}> {
  if (!query || query.length < 2) {
    return { places: [], categories: [], brands: [] }
  }

  try {
    const supabase = await createClient()
    const queryLower = query.toLowerCase().trim()

    // Fetch all in parallel
    const [placesResult, categoriesResult, brandsResult] = await Promise.all([
      supabase
        .from('places')
        .select(`name, slug, countries!inner (slug)`)
        .eq('is_active', true)
        .ilike('name', `${queryLower}%`)
        .order('population', { ascending: false, nullsFirst: false })
        .limit(5),

      supabase
        .from('appliance_categories')
        .select('name, name_plural, slug, icon')
        .eq('is_active', true)
        .ilike('name', `%${queryLower}%`)
        .limit(5),

      supabase
        .from('brands')
        .select('name, slug')
        .eq('is_active', true)
        .ilike('name', `${queryLower}%`)
        .limit(5)
    ])

    return {
      places: (placesResult.data || []).map(p => {
        const country = Array.isArray(p.countries) ? p.countries[0] : p.countries
        return {
          name: p.name,
          slug: p.slug,
          countrySlug: country?.slug || 'england'
        }
      }),
      categories: (categoriesResult.data || []).map(c => ({
        name: c.name_plural || c.name,
        slug: c.slug,
        icon: c.icon
      })),
      brands: (brandsResult.data || []).map(b => ({
        name: b.name,
        slug: b.slug
      }))
    }
  } catch (error) {
    console.error('Error in getSearchSuggestions:', error)
    return { places: [], categories: [], brands: [] }
  }
}
