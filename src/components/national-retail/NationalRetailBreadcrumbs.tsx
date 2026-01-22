import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import type { ApplianceCategoryData } from '@/lib/data/getNationalRetailCategoryData'

interface Props {
  category: ApplianceCategoryData
}

/**
 * Breadcrumbs for National Retail Category Page (Spec 17)
 */
export default function NationalRetailBreadcrumbs({ category }: Props) {
  const categoryName = category.name_plural || category.name

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex items-center gap-1 flex-wrap">
        {/* Home */}
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-500 hover:text-[#e85d4c] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>

        <li>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </li>

        {/* Current Category */}
        <li>
          <span className="text-gray-900 font-medium">{categoryName}</span>
        </li>
      </ol>
    </nav>
  )
}
