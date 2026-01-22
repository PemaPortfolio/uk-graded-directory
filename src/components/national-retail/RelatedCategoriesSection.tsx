import Link from 'next/link'
import type { RelatedCategoryData, ApplianceCategoryData } from '@/lib/data/getNationalRetailCategoryData'

interface Props {
  categories: RelatedCategoryData[]
  currentCategory: ApplianceCategoryData
}

/**
 * Related Categories Section for National Retail Category Page (Spec 17)
 */
export default function RelatedCategoriesSection({ categories, currentCategory }: Props) {
  // Filter out the current category
  const filteredCategories = categories.filter((cat) => cat.id !== currentCategory.id)

  if (filteredCategories.length === 0) return null

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Other Graded Appliances
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredCategories.slice(0, 6).map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}/`}
              className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-6 text-center transition-colors"
            >
              <div className="text-4xl mb-3" aria-hidden="true">
                {category.icon || '📦'}
              </div>
              <div className="font-semibold text-gray-900 group-hover:text-[#e85d4c] transition-colors">
                {category.name_plural || category.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
