import Link from 'next/link'
import { Grid } from 'lucide-react'
import type { RelatedRepairCategoryData, RepairPlaceData } from '@/lib/data/getRepairCategoryData'

interface Props {
  place: RepairPlaceData
  countrySlug: string
  relatedCategories: RelatedRepairCategoryData[]
}

/**
 * Other Repair Categories Section for Repair Category Page (Spec 10)
 *
 * Links to other repair category pages in the same city.
 */
export default function OtherRepairCategoriesSection({
  place,
  countrySlug,
  relatedCategories,
}: Props) {
  if (relatedCategories.length === 0) {
    return null
  }

  return (
    <section className="py-8 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Grid className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Also Need Repair in {place.name}?</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {relatedCategories.map((category) => {
          // Build repair URL from category slug
          const repairSlug = buildRepairSlug(category.slug, category.name_singular)

          return (
            <Link
              key={category.id}
              href={`/${countrySlug}/${place.slug}/${repairSlug}/`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              {category.icon && <span>{category.icon}</span>}
              <span>{category.name_singular || category.name} Repair</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

/**
 * Build repair slug from category slug
 */
function buildRepairSlug(categorySlug: string, nameSingular: string | null): string {
  // Try to singularize and add -repair
  if (nameSingular) {
    const singularSlug = nameSingular.toLowerCase().replace(/\s+/g, '-')
    return `${singularSlug}-repair`
  }

  // Remove 's' from end if plural and add -repair
  const singular = categorySlug.replace(/s$/, '')
  return `${singular}-repair`
}
