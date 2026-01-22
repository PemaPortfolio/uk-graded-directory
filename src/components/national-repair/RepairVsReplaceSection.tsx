import Link from 'next/link'
import { Wrench, ShoppingCart, Calculator } from 'lucide-react'
import type { RepairCategoryData, NationalRepairStats } from '@/lib/data/getNationalRepairPageData'

interface Props {
  category: RepairCategoryData
  stats: NationalRepairStats
}

/**
 * Repair vs Replace Section for National Repair Page (Spec 16)
 */
export default function RepairVsReplaceSection({ category, stats }: Props) {
  const categoryName = category.name_singular || category.name
  const avgLifespan = stats.avgLifespan || 10

  const repairReasons = [
    'Under 7 years old',
    'Repair costs less than 50% of new price',
    'Simple fix (pump, seal, belt)',
    'First major breakdown',
  ]

  const replaceReasons = [
    `Over ${avgLifespan} years old`,
    'Multiple faults appearing',
    'Major component failure (drum, motor)',
    'Frequent repairs needed',
  ]

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Should You Repair or Replace Your {categoryName}?
        </h2>

        {/* Lifespan indicator */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-center">
          <span className="text-gray-600">Average {categoryName} Lifespan: </span>
          <span className="font-bold text-gray-900">
            {avgLifespan - 2}-{avgLifespan} years
          </span>
        </div>

        {/* Comparison grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Repair column */}
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
              <Wrench className="w-6 h-6" />
              Consider Repairing If...
            </h3>
            <ul className="space-y-3">
              {repairReasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-gray-700">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Replace column */}
          <div className="bg-orange-50 rounded-xl p-6">
            <h3 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              Consider Replacing If...
            </h3>
            <ul className="space-y-3">
              {replaceReasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-600">✓</span>
                  <span className="text-gray-700">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Calculator CTA */}
        <div className="text-center">
          <Link
            href="/tools/repair-or-replace/"
            className="inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Use Our Repair vs Replace Calculator
          </Link>
        </div>
      </div>
    </section>
  )
}
