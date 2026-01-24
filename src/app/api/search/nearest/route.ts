import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * POST /api/search/nearest
 *
 * Finds the nearest place to the given coordinates
 * Body: { lat: number, lng: number }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { lat, lng } = body

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return NextResponse.json(
        { error: 'Invalid coordinates' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Use the haversine_distance_miles function to find nearest place
    // First, get places within a reasonable bounding box, then sort by distance
    const latDelta = 0.5 // Roughly 30 miles
    const lngDelta = 0.5

    const { data: places, error } = await supabase
      .from('places')
      .select(`
        id, name, slug, latitude, longitude,
        countries!inner (slug),
        admin_areas (name)
      `)
      .eq('is_active', true)
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)
      .gte('latitude', lat - latDelta)
      .lte('latitude', lat + latDelta)
      .gte('longitude', lng - lngDelta)
      .lte('longitude', lng + lngDelta)
      .limit(20)

    if (error) {
      console.error('Error finding nearest place:', error)
      return NextResponse.json(
        { error: 'Failed to find nearby places' },
        { status: 500 }
      )
    }

    if (!places || places.length === 0) {
      // If no places in bounding box, try a wider search
      const { data: widerPlaces } = await supabase
        .from('places')
        .select(`
          id, name, slug, latitude, longitude,
          countries!inner (slug),
          admin_areas (name)
        `)
        .eq('is_active', true)
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)
        .order('population', { ascending: false, nullsFirst: false })
        .limit(50)

      if (!widerPlaces || widerPlaces.length === 0) {
        return NextResponse.json({ place: null })
      }

      // Calculate distances and find nearest
      const nearest = findNearestPlace(widerPlaces, lat, lng)
      return NextResponse.json({ place: formatPlace(nearest) })
    }

    // Calculate distances and find nearest
    const nearest = findNearestPlace(places, lat, lng)
    return NextResponse.json({ place: formatPlace(nearest) })
  } catch (error) {
    console.error('Error in nearest place API:', error)
    return NextResponse.json(
      { error: 'Failed to find nearest place' },
      { status: 500 }
    )
  }
}

interface PlaceRow {
  id: string
  name: string
  slug: string
  latitude: number | null
  longitude: number | null
  countries: { slug: string } | { slug: string }[]
  admin_areas: { name: string } | { name: string }[] | null
}

function findNearestPlace(places: PlaceRow[], lat: number, lng: number): PlaceRow {
  let nearest = places[0]
  let minDistance = Infinity

  for (const place of places) {
    if (place.latitude && place.longitude) {
      const distance = haversineDistance(lat, lng, place.latitude, place.longitude)
      if (distance < minDistance) {
        minDistance = distance
        nearest = place
      }
    }
  }

  return nearest
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959 // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1)
  const dLng = toRadians(lng2 - lng1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

function formatPlace(place: PlaceRow) {
  const country = Array.isArray(place.countries) ? place.countries[0] : place.countries
  const adminArea = Array.isArray(place.admin_areas) ? place.admin_areas[0] : place.admin_areas

  return {
    id: place.id,
    name: place.name,
    slug: place.slug,
    countrySlug: country?.slug || 'england',
    adminArea: adminArea?.name || null,
  }
}
