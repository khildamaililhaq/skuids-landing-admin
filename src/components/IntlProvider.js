'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useState, useEffect } from 'react';
import { locales, defaultLocale } from '../../i18n';

export default function IntlProvider({ children }) {
  const [locale, setLocale] = useState(defaultLocale);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem('language');
    const currentLocale = savedLocale && locales.includes(savedLocale) ? savedLocale : defaultLocale;

    // Load messages for the current locale
    import(`../../messages/${currentLocale}.json`).then((msgs) => {
      setMessages(msgs.default);
      setLocale(currentLocale);
    }).catch(() => {
      // Fallback to default locale
      import(`../../messages/${defaultLocale}.json`).then((msgs) => {
        setMessages(msgs.default);
        setLocale(defaultLocale);
      });
    });
  }, []);

  const changeLocale = async (newLocale) => {
    if (locales.includes(newLocale)) {
      try {
        const msgs = await import(`../../messages/${newLocale}.json`);
        setMessages(msgs.default);
        setLocale(newLocale);
        localStorage.setItem('language', newLocale);
      } catch (error) {
        console.error('Failed to load locale:', newLocale, error);
      }
    }
  };

  // Make changeLocale available globally for components
  useEffect(() => {
    window.changeLocale = changeLocale;
  }, [changeLocale]);

  if (!messages || Object.keys(messages).length === 0) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}