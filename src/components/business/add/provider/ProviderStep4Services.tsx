'use client'

/**
 * Provider Form Step 4: Services & Coverage (Spec 03)
 *
 * Appliances repaired, coverage area, and brands serviced.
 */

import { useState } from 'react'
import { SimpleCategoryCheckboxGroup } from '../../shared/CategoryCheckboxGroup'
import { BrandCheckboxGroup } from '../../shared/BrandCheckboxGroup'
import type { ProviderStep4Data, ApplianceCategory, Brand, Place } from '@/types/business'

interface ProviderStep4ServicesProps {
  data: Partial<ProviderStep4Data>
  onChange: (data: Partial<ProviderStep4Data>) => void
  categories: ApplianceCategory[]
  brands: Brand[]
  places: Place[]
  errors?: Record<string, string>
  className?: string
}

const COVERAGE_RADIUS_OPTIONS = [5, 10, 15, 20, 25, 30, 40, 50]

export function ProviderStep4Services({
  data,
  onChange,
  categories,
  brands,
  places,
  errors = {},
  className = '',
}: ProviderStep4ServicesProps) {
  const [coverageType, setCoverageType] = useState<'radius' | 'areas'>(
    data.coverage_place_ids && data.coverage_place_ids.length > 0 ? 'areas' : 'radius'
  )

  const handleCategoriesChange = (categoryIds: string[]) => {
    onChange({ ...data, category_ids: categoryIds })
  }

  const handleRadiusChange = (radius: number) => {
    onChange({
      ...data,
      coverage_radius: radius,
      coverage_place_ids: [],
    })
  }

  const handlePlacesChange = (placeId: string) => {
    const currentIds = data.coverage_place_ids || []
    const newIds = currentIds.includes(placeId)
      ? currentIds.filter((id) => id !== placeId)
      : [...currentIds, placeId]
    onChange({
      ...data,
      coverage_place_ids: newIds,
      coverage_radius: undefined,
    })
  }

  const handleAllBrandsChange = (allBrands: boolean) => {
    onChange({
      ...data,
      services_all_brands: allBrands,
      brand_ids: allBrands ? [] : data.brand_ids,
    })
  }

  const handleBrandsChange = (brandIds: string[]) => {
    onChange({
      ...data,
      brand_ids: brandIds,
      services_all_brands: false,
    })
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Appliances Repaired */}
      <SimpleCategoryCheckboxGroup
        categories={categories}
        selectedIds={data.category_ids || []}
        onChange={handleCategoriesChange}
        label="Appliances You Repair"
        required
        columns={2}
        error={errors.category_ids}
      />

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700" />

      {/* Coverage Area */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
          Coverage Area <span className="text-red-500">*</span>
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Define the area you serve
        </p>

        {/* Coverage type toggle */}
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="coverage_type"
              checked={coverageType === 'radius'}
              onChange={() => setCoverageType('radius')}
              className="
                w-4 h-4
                text-[#e85d4c]
                border-gray-300 dark:border-gray-600
                focus:ring-[#e85d4c]
              "
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              By radius
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="coverage_type"
              checked={coverageType === 'areas'}
              onChange={() => setCoverageType('areas')}
              className="
                w-4 h-4
                text-[#e85d4c]
                border-gray-300 dark:border-gray-600
                focus:ring-[#e85d4c]
              "
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Select specific areas
            </span>
          </label>
        </div>

        {coverageType === 'radius' && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              We cover a radius of
            </span>
            <select
              value={data.coverage_radius || ''}
              onChange={(e) => handleRadiusChange(parseInt(e.target.value, 10))}
              className={`
                h-10 px-3
                text-sm
                border rounded-lg
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
                ${errors.coverage_radius
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
                }
              `}
            >
              <option value="">Select...</option>
              {COVERAGE_RADIUS_OPTIONS.map((radius) => (
                <option key={radius} value={radius}>
                  {radius}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              miles from our base
            </span>
          </div>
        )}

        {coverageType === 'areas' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
            {places.map((place) => (
              <label
                key={place.id}
                className="flex items-center gap-2 cursor-pointer py-1"
              >
                <input
                  type="checkbox"
                  checked={data.coverage_place_ids?.includes(place.id) || false}
                  onChange={() => handlePlacesChange(place.id)}
                  className="
                    w-4 h-4
                    rounded
                    border-[#e85d4c]
                    text-[#e85d4c]
                    focus:ring-[#e85d4c]
                  "
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {place.name}
                </span>
              </label>
            ))}
          </div>
        )}

        {(errors.coverage_radius || errors.coverage_place_ids) && (
          <p className="mt-2 text-sm text-red-500">
            {errors.coverage_radius || errors.coverage_place_ids}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700" />

      {/* Brands Serviced */}
      <BrandCheckboxGroup
        brands={brands}
        selectedIds={data.brand_ids || []}
        onChange={handleBrandsChange}
        label="Brands You Service"
        showAllBrandsOption
        allBrandsSelected={data.services_all_brands || false}
        onAllBrandsChange={handleAllBrandsChange}
        error={errors.brand_ids}
      />
    </div>
  )
}

export default ProviderStep4Services
