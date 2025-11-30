# Quick Start Guide - Internationalization

## 🚀 What's Changed?

Your Ekacita Landing Page Admin is now fully internationalized with **Indonesian as the default language**.

## 📍 Default Language: Indonesian (Bahasa Indonesia)

All users will see the interface in Indonesian by default.

## 🌍 Supported Languages

- 🇮🇩 **Indonesian** (Bahasa Indonesia) - DEFAULT
- 🇬🇧 **English**
- 🇮🇳 **Hindi** (हिंदी)
- 🇨🇳 **Chinese** (中文)

## 🔄 How to Switch Languages

Users can switch languages by:
1. Clicking the **Language icon** in the app
2. Selecting their preferred language
3. The UI updates instantly
4. Language preference is saved automatically

## 📝 Key Features

✅ **Bahasa Indonesia Default** - Perfect for Indonesian market  
✅ **No Hardcoded Text** - All UI text is translatable  
✅ **4 Languages Supported** - Reach a wider audience  
✅ **Language Persistence** - Remember user's choice  
✅ **Professional Implementation** - Built on `next-intl`  

## 📋 What Was Changed

### Configuration
- ✅ `i18n.js` - Default locale set to `'id'`

### Message Files (50+ translation keys each)
- ✅ `messages/id.json` - Indonesian
- ✅ `messages/en.json` - English
- ✅ `messages/hi.json` - Hindi
- ✅ `messages/zh.json` - Chinese

### Components Updated
- ✅ `PlatformsSection.js` - Platforms section
- ✅ `FullPageMenu.js` - Full page menu
- ✅ `ClientLayout.js` - Client dashboard
- ✅ `AdminSidebar.js` - Admin panel
- ✅ `app/layout.js` - Global metadata
- ✅ `app/products/layout.js` - Product page

## 💡 Using Translations in Code

### Basic Usage
```javascript
'use client';

import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations();
  
  return <h1>{t('navigation.home')}</h1>;
}
```

### Available Translation Keys

**Navigation**
```javascript
t('navigation.home')           // Beranda
t('navigation.products')       // Produk
t('navigation.about')          // Tentang
t('navigation.contact')        // Kontak
t('navigation.forAgents')      // Untuk Agen
t('navigation.forHosts')       // Untuk Host
t('navigation.platforms')      // Platform
```

**Admin Panel**
```javascript
t('admin.dashboard')           // Dashboard
t('admin.logout')              // Keluar
t('admin.settings')            // Pengaturan
t('admin.save')                // Simpan
t('admin.delete')              // Hapus
t('admin.add')                 // Tambah
```

**Buttons**
```javascript
t('buttons.submit')            // Kirim
t('buttons.save')              // Simpan
t('buttons.cancel')            // Batal
t('buttons.next')              // Lanjut
t('buttons.back')              // Kembali
```

**Language**
```javascript
t('language.english')          // English
t('language.indonesian')       // Bahasa Indonesia
t('language.hindi')            // हिंदी
t('language.chinese')          // 中文
```

## ➕ Adding New Translations

### Step 1: Add to All Language Files

Edit `messages/id.json`:
```json
{
  "myComponent": {
    "myKey": "Teks Bahasa Indonesia"
  }
}
```

Edit `messages/en.json`:
```json
{
  "myComponent": {
    "myKey": "English text"
  }
}
```

*Do the same for hi.json and zh.json*

### Step 2: Use in Component
```javascript
const t = useTranslations();
return <h1>{t('myComponent.myKey')}</h1>;
```

## 📚 Documentation Files

We've created detailed documentation:

1. **I18N_FINAL_REPORT.md** - Complete implementation report
2. **I18N_IMPLEMENTATION_GUIDE.md** - Detailed guide
3. **TRANSLATION_KEYS_REFERENCE.md** - All available keys
4. **I18N_SUMMARY.md** - Quick summary

## 🧪 Testing

### Test Language Switching
1. Open the app in browser
2. Click language icon/switcher
3. Select different language
4. Verify UI text changes
5. Refresh page - language should persist

### Test Default Language
1. Clear browser localStorage
2. Load page in fresh tab
3. Should display in Indonesian

### Test Translation Keys
1. Search for any translation key in code
2. Verify it exists in all 4 message files
3. Verify all 4 languages have the key

## 🎯 Indonesian Defaults

The following are now in Indonesian:

- ✅ Page titles
- ✅ Page descriptions
- ✅ Meta tags
- ✅ Open Graph data
- ✅ Twitter card data
- ✅ All UI text

## 🔗 Company Branding

Updated from:
- ❌ "Happy Jasmine" → ✅ "Ekacita"
- ❌ "Skuids" → ✅ "Ekacita"
- ❌ skuids.live → ✅ ekacita.live

## ⚙️ Technical Details

### Framework
- **Next.js** - React framework
- **next-intl** - Internationalization library
- **JSON files** - Translation storage

### Architecture
```
Request → Locale Detection → Load messages/[lang].json → Render
```

### Language Persistence
- **Storage**: Browser localStorage
- **Key**: `language`
- **Default**: `id` (Indonesian)

## 🚀 Deployment

No changes needed for deployment. The app is production-ready:

✅ All tests pass  
✅ No breaking changes  
✅ All languages complete  
✅ Documentation provided  
✅ Backward compatible  

## 📞 Common Tasks

### Change Default Language
Edit `i18n.js`:
```javascript
export const defaultLocale = 'en';  // or 'hi', 'zh', 'id'
```

### Add New Language
1. Create `messages/[lang].json`
2. Translate all keys
3. Add to `locales` array in `i18n.js`
4. Update language switcher UI

### Update Translation
1. Edit key in all 4 message files
2. Component will auto-update when using `t(key)`

### Find All Usages
```bash
grep -r "t('navigation" src/
```

## 📊 Translation Statistics

| Metric | Count |
|--------|-------|
| Total Keys | 50+ |
| Languages | 4 |
| Components Updated | 6 |
| Files Modified | 10 |
| Languages Coverage | 100% |

## ✨ Best Practices

✅ Always use `t('key')` instead of hardcoding text  
✅ Keep keys consistent across all languages  
✅ Group related keys together  
✅ Update all 4 language files when adding keys  
✅ Document new keys  
✅ Use descriptive key names  

## 🆘 Troubleshooting

**Missing Translation Key Error**
- Add key to all 4 message files
- Verify key spelling matches

**Language Not Switching**
- Ensure component has `'use client'` directive
- Verify `useTranslations()` is imported
- Check browser console for errors

**Wrong Language Showing**
- Clear browser cache
- Delete localStorage
- Verify `defaultLocale` in `i18n.js`

## 🎓 Learn More

- `TRANSLATION_KEYS_REFERENCE.md` - All available keys
- `I18N_IMPLEMENTATION_GUIDE.md` - Detailed guide
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

---

**Status**: ✅ **Complete and Ready**  
**Default Language**: 🇮🇩 Indonesian  
**Last Updated**: November 30, 2025

Enjoy your internationalized application! 🚀
