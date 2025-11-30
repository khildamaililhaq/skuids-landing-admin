'use client';

import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createCustomTheme } from '../lib/theme';

// Create emotion cache
function createEmotionCache() {
  return createCache({ key: 'css' });
}

const clientSideEmotionCache = createEmotionCache();

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
};

export default function ClientThemeProvider({ children }) {
  const [emotionCache] = useState(clientSideEmotionCache);
  const [themeConfig, setThemeConfig] = useState({
    mode: 'light',
    primaryColor: '#CFAA0A',
    secondaryColor: '#8E7629',
    tertiaryColor: '#009A98',
    warningColor: '#B3261E',
    backgroundDefault: '#FFFCF5',
    backgroundPaper: '#FFFFFF',
  });

  // Memoize theme creation to prevent hydration mismatches
  const theme = useMemo(() => createCustomTheme(themeConfig), [themeConfig]);

  const updateTheme = (newConfig) => {
    setThemeConfig(newConfig);
  };

  return (
    <ThemeContext.Provider value={{ themeConfig, updateTheme, theme }}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
}
