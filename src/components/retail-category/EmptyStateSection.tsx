import Link from 'next/link'
import { Store as StoreIcon, MapPin, ArrowRight, Wrench, Bell } from 'lucide-react'
import type { CategoryData, PlaceData, NearbyCityData } from '@/lib/data/getRetailCategoryData'

interface Props {
  category: CategoryData
  place: PlaceData
  countrySlug: string
  nearbyCities: NearbyCityData[]
}

/**
 * Empty State Section for Retail Category Page (Spec 14)
 *
 * Shown when no stores are found for the category in the city.
 */
export default function EmptyStateSection({ category, place, countrySlug, nearbyCities }: Props) {
  const categoryName = category.name_plural || category.name
  const categoryNameLower = categoryName.toLowerCase()
  const categorySingular = category.name_singular || category.name

  return (
    <section className="mb-12">
      <div className="bg-gray-50 rounded-2xl p-8 text-center">
        {/* Icon */}
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <StoreIcon className="w-8 h-8 text-gray-400" />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          No stores currently listing graded {categoryNameLower} in {place.name}
        </h2>

        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We&apos;re actively expanding our directory. Check nearby areas or sign up for alerts.
        </p>

        {/* Alert signup placeholder */}
        <div className="bg-white rounded-xl p-6 mb-8 max-w-md mx-auto border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900">Get Notified</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Be the first to know when stores list {categoryNameLower} in {place.name}.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e85d4c] focus:border-transparent"
            />
            <button className="px-4 py-2 bg-[#e85d4c] text-white rounded-lg font-medium hover:bg-[#d94f3f] transition-colors">
              Notify Me
            </button>
          </div>
        </div>

        {/* Nearby alternatives */}
        {nearbyCities.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-gray-400" />
              <h3 className="font-medium text-gray-900">Try Nearby Areas</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {nearbyCities.map((city) => (
                <Link
                  key={city.id}
                  href={`/${countrySlug}/${city.slug}/${category.slug}/`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-[#e85d4c] hover:text-[#e85d4c] transition-colors"
                >
                  {city.name}
                  {city.store_count > 0 && (
                    <span className="text-xs text-gray-500">({city.store_count})</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Link to city hub */}
        <div className="mb-6">
          <Link
            href={`/${countrySlug}/${place.slug}/`}
            className="text-[#e85d4c] hover:underline inline-flex items-center gap-1"
          >
            View all graded appliance stores in {place.name}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Repair alternative */}
        {category.supports_repair && (
          <div className="bg-blue-50 rounded-xl p-6 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <Wrench className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-gray-900">Need a Repair Instead?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              If your current {categorySingular.toLowerCase()} needs fixing, we can help you find
              local repair engineers.
            </p>
            <Link
              href={`/${countrySlug}/${place.slug}/${category.slug}-repair/`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Find {categorySingular} Repair
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
