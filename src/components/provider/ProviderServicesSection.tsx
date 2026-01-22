import Link from 'next/link'

interface Category {
  id: string
  name: string
  name_plural: string
  slug: string
  icon: string | null
}

interface Props {
  categories: Category[]
  countrySlug: string
  citySlug: string
}

// Default icons for repair categories
const DEFAULT_ICONS: Record<string, string> = {
  'washing-machine-repair': '🧺',
  'fridge-freezer-repair': '🧊',
  'dishwasher-repair': '🍽️',
  'tumble-dryer-repair': '🌀',
  'oven-repair': '🔥',
  'cooker-repair': '🍳',
  'microwave-repair': '📻',
  'washing-machines': '🧺',
  'fridge-freezers': '🧊',
  dishwashers: '🍽️',
  'tumble-dryers': '🌀',
  ovens: '🔥',
  cookers: '🍳',
  microwaves: '📻',
}

/**
 * Appliances We Repair Section (Spec 11 - Section 5)
 */
export default function ProviderServicesSection({
  categories,
  countrySlug,
  citySlug,
}: Props) {
  if (categories.length === 0) return null

  return (
    <section className="py-8 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Appliances We Repair</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {categories.map((category) => {
          // Convert category to repair URL
          const repairSlug = category.slug.includes('-repair')
            ? category.slug
            : `${category.slug}-repair`

          return (
            <Link
              key={category.id}
              href={`/${countrySlug}/${citySlug}/${repairSlug}/`}
              className="group flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl hover:border-[#e85d4c] hover:shadow-sm transition-all text-center"
            >
              <span className="text-2xl mb-2">
                {category.icon || DEFAULT_ICONS[category.slug] || '🔧'}
              </span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#e85d4c]">
                {category.name} Repair
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
