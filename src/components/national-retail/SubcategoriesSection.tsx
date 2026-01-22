import Link from 'next/link'
import type { SubcategoryData, ApplianceCategoryData } from '@/lib/data/getNationalRetailCategoryData'

interface Props {
  subcategories: SubcategoryData[]
  parentCategory: ApplianceCategoryData
}

/**
 * Subcategories Section for National Retail Category Page (Spec 17)
 */
export default function SubcategoriesSection({ subcategories, parentCategory }: Props) {
  if (subcategories.length === 0) return null

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Types of {parentCategory.name}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {subcategories.map((subcat) => (
            <Link
              key={subcat.id}
              href={`/${subcat.slug}/`}
              className="group bg-white hover:bg-gray-50 rounded-xl p-6 text-center shadow-sm hover:shadow transition-all"
            >
              {subcat.icon && (
                <div className="text-3xl mb-2">{subcat.icon}</div>
              )}
              <div className="font-semibold text-gray-900 group-hover:text-[#e85d4c] transition-colors">
                {subcat.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
