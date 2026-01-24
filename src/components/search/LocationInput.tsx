'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { MapPin, X } from 'lucide-react'
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
}

/**
 * Location input with autocomplete for places
 *
 * Features:
 * - Location pin icon (right side)
 * - On focus: show dropdown with top cities
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
}: LocationInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<PlaceSuggestionType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [popularPlaces, setPopularPlaces] = useState<PlaceSuggestionType[]>([])
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
          setPopularPlaces(data.places || [])
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
        setSuggestions(data.places || [])
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

  const handleFocus = () => {
    setIsOpen(true)
    onFocus?.()
  }

  const handleBlur = () => {
    // Delay to allow click on dropdown
    setTimeout(() => {
      onBlur?.()
    }, 200)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    // Clear selected place if user starts typing
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
    inputRef.current?.focus()
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  // Determine which suggestions to show
  const displaySuggestions = inputValue.length >= 2 ? suggestions : popularPlaces
  const sectionTitle = inputValue.length >= 2 ? 'Locations' : 'Top Cities'

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

      {/* Dropdown */}
      <AutocompleteDropdown
        isOpen={isOpen && displaySuggestions.length > 0}
        onClose={closeDropdown}
        isLoading={isLoading}
      >
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
      </AutocompleteDropdown>
    </div>
  )
}
