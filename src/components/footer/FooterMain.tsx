'use client'

import Link from 'next/link'
import Logo from '@/components/layout/Logo'
import FooterAccordion from './FooterAccordion'
import { FooterLinkGroup } from '@/types/footer'

const quickLinks: FooterLinkGroup = {
  title: 'Quick Links',
  links: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
}

const categories: FooterLinkGroup = {
  title: 'Categories',
  links: [
    { label: 'Washing Machines', href: '/washing-machines' },
    { label: 'Fridge Freezers', href: '/fridge-freezers' },
    { label: 'Dishwashers', href: '/dishwashers' },
    { label: 'Tumble Dryers', href: '/tumble-dryers' },
    { label: 'Cookers & Ovens', href: '/ovens-cookers' },
    { label: 'Range Cookers', href: '/range-cookers' },
    { label: 'American Fridges', href: '/american-fridges' },
    { label: 'View All Categories →', href: '/categories' },
  ],
}

const forBusiness: FooterLinkGroup = {
  title: 'For Business',
  links: [
    { label: 'List Your Store', href: '/business/add' },
    { label: 'Claim Your Business', href: '/business/add' },
    { label: 'Business Dashboard', href: '/dashboard' },
    { label: 'Business FAQ', href: '/business/help' },
    { label: 'Advertise With Us', href: '/advertise' },
  ],
}

function LinkColumn({ group }: { group: FooterLinkGroup }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
        {group.title}
      </h3>
      <ul className="space-y-2">
        {group.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Main Footer Section (Spec 05)
 *
 * Desktop: 4 columns (Logo, Quick Links, Categories, For Business)
 * Mobile: Stacked accordions
 */
export default function FooterMain() {
  return (
    <div className="border-t-4 border-[#e85d4c] bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {/* Logo Column */}
          <div>
            <Logo variant="white" className="mb-4" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-[280px]">
              Find graded appliances & trusted repair services across the UK.
              Save 30-70% off RRP.
            </p>
            <a
              href="mailto:hello@gradedappliancehub.co.uk"
              className="inline-flex items-center gap-2 mt-4 text-sm text-white hover:text-[#e85d4c] transition-colors"
            >
              <span>📧</span>
              hello@gradedappliancehub.co.uk
            </a>
          </div>

          {/* Link Columns */}
          <LinkColumn group={quickLinks} />
          <LinkColumn group={categories} />
          <LinkColumn group={forBusiness} />
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Logo Section */}
          <div className="text-center pb-6 border-b border-slate-700">
            <Logo variant="white" className="mx-auto mb-4" />
            <p className="text-sm text-slate-400 leading-relaxed">
              Find graded appliances & trusted repair services across the UK.
              Save 30-70% off RRP.
            </p>
            <a
              href="mailto:hello@gradedappliancehub.co.uk"
              className="inline-flex items-center gap-2 mt-4 text-sm text-white hover:text-[#e85d4c] transition-colors"
            >
              <span>📧</span>
              hello@gradedappliancehub.co.uk
            </a>
          </div>

          {/* Accordions */}
          <FooterAccordion title={quickLinks.title}>
            <ul className="space-y-3 pl-2">
              {quickLinks.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors py-2 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterAccordion>

          <FooterAccordion title={categories.title}>
            <ul className="space-y-3 pl-2">
              {categories.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors py-2 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterAccordion>

          <FooterAccordion title={forBusiness.title}>
            <ul className="space-y-3 pl-2">
              {forBusiness.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors py-2 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterAccordion>
        </div>
      </div>
    </div>
  )
}
