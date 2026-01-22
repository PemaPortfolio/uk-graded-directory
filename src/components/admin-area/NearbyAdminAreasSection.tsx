import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

interface NearbyAdminArea {
  id: string
  name: string
  slug: string
  place_count: number
  store_count: number
  provider_count: number
}

interface NearbyAdminAreasSectionProps {
  nearbyAreas: NearbyAdminArea[]
  countrySlug: string
  countryName: string
  className?: string
}

/**
 * Section showing nearby admin areas for cross-linking
 */
export function NearbyAdminAreasSection({
  nearbyAreas,
  countrySlug,
  countryName,
  className = '',
}: NearbyAdminAreasSectionProps) {
  if (!nearbyAreas || nearbyAreas.length === 0) {
    return null
  }

  return (
    <section className={className}>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        More Regions in {countryName}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {nearbyAreas.map((area) => (
          <Link
            key={area.id}
            href={`/${countrySlug}/${area.slug}`}
            className="group flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#e85d4c] hover:shadow-sm transition-all"
          >
            <MapPin className="w-4 h-4 text-gray-400 group-hover:text-[#e85d4c] transition-colors flex-shrink-0" />
            <div className="min-w-0">
              <div className="font-medium text-sm text-gray-900 dark:text-gray-100 group-hover:text-[#e85d4c] transition-colors truncate">
                {area.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {area.place_count} locations
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View all link */}
      <div className="mt-4 text-center">
        <Link
          href={`/${countrySlug}`}
          className="inline-flex items-center gap-2 text-sm text-[#e85d4c] hover:underline"
        >
          View all regions in {countryName}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}

export default NearbyAdminAreasSection
