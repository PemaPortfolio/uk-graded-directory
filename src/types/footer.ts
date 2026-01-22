/**
 * Footer TypeScript Interfaces (Spec 05)
 */

export interface FooterAdminArea {
  id: string
  name: string
  slug: string
  countrySlug: string
  storeCount: number
  providerCount: number
}

export interface FooterCountry {
  id: string
  name: string
  slug: string
  flagEmoji: string
  adminAreas: FooterAdminArea[]
}

export interface FooterCity {
  id: string
  name: string
  slug: string
  countrySlug: string
  population?: number
}

export interface FooterStats {
  totalStores: number
  totalProviders: number
  totalLocations: number
}

export interface SocialLink {
  platform: 'tiktok' | 'facebook' | 'youtube'
  url: string
  label: string
}

export interface FooterSocialLinks {
  enabled: boolean
  links: SocialLink[]
}

export interface FooterData {
  countries: FooterCountry[]
  popularCities: FooterCity[]
  stats: FooterStats
  socialLinks: FooterSocialLinks
}

export interface FooterLinkGroup {
  title: string
  links: {
    label: string
    href: string
  }[]
}
