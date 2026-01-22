import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Tag, Layers } from 'lucide-react'
import type {
  SearchResultCategory,
  SearchResultBrand,
  SearchResultPlace,
} from '@/lib/data/getSearchResults'

interface Props {
  categories: SearchResultCategory[]
  brands: SearchResultBrand[]
  suggestedPlaces: SearchResultPlace[]
  query: string
  location: SearchResultPlace | null
}

/**
 * Search Suggestions Section
 */
export default function SearchSuggestions({
  categories,
  brands,
  suggestedPlaces,
  query,
  location,
}: Props) {
  if (categories.length === 0 && brands.length === 0 && suggestedPlaces.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Matched categories */}
      {categories.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-[#e85d4c]" />
            <h2 className="font-bold text-gray-900">
              Related Categories
              {query && <span className="font-normal text-gray-600"> for &quot;{query}&quot;</span>}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories.map((category) => {
              const baseUrl = location
                ? `/${location.country_slug}/${location.slug}/${category.slug}/`
                : `/${category.slug}/`

              return (
                <Link
                  key={category.id}
                  href={baseUrl}
                  className="group flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {category.icon || '\u{1F50D}'}
                  </span>
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-[#e85d4c] transition-colors">
                      {category.name_plural || category.name}
                    </div>
                    {category.supports_repair && (
                      <div className="text-xs text-gray-500">Buy & Repair</div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Matched brands */}
      {brands.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-[#e85d4c]" />
            <h2 className="font-bold text-gray-900">
              Related Brands
              {query && <span className="font-normal text-gray-600"> for &quot;{query}&quot;</span>}
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {brands.map((brand) => {
              const baseUrl = location
                ? `/${location.country_slug}/${location.slug}/${brand.slug}/`
                : `/${brand.slug}/`

              return (
                <Link
                  key={brand.id}
                  href={baseUrl}
                  className="group flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {brand.logo_url ? (
                    <Image
                      src={brand.logo_url}
                      alt={brand.name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  ) : (
                    <span className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-500">
                      {brand.name.charAt(0)}
                    </span>
                  )}
                  <span className="font-medium text-gray-900 group-hover:text-[#e85d4c] transition-colors">
                    {brand.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Suggested places */}
      {suggestedPlaces.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-[#e85d4c]" />
            <h2 className="font-bold text-gray-900">Popular Cities</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {suggestedPlaces.map((place) => (
              <Link
                key={place.id}
                href={`/${place.country_slug}/${place.slug}/`}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-[#e85d4c] font-medium transition-colors"
              >
                {place.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
