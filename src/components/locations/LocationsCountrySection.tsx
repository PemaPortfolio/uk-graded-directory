'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp, Store, Wrench } from 'lucide-react'

interface LocationCity {
  id: string
  name: string
  slug: string
  store_count: number
  provider_count: number
  countrySlug: string
}

interface LocationCountry {
  id: string
  name: string
  slug: string
  flag_emoji: string
  cities: LocationCity[]
  cityCount: number
}

interface LocationsCountrySectionProps {
  country: LocationCountry
  defaultExpanded?: boolean
}

/**
 * Country section with expandable city grid
 * Shows first 20 cities by default, with expand button for more
 */
export default function LocationsCountrySection({
  country,
  defaultExpanded = false,
}: LocationsCountrySectionProps) {
  const INITIAL_LIMIT = 20
  const [expanded, setExpanded] = useState(defaultExpanded)

  const hasMore = country.cities.length > INITIAL_LIMIT
  const displayCities = expanded ? country.cities : country.cities.slice(0, INITIAL_LIMIT)

  return (
    <section className="py-8 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Country Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#181111] dark:text-[#f5f0f0] flex items-center gap-2">
            <span className="text-2xl">{country.flag_emoji}</span>
            {country.name}
          </h2>
          <span className="text-sm text-[#6b7280] dark:text-[#a8a0a0]">
            {country.cityCount} cities
          </span>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {displayCities.map((city) => (
            <Link
              key={city.id}
              href={`/${city.countrySlug}/${city.slug}/`}
              className="group p-3 bg-white dark:bg-[#1a1616] rounded-lg border border-[#ebe5e5] dark:border-[#2d2424] hover:border-[#e85d4c] transition-colors"
            >
              <div className="font-medium text-[#181111] dark:text-[#f5f0f0] group-hover:text-[#e85d4c] mb-1 truncate">
                {city.name}
              </div>
              <div className="flex items-center gap-3 text-xs text-[#6b7280] dark:text-[#a8a0a0]">
                <span className="flex items-center gap-1">
                  <Store className="w-3 h-3" />
                  {city.store_count}
                </span>
                <span className="flex items-center gap-1">
                  <Wrench className="w-3 h-3" />
                  {city.provider_count}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Expand/Collapse Button */}
        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-6 flex items-center gap-1 text-[#e85d4c] font-medium text-sm hover:underline"
          >
            {expanded ? (
              <>
                <span>Show fewer cities</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Show all {country.cityCount} cities</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </section>
  )
}
