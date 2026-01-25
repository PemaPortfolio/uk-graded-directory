'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Store, ChevronDown, ChevronUp } from 'lucide-react'
import type { Brand, CityWithCounts } from '@/lib/data/getBrandPageData'

interface BrandStoresSectionProps {
  brand: Brand
  cities: CityWithCounts[]
  totalCities: number
}

const INITIAL_CITIES_SHOWN = 8

/**
 * Find Stores Section for Individual Brand Page
 * Shows top cities with stores selling this brand
 */
export function BrandStoresSection({ brand, cities, totalCities }: BrandStoresSectionProps) {
  const [showAll, setShowAll] = useState(false)

  if (cities.length === 0) return null

  const citiesToShow = showAll ? cities : cities.slice(0, INITIAL_CITIES_SHOWN)
  const hasMore = cities.length > INITIAL_CITIES_SHOWN

  return (
    <section className="py-12 lg:py-16 bg-white dark:bg-[#0f0d0d]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#181111] dark:text-[#f5f0f0] mb-4 flex items-center gap-2">
          <span>🏪</span> Find Graded {brand.name} Stores by City
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Top cities with stores stocking graded {brand.name} appliances:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {citiesToShow.map((city) => (
            <Link
              key={city.id}
              href={`/${city.country_slug}/${city.slug}/`}
              className="group bg-gray-50 dark:bg-[#1a1616] rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-[#252020] transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-[#e85d4c]" />
                <span className="font-semibold text-[#181111] dark:text-[#f5f0f0] group-hover:text-[#e85d4c] transition-colors">
                  {city.name}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 ml-6">
                <Store className="w-3.5 h-3.5" />
                <span>{city.store_count} store{city.store_count !== 1 ? 's' : ''}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Show more/less button */}
        {hasMore && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 text-[#e85d4c] hover:text-[#d94f3f] font-medium transition-colors"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Show fewer cities
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  View all {totalCities} cities
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
