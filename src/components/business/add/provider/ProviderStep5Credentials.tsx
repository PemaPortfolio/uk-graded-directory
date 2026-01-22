'use client'

/**
 * Provider Form Step 5: Pricing, Credentials & Description (Spec 03)
 *
 * Pricing, availability, certifications, warranty, and description.
 */

import type { ProviderStep5Data, ResponseTime } from '@/types/business'

interface ProviderStep5CredentialsProps {
  data: Partial<ProviderStep5Data>
  onChange: (data: Partial<ProviderStep5Data>) => void
  errors?: Record<string, string>
  className?: string
}

const RESPONSE_TIME_OPTIONS: { value: ResponseTime; label: string }[] = [
  { value: 'same_day', label: 'Same day' },
  { value: 'next_day', label: 'Next day' },
  { value: '2_3_days', label: '2-3 days' },
  { value: 'within_week', label: 'Within a week' },
]

const WARRANTY_MONTHS = [1, 3, 6, 12, 24]

export function ProviderStep5Credentials({
  data,
  onChange,
  errors = {},
  className = '',
}: ProviderStep5CredentialsProps) {
  const handleChange = <K extends keyof ProviderStep5Data>(
    field: K,
    value: ProviderStep5Data[K]
  ) => {
    onChange({ ...data, [field]: value })
  }

  const descriptionLength = (data.description || '').length

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Pricing */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          PRICING
        </h3>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-sm text-gray-700 dark:text-gray-300">Callout fee:</span>
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
              <input
                type="number"
                min="0"
                value={data.callout_fee_from || ''}
                onChange={(e) => handleChange('callout_fee_from', parseFloat(e.target.value) || undefined)}
                placeholder="45"
                className="
                  w-24 h-10 pl-7 pr-3
                  text-sm
                  border border-gray-300 dark:border-gray-600 rounded
                  bg-white dark:bg-gray-800
                  text-gray-900 dark:text-gray-100
                  focus:outline-none focus:ring-1 focus:ring-[#e85d4c]
                "
              />
            </div>
            <span className="text-sm text-gray-500">to</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
              <input
                type="number"
                min="0"
                value={data.callout_fee_to || ''}
                onChange={(e) => handleChange('callout_fee_to', parseFloat(e.target.value) || undefined)}
                placeholder="65"
                className="
                  w-24 h-10 pl-7 pr-3
                  text-sm
                  border border-gray-300 dark:border-gray-600 rounded
                  bg-white dark:bg-gray-800
                  text-gray-900 dark:text-gray-100
                  focus:outline-none focus:ring-1 focus:ring-[#e85d4c]
                "
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.no_fix_no_fee || false}
              onChange={(e) => handleChange('no_fix_no_fee', e.target.checked)}
              className="w-5 h-5 rounded border-[#e85d4c] text-[#e85d4c] focus:ring-[#e85d4c]"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">No fix, no fee</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.free_quotes || false}
              onChange={(e) => handleChange('free_quotes', e.target.checked)}
              className="w-5 h-5 rounded border-[#e85d4c] text-[#e85d4c] focus:ring-[#e85d4c]"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Free quotes</span>
          </label>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700" />

      {/* Availability */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          AVAILABILITY
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.offers_same_day || false}
              onChange={(e) => handleChange('offers_same_day', e.target.checked)}
              className="w-5 h-5 rounded border-[#e85d4c] text-[#e85d4c] focus:ring-[#e85d4c]"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Same day callouts</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.offers_next_day || false}
              onChange={(e) => handleChange('offers_next_day', e.target.checked)}
              className="w-5 h-5 rounded border-[#e85d4c] text-[#e85d4c] focus:ring-[#e85d4c]"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Next day callouts</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.offers_emergency || false}
              onChange={(e) => handleChange('offers_emergency', e.target.checked)}
              className="w-5 h-5 rounded border-[#e85d4c] text-[#e85d4c] focus:ring-[#e85d4c]"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Emergency service (24/7)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.offers_weekend || false}
              onChange={(e) => handleChange('offers_weekend', e.target.checked)}
              className="w-5 h-5 rounded border-[#e85d4c] text-[#e85d4c] focus:ring-[#e85d4c]"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Weekend appointments</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.offers_evening || false}
              onChange={(e) => handleChange('offers_evening', e.target.checked)}
              className="w-5 h-5 rounded border-[#e85d4c] text-[#e85d4c] focus:ring-[#e85d4c]"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Evening appointments</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">Typical response time:</span>
          <select
            value={data.typical_response_time || ''}
            onChange={(e) => handleChange('typical_response_time', e.target.value as ResponseTime)}
            className="
              h-10 px-3
              text-sm
              border border-gray-300 dark:border-gray-600 rounded-lg
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
            "
          >
            <option value="">Select...</option>
            {RESPONSE_TIME_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700" />

      {/* Certifications & Trust */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          CERTIFICATIONS & TRUST
        </h3>

        <div className="space-y-4">
          {/* Gas Safe */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.gas_safe_registered || false}
                onChange={(e) => handleChange('gas_safe_registered', e.target.checked)}
                className="w-5 h-5 rounded border-[#e85d4c] text-[#e85d4c] focus:ring-[#e85d4c]"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Gas Safe Registered
              </span>
            </label>
            {data.gas_safe_registered && (
              <div className="mt-2 ml-8">
                <input
                  type="text"
                  value={data.gas_safe_number || ''}
                  onChange={(e) => handleChange('gas_safe_number', e.target.value)}
                  placeholder="Registration number"
                  className="
                    w-48 h-9 px-3
                    text-sm
                    border border-gray-300 dark:border-gray-600 rounded
                    bg-white dark:bg-gray-800
                    text-gray-900 dark:text-gray-100
                    focus:outline-none focus:ring-1 focus:ring-[#e85d4c]
                  "
                />
              </div>
            )}
          </div>

          {/* Other certifications */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.fgas_certified || false}
              onChange={(e) => handleChange('fgas_certified', e.target.checked)}
              className="w-5 h-5 rounded border-[#e85d4c] text-[#e85d4c] focus:ring-[#e85d4c]"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">F-Gas Certified</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.which_trusted_trader || false}
              onChange={(e) => handleChange('which_trusted_trader', e.target.checked)}
              className="w-5 h-5 rounded border-[#e85d4c] text-[#e85d4c] focus:ring-[#e85d4c]"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Which? Trusted Trader</span>
          </label>

          {/* Checkatrade */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.checkatrade_member || false}
                onChange={(e) => handleChange('checkatrade_member', e.target.checked)}
                className="w-5 h-5 rounded border-[#e85d4c] text-[#e85d4c] focus:ring-[#e85d4c]"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Checkatrade Member</span>
            </label>
            {data.checkatrade_member && (
              <div className="mt-2 ml-8">
                <input
                  type="text"
                  value={data.checkatrade_id || ''}
                  onChange={(e) => handleChange('checkatrade_id', e.target.value)}
                  placeholder="Checkatrade ID"
                  className="
                    w-48 h-9 px-3
                    text-sm
                    border border-gray-300 dark:border-gray-600 rounded
                    bg-white dark:bg-gray-800
                    text-gray-900 dark:text-gray-100
                    focus:outline-none focus:ring-1 focus:ring-[#e85d4c]
                  "
                />
              </div>
            )}
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.trustatrader_member || false}
              onChange={(e) => handleChange('trustatrader_member', e.target.checked)}
              className="w-5 h-5 rounded border-[#e85d4c] text-[#e85d4c] focus:ring-[#e85d4c]"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Trustatrader Member</span>
          </label>

          {/* Insurance */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.public_liability_insurance || false}
                onChange={(e) => handleChange('public_liability_insurance', e.target.checked)}
                className="w-5 h-5 rounded border-[#e85d4c] text-[#e85d4c] focus:ring-[#e85d4c]"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Public Liability Insurance
              </span>
            </label>
            {data.public_liability_insurance && (
              <div className="mt-2 ml-8 flex items-center gap-2">
                <span className="text-sm text-gray-500">Cover amount:</span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
                  <input
                    type="number"
                    min="0"
                    step="100000"
                    value={data.insurance_amount || ''}
                    onChange={(e) => handleChange('insurance_amount', parseFloat(e.target.value) || undefined)}
                    placeholder="2,000,000"
                    className="
                      w-36 h-9 pl-7 pr-3
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
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700" />

      {/* Warranty */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          WARRANTY ON REPAIRS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Warranty on labour:</span>
            <select
              value={data.warranty_on_repairs_months || ''}
              onChange={(e) => handleChange('warranty_on_repairs_months', parseInt(e.target.value, 10) || undefined)}
              className="
                h-10 px-3
                text-sm
                border border-gray-300 dark:border-gray-600 rounded-lg
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
              "
            >
              <option value="">Select...</option>
              {WARRANTY_MONTHS.map((months) => (
                <option key={months} value={months}>
                  {months} month{months > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Warranty on parts:</span>
            <select
              value={data.warranty_on_parts_months || ''}
              onChange={(e) => handleChange('warranty_on_parts_months', parseInt(e.target.value, 10) || undefined)}
              className="
                h-10 px-3
                text-sm
                border border-gray-300 dark:border-gray-600 rounded-lg
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
              "
            >
              <option value="">Select...</option>
              {WARRANTY_MONTHS.map((months) => (
                <option key={months} value={months}>
                  {months} month{months > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.uses_genuine_parts || false}
            onChange={(e) => handleChange('uses_genuine_parts', e.target.checked)}
            className="w-5 h-5 rounded border-[#e85d4c] text-[#e85d4c] focus:ring-[#e85d4c]"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            We use genuine manufacturer parts
          </span>
        </label>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700" />

      {/* Description */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
          Business Description <span className="text-red-500">*</span>
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Tell customers about your experience and services
        </p>

        <textarea
          value={data.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="With over 15 years experience, we provide fast, reliable appliance repairs across Manchester..."
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

export default ProviderStep5Credentials
