import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import type {
  NearbyCityData,
  RepairPlaceData,
  RepairCategoryData,
} from '@/lib/data/getRepairCategoryData'

interface Props {
  currentPlace: RepairPlaceData
  category: RepairCategoryData
  countrySlug: string
  nearbyCities: NearbyCityData[]
}

/**
 * Nearby Cities Section for Repair Category Page (Spec 10)
 *
 * Links to same repair category in nearby cities.
 */
export default function RepairNearbyCitiesSection({
  currentPlace,
  category,
  countrySlug,
  nearbyCities,
}: Props) {
  if (nearbyCities.length === 0) {
    return null
  }

  const categoryName = category.name_singular || category.name

  // Build repair slug
  const repairSlug = buildRepairSlug(category.slug, category.name_singular)

  return (
    <section className="py-8 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-teal-100 rounded-lg">
          <MapPin className="w-5 h-5 text-teal-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          {categoryName} Repair in Nearby Cities
        </h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {nearbyCities.map((city) => (
          <Link
            key={city.id}
            href={`/${countrySlug}/${city.slug}/${repairSlug}/`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors group"
          >
            <span>{city.name}</span>
            {city.provider_count > 0 && (
              <span className="text-xs text-gray-500 group-hover:text-blue-500">
                ({city.provider_count})
              </span>
            )}
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>

      {/* Link back to city hub */}
      <div className="mt-6">
        <Link
          href={`/${countrySlug}/${currentPlace.slug}/`}
          className="text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          View all repair services in {currentPlace.name}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}

/**
 * Build repair slug from category slug
 */
function buildRepairSlug(categorySlug: string, nameSingular: string | null): string {
  if (nameSingular) {
    const singularSlug = nameSingular.toLowerCase().replace(/\s+/g, '-')
    return `${singularSlug}-repair`
  }

  const singular = categorySlug.replace(/s$/, '')
  return `${singular}-repair`
}
