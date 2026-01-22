'use client'

/**
 * Provider Form Step 2: Contact Details (Spec 03)
 *
 * Phone, email, website - same as store.
 */

import type { ProviderStep2Data } from '@/types/business'

interface ProviderStep2ContactProps {
  data: Partial<ProviderStep2Data>
  onChange: (data: Partial<ProviderStep2Data>) => void
  errors?: Record<string, string>
  className?: string
}

export function ProviderStep2Contact({
  data,
  onChange,
  errors = {},
  className = '',
}: ProviderStep2ContactProps) {
  const handleChange = (field: keyof ProviderStep2Data, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={data.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="e.g., 0161 234 5678 or 07700 123456"
          className={`
            w-full h-12 px-4
            text-base
            border rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
            ${errors.phone
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:border-[#e85d4c]'
            }
          `}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
        />
        <p id="phone-hint" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          This will be displayed on your listing for customers to call
        </p>
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-red-500">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={data.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="e.g., info@quickfixrepairs.co.uk"
          className={`
            w-full h-12 px-4
            text-base
            border rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
            ${errors.email
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:border-[#e85d4c]'
            }
          `}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : 'email-hint'}
        />
        <p id="email-hint" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          We&apos;ll send a verification link to this address
        </p>
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      {/* Website */}
      <div>
        <label
          htmlFor="website"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Website
        </label>
        <input
          type="url"
          id="website"
          value={data.website || ''}
          onChange={(e) => handleChange('website', e.target.value)}
          placeholder="e.g., https://www.quickfixrepairs.co.uk"
          className={`
            w-full h-12 px-4
            text-base
            border rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
            ${errors.website
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:border-[#e85d4c]'
            }
          `}
          aria-invalid={!!errors.website}
          aria-describedby={errors.website ? 'website-error' : undefined}
        />
        {errors.website && (
          <p id="website-error" className="mt-1 text-sm text-red-500">
            {errors.website}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
          Social & Reviews
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Optional - helps customers find and review your service
        </p>
      </div>

      {/* Google Maps URL */}
      <div>
        <label
          htmlFor="google_maps_url"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Google Business Profile URL
        </label>
        <input
          type="url"
          id="google_maps_url"
          value={data.google_maps_url || ''}
          onChange={(e) => handleChange('google_maps_url', e.target.value)}
          placeholder="e.g., https://maps.google.com/?cid=..."
          className={`
            w-full h-12 px-4
            text-base
            border rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
            ${errors.google_maps_url
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:border-[#e85d4c]'
            }
          `}
          aria-invalid={!!errors.google_maps_url}
          aria-describedby={errors.google_maps_url ? 'google_maps_url-error' : 'google_maps_url-hint'}
        />
        <p id="google_maps_url-hint" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Your Google Business Profile URL (for reviews display)
        </p>
        {errors.google_maps_url && (
          <p id="google_maps_url-error" className="mt-1 text-sm text-red-500">
            {errors.google_maps_url}
          </p>
        )}
      </div>

      {/* Facebook URL */}
      <div>
        <label
          htmlFor="facebook_url"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Facebook Page URL
        </label>
        <input
          type="url"
          id="facebook_url"
          value={data.facebook_url || ''}
          onChange={(e) => handleChange('facebook_url', e.target.value)}
          placeholder="e.g., https://facebook.com/quickfixrepairs"
          className={`
            w-full h-12 px-4
            text-base
            border rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
            ${errors.facebook_url
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:border-[#e85d4c]'
            }
          `}
          aria-invalid={!!errors.facebook_url}
          aria-describedby={errors.facebook_url ? 'facebook_url-error' : undefined}
        />
        {errors.facebook_url && (
          <p id="facebook_url-error" className="mt-1 text-sm text-red-500">
            {errors.facebook_url}
          </p>
        )}
      </div>
    </div>
  )
}

export default ProviderStep2Contact
