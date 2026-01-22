import Link from 'next/link'
import { Home, ChevronRight, ArrowLeft } from 'lucide-react'

interface Props {
  country: {
    name: string
    slug: string
  }
  city: {
    name: string
    slug: string
  }
  storeName: string
}

/**
 * Store Profile Breadcrumbs (Spec 06)
 *
 * Desktop: Home > England > Manchester > Store Name
 * Mobile: < Manchester (back link)
 */
export default function StoreBreadcrumbs({ country, city, storeName }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      {/* Desktop Breadcrumbs */}
      <ol className="hidden md:flex items-center gap-2 text-sm text-gray-500">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-[#e85d4c] hover:underline"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </li>
        <li className="text-gray-400">
          <ChevronRight className="w-4 h-4" />
        </li>
        <li>
          <Link
            href={`/${country.slug}/`}
            className="text-[#e85d4c] hover:underline"
          >
            {country.name}
          </Link>
        </li>
        <li className="text-gray-400">
          <ChevronRight className="w-4 h-4" />
        </li>
        <li>
          <Link
            href={`/${country.slug}/${city.slug}/`}
            className="text-[#e85d4c] hover:underline"
          >
            {city.name}
          </Link>
        </li>
        <li className="text-gray-400">
          <ChevronRight className="w-4 h-4" />
        </li>
        <li className="text-gray-700 font-medium truncate max-w-[200px]">
          {storeName}
        </li>
      </ol>

      {/* Mobile Back Link */}
      <Link
        href={`/${country.slug}/${city.slug}/`}
        className="md:hidden flex items-center gap-1 text-[#e85d4c] text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{city.name}</span>
      </Link>
    </nav>
  )
}
