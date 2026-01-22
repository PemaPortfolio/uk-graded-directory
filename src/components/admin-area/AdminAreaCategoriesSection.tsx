import Link from 'next/link'
import {
  WashingMachine,
  Refrigerator,
  CookingPot,
  Wind,
  Microwave,
  Sparkles,
} from 'lucide-react'

interface Category {
  id: string
  name: string
  name_plural: string
  slug: string
  icon: string | null
}

interface AdminAreaCategoriesSectionProps {
  categories: Category[]
  adminAreaName: string
  className?: string
}

// Map category slugs to icons
const categoryIcons: Record<string, React.ReactNode> = {
  'washing-machines': <WashingMachine className="w-6 h-6" />,
  'fridge-freezers': <Refrigerator className="w-6 h-6" />,
  ovens: <CookingPot className="w-6 h-6" />,
  dishwashers: <Sparkles className="w-6 h-6" />,
  'tumble-dryers': <Wind className="w-6 h-6" />,
  microwaves: <Microwave className="w-6 h-6" />,
}

/**
 * Browse by appliance category section
 */
export function AdminAreaCategoriesSection({
  categories,
  adminAreaName,
  className = '',
}: AdminAreaCategoriesSectionProps) {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <section className={className}>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Browse by Appliance in {adminAreaName}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.slug}`}
            className="group flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#e85d4c] hover:shadow-md transition-all text-center"
          >
            <div className="w-12 h-12 rounded-lg bg-[#e85d4c]/10 flex items-center justify-center mb-3 group-hover:bg-[#e85d4c]/20 transition-colors">
              <span className="text-[#e85d4c]">
                {categoryIcons[category.slug] || <Sparkles className="w-6 h-6" />}
              </span>
            </div>
            <div className="font-medium text-sm text-gray-900 dark:text-gray-100 group-hover:text-[#e85d4c] transition-colors">
              {category.name_plural || category.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default AdminAreaCategoriesSection
