import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/search/suggestions
 *
 * Returns autocomplete suggestions for search inputs
 * Query params:
 * - q: search query (min 2 chars)
 * - type: 'keyword' | 'location' | 'all' (default: 'all')
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q') || ''
  const type = searchParams.get('type') || 'all'

  // Return empty for short queries
  if (query.length < 2) {
    return NextResponse.json({
      places: [],
      categories: [],
      brands: [],
    })
  }

  try {
    const supabase = await createClient()
    const queryLower = query.toLowerCase().trim()

    // Build and execute queries based on type
    // Use contains match (%query%) to find places like "City of London" when searching "london"
    const placesPromise = (type === 'location' || type === 'all')
      ? supabase
          .from('places')
          .select(`
            name, slug,
            countries!inner (slug),
            admin_areas (name)
          `)
          .eq('is_active', true)
          .ilike('name', `%${queryLower}%`)
          .order('population', { ascending: false, nullsFirst: false })
          .limit(8)
      : Promise.resolve({ data: null })

    const categoriesPromise = (type === 'keyword' || type === 'all')
      ? supabase
          .from('appliance_categories')
          .select('name, name_plural, slug, icon')
          .eq('is_active', true)
          .or(`name.ilike.%${queryLower}%,name_plural.ilike.%${queryLower}%`)
          .limit(5)
      : Promise.resolve({ data: null })

    const brandsPromise = (type === 'keyword' || type === 'all')
      ? supabase
          .from('brands')
          .select('name, slug')
          .eq('is_active', true)
          .ilike('name', `${queryLower}%`)
          .limit(5)
      : Promise.resolve({ data: null })

    // Execute queries in parallel
    const [placesResult, categoriesResult, brandsResult] = await Promise.all([
      placesPromise,
      categoriesPromise,
      brandsPromise,
    ])

    // Format results
    const places = placesResult?.data
      ? placesResult.data.map((p: {
          name: string
          slug: string
          countries: { slug: string } | { slug: string }[]
          admin_areas: { name: string } | { name: string }[] | null
        }) => {
          const country = Array.isArray(p.countries) ? p.countries[0] : p.countries
          const adminArea = Array.isArray(p.admin_areas) ? p.admin_areas[0] : p.admin_areas
          return {
            name: p.name,
            slug: p.slug,
            countrySlug: country?.slug || 'england',
            adminArea: adminArea?.name || null,
          }
        })
      : []

    const categories = categoriesResult?.data
      ? categoriesResult.data.map((c: {
          name: string
          name_plural: string | null
          slug: string
          icon: string | null
        }) => ({
          name: c.name_plural || c.name,
          slug: c.slug,
          icon: c.icon,
        }))
      : []

    const brands = brandsResult?.data
      ? brandsResult.data.map((b: { name: string; slug: string }) => ({
          name: b.name,
          slug: b.slug,
        }))
      : []

    return NextResponse.json({
      places,
      categories,
      brands,
    })
  } catch (error) {
    console.error('Error fetching suggestions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch suggestions' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/search/suggestions/popular
 * Returns popular categories for initial dropdown state
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type } = body

    const supabase = await createClient()

    if (type === 'categories') {
      // Get popular categories (tier_1 and tier_2)
      const { data: categories } = await supabase
        .from('appliance_categories')
        .select('name, name_plural, slug, icon')
        .eq('is_active', true)
        .in('tier', ['tier_1', 'tier_2'])
        .order('display_order', { ascending: true })
        .limit(8)

      return NextResponse.json({
        categories: (categories || []).map(c => ({
          name: c.name_plural || c.name,
          slug: c.slug,
          icon: c.icon,
        })),
      })
    }

    if (type === 'places') {
      // Get top cities by population
      const { data: places } = await supabase
        .from('places')
        .select(`
          name, slug,
          countries!inner (slug),
          admin_areas (name)
        `)
        .eq('is_active', true)
        .order('population', { ascending: false, nullsFirst: false })
        .limit(8)

      return NextResponse.json({
        places: (places || []).map((p: {
          name: string
          slug: string
          countries: { slug: string } | { slug: string }[]
          admin_areas: { name: string } | { name: string }[] | null
        }) => {
          const country = Array.isArray(p.countries) ? p.countries[0] : p.countries
          const adminArea = Array.isArray(p.admin_areas) ? p.admin_areas[0] : p.admin_areas
          return {
            name: p.name,
            slug: p.slug,
            countrySlug: country?.slug || 'england',
            adminArea: adminArea?.name || null,
          }
        }),
      })
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  } catch (error) {
    console.error('Error fetching popular items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch popular items' },
      { status: 500 }
    )
  }
}
