import Link from 'next/link'
import { Search, Store, MapPin, PiggyBank } from 'lucide-react'
import type { ApplianceCategoryData, NationalRetailStats } from '@/lib/data/getNationalRetailCategoryData'

interface Props {
  category: ApplianceCategoryData
  stats: NationalRetailStats
}

/**
 * Hero Section for National Retail Category Page (Spec 17)
 */
export default function NationalRetailHero({ category, stats }: Props) {
  const categoryNamePlural = category.name_plural || category.name

  return (
    <section className="bg-gradient-to-br from-[#faf6f5] to-[#f5eeec] py-12 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Icon */}
        <div className="text-5xl mb-4" aria-hidden="true">
          {category.icon || '🏠'}
        </div>

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Graded {category.name} UK
        </h1>

        {/* Intro paragraph */}
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
          Find graded, ex-display and factory seconds {categoryNamePlural.toLowerCase()} from
          trusted retailers across the United Kingdom. Save {stats.avgDiscountMin}-{stats.avgDiscountMax}%
          on top brands with full warranties.
        </p>

        {/* Stats box */}
        <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto mb-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Store className="w-6 h-6 text-[#e85d4c]" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalStores}+</div>
              <div className="text-sm text-gray-500">Stores</div>
            </div>
            <div className="text-center border-x border-gray-200">
              <div className="flex justify-center mb-2">
                <MapPin className="w-6 h-6 text-[#e85d4c]" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalCities}+</div>
              <div className="text-sm text-gray-500">Cities</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <PiggyBank className="w-6 h-6 text-[#e85d4c]" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.avgDiscountMin}-{stats.avgDiscountMax}%</div>
              <div className="text-sm text-gray-500">Savings</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="#find-local"
          className="inline-flex items-center bg-[#e85d4c] hover:bg-[#d94f3f] text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          <Search className="w-5 h-5 mr-2" />
          Find Stores Near Me
        </Link>
      </div>
    </section>
  )
}
