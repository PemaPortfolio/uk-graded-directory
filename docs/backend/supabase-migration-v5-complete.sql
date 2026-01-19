-- ============================================================================
-- UK GRADED APPLIANCES DIRECTORY: DATABASE SCHEMA v5.0 COMPLETE
-- UNIFIED RETAIL + REPAIR PLATFORM
-- 
-- CONSOLIDATED MIGRATION: Combines v4 base + v4.1 patches + geo-optimization
-- Run this SINGLE file in a fresh Supabase project
-- ============================================================================
-- 
-- CONTENTS:
-- Section 1:  Extensions
-- Section 2:  Enums (15 types)
-- Section 3:  Core Location Tables (countries, admin_areas, places)
-- Section 4:  Grade Levels
-- Section 5:  Categories & Brands (with slug registry)
-- Section 6:  Stores Table (full UK commerce)
-- Section 7:  Service Providers (repair)
-- Section 8:  Store Relationships
-- Section 9:  Provider Relationships
-- Section 10: Reviews (with anti-spam)
-- Section 11: Review Reports (abuse reporting)
-- Section 12: Click Events (with GDPR consent)
-- Section 13: Page Indexability (anti-thin gating)
-- Section 14: Seasonal & Content (campaigns, FAQs)
-- Section 15: Monetization (deal alerts, affiliate, intents)
-- Section 16: Authority (backlinks, claims)
-- Section 17: Calculator Tables (Phase 2)
-- Section 18: Geo-Spatial Functions (Haversine, bounding box, RPC)
-- Section 19: Core Functions & Triggers
-- Section 20: Slug Registry Triggers
-- Section 21: Anti-Thin Gating Auto-Recompute Triggers
-- Section 22: Views
-- Section 23: Indexes
-- Section 24: RLS Policies
-- Section 25: Permissions
-- 
-- ============================================================================

-- ============================================================================
-- SECTION 1: EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================================
-- SECTION 2: ENUMS (15 types)
-- ============================================================================

-- Location & Status
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'place_type_enum') THEN
    CREATE TYPE place_type_enum AS ENUM ('city', 'town', 'area');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'store_status_enum') THEN
    CREATE TYPE store_status_enum AS ENUM ('pending', 'active', 'claimed', 'verified', 'suspended');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'provider_status_enum') THEN
    CREATE TYPE provider_status_enum AS ENUM ('pending', 'active', 'claimed', 'verified', 'suspended');
  END IF;
END $$;

-- Product/Service
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'grade_level_enum') THEN
    CREATE TYPE grade_level_enum AS ENUM ('tatty-packaging', 'A-grade', 'B-grade', 'C-grade', 'mixed');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'warranty_type_enum') THEN
    CREATE TYPE warranty_type_enum AS ENUM ('manufacturer', 'retailer', 'both', 'none');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'finance_provider_enum') THEN
    CREATE TYPE finance_provider_enum AS ENUM ('klarna', 'clearpay', 'paypal-credit', 'v12-finance', 'hitachi', 'other');
  END IF;
END $$;

-- Authority
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'backlink_status_enum') THEN
    CREATE TYPE backlink_status_enum AS ENUM ('pending', 'verified', 'broken', 'removed');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'claim_status_enum') THEN
    CREATE TYPE claim_status_enum AS ENUM ('pending', 'approved', 'rejected');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'claim_subject_type_enum') THEN
    CREATE TYPE claim_subject_type_enum AS ENUM ('store', 'provider');
  END IF;
END $$;

-- Taxonomy
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'category_tier_enum') THEN
    CREATE TYPE category_tier_enum AS ENUM ('tier_1', 'tier_2', 'tier_3', 'supplementary');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'brand_tier_enum') THEN
    CREATE TYPE brand_tier_enum AS ENUM ('premium', 'mid_range', 'value');
  END IF;
END $$;

-- Pages
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'page_type_enum') THEN
    CREATE TYPE page_type_enum AS ENUM (
      'country', 'admin_area', 'place',
      'category', 'subcategory', 'place_category', 'place_brand',
      'brand', 'brand_category', 'store',
      'place_repair', 'provider', 'repair_national', 'brand_repair'
    );
  END IF;
END $$;

-- User/Analytics
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'intent_type_enum') THEN
    CREATE TYPE intent_type_enum AS ENUM (
      'browse', 'compare', 'ready_to_buy',
      'need_repair', 'need_warranty', 'need_delivery', 'need_finance'
    );
  END IF;
END $$;

-- Reviews & Events (Polymorphic)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subject_type_enum') THEN
    CREATE TYPE subject_type_enum AS ENUM ('store', 'provider');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'click_event_type_enum') THEN
    CREATE TYPE click_event_type_enum AS ENUM ('call_click', 'website_click', 'affiliate_click', 'profile_view', 'email_click');
  END IF;
END $$;

-- Review Status (from v4.1 patch)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'review_status_enum') THEN
    CREATE TYPE review_status_enum AS ENUM ('pending', 'approved', 'rejected', 'spam', 'flagged');
  END IF;
END $$;

-- ============================================================================
-- SECTION 3: CORE LOCATION TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  display_order INTEGER NOT NULL DEFAULT 1,
  flag_emoji VARCHAR(10),
  seo_title VARCHAR(255),
  seo_meta_description TEXT,
  h1_heading VARCHAR(255),
  intro_paragraph TEXT,
  admin_area_count INTEGER DEFAULT 0,
  place_count INTEGER DEFAULT 0,
  store_count INTEGER DEFAULT 0,
  provider_count INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_indexable BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO countries (name, slug, display_order, flag_emoji, seo_title, h1_heading) VALUES
  ('England', 'england', 1, '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Graded Appliances & Repair in England | UK Graded Appliances', 'Graded Appliances & Repair in England'),
  ('Scotland', 'scotland', 2, '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'Graded Appliances & Repair in Scotland | UK Graded Appliances', 'Graded Appliances & Repair in Scotland'),
  ('Wales', 'wales', 3, '🏴󠁧󠁢󠁷󠁬󠁳󠁿', 'Graded Appliances & Repair in Wales | UK Graded Appliances', 'Graded Appliances & Repair in Wales'),
  ('Northern Ireland', 'northern-ireland', 4, '🇬🇧', 'Graded Appliances & Repair in Northern Ireland | UK Graded Appliances', 'Graded Appliances & Repair in Northern Ireland')
ON CONFLICT (slug) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.admin_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL,
  latitude NUMERIC(10, 8),
  longitude NUMERIC(11, 8),
  seo_title VARCHAR(255),
  seo_meta_description TEXT,
  h1_heading VARCHAR(255),
  intro_paragraph TEXT,
  nearby_admin_areas TEXT[],
  place_count INTEGER DEFAULT 0,
  store_count INTEGER DEFAULT 0,
  provider_count INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_indexable BOOLEAN DEFAULT false,
  min_stores_for_index INTEGER DEFAULT 3,
  priority_tier INTEGER NOT NULL DEFAULT 2,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT admin_areas_slug_key UNIQUE (slug)
);

CREATE TABLE IF NOT EXISTS public.places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  admin_area_id UUID REFERENCES admin_areas(id) ON DELETE SET NULL,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL,
  place_type place_type_enum NOT NULL DEFAULT 'town',
  latitude NUMERIC(10, 8),
  longitude NUMERIC(11, 8),
  population INTEGER,
  notes TEXT,
  seo_title VARCHAR(255),
  seo_meta_description TEXT,
  h1_heading VARCHAR(255),
  intro_paragraph TEXT,
  schema_json JSONB,
  faq_json JSONB,
  nearby_places TEXT[],
  store_count INTEGER DEFAULT 0,
  provider_count INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT false,
  is_indexable BOOLEAN DEFAULT false,
  min_stores_for_index INTEGER DEFAULT 1,
  min_providers_for_index INTEGER DEFAULT 1,
  priority_tier INTEGER NOT NULL DEFAULT 2,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT places_slug_key UNIQUE (slug)
);

-- ============================================================================
-- SECTION 4: GRADE LEVELS (UK SPECIFIC)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.grade_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code grade_level_enum NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  short_description VARCHAR(200) NOT NULL,
  full_description TEXT NOT NULL,
  typical_discount_percent INTEGER,
  examples TEXT[],
  display_order INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO grade_levels (code, name, short_description, full_description, typical_discount_percent, display_order) VALUES
  ('tatty-packaging', 'Tatty Packaging', 'New with damaged packaging only',
   'Brand new appliances with damaged or missing outer packaging. The appliance itself is in perfect, unused condition with full manufacturer warranty. Often the best value as the product is essentially new.',
   20, 1),
  ('A-grade', 'A-Grade', 'Minor marks, essentially new',
   'Appliances with very minor cosmetic imperfections that are barely noticeable. May have been ex-display with minimal use. Full functionality and typically comes with manufacturer warranty.',
   30, 2),
  ('B-grade', 'B-Grade', 'Visible marks on front/sides',
   'Appliances with noticeable cosmetic damage such as scratches, dents, or marks on visible surfaces. Fully functional with all features working. Usually carries retailer warranty of 6-12 months.',
   45, 3),
  ('C-grade', 'C-Grade', 'More significant cosmetic damage',
   'Appliances with more obvious cosmetic imperfections. May have multiple dents or scratches but all functions work correctly. Offers the deepest discounts for budget-conscious buyers.',
   60, 4),
  ('mixed', 'Mixed Grades', 'Various grades available',
   'Retailer stocks a variety of graded appliances across different condition levels. Contact store for current availability and specific grades.',
   40, 5)
ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- SECTION 5: CATEGORIES & BRANDS (WITH SLUG REGISTRY)
-- ============================================================================

-- Slug Registry (prevents collision between category/brand/repair slugs)
CREATE TABLE IF NOT EXISTS public.slug_registry (
  slug VARCHAR(200) PRIMARY KEY,
  entity_type VARCHAR(30) NOT NULL CHECK (entity_type IN ('category', 'brand', 'repair_suffix', 'store', 'provider')),
  entity_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT slug_registry_unique_slug UNIQUE (slug)
);

COMMENT ON TABLE slug_registry IS 'Ensures no slug collision between categories, brands, and repair suffixes. Every routable slug must be registered here.';

-- Appliance Categories
CREATE TABLE IF NOT EXISTS public.appliance_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES appliance_categories(id) ON DELETE SET NULL,
  name VARCHAR(200) NOT NULL,
  name_plural VARCHAR(200),
  name_singular VARCHAR(200),
  slug VARCHAR(200) NOT NULL UNIQUE,
  tier category_tier_enum NOT NULL DEFAULT 'supplementary',
  depth INTEGER DEFAULT 0,
  display_order INTEGER DEFAULT 1,
  icon VARCHAR(50),
  -- SEO templates (used for both retail and repair)
  seo_title_template VARCHAR(255),
  seo_meta_template TEXT,
  h1_template VARCHAR(255),
  intro_template TEXT,
  -- Repair-specific templates
  repair_seo_title_template VARCHAR(255),
  repair_h1_template VARCHAR(255),
  repair_intro_template TEXT,
  -- Content
  description TEXT,
  buying_guide TEXT,
  repair_guide TEXT,
  common_issues TEXT[],
  avg_repair_cost_min DECIMAL(10,2),
  avg_repair_cost_max DECIMAL(10,2),
  avg_lifespan_years INTEGER,
  -- Schema
  available_attributes JSONB,
  schema_type VARCHAR(100) DEFAULT 'Product',
  -- Status
  is_active BOOLEAN NOT NULL DEFAULT true,
  supports_repair BOOLEAN DEFAULT true,
  min_stores_for_index INTEGER DEFAULT 2,
  min_providers_for_index INTEGER DEFAULT 2,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed Tier 1 Categories (High demand - from keyword research)
INSERT INTO appliance_categories (name, name_plural, name_singular, slug, tier, icon, display_order, supports_repair, seo_title_template, h1_template, repair_seo_title_template, repair_h1_template) VALUES
  ('American Fridge Freezers', 'American Fridge Freezers', 'American Fridge Freezer', 'american-fridge-freezers', 'tier_1', '🇺🇸', 1, true, 'Graded American Fridge Freezers in {location} | UK Graded Appliances', 'Graded American Fridge Freezers in {location}', 'American Fridge Freezer Repair in {location} | Local Engineers', 'American Fridge Freezer Repair in {location}'),
  ('Fridge Freezers', 'Fridge Freezers', 'Fridge Freezer', 'fridge-freezers', 'tier_1', '🧊', 2, true, 'Graded Fridge Freezers in {location} | UK Graded Appliances', 'Graded Fridge Freezers in {location}', 'Fridge Freezer Repair in {location} | Local Engineers', 'Fridge Freezer Repair in {location}'),
  ('Washing Machines', 'Washing Machines', 'Washing Machine', 'washing-machines', 'tier_1', '🧺', 3, true, 'Graded Washing Machines in {location} | UK Graded Appliances', 'Graded Washing Machines in {location}', 'Washing Machine Repair in {location} | Local Engineers', 'Washing Machine Repair in {location}');

-- Seed Tier 2 Categories
INSERT INTO appliance_categories (name, name_plural, name_singular, slug, tier, icon, display_order, supports_repair, seo_title_template, h1_template, repair_seo_title_template, repair_h1_template) VALUES
  ('Dishwashers', 'Dishwashers', 'Dishwasher', 'dishwashers', 'tier_2', '🍽️', 4, true, 'Graded Dishwashers in {location} | UK Graded Appliances', 'Graded Dishwashers in {location}', 'Dishwasher Repair in {location} | Local Engineers', 'Dishwasher Repair in {location}'),
  ('Tumble Dryers', 'Tumble Dryers', 'Tumble Dryer', 'tumble-dryers', 'tier_2', '💨', 5, true, 'Graded Tumble Dryers in {location} | UK Graded Appliances', 'Graded Tumble Dryers in {location}', 'Tumble Dryer Repair in {location} | Local Engineers', 'Tumble Dryer Repair in {location}'),
  ('Televisions', 'Televisions', 'Television', 'televisions', 'tier_2', '📺', 6, true, 'Graded TVs in {location} | UK Graded Appliances', 'Graded Televisions in {location}', 'TV Repair in {location} | Local Engineers', 'Television Repair in {location}');

