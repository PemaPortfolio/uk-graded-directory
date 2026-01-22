import { FooterData } from '@/types/footer'
import FooterMain from './FooterMain'
import FooterRegions from './FooterRegions'
import FooterPopularCities from './FooterPopularCities'
import FooterBottomBar from './FooterBottomBar'

interface FooterProps {
  data: FooterData
}

/**
 * Footer Component (Spec 05)
 *
 * Mobile-first, SEO-optimized footer with:
 * - Section 1: Main Footer (logo, tagline, link columns)
 * - Section 2: Browse by Region (217 admin areas by country)
 * - Section 3: Popular Cities (top 20)
 * - Section 4: Bottom Bar (copyright, stats, social)
 *
 * Total internal links: ~250 per page
 */
export default function Footer({ data }: FooterProps) {
  return (
    <footer role="contentinfo">
      {/* Section 1: Main Footer */}
      <FooterMain />

      {/* Section 2: Browse by Region */}
      <FooterRegions countries={data.countries} />

      {/* Section 3: Popular Cities */}
      <FooterPopularCities cities={data.popularCities} />

      {/* Section 4: Bottom Bar */}
      <FooterBottomBar stats={data.stats} socialLinks={data.socialLinks} />
    </footer>
  )
}
