import Link from 'next/link'
import { Wrench } from 'lucide-react'
import type { BrandData, PlaceData, CountryData, ApplianceCategoryWithCount } from '@/lib/data/getBrandRepairData'

interface Props {
  brand: BrandData
  place: PlaceData
  country: CountryData
  categories: ApplianceCategoryWithCount[]
}

/**
 * Appliance Categories Section for Brand Repair Page (Spec 15)
 */
export default function BrandApplianceCategoriesSection({
  brand,
  place,
  country,
  categories,
}: Props) {
  if (categories.length === 0) return null

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Wrench className="w-6 h-6 text-[#e85d4c]" />
          <h2 className="text-2xl font-bold text-gray-900">
            {brand.name} Appliances We Repair in {place.name}
          </h2>
        </div>

        <p className="text-gray-600 mb-8">
          Our authorized engineers can repair the full range of {brand.name} appliances:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const categorySlug = (category.name_singular || category.name)
              .toLowerCase()
              .replace(/\s+/g, '-')

            return (
              <Link
                key={category.id}
                href={`/${country.slug}/${place.slug}/${categorySlug}-repair/`}
                className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-5 text-center transition-colors"
              >
                <div className="text-3xl mb-3" aria-hidden="true">
                  {category.icon || '\u{1F527}'}
                </div>
                <div className="font-semibold text-gray-900 group-hover:text-[#e85d4c] transition-colors mb-1">
                  {category.name}
                </div>
                <div className="text-sm text-gray-500">
                  {category.provider_count} engineer{category.provider_count !== 1 ? 's' : ''}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
