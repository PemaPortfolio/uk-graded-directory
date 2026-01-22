'use client'

/**
 * Claim Verification Method Component (Spec 03)
 *
 * Select how to receive the verification code.
 */

import { useState } from 'react'
import { Loader2, Mail, Phone, HelpCircle } from 'lucide-react'
import type { VerificationMethod } from '@/types/business'

interface VerificationOption {
  type: VerificationMethod
  masked?: string
  available: boolean
}

interface ClaimVerificationMethodProps {
  businessName: string
  options: VerificationOption[]
  onSelect: (method: VerificationMethod) => Promise<void>
  className?: string
}

export function ClaimVerificationMethod({
  businessName,
  options,
  onSelect,
  className = '',
}: ClaimVerificationMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!selectedMethod) return

    setIsLoading(true)
    try {
      await onSelect(selectedMethod)
    } finally {
      setIsLoading(false)
    }
  }

  const getIcon = (type: VerificationMethod) => {
    switch (type) {
      case 'email':
        return <Mail className="w-5 h-5" />
      case 'phone':
        return <Phone className="w-5 h-5" />
      case 'manual':
        return <HelpCircle className="w-5 h-5" />
    }
  }

  const getLabel = (type: VerificationMethod) => {
    switch (type) {
      case 'email':
        return 'Email'
      case 'phone':
        return 'Phone (SMS)'
      case 'manual':
        return "I don't have access to these"
    }
  }

  const getDescription = (option: VerificationOption) => {
    if (option.type === 'manual') {
      return 'Request manual verification'
    }
    return option.masked || 'Available'
  }

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Claim {businessName}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          To verify you own this business, we&apos;ll send you a verification code.
        </p>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Choose how to receive your code:
        </p>

        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.type}
              type="button"
              onClick={() => option.available && setSelectedMethod(option.type)}
              disabled={!option.available}
              className={`
                w-full text-left
                p-4
                border-2 rounded-lg
                transition-all
                ${!option.available
                  ? 'opacity-50 cursor-not-allowed border-gray-200 dark:border-gray-700'
                  : selectedMethod === option.type
                    ? 'border-[#e85d4c] bg-blue-50 dark:bg-gray-700'
                    : 'border-gray-200 dark:border-gray-700 hover:border-[#e85d4c] cursor-pointer'
                }
              `}
            >
              <div className="flex items-start gap-3">
                {/* Radio indicator */}
                <div className={`
                  w-5 h-5 mt-0.5 rounded-full border-2 flex-shrink-0
                  flex items-center justify-center
                  ${selectedMethod === option.type
                    ? 'border-[#e85d4c]'
                    : 'border-gray-300 dark:border-gray-600'
                  }
                `}>
                  {selectedMethod === option.type && (
                    <div className="w-3 h-3 rounded-full bg-[#e85d4c]" />
                  )}
                </div>

                {/* Icon */}
                <div className="text-gray-500 dark:text-gray-400">
                  {getIcon(option.type)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {getLabel(option.type)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {getDescription(option)}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!selectedMethod || isLoading}
        className="
          w-full h-12
          bg-[#e85d4c] hover:bg-[#d94f3f]
          text-white font-semibold
          rounded-lg
          transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center gap-2
        "
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Verification Code'
        )}
      </button>
    </div>
  )
}

export default ClaimVerificationMethod
