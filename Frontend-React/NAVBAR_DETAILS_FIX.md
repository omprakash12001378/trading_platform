# ✅ Navbar Fixed on Coin Details Page

## 🛠️ Issue Resolved
- **Problem**: The navigation bar was missing on coin detail pages (e.g., `/market/shiba-inu`).
- **Cause**: The route matching logic used a strict regex (`\w+`) that only allowed alphanumeric characters. Coin IDs with hyphens (like `shiba-inu`) failed to match.
- **Solution**: Updated the `shouldShowNavbar` utility to use a more flexible regex (`[^/]+`) that accepts any valid URL segment characters, including hyphens.

## 🚀 Result
- The Navbar now appears correctly on ALL coin detail pages, regardless of the coin's ID format.