-- Seed Tier 3 Categories
INSERT INTO appliance_categories (name, name_plural, name_singular, slug, tier, icon, display_order, supports_repair, seo_title_template, h1_template, repair_seo_title_template, repair_h1_template) VALUES
  ('Built-in Ovens', 'Built-in Ovens', 'Built-in Oven', 'built-in-ovens', 'tier_3', '🔥', 7, true, 'Graded Built-in Ovens in {location} | UK Graded Appliances', 'Graded Built-in Ovens in {location}', 'Oven Repair in {location} | Local Engineers', 'Built-in Oven Repair in {location}'),
  ('Range Cookers', 'Range Cookers', 'Range Cooker', 'range-cookers', 'tier_3', '👨‍🍳', 8, true, 'Graded Range Cookers in {location} | UK Graded Appliances', 'Graded Range Cookers in {location}', 'Range Cooker Repair in {location} | Local Engineers', 'Range Cooker Repair in {location}'),
  ('Hobs', 'Hobs', 'Hob', 'hobs', 'tier_3', '🳳', 9, true, 'Graded Hobs in {location} | UK Graded Appliances', 'Graded Hobs in {location}', 'Hob Repair in {location} | Local Engineers', 'Hob Repair in {location}');

-- Seed Supplementary Categories
INSERT INTO appliance_categories (name, name_plural, name_singular, slug, tier, icon, display_order, supports_repair, seo_title_template, h1_template) VALUES
  ('Freezers', 'Freezers', 'Freezer', 'freezers', 'supplementary', '❄️', 10, true, 'Graded Freezers in {location} | UK Graded Appliances', 'Graded Freezers in {location}'),
  ('Fridges', 'Fridges', 'Fridge', 'fridges', 'supplementary', '🧊', 11, true, 'Graded Fridges in {location} | UK Graded Appliances', 'Graded Fridges in {location}'),
  ('Wine Coolers', 'Wine Coolers', 'Wine Cooler', 'wine-coolers', 'supplementary', '🍷', 12, true, 'Graded Wine Coolers in {location} | UK Graded Appliances', 'Graded Wine Coolers in {location}'),
  ('Washer Dryers', 'Washer Dryers', 'Washer Dryer', 'washer-dryers', 'supplementary', '🔄', 13, true, 'Graded Washer Dryers in {location} | UK Graded Appliances', 'Graded Washer Dryers in {location}'),
  ('Microwaves', 'Microwaves', 'Microwave', 'microwaves', 'supplementary', '📡', 14, true, 'Graded Microwaves in {location} | UK Graded Appliances', 'Graded Microwaves in {location}'),
  ('Cookers', 'Cookers', 'Cooker', 'cookers', 'supplementary', '🳳', 15, true, 'Graded Cookers in {location} | UK Graded Appliances', 'Graded Cookers in {location}'),
  ('Cooker Hoods', 'Cooker Hoods', 'Cooker Hood', 'cooker-hoods', 'supplementary', '💨', 16, true, 'Graded Cooker Hoods in {location} | UK Graded Appliances', 'Graded Cooker Hoods in {location}'),
  ('Vacuum Cleaners', 'Vacuum Cleaners', 'Vacuum Cleaner', 'vacuum-cleaners', 'supplementary', '🧹', 17, true, 'Graded Vacuum Cleaners in {location} | UK Graded Appliances', 'Graded Vacuum Cleaners in {location}');

-- Seed subcategories for key categories
INSERT INTO appliance_categories (name, name_plural, slug, tier, parent_id, depth, display_order, supports_repair) 
SELECT name, name, slug, 'supplementary', (SELECT id FROM appliance_categories WHERE slug = 'fridge-freezers'), 1, ord, true
FROM (VALUES
  ('50/50 Fridge Freezers', '50-50-fridge-freezers', 1),
  ('60/40 Fridge Freezers', '60-40-fridge-freezers', 2),
  ('70/30 Fridge Freezers', '70-30-fridge-freezers', 3),
  ('Slimline Fridge Freezers', 'slimline-fridge-freezers', 4),
  ('Integrated Fridge Freezers', 'integrated-fridge-freezers', 5),
  ('Retro Fridge Freezers', 'retro-fridge-freezers', 6)
) AS t(name, slug, ord);

INSERT INTO appliance_categories (name, name_plural, slug, tier, parent_id, depth, display_order, supports_repair) 
SELECT name, name, slug, 'supplementary', (SELECT id FROM appliance_categories WHERE slug = 'tumble-dryers'), 1, ord, true
FROM (VALUES
  ('Condenser Tumble Dryers', 'condenser-tumble-dryers', 1),
  ('Vented Tumble Dryers', 'vented-tumble-dryers', 2),
  ('Heat Pump Tumble Dryers', 'heat-pump-tumble-dryers', 3),
  ('Integrated Tumble Dryers', 'integrated-tumble-dryers', 4)
) AS t(name, slug, ord);

INSERT INTO appliance_categories (name, name_plural, slug, tier, parent_id, depth, display_order, supports_repair) 
SELECT name, name, slug, 'supplementary', (SELECT id FROM appliance_categories WHERE slug = 'dishwashers'), 1, ord, true
FROM (VALUES
  ('Freestanding Dishwashers', 'freestanding-dishwashers', 1),
  ('Slimline Dishwashers', 'slimline-dishwashers', 2),
  ('Integrated Dishwashers', 'integrated-dishwashers', 3),
  ('Slimline Integrated Dishwashers', 'slimline-integrated-dishwashers', 4)
) AS t(name, slug, ord);

-- Brands table with tiers
CREATE TABLE IF NOT EXISTS public.brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  tier brand_tier_enum NOT NULL DEFAULT 'mid_range',
  logo_url VARCHAR(500),
  website VARCHAR(500),
  country_of_origin VARCHAR(100),
  description TEXT,
  seo_title_template VARCHAR(255),
  popularity_score INTEGER DEFAULT 0,
  store_count INTEGER DEFAULT 0,
  provider_count INTEGER DEFAULT 0,
  has_authorised_network BOOLEAN DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  min_stores_for_index INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed brands with tiers (from keyword research)
INSERT INTO brands (name, slug, tier, popularity_score, has_authorised_network) VALUES
  -- Premium tier
  ('Bosch', 'bosch', 'premium', 100, true),
  ('Samsung', 'samsung', 'premium', 98, true),
  ('Smeg', 'smeg', 'premium', 96, true),
  ('LG', 'lg', 'premium', 94, true),
  ('Siemens', 'siemens', 'premium', 92, true),
  ('Neff', 'neff', 'premium', 90, true),
  ('Miele', 'miele', 'premium', 88, true),
  -- Mid-range tier
  ('Hotpoint', 'hotpoint', 'mid_range', 85, true),
  ('Indesit', 'indesit', 'mid_range', 83, true),
  ('Beko', 'beko', 'mid_range', 81, true),
  ('Candy', 'candy', 'mid_range', 79, false),
  ('Hoover', 'hoover', 'mid_range', 77, false),
  ('AEG', 'aeg', 'mid_range', 75, true),
  ('Zanussi', 'zanussi', 'mid_range', 73, false),
  ('Whirlpool', 'whirlpool', 'mid_range', 71, true),
  ('Hisense', 'hisense', 'mid_range', 69, false),
  ('Haier', 'haier', 'mid_range', 67, false),
  ('Grundig', 'grundig', 'mid_range', 65, false),
  ('Kenwood', 'kenwood', 'mid_range', 63, false),
  -- Value tier
  ('Bush', 'bush', 'value', 60, false),
  ('Logik', 'logik', 'value', 58, false),
  ('Montpellier', 'montpellier', 'value', 56, false),
  ('Russell Hobbs', 'russell-hobbs', 'value', 54, false),
  ('Belling', 'belling', 'value', 52, false),
  ('Flavel', 'flavel', 'value', 50, false),
  ('Stoves', 'stoves', 'value', 48, false),
  ('Willow', 'willow', 'value', 46, false);

-- Populate slug registry with categories and brands
INSERT INTO slug_registry (slug, entity_type, entity_id)
SELECT slug, 'category', id FROM appliance_categories
ON CONFLICT DO NOTHING;

INSERT INTO slug_registry (slug, entity_type, entity_id)
SELECT slug, 'brand', id FROM brands
ON CONFLICT DO NOTHING;

-- Add repair suffix versions (e.g., "washing-machine-repair")
INSERT INTO slug_registry (slug, entity_type, entity_id)
SELECT slug || '-repair', 'repair_suffix', id 
FROM appliance_categories 
WHERE supports_repair = true
ON CONFLICT DO NOTHING;

-- ============================================================================
-- SECTION 6: STORES TABLE (RETAIL - FULL UK COMMERCE)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Core Identity
  business_name VARCHAR(300) NOT NULL,
  slug VARCHAR(300) NOT NULL UNIQUE,
  trading_name VARCHAR(300),
  
  -- Contact
  phone VARCHAR(50),
  email VARCHAR(255),
  website VARCHAR(500),
  
  -- Social
  facebook_url VARCHAR(500),
  instagram_url VARCHAR(500),
  google_maps_url VARCHAR(500),
  
  -- Address
  address_line1 VARCHAR(300),
  address_line2 VARCHAR(300),
  city_name VARCHAR(200),
  county VARCHAR(200),
  postcode VARCHAR(20),
  country_code VARCHAR(2) DEFAULT 'GB',
  
  -- Geographic
  latitude NUMERIC(10, 8),
  longitude NUMERIC(11, 8),
  
  -- Business Details
  description TEXT,
  short_description VARCHAR(300),
  operating_hours JSONB,
  year_established INTEGER,
  company_number VARCHAR(20),
  vat_number VARCHAR(20),
  
  -- Delivery Options
  offers_delivery BOOLEAN DEFAULT false,
  delivery_radius_miles INTEGER,
  offers_free_delivery BOOLEAN DEFAULT false,
  free_delivery_threshold DECIMAL(10,2),
  offers_next_day_delivery BOOLEAN DEFAULT false,
  offers_same_day_delivery BOOLEAN DEFAULT false,
  delivery_info TEXT,
  
  -- Installation & Removal
  offers_installation BOOLEAN DEFAULT false,
  installation_cost DECIMAL(10,2),
  offers_free_installation BOOLEAN DEFAULT false,
  offers_old_appliance_removal BOOLEAN DEFAULT false,
  offers_weee_recycling BOOLEAN DEFAULT false,
  
  -- Warranty & Guarantee (UK terms)
  warranty_months INTEGER,
  warranty_type warranty_type_enum DEFAULT 'retailer',
  offers_extended_warranty BOOLEAN DEFAULT false,
  warranty_info TEXT,
  
  -- Finance Options (BNPL UK)
  offers_finance BOOLEAN DEFAULT false,
  offers_zero_percent_finance BOOLEAN DEFAULT false,
  finance_providers finance_provider_enum[],
  min_finance_amount DECIMAL(10,2),
  finance_info TEXT,
  
  -- Fulfillment
  offers_click_collect BOOLEAN DEFAULT false,
  offers_reserve_collect BOOLEAN DEFAULT false,
  
  -- Services
  offers_repair_service BOOLEAN DEFAULT false,
  offers_parts BOOLEAN DEFAULT false,
  
  -- Stock Info
  grades_stocked grade_level_enum[] DEFAULT ARRAY['B-grade']::grade_level_enum[],
  primary_categories TEXT[],
  brands_stocked TEXT[],
  typical_discount_min INTEGER,
  typical_discount_max INTEGER,
  
  -- Backlink Reciprocity
  backlink_status backlink_status_enum DEFAULT 'pending',
  backlink_verified_at TIMESTAMPTZ,
  backlink_anchor_text VARCHAR(200),
  backlink_source_url VARCHAR(500),
  
  -- Ratings (aggregated from reviews)
  average_rating NUMERIC(3,2),
  review_count INTEGER DEFAULT 0,
  
  -- Scoring
  completeness_score INTEGER DEFAULT 0,
  freshness_score INTEGER DEFAULT 0,
  backlink_score INTEGER DEFAULT 0,
  overall_score INTEGER GENERATED ALWAYS AS (
    GREATEST(0, LEAST(100, 
      (COALESCE(completeness_score, 0) * 0.4 + 
       COALESCE(freshness_score, 0) * 0.3 + 
       COALESCE(backlink_score, 0) * 0.3)::INTEGER
    ))
  ) STORED,
  
  -- SEO
  seo_title VARCHAR(255),
  seo_meta_description TEXT,
  schema_json JSONB,
  
  -- Status
  status store_status_enum DEFAULT 'pending',
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_indexable BOOLEAN DEFAULT true,
  verification_date TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_verified_at TIMESTAMPTZ
);

COMMENT ON TABLE stores IS 'Single-location stores. For multi-location, add store_locations table post-MVP: store_locations(store_id, place_id, address, phone, hours, is_primary)';

-- ============================================================================
-- SECTION 7: SERVICE PROVIDERS (REPAIR)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.service_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id UUID REFERENCES places(id) ON DELETE SET NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Core Identity
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  trading_name VARCHAR(255),
  
  -- Contact (phone is PRIMARY CTA)
  phone VARCHAR(50) NOT NULL,
  phone_secondary VARCHAR(50),
  email VARCHAR(255),
  website VARCHAR(500),
  
  -- Social
  facebook_url VARCHAR(500),
  google_maps_url VARCHAR(500),
  
  -- Address (primary base)
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city_name VARCHAR(200),
  postcode VARCHAR(20),
  latitude NUMERIC(10, 8),
  longitude NUMERIC(11, 8),
  
  -- Business Details
  description TEXT,
  short_description VARCHAR(500),
  operating_hours JSONB,
  years_trading INTEGER,
  number_of_engineers INTEGER DEFAULT 1,
  company_number VARCHAR(20),
  vat_number VARCHAR(20),
  
  -- Pricing
  callout_fee_from NUMERIC(8,2),
  callout_fee_to NUMERIC(8,2),
  no_fix_no_fee BOOLEAN DEFAULT false,
  free_quotes BOOLEAN DEFAULT false,
  
  -- Availability
  offers_same_day BOOLEAN DEFAULT false,
  offers_next_day BOOLEAN DEFAULT false,
  offers_emergency BOOLEAN DEFAULT false,
  offers_weekend BOOLEAN DEFAULT false,
  offers_evening BOOLEAN DEFAULT false,
  typical_response_time VARCHAR(100),
  
  -- Certifications & Trust (UK-specific)
  gas_safe_registered BOOLEAN DEFAULT false,
  gas_safe_number VARCHAR(50),
  gas_safe_expiry DATE,
  fgas_certified BOOLEAN DEFAULT false,
  which_trusted_trader BOOLEAN DEFAULT false,
  checkatrade_member BOOLEAN DEFAULT false,
  checkatrade_id VARCHAR(50),
  trustatrader_member BOOLEAN DEFAULT false,
  public_liability_insurance BOOLEAN DEFAULT false,
  insurance_amount NUMERIC(12,2),
  
  -- Warranty on Repairs
  warranty_on_repairs_months INTEGER,
  warranty_on_parts_months INTEGER,
  uses_genuine_parts BOOLEAN DEFAULT true,
  
  -- Ratings (aggregated from reviews)
  average_rating NUMERIC(3,2),
  review_count INTEGER DEFAULT 0,
  
  -- Media
  logo_url VARCHAR(500),
  cover_image_url VARCHAR(500),
  
  -- Scoring
  completeness_score INTEGER DEFAULT 0,
  freshness_score INTEGER DEFAULT 0,
  rating_score INTEGER DEFAULT 0,
  provider_score INTEGER GENERATED ALWAYS AS (
    GREATEST(0, LEAST(100, 
      (COALESCE(completeness_score, 0) * 0.35 + 
       COALESCE(freshness_score, 0) * 0.25 + 
       COALESCE(rating_score, 0) * 0.4)::INTEGER
    ))
  ) STORED,
  
  -- SEO
  seo_title VARCHAR(255),
  seo_meta_description TEXT,
  schema_json JSONB,
  
  -- Status
  status provider_status_enum DEFAULT 'pending',
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_indexable BOOLEAN DEFAULT true,
  last_verified_at TIMESTAMPTZ,
  claimed_by_owner BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE service_providers IS 'Single-base providers with coverage areas. For multi-location, add provider_locations table post-MVP: provider_locations(provider_id, place_id, address, phone, hours, is_primary)';

