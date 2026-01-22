import Link from 'next/link'
import { Facebook, Youtube } from 'lucide-react'
import { FooterSocialLinks } from '@/types/footer'

/**
 * Custom TikTok icon (not in Lucide)
 */
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

const iconMap = {
  tiktok: TikTokIcon,
  facebook: Facebook,
  youtube: Youtube,
}

interface SocialLinksProps {
  socialLinks: FooterSocialLinks
}

/**
 * Social Media Links Component (Spec 05)
 *
 * Displays TikTok, Facebook, YouTube icons.
 * Only shows links that have URLs configured.
 */
export default function SocialLinks({ socialLinks }: SocialLinksProps) {
  // Don't render if disabled or no active links
  if (!socialLinks.enabled || socialLinks.links.length === 0) {
    return null
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <span className="text-sm text-slate-500">Follow us:</span>
      <div className="flex items-center gap-4">
        {socialLinks.links.map((link) => {
          const Icon = iconMap[link.platform]
          return (
            <Link
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-slate-400 hover:text-white transition-colors p-2"
            >
              <Icon className="w-6 h-6" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
