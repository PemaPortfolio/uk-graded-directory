import Link from 'next/link'
import { ShoppingCart, PiggyBank } from 'lucide-react'
import type { RepairCategoryData } from '@/lib/data/getNationalRepairPageData'

interface Props {
  category: RepairCategoryData
}

/**
 * Cross-Sell Retail Section for National Repair Page (Spec 16)
 * Links to the national retail category page
 */
export default function CrossSellRetailSection({ category }: Props) {
  const categoryName = category.name_singular || category.name
  const categoryNamePlural = category.name_plural || category.name

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-[#faf6f5] to-[#f5eeec]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <ShoppingCart className="w-12 h-12 text-[#e85d4c]" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Beyond Repair? Save 30-70% on Graded Appliances
        </h2>

        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          If your {categoryName.toLowerCase()} isn&apos;t worth fixing, browse our directory of
          graded appliance stores across the UK. Find ex-display, B-grade, and factory
          seconds at massive discounts.
        </p>

        <div className="bg-white rounded-lg p-4 mb-6 inline-flex items-center gap-2">
          <PiggyBank className="w-5 h-5 text-green-600" />
          <span className="text-gray-900 font-medium">
            Average savings: 30-70% off RRP
          </span>
        </div>

        <div>
          <Link
            href={`/${category.slug}/`}
            className="inline-flex items-center bg-[#e85d4c] hover:bg-[#d94f3f] text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Browse Graded {categoryNamePlural}
          </Link>
        </div>
      </div>
    </section>
  )
}
