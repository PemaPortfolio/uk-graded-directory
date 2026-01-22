import Link from 'next/link'
import { Check } from 'lucide-react'

interface Category {
  id: string
  name: string
  name_plural: string
  slug: string
  icon: string | null
  tier: string
}

interface Props {
  categories: Category[]
  countrySlug: string
  citySlug: string
}

// Default icons for categories
const DEFAULT_ICONS: Record<string, string> = {
  'washing-machines': '🧺',
  'fridge-freezers': '🧊',
  'american-fridge-freezers': '🇺🇸',
  dishwashers: '🍽️',
  'tumble-dryers': '🌀',
  tvs: '📺',
  ovens: '🔥',
  'range-cookers': '🍳',
  cookers: '🍳',
  hobs: '🔥',
  microwaves: '📻',
  'washer-dryers': '🧺',
}

/**
 * What They Sell Section (Spec 06 - Section 5)
 */
export default function StoreCategoriesSection({
  categories,
  countrySlug,
  citySlug,
}: Props) {
  if (categories.length === 0) return null

  return (
    <section className="py-8 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">What They Sell</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${countrySlug}/${citySlug}/${category.slug}/`}
            className="group flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl hover:border-[#e85d4c] hover:shadow-sm transition-all text-center"
          >
            <span className="text-2xl mb-2">
              {category.icon || DEFAULT_ICONS[category.slug] || '📦'}
            </span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-[#e85d4c]">
              {category.name}
            </span>
            <span className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <Check className="w-3 h-3" /> In Stock
            </span>
          </Link>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Looking for a specific appliance? Call to check stock.
      </p>
    </section>
  )
}
