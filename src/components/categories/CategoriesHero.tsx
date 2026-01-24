import type { CategoriesIndexStats } from '@/lib/data/getCategoriesIndexData'

interface CategoriesHeroProps {
  stats: CategoriesIndexStats
}

/**
 * Categories Index Hero Section
 *
 * Displays H1, intro text, and aggregate stats
 */
export default function CategoriesHero({ stats }: CategoriesHeroProps) {
  return (
    <section className="py-8 lg:py-12 bg-[#f8f6f6] dark:bg-[#0f0d0d]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#181111] dark:text-[#f5f0f0] mb-4">
          All Graded Appliance Categories
        </h1>

        {/* Intro text */}
        <p className="text-lg text-[#6b7280] dark:text-[#a8a0a0] mb-6 max-w-3xl">
          Browse {stats.totalCategories} categories of graded appliances from {stats.totalStores}+ stores
          across {stats.totalCities}+ UK cities. Find ex-display, B-grade, and factory second appliances
          at 30-70% off retail prices.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#e85d4c]">{stats.totalCategories}</span>
            <span className="text-sm text-[#6b7280] dark:text-[#a8a0a0]">Categories</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#e85d4c]">{stats.totalStores}+</span>
            <span className="text-sm text-[#6b7280] dark:text-[#a8a0a0]">Stores</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#e85d4c]">{stats.totalCities}+</span>
            <span className="text-sm text-[#6b7280] dark:text-[#a8a0a0]">UK Cities</span>
          </div>
        </div>
      </div>
    </section>
  )
}
