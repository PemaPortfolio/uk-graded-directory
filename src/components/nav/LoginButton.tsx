'use client'

import Link from 'next/link'
import { User } from 'lucide-react'

/**
 * Login Button Component (Spec 04)
 *
 * Simple login button that links to auth modal/page.
 * Will be enhanced with actual auth state later.
 */
export default function LoginButton() {
  // TODO: Check auth state and show user menu if logged in
  const isLoggedIn = false

  if (isLoggedIn) {
    return (
      <Link
        href="/account"
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#e85d4c] transition-colors rounded-lg hover:bg-gray-100"
      >
        <User className="w-4 h-4" />
        Account
      </Link>
    )
  }

  return (
    <Link
      href="/login"
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#e85d4c] hover:bg-[#d94f3f] transition-colors rounded-lg"
    >
      Log in
    </Link>
  )
}
