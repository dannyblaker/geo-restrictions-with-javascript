# About `GeoRestrictions.js`

This repository provides a lightweight JavaScript solution to apply geo-restrictions based on the user’s country. It leverages the browser’s timezone information to infer the country, stores the result in a cookie, and dynamically adjusts DOM elements (menus, region-specific sections, etc.) depending on whether the visitor is in a given country or not.

Australia has been used as an example, but the script also works for most other countries - for a list of compatible countries see `countries` in `country_timezones.js` 

**You are most welcome to use this code in your commercial projects, all that I ask in return is that you credit my work by providing a link back to this repository. Thank you & Enjoy!**

![geo-restrictions](geo-restrictions.png)

## Features

- Detects the visitor’s country based on their timezone (`Intl.DateTimeFormat`).
- Sets and reuses a cookie (`my_country`) to avoid redundant lookups.
- Supports country-specific vs International content toggling:
  - Show or hide menus.
  - Remove DOM elements tagged for restricted regions.
- Waits for jQuery to load before applying restrictions (if required by the page).
- Simple and modular design with a separate `country_timezones.js` mapping file.


## How it works

1. Wait for jQuery
2. Check for Existing Cookie
   - If a my_country cookie is already set, it reuses that value.
   - Otherwise, it determines the user’s country and stores it in a cookie.
3. Country Detection
   - Uses the browser’s timezone `Intl.DateTimeFormat().resolvedOptions().timeZone`
   - Maps that timezone to a country using `country_timezones.js`
4. Apply Geo Restrictions
   - If Australia
     - Show Australian-only menus
     - Remove all int_region elements
   - Else (International):
     - Hide geo-restricted menus.
     - Remove all aus_region elements.


# Usuage

1. Import both scripts in your project
  ```html
  <script type="module" src="country_timezones.js"></script>
  <script type="module" src="georestrictions.js"></script>
  ```
2. Add the following class names to your DOM elements:

   - `aus_region` → Elements visible only in Australia.
   - `int_region` → Elements visible only outside Australia.
   - `menu-item-4258` (modify as needed) → Menu item restricted to Australian visitors