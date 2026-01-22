'use client'

import { useState } from 'react'
import Link from 'next/link'

interface City {
  id: string
  name: string
  slug: string
  storeCount: number
  countrySlug: string
}

interface Country {
  id: string
  name: string
  slug: string
  flagEmoji: string
}

interface LocationNavigatorProps {
  countries: Country[]
  cities: City[]
}

/**
 * Location Navigator Section (Spec 12 - Section 7)
 *
 * Combined navigation for cities and countries with tab interface.
 * Shows cities filtered by selected country.
 */
export default function LocationNavigator({ countries, cities }: LocationNavigatorProps) {
  // Default to first country or England
  const [selectedCountry, setSelectedCountry] = useState(
    countries[0]?.slug || 'england'
  )

  // Default countries if none provided
  const defaultCountries: Country[] = [
    { id: '1', name: 'England', slug: 'england', flagEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { id: '2', name: 'Scotland', slug: 'scotland', flagEmoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
    { id: '3', name: 'Wales', slug: 'wales', flagEmoji: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
    { id: '4', name: 'N. Ireland', slug: 'northern-ireland', flagEmoji: '🇬🇧' },
  ]

  // Default cities if none provided
  const defaultCities: City[] = [
    { id: '1', name: 'London', slug: 'london', storeCount: 42, countrySlug: 'england' },
    { id: '2', name: 'Manchester', slug: 'manchester', storeCount: 28, countrySlug: 'england' },
    { id: '3', name: 'Birmingham', slug: 'birmingham', storeCount: 24, countrySlug: 'england' },
    { id: '4', name: 'Leeds', slug: 'leeds', storeCount: 18, countrySlug: 'england' },
    { id: '5', name: 'Bristol', slug: 'bristol', storeCount: 15, countrySlug: 'england' },
    { id: '6', name: 'Liverpool', slug: 'liverpool', storeCount: 12, countrySlug: 'england' },
    { id: '7', name: 'Sheffield', slug: 'sheffield', storeCount: 10, countrySlug: 'england' },
    { id: '8', name: 'Newcastle', slug: 'newcastle', storeCount: 8, countrySlug: 'england' },
    { id: '9', name: 'Glasgow', slug: 'glasgow', storeCount: 15, countrySlug: 'scotland' },
    { id: '10', name: 'Edinburgh', slug: 'edinburgh', storeCount: 12, countrySlug: 'scotland' },
    { id: '11', name: 'Cardiff', slug: 'cardiff', storeCount: 8, countrySlug: 'wales' },
    { id: '12', name: 'Belfast', slug: 'belfast', storeCount: 6, countrySlug: 'northern-ireland' },
  ]

  const displayCountries = countries.length > 0 ? countries : defaultCountries
  const displayCities = cities.length > 0 ? cities : defaultCities

  // Filter cities by selected country
  const filteredCities = displayCities.filter(
    (city) => city.countrySlug === selectedCountry
  )

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Question-based H2 for AEO */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#181111] mb-8">
          Where Can You Find Graded Appliance Stores?
        </h2>

        {/* Country Tabs */}
        <div className="flex overflow-x-auto gap-0 border-b border-gray-200 mb-6">
          {displayCountries.map((country) => (
            <button
              key={country.slug}
              onClick={() => setSelectedCountry(country.slug)}
              className={`px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                selectedCountry === country.slug
                  ? 'border-[#e85d4c] text-[#e85d4c]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              aria-pressed={selectedCountry === country.slug}
            >
              {country.flagEmoji} {country.name}
            </button>
          ))}
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredCities.slice(0, 12).map((city) => (
            <Link
              key={city.id}
              href={`/${city.countrySlug}/${city.slug}`}
              className="group"
            >
              <div className="p-4 bg-white rounded-lg border border-gray-200 hover:border-[#e85d4c] transition-colors">
                <div className="font-medium text-[#181111] group-hover:text-[#e85d4c]">
                  {city.name}
                </div>
                <div className="text-sm text-[#6b7280]">
                  {city.storeCount} stores
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-[#181111] transition-colors"
          >
            View all 156 cities →
          </Link>
        </div>
      </div>
    </section>
  )
}
