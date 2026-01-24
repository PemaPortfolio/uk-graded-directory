'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { MapPin, X, Loader2, Navigation } from 'lucide-react'
import AutocompleteDropdown, { DropdownSection } from './AutocompleteDropdown'
import PlaceSuggestion from './suggestions/PlaceSuggestion'
import type { SelectedPlace, PlaceSuggestion as PlaceSuggestionType } from '@/types/search'

interface LocationInputProps {
  value: SelectedPlace | null
  onChange: (place: SelectedPlace | null) => void
  onFocus?: () => void
  onBlur?: () => void
  placeholder?: string
  className?: string
  disabled?: boolean
  highlightedIndex?: number
  onKeyDown?: (e: React.KeyboardEvent) => void
  showGeolocation?: boolean
}

/**
 * Location input with autocomplete for places (Yelp-style)
 *
 * Features:
 * - Location pin icon (right side)
 * - On focus: show "Use current location" + top cities dropdown
 * - On type: filter places from API
 * - On select: store place, close dropdown
 * - Clear button when selected
 */
export default function LocationInput({
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder = 'Enter city or postcode',
  className = '',
  disabled = false,
  highlightedIndex = -1,
  onKeyDown,
  showGeolocation = true,
}: LocationInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<PlaceSuggestionType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [popularPlaces, setPopularPlaces] = useState<PlaceSuggestionType[]>([])
  const [isGeolocating, setIsGeolocating] = useState(false)
  const [geoError, setGeoError] = useState<string | null>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Fetch popular places on mount
  useEffect(() => {
    async function fetchPopular() {
      try {
        const response = await fetch('/api/search/suggestions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'places' }),
        })
        if (response.ok) {
          const data = await response.json()
          // Limit to 5 places to avoid needing scroll
          setPopularPlaces((data.places || []).slice(0, 5))
        }
      } catch (error) {
        console.error('Error fetching popular places:', error)
      }
    }
    fetchPopular()
  }, [])

  // Fetch suggestions when input changes
  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/search/suggestions?q=${encodeURIComponent(query)}&type=location`
      )
      if (response.ok) {
        const data = await response.json()
        // Limit to 5 results to avoid needing scroll
        setSuggestions((data.places || []).slice(0, 5))
      }
    } catch (error) {
      console.error('Error fetching location suggestions:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      if (inputValue && !value) {
        fetchSuggestions(inputValue)
      }
    }, 150)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [inputValue, value, fetchSuggestions])

  // Handle geolocation (Yelp-style - in dropdown)
  const handleUseCurrentLocation = async () => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setGeoError('Geolocation not supported by your browser')
      return
    }

    setIsGeolocating(true)
    setGeoError(null)

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000,
        })
      })

      const { latitude, longitude } = position.coords

      const response = await fetch('/api/search/nearest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat: latitude, lng: longitude }),
      })

      if (!response.ok) throw new Error('Failed to find location')

      const data = await response.json()

      if (data.place) {
        onChange({
          id: data.place.id,
          name: data.place.name,
          slug: data.place.slug,
          countrySlug: data.place.countrySlug,
          adminArea: data.place.adminArea,
        })
        setInputValue(data.place.name)
        setIsOpen(false)
        inputRef.current?.blur()
      } else {
        setGeoError('No locations found nearby')
      }
    } catch (err: unknown) {
      console.error('Geolocation error:', err)
      // Handle GeolocationPositionError
      if (err && typeof err === 'object' && 'code' in err) {
        const geoErr = err as { code: number; message?: string }
        switch (geoErr.code) {
          case 1: // PERMISSION_DENIED
            setGeoError('Location permission denied. Please allow location access.')
            break
          case 2: // POSITION_UNAVAILABLE
            setGeoError('Location unavailable. Try again.')
            break
          case 3: // TIMEOUT
            setGeoError('Location request timed out. Try again.')
            break
          default:
            setGeoError('Unable to get your location')
        }
      } else if (err instanceof Error) {
        setGeoError(err.message || 'Unable to find nearby locations')
      } else {
        setGeoError('Unable to find nearby locations')
      }
    } finally {
      setIsGeolocating(false)
    }
  }

  const handleFocus = () => {
    setIsOpen(true)
    setGeoError(null)
    onFocus?.()
  }

  const handleBlur = () => {
    setTimeout(() => {
      onBlur?.()
    }, 200)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setGeoError(null)

    if (value) {
      onChange(null)
    }
  }

  const handleSelectPlace = (place: PlaceSuggestionType) => {
    onChange({
      id: place.slug,
      name: place.name,
      slug: place.slug,
      countrySlug: place.countrySlug,
      adminArea: place.adminArea || null,
    })
    setInputValue(place.name)
    setIsOpen(false)
    inputRef.current?.blur()
  }

  const handleClear = () => {
    onChange(null)
    setInputValue('')
    setSuggestions([])
    setGeoError(null)
    inputRef.current?.focus()
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  // Determine which suggestions to show
  const displaySuggestions = inputValue.length >= 2 ? suggestions : popularPlaces
  const sectionTitle = inputValue.length >= 2 ? 'Locations' : 'Top Cities'
  const showDropdown = isOpen && (displaySuggestions.length > 0 || showGeolocation)

  return (
    <div className={`relative ${className}`} data-search-input>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value ? value.name : inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full h-14 pl-4 pr-12 rounded-lg
            border border-[#ebe5e5] bg-white
            text-[#181111] placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50 focus:border-[#e85d4c]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
          `}
          aria-label="Location search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />

        {/* Icons on right side */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear location"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <MapPin className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>

      {/* Dropdown - Yelp style with geolocation at top */}
      <AutocompleteDropdown
        isOpen={showDropdown}
        onClose={closeDropdown}
        isLoading={isLoading}
      >
        {/* Use Current Location - Yelp style */}
        {showGeolocation && inputValue.length < 2 && (
          <div className="border-b border-gray-100">
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              onMouseDown={(e) => e.preventDefault()} // Prevent input blur
              disabled={isGeolocating}
              className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <div className="w-8 h-8 rounded-lg bg-[#e85d4c]/10 flex items-center justify-center">
                {isGeolocating ? (
                  <Loader2 className="w-4 h-4 text-[#e85d4c] animate-spin" />
                ) : (
                  <Navigation className="w-4 h-4 text-[#e85d4c]" />
                )}
              </div>
              <span className="font-medium text-[#e85d4c]">
                {isGeolocating ? 'Finding location...' : 'Current Location'}
              </span>
            </button>
            {geoError && (
              <p className="px-3 pb-2 text-xs text-red-600">{geoError}</p>
            )}
          </div>
        )}

        {/* Places */}
        {displaySuggestions.length > 0 && (
          <DropdownSection title={sectionTitle}>
            {displaySuggestions.map((place, index) => (
              <PlaceSuggestion
                key={`${place.countrySlug}-${place.slug}`}
                name={place.name}
                slug={place.slug}
                countrySlug={place.countrySlug}
                adminArea={place.adminArea}
                isHighlighted={index === highlightedIndex}
                onSelect={handleSelectPlace}
              />
            ))}
          </DropdownSection>
        )}
      </AutocompleteDropdown>
    </div>
  )
}
