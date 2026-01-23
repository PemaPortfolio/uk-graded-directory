import { classifySearchIntent } from '@/lib/search/classifyIntent'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Search Intent Classification API (Spec 02)
 *
 * GET /api/search/classify?q=manchester&filter=all
 * POST /api/search/classify { query: string, filter: 'all' | 'buy' | 'repair' }
 *
 * Returns: { type, url, matchedName? }
 *
 * Uses the shared classification logic from classifyIntent.ts
 */

// GET handler for easy browser testing
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q') || ''
  const filter = (searchParams.get('filter') || 'all') as 'all' | 'buy' | 'repair'

  const result = await classifySearchIntent(query, filter)
  return NextResponse.json(result)
}

// POST handler for SearchBar component
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, filter = 'all' } = body as { query: string; filter?: 'all' | 'buy' | 'repair' }

    const result = await classifySearchIntent(query, filter)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Search classify POST error:', error)
    return NextResponse.json({
      type: 'search',
      url: '/search',
    })
  }
}
