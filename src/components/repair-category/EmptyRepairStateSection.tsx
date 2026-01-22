import Link from 'next/link'
import { Wrench, MapPin, ArrowRight, ShoppingBag, Bell } from 'lucide-react'
import type {
  RepairCategoryData,
  RepairPlaceData,
  NearbyCityData,
} from '@/lib/data/getRepairCategoryData'

interface Props {
  category: RepairCategoryData
  place: RepairPlaceData
  countrySlug: string
  nearbyCities: NearbyCityData[]
}

/**
 * Empty State Section for Repair Category Page (Spec 10)
 *
 * Shown when no providers are found for the category in the city.
 */
export default function EmptyRepairStateSection({
  category,
  place,
  countrySlug,
  nearbyCities,
}: Props) {
  const categoryName = category.name_singular || category.name
  const categoryNameLower = categoryName.toLowerCase()

  // Build repair slug for nearby city links
  const repairSlug = buildRepairSlug(category.slug, category.name_singular)

  return (
    <section className="mb-12">
      <div className="bg-gray-50 rounded-2xl p-8 text-center">
        {/* Icon */}
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wrench className="w-8 h-8 text-gray-400" />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          No {categoryNameLower} repair engineers listed in {place.name}
        </h2>

        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We&apos;re actively expanding our directory. Check nearby areas or sign up for alerts when
          engineers join.
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
            Be the first to know when {categoryNameLower} repair engineers join in {place.name}.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
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
                  href={`/${countrySlug}/${city.slug}/${repairSlug}/`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  {city.name}
                  {city.provider_count > 0 && (
                    <span className="text-xs text-gray-500">({city.provider_count})</span>
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
            className="text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            View all repair services in {place.name}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Retail alternative */}
        <div className="bg-[#fdf2f0] rounded-xl p-6 max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="w-5 h-5 text-[#e85d4c]" />
            <h3 className="font-medium text-gray-900">Need a Replacement Instead?</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            If your {categoryNameLower} is beyond repair, browse graded appliances with full
            warranties.
          </p>
          <Link
            href={`/${countrySlug}/${place.slug}/${category.slug}/`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#e85d4c] text-white rounded-lg font-medium hover:bg-[#d94f3f] transition-colors"
          >
            Browse Graded {category.name_plural || category.name}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
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