-- ============================================================================
-- SECTION 8: STORE RELATIONSHIPS
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.store_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES appliance_categories(id) ON DELETE CASCADE,
  approximate_stock_count INTEGER DEFAULT 0,
  has_current_stock BOOLEAN DEFAULT true,
  grades_available grade_level_enum[],
  price_min DECIMAL(10,2),
  price_max DECIMAL(10,2),
  last_updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT store_categories_unique UNIQUE (store_id, category_id)
);

CREATE TABLE IF NOT EXISTS public.store_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  approximate_stock_count INTEGER DEFAULT 0,
  has_current_stock BOOLEAN DEFAULT true,
  last_updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT store_brands_unique UNIQUE (store_id, brand_id)
);

CREATE TABLE IF NOT EXISTS public.store_service_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  delivery_available BOOLEAN DEFAULT true,
  installation_available BOOLEAN DEFAULT false,
  estimated_delivery_days INTEGER,
  delivery_fee DECIMAL(10, 2),
  priority INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT store_service_areas_unique UNIQUE (store_id, place_id)
);

-- Register store slugs in slug_registry
CREATE OR REPLACE FUNCTION register_store_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO slug_registry (slug, entity_type, entity_id)
    VALUES (NEW.slug, 'store', NEW.id)
    ON CONFLICT (slug) DO UPDATE SET entity_id = EXCLUDED.entity_id
    WHERE slug_registry.entity_type = 'store';
  ELSIF TG_OP = 'UPDATE' AND NEW.slug != OLD.slug THEN
    DELETE FROM slug_registry WHERE entity_id = OLD.id AND entity_type = 'store';
    INSERT INTO slug_registry (slug, entity_type, entity_id)
    VALUES (NEW.slug, 'store', NEW.id)
    ON CONFLICT (slug) DO NOTHING;
  ELSIF TG_OP = 'DELETE' THEN
    DELETE FROM slug_registry WHERE entity_id = OLD.id AND entity_type = 'store';
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER store_slug_registry_trigger
  AFTER INSERT OR UPDATE OF slug OR DELETE ON stores
  FOR EACH ROW EXECUTE FUNCTION register_store_slug();

-- ============================================================================
-- SECTION 9: PROVIDER RELATIONSHIPS
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.provider_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES service_providers(id) ON DELETE CASCADE,
  appliance_category_id UUID NOT NULL REFERENCES appliance_categories(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  -- Availability overrides
  offers_same_day BOOLEAN,
  offers_next_day BOOLEAN,
  emergency_callout BOOLEAN,
  -- Pricing overrides (per-appliance)
  callout_fee_min NUMERIC(8,2),
  callout_fee_max NUMERIC(8,2),
  repair_warranty_months INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT provider_services_unique UNIQUE (provider_id, appliance_category_id)
);

CREATE TABLE IF NOT EXISTS public.provider_coverage_places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES service_providers(id) ON DELETE CASCADE,
  place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  additional_callout_fee NUMERIC(8,2) DEFAULT 0,
  same_day_available BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT provider_coverage_unique UNIQUE (provider_id, place_id)
);

CREATE TABLE IF NOT EXISTS public.provider_brand_authorisations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES service_providers(id) ON DELETE CASCADE,
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  authorisation_type VARCHAR(100),
  certificate_number VARCHAR(100),
  valid_from DATE,
  valid_until DATE,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT provider_brand_auth_unique UNIQUE (provider_id, brand_id)
);

-- Register provider slugs in slug_registry
CREATE OR REPLACE FUNCTION register_provider_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO slug_registry (slug, entity_type, entity_id)
    VALUES (NEW.slug, 'provider', NEW.id)
    ON CONFLICT (slug) DO UPDATE SET entity_id = EXCLUDED.entity_id
    WHERE slug_registry.entity_type = 'provider';
  ELSIF TG_OP = 'UPDATE' AND NEW.slug != OLD.slug THEN
    DELETE FROM slug_registry WHERE entity_id = OLD.id AND entity_type = 'provider';
    INSERT INTO slug_registry (slug, entity_type, entity_id)
    VALUES (NEW.slug, 'provider', NEW.id)
    ON CONFLICT (slug) DO NOTHING;
  ELSIF TG_OP = 'DELETE' THEN
    DELETE FROM slug_registry WHERE entity_id = OLD.id AND entity_type = 'provider';
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER provider_slug_registry_trigger
  AFTER INSERT OR UPDATE OF slug OR DELETE ON service_providers
  FOR EACH ROW EXECUTE FUNCTION register_provider_slug();

-- ============================================================================
-- SECTION 10: REVIEWS (WITH ANTI-SPAM COLUMNS)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Polymorphic reference
  subject_type subject_type_enum NOT NULL,
  subject_id UUID NOT NULL,
  
  -- Review content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  content TEXT,
  
  -- Reviewer
  reviewer_name VARCHAR(200),
  reviewer_location VARCHAR(200),
  reviewer_email VARCHAR(255),
  is_verified_customer BOOLEAN DEFAULT false,
  
  -- User reference (from v4.1)
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Anti-spam fields (from v4.1)
  ip_address INET,
  user_agent VARCHAR(500),
  spam_score NUMERIC(3,2) DEFAULT 0,
  flag_count INTEGER DEFAULT 0,
  
  -- Service details (optional)
  appliance_category_id UUID REFERENCES appliance_categories(id),
  service_date DATE,
  problem_description VARCHAR(500),
  
  -- Sub-ratings (optional)
  rating_value_for_money INTEGER CHECK (rating_value_for_money BETWEEN 1 AND 5),
  rating_punctuality INTEGER CHECK (rating_punctuality BETWEEN 1 AND 5),
  rating_quality INTEGER CHECK (rating_quality BETWEEN 1 AND 5),
  rating_communication INTEGER CHECK (rating_communication BETWEEN 1 AND 5),
  would_recommend BOOLEAN,
  
  -- Business response
  response TEXT,
  response_at TIMESTAMPTZ,
  
  -- Moderation (using enum for cleaner handling)
  status VARCHAR(20) DEFAULT 'pending',
  moderation_notes TEXT,
  moderated_at TIMESTAMPTZ,
  moderated_by UUID REFERENCES auth.users(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SECTION 11: REVIEW REPORTS (ABUSE REPORTING)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.review_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  reporter_user_id UUID REFERENCES auth.users(id),
  reporter_email VARCHAR(255),
  reason VARCHAR(100) NOT NULL,
  details TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'dismissed', 'actioned')),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SECTION 12: CLICK EVENTS (WITH GDPR CONSENT)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.click_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Event type
  event_type click_event_type_enum NOT NULL,
  
  -- Subject (polymorphic)
  subject_type subject_type_enum,
  subject_id UUID,
  
  -- Context
  place_id UUID REFERENCES places(id),
  appliance_category_id UUID REFERENCES appliance_categories(id),
  page_path VARCHAR(500),
  page_type VARCHAR(50),
  
  -- Session (no PII)
  session_id VARCHAR(100),
  referrer VARCHAR(500),
  user_agent TEXT,
  
  -- For affiliate clicks
  affiliate_partner VARCHAR(100),
  affiliate_link VARCHAR(500),
  
  -- GDPR consent (from v4.1)
  consent_given BOOLEAN DEFAULT true,
  consent_timestamp TIMESTAMPTZ,
  
  clicked_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON COLUMN click_events.consent_given IS 'User consented to tracking (GDPR). True by default for essential analytics.';

-- Polymorphic FK validation for click_events
CREATE OR REPLACE FUNCTION validate_click_event_subject()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.subject_type = 'store' AND NEW.subject_id IS NOT NULL THEN
    IF NOT EXISTS (SELECT 1 FROM stores WHERE id = NEW.subject_id) THEN
      RAISE EXCEPTION 'Invalid store reference: %', NEW.subject_id;
    END IF;
  ELSIF NEW.subject_type = 'provider' AND NEW.subject_id IS NOT NULL THEN
    IF NOT EXISTS (SELECT 1 FROM service_providers WHERE id = NEW.subject_id) THEN
      RAISE EXCEPTION 'Invalid provider reference: %', NEW.subject_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_click_event_subject_trigger
  BEFORE INSERT ON click_events
  FOR EACH ROW EXECUTE FUNCTION validate_click_event_subject();

