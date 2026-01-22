/**
 * Business Type Selection Page
 *
 * /business/add - Select store or repair provider.
 */

import { Metadata } from 'next'
import { BusinessTypeSelector } from '@/components/business'

export const metadata: Metadata = {
  title: 'Add Your Business | UK Graded Appliances Directory',
  description: 'List your appliance store or repair service on the UK Graded Appliances Directory.',
}

export default function BusinessAddPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f6] dark:bg-[#0f0d0d] py-12 px-4">
      <BusinessTypeSelector className="py-8" />
    </main>
  )
}
