import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Container, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Language as LanguageIcon } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import FullPageMenu from './FullPageMenu';
import { useContent } from '../hooks/useContent';

export default function Header({ logo: propLogo }) {
  const { content } = useContent();
  const t = useTranslations();
  const logo = content?.logo || propLogo || '/logo.svg';
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('id');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = typeof window !== 'undefined' ? (localStorage.getItem('language') || 'id') : 'id';
    setCurrentLanguage(savedLanguage);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLanguageMenuOpen = (event) => {
    setLanguageMenuAnchor(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchor(null);
  };

  const handleLanguageChange = (lng) => {
    if (window.changeLocale) {
      window.changeLocale(lng);
      setCurrentLanguage(lng);
    }
    handleLanguageMenuClose();
  };


  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: { xs: 16, md: 40 },
          left: { xs: 16, md: 20 },
          right: { xs: 16, md: 'auto' },
          width: { xs: 'calc(100% - 32px)', md: 'calc(50% - 20px)' },
          zIndex: 1100,
          bgcolor: 'rgba(255, 165, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 95, 115, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: { xs: '16px', md: '50px' },
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 1, md: 1.5 }, px: { xs: 1.5, md: 2 } }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Image
                src={logo}
                alt="Happy Jasmine"
                width={50}
                height={25}
                style={{
                  height: 'auto',
                  maxWidth: '100%',
                  width: 'auto',
                }}
                priority
              />
            </Box>
          </Link>

          {/* Agent Area Button, Language Switcher and Menu Toggle Button */}
          <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1.5, md: 2 }, alignItems: 'center' }}>
            <Button
              component={Link}
              href="/client"
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'white',
                borderRadius: '20px',
                px: { xs: 1.5, sm: 2.5, md: 3 },
                py: { xs: 0.75, md: 1 },
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                fontWeight: 600,
                textTransform: 'none',
                whiteSpace: 'nowrap',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Agent Area
            </Button>
            <IconButton
              onClick={handleLanguageMenuOpen}
              sx={{
                color: 'white',
                padding: { xs: 0.75, md: 1 },
              }}
            >
              <LanguageIcon sx={{ fontSize: { xs: 20, md: 30 } }} />
            </IconButton>
            <IconButton
              onClick={toggleMenu}
              sx={{
                color: 'white',
                padding: { xs: 0.75, md: 1 },
              }}
            >
              <MenuIcon sx={{ fontSize: { xs: 24, md: 40 } }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Full Page Menu */}
      <FullPageMenu open={menuOpen} onClose={closeMenu} />

      {/* Language Menu */}
      <Menu
        anchorEl={languageMenuAnchor}
        open={Boolean(languageMenuAnchor)}
        onClose={handleLanguageMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={() => handleLanguageChange('id')}
          selected={currentLanguage === 'id'}
        >
          {t('language.indonesian')}
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageChange('en')}
          selected={currentLanguage === 'en'}
        >
          {t('language.english')}
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageChange('hi')}
          selected={currentLanguage === 'hi'}
        >
          {t('language.hindi')}
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageChange('zh')}
          selected={currentLanguage === 'zh'}
        >
          {t('language.chinese')}
        </MenuItem>
      </Menu>
    </>
  );
}
