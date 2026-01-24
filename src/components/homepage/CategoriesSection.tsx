import Link from 'next/link'

interface Category {
  name: string
  slug: string
  icon: string
  tier: 'tier_1' | 'tier_2' | 'tier_3'
  avgSavings?: number
}

interface CategoriesSectionProps {
  categories: Category[]
}

/**
 * Categories Section (Spec 12 - Section 6)
 *
 * Enhanced categories with tier system:
 * - Tier 1: Blue border, "Avg X% off" badge
 * - Tier 2/3: Standard styling
 * - CTA: View All button
 */
export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  // Default categories if none provided
  const defaultCategories: Category[] = [
    { name: 'Washing Machines', slug: 'washing-machines', icon: '🧺', tier: 'tier_1', avgSavings: 35 },
    { name: 'Fridge Freezers', slug: 'fridge-freezers', icon: '🧊', tier: 'tier_1', avgSavings: 40 },
    { name: 'Dishwashers', slug: 'dishwashers', icon: '🍽️', tier: 'tier_1', avgSavings: 38 },
    { name: 'Tumble Dryers', slug: 'tumble-dryers', icon: '🌀', tier: 'tier_2' },
    { name: 'Ovens & Cookers', slug: 'cookers', icon: '🔥', tier: 'tier_2' },
    { name: 'American Fridges', slug: 'american-fridge-freezers', icon: '🇺🇸', tier: 'tier_2' },
    { name: 'Washer Dryers', slug: 'washer-dryers', icon: '🔄', tier: 'tier_3' },
  ]

  const displayCategories = categories.length > 0 ? categories : defaultCategories

  return (
    <section className="py-12 lg:py-16 bg-[#f8f6f6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Question-based H2 for AEO */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#181111] mb-8">
          What Types of Graded Appliances Can You Buy?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className={`block p-6 bg-white rounded-xl transition-shadow hover:shadow-lg ${
                category.tier === 'tier_1'
                  ? 'border-2 border-blue-500'
                  : 'border border-gray-200'
              }`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-[#181111]">{category.name}</h3>
              {category.tier === 'tier_1' && category.avgSavings && (
                <div className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                  Avg {category.avgSavings}% off
                </div>
              )}
            </Link>
          ))}

          {/* View All CTA */}
          <Link
            href="/categories"
            className="flex flex-col items-center justify-center p-6 bg-[#e85d4c] hover:bg-[#d94f3f] text-white rounded-xl transition-colors"
          >
            <div className="text-3xl mb-2">➕</div>
            <h3 className="font-semibold">View All</h3>
            <span className="text-sm opacity-90">Categories</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
