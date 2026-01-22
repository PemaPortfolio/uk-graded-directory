import Link from 'next/link'
import { MapPin } from 'lucide-react'
import type { CityWithProviderCount, RepairCategoryData } from '@/lib/data/getNationalRepairPageData'
import { getRepairSlug } from '@/lib/utils/repairSlugUtils'

interface Props {
  cities: CityWithProviderCount[]
  category: RepairCategoryData
}

/**
 * Popular Cities Section for National Repair Page (Spec 16)
 */
export default function RepairPopularCitiesSection({ cities, category }: Props) {
  if (cities.length === 0) return null

  const categoryName = category.name_singular || category.name
  const repairSlug = getRepairSlug(categoryName)

  return (
    <section className="py-12 px-4 bg-white" id="find-local">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Popular Cities for {categoryName} Repair
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.slice(0, 12).map((city) => (
            <Link
              key={city.id}
              href={`/${city.country_slug}/${city.slug}/${repairSlug}/`}
              className="group p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {city.name}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {city.provider_count} engineer{city.provider_count !== 1 ? 's' : ''}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
