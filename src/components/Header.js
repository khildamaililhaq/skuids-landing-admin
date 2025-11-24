import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Container, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Language as LanguageIcon } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '../utils/i18n';
import FullPageMenu from './FullPageMenu';
import { useContent } from '../hooks/useContent';

export default function Header({ logo: propLogo }) {
  const { content } = useContent();
  const { language, changeLanguage, t } = useTranslation();
  const logo = content?.logo || propLogo || '/logo.svg';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);

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
    changeLanguage(lng);
    handleLanguageMenuClose();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: { xs: 20, md: 40 },
          left: { xs: 0, md: 20 },
          width: { xs: '100%', md: '50%' },
          zIndex: 1100,
          bgcolor: 'tertiary.main',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 95, 115, 0.15)',
          borderBottom: '1px solid rgba(0, 95, 115, 0.1)',
          borderRadius: '50px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: `scale(${Math.max(0.8, 1 - scrollY / 800)})`,
          transformOrigin: { xs: 'top center', md: 'top left' },
          '&:hover': {
            bgcolor: 'tertiary.light',
            transform: `scale(${Math.max(0.8, 1 - scrollY / 800)}) translateY(-2px)`,
          }
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            >
              <Image
                src={logo}
                alt="Happy Jasmine"
                width={60}
                height={30}
                style={{
                  height: 'auto',
                  maxWidth: '100%'
                }}
                priority
              />
            </Box>
          </Link>

          {/* Language Switcher and Menu Toggle Button */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <IconButton
              onClick={handleLanguageMenuOpen}
              sx={{
                color: 'white',
                '&:hover': {
                  transform: 'scale(1.25)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <LanguageIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <IconButton
              onClick={toggleMenu}
              sx={{
                color: 'white',
                '&:hover': {
                  transform: 'scale(1.25)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <MenuIcon sx={{ fontSize: 40 }} />
              {t('navigation.menu')}
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
          selected={language === 'id'}
        >
          {t('language.indonesian')}
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageChange('en')}
          selected={language === 'en'}
        >
          {t('language.english')}
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageChange('hi')}
          selected={language === 'hi'}
        >
          {t('language.hindi')}
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageChange('zh')}
          selected={language === 'zh'}
        >
          {t('language.chinese')}
        </MenuItem>
      </Menu>
    </>
  );
}
