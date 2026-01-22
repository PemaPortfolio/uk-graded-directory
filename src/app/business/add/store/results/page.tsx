'use client'

/**
 * Store Results Page
 *
 * /business/add/store/results - Display search results.
 */

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BusinessResults } from '@/components/business'
import type { BusinessSearchResult } from '@/types/business'

function StoreResultsContent() {
  const searchParams = useSearchParams()
  const postcode = searchParams.get('postcode') || ''
  const name = searchParams.get('name') || ''

  const [results, setResults] = useState<BusinessSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // Return empty results for now
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    if (postcode && name) {
      fetchResults()
    } else {
      setIsLoading(false)
    }
  }, [postcode, name])

  return (
    <BusinessResults
      businessType="store"
      results={results}
      searchName={name}
      searchPostcode={postcode}
      isLoading={isLoading}
      className="py-8"
    />
  )
}

export default function StoreResultsPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f6] dark:bg-[#0f0d0d] py-12 px-4">
      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-8" />
              <div className="space-y-4">
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        }
      >
        <StoreResultsContent />
      </Suspense>
    </main>
  )
}
