'use client'

import { usePathname } from 'next/navigation'
import Logo from './Logo'
import SearchBar from '@/components/search/SearchBar'
import BusinessMenu from '@/components/nav/BusinessMenu'
import LoginButton from '@/components/nav/LoginButton'

/**
 * Header/Navbar Component (Spec 02, 03, 04)
 *
 * Layout: [Logo] [Search Bar] [For Business ▼] [Login]
 *
 * Conditional behavior:
 * - Homepage: Search bar HIDDEN (hero has search)
 * - All other pages: Search bar VISIBLE
 *
 * Sticky on scroll with backdrop blur.
 */
export default function Header() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Search Bar - Hidden on homepage */}
          {!isHomepage && (
            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <SearchBar />
            </div>
          )}

          {/* Right side: Business Menu + Login */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <BusinessMenu />
            </div>
            <LoginButton />
          </div>
        </div>

        {/* Mobile Search - Hidden on homepage */}
        {!isHomepage && (
          <div className="md:hidden pb-3">
            <SearchBar />
          </div>
        )}
      </div>
    </header>
  )
}
