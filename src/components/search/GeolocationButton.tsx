'use client'

import { useState } from 'react'
import { MapPin, Loader2 } from 'lucide-react'
import type { SelectedPlace } from '@/types/search'

interface GeolocationButtonProps {
  onLocationFound: (place: SelectedPlace) => void
  className?: string
}

/**
 * Geolocation button that finds the nearest place based on user's location
 *
 * Features:
 * - "Use my location" link/button
 * - Requests browser geolocation
 * - Finds nearest place via API
 * - Auto-fills LocationInput via callback
 */
export default function GeolocationButton({
  onLocationFound,
  className = '',
}: GeolocationButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Get user's position
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes cache
        })
      })

      const { latitude, longitude } = position.coords

      // Find nearest place
      const response = await fetch('/api/search/nearest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat: latitude, lng: longitude }),
      })

      if (!response.ok) {
        throw new Error('Failed to find nearby location')
      }

      const data = await response.json()

      if (data.place) {
        onLocationFound({
          id: data.place.id,
          name: data.place.name,
          slug: data.place.slug,
          countrySlug: data.place.countrySlug,
          adminArea: data.place.adminArea,
        })
      } else {
        setError('No locations found nearby')
      }
    } catch (err) {
      console.error('Geolocation error:', err)
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Location permission denied')
            break
          case err.POSITION_UNAVAILABLE:
            setError('Location unavailable')
            break
          case err.TIMEOUT:
            setError('Location request timed out')
            break
          default:
            setError('Unable to get your location')
        }
      } else {
        setError('Unable to find nearby locations')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="inline-flex items-center gap-2 text-[#6b7280] hover:text-[#e85d4c] text-sm transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Finding your location...
          </>
        ) : (
          <>
            <MapPin className="w-4 h-4" />
            Use my location
          </>
        )}
      </button>

      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  )
}