-- ============================================================================
-- SECTION 13: PAGE INDEXABILITY (ANTI-THIN GATING)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.page_indexability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_type page_type_enum NOT NULL,
  place_id UUID REFERENCES places(id) ON DELETE CASCADE,
  category_id UUID REFERENCES appliance_categories(id) ON DELETE CASCADE,
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  canonical_url VARCHAR(500) NOT NULL UNIQUE,
  
  -- Counts
  store_count INTEGER DEFAULT 0,
  provider_count INTEGER DEFAULT 0,
  
  -- Thresholds
  min_stores_required INTEGER DEFAULT 2,
  min_providers_required INTEGER DEFAULT 2,
  
  -- Computed indexability
  is_retail_indexable BOOLEAN GENERATED ALWAYS AS (store_count >= min_stores_required) STORED,
  is_repair_indexable BOOLEAN GENERATED ALWAYS AS (provider_count >= min_providers_required) STORED,
  is_indexable BOOLEAN GENERATED ALWAYS AS (
    store_count >= min_stores_required OR provider_count >= min_providers_required
  ) STORED,
  
  last_count_update TIMESTAMPTZ DEFAULT NOW(),
  
  -- SEO
  seo_title VARCHAR(255),
  seo_meta_description TEXT,
  h1_heading VARCHAR(255),
  intro_paragraph TEXT,
  schema_json JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SECTION 14: SEASONAL & CONTENT
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.seasonal_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  seo_title VARCHAR(255),
  seo_meta_description TEXT,
  h1_heading VARCHAR(255),
  intro_paragraph TEXT,
  hero_image_url VARCHAR(500),
  cta_text VARCHAR(200),
  featured_category_ids UUID[],
  featured_brand_ids UUID[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO seasonal_campaigns (name, slug, start_date, end_date, seo_title, h1_heading) VALUES
  ('Black Friday Deals', 'black-friday', '2025-11-20', '2025-12-02', 'Black Friday Graded Appliance Deals 2025 | UK Graded Appliances', 'Black Friday Graded Appliance Deals 2025'),
  ('January Sale', 'january-sale', '2025-12-26', '2026-01-31', 'January Sale: Graded Appliances | UK Graded Appliances', 'January Sale: Graded Appliance Deals'),
  ('Spring Clearance', 'spring-clearance', '2026-02-01', '2026-04-30', 'Spring Clearance: Graded Appliances | UK Graded Appliances', 'Spring Clearance Sale');

CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  applies_to_categories UUID[],
  applies_to_brands UUID[],
  is_location_template BOOLEAN DEFAULT false,
  is_repair_faq BOOLEAN DEFAULT false,
  target_keywords TEXT[],
  usage_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed comprehensive UK FAQs (retail)
INSERT INTO faqs (question, answer, category, is_repair_faq, target_keywords, display_order) VALUES
  ('What does graded mean for appliances?',
   'Graded appliances are brand-new items that cannot be sold as "new" due to minor cosmetic imperfections, damaged packaging, or being ex-display models. They are fully functional and typically come with manufacturer or retailer warranties. Graded appliances offer savings of 20-70% off RRP.',
   'grades', false, ARRAY['graded appliances', 'what does graded mean', 'graded meaning'], 1),
  ('What is the difference between A-grade, B-grade and C-grade appliances?',
   'A-grade appliances have minimal cosmetic imperfections and are essentially new. B-grade items have noticeable marks or dents on visible surfaces but work perfectly. C-grade appliances have more significant cosmetic damage but are fully functional. All grades are unused and offer excellent value.',
   'grades', false, ARRAY['A-grade', 'B-grade', 'C-grade', 'grading system'], 2),
  ('What does factory seconds mean?',
   'Factory seconds are appliances that didn''t pass quality control due to minor cosmetic defects during manufacturing. They are brand new, unused, and fully functional. Factory seconds is another term for graded appliances commonly used in the UK.',
   'grades', false, ARRAY['factory seconds', 'factory second appliances'], 3),
  ('What is an ex-display appliance?',
   'Ex-display appliances were previously on show in retail stores or showrooms. They may have been connected for demonstration but have had minimal actual use. Ex-display items are typically A-grade or B-grade depending on their condition.',
   'grades', false, ARRAY['ex-display', 'ex-demo', 'showroom model'], 4),
  ('Do graded appliances come with a warranty?',
   'Yes, most graded appliances come with warranties. A-grade items often have full manufacturer warranties. B-grade and C-grade typically come with retailer warranties of 6-12 months. Some retailers offer extended warranty options for additional peace of mind.',
   'warranty', false, ARRAY['graded appliance warranty', 'warranty', 'guarantee'], 5),
  ('Can I get graded appliances delivered?',
   'Yes, most graded appliance retailers offer delivery services. Many offer free delivery over a certain order value (typically £300-500). Some retailers also offer next-day or same-day delivery options. Check individual store listings for their delivery coverage and costs.',
   'delivery', false, ARRAY['graded appliance delivery', 'delivery', 'free delivery'], 6),
  ('Can I buy graded appliances on finance?',
   'Yes, many graded appliance retailers offer finance options including 0% interest deals, Klarna, Clearpay, and traditional credit. This allows you to spread the cost over several months. Check individual store listings for their available finance providers.',
   'finance', false, ARRAY['graded appliances finance', '0% finance', 'Klarna', 'Clearpay'], 7);

-- Seed repair FAQs
INSERT INTO faqs (question, answer, category, is_repair_faq, target_keywords, display_order) VALUES
  ('How much does appliance repair cost in the UK?',
   'Appliance repair costs vary depending on the appliance type and problem. Typical callout fees range from £45-90. Simple repairs like replacing a belt or pump can cost £80-150 total, while more complex repairs involving motors or control boards can cost £150-300+. Many engineers offer "no fix, no fee" policies.',
   'repair_costs', true, ARRAY['appliance repair cost', 'repair cost uk', 'how much to repair'], 1),
  ('Should I repair or replace my appliance?',
   'As a general rule, if the repair cost exceeds 50% of a new appliance price, or if the appliance is over 8-10 years old, replacement may be more economical. However, quality brands often justify repair costs. Consider the appliance age, repair cost, energy efficiency of new models, and environmental impact.',
   'repair_advice', true, ARRAY['repair or replace', 'should I repair', 'worth repairing'], 2),
  ('How do I find a trusted appliance repair engineer?',
   'Look for engineers with relevant certifications (Gas Safe for gas appliances, F-Gas for refrigeration). Check for membership in trade bodies like Which? Trusted Traders or Checkatrade. Read reviews, ask about warranties on repairs, and confirm they have public liability insurance.',
   'finding_repair', true, ARRAY['find appliance repair', 'trusted engineer', 'appliance repair near me'], 3),
  ('Do I need a Gas Safe registered engineer?',
   'Yes, by law any work on gas appliances (gas cookers, gas hobs, gas ovens, gas tumble dryers) must be carried out by a Gas Safe registered engineer. You can verify registration at the Gas Safe Register website. Never use an unregistered engineer for gas work.',
   'certifications', true, ARRAY['gas safe registered', 'gas safe engineer', 'gas appliance repair'], 4),
  ('What warranty do repair engineers offer?',
   'Most reputable repair engineers offer warranties on their work, typically 3-12 months. This covers both labour and parts fitted. Always ask about warranty terms before booking a repair. Some engineers use genuine manufacturer parts which may carry separate manufacturer warranties.',
   'repair_warranty', true, ARRAY['repair warranty', 'guarantee on repair', 'repair guarantee'], 5),
  ('How quickly can I get an appliance repaired?',
   'Many appliance repair engineers offer same-day or next-day callouts. Emergency repairs for essential appliances like fridges and washing machines are often available. Standard bookings are typically within 1-3 days. Evening and weekend appointments may also be available.',
   'repair_timing', true, ARRAY['same day repair', 'emergency repair', 'how long to repair'], 6);

CREATE TABLE IF NOT EXISTS public.content_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  is_template BOOLEAN DEFAULT false,
  block_type VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SECTION 15: MONETIZATION TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.deal_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  place_ids UUID[],
  category_ids UUID[],
  brand_slugs TEXT[],
  max_price DECIMAL(10, 2),
  grade_preferences grade_level_enum[],
  requires_delivery BOOLEAN DEFAULT false,
  requires_finance BOOLEAN DEFAULT false,
  requires_click_collect BOOLEAN DEFAULT false,
  -- Repair alerts
  interested_in_repair BOOLEAN DEFAULT false,
  frequency VARCHAR(20) DEFAULT 'weekly',
  last_sent_at TIMESTAMPTZ,
  total_emails_sent INTEGER DEFAULT 0,
  total_clicks INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  unsubscribed_at TIMESTAMPTZ,
  source_page VARCHAR(500),
  source_campaign VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(100),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  affiliate_partner VARCHAR(100) NOT NULL,
  affiliate_link VARCHAR(500) NOT NULL,
  product_type VARCHAR(100),
  source_page VARCHAR(500),
  store_id UUID REFERENCES stores(id) ON DELETE SET NULL,
  provider_id UUID REFERENCES service_providers(id) ON DELETE SET NULL,
  place_id UUID REFERENCES places(id) ON DELETE SET NULL,
  category_id UUID REFERENCES appliance_categories(id) ON DELETE SET NULL,
  clicked_at TIMESTAMPTZ DEFAULT NOW(),
  converted BOOLEAN DEFAULT false,
  conversion_value DECIMAL(10, 2),
  commission_earned DECIMAL(10, 2),
  converted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.user_intents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(100),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  intent_type intent_type_enum NOT NULL,
  place_id UUID REFERENCES places(id),
  category_id UUID REFERENCES appliance_categories(id),
  brand_id UUID REFERENCES brands(id),
  store_id UUID REFERENCES stores(id),
  provider_id UUID REFERENCES service_providers(id),
  page_url VARCHAR(500),
  referrer VARCHAR(500),
  metadata JSONB,
  converted BOOLEAN DEFAULT false,
  conversion_type VARCHAR(50),
  conversion_value DECIMAL(10, 2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SECTION 16: AUTHORITY TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.backlink_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  source_url VARCHAR(500) NOT NULL,
  target_url VARCHAR(500) NOT NULL,
  anchor_text VARCHAR(300),
  status backlink_status_enum DEFAULT 'pending',
  is_dofollow BOOLEAN,
  first_detected_at TIMESTAMPTZ,
  last_verified_at TIMESTAMPTZ,
  last_check_at TIMESTAMPTZ,
  verification_attempts INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT backlink_tracking_unique UNIQUE (store_id, source_url)
);

CREATE TABLE IF NOT EXISTS public.claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_type claim_subject_type_enum NOT NULL,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES service_providers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  claim_reason TEXT,
  supporting_documents TEXT[],
  business_email VARCHAR(255),
  position_at_company VARCHAR(100),
  status claim_status_enum DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- Email verification
  verification_token UUID DEFAULT gen_random_uuid(),
  email_verified_at TIMESTAMPTZ,
  verification_sent_at TIMESTAMPTZ,
  verification_attempts INTEGER DEFAULT 0,
  CONSTRAINT claim_subject_check CHECK (
    (subject_type = 'store' AND store_id IS NOT NULL AND provider_id IS NULL) OR
    (subject_type = 'provider' AND provider_id IS NOT NULL AND store_id IS NULL)
  )
);

-- ============================================================================
-- SECTION 17: CALCULATOR TABLES (Phase 2)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.repair_issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appliance_category_id UUID NOT NULL REFERENCES appliance_categories(id),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL,
  description TEXT,
  symptoms TEXT[],
  category VARCHAR(100),
  severity VARCHAR(20),
  urgency VARCHAR(20),
  common_causes TEXT[],
  diy_possible BOOLEAN DEFAULT false,
  diy_instructions TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT repair_issues_unique UNIQUE (appliance_category_id, slug)
);

CREATE TABLE IF NOT EXISTS public.repair_cost_bands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appliance_category_id UUID NOT NULL REFERENCES appliance_categories(id),
  issue_id UUID REFERENCES repair_issues(id),
  region VARCHAR(50) DEFAULT 'uk',
  min_cost NUMERIC(8,2),
  max_cost NUMERIC(8,2),
  avg_cost NUMERIC(8,2),
  source VARCHAR(200),
  sample_size INTEGER,
  confidence VARCHAR(20),
  last_updated DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.appliance_lifespans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appliance_category_id UUID NOT NULL REFERENCES appliance_categories(id),
  brand_tier brand_tier_enum,
  min_lifespan_years INTEGER,
  avg_lifespan_years INTEGER NOT NULL,
  max_lifespan_years INTEGER,
  typical_first_repair_year INTEGER,
  source VARCHAR(200),
  last_updated DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT appliance_lifespans_unique UNIQUE (appliance_category_id, brand_tier)
);

-- ============================================================================
-- SECTION 18: GEO-SPATIAL FUNCTIONS (Haversine, Bounding Box, RPC)
-- ============================================================================

-- Haversine distance function (calculates distance in miles)
CREATE OR REPLACE FUNCTION haversine_distance_miles(
  lat1 NUMERIC,
  lon1 NUMERIC,
  lat2 NUMERIC,
  lon2 NUMERIC
)
RETURNS NUMERIC AS $$
DECLARE
  earth_radius_miles CONSTANT NUMERIC := 3959;
  lat1_rad NUMERIC;
  lat2_rad NUMERIC;
  delta_lat NUMERIC;
  delta_lon NUMERIC;
  a NUMERIC;
  c NUMERIC;
BEGIN
  IF lat1 IS NULL OR lon1 IS NULL OR lat2 IS NULL OR lon2 IS NULL THEN
    RETURN NULL;
  END IF;
  
  lat1_rad := RADIANS(lat1);
  lat2_rad := RADIANS(lat2);
  delta_lat := RADIANS(lat2 - lat1);
  delta_lon := RADIANS(lon2 - lon1);
  
  a := SIN(delta_lat / 2) ^ 2 + COS(lat1_rad) * COS(lat2_rad) * SIN(delta_lon / 2) ^ 2;
  c := 2 * ATAN2(SQRT(a), SQRT(1 - a));
  
  RETURN ROUND((earth_radius_miles * c)::NUMERIC, 2);
END;
$$ LANGUAGE plpgsql IMMUTABLE PARALLEL SAFE;

COMMENT ON FUNCTION haversine_distance_miles IS 
'Calculates great-circle distance between two points in miles using Haversine formula. 
Accurate for UK distances. IMMUTABLE allows query optimizer to cache results.';

-- Bounding box helper function
CREATE OR REPLACE FUNCTION calculate_bounding_box(
  center_lat NUMERIC,
  center_lon NUMERIC,
  radius_miles INTEGER
)
RETURNS TABLE (
  min_lat NUMERIC,
  max_lat NUMERIC,
  min_lon NUMERIC,
  max_lon NUMERIC
) AS $$
DECLARE
  lat_delta NUMERIC;
  lon_delta NUMERIC;
  avg_lat_rad NUMERIC;
BEGIN
  avg_lat_rad := RADIANS(center_lat);
  lat_delta := radius_miles::NUMERIC / 69.0;
  lon_delta := radius_miles::NUMERIC / (69.0 * COS(avg_lat_rad));
  
  RETURN QUERY SELECT
    center_lat - lat_delta AS min_lat,
    center_lat + lat_delta AS max_lat,
    center_lon - lon_delta AS min_lon,
    center_lon + lon_delta AS max_lon;
END;
$$ LANGUAGE plpgsql IMMUTABLE PARALLEL SAFE;

COMMENT ON FUNCTION calculate_bounding_box IS 
'Returns rectangular bounding box for fast initial filtering. 
Box is intentionally slightly larger than radius to ensure no edge cases missed.';

-- Main RPC function for nearby entities
CREATE OR REPLACE FUNCTION get_nearby_entities(
  p_lat NUMERIC,
  p_lon NUMERIC,
  p_radius_miles INTEGER DEFAULT 25,
  p_filter_type TEXT DEFAULT 'store',
  p_limit INTEGER DEFAULT 50,
  p_category_slug TEXT DEFAULT NULL,
  p_include_inactive BOOLEAN DEFAULT FALSE
)
RETURNS JSONB AS $$
DECLARE
  v_min_lat NUMERIC;
  v_max_lat NUMERIC;
  v_min_lon NUMERIC;
  v_max_lon NUMERIC;
  v_result JSONB;
BEGIN
  IF p_lat IS NULL OR p_lon IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Latitude and longitude are required',
      'entities', '[]'::jsonb
    );
  END IF;
  
  IF p_filter_type NOT IN ('store', 'provider') THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'filter_type must be "store" or "provider"',
      'entities', '[]'::jsonb
    );
  END IF;
  
  p_radius_miles := LEAST(GREATEST(p_radius_miles, 1), 100);
  p_limit := LEAST(GREATEST(p_limit, 1), 200);
  
  SELECT bb.min_lat, bb.max_lat, bb.min_lon, bb.max_lon
  INTO v_min_lat, v_max_lat, v_min_lon, v_max_lon
  FROM calculate_bounding_box(p_lat, p_lon, p_radius_miles) bb;
  
  IF p_filter_type = 'store' THEN
    SELECT jsonb_build_object(
      'success', true,
      'center', jsonb_build_object('lat', p_lat, 'lon', p_lon),
      'radius_miles', p_radius_miles,
      'entity_type', 'store',
      'count', COUNT(*),
      'entities', COALESCE(jsonb_agg(
        jsonb_build_object(
          'id', e.id,
          'name', e.business_name,
          'slug', e.slug,
          'lat', e.latitude,
          'lon', e.longitude,
          'distance_miles', e.distance_miles,
          'average_rating', e.average_rating,
          'review_count', e.review_count,
          'short_description', e.short_description,
          'phone', e.phone,
          'postcode', e.postcode,
          'is_verified', (e.status = 'verified'),
          'is_featured', e.is_featured,
          'offers_delivery', e.offers_delivery,
          'offers_click_collect', e.offers_click_collect,
          'place_name', e.place_name,
          'place_slug', e.place_slug,
          'country_slug', e.country_slug
        ) ORDER BY e.distance_miles ASC
      ), '[]'::jsonb)
    )
    INTO v_result
    FROM (
      SELECT 
        s.id,
        s.business_name,
        s.slug,
        s.latitude,
        s.longitude,
        s.average_rating,
        s.review_count,
        s.short_description,
        s.phone,
        s.postcode,
        s.status,
        s.is_featured,
        s.offers_delivery,
        s.offers_click_collect,
        p.name AS place_name,
        p.slug AS place_slug,
        c.slug AS country_slug,
        haversine_distance_miles(p_lat, p_lon, s.latitude, s.longitude) AS distance_miles
      FROM stores s
      JOIN places p ON s.place_id = p.id
      JOIN countries c ON p.country_id = c.id
      LEFT JOIN store_categories sc ON s.id = sc.store_id
      LEFT JOIN appliance_categories ac ON sc.category_id = ac.id
      WHERE 
        s.latitude BETWEEN v_min_lat AND v_max_lat
        AND s.longitude BETWEEN v_min_lon AND v_max_lon
        AND (p_include_inactive OR (s.is_active = true AND s.status IN ('active', 'claimed', 'verified')))
        AND (p_category_slug IS NULL OR ac.slug = p_category_slug)
      GROUP BY s.id, p.id, c.slug
      HAVING haversine_distance_miles(p_lat, p_lon, s.latitude, s.longitude) <= p_radius_miles
      ORDER BY haversine_distance_miles(p_lat, p_lon, s.latitude, s.longitude) ASC
      LIMIT p_limit
    ) e;
    
  ELSE -- provider
    SELECT jsonb_build_object(
      'success', true,
      'center', jsonb_build_object('lat', p_lat, 'lon', p_lon),
      'radius_miles', p_radius_miles,
      'entity_type', 'provider',
      'count', COUNT(*),
      'entities', COALESCE(jsonb_agg(
        jsonb_build_object(
          'id', e.id,
          'name', e.name,
          'slug', e.slug,
          'lat', e.latitude,
          'lon', e.longitude,
          'distance_miles', e.distance_miles,
          'average_rating', e.average_rating,
          'review_count', e.review_count,
          'short_description', e.short_description,
          'phone', e.phone,
          'postcode', e.postcode,
          'is_verified', e.is_verified,
          'is_featured', e.is_featured,
          'offers_same_day', e.offers_same_day,
          'offers_emergency', e.offers_emergency,
          'callout_fee_from', e.callout_fee_from,
          'gas_safe_registered', e.gas_safe_registered,
          'base_city_name', e.base_city_name,
          'base_city_slug', e.base_city_slug,
          'country_slug', e.country_slug
        ) ORDER BY e.distance_miles ASC
      ), '[]'::jsonb)
    )
    INTO v_result
    FROM (
      SELECT 
        sp.id,
        sp.name,
        sp.slug,
        sp.latitude,
        sp.longitude,
        sp.average_rating,
        sp.review_count,
        sp.short_description,
        sp.phone,
        sp.postcode,
        sp.is_verified,
        sp.is_featured,
        sp.offers_same_day,
        sp.offers_emergency,
        sp.callout_fee_from,
        sp.gas_safe_registered,
        p.name AS base_city_name,
        p.slug AS base_city_slug,
        c.slug AS country_slug,
        haversine_distance_miles(p_lat, p_lon, sp.latitude, sp.longitude) AS distance_miles
      FROM service_providers sp
      LEFT JOIN places p ON sp.place_id = p.id
      LEFT JOIN countries c ON p.country_id = c.id
      LEFT JOIN provider_services ps ON sp.id = ps.provider_id
      LEFT JOIN appliance_categories ac ON ps.appliance_category_id = ac.id
      WHERE 
        sp.latitude BETWEEN v_min_lat AND v_max_lat
        AND sp.longitude BETWEEN v_min_lon AND v_max_lon
        AND (p_include_inactive OR (sp.is_active = true AND sp.status IN ('active', 'claimed', 'verified')))
        AND (p_category_slug IS NULL OR ac.slug = p_category_slug)
      GROUP BY sp.id, p.id, c.slug
      HAVING haversine_distance_miles(p_lat, p_lon, sp.latitude, sp.longitude) <= p_radius_miles
      ORDER BY haversine_distance_miles(p_lat, p_lon, sp.latitude, sp.longitude) ASC
      LIMIT p_limit
    ) e;
  END IF;
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

