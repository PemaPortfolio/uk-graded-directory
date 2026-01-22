'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { CountryWithCities, RepairCategoryData } from '@/lib/data/getNationalRepairPageData'
import { getRepairSlug } from '@/lib/utils/repairSlugUtils'

interface Props {
  citiesByCountry: CountryWithCities[]
  category: RepairCategoryData
}

const INITIAL_CITIES_SHOWN = 24

/**
 * Browse by Country Section for National Repair Page (Spec 16)
 */
export default function RepairBrowseByCountrySection({ citiesByCountry, category }: Props) {
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set())

  const categoryName = category.name_singular || category.name
  const repairSlug = getRepairSlug(categoryName)

  const toggleCountry = (countrySlug: string) => {
    const newExpanded = new Set(expandedCountries)
    if (newExpanded.has(countrySlug)) {
      newExpanded.delete(countrySlug)
    } else {
      newExpanded.add(countrySlug)
    }
    setExpandedCountries(newExpanded)
  }

  if (citiesByCountry.length === 0) return null

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {categoryName} Repair by Country
        </h2>

        <div className="space-y-6">
          {citiesByCountry.map(({ country, cities }) => {
            const isExpanded = expandedCountries.has(country.slug)
            const citiesToShow = isExpanded
              ? cities
              : cities.slice(0, INITIAL_CITIES_SHOWN)
            const hasMore = cities.length > INITIAL_CITIES_SHOWN

            return (
              <div
                key={country.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Country header */}
                <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag_emoji || '🇬🇧'}</span>
                    <span className="font-semibold text-lg">{country.name}</span>
                    <span className="text-gray-400">
                      ({cities.length} {cities.length === 1 ? 'city' : 'cities'})
                    </span>
                  </div>
                  <Link
                    href={`/${country.slug}/`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    View country page &rarr;
                  </Link>
                </div>

                {/* Cities grid */}
                <div className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {citiesToShow.map((city) => (
                      <Link
                        key={city.id}
                        href={`/${country.slug}/${city.slug}/${repairSlug}/`}
                        className="text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors"
                      >
                        {city.name}
                        <span className="text-gray-400 ml-1">
                          ({city.provider_count})
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Expand/collapse button */}
                  {hasMore && (
                    <button
                      onClick={() => toggleCountry(country.slug)}
                      className="mt-4 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
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
