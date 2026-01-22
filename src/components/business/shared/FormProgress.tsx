'use client'

/**
 * Form Progress Component (Spec 03)
 *
 * Step indicator for multi-step forms.
 * Shows current step and progress.
 */

import { Check } from 'lucide-react'
import type { FormStep } from '@/types/business'

interface FormProgressProps {
  steps: FormStep[]
  currentStep: number
  className?: string
}

export function FormProgress({ steps, currentStep, className = '' }: FormProgressProps) {
  return (
    <div className={className}>
      {/* Desktop: Full step labels */}
      <div className="hidden sm:block">
        <div className="mb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Step {currentStep} of {steps.length}
          </span>
          <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {steps[currentStep - 1]?.title}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#e85d4c] transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Mobile: Dots */}
      <div className="sm:hidden">
        <div className="flex items-center justify-center gap-2 mb-3">
          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep

            return (
              <div
                key={step.number}
                className={`
                  w-3 h-3 rounded-full
                  transition-all duration-200
                  ${isCompleted
                    ? 'bg-[#e85d4c]'
                    : isCurrent
                      ? 'bg-[#e85d4c] ring-2 ring-[#e85d4c]/30'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }
                `}
                aria-label={`Step ${stepNumber}: ${step.title}${isCurrent ? ' (current)' : isCompleted ? ' (completed)' : ''}`}
              />
            )
          })}
        </div>
        <div className="text-center">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {steps[currentStep - 1]?.title}
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * FormProgressSteps - Alternative step indicator with labels
 */
interface FormProgressStepsProps {
  steps: FormStep[]
  currentStep: number
  className?: string
}

export function FormProgressSteps({ steps, currentStep, className = '' }: FormProgressStepsProps) {
  return (
    <nav className={className} aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isLast = index === steps.length - 1

          return (
            <li
              key={step.number}
              className={`flex items-center ${isLast ? '' : 'flex-1'}`}
            >
              {/* Step circle */}
              <div
                className={`
                  flex items-center justify-center
                  w-8 h-8 rounded-full
                  text-sm font-medium
                  transition-colors
                  ${isCompleted
                    ? 'bg-[#e85d4c] text-white'
                    : isCurrent
                      ? 'bg-[#e85d4c] text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }
                `}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  stepNumber
                )}
              </div>

              {/* Step label (desktop only) */}
              <span className="hidden md:block ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                {step.title}
              </span>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={`
                    flex-1 h-0.5 mx-4
                    ${isCompleted
                      ? 'bg-[#e85d4c]'
                      : 'bg-gray-200 dark:bg-gray-700'
                    }
                  `}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default FormProgress