COMMENT ON FUNCTION get_nearby_entities IS 
'Returns nearby stores or providers using Box-First Hybrid Query strategy.
Step 1: Bounding box filter eliminates ~99% of rows (fast B-tree index scan).
Step 2: Haversine formula calculates precise distance on remaining rows.';

-- Get entities with fallback (Zero State Pivot)
CREATE OR REPLACE FUNCTION get_entities_with_fallback(
  p_place_slug TEXT,
  p_filter_type TEXT DEFAULT 'store',
  p_category_slug TEXT DEFAULT NULL,
  p_initial_radius INTEGER DEFAULT 10,
  p_max_radius INTEGER DEFAULT 50,
  p_min_results INTEGER DEFAULT 3
)
RETURNS JSONB AS $$
DECLARE
  v_place_lat NUMERIC;
  v_place_lon NUMERIC;
  v_current_radius INTEGER;
  v_result JSONB;
  v_count INTEGER;
BEGIN
  SELECT latitude, longitude 
  INTO v_place_lat, v_place_lon
  FROM places 
  WHERE slug = p_place_slug AND is_active = true;
  
  IF v_place_lat IS NULL OR v_place_lon IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Place not found or has no coordinates',
      'place_slug', p_place_slug,
      'entities', '[]'::jsonb
    );
  END IF;
  
  v_current_radius := p_initial_radius;
  
  WHILE v_current_radius <= p_max_radius LOOP
    v_result := get_nearby_entities(
      v_place_lat, 
      v_place_lon, 
      v_current_radius, 
      p_filter_type,
      50,
      p_category_slug
    );
    
    v_count := (v_result->>'count')::INTEGER;
    
    IF v_count >= p_min_results THEN
      v_result := v_result || jsonb_build_object(
        'place_slug', p_place_slug,
        'initial_radius', p_initial_radius,
        'effective_radius', v_current_radius,
        'radius_expanded', v_current_radius > p_initial_radius
      );
      RETURN v_result;
    END IF;
    
    v_current_radius := v_current_radius + 10;
  END LOOP;
  
  v_result := v_result || jsonb_build_object(
    'place_slug', p_place_slug,
    'initial_radius', p_initial_radius,
    'effective_radius', p_max_radius,
    'radius_expanded', true,
    'note', 'Maximum radius reached with fewer than desired results'
  );
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

COMMENT ON FUNCTION get_entities_with_fallback IS 
'Implements "Zero State Pivot" strategy. Progressively expands search radius until minimum results found.
Useful for rural areas with sparse coverage.';

-- ============================================================================
-- SECTION 19: CORE FUNCTIONS & TRIGGERS
-- ============================================================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_countries_updated_at BEFORE UPDATE ON countries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_areas_updated_at BEFORE UPDATE ON admin_areas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_places_updated_at BEFORE UPDATE ON places FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stores_updated_at BEFORE UPDATE ON stores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON service_providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_blocks_updated_at BEFORE UPDATE ON content_blocks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_deal_alerts_updated_at BEFORE UPDATE ON deal_alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_claims_updated_at BEFORE UPDATE ON claims FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_backlink_tracking_updated_at BEFORE UPDATE ON backlink_tracking FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON appliance_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_page_indexability_updated_at BEFORE UPDATE ON page_indexability FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Store scoring function
CREATE OR REPLACE FUNCTION calculate_store_scores()
RETURNS TRIGGER AS $$
BEGIN
  NEW.completeness_score := 0;
  
  -- Basic info (30 points)
  IF NEW.description IS NOT NULL AND LENGTH(NEW.description) > 100 THEN NEW.completeness_score := NEW.completeness_score + 10; END IF;
  IF NEW.short_description IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  IF NEW.phone IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 10; END IF;
  IF NEW.email IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  
  -- Address (15 points)
  IF NEW.address_line1 IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  IF NEW.postcode IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  IF NEW.latitude IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  
  -- Website & Social (15 points)
  IF NEW.website IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 10; END IF;
  IF NEW.google_maps_url IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  
  -- Business details (10 points)
  IF NEW.operating_hours IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  IF NEW.year_established IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  
  -- UK Commerce fields (30 points)
  IF NEW.warranty_months IS NOT NULL AND NEW.warranty_months > 0 THEN NEW.completeness_score := NEW.completeness_score + 10; END IF;
  IF NEW.offers_delivery THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  IF NEW.offers_finance THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  IF NEW.offers_click_collect THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  IF array_length(NEW.grades_stocked, 1) > 1 THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  
  NEW.completeness_score := LEAST(NEW.completeness_score, 100);
  
  -- Freshness score
  NEW.freshness_score := CASE 
    WHEN NEW.updated_at > NOW() - INTERVAL '7 days' THEN 100
    WHEN NEW.updated_at > NOW() - INTERVAL '30 days' THEN 80
    WHEN NEW.updated_at > NOW() - INTERVAL '90 days' THEN 60
    WHEN NEW.updated_at > NOW() - INTERVAL '180 days' THEN 40
    ELSE 20
  END;
  
  -- Backlink score
  NEW.backlink_score := CASE NEW.backlink_status
    WHEN 'verified' THEN 100
    WHEN 'pending' THEN 20
    WHEN 'broken' THEN 10
    ELSE 0
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER store_scores_trigger
  BEFORE INSERT OR UPDATE ON stores
  FOR EACH ROW EXECUTE FUNCTION calculate_store_scores();

-- Provider scoring function
CREATE OR REPLACE FUNCTION calculate_provider_scores()
RETURNS TRIGGER AS $$
BEGIN
  NEW.completeness_score := 0;
  
  -- Basic info (30 points)
  IF NEW.description IS NOT NULL AND LENGTH(NEW.description) > 100 THEN NEW.completeness_score := NEW.completeness_score + 10; END IF;
  IF NEW.short_description IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  IF NEW.phone IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 10; END IF;
  IF NEW.email IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  
  -- Address (15 points)
  IF NEW.address_line1 IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  IF NEW.postcode IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  IF NEW.latitude IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  
  -- Website (10 points)
  IF NEW.website IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 10; END IF;
  
  -- Business details (15 points)
  IF NEW.operating_hours IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  IF NEW.years_trading IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  IF NEW.callout_fee_from IS NOT NULL THEN NEW.completeness_score := NEW.completeness_score + 5; END IF;
  
  -- Trust signals (30 points)
  IF NEW.gas_safe_registered THEN NEW.completeness_score := NEW.completeness_score + 10; END IF;
  IF NEW.public_liability_insurance THEN NEW.completeness_score := NEW.completeness_score + 10; END IF;
  IF NEW.warranty_on_repairs_months IS NOT NULL AND NEW.warranty_on_repairs_months > 0 THEN NEW.completeness_score := NEW.completeness_score + 10; END IF;
  
  NEW.completeness_score := LEAST(NEW.completeness_score, 100);
  
  -- Freshness score
  NEW.freshness_score := CASE 
    WHEN NEW.updated_at > NOW() - INTERVAL '7 days' THEN 100
    WHEN NEW.updated_at > NOW() - INTERVAL '30 days' THEN 80
    WHEN NEW.updated_at > NOW() - INTERVAL '90 days' THEN 60
    WHEN NEW.updated_at > NOW() - INTERVAL '180 days' THEN 40
    ELSE 20
  END;
  
  -- Rating score (0-100 based on average_rating)
  NEW.rating_score := COALESCE(NEW.average_rating * 20, 0)::INTEGER;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER provider_scores_trigger
  BEFORE INSERT OR UPDATE ON service_providers
  FOR EACH ROW EXECUTE FUNCTION calculate_provider_scores();

-- Update place counts from stores
CREATE OR REPLACE FUNCTION update_place_entity_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'stores' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE places SET store_count = store_count + 1 WHERE id = NEW.place_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE places SET store_count = GREATEST(0, store_count - 1) WHERE id = OLD.place_id;
    ELSIF TG_OP = 'UPDATE' AND NEW.place_id != OLD.place_id THEN
      UPDATE places SET store_count = GREATEST(0, store_count - 1) WHERE id = OLD.place_id;
      UPDATE places SET store_count = store_count + 1 WHERE id = NEW.place_id;
    END IF;
  END IF;
  
  UPDATE places SET is_indexable = (store_count >= min_stores_for_index OR provider_count >= min_providers_for_index)
  WHERE id = COALESCE(NEW.place_id, OLD.place_id);
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER store_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON stores
  FOR EACH ROW EXECUTE FUNCTION update_place_entity_counts();

-- Update provider counts on coverage
CREATE OR REPLACE FUNCTION update_provider_coverage_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE places SET provider_count = provider_count + 1 WHERE id = NEW.place_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE places SET provider_count = GREATEST(0, provider_count - 1) WHERE id = OLD.place_id;
  END IF;
  
  UPDATE places SET is_indexable = (store_count >= min_stores_for_index OR provider_count >= min_providers_for_index)
  WHERE id = COALESCE(NEW.place_id, OLD.place_id);
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER provider_coverage_count_trigger
  AFTER INSERT OR DELETE ON provider_coverage_places
  FOR EACH ROW EXECUTE FUNCTION update_provider_coverage_counts();

-- Update store rating from reviews
CREATE OR REPLACE FUNCTION update_store_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.subject_type = 'store' AND NEW.status = 'approved' THEN
    UPDATE stores
    SET 
      average_rating = (
        SELECT ROUND(AVG(rating)::numeric, 2)
        FROM reviews
        WHERE subject_type = 'store'
        AND subject_id = NEW.subject_id
        AND status = 'approved'
      ),
      review_count = (
        SELECT COUNT(*)
        FROM reviews
        WHERE subject_type = 'store'
        AND subject_id = NEW.subject_id
        AND status = 'approved'
      ),
      updated_at = NOW()
    WHERE id = NEW.subject_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_store_rating_trigger
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_store_rating();

-- Update provider rating from reviews
CREATE OR REPLACE FUNCTION update_provider_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.subject_type = 'provider' AND NEW.status = 'approved' THEN
    UPDATE service_providers
    SET 
      average_rating = (
        SELECT ROUND(AVG(rating)::numeric, 2)
        FROM reviews
        WHERE subject_type = 'provider'
        AND subject_id = NEW.subject_id
        AND status = 'approved'
      ),
      review_count = (
        SELECT COUNT(*)
        FROM reviews
        WHERE subject_type = 'provider'
        AND subject_id = NEW.subject_id
        AND status = 'approved'
      ),
      updated_at = NOW()
    WHERE id = NEW.subject_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_provider_rating_trigger
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_provider_rating();

-- Review flag count update
CREATE OR REPLACE FUNCTION update_review_flag_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE reviews 
  SET flag_count = (SELECT COUNT(*) FROM review_reports WHERE review_id = NEW.review_id)
  WHERE id = NEW.review_id;
  
  -- Auto-flag reviews with 3+ reports
  UPDATE reviews SET status = 'flagged' 
  WHERE id = NEW.review_id AND flag_count >= 3 AND status = 'approved';
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER review_report_trigger
  AFTER INSERT ON review_reports
  FOR EACH ROW EXECUTE FUNCTION update_review_flag_count();

-- Enhanced claim approval with race condition protection (v5.1)
CREATE OR REPLACE FUNCTION process_claim_approval()
RETURNS TRIGGER AS $$
DECLARE
  v_current_owner_id UUID;
  v_lock_acquired BOOLEAN;
