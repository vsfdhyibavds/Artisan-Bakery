/*
# Update expired event dates to future dates

## Overview
All seeded events have event_date values in February 2024, which are
firmly in the past. The Events page filters to upcoming events only
(gte today), so the page appears empty. This migration moves each
event to a future date in 2026-2027, spaced out realistically.

## Changes
- Sourdough Bread Making Workshop: 2024-02-15 -> 2026-12-12
- French Pastry Masterclass: 2024-02-18 -> 2027-01-16
- Valentine's Day Cake Decorating: 2024-02-12 -> 2027-02-09
- Kids Baking Adventure: 2024-02-20 -> 2026-12-20
- Gluten-Free Baking Essentials: 2024-02-25 -> 2027-01-25

No data is lost — only the event_date column is updated.
*/

UPDATE events SET event_date = '2026-12-12' WHERE title = 'Sourdough Bread Making Workshop';
UPDATE events SET event_date = '2027-01-16' WHERE title = 'French Pastry Masterclass';
UPDATE events SET event_date = '2027-02-09' WHERE title = 'Valentine''s Day Cake Decorating';
UPDATE events SET event_date = '2026-12-20' WHERE title = 'Kids Baking Adventure';
UPDATE events SET event_date = '2027-01-25' WHERE title = 'Gluten-Free Baking Essentials';