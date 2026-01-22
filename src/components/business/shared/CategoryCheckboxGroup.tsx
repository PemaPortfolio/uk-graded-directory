'use client'

/**
 * Category Checkbox Group Component (Spec 03)
 *
 * Grouped checkboxes for appliance category selection.
 */

import type { ApplianceCategory, CategoryGroup } from '@/types/business'

interface CategoryCheckboxGroupProps {
  categories: CategoryGroup[]
  selectedIds: string[]
  onChange: (ids: string[]) => void
  label?: string
  required?: boolean
  error?: string
  className?: string
}

export function CategoryCheckboxGroup({
  categories,
  selectedIds,
  onChange,
  label = 'Appliance Categories',
  required = false,
  error,
  className = '',
}: CategoryCheckboxGroupProps) {
  const handleToggle = (categoryId: string) => {
    if (selectedIds.includes(categoryId)) {
      onChange(selectedIds.filter((id) => id !== categoryId))
    } else {
      onChange([...selectedIds, categoryId])
    }
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="space-y-6">
        {categories.map((group) => (
          <div key={group.name}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              {group.name}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {group.categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-3 cursor-pointer py-1.5"
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(category.id)}
                    onChange={() => handleToggle(category.id)}
                    className="
                      w-5 h-5
                      rounded
                      border-[#e85d4c]
                      text-[#e85d4c]
                      focus:ring-[#e85d4c]
                    "
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

/**
 * Simple flat category list for simpler use cases
 */
interface SimpleCategoryCheckboxGroupProps {
  categories: ApplianceCategory[]
  selectedIds: string[]
  onChange: (ids: string[]) => void
  label?: string
  required?: boolean
  error?: string
  columns?: 1 | 2 | 3
  className?: string
}

export function SimpleCategoryCheckboxGroup({
  categories,
  selectedIds,
  onChange,
  label,
  required = false,
  error,
  columns = 2,
  className = '',
}: SimpleCategoryCheckboxGroupProps) {
  const handleToggle = (categoryId: string) => {
    if (selectedIds.includes(categoryId)) {
      onChange(selectedIds.filter((id) => id !== categoryId))
    } else {
      onChange([...selectedIds, categoryId])
    }
  }

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className={`grid ${gridCols[columns]} gap-2`}>
        {categories.map((category) => (
          <label
            key={category.id}
            className="flex items-center gap-3 cursor-pointer py-1.5"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(category.id)}
              onChange={() => handleToggle(category.id)}
              className="
                w-5 h-5
                rounded
                border-[#e85d4c]
                text-[#e85d4c]
                focus:ring-[#e85d4c]
              "
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {category.name}
            </span>
          </label>
        ))}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export default CategoryCheckboxGroup
