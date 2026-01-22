'use client'

/**
 * Store Form Container (Spec 03)
 *
 * Multi-step form for adding a new store.
 * Handles state management, validation, and submission.
 */

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { FormProgress } from '../../shared/FormProgress'
import { FormNavigation } from '../../shared/FormNavigation'
import { StoreStep1Basic } from './StoreStep1Basic'
import { StoreStep2Contact } from './StoreStep2Contact'
import { StoreStep3Hours } from './StoreStep3Hours'
import { StoreStep4Products } from './StoreStep4Products'
import { StoreStep5Services } from './StoreStep5Services'
import type {
  StoreFormData,
  StoreStep1Data,
  StoreStep2Data,
  StoreStep3Data,
  StoreStep4Data,
  StoreStep5Data,
  FormStep,
  CategoryGroup,
  Brand,
  OperatingHours,
  BUSINESS_FORM_STORAGE_KEY,
} from '@/types/business'

const STORAGE_KEY = 'uk-graded-store-form'

interface StoreFormProps {
  categories: CategoryGroup[]
  brands: Brand[]
  initialData?: Partial<StoreFormData>
  className?: string
}

const STEPS: FormStep[] = [
  { number: 1, title: 'Basic Information' },
  { number: 2, title: 'Contact Details' },
  { number: 3, title: 'Opening Hours' },
  { number: 4, title: 'Products & Categories' },
  { number: 5, title: 'Services & Description' },
]

// Default operating hours
const DEFAULT_HOURS: OperatingHours = {
  monday: { open: '09:00', close: '17:30' },
  tuesday: { open: '09:00', close: '17:30' },
  wednesday: { open: '09:00', close: '17:30' },
  thursday: { open: '09:00', close: '17:30' },
  friday: { open: '09:00', close: '17:30' },
  saturday: { open: '09:00', close: '16:00' },
  sunday: null,
}

// UK postcode regex
const POSTCODE_REGEX = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i

// UK phone regex
const PHONE_REGEX = /^(\+44\s?|0)(\d{2,4}\s?\d{3,4}\s?\d{3,4}|\d{10,11})$/

