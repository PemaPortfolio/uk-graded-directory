import Link from 'next/link'
import { ChevronRight, Store } from 'lucide-react'
import type { Brand, CategoryWithCounts } from '@/lib/data/getBrandPageData'

interface BrandCategoriesSectionProps {
  brand: Brand
  categories: CategoryWithCounts[]
}

/**
 * Categories Section for Individual Brand Page
 * Shows which appliance categories this brand has in stock
 */
export function BrandCategoriesSection({ brand, categories }: BrandCategoriesSectionProps) {
  if (categories.length === 0) return null

  return (
    <section className="py-12 lg:py-16 bg-gray-50 dark:bg-[#1a1616]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#181111] dark:text-[#f5f0f0] mb-4 flex items-center gap-2">
          <span>🔧</span> Graded {brand.name} Appliances by Category
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Find graded {brand.name} appliances by type:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}/?brand=${brand.slug}`}
              className="group bg-white dark:bg-[#0f0d0d] rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-800 transition-all duration-200 text-center"
            >
              {/* Icon */}
              {category.icon && (
                <div className="text-3xl mb-3" aria-hidden="true">
                  {category.icon}
                </div>
              )}

              {/* Category name */}
              <div className="font-semibold text-[#181111] dark:text-[#f5f0f0] group-hover:text-[#e85d4c] transition-colors mb-2">
                {category.name_plural || category.name}
              </div>

              {/* Store count */}
              <div className="flex items-center justify-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Store className="w-4 h-4" />
                <span>{category.store_count} store{category.store_count !== 1 ? 's' : ''}</span>
              </div>

              {/* Browse link */}
              <div className="mt-3 flex items-center justify-center text-[#e85d4c] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Browse <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
