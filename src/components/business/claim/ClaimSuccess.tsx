'use client'

/**
 * Claim Success Component (Spec 03)
 *
 * Success message after claiming a business.
 */

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

interface ClaimSuccessProps {
  businessName: string
  businessId: string
  className?: string
}

export function ClaimSuccess({
  businessName,
  businessId,
  className = '',
}: ClaimSuccessProps) {
  return (
    <div className={`max-w-md mx-auto text-center ${className}`}>
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
        You&apos;ve claimed your business!
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mb-8">
        {businessName} is now linked to your account.
      </p>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8 text-left">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
          You can now:
        </h2>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">•</span>
            Update your business details
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">•</span>
            Add photos and descriptions
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">•</span>
            Track views and enquiries
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/dashboard"
          className="
            flex-1
            flex items-center justify-center
            h-12 px-6
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            font-semibold
            border border-gray-300 dark:border-gray-600
            rounded-lg
            hover:bg-gray-50 dark:hover:bg-gray-700
            transition-colors
          "
        >
          Go to Dashboard
        </Link>
        <Link
          href={`/dashboard/business/${businessId}/edit`}
          className="
            flex-1
            flex items-center justify-center
            h-12 px-6
            bg-[#e85d4c] hover:bg-[#d94f3f]
            text-white
            font-semibold
            rounded-lg
            transition-colors
          "
        >
          Edit My Listing
        </Link>
      </div>
    </div>
  )
}

export default ClaimSuccess
