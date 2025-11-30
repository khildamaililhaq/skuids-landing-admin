import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Web as WebIcon,
  Settings as SettingsIcon,
  ShoppingBag as ProductsIcon,
  Category as CategoryIcon,
  LocationOn as LocationIcon,
  Handshake as PartnersIcon,
  People as AgentsIcon,
  Link as AgentPartnersIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const menuItems = [
  {
    text: 'admin.dashboard',
    icon: <DashboardIcon />,
    path: '/admin',
    description: 'descriptions.dashboardDesc'
  },
  {
    text: 'admin.landing',
    icon: <WebIcon />,
    path: '/admin/landing-page',
    description: 'descriptions.landingDesc'
  },
  {
    text: 'admin.partners',
    icon: <PartnersIcon />,
    path: '/admin/partners',
    description: 'descriptions.partnersDesc'
  },
  {
    text: 'admin.agents',
    icon: <AgentsIcon />,
    path: '/admin/agents',
    description: 'descriptions.agentsDesc'
  },
  {
    text: 'agent-partners',
    icon: <AgentPartnersIcon />,
    path: '/admin/agent-partners',
    description: 'descriptions.agentPartnersDesc'
  },
  {
    text: 'admin.settings',
    icon: <SettingsIcon />,
    path: '/admin/settings',
    description: 'descriptions.settingsDesc'
  }
];

export default function AdminSidebar({ open, onClose }) {
  const t = useTranslations();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();

  const drawerWidth = isMobile ? '100%' : 280;

  const handleNavigation = (path) => {
    if (isMobile) {
      onClose();
    }
  };

  const drawerContent = (
    <Box sx={{ width: '100%', height: '100%' }}>
      {/* Header */}
      <Box sx={{ 
        p: { xs: 2, md: 3 }, 
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WebIcon sx={{ color: 'primary.main', fontSize: { xs: 24, md: 28 } }} />
          <Box>
            <Box sx={{ 
              fontWeight: 700, 
              fontSize: { xs: '1rem', md: '1.1rem' }, 
              color: 'primary.main' 
            }}>
              {t('admin.dashboard')}
            </Box>
            <Box sx={{ 
              fontSize: { xs: '0.7rem', md: '0.8rem' }, 
              color: 'text.secondary' 
            }}>
              Ekacita
            </Box>
          </Box>
        </Box>
        {isMobile && (
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Navigation Menu */}
      <List sx={{ px: { xs: 1, md: 2 }, py: 1 }}>
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
                    py: { xs: 1.5, md: 2 },
                    px: { xs: 1.5, md: 2 }
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: isActive ? 'primary.contrastText' : 'primary.main',
                    minWidth: { xs: 36, md: 40 }
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={t(item.text)}
                    secondary={t(item.description)}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                      fontSize: { xs: '0.9rem', md: '0.95rem' }
                    }}
                    secondaryTypographyProps={{
                      fontSize: { xs: '0.7rem', md: '0.75rem' },
                      color: isActive ? 'rgba(255,255,255,0.7)' : 'text.secondary'
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ my: { xs: 1, md: 2 } }} />

      {/* User Info */}
      <Box sx={{ p: { xs: 2, md: 3 }, textAlign: 'center' }}>
        <Box sx={{ 
          fontSize: { xs: '0.7rem', md: '0.8rem' }, 
          color: 'text.secondary', 
          mb: 1 
        }}>
          {t('admin.dashboard')}
        </Box>
        <Box sx={{ 
          fontSize: { xs: '0.6rem', md: '0.7rem' }, 
          color: 'text.disabled' 
        }}>
          Ekacita {t('admin.dashboard')}
        </Box>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: '320px',
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
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
  );
}
