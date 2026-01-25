import type { BrandWithStats } from '@/lib/data/getBrandsIndexData'
import { BrandCard } from './BrandCard'

interface BrandTierSectionProps {
  title: string
  subtitle?: string
  brands: BrandWithStats[]
  tierIcon: string
  className?: string
}

/**
 * Brand Tier Section Component
 * Displays a grid of brands grouped by tier (Premium, Mid-Range, Value)
 */
export function BrandTierSection({
  title,
  subtitle,
  brands,
  tierIcon,
  className = '',
}: BrandTierSectionProps) {
  if (brands.length === 0) return null

  return (
    <section className={`py-12 lg:py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#181111] dark:text-[#f5f0f0] flex items-center gap-2">
            <span>{tierIcon}</span>
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">{subtitle}</p>
          )}
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  )
}
