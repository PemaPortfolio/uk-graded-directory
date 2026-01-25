'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import SearchBar from '@/components/search/SearchBar'
import BusinessMenu from '@/components/nav/BusinessMenu'
import StoresMenu from '@/components/nav/StoresMenu'
import RepairsMenu from '@/components/nav/RepairsMenu'
import GuidesMenu from '@/components/nav/GuidesMenu'
import MobileMenuToggle from '@/components/nav/MobileMenuToggle'
import MobileMenu from '@/components/nav/MobileMenu'
import LoginButton from '@/components/nav/LoginButton'

/**
 * Header/Navbar Component (Spec 02, 03, 04, 23)
 *
 * Layout varies based on page:
 *
 * Homepage:
 * - Search bar HIDDEN (hero has search)
 * - Nav centered between logo and login
 *
 * Other pages:
 * - Search bar VISIBLE in center
 * - Nav right-aligned with login
 *
 * Mobile (<md):
 * - Hamburger menu instead of dropdowns
 *
 * Sticky on scroll with backdrop blur.
 */
export default function Header() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 relative">
            {/* Logo - always left */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {isHomepage ? (
              /* Homepage layout: centered nav */
              <>
                {/* Desktop Nav - Centered */}
                <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                  <StoresMenu />
                  <RepairsMenu />
                  <GuidesMenu />
                  <BusinessMenu />
                </nav>

                {/* Right side: Login */}
                <div className="flex items-center gap-2 ml-auto">
                  <div className="hidden md:block">
                    <LoginButton />
                  </div>
                  <MobileMenuToggle
                    isOpen={isMobileMenuOpen}
                    onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  />
                </div>
              </>
            ) : (
              /* Non-homepage layout: search center, nav + login right */
              <>
                {/* Search Bar - Center (hidden on mobile, shown separately below) */}
                <div className="hidden md:block flex-1 max-w-xl mx-8">
                  <SearchBar />
                </div>

                {/* Desktop Nav + Login - Right aligned */}
                <div className="hidden md:flex items-center gap-1 ml-auto">
                  <StoresMenu />
                  <RepairsMenu />
                  <GuidesMenu />
                  <BusinessMenu />
                  <LoginButton />
                </div>

                {/* Mobile: Login + Hamburger */}
                <div className="flex items-center gap-2 ml-auto md:hidden">
                  <MobileMenuToggle
                    isOpen={isMobileMenuOpen}
                    onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  />
                </div>
              </>
            )}
          </div>

          {/* Mobile Search - Hidden on homepage */}
          {!isHomepage && (
            <div className="md:hidden pb-3">
              <SearchBar />
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}
