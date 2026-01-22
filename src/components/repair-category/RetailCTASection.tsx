import Link from 'next/link'
import { ShoppingBag, ArrowRight, CheckCircle } from 'lucide-react'
import type { RepairCategoryData, RepairPlaceData } from '@/lib/data/getRepairCategoryData'

interface Props {
  category: RepairCategoryData
  place: RepairPlaceData
  countrySlug: string
}

/**
 * Retail Cross-Sell CTA Section for Repair Category Page (Spec 10)
 *
 * Promotes graded appliances as an alternative to repair.
 */
export default function RetailCTASection({ category, place, countrySlug }: Props) {
  const categoryName = category.name_singular || category.name
  const categoryNamePlural = category.name_plural || category.name

  // Build retail page URL
  const retailUrl = `/${countrySlug}/${place.slug}/${category.slug}/`

  return (
    <section className="py-8 border-t border-gray-200">
      <div className="bg-gradient-to-br from-[#fdf2f0] to-[#fce8e5] rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-[#e85d4c] rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Appliance Beyond Repair?
            </h2>
            <p className="text-gray-600 mb-4">
              If your {categoryName.toLowerCase()} is beyond economical repair, browse graded{' '}
              {categoryNamePlural.toLowerCase()} in {place.name}. Save 30-70% on ex-display and
              factory seconds with full warranties.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-[#e85d4c]" />
                <span>Save 30-70%</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-[#e85d4c]" />
                <span>Full warranty</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-[#e85d4c]" />
                <span>Local stores</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <Link
              href={retailUrl}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#e85d4c] text-white rounded-lg font-medium hover:bg-[#d94f3f] transition-colors"
            >
              Browse Graded {categoryNamePlural}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
