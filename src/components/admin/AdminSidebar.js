import { useMemo } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
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
  VideoCall as PoppoHostIcon
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
    text: 'Poppo Hosts',
    icon: <PoppoHostIcon />,
    path: '/admin/poppo-hosts',
    description: 'Manage Poppo host registrations'
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

  const drawerWidth = useMemo(() => (isMobile ? 280 : 280), [isMobile]);

  const drawerContent = (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        borderBottom: `1px solid ${theme.palette.divider}`,
        flexShrink: 0
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WebIcon sx={{ color: 'primary.main', fontSize: 24 }} />
          <Box>
            <Box sx={{ 
              fontWeight: 700, 
              fontSize: '0.95rem', 
              color: 'primary.main' 
            }}>
              {t('admin.dashboard')}
            </Box>
            <Box sx={{ 
              fontSize: '0.75rem', 
              color: 'text.secondary' 
            }}>
              Ekacita
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ px: 1, py: 1, flex: 1, overflow: 'auto' }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <Link href={item.path} style={{ textDecoration: 'none', width: '100%' }}>
                <ListItemButton
                  sx={{
                    borderRadius: 1.5,
                    bgcolor: isActive ? 'primary.main' : 'transparent',
                    color: isActive ? 'primary.contrastText' : 'text.primary',
                    '&:hover': {
                      bgcolor: isActive ? 'primary.dark' : 'action.hover',
                    },
                    transition: 'all 0.15s ease-in-out',
                    py: 1.25,
                    px: 1.5,
                    minHeight: 'auto'
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: isActive ? 'primary.contrastText' : 'primary.main',
                    minWidth: 36,
                    fontSize: 20
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={t(item.text)}
                    secondary={t(item.description)}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.9rem'
                    }}
                    secondaryTypographyProps={{
                      fontSize: '0.7rem',
                      color: isActive ? 'rgba(255,255,255,0.6)' : 'text.secondary',
                      noWrap: true
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ my: 1 }} />

      {/* Footer Info */}
      <Box sx={{ p: 2, textAlign: 'center', flexShrink: 0 }}>
        <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
          Admin Panel v1.0
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
