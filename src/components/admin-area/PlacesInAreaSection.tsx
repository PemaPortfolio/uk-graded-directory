import Link from 'next/link'
import { MapPin, Store, Wrench, ChevronRight } from 'lucide-react'

interface PlaceInArea {
  id: string
  name: string
  slug: string
  place_type: string
  population: number | null
  store_count: number
  provider_count: number
}

interface PlacesInAreaSectionProps {
  places: PlaceInArea[]
  adminAreaName: string
  countrySlug: string
  className?: string
}

/**
 * Section showing all places (cities/towns) within an admin area
 */
export function PlacesInAreaSection({
  places,
  adminAreaName,
  countrySlug,
  className = '',
}: PlacesInAreaSectionProps) {
  if (!places || places.length === 0) {
    return null
  }

  // Sort places: those with stores/providers first, then by population
  const sortedPlaces = [...places].sort((a, b) => {
    const aHasListings = a.store_count > 0 || a.provider_count > 0
    const bHasListings = b.store_count > 0 || b.provider_count > 0

    if (aHasListings && !bHasListings) return -1
    if (!aHasListings && bHasListings) return 1

    return (b.store_count + b.provider_count) - (a.store_count + a.provider_count)
  })

  return (
    <section className={className}>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Browse by Location in {adminAreaName}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedPlaces.map((place) => (
          <Link
            key={place.id}
            href={`/${countrySlug}/${place.slug}`}
            className="group flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#e85d4c] hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-[#e85d4c]/10 transition-colors">
                <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-[#e85d4c] transition-colors" />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#e85d4c] transition-colors">
                  {place.name}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  {place.store_count > 0 && (
                    <span className="flex items-center gap-1">
                      <Store className="w-3 h-3" />
                      {place.store_count} stores
                    </span>
                  )}
                  {place.provider_count > 0 && (
                    <span className="flex items-center gap-1">
                      <Wrench className="w-3 h-3" />
                      {place.provider_count} repair
                    </span>
                  )}
                  {place.store_count === 0 && place.provider_count === 0 && (
                    <span>View area</span>
                  )}
                </div>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#e85d4c] transition-colors" />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default PlacesInAreaSection
