import Link from 'next/link'
import { MapPin, Wrench, CheckCircle } from 'lucide-react'
import type { Brand, CityWithCounts } from '@/lib/data/getBrandPageData'

interface BrandRepairSectionProps {
  brand: Brand
  cities: CityWithCounts[]
}

/**
 * Repair Section for Individual Brand Page
 * Shows cities with authorized repair engineers for this brand
 * Only shown if brand has_authorised_network = true
 */
export function BrandRepairSection({ brand, cities }: BrandRepairSectionProps) {
  // Filter cities with providers
  const citiesWithProviders = cities.filter((c) => c.provider_count > 0)

  if (citiesWithProviders.length === 0) return null

  return (
    <section className="py-12 lg:py-16 bg-gray-50 dark:bg-[#1a1616]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#181111] dark:text-[#f5f0f0] mb-4 flex items-center gap-2">
          <span>🔧</span> {brand.name} Authorized Repair Engineers
        </h2>

        {/* Authorized badge */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-8 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
          <div>
            <div className="font-medium text-green-800 dark:text-green-300">
              Manufacturer-Authorized Service
            </div>
            <div className="text-sm text-green-700 dark:text-green-400">
              All listed engineers are trained and certified by {brand.name}
            </div>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Find {brand.name}-authorized repair engineers in your city:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {citiesWithProviders.slice(0, 8).map((city) => (
            <Link
              key={city.id}
              href={`/${city.country_slug}/${city.slug}/${brand.slug}-repair/`}
              className="group bg-white dark:bg-[#0f0d0d] rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-[#252020] border border-gray-100 dark:border-gray-800 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-[#e85d4c]" />
                <span className="font-semibold text-[#181111] dark:text-[#f5f0f0] group-hover:text-[#e85d4c] transition-colors">
                  {city.name}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 ml-6">
                <Wrench className="w-3.5 h-3.5" />
                <span>
                  {city.provider_count} engineer{city.provider_count !== 1 ? 's' : ''}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
