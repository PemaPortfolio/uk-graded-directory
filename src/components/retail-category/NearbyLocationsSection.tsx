import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import type { NearbyCityData, PlaceData, CategoryData } from '@/lib/data/getRetailCategoryData'

interface Props {
  currentPlace: PlaceData
  category: CategoryData
  countrySlug: string
  nearbyCities: NearbyCityData[]
}

/**
 * Nearby Locations Section for Retail Category Page (Spec 14)
 *
 * Links to same category in nearby cities.
 */
export default function NearbyLocationsSection({
  currentPlace,
  category,
  countrySlug,
  nearbyCities,
}: Props) {
  if (nearbyCities.length === 0) {
    return null
  }

  const categoryName = category.name_plural || category.name

  return (
    <section className="py-8 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-amber-100 rounded-lg">
          <MapPin className="w-5 h-5 text-amber-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Browse Nearby</h2>
      </div>

      <p className="text-gray-600 mb-4">
        Graded {categoryName.toLowerCase()} also available in:
      </p>

      <div className="flex flex-wrap gap-2">
        {nearbyCities.map((city) => (
          <Link
            key={city.id}
            href={`/${countrySlug}/${city.slug}/${category.slug}/`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-[#e85d4c] hover:text-[#e85d4c] transition-colors group"
          >
            <span>{city.name}</span>
            {city.store_count > 0 && (
              <span className="text-xs text-gray-500 group-hover:text-[#e85d4c]/70">
                ({city.store_count})
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
          className="text-[#e85d4c] hover:underline inline-flex items-center gap-1"
        >
          View all appliances in {currentPlace.name}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
