import Link from 'next/link'
import { Wrench } from 'lucide-react'
import type { ApplianceCategoryData } from '@/lib/data/getNationalRetailCategoryData'

interface Props {
  category: ApplianceCategoryData
}

/**
 * Repair Cross-Sell Section for National Retail Category Page (Spec 17)
 */
export default function RepairCrossSellSection({ category }: Props) {
  // Only show if category supports repair
  if (!category.supports_repair) return null

  // Generate repair slug from category
  const repairSlug = category.name_singular
    ? category.name_singular.toLowerCase().replace(/\s+/g, '-') + '-repair'
    : category.slug.replace(/s$/, '') + '-repair'

  const categoryName = category.name_singular?.toLowerCase() || category.name.toLowerCase()

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-4xl mb-4">🔧</div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Need a Repair Instead?
        </h2>

        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          If your current {categoryName} needs fixing, find trusted repair engineers across
          the UK. Compare prices, check reviews, and book same-day callouts.
        </p>

        <Link
          href={`/${repairSlug}/`}
          className="inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          <Wrench className="w-5 h-5 mr-2" />
          Find {category.name_singular || category.name} Repair Engineers
        </Link>
      </div>
    </section>
  )
}
