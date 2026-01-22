'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface AdminArea {
  id: string
  name: string
  slug: string
  store_count: number
  provider_count: number
}

interface Props {
  countrySlug: string
  countryName: string
  adminAreas: AdminArea[]
}

/**
 * Browse by Region Section (Spec 13)
 *
 * Shows all admin areas in alphabetical grid.
 * Mobile: Shows first 20, with expand button.
 */
export default function BrowseByRegionSection({
  countrySlug,
  countryName,
  adminAreas,
}: Props) {
  const [showAll, setShowAll] = useState(false)

  // On mobile, show limited initially
  const MOBILE_LIMIT = 20
  const displayAreas = showAll ? adminAreas : adminAreas.slice(0, MOBILE_LIMIT)
  const hasMore = adminAreas.length > MOBILE_LIMIT

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Browse by Region in {countryName}
          </h2>
          <span className="text-sm text-gray-500 hidden md:block">
            {adminAreas.length} regions
          </span>
        </div>

        {/* Admin Areas Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-2">
          {/* Desktop: show all, Mobile: show limited */}
          <div className="hidden md:contents">
            {adminAreas.map((area) => (
              <Link
                key={area.id}
                href={`/${countrySlug}/${area.slug}/`}
                className="text-sm text-gray-600 hover:text-[#e85d4c] hover:underline py-1 truncate"
              >
                {area.name}
              </Link>
            ))}
          </div>

          {/* Mobile: show limited with expand */}
          <div className="contents md:hidden">
            {displayAreas.map((area) => (
              <Link
                key={area.id}
                href={`/${countrySlug}/${area.slug}/`}
                className="text-sm text-gray-600 hover:text-[#e85d4c] hover:underline py-1 truncate"
              >
                {area.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Show More Button (Mobile only) */}
        {hasMore && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-6 flex items-center gap-1 text-[#e85d4c] font-medium text-sm hover:underline md:hidden"
          >
            <span>Show all {adminAreas.length} regions</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  )
}
