'use client'

/**
 * Business Lookup Component (Spec 03)
 *
 * Form to search if a business already exists in the directory.
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, Search } from 'lucide-react'
import type { BusinessType, LookupFormData } from '@/types/business'

interface BusinessLookupProps {
  businessType: BusinessType
  className?: string
}

// UK postcode regex
const POSTCODE_REGEX = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i

export function BusinessLookup({ businessType, className = '' }: BusinessLookupProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<LookupFormData>({
    postcode: '',
    businessName: '',
  })
  const [errors, setErrors] = useState<{ postcode?: string; businessName?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: { postcode?: string; businessName?: string } = {}

    if (!formData.postcode.trim()) {
      newErrors.postcode = 'Postcode is required'
    } else if (!POSTCODE_REGEX.test(formData.postcode.trim())) {
      newErrors.postcode = 'Please enter a valid UK postcode'
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required'
    } else if (formData.businessName.trim().length < 2) {
      newErrors.businessName = 'Business name must be at least 2 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Navigate to results page with search params
    const params = new URLSearchParams({
      postcode: formData.postcode.trim().toUpperCase(),
      name: formData.businessName.trim(),
    })

    router.push(`/business/add/${businessType}/results?${params.toString()}`)
  }

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      {/* Illustration placeholder */}
      <div className="flex justify-center mb-8">
        <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <Search className="w-16 h-16 text-[#e85d4c]" />
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Let&apos;s check if you&apos;re already listed
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your business may already be on UK Graded Directory. If it is, you can claim it instantly. If not, we&apos;ll help you add it.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Postcode */}
        <div>
          <label
            htmlFor="postcode"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Postcode <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="postcode"
            value={formData.postcode}
            onChange={(e) => {
              setFormData({ ...formData, postcode: e.target.value })
              if (errors.postcode) setErrors({ ...errors, postcode: undefined })
            }}
            placeholder="e.g., M1 1BA"
            className={`
              w-full h-12 px-4
              text-base
              border rounded-lg
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-400
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
              ${errors.postcode
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-[#e85d4c]'
              }
            `}
            aria-invalid={!!errors.postcode}
            aria-describedby={errors.postcode ? 'postcode-error' : undefined}
          />
          {errors.postcode && (
            <p id="postcode-error" className="mt-1 text-sm text-red-500">
              {errors.postcode}
            </p>
          )}
        </div>

        {/* Business Name */}
        <div>
          <label
            htmlFor="businessName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="businessName"
            value={formData.businessName}
            onChange={(e) => {
              setFormData({ ...formData, businessName: e.target.value })
              if (errors.businessName) setErrors({ ...errors, businessName: undefined })
            }}
            placeholder={businessType === 'store' ? 'e.g., Manchester Appliance Centre' : 'e.g., Quick Fix Repairs'}
            className={`
              w-full h-12 px-4
              text-base
              border rounded-lg
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-400
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
              ${errors.businessName
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-[#e85d4c]'
              }
            `}
            aria-invalid={!!errors.businessName}
            aria-describedby={errors.businessName ? 'businessName-error' : undefined}
          />
          {errors.businessName && (
            <p id="businessName-error" className="mt-1 text-sm text-red-500">
              {errors.businessName}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
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
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Searching...
            </>
          ) : (
            'Continue'
          )}
        </button>
      </form>

      {/* Back Link */}
      <div className="mt-6 text-center">
        <Link
          href="/business/add"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#e85d4c] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to business type
        </Link>
      </div>
    </div>
  )
}

export default BusinessLookup
