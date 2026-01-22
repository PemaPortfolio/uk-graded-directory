'use client'

/**
 * Provider Form Container (Spec 03)
 *
 * Multi-step form for adding a new service provider.
 */

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { FormProgress } from '../../shared/FormProgress'
import { FormNavigation } from '../../shared/FormNavigation'
import { ProviderStep1Basic } from './ProviderStep1Basic'
import { ProviderStep2Contact } from './ProviderStep2Contact'
import { ProviderStep3Hours } from './ProviderStep3Hours'
import { ProviderStep4Services } from './ProviderStep4Services'
import { ProviderStep5Credentials } from './ProviderStep5Credentials'
import type {
  ProviderFormData,
  ProviderStep1Data,
  ProviderStep2Data,
  ProviderStep3Data,
  ProviderStep4Data,
  ProviderStep5Data,
  FormStep,
  ApplianceCategory,
  Brand,
  Place,
  OperatingHours,
} from '@/types/business'

const STORAGE_KEY = 'uk-graded-provider-form'

interface ProviderFormProps {
  categories: ApplianceCategory[]
  brands: Brand[]
  places: Place[]
  initialData?: Partial<ProviderFormData>
  className?: string
}

const STEPS: FormStep[] = [
  { number: 1, title: 'Basic Information' },
  { number: 2, title: 'Contact Details' },
  { number: 3, title: 'Opening Hours' },
  { number: 4, title: 'Services & Coverage' },
  { number: 5, title: 'Credentials & Description' },
]

// Default operating hours
const DEFAULT_HOURS: OperatingHours = {
  monday: { open: '08:00', close: '18:00' },
  tuesday: { open: '08:00', close: '18:00' },
  wednesday: { open: '08:00', close: '18:00' },
  thursday: { open: '08:00', close: '18:00' },
  friday: { open: '08:00', close: '18:00' },
  saturday: { open: '09:00', close: '14:00' },
  sunday: null,
}

