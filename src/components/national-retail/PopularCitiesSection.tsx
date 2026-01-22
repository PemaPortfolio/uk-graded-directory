import Link from 'next/link'
import { MapPin } from 'lucide-react'
import type { CityWithStoreCount, ApplianceCategoryData } from '@/lib/data/getNationalRetailCategoryData'

interface Props {
  cities: CityWithStoreCount[]
  category: ApplianceCategoryData
}

/**
 * Popular Cities Section for National Retail Category Page (Spec 17)
 */
export default function PopularCitiesSection({ cities, category }: Props) {
  if (cities.length === 0) return null

  return (
    <section className="py-12 px-4 bg-white" id="find-local">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Popular Cities for Graded {category.name}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.slice(0, 12).map((city) => (
            <Link
              key={city.id}
              href={`/${city.country_slug}/${city.slug}/${category.slug}/`}
              className="group p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-[#e85d4c]" />
                <span className="font-semibold text-gray-900 group-hover:text-[#e85d4c] transition-colors">
                  {city.name}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {city.store_count} store{city.store_count !== 1 ? 's' : ''}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
