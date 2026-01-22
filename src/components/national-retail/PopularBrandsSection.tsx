import Link from 'next/link'
import Image from 'next/image'
import type { BrandData, ApplianceCategoryData } from '@/lib/data/getNationalRetailCategoryData'

interface Props {
  brands: BrandData[]
  category: ApplianceCategoryData
}

/**
 * Popular Brands Section for National Retail Category Page (Spec 17)
 */
export default function PopularBrandsSection({ brands, category }: Props) {
  if (brands.length === 0) return null

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Popular {category.name} Brands
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {brands.slice(0, 8).map((brand) => (
            <Link
              key={brand.id}
              href={`/${brand.slug}/`}
              className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-6 text-center transition-colors"
            >
              {brand.logo_url ? (
                <div className="h-10 flex items-center justify-center mb-3">
                  <Image
                    src={brand.logo_url}
                    alt={brand.name}
                    width={100}
                    height={40}
                    className="max-h-10 w-auto object-contain grayscale group-hover:grayscale-0 transition-all"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="h-10 flex items-center justify-center mb-3">
                  <span className="font-bold text-xl text-gray-900">{brand.name}</span>
                </div>
              )}
              <div className="text-sm text-gray-500">
                {brand.store_count} store{brand.store_count !== 1 ? 's' : ''}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
