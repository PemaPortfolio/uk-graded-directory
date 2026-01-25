'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { GuideCategory } from '@/lib/data/getGuidesIndexData'

interface GuideCategoriesProps {
  categories: GuideCategory[]
}

/**
 * Guide Categories Filter Component
 *
 * Displays category filter tabs/buttons for filtering guides.
 * Uses URL params for filtering (enables sharing filtered views).
 */
export default function GuideCategories({ categories }: GuideCategoriesProps) {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category')

  return (
    <div className="flex flex-wrap gap-2">
      {/* All Guides Tab */}
      <Link
        href="/guides/"
        className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
          !activeCategory
            ? 'bg-[#e85d4c] text-white border-[#e85d4c]'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-[#e85d4c] hover:text-[#e85d4c]'
        }`}
      >
        All Guides
      </Link>

      {/* Category Tabs */}
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/guides/?category=${category.slug}`}
          className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
            activeCategory === category.slug
              ? 'bg-[#e85d4c] text-white border-[#e85d4c]'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-[#e85d4c] hover:text-[#e85d4c]'
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}
