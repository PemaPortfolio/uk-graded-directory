/**
 * Store Filter Configuration (Spec 18)
 *
 * Filter definitions for retail category pages.
 */

import type { FilterConfig } from '@/types/filters'

export const STORE_FILTER_CONFIG: FilterConfig = {
  pageType: 'retail_category',
  entityType: 'store',
  defaultSort: 'relevance',

  // Mobile quick filter chips
  quickFilters: ['free_delivery', 'zero_finance', 'warranty_12'],

  filters: [
    // Brand filter (populated dynamically)
    {
      id: 'brand',
      label: 'Brand',
      type: 'search-select',
      placeholder: 'Search brands...',
      showCounts: true,
      collapsible: true,
      priority: 'high',
      dbJoinTable: 'store_brands',
      options: [], // Populated dynamically
    },

    // Grade filter
    {
      id: 'grade',
      label: 'Grade',
      type: 'multi-select',
      showCounts: true,
      priority: 'high',
      dbField: 'grades_stocked',
      dbOperator: 'overlaps',
      options: [
        {
          value: 'tatty-packaging',
          label: 'Tatty Packaging',
          icon: '📦',
          description: 'New with damaged packaging only (~20% off)',
        },
        {
          value: 'A-grade',
          label: 'A-Grade',
          icon: '🅰️',
          description: 'Minor marks, essentially new (~30% off)',
        },
        {
          value: 'B-grade',
          label: 'B-Grade',
          icon: '🅱️',
          description: 'Visible marks on front/sides (~45% off)',
        },
        {
          value: 'C-grade',
          label: 'C-Grade',
          icon: '©️',
          description: 'More significant cosmetic damage (~60% off)',
        },
      ],
    },

    // Delivery filters
    {
      id: 'delivery',
      label: 'Delivery',
      type: 'checkbox-group',
      showCounts: true,
      priority: 'high',
      options: [
        {
          value: 'offers_delivery',
          label: 'Offers Delivery',
          icon: '🚚',
        },
        {
          value: 'free_delivery',
          label: 'Free Delivery',
          icon: '✓',
        },
        {
          value: 'next_day',
          label: 'Next Day',
          icon: '⚡',
        },
        {
          value: 'same_day',
          label: 'Same Day',
          icon: '🏃',
        },
      ],
    },

    // Finance filters
    {
      id: 'finance',
      label: 'Finance',
      type: 'checkbox-group',
      showCounts: true,
      priority: 'medium',
      options: [
        {
          value: 'offers_finance',
          label: 'Finance Available',
          icon: '💳',
        },
        {
          value: 'zero_percent',
          label: '0% Finance',
          icon: '✓',
        },
        {
          value: 'klarna',
          label: 'Klarna',
        },
        {
          value: 'clearpay',
          label: 'Clearpay',
        },
      ],
    },

    // Warranty filter
    {
      id: 'warranty',
      label: 'Warranty',
      type: 'single-select',
      showCounts: true,
      priority: 'medium',
      dbField: 'warranty_months',
      dbOperator: 'gte',
      options: [
        { value: '0', label: 'Any Warranty' },
        { value: '6', label: '6+ Months' },
        { value: '12', label: '12+ Months', icon: '⭐' },
        { value: '24', label: '24+ Months', icon: '⭐⭐' },
      ],
    },

    // Services filters
    {
      id: 'services',
      label: 'Services',
      type: 'checkbox-group',
      showCounts: true,
      priority: 'low',
      collapsible: true,
      options: [
        {
          value: 'installation',
          label: 'Installation',
          icon: '🔧',
        },
        {
          value: 'free_installation',
          label: 'Free Installation',
          icon: '✓',
        },
        {
          value: 'removal',
          label: 'Old Appliance Removal',
          icon: '♻️',
        },
        {
          value: 'click_collect',
          label: 'Click & Collect',
          icon: '📍',
        },
      ],
    },

    // Verified filter
    {
      id: 'verified',
      label: 'Verified Only',
      type: 'toggle',
      priority: 'low',
      mobileQuickFilter: true,
      dbField: 'status',
    },
  ],

  sortOptions: [
    {
      value: 'relevance',
      label: 'Relevance',
      field: 'overall_score',
      direction: 'desc',
    },
    {
      value: 'rating',
      label: 'Highest Rated',
      field: 'average_rating',
      direction: 'desc',
      nullsFirst: false,
    },
    {
      value: 'reviews',
      label: 'Most Reviewed',
      field: 'review_count',
      direction: 'desc',
    },
    {
      value: 'newest',
      label: 'Newest',
      field: 'created_at',
      direction: 'desc',
    },
  ],
}
