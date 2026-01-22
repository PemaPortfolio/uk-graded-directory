import type { RepairCategoryData, NationalRepairStats } from '@/lib/data/getNationalRepairPageData'

interface Props {
  category: RepairCategoryData
  stats: NationalRepairStats
}

/**
 * Repair Costs Section for National Repair Page (Spec 16)
 */
export default function RepairCostsSection({ category, stats }: Props) {
  const categoryName = category.name_singular || category.name

  const costFactors = [
    'Type of fault (drum, motor, pump, electrics)',
    'Age and model of appliance',
    'Parts required',
    "Engineer's callout fee",
    'Location (urban vs rural)',
  ]

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          How Much Does {categoryName} Repair Cost?
        </h2>

        {/* Main cost display */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 mb-8 text-center">
          <div className="text-sm text-gray-600 mb-2">Average Repair Cost</div>
          <div className="text-4xl font-bold text-gray-900 mb-2">
            £{stats.avgCostMin} - £{stats.avgCostMax}
          </div>
          <div className="text-sm text-gray-500">Based on UK-wide data</div>
        </div>

        {/* Cost factors */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">What affects the price:</h3>
          <ul className="space-y-2">
            {costFactors.map((factor, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700">{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Typical breakdown */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Typical breakdown:</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Callout fee</span>
              <span className="font-medium">£45 - £75</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Labour (per hour)</span>
              <span className="font-medium">£40 - £80</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Parts</span>
              <span className="font-medium">£15 - £200+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
