import { FooterSocialLinks } from '@/types/footer'

/**
 * Social Media Configuration (Spec 05)
 *
 * Update these URLs when social accounts are created.
 * Set enabled: false to hide social links entirely.
 * Remove individual links from array to hide specific platforms.
 */
export const socialConfig: FooterSocialLinks = {
  enabled: true,
  links: [
    {
      platform: 'tiktok',
      url: '', // TODO: Add TikTok URL when account created
      label: 'Follow us on TikTok',
    },
    {
      platform: 'facebook',
      url: '', // TODO: Add Facebook URL when account created
      label: 'Follow us on Facebook',
    },
    {
      platform: 'youtube',
      url: '', // TODO: Add YouTube URL when account created
      label: 'Subscribe on YouTube',
    },
  ],
}

/**
 * Get only configured (non-empty) social links
 */
export function getActiveSocialLinks(): FooterSocialLinks {
  return {
    enabled: socialConfig.enabled,
    links: socialConfig.links.filter(link => link.url && link.url.length > 0),
  }
}

/**
 * Get social URLs for Schema.org sameAs property
 */
export function getSocialSameAs(): string[] {
  const socialLinks = getActiveSocialLinks()
  return socialLinks.links.map(link => link.url).filter(Boolean)
}
