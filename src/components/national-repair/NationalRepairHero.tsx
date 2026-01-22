import Link from 'next/link'
import { Search, Wrench, MapPin, PoundSterling } from 'lucide-react'
import type { RepairCategoryData, NationalRepairStats } from '@/lib/data/getNationalRepairPageData'

interface Props {
  category: RepairCategoryData
  stats: NationalRepairStats
}

/**
 * Hero Section for National Repair Page (Spec 16)
 */
export default function NationalRepairHero({ category, stats }: Props) {
  const categoryName = category.name_singular || category.name

  return (
    <section className="bg-gradient-to-br from-slate-50 to-slate-200 py-12 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Icon */}
        <div className="text-5xl mb-4" aria-hidden="true">
          {category.icon || '🔧'}
        </div>

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {categoryName} Repair UK
        </h1>

        {/* Intro paragraph */}
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
          Find trusted {categoryName.toLowerCase()} repair engineers across the United Kingdom.
          Compare prices, read reviews, and book same-day callouts from local professionals.
        </p>

        {/* Stats box */}
        <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto mb-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Wrench className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalProviders}+</div>
              <div className="text-sm text-gray-500">Engineers</div>
            </div>
            <div className="text-center border-x border-gray-200">
              <div className="flex justify-center mb-2">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalCities}+</div>
              <div className="text-sm text-gray-500">Cities</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <PoundSterling className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">£{stats.avgCostMin}</div>
              <div className="text-sm text-gray-500">From</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="#find-local"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          <Search className="w-5 h-5 mr-2" />
          Find Repair Near Me
        </Link>
      </div>
    </section>
  )
}
