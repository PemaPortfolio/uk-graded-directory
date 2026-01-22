import { FooterStats, FooterSocialLinks } from '@/types/footer'
import SocialLinks from './SocialLinks'

interface FooterBottomBarProps {
  stats: FooterStats
  socialLinks: FooterSocialLinks
}

/**
 * Footer Bottom Bar (Spec 05)
 *
 * Displays:
 * - Copyright
 * - Dynamic stats (stores, providers, locations)
 * - Social media links
 */
export default function FooterBottomBar({ stats, socialLinks }: FooterBottomBarProps) {
  const currentYear = new Date().getFullYear()

  return (
    <div className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Copyright */}
        <p className="text-center text-sm text-slate-500">
          © {currentYear} Graded Appliance Hub. All rights reserved.
        </p>

        {/* Stats - Desktop */}
        <div className="hidden sm:flex justify-center items-center gap-4 mt-4 text-sm text-slate-400">
          <span className="flex items-center gap-1">
            <span>🏪</span>
            {stats.totalStores}+ Stores
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1">
            <span>🔧</span>
            {stats.totalProviders}+ Repair Services
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1">
            <span>📍</span>
            {stats.totalLocations} UK Locations
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1">
            <span>💰</span>
            Save 30-70%
          </span>
        </div>

        {/* Stats - Mobile */}
        <div className="sm:hidden flex flex-col items-center gap-2 mt-4 text-sm text-slate-400">
          <span className="flex items-center gap-1">
            <span>🏪</span>
            {stats.totalStores}+ Stores
          </span>
          <span className="flex items-center gap-1">
            <span>🔧</span>
            {stats.totalProviders}+ Repair Services
          </span>
          <span className="flex items-center gap-1">
            <span>📍</span>
            {stats.totalLocations} UK Locations
          </span>
          <span className="flex items-center gap-1">
            <span>💰</span>
            Save 30-70%
          </span>
        </div>

        {/* Social Links */}
        <SocialLinks socialLinks={socialLinks} />
      </div>
    </div>
  )
}
