'use client'

/**
 * Provider Form Page
 *
 * /business/add/provider/form - Multi-step provider submission form.
 */

import { Suspense } from 'react'
import { ProviderForm } from '@/components/business'
import type { ApplianceCategory, Brand, Place } from '@/types/business'

// Sample category data (repair-focused)
const SAMPLE_CATEGORIES: ApplianceCategory[] = [
  { id: '1', name: 'Washing Machines', slug: 'washing-machines', tier: 'tier_1' },
  { id: '2', name: 'Tumble Dryers', slug: 'tumble-dryers', tier: 'tier_1' },
  { id: '3', name: 'Washer Dryers', slug: 'washer-dryers', tier: 'tier_2' },
  { id: '4', name: 'Fridge Freezers', slug: 'fridge-freezers', tier: 'tier_1' },
  { id: '5', name: 'American Fridge Freezers', slug: 'american-fridge-freezers', tier: 'tier_2' },
  { id: '6', name: 'Chest Freezers', slug: 'chest-freezers', tier: 'tier_2' },
  { id: '7', name: 'Wine Coolers', slug: 'wine-coolers', tier: 'tier_3' },
  { id: '8', name: 'Dishwashers', slug: 'dishwashers', tier: 'tier_1' },
  { id: '9', name: 'Ovens', slug: 'ovens', tier: 'tier_1' },
  { id: '10', name: 'Hobs', slug: 'hobs', tier: 'tier_2' },
  { id: '11', name: 'Cooker Hoods', slug: 'cooker-hoods', tier: 'tier_3' },
  { id: '12', name: 'Range Cookers', slug: 'range-cookers', tier: 'tier_2' },
  { id: '13', name: 'Microwaves', slug: 'microwaves', tier: 'tier_2' },
]

// Sample brand data
const SAMPLE_BRANDS: Brand[] = [
  { id: 'b1', name: 'Bosch', slug: 'bosch', tier: 'premium' },
  { id: 'b2', name: 'Samsung', slug: 'samsung', tier: 'premium' },
  { id: 'b3', name: 'Miele', slug: 'miele', tier: 'premium' },
  { id: 'b4', name: 'LG', slug: 'lg', tier: 'premium' },
  { id: 'b5', name: 'Hotpoint', slug: 'hotpoint', tier: 'mid_range' },
  { id: 'b6', name: 'Indesit', slug: 'indesit', tier: 'mid_range' },
  { id: 'b7', name: 'Beko', slug: 'beko', tier: 'value' },
  { id: 'b8', name: 'AEG', slug: 'aeg', tier: 'premium' },
  { id: 'b9', name: 'Haier', slug: 'haier', tier: 'mid_range' },
  { id: 'b10', name: 'Hisense', slug: 'hisense', tier: 'value' },
  { id: 'b11', name: 'Smeg', slug: 'smeg', tier: 'premium' },
  { id: 'b12', name: 'Siemens', slug: 'siemens', tier: 'premium' },
]

// Sample places (UK cities)
const SAMPLE_PLACES: Place[] = [
  { id: 'p1', name: 'Manchester', slug: 'manchester', adminAreaId: 'a1', adminAreaName: 'Greater Manchester' },
  { id: 'p2', name: 'Salford', slug: 'salford', adminAreaId: 'a1', adminAreaName: 'Greater Manchester' },
  { id: 'p3', name: 'Stockport', slug: 'stockport', adminAreaId: 'a1', adminAreaName: 'Greater Manchester' },
  { id: 'p4', name: 'Oldham', slug: 'oldham', adminAreaId: 'a1', adminAreaName: 'Greater Manchester' },
  { id: 'p5', name: 'Rochdale', slug: 'rochdale', adminAreaId: 'a1', adminAreaName: 'Greater Manchester' },
  { id: 'p6', name: 'Bolton', slug: 'bolton', adminAreaId: 'a1', adminAreaName: 'Greater Manchester' },
  { id: 'p7', name: 'Bury', slug: 'bury', adminAreaId: 'a1', adminAreaName: 'Greater Manchester' },
  { id: 'p8', name: 'Wigan', slug: 'wigan', adminAreaId: 'a1', adminAreaName: 'Greater Manchester' },
  { id: 'p9', name: 'Tameside', slug: 'tameside', adminAreaId: 'a1', adminAreaName: 'Greater Manchester' },
  { id: 'p10', name: 'Trafford', slug: 'trafford', adminAreaId: 'a1', adminAreaName: 'Greater Manchester' },
]

function ProviderFormContent() {
  return (
    <ProviderForm
      categories={SAMPLE_CATEGORIES}
      brands={SAMPLE_BRANDS}
      places={SAMPLE_PLACES}
      className="py-8"
    />
  )
}

export default function ProviderFormPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f6] dark:bg-[#0f0d0d] py-12 px-4">
      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto py-8">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8" />
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 space-y-6">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        }
      >
        <ProviderFormContent />
      </Suspense>
    </main>
  )
}
