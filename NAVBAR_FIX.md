# ✅ Navbar Fixed on Market Page

## 🛠️ Issue Resolved
- **Problem**: The navigation bar was not appearing on the `/market` page.
- **Cause**: The `/market` route was missing from the `routes` configuration array that controls Navbar visibility.
- **Solution**: Added `/market` to the allowed routes list in `App.jsx`.

## 🚀 Result
- The Navbar now correctly appears on the Market page, allowing users to navigate back to Home, Portfolio, etc.
