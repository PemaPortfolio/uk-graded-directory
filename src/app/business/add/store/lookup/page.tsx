/**
 * Store Lookup Page
 *
 * /business/add/store/lookup - Search for existing store.
 */

import { Metadata } from 'next'
import { BusinessLookup } from '@/components/business'

export const metadata: Metadata = {
  title: 'Find Your Store | UK Graded Appliances Directory',
  description: 'Search for your appliance store in our directory.',
}

export default function StoreLookupPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f6] dark:bg-[#0f0d0d] py-12 px-4">
      <BusinessLookup businessType="store" className="py-8" />
    </main>
  )
}
