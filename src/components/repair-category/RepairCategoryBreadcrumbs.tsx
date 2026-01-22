import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface Props {
  country: {
    name: string
    slug: string
  }
  city: {
    name: string
    slug: string
  }
  categoryName: string
}

/**
 * Breadcrumbs for Repair Category Page (Spec 10)
 *
 * Home > Country > City > {Category} Repair
 */
export default function RepairCategoryBreadcrumbs({ country, city, categoryName }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        <li>
          <Link
            href="/"
            className="text-gray-500 hover:text-[#e85d4c] transition-colors flex items-center gap-1"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only md:not-sr-only">Home</span>
          </Link>
        </li>

        <li className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link
            href={`/${country.slug}/`}
            className="text-gray-500 hover:text-[#e85d4c] transition-colors"
          >
            {country.name}
          </Link>
        </li>

        <li className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link
            href={`/${country.slug}/${city.slug}/`}
            className="text-gray-500 hover:text-[#e85d4c] transition-colors"
          >
            {city.name}
          </Link>
        </li>

        <li className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">{categoryName} Repair</span>
        </li>
      </ol>
    </nav>
  )
}
