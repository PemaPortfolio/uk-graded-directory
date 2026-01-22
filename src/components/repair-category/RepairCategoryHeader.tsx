import { Wrench, Users, PoundSterling, Zap, Star } from 'lucide-react'
import type { RepairCategoryData, RepairPlaceData, RepairPageStats } from '@/lib/data/getRepairCategoryData'

interface Props {
  category: RepairCategoryData
  place: RepairPlaceData
  stats: RepairPageStats
}

/**
 * Page Header for Repair Category Page (Spec 10)
 *
 * H1 headline, intro text, and quick stats.
 */
export default function RepairCategoryHeader({ category, place, stats }: Props) {
  const categoryName = category.name_singular || category.name

  // Generate H1 from template or default
  const h1 =
    category.repair_h1_template?.replace('{location}', place.name) ||
    `${categoryName} Repair in ${place.name}`

  // Generate intro text
  const introText = generateIntroText(category, place, stats)

  return (
    <header className="mb-8 pb-6 border-b border-gray-200">
      {/* H1 with icon */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-blue-100 rounded-xl">
          <Wrench className="w-6 h-6 text-blue-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{h1}</h1>
      </div>

      {/* Intro paragraph */}
      <p className="text-gray-600 text-lg mb-6 max-w-3xl leading-relaxed">{introText}</p>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          icon={<Users className="w-5 h-5" />}
          value={stats.providerCount.toString()}
          label="Engineers"
          color="blue"
        />

        {stats.minCalloutFee && (
          <StatCard
            icon={<PoundSterling className="w-5 h-5" />}
            value={`From £${stats.minCalloutFee}`}
            label="Callout"
            color="green"
          />
        )}

        {stats.providersWithSameDay > 0 && (
          <StatCard
            icon={<Zap className="w-5 h-5" />}
            value={stats.providersWithSameDay.toString()}
            label="Same-day"
            color="amber"
          />
        )}

        {stats.avgRating && (
          <StatCard
            icon={<Star className="w-5 h-5" />}
            value={stats.avgRating.toFixed(1)}
            label="Avg Rating"
            color="purple"
          />
        )}
      </div>
    </header>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  value: string
  label: string
  color: 'blue' | 'green' | 'amber' | 'purple'
}

function StatCard({ icon, value, label, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    amber: 'bg-amber-50 text-amber-700',
    purple: 'bg-purple-50 text-purple-700',
  }

  return (
    <div className={`rounded-xl p-4 ${colorClasses[color]}`}>
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xl font-bold">{value}</span>
      </div>
      <span className="text-sm opacity-80">{label}</span>
    </div>
  )
}

function generateIntroText(
  category: RepairCategoryData,
  place: RepairPlaceData,
  stats: RepairPageStats
): string {
  const categoryName = (category.name_singular || category.name).toLowerCase()

  // Use template if available
  if (category.repair_intro_template) {
    return category.repair_intro_template.replace('{location}', place.name)
  }

  // Generate dynamic intro
  let intro = `Compare ${stats.providerCount} ${categoryName} repair engineer${stats.providerCount !== 1 ? 's' : ''} in ${place.name}.`

  intro += ` Our directory features verified local engineers offering`

  const features: string[] = []
  if (stats.providersWithSameDay > 0) features.push('same-day callouts')
  if (stats.providersWithNoFixNoFee > 0) features.push('no fix no fee policies')
  if (stats.providersWithWarranty > 0) features.push('warranties on all repairs')

  if (features.length > 0) {
    intro += ` ${features.join(', ')}.`
  } else {
    intro += ` fast, reliable repairs.`
  }

  if (stats.minCalloutFee) {
    intro += ` Average callout fee from £${stats.minCalloutFee}.`
  }

  if (stats.topBrands.length > 0) {
    intro += ` Find ${stats.topBrands.slice(0, 3).join(', ')} and all-brand specialists.`
  }

  return intro
}
