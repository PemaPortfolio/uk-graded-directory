-- Migration: Remove Televisions Category
-- Date: 2026-01-24
-- Description: Removes the Televisions/TVs category from the database
-- Note: The cleanup_slug_registry trigger will automatically remove
--       entries from slug_registry (both 'televisions' and 'televisions-repair')

-- Delete the Televisions category
DELETE FROM appliance_categories
WHERE slug = 'televisions';

-- Verify deletion
-- SELECT * FROM appliance_categories WHERE slug = 'televisions';
-- SELECT * FROM slug_registry WHERE slug LIKE 'television%';
