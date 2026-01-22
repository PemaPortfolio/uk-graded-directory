'use client'

/**
 * Form Navigation Component (Spec 03)
 *
 * Back and Continue/Submit buttons for multi-step forms.
 */

import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'

interface FormNavigationProps {
  currentStep: number
  totalSteps: number
  onBack: () => void
  onNext: () => void
  isSubmitting?: boolean
  submitLabel?: string
  nextLabel?: string
  backLabel?: string
  className?: string
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  isSubmitting = false,
  submitLabel = 'Submit for Review',
  nextLabel = 'Continue',
  backLabel = 'Back',
  className = '',
}: FormNavigationProps) {
  const isLastStep = currentStep === totalSteps
  const isFirstStep = currentStep === 1

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      {/* Back Button */}
      {!isFirstStep && (
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="
            flex items-center gap-2
            px-4 py-2.5
            text-sm font-medium
            text-gray-700 dark:text-gray-300
            bg-white dark:bg-gray-800
            border border-gray-300 dark:border-gray-600
            rounded-lg
            hover:bg-gray-50 dark:hover:bg-gray-700
            transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </button>
      )}

      {/* Spacer when no back button */}
      {isFirstStep && <div />}

      {/* Next/Submit Button */}
      <button
        type="button"
        onClick={onNext}
        disabled={isSubmitting}
        className="
          flex items-center justify-center gap-2
          px-6 py-2.5
          text-sm font-semibold
          text-white
          bg-[#e85d4c] hover:bg-[#d94f3f]
          rounded-lg
          transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          min-w-[120px]
        "
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : isLastStep ? (
          submitLabel
        ) : (
          <>
            {nextLabel}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  )
}

/**
 * StickyFormNavigation - Mobile-friendly sticky navigation
 */
interface StickyFormNavigationProps extends FormNavigationProps {}

export function StickyFormNavigation(props: StickyFormNavigationProps) {
  return (
    <div className="
      fixed bottom-0 left-0 right-0
      bg-white dark:bg-gray-900
      border-t border-gray-200 dark:border-gray-700
      p-4
      md:static md:border-0 md:p-0 md:mt-8
    ">
      <div className="max-w-lg mx-auto">
        <FormNavigation {...props} />
      </div>
    </div>
  )
}

export default FormNavigation
