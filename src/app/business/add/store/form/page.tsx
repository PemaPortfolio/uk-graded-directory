'use client'

/**
 * Store Form Page
 *
 * /business/add/store/form - Multi-step store submission form.
 */

import { Suspense } from 'react'
import { StoreForm } from '@/components/business'
import type { CategoryGroup, Brand } from '@/types/business'

// Sample category data - in real implementation, fetch from database
const SAMPLE_CATEGORIES: CategoryGroup[] = [
  {
    name: 'Laundry',
    categories: [
      { id: '1', name: 'Washing Machines', slug: 'washing-machines', tier: 'tier_1' },
      { id: '2', name: 'Tumble Dryers', slug: 'tumble-dryers', tier: 'tier_1' },
      { id: '3', name: 'Washer Dryers', slug: 'washer-dryers', tier: 'tier_2' },
      { id: '4', name: 'Spin Dryers', slug: 'spin-dryers', tier: 'tier_3' },
    ],
  },
  {
    name: 'Refrigeration',
    categories: [
      { id: '5', name: 'Fridge Freezers', slug: 'fridge-freezers', tier: 'tier_1' },
      { id: '6', name: 'American Fridge Freezers', slug: 'american-fridge-freezers', tier: 'tier_2' },
      { id: '7', name: 'Chest Freezers', slug: 'chest-freezers', tier: 'tier_2' },
      { id: '8', name: 'Upright Freezers', slug: 'upright-freezers', tier: 'tier_2' },
      { id: '9', name: 'Larder Fridges', slug: 'larder-fridges', tier: 'tier_3' },
      { id: '10', name: 'Wine Coolers', slug: 'wine-coolers', tier: 'tier_3' },
    ],
  },
  {
    name: 'Dishwashing',
    categories: [
      { id: '11', name: 'Dishwashers', slug: 'dishwashers', tier: 'tier_1' },
      { id: '12', name: 'Slimline Dishwashers', slug: 'slimline-dishwashers', tier: 'tier_2' },
    ],
  },
  {
    name: 'Cooking',
    categories: [
      { id: '13', name: 'Freestanding Cookers', slug: 'freestanding-cookers', tier: 'tier_1' },
      { id: '14', name: 'Range Cookers', slug: 'range-cookers', tier: 'tier_2' },
      { id: '15', name: 'Built-in Ovens', slug: 'built-in-ovens', tier: 'tier_2' },
      { id: '16', name: 'Microwaves', slug: 'microwaves', tier: 'tier_2' },
      { id: '17', name: 'Hobs', slug: 'hobs', tier: 'tier_2' },
      { id: '18', name: 'Cooker Hoods', slug: 'cooker-hoods', tier: 'tier_3' },
    ],
  },
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

function StoreFormContent() {
  return (
    <StoreForm
      categories={SAMPLE_CATEGORIES}
      brands={SAMPLE_BRANDS}
      className="py-8"
    />
  )
}

export default function StoreFormPage() {
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
        <StoreFormContent />
      </Suspense>
    </main>
  )
}
