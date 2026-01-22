'use client'

/**
 * Grade Checkbox Group Component (Spec 03)
 *
 * Checkboxes for grade level selection with descriptions.
 */

import type { GradeLevel } from '@/types/business'

interface GradeOption {
  value: GradeLevel
  label: string
  description: string
}

const GRADE_OPTIONS: GradeOption[] = [
  {
    value: 'A-grade',
    label: 'A-grade',
    description: 'Minor cosmetic imperfections',
  },
  {
    value: 'B-grade',
    label: 'B-grade',
    description: 'Visible marks, fully functional',
  },
  {
    value: 'C-grade',
    label: 'C-grade',
    description: 'Significant cosmetic damage',
  },
  {
    value: 'tatty-packaging',
    label: 'Tatty Packaging',
    description: 'Box damage only, appliance perfect',
  },
  {
    value: 'mixed',
    label: 'Mixed grades',
    description: 'Variety of grades available',
  },
]

interface GradeCheckboxGroupProps {
  selectedGrades: GradeLevel[]
  onChange: (grades: GradeLevel[]) => void
  label?: string
  required?: boolean
  error?: string
  className?: string
}

export function GradeCheckboxGroup({
  selectedGrades,
  onChange,
  label = 'Grades Stocked',
  required = false,
  error,
  className = '',
}: GradeCheckboxGroupProps) {
  const handleToggle = (grade: GradeLevel) => {
    if (selectedGrades.includes(grade)) {
      onChange(selectedGrades.filter((g) => g !== grade))
    } else {
      onChange([...selectedGrades, grade])
    }
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
          <span className="font-normal text-gray-500 dark:text-gray-400 ml-1">
            (select all that apply)
          </span>
        </label>
      )}

      <div className="space-y-2">
        {GRADE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex items-start gap-3 cursor-pointer py-2"
          >
            <input
              type="checkbox"
              checked={selectedGrades.includes(option.value)}
              onChange={() => handleToggle(option.value)}
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
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {option.label}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                — {option.description}
              </span>
            </div>
          </label>
        ))}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export default GradeCheckboxGroup
