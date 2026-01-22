/**
 * Provider Lookup Page
 *
 * /business/add/provider/lookup - Search for existing provider.
 */

import { Metadata } from 'next'
import { BusinessLookup } from '@/components/business'

export const metadata: Metadata = {
  title: 'Find Your Repair Service | UK Graded Appliances Directory',
  description: 'Search for your appliance repair service in our directory.',
}

export default function ProviderLookupPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f6] dark:bg-[#0f0d0d] py-12 px-4">
      <BusinessLookup businessType="provider" className="py-8" />
    </main>
  )
}
