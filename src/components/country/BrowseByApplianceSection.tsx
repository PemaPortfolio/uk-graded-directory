import Link from 'next/link'
import { Plus } from 'lucide-react'

interface Category {
  id: string
  name: string
  name_plural: string
  slug: string
  icon: string | null
}

interface Props {
  countryName: string
  categories: Category[]
}

// Default icons for categories without custom icons
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
 * Browse by Appliance Section (Spec 13)
 *
 * Shows category grid with icons linking to national category pages.
 */
export default function BrowseByApplianceSection({
  countryName,
  categories,
}: Props) {
  if (categories.length === 0) return null

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Browse by Appliance in {countryName}
          </h2>
          <Link
            href="/appliances/"
            className="text-sm text-[#e85d4c] font-medium hover:underline hidden md:block"
          >
            View all categories →
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}/`}
              className="group flex flex-col items-center p-3 md:p-4 bg-slate-50 rounded-lg hover:bg-slate-100 hover:shadow-sm transition-all text-center"
            >
              <span className="text-2xl md:text-3xl mb-2">
                {category.icon || DEFAULT_ICONS[category.slug] || '📦'}
              </span>
              <span className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-[#e85d4c] line-clamp-2">
                {category.name.split(' ')[0]}
              </span>
            </Link>
          ))}

          {/* View All Card */}
          <Link
            href="/appliances/"
            className="group flex flex-col items-center justify-center p-3 md:p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all text-center"
          >
            <Plus className="w-6 h-6 md:w-8 md:h-8 mb-2 text-gray-500 group-hover:text-[#e85d4c]" />
            <span className="text-xs md:text-sm font-medium text-gray-600 group-hover:text-[#e85d4c]">
              View All
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
