import Link from 'next/link'
import type { CategoryWithStats } from '@/lib/data/getCategoriesIndexData'

interface CategoryGridProps {
  title: string
  subtitle?: string
  categories: CategoryWithStats[]
  compact?: boolean
}

/**
 * Category Grid Section
 *
 * Displays a grid of category cards grouped by tier
 */
export default function CategoryGrid({ title, subtitle, categories, compact = false }: CategoryGridProps) {
  if (categories.length === 0) {
    return null
  }

  return (
    <section className="py-8 lg:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <h2 className="text-xl md:text-2xl font-bold text-[#181111] dark:text-[#f5f0f0] mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-[#6b7280] dark:text-[#a8a0a0] mb-6">{subtitle}</p>
        )}
        {!subtitle && <div className="mb-6" />}

        {/* Grid */}
        {compact ? (
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}/`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a1616] border border-[#ebe5e5] dark:border-[#2d2424] rounded-lg hover:border-[#e85d4c] hover:shadow-sm transition-all"
              >
                {category.icon && <span className="text-lg">{category.icon}</span>}
                <span className="text-sm font-medium text-[#181111] dark:text-[#f5f0f0]">
                  {category.name_plural || category.name}
                </span>
                {category.store_count > 0 && (
                  <span className="text-xs text-[#6b7280] dark:text-[#a8a0a0]">
                    ({category.store_count})
                  </span>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}/`}
                className="group block p-6 bg-white dark:bg-[#1a1616] border border-[#ebe5e5] dark:border-[#2d2424] rounded-xl hover:border-[#e85d4c] hover:shadow-lg transition-all"
              >
                {/* Icon and name */}
                <div className="flex items-start gap-3 mb-3">
                  {category.icon && (
                    <span className="text-3xl shrink-0">{category.icon}</span>
                  )}
                  <div>
                    <h3 className="font-semibold text-[#181111] dark:text-[#f5f0f0] group-hover:text-[#e85d4c] transition-colors">
                      {category.name_plural || category.name}
                    </h3>
                    {category.store_count > 0 && (
                      <p className="text-sm text-[#6b7280] dark:text-[#a8a0a0]">
                        {category.store_count} {category.store_count === 1 ? 'store' : 'stores'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                {category.description && (
                  <p className="text-sm text-[#6b7280] dark:text-[#a8a0a0] line-clamp-2">
                    {category.description}
                  </p>
                )}

                {/* CTA */}
                <div className="mt-4 text-sm font-medium text-[#e85d4c] group-hover:underline">
                  Browse {category.name_plural || category.name} →
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
