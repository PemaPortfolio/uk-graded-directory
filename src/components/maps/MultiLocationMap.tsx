'use client'

/**
 * Multi-Location Map Component (Spec 20)
 *
 * Leaflet + OpenStreetMap for listing pages.
 * Shows multiple stores/providers on an interactive map.
 */

import { useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import { MapSkeleton } from './MapSkeleton'
import { MarkerPopup } from './MarkerPopup'

// Dynamically import Leaflet components (client-side only)
const MapContainerDynamic = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false, loading: () => <MapSkeleton /> }
)
const TileLayerDynamic = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const MarkerDynamic = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const PopupDynamic = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

// Types
export interface MapLocation {
  id: string
  name: string
  slug: string
  latitude: number
  longitude: number
  type: 'store' | 'provider'
  rating?: number | null
  reviewCount?: number
  isVerified?: boolean
  isFeatured?: boolean
  badges?: string[]
  logoUrl?: string | null
}

interface MultiLocationMapProps {
  locations: MapLocation[]
  center?: [number, number]
  zoom?: number
  height?: string
  className?: string
  onMarkerClick?: (location: MapLocation) => void
}

// Default center: UK (approximately Manchester)
const UK_CENTER: [number, number] = [53.5, -2.0]
const DEFAULT_ZOOM = 10
const MIN_ZOOM = 5
const MAX_ZOOM = 18

// OpenStreetMap tile URL
const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

export function MultiLocationMap({
  locations,
  center,
  zoom = DEFAULT_ZOOM,
  height = '400px',
  className = '',
  onMarkerClick,
}: MultiLocationMapProps) {
  const [isClient, setIsClient] = useState(false)
  const [leafletLoaded, setLeafletLoaded] = useState(false)
  const [storeIcon, setStoreIcon] = useState<L.Icon | null>(null)
  const [providerIcon, setProviderIcon] = useState<L.Icon | null>(null)
  const [featuredIcon, setFeaturedIcon] = useState<L.Icon | null>(null)

  // Mark as client-side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load Leaflet and create custom icons
  useEffect(() => {
    if (!isClient) return

    const loadLeaflet = async () => {
      const L = await import('leaflet')

      // Create custom icons using SVG data URLs
      const createIcon = (color: string, emoji: string) => {
        const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42">
            <path d="M16 0C7.2 0 0 7.2 0 16c0 12 16 26 16 26s16-14 16-26C32 7.2 24.8 0 16 0z" fill="${color}"/>
            <circle cx="16" cy="14" r="10" fill="white"/>
            <text x="16" y="18" text-anchor="middle" font-size="12">${emoji}</text>
          </svg>
        `
        return L.icon({
          iconUrl: `data:image/svg+xml;base64,${btoa(svg)}`,
          iconSize: [32, 42],
          iconAnchor: [16, 42],
          popupAnchor: [0, -42],
        })
      }

      setStoreIcon(createIcon('#e85d4c', '🏪'))
      setProviderIcon(createIcon('#059669', '🔧'))
      setFeaturedIcon(createIcon('#F59E0B', '⭐'))
      setLeafletLoaded(true)
    }

    loadLeaflet()
  }, [isClient])

  // Calculate map bounds to fit all locations
  const mapCenter = useMemo(() => {
    if (center) return center
    if (locations.length === 0) return UK_CENTER

    // Calculate centroid of all locations
    const sumLat = locations.reduce((sum, loc) => sum + loc.latitude, 0)
    const sumLng = locations.reduce((sum, loc) => sum + loc.longitude, 0)

    return [sumLat / locations.length, sumLng / locations.length] as [number, number]
  }, [center, locations])

  // Get appropriate icon for location
  const getIcon = (location: MapLocation) => {
    if (location.isFeatured && featuredIcon) return featuredIcon
    if (location.type === 'provider' && providerIcon) return providerIcon
    return storeIcon
  }

  // Show skeleton during SSR or while loading
  if (!isClient || !leafletLoaded || !storeIcon) {
    return <MapSkeleton height={height} className={className} />
  }

  return (
    <div className={`rounded-lg overflow-hidden ${className}`} style={{ height }}>
      <MapContainerDynamic
        center={mapCenter}
        zoom={zoom}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayerDynamic
          attribution={ATTRIBUTION}
          url={TILE_URL}
        />

        {locations.map((location) => {
          const icon = getIcon(location)
          if (!icon) return null

          return (
            <MarkerDynamic
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={icon}
              eventHandlers={{
                click: () => onMarkerClick?.(location),
              }}
            >
              <PopupDynamic>
                <MarkerPopup
                  id={location.id}
                  name={location.name}
                  slug={location.slug}
                  type={location.type}
                  rating={location.rating}
                  reviewCount={location.reviewCount}
                  isVerified={location.isVerified}
                  isFeatured={location.isFeatured}
                  badges={location.badges}
                  logoUrl={location.logoUrl}
                />
              </PopupDynamic>
            </MarkerDynamic>
          )
        })}
      </MapContainerDynamic>
    </div>
  )
}

export default MultiLocationMap
