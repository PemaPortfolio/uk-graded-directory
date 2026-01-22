import { TrendingUp } from 'lucide-react'

interface MarketPulseProps {
  newStoresThisWeek: number
  trendingCity?: string
  trendingGrowth?: number
}

/**
 * Live Market Pulse Section (Spec 12 - Section 3)
 *
 * Displays freshness signals from database:
 * - New stores listed this week
 * - Trending city with growth percentage
 */
export default function MarketPulse({
  newStoresThisWeek,
  trendingCity,
  trendingGrowth,
}: MarketPulseProps) {
  return (
    <section className="bg-[#f8f6f6] border-y border-[#ebe5e5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-center gap-2 text-sm text-[#6b7280]">
          <TrendingUp className="w-4 h-4 text-[#e85d4c]" />
          <span>
            <strong className="text-[#181111]">This Week:</strong>{' '}
            {newStoresThisWeek} new stores listed
            {trendingCity && (
              <>
                {' • '}
                <span className="text-[#181111]">{trendingCity}</span>
                {' trending'}
                {trendingGrowth && (
                  <span className="text-green-600"> (+{trendingGrowth}%)</span>
                )}
              </>
            )}
          </span>
        </div>
      </div>
    </section>
  )
}
