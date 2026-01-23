'use client'

import { useState } from 'react'
import { Search, Loader2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

type FilterType = 'all' | 'buy' | 'repair'

interface SearchBarProps {
  variant?: 'default' | 'hero'
  placeholder?: string
  className?: string
  showFilters?: boolean
  defaultFilter?: FilterType
}

interface ClassificationResult {
  type: 'place' | 'category' | 'brand' | 'repair' | 'search'
  url: string
  matchedName?: string
}

/**
 * Search Bar Component (Spec 02)
 *
 * Features:
 * - Intelligent routing: detects places, categories, brands
 * - Filter pills (All/Buy/Repair)
 * - Two variants: default (navbar) and hero (homepage)
 * - Mobile optimized with proper input attributes
 */
export default function SearchBar({
  variant = 'default',
  placeholder = 'Search appliances, stores, repairs...',
  className = '',
  showFilters = true,
  defaultFilter = 'all',
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<FilterType>(defaultFilter)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      return
    }

    setIsLoading(true)

    try {
      // Call the classification API
      const response = await fetch('/api/search/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: trimmedQuery, filter }),
      })

      if (!response.ok) {
        throw new Error('Classification failed')
      }

      const result: ClassificationResult = await response.json()
      router.push(result.url)
    } catch (error) {
      // Fallback to search page on error
      console.error('Search classification error:', error)
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setQuery('')
  }

  const isHero = variant === 'hero'

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className="relative"
        role="search"
      >
        {/* Search input row */}
        <div className={`flex items-center ${isHero ? 'flex-col sm:flex-row gap-2 sm:gap-0' : ''}`}>
          <div className="relative flex-1 w-full">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${
                isHero ? 'w-5 h-5' : 'w-4 h-4'
              }`}
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              disabled={isLoading}
              className={`
                w-full border border-[#ebe5e5] bg-white
                text-[#181111] placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50 focus:border-[#e85d4c]
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
                ${isHero
                  ? 'h-14 pl-12 pr-10 text-base rounded-lg sm:rounded-l-lg sm:rounded-r-none'
                  : 'h-10 pl-10 pr-8 text-sm rounded-lg'
                }
              `}
              aria-label="Search for appliances, stores, or repair services"
              inputMode="search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              enterKeyHint="search"
            />

            {/* Clear button */}
            {query && !isLoading && (
              <button
                type="button"
                onClick={handleClear}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors ${
                  isHero ? 'sm:right-3' : ''
                }`}
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Loading spinner in input */}
            {isLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-4 h-4 text-[#e85d4c] animate-spin" />
              </div>
            )}
          </div>

          {/* Search button (hero variant only) */}
          {isHero && (
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="w-full sm:w-auto h-14 px-6 bg-[#e85d4c] hover:bg-[#d94f3f] disabled:bg-[#e85d4c]/50 text-white font-semibold rounded-lg sm:rounded-l-none sm:rounded-r-lg transition-colors whitespace-nowrap disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </>
              )}
            </button>
          )}
        </div>

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
