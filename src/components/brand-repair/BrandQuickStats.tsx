import { Users, CheckCircle, PoundSterling, Star } from 'lucide-react'
import type { BrandRepairStats } from '@/lib/data/getBrandRepairData'

interface Props {
  stats: BrandRepairStats
}

/**
 * Quick Stats Bar for Brand Repair Page (Spec 15)
 */
export default function BrandQuickStats({ stats }: Props) {
  return (
    <section className="bg-gray-50 py-6 px-4 border-y border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Engineers Count */}
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="flex items-center justify-center gap-2 text-gray-700 mb-1">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold">{stats.providerCount}</span>
            </div>
            <div className="text-sm text-gray-500">Engineers</div>
          </div>

          {/* Verified Count */}
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="flex items-center justify-center gap-2 text-gray-700 mb-1">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold">{stats.verifiedCount}</span>
            </div>
            <div className="text-sm text-gray-500">Verified</div>
          </div>

          {/* Min Callout Fee */}
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="flex items-center justify-center gap-2 text-gray-700 mb-1">
              <PoundSterling className="w-5 h-5 text-amber-600" />
              <span className="text-2xl font-bold">
                {stats.minCalloutFee ? `${stats.minCalloutFee}` : 'Varies'}
              </span>
            </div>
            <div className="text-sm text-gray-500">From</div>
          </div>

          {/* Average Rating */}
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="flex items-center justify-center gap-2 text-gray-700 mb-1">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-2xl font-bold">
                {stats.avgRating || 'New'}
              </span>
            </div>
            <div className="text-sm text-gray-500">Avg Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}
