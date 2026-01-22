import { PoundSterling, Info } from 'lucide-react'
import type { RepairCategoryData, RepairPageStats } from '@/lib/data/getRepairCategoryData'

interface Props {
  category: RepairCategoryData
  placeName: string
  stats: RepairPageStats
}

/**
 * Repair Costs Section for Repair Category Page (Spec 10)
 *
 * Shows typical repair costs for the appliance category.
 */
export default function RepairCostsSection({ category, placeName, stats }: Props) {
  const categoryName = category.name_singular || category.name

  // Use category averages or defaults
  const minCost = category.avg_repair_cost_min || stats.minCalloutFee || 50
  const maxCost = category.avg_repair_cost_max || stats.maxCalloutFee || 150

  return (
    <section className="py-8 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <PoundSterling className="w-5 h-5 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          What Does {categoryName} Repair Cost in {placeName}?
        </h2>
      </div>

      <div className="bg-green-50 rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-green-700 mb-1">Typical repair costs</p>
            <p className="text-3xl font-bold text-green-800">
              £{minCost} - £{maxCost}
            </p>
          </div>

          {stats.minCalloutFee && (
            <div className="md:text-right">
              <p className="text-sm text-green-700 mb-1">Callout fees from</p>
              <p className="text-2xl font-bold text-green-800">£{stats.minCalloutFee}</p>
            </div>
          )}
        </div>
      </div>

      {/* Cost breakdown */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <CostCard
          title="Callout / Diagnosis"
          range={`£${stats.minCalloutFee || 45} - £${stats.maxCalloutFee || 85}`}
          description="Initial visit and fault diagnosis. Often deducted from final repair cost."
        />
        <CostCard
          title="Common Repairs"
          range={`£${minCost} - £${maxCost}`}
          description="Includes parts and labour for typical faults."
        />
      </div>

      {/* Info box */}
      <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-4">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">Cost saving tips:</p>
          <ul className="list-disc list-inside space-y-1 text-blue-700">
            <li>Ask if callout fee is deducted from repair cost</li>
            <li>Look for &quot;no fix no fee&quot; policies ({stats.providersWithNoFixNoFee} engineers offer this)</li>
            <li>Check warranty coverage before paying</li>
            <li>Compare quotes from multiple engineers</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function CostCard({
  title,
  range,
  description,
}: {
  title: string
  range: string
  description: string
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-xl font-bold text-green-600 mb-2">{range}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}
