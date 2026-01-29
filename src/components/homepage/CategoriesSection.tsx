'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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
 * UPGRADED with bold design:
 * - Gradient tier badges
 * - Hover lift animations
 * - Asymmetric grid layout
 * - Premium card styling
 */
export default function CategoriesSection({ categories }: CategoriesSectionProps) {
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
    <section className="py-16 lg:py-24 bg-[#f8f6f6] relative overflow-hidden">
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-50" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-white rounded-full text-sm font-medium text-[#6b7280] mb-4 border border-[#ebe5e5]">
            Browse Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#181111] mb-4">
            What Types of Graded Appliances Can You Buy?
          </h2>
          <p className="text-[#6b7280] max-w-2xl mx-auto">
            From washing machines to refrigerators, find discounted appliances across all major categories.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {displayCategories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className={`group relative bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                category.tier === 'tier_1'
                  ? 'ring-2 ring-[#e85d4c]/20 hover:ring-[#e85d4c]/40 hover:shadow-lg hover:shadow-[#e85d4c]/10'
                  : 'border border-[#ebe5e5] hover:border-[#e85d4c]/30 hover:shadow-lg'
              }`}
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {/* Tier 1 badge */}
              {category.tier === 'tier_1' && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-coral rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-white text-[10px] font-bold">★</span>
                </div>
              )}

              {/* Icon with background */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                category.tier === 'tier_1'
                  ? 'bg-gradient-to-br from-[#e85d4c]/10 to-[#e85d4c]/5'
                  : 'bg-[#f8f6f6]'
              }`}>
                <span className="text-3xl">{category.icon}</span>
              </div>

              {/* Category Name */}
              <h3 className="font-semibold text-[#181111] mb-2 group-hover:text-[#e85d4c] transition-colors">
                {category.name}
              </h3>

              {/* Savings Badge for Tier 1 */}
              {category.tier === 'tier_1' && category.avgSavings && (
                <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Avg {category.avgSavings}% off
                </div>
              )}

              {/* Arrow indicator */}
              <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-[#f8f6f6] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4 text-[#e85d4c]" />
              </div>
            </Link>
          ))}

          {/* View All CTA - spans 2 columns on mobile */}
          <Link
            href="/categories"
            className="group relative col-span-2 md:col-span-1 bg-gradient-coral rounded-2xl p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#e85d4c]/20 overflow-hidden"
          >
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 border border-white/30 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border border-white/30 rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">➕</span>
              </div>
              <h3 className="font-semibold text-lg mb-1">View All Categories</h3>
              <p className="text-white/80 text-sm">29+ appliance types</p>

              <div className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