BEGIN
  -- Only process status changes to 'approved'
  IF NEW.status != 'approved' OR OLD.status != 'pending' THEN
    RETURN NEW;
  END IF;

  -- Step 1: Acquire advisory lock to prevent concurrent approvals
  IF NEW.subject_type = 'store' THEN
    v_lock_acquired := pg_try_advisory_xact_lock(
      hashtext('claim_store_' || NEW.store_id::text)
    );
  ELSE
    v_lock_acquired := pg_try_advisory_xact_lock(
      hashtext('claim_provider_' || NEW.provider_id::text)
    );
  END IF;

  IF NOT v_lock_acquired THEN
    RAISE EXCEPTION 'Another claim approval is in progress. Please try again.';
  END IF;

  -- Step 2: Double-check ownership with row-level lock
  IF NEW.subject_type = 'store' THEN
    SELECT owner_id INTO v_current_owner_id
    FROM stores
    WHERE id = NEW.store_id
    FOR UPDATE;

    IF v_current_owner_id IS NOT NULL THEN
      NEW.status := 'rejected';
      NEW.rejection_reason := 'Store was claimed by another user during review';
      NEW.reviewed_at := NOW();
      RETURN NEW;
    END IF;

    UPDATE stores SET
      owner_id = NEW.user_id,
      status = 'claimed',
      updated_at = NOW()
    WHERE id = NEW.store_id;

    UPDATE claims SET
      status = 'rejected',
      rejection_reason = 'Another claim was approved first',
      reviewed_at = NOW()
    WHERE store_id = NEW.store_id
      AND id != NEW.id
      AND status = 'pending';

  ELSIF NEW.subject_type = 'provider' THEN
    SELECT owner_id INTO v_current_owner_id
    FROM service_providers
    WHERE id = NEW.provider_id
    FOR UPDATE;

    IF v_current_owner_id IS NOT NULL THEN
      NEW.status := 'rejected';
      NEW.rejection_reason := 'Provider was claimed by another user during review';
      NEW.reviewed_at := NOW();
      RETURN NEW;
    END IF;

    UPDATE service_providers SET
      owner_id = NEW.user_id,
      status = 'claimed',
      claimed_by_owner = true,
      updated_at = NOW()
    WHERE id = NEW.provider_id;

    UPDATE claims SET
      status = 'rejected',
      rejection_reason = 'Another claim was approved first',
      reviewed_at = NOW()
    WHERE provider_id = NEW.provider_id
      AND id != NEW.id
      AND status = 'pending';
  END IF;

  NEW.reviewed_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER claim_approval_trigger
  BEFORE UPDATE ON claims
  FOR EACH ROW EXECUTE FUNCTION process_claim_approval();

-- ============================================================================
-- COUNT RECONCILIATION FUNCTION (Added v5.1)
-- Run weekly to fix any count drift from failed triggers or bulk imports
-- ============================================================================

CREATE OR REPLACE FUNCTION reconcile_entity_counts()
RETURNS TABLE (
  entity_type TEXT,
  entity_name TEXT,
  old_count INTEGER,
  new_count INTEGER
) AS $$
BEGIN
  -- Reconcile place store counts
  RETURN QUERY
  WITH actual_counts AS (
    SELECT
      p.id,
      p.name,
      p.store_count as old_cnt,
      COUNT(s.id) FILTER (
        WHERE s.is_active = true
        AND s.status IN ('active', 'claimed', 'verified')
      )::INTEGER as new_cnt
    FROM places p
    LEFT JOIN stores s ON s.place_id = p.id
    GROUP BY p.id, p.name, p.store_count
    HAVING p.store_count != COUNT(s.id) FILTER (
      WHERE s.is_active = true
      AND s.status IN ('active', 'claimed', 'verified')
    )
  )
  UPDATE places p
  SET store_count = ac.new_cnt
  FROM actual_counts ac
  WHERE p.id = ac.id
  RETURNING 'place_store_count'::TEXT, ac.name, ac.old_cnt, ac.new_cnt;

  -- Reconcile place provider counts
  RETURN QUERY
  WITH actual_counts AS (
    SELECT
      p.id,
      p.name,
      p.provider_count as old_cnt,
      COUNT(DISTINCT CASE
        WHEN sp.is_active = true AND sp.status IN ('active', 'claimed', 'verified')
        THEN pcp.provider_id
      END)::INTEGER as new_cnt
    FROM places p
    LEFT JOIN provider_coverage_places pcp ON pcp.place_id = p.id
    LEFT JOIN service_providers sp ON sp.id = pcp.provider_id
    GROUP BY p.id, p.name, p.provider_count
    HAVING p.provider_count != COUNT(DISTINCT CASE
      WHEN sp.is_active = true AND sp.status IN ('active', 'claimed', 'verified')
      THEN pcp.provider_id
    END)
  )
  UPDATE places p
  SET provider_count = ac.new_cnt
  FROM actual_counts ac
  WHERE p.id = ac.id
  RETURNING 'place_provider_count'::TEXT, ac.name, ac.old_cnt, ac.new_cnt;

  -- Reconcile country store counts
  RETURN QUERY
  WITH actual_counts AS (
    SELECT
      c.id,
      c.name,
      c.store_count as old_cnt,
      COALESCE(SUM(p.store_count), 0)::INTEGER as new_cnt
    FROM countries c
    LEFT JOIN places p ON p.country_id = c.id
    GROUP BY c.id, c.name, c.store_count
    HAVING c.store_count != COALESCE(SUM(p.store_count), 0)
  )
  UPDATE countries c
  SET store_count = ac.new_cnt
  FROM actual_counts ac
  WHERE c.id = ac.id
  RETURNING 'country_store_count'::TEXT, ac.name, ac.old_cnt, ac.new_cnt;

  -- Reconcile country provider counts
  RETURN QUERY
  WITH actual_counts AS (
    SELECT
      c.id,
      c.name,
      c.provider_count as old_cnt,
      COALESCE(SUM(p.provider_count), 0)::INTEGER as new_cnt
    FROM countries c
    LEFT JOIN places p ON p.country_id = c.id
    GROUP BY c.id, c.name, c.provider_count
    HAVING c.provider_count != COALESCE(SUM(p.provider_count), 0)
  )
  UPDATE countries c
  SET provider_count = ac.new_cnt
  FROM actual_counts ac
  WHERE c.id = ac.id
  RETURNING 'country_provider_count'::TEXT, ac.name, ac.old_cnt, ac.new_cnt;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to authenticated users (for admin dashboard)
GRANT EXECUTE ON FUNCTION reconcile_entity_counts TO authenticated;

COMMENT ON FUNCTION reconcile_entity_counts IS
'Run weekly via cron or manually after bulk imports. Returns rows that were corrected.';

-- ============================================================================
-- SECTION 20: SLUG REGISTRY TRIGGERS
-- ============================================================================

-- Function to enforce slug uniqueness
CREATE OR REPLACE FUNCTION enforce_slug_uniqueness()
RETURNS TRIGGER AS $$
DECLARE
  entity_type_val VARCHAR(20);
BEGIN
  IF TG_TABLE_NAME = 'appliance_categories' THEN
    entity_type_val := 'category';
  ELSIF TG_TABLE_NAME = 'brands' THEN
    entity_type_val := 'brand';
  ELSE
    RETURN NEW;
  END IF;
  
  IF EXISTS (
    SELECT 1 FROM slug_registry 
    WHERE slug = NEW.slug 
    AND (entity_type != entity_type_val OR entity_id != NEW.id)
  ) THEN
    RAISE EXCEPTION 'Slug "%" already exists in another entity. Slugs must be unique across categories and brands.', NEW.slug;
  END IF;
  
  INSERT INTO slug_registry (slug, entity_type, entity_id)
  VALUES (NEW.slug, entity_type_val, NEW.id)
  ON CONFLICT (slug) DO UPDATE SET entity_id = NEW.id, entity_type = entity_type_val;
  
  IF TG_OP = 'UPDATE' AND OLD.slug != NEW.slug THEN
    DELETE FROM slug_registry WHERE slug = OLD.slug AND entity_id = OLD.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER category_slug_uniqueness
  BEFORE INSERT OR UPDATE ON appliance_categories
  FOR EACH ROW EXECUTE FUNCTION enforce_slug_uniqueness();

CREATE TRIGGER brand_slug_uniqueness
  BEFORE INSERT OR UPDATE ON brands
  FOR EACH ROW EXECUTE FUNCTION enforce_slug_uniqueness();

-- Cleanup on DELETE
CREATE OR REPLACE FUNCTION cleanup_slug_registry()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM slug_registry WHERE entity_id = OLD.id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER category_slug_cleanup
  AFTER DELETE ON appliance_categories
  FOR EACH ROW EXECUTE FUNCTION cleanup_slug_registry();

CREATE TRIGGER brand_slug_cleanup
  AFTER DELETE ON brands
  FOR EACH ROW EXECUTE FUNCTION cleanup_slug_registry();

-- ============================================================================
-- SECTION 21: ANTI-THIN GATING AUTO-RECOMPUTE TRIGGERS
-- ============================================================================

-- Recompute place_category indexability
CREATE OR REPLACE FUNCTION recompute_place_category_indexability()
RETURNS TRIGGER AS $$
DECLARE
  affected_place_id UUID;
  affected_category_id UUID;
  store_count_val INTEGER;
  provider_count_val INTEGER;
  min_required INTEGER;
BEGIN
  IF TG_OP = 'DELETE' THEN
    SELECT s.place_id INTO affected_place_id FROM stores s WHERE s.id = OLD.store_id;
    affected_category_id := OLD.category_id;
  ELSE
    SELECT s.place_id INTO affected_place_id FROM stores s WHERE s.id = NEW.store_id;
    affected_category_id := NEW.category_id;
  END IF;
  
  IF affected_place_id IS NULL OR affected_category_id IS NULL THEN
    RETURN NULL;
  END IF;
  
  SELECT COUNT(DISTINCT sc.store_id) INTO store_count_val
  FROM store_categories sc
  JOIN stores s ON s.id = sc.store_id
  WHERE s.place_id = affected_place_id 
    AND sc.category_id = affected_category_id
    AND s.is_active = true;
  
  SELECT COUNT(DISTINCT ps.provider_id) INTO provider_count_val
  FROM provider_services ps
  JOIN provider_coverage_places pcp ON pcp.provider_id = ps.provider_id
  WHERE pcp.place_id = affected_place_id 
    AND ps.appliance_category_id = affected_category_id
    AND ps.is_active = true;
  
  SELECT min_stores_for_index INTO min_required 
  FROM appliance_categories WHERE id = affected_category_id;
  
  INSERT INTO page_indexability (
    page_type, place_id, category_id, 
    store_count, provider_count,
    is_retail_indexable, is_repair_indexable, is_indexable,
    canonical_url
  )
  SELECT 
    'place_category',
    affected_place_id,
    affected_category_id,
    store_count_val,
    provider_count_val,
    store_count_val >= COALESCE(min_required, 2),
    provider_count_val >= COALESCE((SELECT min_providers_for_index FROM appliance_categories WHERE id = affected_category_id), 2),
    store_count_val >= COALESCE(min_required, 2) OR provider_count_val >= 2,
    (SELECT '/' || c.slug || '/' || p.slug || '/' || ac.slug || '/' 
     FROM places p 
     JOIN countries c ON c.id = p.country_id
     JOIN appliance_categories ac ON ac.id = affected_category_id
     WHERE p.id = affected_place_id)
  ON CONFLICT (canonical_url)
  DO UPDATE SET
    store_count = EXCLUDED.store_count,
    provider_count = EXCLUDED.provider_count,
    updated_at = NOW();
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER recompute_indexability_on_store_categories
  AFTER INSERT OR UPDATE OR DELETE ON store_categories
  FOR EACH ROW EXECUTE FUNCTION recompute_place_category_indexability();

-- Recompute place_brand indexability
CREATE OR REPLACE FUNCTION recompute_place_brand_indexability()
RETURNS TRIGGER AS $$
DECLARE
  affected_place_id UUID;
  affected_brand_id UUID;
  store_count_val INTEGER;
  min_required INTEGER;
BEGIN
  IF TG_OP = 'DELETE' THEN
    SELECT s.place_id INTO affected_place_id FROM stores s WHERE s.id = OLD.store_id;
    affected_brand_id := OLD.brand_id;
  ELSE
    SELECT s.place_id INTO affected_place_id FROM stores s WHERE s.id = NEW.store_id;
    affected_brand_id := NEW.brand_id;
  END IF;
  
  IF affected_place_id IS NULL OR affected_brand_id IS NULL THEN
    RETURN NULL;
  END IF;
  
  SELECT COUNT(DISTINCT sb.store_id) INTO store_count_val
  FROM store_brands sb
  JOIN stores s ON s.id = sb.store_id
  WHERE s.place_id = affected_place_id 
    AND sb.brand_id = affected_brand_id
    AND s.is_active = true;
  
  SELECT min_stores_for_index INTO min_required FROM brands WHERE id = affected_brand_id;
  
  INSERT INTO page_indexability (
    page_type, place_id, brand_id, 
    store_count, is_retail_indexable, is_indexable,
    canonical_url
  )
  SELECT 
    'place_brand',
    affected_place_id,
    affected_brand_id,
    store_count_val,
    store_count_val >= COALESCE(min_required, 3),
    store_count_val >= COALESCE(min_required, 3),
    (SELECT '/' || c.slug || '/' || p.slug || '/' || b.slug || '/' 
     FROM places p 
     JOIN countries c ON c.id = p.country_id
     JOIN brands b ON b.id = affected_brand_id
     WHERE p.id = affected_place_id)
  ON CONFLICT (canonical_url)
  DO UPDATE SET
    store_count = EXCLUDED.store_count,
    updated_at = NOW();
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER recompute_indexability_on_store_brands
  AFTER INSERT OR UPDATE OR DELETE ON store_brands
  FOR EACH ROW EXECUTE FUNCTION recompute_place_brand_indexability();

-- Recompute repair page indexability
CREATE OR REPLACE FUNCTION recompute_repair_page_indexability()
RETURNS TRIGGER AS $$
DECLARE
  affected_category_id UUID;
  coverage_place_id UUID;
  provider_count_val INTEGER;
  min_required INTEGER;
BEGIN
  IF TG_OP = 'DELETE' THEN
    affected_category_id := OLD.appliance_category_id;
  ELSE
    affected_category_id := NEW.appliance_category_id;
  END IF;
  
  FOR coverage_place_id IN (
    SELECT place_id FROM provider_coverage_places 
    WHERE provider_id = COALESCE(NEW.provider_id, OLD.provider_id)
  ) LOOP
    SELECT COUNT(DISTINCT ps.provider_id) INTO provider_count_val
    FROM provider_services ps
    JOIN provider_coverage_places pcp ON pcp.provider_id = ps.provider_id
    JOIN service_providers sp ON sp.id = ps.provider_id
    WHERE pcp.place_id = coverage_place_id 
      AND ps.appliance_category_id = affected_category_id
      AND ps.is_active = true
      AND sp.is_active = true;
    
    SELECT min_providers_for_index INTO min_required 
    FROM appliance_categories WHERE id = affected_category_id;
    
    INSERT INTO page_indexability (
      page_type, place_id, category_id, 
      provider_count, is_repair_indexable, is_indexable,
      canonical_url
    )
    SELECT 
      'place_repair',
      coverage_place_id,
      affected_category_id,
      provider_count_val,
      provider_count_val >= COALESCE(min_required, 2),
      provider_count_val >= COALESCE(min_required, 2),
      (SELECT '/' || c.slug || '/' || p.slug || '/' || ac.slug || '-repair/' 
       FROM places p 
       JOIN countries c ON c.id = p.country_id
       JOIN appliance_categories ac ON ac.id = affected_category_id
       WHERE p.id = coverage_place_id)
    ON CONFLICT (canonical_url)
    DO UPDATE SET
      provider_count = EXCLUDED.provider_count,
      updated_at = NOW();
  END LOOP;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER recompute_indexability_on_provider_services
  AFTER INSERT OR UPDATE OR DELETE ON provider_services
  FOR EACH ROW EXECUTE FUNCTION recompute_repair_page_indexability();

