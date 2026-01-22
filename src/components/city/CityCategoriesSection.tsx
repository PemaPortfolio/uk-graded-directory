import Link from 'next/link'

interface Category {
  id: string
  name: string
  name_plural: string
  slug: string
  icon: string | null
}

interface Props {
  cityName: string
  countrySlug: string
  citySlug: string
  categories: Category[]
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
 * Categories Section (Spec 07 - Section 7)
 *
 * Shows popular appliance categories with links to category pages.
 */
export default function CityCategoriesSection({
  cityName,
  countrySlug,
  citySlug,
  categories,
}: Props) {
  if (categories.length === 0) return null

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          Popular Categories in {cityName}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${countrySlug}/${citySlug}/${category.slug}/`}
              className="group flex flex-col items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 hover:shadow-sm transition-all text-center"
            >
              <span className="text-3xl md:text-4xl mb-2">
                {category.icon || DEFAULT_ICONS[category.slug] || '📦'}
              </span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#e85d4c]">
                {category.name_plural || category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
