'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Loader2, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import KeywordInput from './KeywordInput'
import LocationInput from './LocationInput'
import GeolocationButton from './GeolocationButton'
import type { SelectedPlace } from '@/types/search'

type FilterType = 'all' | 'buy' | 'repair'

interface SearchBarProps {
  variant?: 'default' | 'hero'
  placeholder?: string
  className?: string
  showFilters?: boolean
  defaultFilter?: FilterType
  showGeolocation?: boolean
}

interface ClassificationResult {
  type: 'place' | 'category' | 'brand' | 'repair' | 'search'
  url: string
  matchedName?: string
}

/**
 * Search Bar Component (Spec 02 - Phase 2)
 *
 * Features:
 * - Dual input: keyword (left) + location (right)
 * - Intelligent routing: detects places, categories, brands
 * - Autocomplete dropdowns for both inputs
 * - Filter pills (All/Buy/Repair)
 * - Keyboard navigation (Arrow keys, Enter, Escape, Tab)
 * - Desktop: side-by-side layout
 * - Mobile: stacked layout
 */
export default function SearchBar({
  variant = 'default',
  placeholder = 'Search appliances, stores, repairs...',
  className = '',
  showFilters = true,
  defaultFilter = 'all',
  showGeolocation = true,
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState<SelectedPlace | null>(null)
  const [filter, setFilter] = useState<FilterType>(defaultFilter)
  const [isLoading, setIsLoading] = useState(false)
  const [activeInput, setActiveInput] = useState<'keyword' | 'location' | null>(null)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  // Reset highlighted index when active input changes
  useEffect(() => {
    setHighlightedIndex(-1)
  }, [activeInput, query, location])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedQuery = query.trim()

    // If location is selected and no keyword, go directly to location page
    if (location && !trimmedQuery) {
      router.push(`/${location.countrySlug}/${location.slug}/`)
      return
    }

    // If no query and no location, do nothing
    if (!trimmedQuery && !location) {
      return
    }

    setIsLoading(true)

    try {
      // Call the classification API with location context
      const response = await fetch('/api/search/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: trimmedQuery,
          filter,
          location: location ? {
            slug: location.slug,
            countrySlug: location.countrySlug,
          } : null,
        }),
      })

      if (!response.ok) {
        throw new Error('Classification failed')
      }

      const result: ClassificationResult = await response.json()

      // If we have a location and the result is a category, route to location + category
      if (location && result.type === 'category') {
        // Extract category slug from the URL (e.g., "/washing-machines/" -> "washing-machines")
        const categorySlug = result.url.replace(/\//g, '')
        router.push(`/${location.countrySlug}/${location.slug}/${categorySlug}/`)
      } else if (location && result.type === 'repair') {
        // For repair categories with location
        const categorySlug = result.url.replace(/\//g, '')
        router.push(`/${location.countrySlug}/${location.slug}/${categorySlug}/`)
      } else {
        router.push(result.url)
      }
    } catch (error) {
      // Fallback to search page on error
      console.error('Search classification error:', error)
      const searchParams = new URLSearchParams()
      if (trimmedQuery) searchParams.set('q', trimmedQuery)
      if (location) searchParams.set('location', location.slug)
      router.push(`/search?${searchParams.toString()}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeywordChange = useCallback((value: string) => {
    setQuery(value)
  }, [])

  const handleLocationChange = useCallback((place: SelectedPlace | null) => {
    setLocation(place)
  }, [])

  const handleCategorySelect = useCallback((slug: string) => {
    // If location is selected, go to location + category
    if (location) {
      router.push(`/${location.countrySlug}/${location.slug}/${slug}/`)
    } else {
      router.push(`/${slug}/`)
    }
  }, [location, router])

  const handleBrandSelect = useCallback((slug: string) => {
    router.push(`/${slug}-repair/`)
  }, [router])

  const handleGeolocationFound = useCallback((place: SelectedPlace) => {
    setLocation(place)
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex(prev => prev + 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(prev => Math.max(-1, prev - 1))
    } else if (e.key === 'Tab') {
      // Let default tab behavior work
      setHighlightedIndex(-1)
    }
  }, [])

  const isHero = variant === 'hero'

  return (
    <div className={className}>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="relative"
        role="search"
      >
        {/* Dual input layout */}
        <div className={`
          flex gap-3
          ${isHero ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row'}
        `}>
          {/* Keyword input */}
          <div className={`relative ${isHero ? 'flex-1' : 'flex-1'}`}>
            <KeywordInput
              value={query}
              onChange={handleKeywordChange}
              onSelectCategory={handleCategorySelect}
              onSelectBrand={handleBrandSelect}
              onFocus={() => setActiveInput('keyword')}
              onBlur={() => setActiveInput(null)}
              placeholder={placeholder}
              disabled={isLoading}
              highlightedIndex={activeInput === 'keyword' ? highlightedIndex : -1}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Location input */}
          <div className={`relative ${isHero ? 'flex-1 sm:max-w-[280px]' : 'flex-1 sm:max-w-[200px]'}`}>
            <LocationInput
              value={location}
              onChange={handleLocationChange}
              onFocus={() => setActiveInput('location')}
              onBlur={() => setActiveInput(null)}
              placeholder="Enter city or postcode"
              disabled={isLoading}
              highlightedIndex={activeInput === 'location' ? highlightedIndex : -1}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Search button (hero variant only) */}
          {isHero && (
            <button
              type="submit"
              disabled={isLoading || (!query.trim() && !location)}
              className="h-14 px-6 bg-[#e85d4c] hover:bg-[#d94f3f] disabled:bg-[#e85d4c]/50 text-white font-semibold rounded-lg transition-colors whitespace-nowrap disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="hidden sm:inline">Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline">Search</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Geolocation button */}
        {showGeolocation && isHero && (
          <div className="mt-3">
            <GeolocationButton onLocationFound={handleGeolocationFound} />
          </div>
        )}

        {/* Filter pills */}
        {showFilters && isHero && (
          <div
            className="flex items-center gap-2 mt-4"
            role="radiogroup"
            aria-label="Filter search results by type"
          >
            <FilterPill
              label="All"
              value="all"
              selected={filter === 'all'}
              onChange={() => setFilter('all')}
              disabled={isLoading}
            />
            <FilterPill
              label="Buy"
              value="buy"
              selected={filter === 'buy'}
              onChange={() => setFilter('buy')}
              disabled={isLoading}
            />
            <FilterPill
              label="Repair"
              value="repair"
              selected={filter === 'repair'}
              onChange={() => setFilter('repair')}
              disabled={isLoading}
            />
          </div>
        )}
      </form>
    </div>
  )
}

/**
 * Filter Pill Component
 */
interface FilterPillProps {
  label: string
  value: FilterType
  selected: boolean
  onChange: () => void
  disabled?: boolean
}

function FilterPill({ label, selected, onChange, disabled }: FilterPillProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onChange}
      disabled={disabled}
      className={`
        h-9 px-4 rounded-full text-sm font-medium
        transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${selected
          ? 'bg-[#e85d4c] text-white border border-[#e85d4c]'
          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
        }
      `}
    >
      {label}
    </button>
  )
}