// Validation patterns
const POSTCODE_REGEX = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i
const PHONE_REGEX = /^(\+44\s?|0)(\d{2,4}\s?\d{3,4}\s?\d{3,4}|\d{10,11})$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ProviderForm({
  categories,
  brands,
  places,
  initialData,
  className = '',
}: ProviderFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize form data
  const [formData, setFormData] = useState<Partial<ProviderFormData>>(() => {
    const name = searchParams.get('name')
    const postcode = searchParams.get('postcode')
    const prefilled: Partial<ProviderFormData> = {}
    if (name) prefilled.name = name
    if (postcode) prefilled.postcode = postcode.toUpperCase()

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
      services_all_brands: false,
    }
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Save to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    }
  }, [formData])

  // Validation functions
  const validateStep1 = useCallback((): Record<string, string> => {
    const errs: Record<string, string> = {}
    if (!formData.name?.trim()) errs.name = 'Business name is required'
    else if (formData.name.trim().length < 2) errs.name = 'Business name must be at least 2 characters'
    if (!formData.address_line1?.trim()) errs.address_line1 = 'Address is required'
    if (!formData.city_name?.trim()) errs.city_name = 'City is required'
    if (!formData.postcode?.trim()) errs.postcode = 'Postcode is required'
    else if (!POSTCODE_REGEX.test(formData.postcode.trim())) errs.postcode = 'Invalid UK postcode'
    return errs
  }, [formData])

  const validateStep2 = useCallback((): Record<string, string> => {
    const errs: Record<string, string> = {}
    if (!formData.phone?.trim()) errs.phone = 'Phone number is required'
    else if (!PHONE_REGEX.test(formData.phone.trim().replace(/\s/g, ''))) errs.phone = 'Invalid UK phone'
    if (!formData.email?.trim()) errs.email = 'Email is required'
    else if (!EMAIL_REGEX.test(formData.email.trim())) errs.email = 'Invalid email address'
    if (formData.website && !formData.website.match(/^https?:\/\//)) errs.website = 'Must include http:// or https://'
    return errs
  }, [formData])

  const validateStep3 = useCallback((): Record<string, string> => {
    const errs: Record<string, string> = {}
    const hours = formData.operating_hours
    if (!hours) {
      errs.operating_hours = 'Please set your opening hours'
      return errs
    }
    const hasOpenDay = Object.values(hours).some((day) => day !== null)
    if (!hasOpenDay) errs.operating_hours = 'At least one day must be open'
    return errs
  }, [formData])

  const validateStep4 = useCallback((): Record<string, string> => {
    const errs: Record<string, string> = {}
    if (!formData.category_ids || formData.category_ids.length === 0) {
      errs.category_ids = 'Select at least one appliance type'
    }
    if (!formData.coverage_radius && (!formData.coverage_place_ids || formData.coverage_place_ids.length === 0)) {
      errs.coverage_radius = 'Please specify your coverage area'
    }
    return errs
  }, [formData])

  const validateStep5 = useCallback((): Record<string, string> => {
    const errs: Record<string, string> = {}
    if (!formData.description?.trim()) errs.description = 'Description is required'
    else if (formData.description.trim().length < 50) errs.description = 'Minimum 50 characters'
    else if (formData.description.trim().length > 500) errs.description = 'Maximum 500 characters'
    return errs
  }, [formData])

  const validateCurrentStep = (): boolean => {
    let stepErrors: Record<string, string> = {}
    switch (currentStep) {
      case 1: stepErrors = validateStep1(); break
      case 2: stepErrors = validateStep2(); break
      case 3: stepErrors = validateStep3(); break
      case 4: stepErrors = validateStep4(); break
      case 5: stepErrors = validateStep5(); break
    }
    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const handleNext = async () => {
    if (!validateCurrentStep()) return
    if (currentStep === STEPS.length) {
      await handleSubmit()
    } else {
      setCurrentStep(currentStep + 1)
      setErrors({})
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(STORAGE_KEY)
      }
      router.push('/business/add/provider/verify')
    } catch (error) {
      console.error('Submission error:', error)
      setErrors({ submit: 'An error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateStep1Data = (data: Partial<ProviderStep1Data>) => setFormData({ ...formData, ...data })
  const updateStep2Data = (data: Partial<ProviderStep2Data>) => setFormData({ ...formData, ...data })
  const updateStep3Data = (data: Partial<ProviderStep3Data>) => setFormData({ ...formData, ...data })
  const updateStep4Data = (data: Partial<ProviderStep4Data>) => setFormData({ ...formData, ...data })
  const updateStep5Data = (data: Partial<ProviderStep5Data>) => setFormData({ ...formData, ...data })

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <FormProgress steps={STEPS} currentStep={currentStep} className="mb-8" />

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        {currentStep === 1 && (
          <ProviderStep1Basic data={formData} onChange={updateStep1Data} errors={errors} />
        )}
        {currentStep === 2 && (
          <ProviderStep2Contact data={formData} onChange={updateStep2Data} errors={errors} />
        )}
        {currentStep === 3 && (
          <ProviderStep3Hours data={formData} onChange={updateStep3Data} errors={errors} />
        )}
        {currentStep === 4 && (
          <ProviderStep4Services
            data={formData}
            onChange={updateStep4Data}
            categories={categories}
            brands={brands}
            places={places}
            errors={errors}
          />
        )}
        {currentStep === 5 && (
          <ProviderStep5Credentials data={formData} onChange={updateStep5Data} errors={errors} />
        )}

        {errors.submit && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
          </div>
        )}

        <FormNavigation
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onBack={handleBack}
          onNext={handleNext}
          isSubmitting={isSubmitting}
          className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
        />
      </div>

      {currentStep === 1 && (
        <div className="mt-6 text-center">
          <Link
            href="/business/add/provider/lookup"
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

export default ProviderForm
