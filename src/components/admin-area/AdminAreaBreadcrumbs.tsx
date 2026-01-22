import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface AdminAreaBreadcrumbsProps {
  countryName: string
  countrySlug: string
  adminAreaName: string
  className?: string
}

/**
 * Breadcrumbs for Admin Area Pages
 *
 * Path: Home > Country > Admin Area
 */
export function AdminAreaBreadcrumbs({
  countryName,
  countrySlug,
  adminAreaName,
  className = '',
}: AdminAreaBreadcrumbsProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: countryName, href: `/${countrySlug}` },
    { name: adminAreaName, href: null },
  ]

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className="flex flex-wrap items-center gap-1 text-sm"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {breadcrumbs.map((crumb, index) => (
          <li
            key={crumb.name}
            className="flex items-center"
            itemScope
            itemProp="itemListElement"
            itemType="https://schema.org/ListItem"
          >
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1 flex-shrink-0" />
            )}

            {crumb.href ? (
              <Link
                href={crumb.href}
                className="text-gray-600 dark:text-gray-400 hover:text-[#e85d4c] transition-colors flex items-center gap-1"
                itemProp="item"
              >
                {index === 0 && <Home className="w-4 h-4" />}
                <span itemProp="name">{crumb.name}</span>
              </Link>
            ) : (
              <span
                className="text-gray-900 dark:text-gray-100 font-medium"
                itemProp="name"
              >
                {crumb.name}
              </span>
            )}
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default AdminAreaBreadcrumbs
