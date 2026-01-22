import Link from 'next/link'
import { Wrench, ArrowRight, CheckCircle } from 'lucide-react'
import type { CategoryData, PlaceData } from '@/lib/data/getRetailCategoryData'

interface Props {
  category: CategoryData
  place: PlaceData
  countrySlug: string
}

/**
 * Repair Cross-Sell CTA Section for Retail Category Page (Spec 14)
 *
 * Promotes repair services for the same appliance category.
 */
export default function RepairCTASection({ category, place, countrySlug }: Props) {
  const categoryName = category.name_singular || category.name
  const categoryNameLower = categoryName.toLowerCase()

  // Build repair page URL
  const repairUrl = `/${countrySlug}/${place.slug}/${category.slug}-repair/`

  return (
    <section className="py-8 border-t border-gray-200">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
              <Wrench className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Need a Repair Instead?
            </h2>
            <p className="text-gray-600 mb-4">
              If your current {categoryNameLower} needs fixing, we list trusted repair engineers in{' '}
              {place.name}. Compare quotes, check reviews, and book same-day callouts.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Local engineers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Same-day callouts</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Verified reviews</span>
              </div>
            </div>

            {/* Repair cost hint */}
            {category.avg_repair_cost_min && category.avg_repair_cost_max && (
              <p className="text-sm text-gray-500 mb-4">
                Typical repair costs: £{category.avg_repair_cost_min} - £{category.avg_repair_cost_max}
              </p>
            )}
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <Link
              href={repairUrl}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Find {categoryName} Repair
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
