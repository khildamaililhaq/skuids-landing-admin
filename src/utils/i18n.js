'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Translation data
const translations = {
  id: {
    navigation: {
      home: 'Beranda',
      products: 'Produk',
      about: 'Tentang',
      contact: 'Kontak',
      menu: 'MENU'
    },
    menu: {
      homeDesc: 'Selamat datang di Happy Jasmine',
      productsDesc: 'Jelajahi produk menakjubkan kami',
      aboutDesc: 'Pelajari lebih lanjut tentang perusahaan kami',
      campaignDesc: 'Segera hadir...',
      adminDesc: 'Akses panel admin',
      comingSoon: 'Segera Hadir'
    },
    hero: {
      title: 'Temukan Teh Tarik Indonesia',
      subtitle: 'Teh Tarik Malaysia asli, Teh Bahagia premium, dan berbagai Minuman Greentea Kemasan',
      cta: 'Jelajahi Produk',
      learnMore: 'Pelajari Lebih Lanjut'
    },
    footer: {
      description: 'Produsen Teh Tarik Indonesia asal Bekasi, Teh Tarik premium, Teh Bahagia, dan berbagai Minuman Greentea Kemasan',
      copyright: '© 2025 Ekacita Citra Madyapada. Semua hak dilindungi.'
    },
    language: {
      switch: 'Ganti Bahasa',
      english: 'English',
      indonesian: 'Bahasa Indonesia',
      hindi: 'हिंदी',
      chinese: '中文'
    }
  },
  en: {
    navigation: {
      home: 'Home',
      products: 'Products',
      about: 'About',
      contact: 'Contact',
      menu: 'MENU'
    },
    menu: {
      homeDesc: 'Welcome to Happy Jasmine',
      productsDesc: 'Explore our amazing products',
      aboutDesc: 'Learn more about our company',
      campaignDesc: 'Coming soon...',
      adminDesc: 'Access admin panel',
      comingSoon: 'Coming Soon'
    },
    hero: {
      title: 'Discover Indonesian Teh Tarik',
      subtitle: 'Authentic Malaysian Teh Tarik, Premium Teh Bahagia, and various Packaged Greentea Drinks',
      cta: 'Explore Products',
      learnMore: 'Learn More'
    },
    footer: {
      description: 'Indonesian Teh Tarik producer from Bekasi, premium Teh Tarik, Teh Bahagia, and various packaged greentea drinks',
      copyright: '© 2025 Ekacita Citra Madyapada. All rights reserved.'
    },
    language: {
      switch: 'Switch Language',
      english: 'English',
      indonesian: 'Bahasa Indonesia',
      hindi: 'हिंदी',
      chinese: '中文'
    }
  },
  hi: {
    navigation: {
      home: 'होम',
      products: 'उत्पाद',
      about: 'हमारे बारे में',
      contact: 'संपर्क',
      menu: 'मेनू'
    },
    menu: {
      homeDesc: 'हैप्पी जैस्मिन में आपका स्वागत है',
      productsDesc: 'हमारे अद्भुत उत्पादों का अन्वेषण करें',
      aboutDesc: 'हमारी कंपनी के बारे में और जानें',
      campaignDesc: 'जल्द ही आ रहा है...',
      adminDesc: 'एडमिन पैनल तक पहुंच',
      comingSoon: 'जल्द ही आ रहा है'
    },
    hero: {
      title: 'इंडोनेशियाई तेह टारिक खोजें',
      subtitle: 'वास्तविक मलेशियाई तेह टारिक, प्रीमियम तेह बहागिया, और विभिन्न पैकेज्ड ग्रीनटी पेय',
      cta: 'उत्पादों का अन्वेषण करें',
      learnMore: 'और जानें'
    },
    footer: {
      description: 'बेकासी से इंडोनेशियाई तेह टारिक उत्पादक, प्रीमियम तेह टारिक, तेह बहागिया, और विभिन्न पैकेज्ड ग्रीनटी पेय',
      copyright: '© 2025 एकसिता चित्र मध्यपदा। सर्वाधिकार सुरक्षित।'
    },
    language: {
      switch: 'भाषा बदलें',
      english: 'English',
      indonesian: 'Bahasa Indonesia',
      hindi: 'हिंदी',
      chinese: '中文'
    }
  },
  zh: {
    navigation: {
      home: '首页',
      products: '产品',
      about: '关于我们',
      contact: '联系我们',
      menu: '菜单'
    },
    menu: {
      homeDesc: '欢迎来到快乐茉莉',
      productsDesc: '探索我们精彩的产品',
      aboutDesc: '了解更多关于我们公司',
      campaignDesc: '即将推出...',
      adminDesc: '访问管理面板',
      comingSoon: '即将推出'
    },
    hero: {
      title: '发现印尼拉茶',
      subtitle: '正宗马来西亚拉茶、优质幸福茶，以及各种包装绿茶饮料',
      cta: '探索产品',
      learnMore: '了解更多'
    },
    footer: {
      description: '来自勿加泗的印尼拉茶生产商，优质拉茶、幸福茶，以及各种包装绿茶饮料',
      copyright: '© 2025 艾卡西塔·奇特拉·马迪亚帕达。版权所有。'
    },
    language: {
      switch: '切换语言',
      english: 'English',
      indonesian: 'Bahasa Indonesia',
      hindi: 'हिंदी',
      chinese: '中文'
    }
  }
};

// Create context
const LanguageContext = createContext();

// Provider component
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('id');

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en') {
        setLanguage('en');
      } else if (browserLang === 'hi') {
        setLanguage('hi');
      } else if (browserLang === 'zh') {
        setLanguage('zh');
      } else if (browserLang === 'id') {
        setLanguage('id');
      }
      // Default to Indonesian for other languages
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook to use translations
export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}

export default translations;