'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Search, X } from 'lucide-react'
import AutocompleteDropdown, { DropdownSection } from './AutocompleteDropdown'
import CategorySuggestion from './suggestions/CategorySuggestion'
import BrandSuggestion from './suggestions/BrandSuggestion'
import type { CategorySuggestion as CategoryType, BrandSuggestion as BrandType } from '@/types/search'

interface KeywordInputProps {
  value: string
  onChange: (value: string) => void
  onSelectCategory?: (slug: string, name: string) => void
  onSelectBrand?: (slug: string, name: string) => void
  onFocus?: () => void
  onBlur?: () => void
  placeholder?: string
  className?: string
  disabled?: boolean
  highlightedIndex?: number
  onKeyDown?: (e: React.KeyboardEvent) => void
}

interface Suggestions {
  categories: CategoryType[]
  brands: BrandType[]
}

/**
 * Keyword input with autocomplete for categories and brands
 *
 * Features:
 * - Search icon (left side)
 * - Clear button (X) when has value
 * - On focus: show "Popular Categories" dropdown
 * - On type: filter categories/brands from API
 * - Debounce: 150ms
 */
export default function KeywordInput({
  value,
  onChange,
  onSelectCategory,
  onSelectBrand,
  onFocus,
  onBlur,
  placeholder = 'Search appliances, stores, repairs...',
  className = '',
  disabled = false,
  highlightedIndex = -1,
  onKeyDown,
}: KeywordInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<Suggestions>({ categories: [], brands: [] })
  const [popularCategories, setPopularCategories] = useState<CategoryType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Fetch popular categories on mount
  useEffect(() => {
    async function fetchPopular() {
      try {
        const response = await fetch('/api/search/suggestions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'categories' }),
        })
        if (response.ok) {
          const data = await response.json()
          setPopularCategories(data.categories || [])
        }
      } catch (error) {
        console.error('Error fetching popular categories:', error)
      }
    }
    fetchPopular()
  }, [])

  // Fetch suggestions when input changes
  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions({ categories: [], brands: [] })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/search/suggestions?q=${encodeURIComponent(query)}&type=keyword`
      )
      if (response.ok) {
        const data = await response.json()
        setSuggestions({
          categories: data.categories || [],
          brands: data.brands || [],
        })
      }
    } catch (error) {
      console.error('Error fetching keyword suggestions:', error)
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
      fetchSuggestions(value)
    }, 150)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [value, fetchSuggestions])

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
    onChange(e.target.value)
  }

  const handleSelectCategory = (slug: string, name: string) => {
    onChange(name)
    setIsOpen(false)
    onSelectCategory?.(slug, name)
    inputRef.current?.blur()
  }

  const handleSelectBrand = (slug: string, name: string) => {
    onChange(name)
    setIsOpen(false)
    onSelectBrand?.(slug, name)
    inputRef.current?.blur()
  }

  const handleClear = () => {
    onChange('')
    setSuggestions({ categories: [], brands: [] })
    inputRef.current?.focus()
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  // Determine what to show
  const hasSearchQuery = value.length >= 2
  const hasResults = suggestions.categories.length > 0 || suggestions.brands.length > 0
  const showPopular = !hasSearchQuery && popularCategories.length > 0
  const showResults = hasSearchQuery && hasResults

  // Calculate highlighted index for each section
  const getHighlightedSection = () => {
    if (!hasSearchQuery) {
      return { section: 'popular' as const, index: highlightedIndex }
    }

    const categoryCount = suggestions.categories.length
    if (highlightedIndex < categoryCount) {
      return { section: 'categories' as const, index: highlightedIndex }
    }
    return { section: 'brands' as const, index: highlightedIndex - categoryCount }
  }

  const highlighted = getHighlightedSection()

  return (
    <div className={`relative ${className}`} data-search-input>
      <div className="relative">
        {/* Search icon */}
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
          aria-hidden="true"
        />

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full h-14 pl-12 pr-10 rounded-lg
            border border-[#ebe5e5] bg-white
            text-[#181111] placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50 focus:border-[#e85d4c]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
          `}
          aria-label="Search for appliances, stores, or repairs"
          inputMode="search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />

        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      <AutocompleteDropdown
        isOpen={isOpen && (showPopular || showResults)}
        onClose={closeDropdown}
        isLoading={isLoading}
      >
        {/* Popular categories (when no query) */}
        {showPopular && (
          <DropdownSection title="Popular Categories">
            {popularCategories.map((category, index) => (
              <CategorySuggestion
                key={category.slug}
                name={category.name}
                slug={category.slug}
                icon={category.icon}
                isHighlighted={highlighted.section === 'popular' && highlighted.index === index}
                onSelect={handleSelectCategory}
              />
            ))}
          </DropdownSection>
        )}

        {/* Search results */}
        {showResults && (
          <>
            {suggestions.categories.length > 0 && (
              <DropdownSection title="Categories">
                {suggestions.categories.map((category, index) => (
                  <CategorySuggestion
                    key={category.slug}
                    name={category.name}
                    slug={category.slug}
                    icon={category.icon}
                    isHighlighted={highlighted.section === 'categories' && highlighted.index === index}
                    onSelect={handleSelectCategory}
                  />
                ))}
              </DropdownSection>
            )}

            {suggestions.brands.length > 0 && (
              <DropdownSection title="Brands">
                {suggestions.brands.map((brand, index) => (
                  <BrandSuggestion
                    key={brand.slug}
                    name={brand.name}
                    slug={brand.slug}
                    isHighlighted={highlighted.section === 'brands' && highlighted.index === index}
                    onSelect={handleSelectBrand}
                  />
                ))}
              </DropdownSection>
            )}
          </>
        )}
      </AutocompleteDropdown>
    </div>
  )
}
