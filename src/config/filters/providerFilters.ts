/**
 * Provider Filter Configuration (Spec 18)
 *
 * Filter definitions for repair category pages.
 */

import type { FilterConfig } from '@/types/filters'

export const PROVIDER_FILTER_CONFIG: FilterConfig = {
  pageType: 'repair_category',
  entityType: 'provider',
  defaultSort: 'rating',

  // Mobile quick filter chips - URGENCY FOCUSED
  quickFilters: ['same_day', 'no_fix_no_fee', 'verified'],

  filters: [
    // Availability/Urgency filters
    {
      id: 'availability',
      label: 'Availability',
      type: 'checkbox-group',
      showCounts: true,
      priority: 'high',
      options: [
        {
          value: 'same_day',
          label: 'Same-Day',
          icon: '⚡',
          description: 'Available for same-day callout',
        },
        {
          value: 'next_day',
          label: 'Next-Day',
          icon: '📅',
        },
        {
          value: 'emergency',
          label: 'Emergency/24-7',
          icon: '🚨',
          description: 'Out-of-hours emergency service',
        },
        {
          value: 'weekend',
          label: 'Weekend',
          icon: '📆',
        },
        {
          value: 'evening',
          label: 'Evening',
          icon: '🌙',
        },
      ],
    },

    // Trust & Guarantees filters
    {
      id: 'trust',
      label: 'Trust & Guarantees',
      type: 'checkbox-group',
      showCounts: true,
      priority: 'high',
      options: [
        {
          value: 'no_fix_no_fee',
          label: 'No Fix No Fee',
          icon: '✓',
          description: 'Only pay if repair is successful',
        },
        {
          value: 'free_quotes',
          label: 'Free Quotes',
          icon: '💬',
        },
        {
          value: 'verified',
          label: 'Verified Engineer',
          icon: '✓',
          description: 'Verified by UK Graded Appliances',
        },
        {
          value: 'insured',
          label: 'Insured',
          icon: '🛡️',
          description: 'Public liability insurance',
        },
      ],
    },

    // UK Certifications - CRITICAL FOR SAFETY
    {
      id: 'certifications',
      label: 'Certifications',
      type: 'checkbox-group',
      showCounts: true,
      priority: 'high',
      options: [
        {
          value: 'gas_safe',
          label: 'Gas Safe Registered',
          icon: '🛡️',
          description: 'Legally required for gas appliances',
        },
        {
          value: 'fgas',
          label: 'F-Gas Certified',
          icon: '❄️',
          description: 'Required for refrigeration work',
        },
        {
          value: 'which_trusted',
          label: 'Which? Trusted Trader',
          icon: '⭐',
        },
        {
          value: 'checkatrade',
          label: 'Checkatrade',
          icon: '✓',
        },
        {
          value: 'trustatrader',
          label: 'Trustatrader',
        },
      ],
    },

    // Brand authorization
    {
      id: 'brand',
      label: 'Brand Specialist',
      type: 'single-select',
      placeholder: 'All Brands',
      showCounts: true,
      priority: 'medium',
      dbJoinTable: 'provider_brand_authorisations',
      options: [], // Populated dynamically
    },

    // Warranty on repairs
    {
      id: 'warranty',
      label: 'Repair Warranty',
      type: 'single-select',
      showCounts: true,
      priority: 'medium',
      dbField: 'warranty_on_repairs_months',
      dbOperator: 'gte',
      options: [
        { value: '0', label: 'Any Warranty' },
        { value: '3', label: '3+ Months' },
        { value: '6', label: '6+ Months', icon: '⭐' },
        { value: '12', label: '12+ Months', icon: '⭐⭐' },
      ],
    },

    // Callout fee range
    {
      id: 'callout',
      label: 'Max Callout Fee',
      type: 'range-slider',
      min: 0,
      max: 150,
      step: 10,
      unit: '£',
      priority: 'low',
      collapsible: true,
      dbField: 'callout_fee_from',
      dbOperator: 'lte',
    },
  ],

  sortOptions: [
    {
      value: 'rating',
      label: 'Top Rated',
      field: 'average_rating',
      direction: 'desc',
      nullsFirst: false,
    },
    {
      value: 'reviews',
      label: 'Most Reviews',
      field: 'review_count',
      direction: 'desc',
    },
    {
      value: 'callout_low',
      label: 'Lowest Callout Fee',
      field: 'callout_fee_from',
      direction: 'asc',
      nullsFirst: false,
    },
    {
      value: 'featured',
      label: 'Featured First',
      field: 'is_featured',
      direction: 'desc',
    },
  ],
}
