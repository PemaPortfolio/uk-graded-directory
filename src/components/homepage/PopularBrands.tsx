import Link from 'next/link'

interface Brand {
  name: string
  slug: string
  tier: 'premium' | 'mid_range'
}

interface PopularBrandsProps {
  brands?: Brand[]
}

/**
 * Popular Brands Section (Spec 12 - Section 9)
 *
 * Showcases well-known brands in two tiers:
 * - Premium: Bosch, Samsung, LG, Siemens, Miele
 * - Mid-Range: Hotpoint, Beko, Indesit, Whirlpool, AEG
 */
export default function PopularBrands({ brands }: PopularBrandsProps) {
  // Default brands if none provided
  const defaultBrands: Brand[] = [
    { name: 'Bosch', slug: 'bosch', tier: 'premium' },
    { name: 'Samsung', slug: 'samsung', tier: 'premium' },
    { name: 'LG', slug: 'lg', tier: 'premium' },
    { name: 'Siemens', slug: 'siemens', tier: 'premium' },
    { name: 'Miele', slug: 'miele', tier: 'premium' },
    { name: 'Hotpoint', slug: 'hotpoint', tier: 'mid_range' },
    { name: 'Beko', slug: 'beko', tier: 'mid_range' },
    { name: 'Indesit', slug: 'indesit', tier: 'mid_range' },
    { name: 'Whirlpool', slug: 'whirlpool', tier: 'mid_range' },
    { name: 'AEG', slug: 'aeg', tier: 'mid_range' },
  ]

  const displayBrands = brands && brands.length > 0 ? brands : defaultBrands
  const premiumBrands = displayBrands.filter((b) => b.tier === 'premium')
  const midRangeBrands = displayBrands.filter((b) => b.tier === 'mid_range')

  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Question-based H2 for AEO */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#181111] mb-8">
          Which Brands Sell Graded Appliances?
        </h2>

        {/* Premium Brands */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Premium Brands
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {premiumBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="flex items-center justify-center h-20 bg-white rounded-lg border border-gray-200 hover:border-[#e85d4c] transition-colors"
              >
                <span className="font-semibold text-gray-700">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mid-Range Brands */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Mid-Range Brands
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {midRangeBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="flex items-center justify-center h-20 bg-white rounded-lg border border-gray-200 hover:border-[#e85d4c] transition-colors"
              >
                <span className="font-semibold text-gray-700">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            href="/brands"
            className="text-[#e85d4c] hover:text-[#d94f3f] font-medium transition-colors"
          >
            View all 27+ brands →
          </Link>
        </div>
      </div>
    </section>
  )
}
