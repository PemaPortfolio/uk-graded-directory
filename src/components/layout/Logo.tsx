import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  variant?: 'default' | 'white'
  className?: string
}

/**
 * Logo Component (Spec 01)
 *
 * Primary brand identifier and home navigation element.
 * Brand: "GRADED" with tagline "APPLIANCE HUB"
 *
 * Sizing:
 * - Mobile (<768px): 32px height
 * - Tablet (768-1024px): 36px height
 * - Desktop (>1024px): 40px height
 *
 * Logo uses its own red (#ea2a33), distinct from UI primary coral (#e85d4c).
 */
export default function Logo({ variant = 'default', className = '' }: LogoProps) {
  const logoSrc = variant === 'white'
    ? '/images/logo/graded-logo-white.svg'
    : '/images/logo/graded-logo.svg'

  return (
    <Link
      href="/"
      aria-label="Graded Appliance Hub - Home"
      className={`
        inline-flex items-center
        transition-opacity duration-150
        hover:opacity-85
        focus:outline-none focus:ring-2 focus:ring-[#ea2a33] focus:ring-offset-2
        ${className}
      `}
    >
      <Image
        src={logoSrc}
        alt="Graded - Find graded appliances near you"
        width={200}
        height={40}
        priority
        className="h-8 w-auto md:h-9 lg:h-10"
      />
    </Link>
  )
}
