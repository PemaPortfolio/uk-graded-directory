import { Package, Truck, CreditCard, Shield, Percent } from 'lucide-react'
import type { CategoryData, PlaceData, PageStats } from '@/lib/data/getRetailCategoryData'

interface Props {
  category: CategoryData
  place: PlaceData
  stats: PageStats
}

/**
 * Page Header for Retail Category Page (Spec 14)
 *
 * H1 headline, intro text, and quick stats.
 */
export default function RetailCategoryHeader({ category, place, stats }: Props) {
  const categoryName = category.name_plural || category.name

  // Generate H1 from template or default
  const h1 =
    category.h1_template?.replace('{location}', place.name) ||
    `Graded ${categoryName} in ${place.name}`

  // Generate intro text
  const introText = generateIntroText(category, place, stats)

  return (
    <header className="mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{h1}</h1>

      <p className="text-gray-600 text-lg mb-6 max-w-3xl">{introText}</p>

      {/* Quick Stats */}
      <div className="flex flex-wrap gap-3">
        <StatBadge
          icon={<Package className="w-4 h-4" />}
          text={`${stats.storeCount} Store${stats.storeCount !== 1 ? 's' : ''}`}
        />

        <StatBadge
          icon={<Percent className="w-4 h-4" />}
          text="Save 30-70%"
          variant="success"
        />

        {stats.storesWithFreeDelivery > 0 && (
          <StatBadge
            icon={<Truck className="w-4 h-4" />}
            text={`${stats.storesWithFreeDelivery} with Free Delivery`}
          />
        )}

        {stats.storesWithFinance > 0 && (
          <StatBadge
            icon={<CreditCard className="w-4 h-4" />}
            text={`${stats.storesWithFinance} with Finance`}
          />
        )}

        {stats.priceMin && stats.priceMax && (
          <StatBadge
            icon={<Shield className="w-4 h-4" />}
            text={`From £${stats.priceMin}`}
          />
        )}
      </div>
    </header>
  )
}

function StatBadge({
  icon,
  text,
  variant = 'default',
}: {
  icon: React.ReactNode
  text: string
  variant?: 'default' | 'success'
}) {
  const bgColor = variant === 'success' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${bgColor}`}
    >
      {icon}
      {text}
    </span>
  )
}

function generateIntroText(category: CategoryData, place: PlaceData, stats: PageStats): string {
  const categoryName = category.name_plural || category.name
  const categoryNameLower = categoryName.toLowerCase()

  // Use template if available
  if (category.intro_template) {
    return category.intro_template.replace('{location}', place.name)
  }

  // Generate dynamic intro
  let intro = `Looking for graded ${categoryNameLower} in ${place.name}?`

  if (stats.storeCount > 0) {
    intro += ` We list ${stats.storeCount} trusted store${stats.storeCount !== 1 ? 's' : ''} selling ex-display, factory seconds and B-grade ${categoryNameLower}.`
  } else {
    intro += ` Browse our directory for deals on ex-display, factory seconds and B-grade ${categoryNameLower}.`
  }

  if (stats.storesWithFreeDelivery > 0) {
    intro += ` ${stats.storesWithFreeDelivery} store${stats.storesWithFreeDelivery !== 1 ? 's' : ''} offer free delivery.`
  }

  if (stats.storesWithFinance > 0) {
    intro += ` Finance options including 0% interest available.`
  }

  intro += ` Save 30-70% on RRP with full warranties.`

  return intro
}
