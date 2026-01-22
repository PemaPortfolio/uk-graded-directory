'use client'

/**
 * Login Page (Spec 04)
 *
 * Fallback login page for when modal is not available.
 * Also shows when user is redirected from protected routes.
 */

import { Suspense, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'
import { LoginForm } from '@/components/auth/LoginForm'
import Logo from '@/components/layout/Logo'

function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, isLoading } = useAuth()

  const errorMessage = searchParams.get('error')
  const returnTo = searchParams.get('returnTo') || '/dashboard'

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push(returnTo)
    }
  }, [isAuthenticated, isLoading, router, returnTo])

  const handleSuccess = () => {
    router.push(returnTo)
  }

  // Don't render form if already authenticated
  if (isAuthenticated && !isLoading) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f6f6] dark:bg-[#0f0d0d] p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex justify-center mb-8">
          <Logo />
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          {/* Error from OAuth or redirect */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{decodeURIComponent(errorMessage)}</span>
            </div>
          )}

          <LoginForm onSuccess={handleSuccess} />
        </div>

        {/* Home Link */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">
            &larr; Back to UK Graded Appliances
          </Link>
        </p>
      </div>
    </div>
  )
}

function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f6f6] dark:bg-[#0f0d0d]">
      <Loader2 className="w-8 h-8 animate-spin text-[#e85d4c]" />
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginPageContent />
    </Suspense>
  )
}
