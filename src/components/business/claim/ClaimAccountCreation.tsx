'use client'

/**
 * Claim Account Creation Component (Spec 03)
 *
 * Create account form after verification.
 */

import { useState } from 'react'
import Link from 'next/link'
import { Loader2, Eye, EyeOff } from 'lucide-react'

interface ClaimAccountCreationProps {
  verifiedEmail: string
  onComplete: (data: { name: string; password: string }) => Promise<void>
  className?: string
}

export function ClaimAccountCreation({
  verifiedEmail,
  onComplete,
  className = '',
}: ClaimAccountCreationProps) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (): boolean => {
    const errs: Record<string, string> = {}

    if (!name.trim()) {
      errs.name = 'Name is required'
    } else if (name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters'
    }

    if (!password) {
      errs.password = 'Password is required'
    } else if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters'
    }

    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match'
    }

    if (!agreedToTerms) {
      errs.terms = 'You must agree to the terms'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsLoading(true)
    try {
      await onComplete({ name: name.trim(), password })
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Create your account
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          You&apos;ll use this to manage your business listing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email (read-only) */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={verifiedEmail}
            readOnly
            className="
              w-full h-12 px-4
              text-base
              border border-gray-300 dark:border-gray-600 rounded-lg
              bg-gray-100 dark:bg-gray-700
              text-gray-700 dark:text-gray-300
              cursor-not-allowed
            "
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Pre-filled — this is the email you verified
          </p>
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (errors.name) setErrors({ ...errors, name: '' })
            }}
            placeholder="John Smith"
            className={`
              w-full h-12 px-4
              text-base
              border rounded-lg
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-400
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
              ${errors.name
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-[#e85d4c]'
              }
            `}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors({ ...errors, password: '' })
              }}
              placeholder="Min 8 characters"
              className={`
                w-full h-12 px-4 pr-12
                text-base
                border rounded-lg
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                placeholder-gray-400
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
                ${errors.password
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:border-[#e85d4c]'
                }
              `}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
              "
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' })
            }}
            placeholder="Confirm your password"
            className={`
              w-full h-12 px-4
              text-base
              border rounded-lg
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-400
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-[#e85d4c]/50
              ${errors.confirmPassword
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-[#e85d4c]'
              }
            `}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Terms checkbox */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked)
                if (errors.terms) setErrors({ ...errors, terms: '' })
              }}
              className="
                mt-0.5
                w-5 h-5
                rounded
                border-[#e85d4c]
                text-[#e85d4c]
                focus:ring-[#e85d4c]
              "
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              I agree to the{' '}
              <Link href="/terms" className="text-[#e85d4c] hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-[#e85d4c] hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && (
            <p className="mt-1 ml-8 text-sm text-red-500">{errors.terms}</p>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
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
              Creating Account...
            </>
          ) : (
            'Complete Claim'
          )}
        </button>
      </form>

      {/* Login link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-[#e85d4c] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ClaimAccountCreation
