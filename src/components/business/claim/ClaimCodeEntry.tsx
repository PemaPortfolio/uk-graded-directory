'use client'

/**
 * Claim Code Entry Component (Spec 03)
 *
 * 6-digit verification code input.
 */

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'

interface ClaimCodeEntryProps {
  maskedContact: string
  method: 'email' | 'phone'
  expiresAt: string
  onVerify: (code: string) => Promise<{ success: boolean; error?: string }>
  onResend: () => Promise<void>
  onChangeMethod: () => void
  className?: string
}

const CODE_LENGTH = 6
const RESEND_COOLDOWN = 60 // seconds

export function ClaimCodeEntry({
  maskedContact,
  method,
  expiresAt,
  onVerify,
  onResend,
  onChangeMethod,
  className = '',
}: ClaimCodeEntryProps) {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resendCooldown, setResendCooldown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Initialize resend cooldown
  useEffect(() => {
    setResendCooldown(RESEND_COOLDOWN)
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, '').slice(-1)

    const newDigits = [...digits]
    newDigits[index] = digit
    setDigits(newDigits)
    setError(null)

    // Auto-advance to next input
    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when complete
    if (digit && index === CODE_LENGTH - 1) {
      const code = newDigits.join('')
      if (code.length === CODE_LENGTH) {
        handleVerify(code)
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH)

    if (pastedData) {
      const newDigits = Array(CODE_LENGTH).fill('')
      pastedData.split('').forEach((digit, i) => {
        if (i < CODE_LENGTH) newDigits[i] = digit
      })
      setDigits(newDigits)

      // Focus appropriate input
      const nextEmpty = newDigits.findIndex((d) => !d)
      if (nextEmpty >= 0) {
        inputRefs.current[nextEmpty]?.focus()
      } else {
        inputRefs.current[CODE_LENGTH - 1]?.focus()
        // Auto-submit if complete
        if (pastedData.length === CODE_LENGTH) {
          handleVerify(pastedData)
        }
      }
    }
  }

  const handleVerify = async (code: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await onVerify(code)
      if (!result.success) {
        setError(result.error || 'Incorrect code. Please try again.')
        // Clear the code
        setDigits(Array(CODE_LENGTH).fill(''))
        inputRefs.current[0]?.focus()
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendCooldown > 0) return

    try {
      await onResend()
      setResendCooldown(RESEND_COOLDOWN)
      setDigits(Array(CODE_LENGTH).fill(''))
      inputRefs.current[0]?.focus()
    } catch {
      setError('Failed to resend code. Please try again.')
    }
  }

  const methodLabel = method === 'email' ? 'email' : 'SMS'

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Enter your verification code
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          We sent a 6-digit code to {maskedContact}
        </p>
      </div>

      {/* Code Input */}
      <div className="flex justify-center gap-2 mb-6">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            disabled={isLoading}
            className={`
              w-12 h-14
              text-center text-xl font-semibold
              border-2 rounded-lg
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
              disabled:opacity-50
              ${error
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-[#e85d4c]'
              }
            `}
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-center text-sm text-red-500 mb-4">{error}</p>
      )}

      {/* Resend link */}
      <div className="text-center mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Didn&apos;t receive it?{' '}
          {resendCooldown > 0 ? (
            <span className="text-gray-400">
              Resend code (available in {resendCooldown}s)
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-[#e85d4c] hover:underline"
            >
              Resend code
            </button>
          )}
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={() => handleVerify(digits.join(''))}
        disabled={digits.some((d) => !d) || isLoading}
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
            Verifying...
          </>
        ) : (
          'Verify & Claim'
        )}
      </button>

      {/* Change method link */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onChangeMethod}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#e85d4c] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Use a different method
        </button>
      </div>
    </div>
  )
}

export default ClaimCodeEntry
