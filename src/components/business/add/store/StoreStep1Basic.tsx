'use client'

/**
 * Store Form Step 1: Basic Information (Spec 03)
 *
 * Business name and address details.
 */

import type { StoreStep1Data } from '@/types/business'

interface StoreStep1BasicProps {
  data: Partial<StoreStep1Data>
  onChange: (data: Partial<StoreStep1Data>) => void
  errors?: Record<string, string>
  className?: string
}

export function StoreStep1Basic({
  data,
  onChange,
  errors = {},
  className = '',
}: StoreStep1BasicProps) {
  const handleChange = (field: keyof StoreStep1Data, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Business Name */}
      <div>
        <label
          htmlFor="business_name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Business Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="business_name"
          value={data.business_name || ''}
          onChange={(e) => handleChange('business_name', e.target.value)}
          placeholder="e.g., Manchester Appliance Centre"
          className={`
            w-full h-12 px-4
            text-base
            border rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
            ${errors.business_name
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:border-[#e85d4c]'
            }
          `}
          aria-invalid={!!errors.business_name}
          aria-describedby={errors.business_name ? 'business_name-error' : 'business_name-hint'}
        />
        <p id="business_name-hint" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          The name customers know you by
        </p>
        {errors.business_name && (
          <p id="business_name-error" className="mt-1 text-sm text-red-500">
            {errors.business_name}
          </p>
        )}
      </div>

      {/* Trading Name (optional) */}
      <div>
        <label
          htmlFor="trading_name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Trading Name (if different)
        </label>
        <input
          type="text"
          id="trading_name"
          value={data.trading_name || ''}
          onChange={(e) => handleChange('trading_name', e.target.value)}
          placeholder="e.g., if you trade under a different name"
          className="
            w-full h-12 px-4
            text-base
            border border-gray-300 dark:border-gray-600 rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50 focus:border-[#e85d4c]
          "
        />
      </div>

      {/* Divider */}
      <div className="pt-2">
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
          Business Address
        </h3>
      </div>

      {/* Address Line 1 */}
      <div>
        <label
          htmlFor="address_line1"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Address Line 1 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="address_line1"
          value={data.address_line1 || ''}
          onChange={(e) => handleChange('address_line1', e.target.value)}
          placeholder="e.g., 123 High Street"
          className={`
            w-full h-12 px-4
            text-base
            border rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
            ${errors.address_line1
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:border-[#e85d4c]'
            }
          `}
          aria-invalid={!!errors.address_line1}
          aria-describedby={errors.address_line1 ? 'address_line1-error' : undefined}
        />
        {errors.address_line1 && (
          <p id="address_line1-error" className="mt-1 text-sm text-red-500">
            {errors.address_line1}
          </p>
        )}
      </div>

      {/* Address Line 2 (optional) */}
      <div>
        <label
          htmlFor="address_line2"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Address Line 2
        </label>
        <input
          type="text"
          id="address_line2"
          value={data.address_line2 || ''}
          onChange={(e) => handleChange('address_line2', e.target.value)}
          placeholder="e.g., Unit 5, Industrial Estate"
          className="
            w-full h-12 px-4
            text-base
            border border-gray-300 dark:border-gray-600 rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50 focus:border-[#e85d4c]
          "
        />
      </div>

      {/* City and Postcode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="city_name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            City / Town <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="city_name"
            value={data.city_name || ''}
            onChange={(e) => handleChange('city_name', e.target.value)}
            placeholder="e.g., Manchester"
            className={`
              w-full h-12 px-4
              text-base
              border rounded-lg
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-400
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
              ${errors.city_name
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-[#e85d4c]'
              }
            `}
            aria-invalid={!!errors.city_name}
            aria-describedby={errors.city_name ? 'city_name-error' : undefined}
          />
          {errors.city_name && (
            <p id="city_name-error" className="mt-1 text-sm text-red-500">
              {errors.city_name}
            </p>
          )}
        </div>

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
            value={data.postcode || ''}
            onChange={(e) => handleChange('postcode', e.target.value.toUpperCase())}
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
      </div>

      {/* County (optional) */}
      <div>
        <label
          htmlFor="county"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          County
        </label>
        <input
          type="text"
          id="county"
          value={data.county || ''}
          onChange={(e) => handleChange('county', e.target.value)}
          placeholder="e.g., Greater Manchester"
          className="
            w-full h-12 px-4
            text-base
            border border-gray-300 dark:border-gray-600 rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50 focus:border-[#e85d4c]
          "
        />
      </div>
    </div>
  )
}

export default StoreStep1Basic
