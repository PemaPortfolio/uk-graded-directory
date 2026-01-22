import Link from 'next/link'
import type { RelatedRepairCategoryData, RepairCategoryData } from '@/lib/data/getNationalRepairPageData'
import { getRepairSlug } from '@/lib/utils/repairSlugUtils'

interface Props {
  categories: RelatedRepairCategoryData[]
  currentCategory: RepairCategoryData
}

/**
 * Related Repair Services Section for National Repair Page (Spec 16)
 */
export default function RelatedRepairServicesSection({ categories, currentCategory }: Props) {
  // Filter out the current category
  const filteredCategories = categories.filter((cat) => cat.id !== currentCategory.id)

  if (filteredCategories.length === 0) return null

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Other Appliance Repair Services
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredCategories.slice(0, 6).map((category) => {
            const catName = category.name_singular || category.name
            const repairSlug = getRepairSlug(catName)

            return (
              <Link
                key={category.id}
                href={`/${repairSlug}/`}
                className="group bg-white hover:bg-gray-50 rounded-xl p-6 text-center shadow-sm hover:shadow transition-all"
              >
                <div className="text-4xl mb-3" aria-hidden="true">
                  {category.icon || '🔧'}
                </div>
                <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {catName} Repair
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
