import Link from 'next/link'
import Image from 'next/image'
import { Tag } from 'lucide-react'
import type { BrandWithCount, PlaceData, CountryData } from '@/lib/data/getBrandRepairData'

interface Props {
  brands: BrandWithCount[]
  place: PlaceData
  country: CountryData
}

/**
 * Other Brands Section for Brand Repair Page (Spec 15)
 */
export default function OtherBrandsSection({ brands, place, country }: Props) {
  if (brands.length === 0) return null

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Tag className="w-6 h-6 text-[#e85d4c]" />
          <h2 className="text-2xl font-bold text-gray-900">
            Repair Other Brands in {place.name}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/${country.slug}/${place.slug}/${brand.slug}-repair/`}
              className="group bg-white hover:bg-gray-50 rounded-xl p-4 text-center shadow-sm hover:shadow transition-all"
            >
              {brand.logo_url ? (
                <div className="h-12 flex items-center justify-center mb-3">
                  <Image
                    src={brand.logo_url}
                    alt={`${brand.name} logo`}
                    width={80}
                    height={40}
                    className="object-contain max-h-full"
                  />
                </div>
              ) : (
                <div className="h-12 flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-gray-400">
                    {brand.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="font-semibold text-gray-900 group-hover:text-[#e85d4c] transition-colors mb-1">
                {brand.name}
              </div>
              <div className="text-sm text-gray-500">
                {brand.provider_count} engineer{brand.provider_count !== 1 ? 's' : ''}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
