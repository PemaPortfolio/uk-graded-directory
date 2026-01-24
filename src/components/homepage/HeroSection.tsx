'use client'

import Link from 'next/link'
import { SearchBar } from '@/components/search'

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
 *
 * Uses the enhanced SearchBar with dual inputs (keyword + location)
 */
export default function HeroSection({ stats }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-b from-[#f8f6f6] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-[#e85d4c]/10 px-3 py-1.5 rounded-full text-sm text-[#e85d4c] font-medium">
              UK&apos;s #1 Graded Appliance Directory
            </div>

            {/* H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#181111] leading-tight">
              Find Graded Appliances Near You
            </h1>

            {/* Subheading */}
            <p className="text-lg text-[#6b7280] max-w-xl">
              Save 30-70% on ex-display, B-grade and factory seconds from verified UK retailers.
            </p>

            {/* Search Bar - Enhanced with dual inputs */}
            <div className="max-w-2xl">
              <SearchBar
                variant="hero"
                placeholder="Search appliances, stores, repairs..."
                showFilters={true}
                showGeolocation={true}
              />
            </div>

            {/* Quick Category Links */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#6b7280] text-sm">Quick:</span>
              <Link href="/washing-machines" className="text-sm text-[#181111] hover:text-[#e85d4c] transition-colors">
                Washing Machines
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/fridge-freezers" className="text-sm text-[#181111] hover:text-[#e85d4c] transition-colors">
                Fridges
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/ovens-cookers" className="text-sm text-[#181111] hover:text-[#e85d4c] transition-colors">
                Ovens
              </Link>
              <span className="text-gray-300">|</span>
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
