'use client'

import { Tag, Store, Percent } from 'lucide-react'
import type { BrandsIndexStats } from '@/lib/data/getBrandsIndexData'

interface BrandsIndexHeroProps {
  stats: BrandsIndexStats
}

/**
 * Hero Section for Brands Index Page
 * Displays title, intro text, and key stats
 */
export function BrandsIndexHero({ stats }: BrandsIndexHeroProps) {
  return (
    <section className="bg-gradient-to-br from-[#fff8f7] to-[#fef2f0] dark:from-[#1a1616] dark:to-[#0f0d0d] py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="text-5xl mb-4" aria-hidden="true">
          🏷️
        </div>

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#181111] dark:text-[#f5f0f0] mb-4">
          Graded Appliance Brands UK
        </h1>

        {/* Intro paragraph */}
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Browse graded and ex-display appliances from {stats.totalBrands} leading brands.
          Find discounted premium, mid-range and value brands with full warranties
          at stores across the UK.
        </p>

        {/* Stats box */}
        <div className="bg-white dark:bg-[#1a1616] rounded-xl shadow-md p-6 max-w-lg mx-auto grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Tag className="w-6 h-6 text-[#e85d4c]" />
            </div>
            <div className="text-2xl font-bold text-[#e85d4c]">{stats.totalBrands}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Brands</div>
          </div>
          <div className="text-center border-x border-gray-200 dark:border-gray-700">
            <div className="flex justify-center mb-2">
              <Store className="w-6 h-6 text-[#e85d4c]" />
            </div>
            <div className="text-2xl font-bold text-[#e85d4c]">{stats.totalStores}+</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Stores</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Percent className="w-6 h-6 text-[#e85d4c]" />
            </div>
            <div className="text-2xl font-bold text-[#e85d4c]">30-70%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Savings</div>
          </div>
        </div>
      </div>
    </section>
  )
}
