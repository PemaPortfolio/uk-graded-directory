'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface HeroStats {
  stores: number
  cities: number
  savings: string
}

interface HeroSectionProps {
  stats: HeroStats
}

/**
 * Hero Section (Spec 12 - Section 2)
 *
 * Two-column layout:
 * - Left: Trust badge, H1, subheading, search bar, quick links
 * - Right: Bento stats grid
 *
 * Background: Warm neutral gradient (#f8f6f6 → #ffffff)
 */
export default function HeroSection({ stats }: HeroSectionProps) {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedQuery = query.trim()
    if (!trimmedQuery) return

    setIsSearching(true)
    try {
      // Call the classification API for intelligent routing
      const response = await fetch('/api/search/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmedQuery, filter: 'all' }),
      })

      if (!response.ok) throw new Error('Classification failed')

      const result = await response.json()
      router.push(result.url)
    } catch (error) {
      // Fallback to search page on error
      console.error('Search classification error:', error)
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`)
    } finally {
      setIsSearching(false)
    }
  }

  const handleGeolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Navigate with coordinates
          router.push(`/nearby?lat=${position.coords.latitude}&lng=${position.coords.longitude}`)
        },
        (error) => {
          console.error('Geolocation error:', error)
          alert('Unable to get your location. Please enter your city manually.')
        }
      )
    }
  }

  return (
    <section className="bg-gradient-to-b from-[#f8f6f6] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-[#e85d4c]/10 px-3 py-1.5 rounded-full text-sm text-[#e85d4c] font-medium">
              ⭐ UK&apos;s #1 Graded Appliance Directory
            </div>

            {/* H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#181111] leading-tight">
              Find Graded Appliances Near You
            </h1>

            {/* Subheading */}
            <p className="text-lg text-[#6b7280] max-w-xl">
              Save 30-70% on ex-display, B-grade and factory seconds from verified UK retailers.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your city or postcode (e.g., Manchester, SW1A)"
                  disabled={isSearching}
                  className="w-full h-14 pl-12 pr-4 rounded-lg border border-[#ebe5e5] bg-white text-base focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50 focus:border-[#e85d4c] disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching || !query.trim()}
                className="h-14 px-6 bg-[#e85d4c] hover:bg-[#d94f3f] text-white font-medium rounded-lg transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  'Search Nearby →'
                )}
              </button>
            </form>

            {/* Geolocation Button */}
            <button
              onClick={handleGeolocation}
              className="inline-flex items-center gap-2 text-[#6b7280] hover:text-[#e85d4c] text-sm transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Use my location
            </button>

            {/* Quick Category Links */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#6b7280] text-sm">Quick:</span>
              <Link href="/washing-machines" className="text-sm text-[#181111] hover:text-[#e85d4c] transition-colors">
                Washing Machines
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/fridge-freezers" className="text-sm text-[#181111] hover:text-[#e85d4c] transition-colors">
                Fridges
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/ovens-cookers" className="text-sm text-[#181111] hover:text-[#e85d4c] transition-colors">
                Ovens
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/dishwashers" className="text-sm text-[#181111] hover:text-[#e85d4c] transition-colors">
                Dishwashers
              </Link>
            </div>

            {/* Repair Hook */}
            <div className="text-slate-500 text-sm">
              — or — Need repair?{' '}
              <Link href="#repair" className="text-[#e85d4c] hover:text-[#d94f3f] transition-colors">
                Find engineers →
              </Link>
            </div>
          </div>

          {/* Right Column - Bento Stats Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {/* Large Stat - Savings */}
              <div className="col-span-2 bg-white rounded-xl p-6 text-center shadow-sm border border-[#ebe5e5]">
                <div className="text-4xl font-bold text-[#181111]">{stats.savings}</div>
                <div className="text-[#6b7280] text-sm">Average Savings</div>
              </div>

              {/* Medium Stat - Stores */}
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-[#ebe5e5]">
                <div className="text-2xl font-bold text-[#181111]">{stats.stores}</div>
                <div className="text-[#6b7280] text-xs">Verified Stores</div>
              </div>

              {/* Medium Stat - Cities */}
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-[#ebe5e5]">
                <div className="text-2xl font-bold text-[#181111]">{stats.cities}</div>
                <div className="text-[#6b7280] text-xs">UK Cities</div>
              </div>

              {/* Trust Badge */}
              <div className="col-span-2 bg-green-50 rounded-xl p-4 flex items-center justify-center gap-2 border border-green-200">
                <span className="text-green-600">✓</span>
                <span className="text-green-700 text-sm">Companies House & Gas Safe Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
