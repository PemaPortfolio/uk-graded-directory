-- Migration: add_logo_url_to_stores
-- Date: 2026-01-31
-- Description: Add logo_url column to stores table to fix city page store cards not displaying
--
-- Problem: The getCityPageData.ts query was selecting logo_url from stores table,
-- but this column didn't exist. This caused the query to fail silently, resulting
-- in "No graded retailers found" on city pages despite stores existing in the database.
--
-- Solution: Add the missing logo_url column to the stores table.

ALTER TABLE stores
ADD COLUMN IF NOT EXISTS logo_url VARCHAR(500);

COMMENT ON COLUMN stores.logo_url IS 'URL to the store logo image';
