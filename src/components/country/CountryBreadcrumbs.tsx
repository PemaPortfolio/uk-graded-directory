import Link from 'next/link'
import { Home, ChevronRight, ArrowLeft } from 'lucide-react'

interface Props {
  country: {
    name: string
    slug: string
  }
}

/**
 * Country Page Breadcrumbs (Spec 13)
 *
 * Desktop: Home > England
 * Mobile: < Home (back link)
 */
export default function CountryBreadcrumbs({ country }: Props) {
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
        <li className="text-gray-700 font-medium">{country.name}</li>
      </ol>

      {/* Mobile Back Link */}
      <Link
        href="/"
        className="md:hidden flex items-center gap-1 text-[#e85d4c] text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Home</span>
      </Link>
    </nav>
  )
}
