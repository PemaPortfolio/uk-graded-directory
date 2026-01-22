import Link from 'next/link'
import { Store, Wrench } from 'lucide-react'

interface City {
  id: string
  name: string
  slug: string
  store_count: number
  provider_count: number
}

interface Props {
  countrySlug: string
  countryName: string
  cities: City[]
  totalCities: number
}

/**
 * Popular Cities Section (Spec 13)
 *
 * Shows top 12 cities by store count with cards.
 */
export default function PopularCitiesSection({
  countrySlug,
  countryName,
  cities,
  totalCities,
}: Props) {
  if (cities.length === 0) return null

  return (
    <section className="py-8 md:py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Popular Cities in {countryName}
          </h2>
          {totalCities > cities.length && (
            <Link
              href={`/${countrySlug}/`}
              className="text-sm text-[#e85d4c] font-medium hover:underline hidden md:block"
            >
              View all {totalCities} cities →
            </Link>
          )}
        </div>

        {/* City Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/${countrySlug}/${city.slug}/`}
              className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-[#e85d4c] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-[#e85d4c] mb-3">
                {city.name}
              </h3>
              <div className="space-y-1.5 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-gray-400" />
                  <span>{city.store_count} stores</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-gray-400" />
                  <span>{city.provider_count} repair</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        {totalCities > cities.length && (
          <div className="mt-6 text-center md:hidden">
            <Link
              href={`/${countrySlug}/`}
              className="text-[#e85d4c] font-medium hover:underline"
            >
              View all {totalCities} cities →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
