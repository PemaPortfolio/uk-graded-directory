import Link from 'next/link'
import { Store, ChevronRight } from 'lucide-react'
import type { Brand } from '@/lib/data/getBrandPageData'

interface OtherBrandsSectionProps {
  currentBrand: Brand
  otherBrands: Brand[]
}

/**
 * Other Brands Section for Individual Brand Page
 * Shows other brands in the same tier
 */
export function OtherBrandsSection({ currentBrand, otherBrands }: OtherBrandsSectionProps) {
  if (otherBrands.length === 0) return null

  const tierLabel = {
    premium: 'premium',
    mid_range: 'mid-range',
    value: 'value',
  }

  return (
    <section className="py-12 lg:py-16 bg-gray-50 dark:bg-[#1a1616]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#181111] dark:text-[#f5f0f0] mb-4 flex items-center gap-2">
          <span>🏷️</span> Also Consider
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Other {tierLabel[currentBrand.tier]} brands with graded appliances:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {otherBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}/`}
              className="group bg-white dark:bg-[#0f0d0d] rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all duration-200 flex flex-col items-center text-center"
            >
              {/* Logo or Name */}
              {brand.logo_url ? (
                <div className="h-10 w-full flex items-center justify-center mb-3">
                  <img
                    src={brand.logo_url}
                    alt={brand.name}
                    className="max-h-10 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
              ) : (
                <div className="h-10 flex items-center justify-center mb-3">
                  <span className="font-bold text-lg text-[#181111] dark:text-[#f5f0f0] group-hover:text-[#e85d4c] transition-colors">
                    {brand.name}
                  </span>
                </div>
              )}

              {/* Brand name (if logo shown) */}
              {brand.logo_url && (
                <span className="font-semibold text-[#181111] dark:text-[#f5f0f0] group-hover:text-[#e85d4c] transition-colors mb-2">
                  {brand.name}
                </span>
              )}

              {/* Store count */}
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Store className="w-4 h-4" />
                <span>{brand.store_count} stores</span>
              </div>

              {/* View link */}
              <div className="mt-2 flex items-center text-[#e85d4c] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
