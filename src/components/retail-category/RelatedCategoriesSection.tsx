import Link from 'next/link'
import { Grid } from 'lucide-react'
import type { RelatedCategoryData, PlaceData } from '@/lib/data/getRetailCategoryData'

interface Props {
  place: PlaceData
  countrySlug: string
  relatedCategories: RelatedCategoryData[]
}

/**
 * Related Categories Section for Retail Category Page (Spec 14)
 *
 * Links to other appliance categories in the same city.
 */
export default function RelatedCategoriesSection({
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
        <div className="p-2 bg-teal-100 rounded-lg">
          <Grid className="w-5 h-5 text-teal-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Other Appliances in {place.name}</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {relatedCategories.map((category) => (
          <Link
            key={category.id}
            href={`/${countrySlug}/${place.slug}/${category.slug}/`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors"
          >
            {category.icon && <span>{category.icon}</span>}
            <span>{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
