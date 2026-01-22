'use client'

/**
 * Brand Checkbox Group Component (Spec 03)
 *
 * Checkboxes for brand selection.
 */

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { Brand } from '@/types/business'

interface BrandCheckboxGroupProps {
  brands: Brand[]
  selectedIds: string[]
  onChange: (ids: string[]) => void
  label?: string
  showAllBrandsOption?: boolean
  allBrandsSelected?: boolean
  onAllBrandsChange?: (selected: boolean) => void
  error?: string
  className?: string
}

export function BrandCheckboxGroup({
  brands,
  selectedIds,
  onChange,
  label = 'Popular Brands Stocked',
  showAllBrandsOption = false,
  allBrandsSelected = false,
  onAllBrandsChange,
  error,
  className = '',
}: BrandCheckboxGroupProps) {
  const [showAll, setShowAll] = useState(false)

  // Show first 12 brands initially, all when expanded
  const visibleBrands = showAll ? brands : brands.slice(0, 12)
  const hasMoreBrands = brands.length > 12

  const handleToggle = (brandId: string) => {
    if (selectedIds.includes(brandId)) {
      onChange(selectedIds.filter((id) => id !== brandId))
    } else {
      onChange([...selectedIds, brandId])
    }
  }

  const handleAllBrandsToggle = () => {
    if (onAllBrandsChange) {
      onAllBrandsChange(!allBrandsSelected)
      // Clear individual selections when "All brands" is selected
      if (!allBrandsSelected) {
        onChange([])
      }
    }
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          {label}
          <span className="font-normal text-gray-500 dark:text-gray-400 ml-1">
            (optional)
          </span>
        </label>
      )}

      {/* All brands option */}
      {showAllBrandsOption && (
        <div className="mb-4">
          <label className="flex items-center gap-3 cursor-pointer py-1.5">
            <input
              type="checkbox"
              checked={allBrandsSelected}
              onChange={handleAllBrandsToggle}
              className="
                w-5 h-5
                rounded
                border-[#e85d4c]
                text-[#e85d4c]
                focus:ring-[#e85d4c]
              "
            />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              All brands
            </span>
          </label>

          {allBrandsSelected && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 pl-8">
              We service all major appliance brands.
            </p>
          )}

          <div className="my-3 border-t border-gray-200 dark:border-gray-700" />

          {!allBrandsSelected && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Or select specific brands:
            </p>
          )}
        </div>
      )}

      {/* Brand checkboxes */}
      {(!showAllBrandsOption || !allBrandsSelected) && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {visibleBrands.map((brand) => (
              <label
                key={brand.id}
                className="flex items-center gap-2 cursor-pointer py-1"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(brand.id)}
                  onChange={() => handleToggle(brand.id)}
                  className="
                    w-4 h-4
                    rounded
                    border-[#e85d4c]
                    text-[#e85d4c]
                    focus:ring-[#e85d4c]
                  "
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {brand.name}
                </span>
              </label>
            ))}
          </div>

          {/* Show more/less toggle */}
          {hasMoreBrands && (
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="
                mt-3
                flex items-center gap-1
                text-sm text-[#e85d4c] hover:text-[#d94f3f]
                transition-colors
              "
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Show fewer brands
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Show all {brands.length} brands
                </>
              )}
            </button>
          )}
        </>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export default BrandCheckboxGroup
