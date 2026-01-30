'use client'

import Link from 'next/link'
import { SearchBar } from '@/components/search'
import { ShieldCheck, TrendingUp, MapPin } from 'lucide-react'
import UKCityscape from './UKCityscape'

interface HeroStats {
  stores: number
  cities: number
  savings: string
}

interface HeroSectionProps {
  stats: HeroStats
}

/**
 * Hero Section (Spec 12 - Section 2)
 *
 * UPGRADED with bold "Warm Industrial" aesthetic:
 * - Gradient mesh background with subtle grid pattern
 * - Staggered reveal animations
 * - Floating stats cards with depth
 * - Bold typography with gradient accents
 * - UK cityscape silhouette at bottom for immersive "above the city" feel
 */
export default function HeroSection({ stats }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-hero bg-grid-pattern pb-32 lg:pb-40">
      {/* Subtle decorative gradient orb - reduced opacity for cleaner look with cityscape */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232, 93, 76, 0.3) 0%, transparent 70%)' }}
      />

      {/* UK Cityscape silhouette - positioned higher to appear behind content */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0 h-[70%] lg:h-[80%]">
        <UKCityscape className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Trust Badge - animated entry */}
            <div className="animate-fade-up opacity-0 stagger-1">
              <span className="inline-flex items-center gap-2 hero-trust-pill px-4 py-2 rounded-full text-sm font-semibold text-[#e85d4c] border border-[#e85d4c]/20">
                <span className="w-2 h-2 rounded-full bg-[#e85d4c] animate-pulse" />
                UK&apos;s #1 Graded Appliance Directory
              </span>
            </div>

            {/* H1 - bold typography with gradient accent */}
            <div className="animate-fade-up opacity-0 stagger-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#181111] leading-[1.1] tracking-tight">
                Find{' '}
                <span className="relative">
                  <span className="text-gradient">Graded Appliances</span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#e85d4c]/20"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,8 Q50,0 100,8 T200,8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <br />
                Near You
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-[#6b7280] max-w-xl animate-fade-up opacity-0 stagger-3">
              Save <span className="font-semibold text-[#181111]">30-70%</span> on ex-display, B-grade and factory seconds from verified UK retailers.
            </p>

            {/* Floating Search Container */}
            <div className="hero-search-container max-w-2xl animate-fade-up opacity-0 stagger-4 relative z-20">
              <SearchBar
                variant="hero"
                placeholder="Search appliances, stores, repairs..."
                showFilters={true}
              />

              {/* Quick Category Links - moved inside container */}
              <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-gray-100/50">
                <span className="text-[#6b7280] text-sm font-medium">Popular:</span>
                {[
                  { name: 'Washing Machines', href: '/washing-machines' },
                  { name: 'Fridges', href: '/fridge-freezers' },
                  { name: 'Ovens', href: '/ovens-cookers' },
                  { name: 'Dishwashers', href: '/dishwashers' },
                ].map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="px-3 py-1.5 text-sm text-[#181111] bg-white/70 hover:bg-white border border-[#ebe5e5]/70 rounded-full transition-all duration-200 hover:border-[#e85d4c]/30 hover:shadow-sm"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Repair Hook */}
            <div className="text-[#6b7280] text-sm animate-fade-up opacity-0 stagger-5">
              Need repair instead?{' '}
              <Link
                href="#repair"
                className="text-[#e85d4c] hover:text-[#d94f3f] font-medium underline underline-offset-4 decoration-[#e85d4c]/30 hover:decoration-[#e85d4c] transition-colors"
              >
                Find local engineers →
              </Link>
            </div>
          </div>

          {/* Right Column - Bento Stats Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {/* Large Stat - Savings */}
              <div className="col-span-2 stats-card p-8 text-center animate-scale-in opacity-0 stagger-2 group">
                <div className="text-5xl md:text-6xl font-bold text-gradient mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stats.savings}
                </div>
                <div className="text-[#6b7280] text-sm font-medium uppercase tracking-wider">
                  Average Savings
                </div>
              </div>

              {/* Medium Stat - Stores */}
              <div className="stats-card p-5 text-center animate-scale-in opacity-0 stagger-3 group">
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-[#e85d4c]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-[#e85d4c]" />
                </div>
                <div className="text-2xl font-bold text-[#181111]">{stats.stores}</div>
                <div className="text-[#6b7280] text-xs font-medium">Verified Stores</div>
              </div>

              {/* Medium Stat - Cities */}
              <div className="stats-card p-5 text-center animate-scale-in opacity-0 stagger-4 group">
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-[#0ea5e9]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-5 h-5 text-[#0ea5e9]" />
                </div>
                <div className="text-2xl font-bold text-[#181111]">{stats.cities}</div>
                <div className="text-[#6b7280] text-xs font-medium">UK Cities</div>
              </div>

              {/* Trust Badge */}
              <div className="col-span-2 glass-badge bg-gradient-to-r from-green-50/90 to-emerald-50/90 rounded-xl p-4 flex items-center justify-center gap-3 border border-green-200/50 animate-scale-in opacity-0 stagger-5">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-green-700 text-sm font-medium">
                  Companies House & Gas Safe Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
