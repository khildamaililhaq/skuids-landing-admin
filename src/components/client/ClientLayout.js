'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Business as PartnersIcon,
  Person as ProfileIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { logoutAgent } from '../../lib/supabase';

const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/client',
  },
  {
    text: 'Partners',
    icon: <PartnersIcon />,
    path: '/client/partners',
  },
  {
    text: 'Profile',
    icon: <ProfileIcon />,
    path: '/client/profile',
  },
];

export default function ClientLayout({ children, agent }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('id');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'id';
    setCurrentLanguage(savedLanguage);
  }, []);

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

  const handleLogout = async () => {
    await logoutAgent();
    router.push('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const drawerWidth = 280;

  const drawerContent = (
    <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
      {/* Header */}
      <Box sx={{
        p: 3,
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {agent?.name?.charAt(0)?.toUpperCase() || 'A'}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {agent?.name || 'Agent'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Client Area
            </Typography>
          </Box>
        </Box>
        {isMobile && (
          <IconButton onClick={toggleSidebar} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Navigation Menu */}
      <List sx={{ px: 2, py: 2 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <Link href={item.path} style={{ textDecoration: 'none', width: '100%' }}>
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    bgcolor: isActive ? 'primary.main' : 'transparent',
                    color: isActive ? 'primary.contrastText' : 'text.primary',
                    '&:hover': {
                      bgcolor: isActive ? 'primary.dark' : 'action.hover',
                    },
                    transition: 'all 0.2s ease-in-out',
                    py: 1.5,
                    px: 2
                  }}
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  <ListItemIcon sx={{
                    color: isActive ? 'primary.contrastText' : 'primary.main',
                    minWidth: 40
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.95rem'
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>

      {/* Logout Button */}
      <Box sx={{ px: 2, mt: 'auto' }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: 'error.main',
            '&:hover': {
              bgcolor: 'error.light',
              color: 'error.contrastText',
            },
            py: 1.5,
            px: 2
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontWeight: 500,
              fontSize: '0.95rem'
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: 'background.paper',
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: 'text.primary'
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton
                edge="start"
                onClick={toggleSidebar}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Skuids Client Area
            </Typography>
            <IconButton
              onClick={handleLanguageMenuOpen}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <LanguageIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>

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
    </Box>
  );
}