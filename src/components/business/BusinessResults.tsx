'use client'

/**
 * Business Results Component (Spec 03)
 *
 * Displays search results for business lookup.
 * Allows selection of existing business to claim or option to add new.
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Star, Loader2, Search, Plus } from 'lucide-react'
import type { BusinessType, BusinessSearchResult } from '@/types/business'

interface BusinessResultsProps {
  businessType: BusinessType
  results: BusinessSearchResult[]
  searchName: string
  searchPostcode: string
  isLoading?: boolean
  className?: string
}

export function BusinessResults({
  businessType,
  results,
  searchName,
  searchPostcode,
  isLoading = false,
  className = '',
}: BusinessResultsProps) {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isNotListed, setIsNotListed] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  const handleContinue = () => {
    if (!selectedId && !isNotListed) return

    setIsNavigating(true)

    if (isNotListed) {
      // Navigate to add form with pre-filled data
      const params = new URLSearchParams({
        name: searchName,
        postcode: searchPostcode,
      })
      router.push(`/business/add/${businessType}/form?${params.toString()}`)
    } else if (selectedId) {
      // Navigate to claim flow
      router.push(`/business/claim/${selectedId}?type=${businessType}`)
    }
  }

  const handleSelect = (id: string | null) => {
    setSelectedId(id)
    setIsNotListed(false)
  }

  const handleNotListed = () => {
    setSelectedId(null)
    setIsNotListed(true)
  }

  // No results - show "not found" UI
  if (!isLoading && results.length === 0) {
    return (
      <div className={`max-w-md mx-auto text-center ${className}`}>
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Search className="w-16 h-16 text-gray-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          We couldn&apos;t find your business
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          No worries! Let&apos;s add &quot;{searchName}&quot; to our directory.
        </p>

        <Link
          href={`/business/add/${businessType}/form?name=${encodeURIComponent(searchName)}&postcode=${encodeURIComponent(searchPostcode)}`}
          className="
            inline-flex items-center justify-center gap-2
            w-full max-w-xs h-12
            bg-[#e85d4c] hover:bg-[#d94f3f]
            text-white font-semibold
            rounded-lg
            transition-colors
          "
        >
          <Plus className="w-5 h-5" />
          Add My Business
        </Link>

        <div className="mt-6">
          <Link
            href={`/business/add/${businessType}/lookup`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#e85d4c] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Search again with different details
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`max-w-lg mx-auto ${className}`}>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          We found some matches
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Select your business below, or add it if it&apos;s not listed.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-[#e85d4c] animate-spin" />
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {/* Business Results */}
          {results.map((result) => (
            <button
              key={result.id}
              type="button"
              onClick={() => result.isClaimed ? null : handleSelect(result.id)}
              disabled={result.isClaimed}
              className={`
                w-full text-left
                p-4
                border-2 rounded-lg
                transition-all
                ${result.isClaimed
                  ? 'opacity-60 cursor-not-allowed border-gray-200 dark:border-gray-700'
                  : selectedId === result.id
                    ? 'border-[#e85d4c] bg-blue-50 dark:bg-gray-700'
                    : 'border-gray-200 dark:border-gray-700 hover:border-[#e85d4c] cursor-pointer'
                }
              `}
            >
              <div className="flex items-start gap-3">
                {/* Radio indicator */}
                <div className={`
                  w-5 h-5 mt-0.5 rounded-full border-2 flex-shrink-0
                  flex items-center justify-center
                  ${selectedId === result.id
                    ? 'border-[#e85d4c]'
                    : 'border-gray-300 dark:border-gray-600'
                  }
                `}>
                  {selectedId === result.id && (
                    <div className="w-3 h-3 rounded-full bg-[#e85d4c]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {result.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {result.address}
                  </div>

                  {/* Rating */}
                  {result.rating && result.rating > 0 && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {result.rating.toFixed(1)}
                      </span>
                      {result.reviewCount && result.reviewCount > 0 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ({result.reviewCount} reviews on Google)
                        </span>
                      )}
                    </div>
                  )}

                  {/* Status */}
                  <div className="mt-2">
                    {result.isClaimed ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Already Claimed
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                        Unclaimed
                      </span>
                    )}
                  </div>

                  {/* Claimed message */}
                  {result.isClaimed && (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      This business has already been claimed.{' '}
                      <Link href="/contact" className="text-[#e85d4c] hover:underline">
                        Contact support
                      </Link>{' '}
                      if this is your business.
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}

          {/* Not listed option */}
          <button
            type="button"
            onClick={handleNotListed}
            className={`
              w-full text-left
              p-4
              border-2 rounded-lg
              transition-all
              ${isNotListed
                ? 'border-[#e85d4c] bg-blue-50 dark:bg-gray-700'
                : 'border-gray-200 dark:border-gray-700 hover:border-[#e85d4c] cursor-pointer'
              }
            `}
          >
            <div className="flex items-start gap-3">
              {/* Radio indicator */}
              <div className={`
                w-5 h-5 mt-0.5 rounded-full border-2 flex-shrink-0
                flex items-center justify-center
                ${isNotListed
                  ? 'border-[#e85d4c]'
                  : 'border-gray-300 dark:border-gray-600'
                }
              `}>
                {isNotListed && (
                  <div className="w-3 h-3 rounded-full bg-[#e85d4c]" />
                )}
              </div>

              {/* Content */}
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                  My business isn&apos;t listed here
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Add it to the directory
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Continue Button */}
      <button
        type="button"
        onClick={handleContinue}
        disabled={!selectedId && !isNotListed || isNavigating}
        className="
          w-full h-12
          bg-[#e85d4c] hover:bg-[#d94f3f]
          text-white font-semibold
          rounded-lg
          transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center gap-2
        "
      >
        {isNavigating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading...
          </>
        ) : (
          'Continue'
        )}
      </button>

      {/* Back Link */}
      <div className="mt-6 text-center">
        <Link
          href={`/business/add/${businessType}/lookup`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#e85d4c] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to search
        </Link>
      </div>
    </div>
  )
}

export default BusinessResults
