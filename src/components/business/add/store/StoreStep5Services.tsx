'use client'

/**
 * Store Form Step 5: Services & Description (Spec 03)
 *
 * Warranty, installation, delivery, repair services, and description.
 */

import { useState, useEffect } from 'react'
import { Info } from 'lucide-react'
import type { StoreStep5Data, WarrantyType } from '@/types/business'

interface StoreStep5ServicesProps {
  data: Partial<StoreStep5Data>
  onChange: (data: Partial<StoreStep5Data>) => void
  errors?: Record<string, string>
  className?: string
}

const WARRANTY_MONTHS = [1, 3, 6, 12, 24, 36, 48, 60]

type InstallationType = 'none' | 'free' | 'paid'

export function StoreStep5Services({
  data,
  onChange,
  errors = {},
  className = '',
}: StoreStep5ServicesProps) {
  // Track installation type for radio buttons
  const [installationType, setInstallationType] = useState<InstallationType>(() => {
    if (!data.offers_installation) return 'none'
    if (data.offers_free_installation) return 'free'
    return 'paid'
  })

  // Update data when installation type changes
  useEffect(() => {
    if (installationType === 'none') {
      onChange({
        ...data,
        offers_installation: false,
        offers_free_installation: false,
        installation_cost: undefined,
      })
    } else if (installationType === 'free') {
      onChange({
        ...data,
        offers_installation: true,
        offers_free_installation: true,
        installation_cost: undefined,
      })
    }
    // For 'paid', installation_cost is set via the input field
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [installationType])

  const handleChange = <K extends keyof StoreStep5Data>(field: K, value: StoreStep5Data[K]) => {
    onChange({ ...data, [field]: value })
  }

  const descriptionLength = (data.description || '').length

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Warranty Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          WARRANTY <span className="text-red-500">*</span>
        </h3>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-sm text-gray-700 dark:text-gray-300">We offer</span>
          <select
            value={data.warranty_months || ''}
            onChange={(e) => handleChange('warranty_months', parseInt(e.target.value, 10))}
            className={`
              h-10 px-3
              text-sm
              border rounded-lg
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
              ${errors.warranty_months
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-600'
              }
            `}
          >
            <option value="">Select...</option>
            {WARRANTY_MONTHS.map((months) => (
              <option key={months} value={months}>
                {months}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-700 dark:text-gray-300">months warranty</span>
        </div>

        {errors.warranty_months && (
          <p className="mt-1 text-sm text-red-500">{errors.warranty_months}</p>
        )}

        <div className="mt-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Warranty provided by:</p>
          <div className="space-y-2">
            {(['retailer', 'manufacturer', 'both'] as WarrantyType[]).map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="warranty_type"
                  value={type}
                  checked={data.warranty_type === type}
                  onChange={() => handleChange('warranty_type', type)}
                  className="
                    w-4 h-4
                    text-[#e85d4c]
                    border-gray-300 dark:border-gray-600
                    focus:ring-[#e85d4c]
                  "
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {type === 'retailer' && 'Retailer (your warranty)'}
                  {type === 'manufacturer' && 'Manufacturer (original warranty)'}
                  {type === 'both' && 'Both (retailer + manufacturer)'}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700" />

      {/* Installation Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          INSTALLATION
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          Do you offer appliance installation?
        </p>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="installation"
              checked={installationType === 'free'}
              onChange={() => setInstallationType('free')}
              className="
                w-4 h-4
                text-[#e85d4c]
                border-gray-300 dark:border-gray-600
                focus:ring-[#e85d4c]
              "
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Yes, FREE installation
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="installation"
              checked={installationType === 'paid'}
              onChange={() => setInstallationType('paid')}
              className="
                mt-1
                w-4 h-4
                text-[#e85d4c]
                border-gray-300 dark:border-gray-600
                focus:ring-[#e85d4c]
              "
            />
            <div className="flex-1">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Yes, PAID installation
              </span>
              {installationType === 'paid' && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Cost:</span>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={data.installation_cost || ''}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value)
                        handleChange('installation_cost', isNaN(value) ? undefined : value)
                        handleChange('offers_installation', true)
                        handleChange('offers_free_installation', false)
                      }}
                      placeholder="29.99"
                      className="
                        w-28 h-9 pl-7 pr-3
                        text-sm
                        border border-gray-300 dark:border-gray-600 rounded
                        bg-white dark:bg-gray-800
                        text-gray-900 dark:text-gray-100
                        focus:outline-none focus:ring-1 focus:ring-[#e85d4c]
                      "
                    />
                  </div>
                </div>
              )}
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="installation"
              checked={installationType === 'none'}
              onChange={() => setInstallationType('none')}
              className="
                w-4 h-4
                text-[#e85d4c]
                border-gray-300 dark:border-gray-600
                focus:ring-[#e85d4c]
              "
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              No installation service
            </span>
          </label>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700" />

      {/* Delivery Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          DELIVERY
        </h3>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.offers_same_day_delivery || false}
            onChange={(e) => handleChange('offers_same_day_delivery', e.target.checked)}
            className="
              mt-0.5
              w-5 h-5
              rounded
              border-[#e85d4c]
              text-[#e85d4c]
              focus:ring-[#e85d4c]
            "
          />
          <div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              We offer same-day delivery
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Appliance delivered on the same day if ordered early
            </p>
          </div>
        </label>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700" />

      {/* Repair Services Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          REPAIR SERVICES <span className="text-red-500">*</span>
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          Do you also offer appliance repair/maintenance services?
        </p>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="repair_service"
              checked={data.offers_repair_service === true}
              onChange={() => handleChange('offers_repair_service', true)}
              className="
                w-4 h-4
                text-[#e85d4c]
                border-gray-300 dark:border-gray-600
                focus:ring-[#e85d4c]
              "
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Yes, we repair appliances (not just sell)
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="repair_service"
              checked={data.offers_repair_service === false}
              onChange={() => handleChange('offers_repair_service', false)}
              className="
                w-4 h-4
                text-[#e85d4c]
                border-gray-300 dark:border-gray-600
                focus:ring-[#e85d4c]
              "
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              No, we only sell appliances
            </span>
          </label>
        </div>

        {data.offers_repair_service === true && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                If you offer repairs, your store will also appear on our repair service pages, giving you extra visibility to customers seeking repairs.
              </p>
            </div>
          </div>
        )}

        {errors.offers_repair_service && (
          <p className="mt-2 text-sm text-red-500">{errors.offers_repair_service}</p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700" />

      {/* Description */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
          Business Description <span className="text-red-500">*</span>
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Tell customers what makes your business special
        </p>

        <textarea
          value={data.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="We're Manchester's leading graded appliance specialist, offering A and B-grade washing machines, fridge freezers and more at up to 70% off RRP..."
          rows={5}
          className={`
            w-full p-4
            text-base
            border rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400
            resize-none
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
            ${errors.description
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:border-[#e85d4c]'
            }
          `}
          aria-invalid={!!errors.description}
          aria-describedby="description-hint"
        />
        <div className="flex justify-between mt-1">
          <span
            id="description-hint"
            className={`text-xs ${
              descriptionLength < 50 ? 'text-amber-600' : descriptionLength > 500 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {descriptionLength}/500 characters (minimum 50)
          </span>
        </div>
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>
    </div>
  )
}

export default StoreStep5Services
