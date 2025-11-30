# Internationalization (i18n) Implementation Guide

## Overview
This document describes the internationalization implementation for the Ekacita landing-page-admin project using `next-intl`.

## Default Language
**Indonesian (id)** has been set as the default language for the entire application.

## Supported Languages
- **Indonesian (id)** - Default
- **English (en)**
- **Hindi (hi)**
- **Chinese (zh)**

## Configuration

### 1. i18n.js
- `defaultLocale` is set to `'id'`
- All supported locales are configured: `['en', 'id', 'hi', 'zh']`
- Messages are imported from the `messages/` directory

### 2. Messages Files
Located in `/messages/`:
- `id.json` - Indonesian (Bahasa Indonesia)
- `en.json` - English
- `hi.json` - Hindi (हिंदी)
- `zh.json` - Chinese (中文)

Each file contains translation keys organized by category:
- `navigation` - Navigation menu items
- `menu` - Menu descriptions
- `hero` - Hero section text
- `platforms` - Platforms section
- `footer` - Footer content
- `language` - Language switcher
- `admin` - Admin panel text
- `client` - Client area text
- `buttons` - Button labels

## Translation Keys Available

### Navigation
```
navigation.home
navigation.products
navigation.about
navigation.contact
navigation.menu
navigation.forAgents
navigation.forHosts
navigation.platforms
navigation.campaign
```

### Menu
```
menu.homeDesc
menu.productsDesc
menu.aboutDesc
menu.forAgentsDesc
menu.forHostsDesc
menu.platformsDesc
menu.campaignDesc
menu.adminDesc
menu.comingSoon
menu.discoverEarnings
```

### Platforms
```
platforms.title
platforms.description
platforms.visitWebsite
platforms.joinHost
platforms.joinAgent
```

### Admin & Client
```
admin.dashboard
admin.logout
admin.settings
admin.profile
admin.partners
admin.agents
admin.products
admin.categories
admin.locations
admin.landing
admin.delete
admin.edit
admin.save
admin.cancel
admin.add
admin.search
admin.filter
admin.export
admin.import
admin.noData
admin.loading
admin.error
admin.success
admin.confirm
admin.close

client.dashboard
client.partners
client.profile
client.logout
```

### Language Switcher
```
language.switch
language.english
language.indonesian
language.hindi
language.chinese
```

## Components Updated

### 1. **PlatformsSection.js**
- Uses `useTranslations()` hook
- Displays `platforms.title` and `platforms.description`
- Buttons use: `platforms.joinHost`, `platforms.joinAgent`, `platforms.visitWebsite`

### 2. **FullPageMenu.js**
- Menu items are dynamically created with translations
- All descriptions use translation keys
- "Coming Soon" uses `menu.comingSoon`

### 3. **ClientLayout.js**
- Navigation menu items use translation keys
- Logout button label: `admin.logout`
- Client area title: `client.dashboard`

### 4. **AdminSidebar.js**
- All menu items use translation keys
- Admin panel header uses `admin.dashboard`
- Company name changed to "Ekacita"

## How to Use Translations

### In React Components
```javascript
'use client';

import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations();
  
  return (
    <h1>{t('navigation.home')}</h1>
  );
}
```

### In Page Metadata
```javascript
export const metadata = {
  title: "Ekacita - Platform Streaming Profesional",
  description: "Bergabunglah dengan platform streaming profesional Ekacita...",
  // ... rest of metadata
};
```

## Metadata Updates

### Global Metadata (app/layout.js)
- Title: "Ekacita - Platform Streaming Profesional"
- Description: Indonesian description
- Language: Indonesian (id_ID)

### Products Page (app/products/layout.js)
- Title: "Produk Teh Tarik & Minuman Kemasan | Ekacita"
- Description: Indonesian product description

## Adding New Translations

To add a new translation key:

1. Add the key to all language files in `messages/`:
   ```json
   {
     "mySection": {
       "myKey": "Your translation text"
     }
   }
   ```

2. Use in component:
   ```javascript
   const t = useTranslations();
   t('mySection.myKey');
   ```

## Language Switching

Users can switch languages using the language switcher in the UI. The current implementation:
- Stores language preference in localStorage
- Supports switching between all 4 languages
- Updates UI dynamically

## Best Practices

1. **Always use translation keys** - Never hardcode text that users see
2. **Organize keys logically** - Group related translations together
3. **Keep translations consistent** - Use same terms across languages
4. **Update all language files** - When adding new keys, add to all 4 language files
5. **Use `useTranslations()` hook** - In client components
6. **Metadata in Indonesian** - Page metadata defaults to Indonesian

## Testing Translations

To test the internationalization:

1. View the application in different languages using the language switcher
2. Verify all UI text appears in the selected language
3. Check that page metadata is in Indonesian (default)
4. Confirm language preference persists after page refresh

## Common Translation Patterns

### Dynamic Content
```javascript
const greeting = t('menu.homeDesc');
```

### Conditional Translations
```javascript
const buttonText = isLoading ? t('admin.loading') : t('buttons.submit');
```

### Translated Props
```javascript
<MenuItem selected={currentLanguage === 'id'}>
  {t('language.indonesian')}
</MenuItem>
```

## Files Modified

1. ✅ `i18n.js` - Default locale set to 'id'
2. ✅ `messages/id.json` - Expanded with all UI text
3. ✅ `messages/en.json` - Expanded with all UI text
4. ✅ `messages/hi.json` - Expanded with all UI text
5. ✅ `messages/zh.json` - Expanded with all UI text
6. ✅ `src/components/PlatformsSection.js` - Added translations
7. ✅ `src/components/FullPageMenu.js` - Added translations
8. ✅ `src/components/client/ClientLayout.js` - Added translations
9. ✅ `src/components/admin/AdminSidebar.js` - Added translations
10. ✅ `src/app/layout.js` - Indonesian metadata
11. ✅ `src/app/products/layout.js` - Indonesian metadata

## Future Enhancements

- Add more language files (Spanish, French, etc.)
- Create translation management UI in admin panel
- Implement RTL (Right-to-Left) support for languages like Arabic, Hebrew
- Add translation validation tool
- Create language-specific content variations (not just translations)
