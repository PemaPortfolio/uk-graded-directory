import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import type { Guide } from '@/lib/data/getGuidesIndexData'

interface GuidesBreadcrumbsProps {
  guide?: Guide
  categoryName?: string
}

/**
 * Guides Breadcrumbs Component
 *
 * Breadcrumb navigation for guides pages.
 * Shows: Home > Guides > [Category] > [Guide Title]
 */
export default function GuidesBreadcrumbs({ guide, categoryName }: GuidesBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center flex-wrap gap-1 text-sm text-gray-500 dark:text-gray-400"
    >
      {/* Home */}
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-[#e85d4c] transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>

      <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />

      {/* Guides */}
      {guide ? (
        <Link
          href="/guides/"
          className="hover:text-[#e85d4c] transition-colors"
        >
          Guides
        </Link>
      ) : (
        <span className="text-gray-900 dark:text-gray-100 font-medium">
          Guides
        </span>
      )}

      {/* Category (if filtering by category on index) */}
      {categoryName && !guide && (
        <>
          <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {categoryName}
          </span>
        </>
      )}

      {/* Guide Category */}
      {guide?.category && (
        <>
          <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
          <Link
            href={`/guides/?category=${guide.category.slug}`}
            className="hover:text-[#e85d4c] transition-colors"
          >
            {guide.category.name}
          </Link>
        </>
      )}

      {/* Guide Title */}
      {guide && (
        <>
          <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
          <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[200px] sm:max-w-none">
            {guide.title}
          </span>
        </>
      )}
    </nav>
  )
}