-- Batch recompute all page_indexability
CREATE OR REPLACE FUNCTION batch_recompute_all_indexability()
RETURNS void AS $$
BEGIN
  DELETE FROM page_indexability WHERE page_type = 'place_category';
  
  INSERT INTO page_indexability (page_type, place_id, category_id, store_count, provider_count, canonical_url)
  SELECT 
    'place_category',
    s.place_id,
    sc.category_id,
    COUNT(DISTINCT sc.store_id),
    COALESCE((
      SELECT COUNT(DISTINCT ps.provider_id)
      FROM provider_services ps
      JOIN provider_coverage_places pcp ON pcp.provider_id = ps.provider_id
      WHERE pcp.place_id = s.place_id AND ps.appliance_category_id = sc.category_id AND ps.is_active = true
    ), 0),
    (SELECT '/' || c.slug || '/' || p.slug || '/' || ac.slug || '/'
     FROM places p
     JOIN countries c ON c.id = p.country_id
     JOIN appliance_categories ac ON ac.id = sc.category_id
     WHERE p.id = s.place_id)
  FROM store_categories sc
  JOIN stores s ON s.id = sc.store_id AND s.is_active = true
  GROUP BY s.place_id, sc.category_id
  ON CONFLICT (canonical_url) DO UPDATE SET
    store_count = EXCLUDED.store_count,
    provider_count = EXCLUDED.provider_count,
    updated_at = NOW();
  
  DELETE FROM page_indexability WHERE page_type = 'place_brand';
  
  INSERT INTO page_indexability (page_type, place_id, brand_id, store_count, canonical_url)
  SELECT 
    'place_brand',
    s.place_id,
    sb.brand_id,
    COUNT(DISTINCT sb.store_id),
    (SELECT '/' || c.slug || '/' || p.slug || '/' || b.slug || '/'
     FROM places p
     JOIN countries c ON c.id = p.country_id
     JOIN brands b ON b.id = sb.brand_id
     WHERE p.id = s.place_id)
  FROM store_brands sb
  JOIN stores s ON s.id = sb.store_id AND s.is_active = true
  GROUP BY s.place_id, sb.brand_id
  ON CONFLICT (canonical_url) DO UPDATE SET
    store_count = EXCLUDED.store_count,
    updated_at = NOW();
  
  DELETE FROM page_indexability WHERE page_type = 'place_repair';
  
  INSERT INTO page_indexability (page_type, place_id, category_id, provider_count, canonical_url)
  SELECT 
    'place_repair',
    pcp.place_id,
    ps.appliance_category_id,
    COUNT(DISTINCT ps.provider_id),
    (SELECT '/' || c.slug || '/' || p.slug || '/' || ac.slug || '-repair/'
     FROM places p
     JOIN countries c ON c.id = p.country_id
     JOIN appliance_categories ac ON ac.id = ps.appliance_category_id
     WHERE p.id = pcp.place_id)
  FROM provider_services ps
  JOIN provider_coverage_places pcp ON pcp.provider_id = ps.provider_id
  JOIN service_providers sp ON sp.id = ps.provider_id AND sp.is_active = true
  WHERE ps.is_active = true
  GROUP BY pcp.place_id, ps.appliance_category_id
  ON CONFLICT (canonical_url) DO UPDATE SET
    provider_count = EXCLUDED.provider_count,
    updated_at = NOW();
  
  RAISE NOTICE 'Batch recompute complete';
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION batch_recompute_all_indexability IS 'Call nightly via pg_cron or after bulk imports to ensure page_indexability is accurate';

-- ============================================================================
-- SECTION 22: VIEWS
-- ============================================================================

CREATE OR REPLACE VIEW stores_ranked AS
SELECT
  s.*,
  p.name AS place_name,
  p.slug AS place_slug,
  p.place_type,
  aa.name AS admin_area_name,
  aa.slug AS admin_area_slug,
  c.slug AS country_slug,
  c.name AS country_name
FROM stores s
JOIN places p ON s.place_id = p.id
LEFT JOIN admin_areas aa ON p.admin_area_id = aa.id
JOIN countries c ON p.country_id = c.id
WHERE s.is_active = true AND s.status IN ('active', 'claimed', 'verified')
ORDER BY s.is_featured DESC, s.overall_score DESC, s.average_rating DESC NULLS LAST, s.created_at DESC;

CREATE OR REPLACE VIEW providers_ranked AS
SELECT
  sp.*,
  p.name AS base_city_name,
  p.slug AS base_city_slug,
  c.slug AS country_slug,
  c.name AS country_name
FROM service_providers sp
LEFT JOIN places p ON sp.place_id = p.id
LEFT JOIN countries c ON p.country_id = c.id
WHERE sp.is_active = true AND sp.status IN ('active', 'claimed', 'verified')
ORDER BY sp.is_featured DESC, sp.is_verified DESC, sp.average_rating DESC NULLS LAST, sp.provider_score DESC, sp.created_at DESC;

CREATE OR REPLACE VIEW city_providers_view AS
SELECT 
  sp.id,
  sp.name,
  sp.slug,
  sp.phone,
  sp.short_description,
  sp.callout_fee_from,
  sp.average_rating,
  sp.review_count,
  sp.is_verified,
  sp.is_featured,
  sp.gas_safe_registered,
  sp.offers_same_day,
  sp.offers_emergency,
  sp.warranty_on_repairs_months,
  sp.logo_url,
  sp.provider_score,
  p.id AS city_id,
  p.name AS city_name,
  p.slug AS city_slug,
  c.slug AS country_slug,
  pcp.is_primary,
  ARRAY_AGG(DISTINCT ac.name ORDER BY ac.name) 
    FILTER (WHERE ac.name IS NOT NULL) AS services,
  ARRAY_AGG(DISTINCT ac.slug ORDER BY ac.slug) 
    FILTER (WHERE ac.slug IS NOT NULL) AS service_slugs
FROM service_providers sp
JOIN provider_coverage_places pcp ON sp.id = pcp.provider_id
JOIN places p ON pcp.place_id = p.id
JOIN countries c ON p.country_id = c.id
LEFT JOIN provider_services ps ON sp.id = ps.provider_id AND ps.is_active = TRUE
LEFT JOIN appliance_categories ac ON ps.appliance_category_id = ac.id
WHERE sp.is_active = TRUE AND sp.status IN ('active', 'claimed', 'verified')
GROUP BY sp.id, p.id, c.slug, pcp.is_primary
ORDER BY sp.is_featured DESC, pcp.is_primary DESC, sp.average_rating DESC NULLS LAST, sp.provider_score DESC;

CREATE OR REPLACE VIEW places_with_stats AS
SELECT
  p.*,
  aa.name AS admin_area_name,
  aa.slug AS admin_area_slug,
  c.name AS country_name,
  c.slug AS country_slug
FROM places p
LEFT JOIN admin_areas aa ON p.admin_area_id = aa.id
JOIN countries c ON p.country_id = c.id
WHERE p.is_active = true;

CREATE OR REPLACE VIEW city_provider_counts AS
SELECT 
  p.id AS place_id,
  p.slug AS city_slug,
  c.slug AS country_slug,
  COUNT(DISTINCT sp.id) AS provider_count
FROM places p
JOIN countries c ON p.country_id = c.id
LEFT JOIN provider_coverage_places pcp ON p.id = pcp.place_id
LEFT JOIN service_providers sp ON pcp.provider_id = sp.id AND sp.is_active = TRUE
GROUP BY p.id, p.slug, c.slug;

CREATE OR REPLACE VIEW city_service_provider_counts AS
SELECT 
  p.id AS place_id,
  p.slug AS city_slug,
  c.slug AS country_slug,
  ac.id AS category_id,
  ac.slug AS category_slug,
  COUNT(DISTINCT sp.id) AS provider_count
FROM places p
JOIN countries c ON p.country_id = c.id
CROSS JOIN appliance_categories ac
LEFT JOIN provider_coverage_places pcp ON p.id = pcp.place_id
LEFT JOIN service_providers sp ON pcp.provider_id = sp.id AND sp.is_active = TRUE
LEFT JOIN provider_services ps ON sp.id = ps.provider_id 
  AND ps.appliance_category_id = ac.id 
  AND ps.is_active = TRUE
GROUP BY p.id, p.slug, c.slug, ac.id, ac.slug;

CREATE OR REPLACE VIEW indexable_pages AS
SELECT * FROM page_indexability WHERE is_indexable = true;

-- ============================================================================
-- SECTION 23: INDEXES
-- ============================================================================

-- Location indexes
CREATE INDEX idx_admin_areas_country ON admin_areas(country_id);
CREATE INDEX idx_admin_areas_slug ON admin_areas(slug);
CREATE INDEX idx_admin_areas_active ON admin_areas(is_active);

CREATE INDEX idx_places_country ON places(country_id);
CREATE INDEX idx_places_admin_area ON places(admin_area_id);
CREATE INDEX idx_places_slug ON places(slug);
CREATE INDEX idx_places_active ON places(is_active);
CREATE INDEX idx_places_indexable ON places(is_indexable);
CREATE INDEX idx_places_type ON places(place_type);
CREATE INDEX idx_places_name_trgm ON places USING GIN (name gin_trgm_ops);

-- Category/Brand indexes
CREATE INDEX idx_categories_parent ON appliance_categories(parent_id);
CREATE INDEX idx_categories_slug ON appliance_categories(slug);
CREATE INDEX idx_categories_tier ON appliance_categories(tier);
CREATE INDEX idx_categories_active ON appliance_categories(is_active);
CREATE INDEX idx_categories_repair ON appliance_categories(supports_repair);

CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_brands_tier ON brands(tier);
CREATE INDEX idx_brands_popularity ON brands(popularity_score DESC);
CREATE INDEX idx_brands_authorised ON brands(has_authorised_network);

-- Slug registry indexes
CREATE INDEX idx_slug_registry_type ON slug_registry(entity_type);
CREATE INDEX idx_slug_registry_entity ON slug_registry(entity_id);

-- Store indexes
CREATE INDEX idx_stores_place ON stores(place_id);
CREATE INDEX idx_stores_slug ON stores(slug);
CREATE INDEX idx_stores_owner ON stores(owner_id);
CREATE INDEX idx_stores_active ON stores(is_active);
CREATE INDEX idx_stores_status ON stores(status);
CREATE INDEX idx_stores_overall_score ON stores(overall_score DESC);
CREATE INDEX idx_stores_rating ON stores(average_rating DESC NULLS LAST);
CREATE INDEX idx_stores_categories ON stores USING GIN(primary_categories);
CREATE INDEX idx_stores_brands ON stores USING GIN(brands_stocked);
CREATE INDEX idx_stores_grades ON stores USING GIN(grades_stocked);
CREATE INDEX idx_stores_backlink_status ON stores(backlink_status);
CREATE INDEX idx_stores_name_trgm ON stores USING GIN (business_name gin_trgm_ops);
CREATE INDEX idx_stores_location ON stores(latitude, longitude);
CREATE INDEX idx_stores_delivery ON stores(offers_delivery) WHERE offers_delivery = true;
CREATE INDEX idx_stores_finance ON stores(offers_finance) WHERE offers_finance = true;
CREATE INDEX idx_stores_click_collect ON stores(offers_click_collect) WHERE offers_click_collect = true;
CREATE INDEX idx_stores_featured ON stores(is_featured) WHERE is_featured = true;

-- Geo indexes for stores (partial index for active with coordinates)
CREATE INDEX idx_stores_geo_active 
  ON stores (latitude, longitude) 
  WHERE is_active = true 
  AND latitude IS NOT NULL 
  AND longitude IS NOT NULL;

-- Provider indexes
CREATE INDEX idx_providers_place ON service_providers(place_id);
CREATE INDEX idx_providers_slug ON service_providers(slug);
CREATE INDEX idx_providers_owner ON service_providers(owner_id);
CREATE INDEX idx_providers_active ON service_providers(is_active) WHERE is_active = true;
CREATE INDEX idx_providers_status ON service_providers(status);
CREATE INDEX idx_providers_score ON service_providers(provider_score DESC);
CREATE INDEX idx_providers_rating ON service_providers(average_rating DESC NULLS LAST);
CREATE INDEX idx_providers_verified ON service_providers(is_verified) WHERE is_verified = true;
CREATE INDEX idx_providers_featured ON service_providers(is_featured) WHERE is_featured = true;
CREATE INDEX idx_providers_same_day ON service_providers(offers_same_day) WHERE offers_same_day = true;
CREATE INDEX idx_providers_gas_safe ON service_providers(gas_safe_registered) WHERE gas_safe_registered = true;
CREATE INDEX idx_providers_name_trgm ON service_providers USING GIN (name gin_trgm_ops);
CREATE INDEX idx_providers_location ON service_providers(latitude, longitude);

-- Geo indexes for providers (partial index for active with coordinates)
CREATE INDEX idx_providers_geo_active 
  ON service_providers (latitude, longitude) 
  WHERE is_active = true 
  AND latitude IS NOT NULL 
  AND longitude IS NOT NULL;

-- Store relationship indexes
CREATE INDEX idx_store_categories_store ON store_categories(store_id);
CREATE INDEX idx_store_categories_category ON store_categories(category_id);
CREATE INDEX idx_store_categories_stock ON store_categories(has_current_stock);
CREATE INDEX idx_store_categories_lookup ON store_categories (store_id, category_id);

CREATE INDEX idx_store_brands_store ON store_brands(store_id);
CREATE INDEX idx_store_brands_brand ON store_brands(brand_id);

CREATE INDEX idx_store_service_areas_store ON store_service_areas(store_id);
CREATE INDEX idx_store_service_areas_place ON store_service_areas(place_id);

-- Provider relationship indexes
CREATE INDEX idx_provider_services_provider ON provider_services(provider_id);
CREATE INDEX idx_provider_services_category ON provider_services(appliance_category_id);
CREATE INDEX idx_provider_services_active ON provider_services(is_active) WHERE is_active = true;
CREATE INDEX idx_provider_services_same_day ON provider_services(appliance_category_id, offers_same_day) WHERE offers_same_day = true;
CREATE INDEX idx_provider_services_lookup ON provider_services (provider_id, appliance_category_id) WHERE is_active = true;

CREATE INDEX idx_provider_coverage_provider ON provider_coverage_places(provider_id);
CREATE INDEX idx_provider_coverage_place ON provider_coverage_places(place_id);
CREATE INDEX idx_provider_coverage_primary ON provider_coverage_places(provider_id) WHERE is_primary = true;

