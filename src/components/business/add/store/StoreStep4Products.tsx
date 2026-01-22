'use client'

/**
 * Store Form Step 4: Products & Categories (Spec 03)
 *
 * Appliance categories, grades, and brands.
 */

import { CategoryCheckboxGroup } from '../../shared/CategoryCheckboxGroup'
import { GradeCheckboxGroup } from '../../shared/GradeCheckboxGroup'
import { BrandCheckboxGroup } from '../../shared/BrandCheckboxGroup'
import type { StoreStep4Data, CategoryGroup, Brand, GradeLevel } from '@/types/business'

interface StoreStep4ProductsProps {
  data: Partial<StoreStep4Data>
  onChange: (data: Partial<StoreStep4Data>) => void
  categories: CategoryGroup[]
  brands: Brand[]
  errors?: Record<string, string>
  className?: string
}

export function StoreStep4Products({
  data,
  onChange,
  categories,
  brands,
  errors = {},
  className = '',
}: StoreStep4ProductsProps) {
  const handleCategoriesChange = (categoryIds: string[]) => {
    onChange({ ...data, category_ids: categoryIds })
  }

  const handleGradesChange = (grades: GradeLevel[]) => {
    onChange({ ...data, grades_stocked: grades })
  }

  const handleBrandsChange = (brandIds: string[]) => {
    onChange({ ...data, brand_ids: brandIds })
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Categories */}
      <CategoryCheckboxGroup
        categories={categories}
        selectedIds={data.category_ids || []}
        onChange={handleCategoriesChange}
        label="Appliance Categories"
        required
        error={errors.category_ids}
      />

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700" />

      {/* Grades */}
      <GradeCheckboxGroup
        selectedGrades={data.grades_stocked || []}
        onChange={handleGradesChange}
        label="Grades Stocked"
        required
        error={errors.grades_stocked}
      />

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700" />

      {/* Brands */}
      <BrandCheckboxGroup
        brands={brands}
        selectedIds={data.brand_ids || []}
        onChange={handleBrandsChange}
        label="Popular Brands Stocked"
        error={errors.brand_ids}
      />
    </div>
  )
}

export default StoreStep4Products
