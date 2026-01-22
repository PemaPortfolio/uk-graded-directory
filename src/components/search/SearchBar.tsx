'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  variant?: 'default' | 'hero'
  placeholder?: string
  className?: string
}

/**
 * Search Bar Component (Spec 02)
 *
 * Two variants:
 * - default: Compact version for navbar
 * - hero: Large version for homepage hero
 *
 * Features:
 * - Autocomplete for cities/postcodes (to be implemented)
 * - Keyboard navigation
 * - Mobile optimized
 */
export default function SearchBar({
  variant = 'default',
  placeholder = 'Search appliances, stores, repairs...',
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const isHero = variant === 'hero'

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center ${className}`}
    >
      <div className="relative flex-1">
        <Search
          className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ${
            isHero ? 'w-5 h-5' : 'w-4 h-4'
          }`}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`
            w-full rounded-lg border border-gray-200 bg-white
            text-gray-900 placeholder:text-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50 focus:border-[#e85d4c]
            transition-colors
            ${isHero
              ? 'h-14 pl-12 pr-4 text-base'
              : 'h-10 pl-10 pr-4 text-sm'
            }
          `}
          aria-label="Search"
        />
      </div>

      {isHero && (
        <button
          type="submit"
          className="ml-2 h-14 px-6 bg-[#e85d4c] hover:bg-[#d94f3f] text-white font-medium rounded-lg transition-colors whitespace-nowrap"
        >
          Search Nearby →
        </button>
      )}
    </form>
  )
}
