'use client'

import { Store, Wrench, MapPin, Star, CheckCircle, Award } from 'lucide-react'
import type { Brand, BrandPageStats } from '@/lib/data/getBrandPageData'

interface BrandPageHeroProps {
  brand: Brand
  stats: BrandPageStats
}

/**
 * Hero Section for Individual Brand Page
 * Displays brand logo, name, tier badge, and stats
 */
export function BrandPageHero({ brand, stats }: BrandPageHeroProps) {
  const tierConfig = {
    premium: {
      label: 'Premium Brand',
      icon: Star,
      className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    },
    mid_range: {
      label: 'Mid-Range Brand',
      icon: CheckCircle,
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    },
    value: {
      label: 'Value Brand',
      icon: Award,
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    },
  }

  const tier = tierConfig[brand.tier]
  const TierIcon = tier.icon

  return (
    <section className="bg-gradient-to-br from-[#fff8f7] to-[#fef2f0] dark:from-[#1a1616] dark:to-[#0f0d0d] py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo */}
          {brand.logo_url ? (
            <div className="h-20 flex items-center justify-center mb-6">
              <img
                src={brand.logo_url}
                alt={brand.name}
                className="max-h-20 max-w-[200px] object-contain"
              />
            </div>
          ) : (
            <div className="h-20 flex items-center justify-center mb-6">
              <span className="text-5xl font-bold text-[#181111] dark:text-[#f5f0f0]">
                {brand.name}
              </span>
            </div>
          )}

          {/* H1 - Brand Name */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#181111] dark:text-[#f5f0f0] mb-4">
            {brand.name}
          </h1>

          {/* Tier Badge */}
          <div className="flex justify-center mb-6">
            <span
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium ${tier.className}`}
            >
              <TierIcon className="w-4 h-4" />
              {tier.label}
            </span>
          </div>

          {/* Stats box */}
          <div className="bg-white dark:bg-[#1a1616] rounded-xl shadow-md p-6 max-w-xl mx-auto grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Store className="w-6 h-6 text-[#e85d4c]" />
              </div>
              <div className="text-2xl font-bold text-[#e85d4c]">{stats.totalStores}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Store{stats.totalStores !== 1 ? 's' : ''}
              </div>
            </div>

            {stats.hasAuthorisedNetwork && stats.totalProviders > 0 && (
              <div className="text-center border-x border-gray-200 dark:border-gray-700">
                <div className="flex justify-center mb-2">
                  <Wrench className="w-6 h-6 text-[#e85d4c]" />
                </div>
                <div className="text-2xl font-bold text-[#e85d4c]">{stats.totalProviders}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Repair Centre{stats.totalProviders !== 1 ? 's' : ''}
                </div>
              </div>
            )}

            <div className={`text-center ${stats.hasAuthorisedNetwork && stats.totalProviders > 0 ? '' : 'col-span-2 border-l border-gray-200 dark:border-gray-700'}`}>
              <div className="flex justify-center mb-2">
                <MapPin className="w-6 h-6 text-[#e85d4c]" />
              </div>
              <div className="text-2xl font-bold text-[#e85d4c]">{stats.totalCities}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Cit{stats.totalCities !== 1 ? 'ies' : 'y'} Covered
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
