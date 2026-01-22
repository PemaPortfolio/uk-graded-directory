'use client'

/**
 * Business Type Selector Component (Spec 03)
 *
 * Allows users to select whether they are a store or repair provider.
 */

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Store, Wrench } from 'lucide-react'
import type { BusinessType } from '@/types/business'

interface BusinessTypeSelectorProps {
  className?: string
}

export function BusinessTypeSelector({ className = '' }: BusinessTypeSelectorProps) {
  const [selected, setSelected] = useState<BusinessType | null>(null)
  const router = useRouter()

  const handleSelect = (type: BusinessType) => {
    setSelected(type)
    // Navigate after a brief delay to show selection
    setTimeout(() => {
      router.push(`/business/add/${type}/lookup`)
    }, 150)
  }

  return (
    <div className={`max-w-3xl mx-auto ${className}`}>
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          What type of business do you have?
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        {/* Store Option */}
        <button
          type="button"
          onClick={() => handleSelect('store')}
          className={`
            flex flex-col items-center
            w-full sm:w-[280px]
            p-6
            bg-white dark:bg-gray-800
            border-2 rounded-xl
            cursor-pointer
            transition-all duration-150
            ${selected === 'store'
              ? 'border-[#e85d4c] bg-blue-50 dark:bg-gray-700'
              : 'border-gray-200 dark:border-gray-700 hover:border-[#e85d4c] hover:shadow-md hover:-translate-y-0.5'
            }
          `}
        >
          <div className="w-12 h-12 mb-4 flex items-center justify-center">
            <Store className="w-10 h-10 text-[#e85d4c]" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
            Appliance Store
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center leading-relaxed">
            I sell graded, refurbished, or ex-display appliances
          </p>
        </button>

        {/* Provider Option */}
        <button
          type="button"
          onClick={() => handleSelect('provider')}
          className={`
            flex flex-col items-center
            w-full sm:w-[280px]
            p-6
            bg-white dark:bg-gray-800
            border-2 rounded-xl
            cursor-pointer
            transition-all duration-150
            ${selected === 'provider'
              ? 'border-[#e85d4c] bg-blue-50 dark:bg-gray-700'
              : 'border-gray-200 dark:border-gray-700 hover:border-[#e85d4c] hover:shadow-md hover:-translate-y-0.5'
            }
          `}
        >
          <div className="w-12 h-12 mb-4 flex items-center justify-center">
            <Wrench className="w-10 h-10 text-[#e85d4c]" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
            Repair Service
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center leading-relaxed">
            I repair home appliances
          </p>
        </button>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Not sure?{' '}
          <Link
            href="/business/help"
            className="text-[#e85d4c] hover:underline"
          >
            Read our guide for businesses
          </Link>
        </p>
      </div>
    </div>
  )
}

export default BusinessTypeSelector
