# Available Translation Keys Reference

## Complete List of Translation Keys by Category

### Navigation Keys
```javascript
// Primary navigation
t('navigation.home')           // Home
t('navigation.products')       // Products
t('navigation.about')          // About
t('navigation.contact')        // Contact
t('navigation.menu')           // Menu
t('navigation.forAgents')      // For Agents
t('navigation.forHosts')       // For Hosts
t('navigation.platforms')      // Platforms
t('navigation.campaign')       // Campaign
```

### Menu Description Keys
```javascript
// Menu item descriptions
t('menu.homeDesc')             // Welcome to Ekacita
t('menu.productsDesc')         // Explore our amazing products
t('menu.aboutDesc')            // Learn more about our company
t('menu.forAgentsDesc')        // Build your team and grow income
t('menu.forHostsDesc')         // Start earning from live streaming
t('menu.platformsDesc')        // Stream on Chamet, Poppo & more
t('menu.campaignDesc')         // Coming soon...
t('menu.adminDesc')            // Access admin panel
t('menu.comingSoon')           // Coming Soon
t('menu.discoverEarnings')     // Discover how to earn with Ekacita
```

### Hero Section Keys
```javascript
// Hero section content
t('hero.title')                // Discover Indonesian Teh Tarik
t('hero.subtitle')             // Authentic Malaysian Teh Tarik, Premium...
t('hero.cta')                  // Explore Products
t('hero.learnMore')            // Learn More
```

### Platforms Section Keys
```javascript
// Platforms section
t('platforms.title')           // Supported Platforms
t('platforms.description')     // Expand your reach and maximize earnings...
t('platforms.visitWebsite')    // Visit Website →
t('platforms.joinHost')        // Join Host
t('platforms.joinAgent')       // Join Agent
```

### Footer Keys
```javascript
// Footer content
t('footer.description')        // Producer information
t('footer.copyright')          // © 2025 Ekacita...
t('footer.quickLinks')         // Quick Links
t('footer.followUs')           // Follow Us
```

### Language Keys
```javascript
// Language switcher
t('language.switch')           // Switch Language
t('language.english')          // English
t('language.indonesian')       // Bahasa Indonesia
t('language.hindi')            // हिंदी
t('language.chinese')          // 中文
```

### Admin Panel Keys
```javascript
// Dashboard and main labels
t('admin.dashboard')           // Dashboard
t('admin.logout')              // Logout
t('admin.settings')            // Settings
t('admin.profile')             // Profile
t('admin.partners')            // Partners
t('admin.agents')              // Agents
t('admin.products')            // Products
t('admin.categories')          // Categories
t('admin.locations')           // Locations
t('admin.landing')             // Landing Page

// Action buttons
t('admin.delete')              // Delete
t('admin.edit')                // Edit
t('admin.save')                // Save
t('admin.cancel')              // Cancel
t('admin.add')                 // Add
t('admin.search')              // Search
t('admin.filter')              // Filter
t('admin.export')              // Export
t('admin.import')              // Import

// Status messages
t('admin.noData')              // No data
t('admin.loading')             // Loading...
t('admin.error')               // Error
t('admin.success')             // Success
t('admin.confirm')             // Confirm
t('admin.close')               // Close
```

### Client Area Keys
```javascript
// Client navigation
t('client.dashboard')          // Dashboard
t('client.partners')           // Partners
t('client.profile')            // Profile
t('client.logout')             // Logout
```

### Button Keys
```javascript
// Common button labels
t('buttons.submit')            // Submit
t('buttons.next')              // Next
t('buttons.back')              // Back
t('buttons.done')              // Done
t('buttons.view')              // View
t('buttons.download')          // Download
t('buttons.upload')            // Upload
```

## Usage Examples

### In Client Components
```javascript
'use client';

import { useTranslations } from 'next-intl';
import { Box, Typography, Button } from '@mui/material';

export default function MyComponent() {
  const t = useTranslations();

  return (
    <Box>
      <Typography variant="h1">
        {t('navigation.home')}
      </Typography>
      <Typography variant="body1">
        {t('menu.homeDesc')}
      </Typography>
      <Button>
        {t('buttons.submit')}
      </Button>
    </Box>
  );
}
```

### In Page Metadata
```javascript
export const metadata = {
  title: "Ekacita - Platform Streaming Profesional",
  // Note: Metadata cannot use translation keys directly
  // Translate in the component if needed
  description: "Bergabunglah dengan platform streaming profesional Ekacita..."
};
```

### Dynamic Translation
```javascript
const statusText = {
  'loading': t('admin.loading'),
  'success': t('admin.success'),
  'error': t('admin.error'),
};

return <span>{statusText[status]}</span>;
```

### Conditional Text
```javascript
return (
  <button>
    {isLoading ? t('admin.loading') : t('buttons.submit')}
  </button>
);
```

## Language Files Location

All translation files are located in `/messages/` directory:

```
messages/
├── id.json          # Indonesian (DEFAULT)
├── en.json          # English
├── hi.json          # Hindi
└── zh.json          # Chinese
```

## Adding New Keys

When adding a new translation:

1. **Add to all language files**:
   - `messages/id.json`
   - `messages/en.json`
   - `messages/hi.json`
   - `messages/zh.json`

2. **Example**:
   ```json
   {
     "newSection": {
       "newKey": "Translation text here"
     }
   }
   ```

3. **Use in component**:
   ```javascript
   t('newSection.newKey')
   ```

## Translation Keys by Component

### PlatformsSection Component
- `platforms.title`
- `platforms.description`
- `platforms.visitWebsite`
- `platforms.joinHost`
- `platforms.joinAgent`

### FullPageMenu Component
- `navigation.home`
- `navigation.forAgents`
- `navigation.forHosts`
- `navigation.platforms`
- `navigation.about`
- `menu.*` (all menu descriptions)

### ClientLayout Component
- `client.*` (all client labels)
- `admin.logout`

### AdminSidebar Component
- `admin.*` (all admin labels)

## Current Translation Coverage

| Category | Count | Status |
|----------|-------|--------|
| Navigation | 9 | ✅ |
| Menu | 10 | ✅ |
| Hero | 4 | ✅ |
| Platforms | 5 | ✅ |
| Footer | 4 | ✅ |
| Language | 4 | ✅ |
| Admin | 20+ | ✅ |
| Client | 4 | ✅ |
| Buttons | 7 | ✅ |
| **TOTAL** | **50+** | **✅** |

## Language Support Matrix

| Key | Indonesian | English | Hindi | Chinese |
|-----|-----------|---------|-------|---------|
| navigation.home | ✅ | ✅ | ✅ | ✅ |
| platforms.title | ✅ | ✅ | ✅ | ✅ |
| admin.logout | ✅ | ✅ | ✅ | ✅ |
| *All keys* | ✅ | ✅ | ✅ | ✅ |

---

**Last Updated**: November 30, 2025
**Default Language**: Indonesian (id)
**Framework**: Next.js with next-intl
