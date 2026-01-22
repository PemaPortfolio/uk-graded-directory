import Link from 'next/link'
import { Store, Wrench, ArrowRight } from 'lucide-react'

interface NearbyCity {
  id: string
  name: string
  slug: string
  store_count: number
  provider_count: number
  country_slug: string
}

interface Props {
  cities: NearbyCity[]
}

/**
 * Nearby Cities Section (Spec 07 - Section 12)
 *
 * Shows links to nearby city hubs for internal linking.
 */
export default function NearbyCitiesSection({ cities }: Props) {
  if (cities.length === 0) return null

  return (
    <section className="py-8 md:py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          Nearby Cities
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/${city.country_slug}/${city.slug}/`}
              className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-[#e85d4c] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-[#e85d4c] mb-2">
                {city.name}
              </h3>

              <div className="space-y-1 text-sm text-gray-600 mb-3">
                {city.store_count > 0 && (
                  <div className="flex items-center gap-2">
                    <Store className="w-3 h-3 text-gray-400" />
                    <span>{city.store_count} stores</span>
                  </div>
                )}
                {city.provider_count > 0 && (
                  <div className="flex items-center gap-2">
                    <Wrench className="w-3 h-3 text-gray-400" />
                    <span>{city.provider_count} repair</span>
                  </div>
                )}
              </div>

              <span className="inline-flex items-center gap-1 text-[#e85d4c] text-sm font-medium group-hover:underline">
                View <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
