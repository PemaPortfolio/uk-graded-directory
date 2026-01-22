import { PoundSterling } from 'lucide-react'
import type { BrandData, PlaceData, BrandRepairStats } from '@/lib/data/getBrandRepairData'

interface Props {
  brand: BrandData
  place: PlaceData
  stats: BrandRepairStats
}

/**
 * Repair Costs Section for Brand Repair Page (Spec 15)
 */
export default function BrandRepairCostsSection({ brand, place, stats }: Props) {
  const minCallout = stats.minCalloutFee || 55
  const maxCallout = Math.round(minCallout * 1.35) // Estimate typical max
  const minRepair = Math.round(minCallout * 1.7)
  const maxRepair = Math.round(minCallout * 2.9)

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <PoundSterling className="w-6 h-6 text-amber-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            {brand.name} Repair Costs in {place.name}
          </h2>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4 text-lg">
            Typical Costs for {brand.name} Repairs
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-700">Callout / Diagnosis:</span>
              <span className="font-semibold text-gray-900">{minCallout} - {maxCallout}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Average Total Repair:</span>
              <span className="font-semibold text-gray-900">{minRepair} - {maxRepair}</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-6 italic">
            Note: {brand.name} authorized repairs may cost slightly more than non-authorized, but include genuine parts and warranty protection.
          </p>
        </div>
      </div>
    </section>
  )
}
