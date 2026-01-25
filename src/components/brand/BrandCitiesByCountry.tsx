'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { Brand, CountryWithCities } from '@/lib/data/getBrandPageData'

interface BrandCitiesByCountryProps {
  brand: Brand
  citiesByCountry: CountryWithCities[]
}

const INITIAL_CITIES_SHOWN = 12

/**
 * Cities by Country Section for Individual Brand Page
 * Shows all cities grouped by country with expand/collapse
 */
export function BrandCitiesByCountry({ brand, citiesByCountry }: BrandCitiesByCountryProps) {
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set())

  if (citiesByCountry.length === 0) return null

  const toggleCountry = (countrySlug: string) => {
    const newExpanded = new Set(expandedCountries)
    if (newExpanded.has(countrySlug)) {
      newExpanded.delete(countrySlug)
    } else {
      newExpanded.add(countrySlug)
    }
    setExpandedCountries(newExpanded)
  }

  return (
    <section className="py-12 lg:py-16 bg-white dark:bg-[#0f0d0d]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#181111] dark:text-[#f5f0f0] mb-8 flex items-center gap-2">
          <span>📍</span> {brand.name} Stores & Repair by Country
        </h2>

        <div className="space-y-4">
          {citiesByCountry.map(({ country, cities }) => {
            const isExpanded = expandedCountries.has(country.slug)
            const citiesToShow = isExpanded ? cities : cities.slice(0, INITIAL_CITIES_SHOWN)
            const hasMore = cities.length > INITIAL_CITIES_SHOWN

            return (
              <div
                key={country.id}
                className="bg-gray-50 dark:bg-[#1a1616] rounded-xl overflow-hidden"
              >
                {/* Country header */}
                <div className="bg-[#181111] dark:bg-[#252020] text-white px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag_emoji || '🇬🇧'}</span>
                    <span className="font-semibold text-lg">{country.name}</span>
                    <span className="text-gray-400">({cities.length} cities)</span>
                  </div>
                  <Link
                    href={`/${country.slug}/`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    View country page →
                  </Link>
                </div>

                {/* Cities grid */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {citiesToShow.map((city) => (
                      <Link
                        key={city.id}
                        href={`/${country.slug}/${city.slug}/`}
                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-[#e85d4c] dark:hover:text-[#e85d4c] transition-colors"
                      >
                        {city.name}
                        <span className="text-gray-400 ml-1">({city.store_count})</span>
                      </Link>
                    ))}
                  </div>

                  {/* Expand/collapse button */}
                  {hasMore && (
                    <button
                      onClick={() => toggleCountry(country.slug)}
                      className="mt-4 flex items-center gap-2 text-sm text-[#e85d4c] hover:text-[#d94f3f] font-medium transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Show fewer cities
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          Show all {cities.length} cities
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
