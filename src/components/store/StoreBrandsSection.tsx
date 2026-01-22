import Link from 'next/link'
import Image from 'next/image'

interface Brand {
  id: string
  name: string
  slug: string
  logo_url: string | null
  tier: string
}

interface Props {
  brands: Brand[]
}

/**
 * Brands In Stock Section (Spec 06 - Section 7)
 */
export default function StoreBrandsSection({ brands }: Props) {
  if (brands.length === 0) return null

  // Sort by tier (premium first)
  const sortedBrands = [...brands].sort((a, b) => {
    const tierOrder = { premium: 0, mid_range: 1, value: 2 }
    return (
      (tierOrder[a.tier as keyof typeof tierOrder] || 3) -
      (tierOrder[b.tier as keyof typeof tierOrder] || 3)
    )
  })

  return (
    <section className="py-8 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Brands In Stock</h2>

      <div className="flex flex-wrap gap-3">
        {sortedBrands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.slug}/`}
            className="group"
          >
            {brand.logo_url ? (
              <div className="h-12 px-4 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-[#e85d4c] transition-colors">
                <Image
                  src={brand.logo_url}
                  alt={brand.name}
                  width={80}
                  height={32}
                  className="h-8 w-auto object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <span className="inline-flex items-center h-10 px-4 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                {brand.name}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