// Email regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function StoreForm({
  categories,
  brands,
  initialData,
  className = '',
}: StoreFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize form data from sessionStorage or props
  const [formData, setFormData] = useState<Partial<StoreFormData>>(() => {
    // First check for initial data from URL params
    const name = searchParams.get('name')
    const postcode = searchParams.get('postcode')
    const prefilled: Partial<StoreFormData> = {}
    if (name) prefilled.business_name = name
    if (postcode) prefilled.postcode = postcode.toUpperCase()

    // Check sessionStorage
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          return { ...parsed, ...prefilled }
        } catch {
          // Ignore parse errors
        }
      }
    }

    return {
      ...initialData,
      ...prefilled,
      operating_hours: DEFAULT_HOURS,
    }
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Save to sessionStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    }
  }, [formData])

  // Validation functions for each step
  const validateStep1 = useCallback((): Record<string, string> => {
    const errs: Record<string, string> = {}

    if (!formData.business_name?.trim()) {
      errs.business_name = 'Business name is required'
    } else if (formData.business_name.trim().length < 2) {
      errs.business_name = 'Business name must be at least 2 characters'
    }

    if (!formData.address_line1?.trim()) {
      errs.address_line1 = 'Address is required'
    } else if (formData.address_line1.trim().length < 5) {
      errs.address_line1 = 'Address must be at least 5 characters'
    }

    if (!formData.city_name?.trim()) {
      errs.city_name = 'City is required'
    }

    if (!formData.postcode?.trim()) {
      errs.postcode = 'Postcode is required'
    } else if (!POSTCODE_REGEX.test(formData.postcode.trim())) {
      errs.postcode = 'Please enter a valid UK postcode'
    }

    return errs
  }, [formData])

  const validateStep2 = useCallback((): Record<string, string> => {
    const errs: Record<string, string> = {}

    if (!formData.phone?.trim()) {
      errs.phone = 'Phone number is required'
    } else if (!PHONE_REGEX.test(formData.phone.trim().replace(/\s/g, ''))) {
      errs.phone = 'Please enter a valid UK phone number'
    }

    if (!formData.email?.trim()) {
      errs.email = 'Email is required'
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address'
    }

    if (formData.website && !formData.website.match(/^https?:\/\//)) {
      errs.website = 'Website must start with http:// or https://'
    }

    if (formData.google_maps_url && !formData.google_maps_url.includes('google.com/maps') && !formData.google_maps_url.includes('goo.gl/maps')) {
      errs.google_maps_url = 'Please enter a valid Google Maps URL'
    }

    return errs
  }, [formData])

  const validateStep3 = useCallback((): Record<string, string> => {
    const errs: Record<string, string> = {}
    const hours = formData.operating_hours

    if (!hours) {
      errs.operating_hours = 'Please set your opening hours'
      return errs
    }

    // Check that at least one day is open
    const hasOpenDay = Object.values(hours).some((day) => day !== null)
    if (!hasOpenDay) {
      errs.operating_hours = 'At least one day must be open'
    }

    return errs
  }, [formData])

  const validateStep4 = useCallback((): Record<string, string> => {
    const errs: Record<string, string> = {}

    if (!formData.category_ids || formData.category_ids.length === 0) {
      errs.category_ids = 'Please select at least one appliance category'
    }

    if (!formData.grades_stocked || formData.grades_stocked.length === 0) {
      errs.grades_stocked = 'Please select at least one grade'
    }

    return errs
  }, [formData])

  const validateStep5 = useCallback((): Record<string, string> => {
    const errs: Record<string, string> = {}

    if (formData.offers_repair_service === undefined) {
      errs.offers_repair_service = 'Please indicate if you offer repair services'
    }

    if (!formData.description?.trim()) {
      errs.description = 'Description is required'
    } else if (formData.description.trim().length < 50) {
      errs.description = 'Description must be at least 50 characters'
    } else if (formData.description.trim().length > 500) {
      errs.description = 'Description must not exceed 500 characters'
    }

    return errs
  }, [formData])

  // Validate current step
  const validateCurrentStep = (): boolean => {
    let stepErrors: Record<string, string> = {}

    switch (currentStep) {
      case 1:
        stepErrors = validateStep1()
        break
      case 2:
        stepErrors = validateStep2()
        break
      case 3:
        stepErrors = validateStep3()
        break
      case 4:
        stepErrors = validateStep4()
        break
      case 5:
        stepErrors = validateStep5()
        break
    }

    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  // Handle next step
  const handleNext = async () => {
    if (!validateCurrentStep()) return

    if (currentStep === STEPS.length) {
      // Submit form
      await handleSubmit()
    } else {
      setCurrentStep(currentStep + 1)
      setErrors({})
    }
  }

  // Handle back step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // In a real implementation, this would submit to an API
      // For now, we'll simulate a delay and redirect
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Clear sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(STORAGE_KEY)
      }

      // Redirect to verification page
      router.push('/business/add/store/verify')
    } catch (error) {
      console.error('Submission error:', error)
      setErrors({ submit: 'An error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update form data for each step
  const updateStep1Data = (data: Partial<StoreStep1Data>) => {
    setFormData({ ...formData, ...data })
  }

  const updateStep2Data = (data: Partial<StoreStep2Data>) => {
    setFormData({ ...formData, ...data })
  }

  const updateStep3Data = (data: Partial<StoreStep3Data>) => {
    setFormData({ ...formData, ...data })
  }

  const updateStep4Data = (data: Partial<StoreStep4Data>) => {
    setFormData({ ...formData, ...data })
  }

  const updateStep5Data = (data: Partial<StoreStep5Data>) => {
    setFormData({ ...formData, ...data })
  }

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Progress */}
      <FormProgress steps={STEPS} currentStep={currentStep} className="mb-8" />

      {/* Form Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        {currentStep === 1 && (
          <StoreStep1Basic
            data={formData}
            onChange={updateStep1Data}
            errors={errors}
          />
        )}

        {currentStep === 2 && (
          <StoreStep2Contact
            data={formData}
            onChange={updateStep2Data}
            errors={errors}
          />
        )}

        {currentStep === 3 && (
          <StoreStep3Hours
            data={formData}
            onChange={updateStep3Data}
            errors={errors}
          />
        )}

        {currentStep === 4 && (
          <StoreStep4Products
            data={formData}
            onChange={updateStep4Data}
            categories={categories}
            brands={brands}
            errors={errors}
          />
        )}

        {currentStep === 5 && (
          <StoreStep5Services
            data={formData}
            onChange={updateStep5Data}
            errors={errors}
          />
        )}

        {/* Global Error */}
        {errors.submit && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
          </div>
        )}

        {/* Navigation */}
        <FormNavigation
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onBack={handleBack}
          onNext={handleNext}
          isSubmitting={isSubmitting}
          className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
        />
      </div>

      {/* Back Link (first step only) */}
      {currentStep === 1 && (
        <div className="mt-6 text-center">
          <Link
            href="/business/add/store/lookup"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#e85d4c] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to search
          </Link>
        </div>
      )}
    </div>
  )
}

export default StoreForm
