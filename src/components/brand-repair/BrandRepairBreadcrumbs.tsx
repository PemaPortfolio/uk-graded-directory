import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import type { BrandData, PlaceData, CountryData } from '@/lib/data/getBrandRepairData'

interface Props {
  brand: BrandData
  place: PlaceData
  country: CountryData
}

/**
 * Breadcrumbs for Brand Repair Page (Spec 15)
 * Home > Country > City > Brand Repair
 */
export default function BrandRepairBreadcrumbs({ brand, place, country }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-white border-b border-gray-100 py-3 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Desktop breadcrumbs */}
        <ol className="hidden md:flex items-center gap-2 text-sm">
          <li>
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </li>
          <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
          <li>
            <Link
              href={`/${country.slug}/`}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {country.name}
            </Link>
          </li>
          <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
          <li>
            <Link
              href={`/${country.slug}/${place.slug}/`}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {place.name}
            </Link>
          </li>
          <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
          <li aria-current="page">
            <span className="text-gray-900 font-medium">{brand.name} Repair</span>
          </li>
        </ol>

        {/* Mobile back link */}
        <div className="md:hidden">
          <Link
            href={`/${country.slug}/${place.slug}/`}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span>{place.name}</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
