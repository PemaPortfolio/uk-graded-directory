'use client'

/**
 * Login Button Component (Spec 04)
 *
 * Auth-aware button that shows login button when logged out,
 * and user menu dropdown when logged in.
 */

import { useAuth } from '@/lib/auth/auth-context'
import { useAuthModal } from '@/hooks/useAuthModal'
import { UserMenu } from '@/components/auth'

export default function LoginButton() {
  const { isAuthenticated, isLoading } = useAuth()
  const { openLogin } = useAuthModal()

  // Show skeleton during loading
  if (isLoading) {
    return (
      <div className="w-20 h-9 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
    )
  }

  // Show user menu when logged in
  if (isAuthenticated) {
    return <UserMenu />
  }

  // Show login button when logged out
  return (
    <button
      onClick={() => openLogin()}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#e85d4c] hover:bg-[#d94f3f] transition-colors rounded-lg"
    >
      Log in
    </button>
  )
}