CREATE INDEX idx_provider_brands_provider ON provider_brand_authorisations(provider_id);
CREATE INDEX idx_provider_brands_brand ON provider_brand_authorisations(brand_id);
CREATE INDEX idx_provider_brands_verified ON provider_brand_authorisations(is_verified) WHERE is_verified = true;

-- Review indexes
CREATE INDEX idx_reviews_subject ON reviews(subject_type, subject_id);
CREATE INDEX idx_reviews_status ON reviews(status) WHERE status = 'approved';
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created ON reviews(created_at DESC);

-- Review anti-spam indexes (partial unique indexes)
CREATE UNIQUE INDEX idx_reviews_user_subject_unique 
  ON reviews (user_id, subject_type, subject_id) 
  WHERE status NOT IN ('rejected', 'spam');

CREATE UNIQUE INDEX idx_reviews_email_subject_unique
  ON reviews (reviewer_email, subject_type, subject_id)
  WHERE status NOT IN ('rejected', 'spam') AND reviewer_email IS NOT NULL;

-- Review reports indexes
CREATE INDEX idx_review_reports_review ON review_reports(review_id);
CREATE INDEX idx_review_reports_status ON review_reports(status) WHERE status = 'pending';

-- Click events indexes
CREATE INDEX idx_clicks_subject ON click_events(subject_type, subject_id);
CREATE INDEX idx_clicks_event_type ON click_events(event_type);
CREATE INDEX idx_clicks_date ON click_events(clicked_at);
CREATE INDEX idx_clicks_place ON click_events(place_id);
CREATE INDEX idx_clicks_category ON click_events(appliance_category_id);
CREATE INDEX idx_clicks_affiliate ON click_events(affiliate_partner) WHERE affiliate_partner IS NOT NULL;

-- Page indexability indexes
CREATE INDEX idx_page_indexability_type ON page_indexability(page_type);
CREATE INDEX idx_page_indexability_place ON page_indexability(place_id);
CREATE INDEX idx_page_indexability_category ON page_indexability(category_id);
CREATE INDEX idx_page_indexability_brand ON page_indexability(brand_id);
CREATE INDEX idx_page_indexability_indexable ON page_indexability(is_indexable);
CREATE INDEX idx_page_indexability_retail ON page_indexability(is_retail_indexable);
CREATE INDEX idx_page_indexability_repair ON page_indexability(is_repair_indexable);
CREATE INDEX idx_page_indexability_url ON page_indexability(canonical_url);

-- FAQ indexes
CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_faqs_active ON faqs(is_active);
CREATE INDEX idx_faqs_repair ON faqs(is_repair_faq);

-- Monetization indexes
CREATE INDEX idx_deal_alerts_email ON deal_alerts(email);
CREATE INDEX idx_deal_alerts_active ON deal_alerts(is_active) WHERE is_active = true;

CREATE INDEX idx_affiliate_clicks_partner ON affiliate_clicks(affiliate_partner);
CREATE INDEX idx_affiliate_clicks_clicked ON affiliate_clicks(clicked_at);

CREATE INDEX idx_user_intents_type ON user_intents(intent_type);
CREATE INDEX idx_user_intents_created ON user_intents(created_at);

-- Authority indexes
CREATE INDEX idx_backlink_tracking_store ON backlink_tracking(store_id);
CREATE INDEX idx_backlink_tracking_status ON backlink_tracking(status);

CREATE INDEX idx_claims_store ON claims(store_id);
CREATE INDEX idx_claims_provider ON claims(provider_id);
CREATE INDEX idx_claims_user ON claims(user_id);
CREATE INDEX idx_claims_status ON claims(status);

-- Claims single-owner invariant indexes
CREATE UNIQUE INDEX idx_claims_one_approved_store 
  ON claims (store_id) 
  WHERE status = 'approved' AND subject_type = 'store';

CREATE UNIQUE INDEX idx_claims_one_approved_provider 
  ON claims (provider_id) 
  WHERE status = 'approved' AND subject_type = 'provider';

-- Calculator indexes
CREATE INDEX idx_repair_issues_category ON repair_issues(appliance_category_id);
CREATE INDEX idx_repair_issues_active ON repair_issues(is_active);
CREATE INDEX idx_repair_costs_category ON repair_cost_bands(appliance_category_id);
CREATE INDEX idx_repair_costs_issue ON repair_cost_bands(issue_id);
CREATE INDEX idx_lifespans_category ON appliance_lifespans(appliance_category_id);

-- ============================================================================
-- PERFORMANCE INDEXES (Added v5.1)
-- ============================================================================

-- Composite index for city+category page queries (most common pattern)
CREATE INDEX IF NOT EXISTS idx_stores_place_active_featured
ON stores (place_id, is_active, status, is_featured DESC, overall_score DESC)
WHERE is_active = true AND status IN ('active', 'claimed', 'verified');

-- Composite index for provider queries by coverage area
CREATE INDEX IF NOT EXISTS idx_provider_coverage_place_provider
ON provider_coverage_places (place_id, provider_id);

-- Composite index for category page with filters
CREATE INDEX IF NOT EXISTS idx_store_categories_cat_store
ON store_categories (category_id, store_id);

-- Reviews index for approved reviews by subject (stores)
CREATE INDEX IF NOT EXISTS idx_reviews_store_approved
ON reviews (store_id)
WHERE subject_type = 'store' AND status = 'approved';

-- Reviews index for approved reviews by subject (providers)
CREATE INDEX IF NOT EXISTS idx_reviews_provider_approved
ON reviews (provider_id)
WHERE subject_type = 'provider' AND status = 'approved';

-- Click events index for analytics queries
CREATE INDEX IF NOT EXISTS idx_click_events_subject_date
ON click_events (subject_type, subject_id, clicked_at DESC);

-- Page indexability lookup index
CREATE INDEX IF NOT EXISTS idx_page_indexability_lookup
ON page_indexability (page_type, place_id, category_id, brand_id);

-- Store brands lookup for filter queries
CREATE INDEX IF NOT EXISTS idx_store_brands_brand_store
ON store_brands (brand_id, store_id);

-- Provider services lookup for category filters
CREATE INDEX IF NOT EXISTS idx_provider_services_category
ON provider_services (appliance_category_id, provider_id);

-- ============================================================================
-- SECTION 24: RLS POLICIES
-- ============================================================================

ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE grade_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE appliance_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE slug_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_coverage_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_brand_authorisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_indexability ENABLE ROW LEVEL SECURITY;
ALTER TABLE seasonal_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE backlink_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE repair_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE repair_cost_bands ENABLE ROW LEVEL SECURITY;
ALTER TABLE appliance_lifespans ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read countries" ON countries FOR SELECT USING (is_active = true);
CREATE POLICY "Public read admin_areas" ON admin_areas FOR SELECT USING (is_active = true);
CREATE POLICY "Public read places" ON places FOR SELECT USING (is_active = true);
CREATE POLICY "Public read grade_levels" ON grade_levels FOR SELECT USING (is_active = true);
CREATE POLICY "Public read categories" ON appliance_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read brands" ON brands FOR SELECT USING (is_active = true);
CREATE POLICY "Public read slug_registry" ON slug_registry FOR SELECT USING (true);
CREATE POLICY "Public read stores" ON stores FOR SELECT USING (is_active = true AND status IN ('active', 'claimed', 'verified'));
CREATE POLICY "Public read providers" ON service_providers FOR SELECT USING (is_active = true AND status IN ('active', 'claimed', 'verified'));
CREATE POLICY "Public read store_categories" ON store_categories FOR SELECT USING (true);
CREATE POLICY "Public read store_brands" ON store_brands FOR SELECT USING (true);
CREATE POLICY "Public read store_service_areas" ON store_service_areas FOR SELECT USING (true);
CREATE POLICY "Public read provider_services" ON provider_services FOR SELECT USING (
  EXISTS (SELECT 1 FROM service_providers sp WHERE sp.id = provider_services.provider_id AND sp.is_active = true)
);
CREATE POLICY "Public read provider_coverage" ON provider_coverage_places FOR SELECT USING (
  EXISTS (SELECT 1 FROM service_providers sp WHERE sp.id = provider_coverage_places.provider_id AND sp.is_active = true)
);
CREATE POLICY "Public read provider_brands" ON provider_brand_authorisations FOR SELECT USING (
  EXISTS (SELECT 1 FROM service_providers sp WHERE sp.id = provider_brand_authorisations.provider_id AND sp.is_active = true)
);
CREATE POLICY "Public read approved reviews" ON reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Public read page_indexability" ON page_indexability FOR SELECT USING (true);
CREATE POLICY "Public read seasonal_campaigns" ON seasonal_campaigns FOR SELECT USING (is_active = true);
CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Public read content_blocks" ON content_blocks FOR SELECT USING (is_active = true);
CREATE POLICY "Public read repair_issues" ON repair_issues FOR SELECT USING (is_active = true);
CREATE POLICY "Public read repair_costs" ON repair_cost_bands FOR SELECT USING (true);
CREATE POLICY "Public read lifespans" ON appliance_lifespans FOR SELECT USING (true);

-- Anyone can submit reviews (pending moderation)
CREATE POLICY "Anyone can submit reviews" ON reviews FOR INSERT WITH CHECK (status = 'pending');

-- Anyone can report reviews
CREATE POLICY "Anyone can report reviews" ON review_reports FOR INSERT WITH CHECK (true);

-- Rate-limited click logging (max 60 events per minute per session)
CREATE POLICY "Rate limited click logging" ON click_events
FOR INSERT WITH CHECK (
  -- Allow if no session_id (anonymous)
  NEW.session_id IS NULL
  OR
  -- Allow if fewer than 60 events in last minute from this session
  (
    SELECT COUNT(*) FROM click_events
    WHERE session_id = NEW.session_id
    AND clicked_at > NOW() - INTERVAL '1 minute'
  ) < 60
);

-- Admin policies (using role claim from JWT)
CREATE POLICY "Admin manage countries" ON countries FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage admin_areas" ON admin_areas FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage places" ON places FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage grade_levels" ON grade_levels FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage categories" ON appliance_categories FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage brands" ON brands FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage slug_registry" ON slug_registry FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage stores" ON stores FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage providers" ON service_providers FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage store_categories" ON store_categories FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage store_brands" ON store_brands FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage store_service_areas" ON store_service_areas FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage provider_services" ON provider_services FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage provider_coverage" ON provider_coverage_places FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage provider_brands" ON provider_brand_authorisations FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage reviews" ON reviews FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage reports" ON review_reports FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage click_events" ON click_events FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage page_indexability" ON page_indexability FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage seasonal_campaigns" ON seasonal_campaigns FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage faqs" ON faqs FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage content_blocks" ON content_blocks FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage deal_alerts" ON deal_alerts FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage affiliate_clicks" ON affiliate_clicks FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage user_intents" ON user_intents FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage backlink_tracking" ON backlink_tracking FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage claims" ON claims FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage repair_issues" ON repair_issues FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage repair_costs" ON repair_cost_bands FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');
CREATE POLICY "Admin manage lifespans" ON appliance_lifespans FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');

-- Store owner policies
CREATE POLICY "Owners read own stores" ON stores FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Owners update own stores" ON stores FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Anyone can create store" ON stores FOR INSERT WITH CHECK (true);

-- Provider owner policies
CREATE POLICY "Owners read own providers" ON service_providers FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Owners update own providers" ON service_providers FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Anyone can create provider" ON service_providers FOR INSERT WITH CHECK (true);

-- Store relationships (owner access)
CREATE POLICY "Owners manage own store_categories" ON store_categories FOR ALL USING (
  EXISTS (SELECT 1 FROM stores WHERE id = store_id AND owner_id = auth.uid())
);
CREATE POLICY "Owners manage own store_brands" ON store_brands FOR ALL USING (
  EXISTS (SELECT 1 FROM stores WHERE id = store_id AND owner_id = auth.uid())
);
CREATE POLICY "Owners manage own store_service_areas" ON store_service_areas FOR ALL USING (
  EXISTS (SELECT 1 FROM stores WHERE id = store_id AND owner_id = auth.uid())
);

-- Provider relationships (owner access)
CREATE POLICY "Owners manage own provider_services" ON provider_services FOR ALL USING (
  EXISTS (SELECT 1 FROM service_providers WHERE id = provider_id AND owner_id = auth.uid())
);
CREATE POLICY "Owners manage own provider_coverage" ON provider_coverage_places FOR ALL USING (
  EXISTS (SELECT 1 FROM service_providers WHERE id = provider_id AND owner_id = auth.uid())
);
CREATE POLICY "Owners manage own provider_brands" ON provider_brand_authorisations FOR ALL USING (
  EXISTS (SELECT 1 FROM service_providers WHERE id = provider_id AND owner_id = auth.uid())
);

-- Claims (polymorphic)
-- Remove old policies (for idempotency)
DROP POLICY IF EXISTS "Users create store claims" ON claims;
DROP POLICY IF EXISTS "Users create provider claims" ON claims;

-- New unified policy with ownership check and email requirement
CREATE POLICY "Authenticated users can create claims" ON claims
FOR INSERT WITH CHECK (
  auth.uid() = user_id
  AND business_email IS NOT NULL
  AND (
    (subject_type = 'store' AND store_id IS NOT NULL AND
     NOT EXISTS (SELECT 1 FROM stores WHERE id = store_id AND owner_id IS NOT NULL))
    OR
    (subject_type = 'provider' AND provider_id IS NOT NULL AND
     NOT EXISTS (SELECT 1 FROM service_providers WHERE id = provider_id AND owner_id IS NOT NULL))
  )
);
CREATE POLICY "Users read own claims" ON claims FOR SELECT USING (auth.uid() = user_id);

-- Deal alerts
CREATE POLICY "Users manage own alerts" ON deal_alerts FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Anyone can create alert" ON deal_alerts FOR INSERT WITH CHECK (true);

-- Tracking (write-only for users)
CREATE POLICY "Anyone can create affiliate_click" ON affiliate_clicks FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create user_intent" ON user_intents FOR INSERT WITH CHECK (true);

-- Backlink tracking (owner view)
CREATE POLICY "Owners see own backlinks" ON backlink_tracking FOR SELECT USING (
  EXISTS (SELECT 1 FROM stores WHERE id = store_id AND owner_id = auth.uid())
);

-- ============================================================================
-- SECTION 25: PERMISSIONS
-- ============================================================================

-- Grant execute on geo functions to public
GRANT EXECUTE ON FUNCTION haversine_distance_miles TO anon, authenticated;
GRANT EXECUTE ON FUNCTION calculate_bounding_box TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_nearby_entities TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_entities_with_fallback TO anon, authenticated;

-- ============================================================================
-- MIGRATION COMPLETE: UK GRADED APPLIANCES v5.0
-- UNIFIED RETAIL + REPAIR PLATFORM
-- ============================================================================
