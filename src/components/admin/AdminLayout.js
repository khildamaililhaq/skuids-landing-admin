import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  Stack
} from '@mui/material';
import {
  Menu as MenuIcon,
  ViewInAr as ViewIcon,
  Logout as LogoutIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import { signOutUser } from '../../lib/supabase';
import { useContent } from '../../hooks/useContent';

export default function AdminLayout({ children, onLogout }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { content } = useContent();
  const logo = content?.logo || '/logo.svg';

  const handleLogout = async () => {
    try {
      await signOutUser();
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
      onLogout();
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Dashboard';
    if (pathname === '/admin/landing-page') return 'Landing Page';
    if (pathname === '/admin/settings') return 'Settings';
    if (pathname === '/admin/poppo-hosts') return 'Poppo Hosts';
    if (pathname === '/admin/agents') return 'Agents';
    if (pathname === '/admin/partners') return 'Partners';
    return 'Admin Panel';
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar - Desktop */}
      {!isTablet && <AdminSidebar open={true} onClose={() => {}} />}

      {/* Sidebar - Mobile Drawer */}
      {isTablet && (
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          ModalProps={{ keepMounted: true }}
        >
          <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </Drawer>
      )}

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        {/* Top App Bar */}
        <AppBar 
          position="sticky" 
          sx={{ 
            bgcolor: 'background.paper',
            color: 'text.primary',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            zIndex: theme.zIndex.drawer + 1
          }}
        >
          <Toolbar sx={{ 
            minHeight: { xs: 56, sm: 64 },
            px: { xs: 1, sm: 2, md: 3 },
            gap: { xs: 0.5, sm: 1, md: 2 }
          }}>
            {/* Mobile Menu Button */}
            {isTablet && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleSidebar}
                sx={{ color: 'primary.main', mr: { xs: 0.5, sm: 1 } }}
              >
                <MenuIcon fontSize="small" />
              </IconButton>
            )}

            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                  mr: { xs: 1, sm: 2 }
                }}
              >
                <Image
                  src={logo}
                  alt="Logo"
                  width={isMobile ? 40 : 50}
                  height={isMobile ? 20 : 25}
                  priority
                  style={{ height: 'auto', maxWidth: '100%' }}
                />
              </Box>
            </Link>

            {/* Page Title */}
            <Typography 
              variant="subtitle1"
              sx={{ 
                flexGrow: 1,
                color: 'primary.main',
                fontWeight: 600,
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {getPageTitle()}
            </Typography>

            {/* Action Buttons */}
            <Stack direction="row" spacing={{ xs: 0.25, sm: 0.5 }} sx={{ alignItems: 'center' }}>
              <Button 
                href="/" 
                startIcon={isMobile ? undefined : <ViewIcon />}
                sx={{ 
                  color: 'primary.main',
                  fontSize: { xs: '0.7rem', sm: '0.85rem' },
                  px: { xs: 1, sm: 1.5 },
                  py: { xs: 0.4, sm: 0.6 },
                  minWidth: { xs: 'auto', sm: 'auto' },
                  '&:hover': { bgcolor: 'primary.main', color: 'white' }
                }}
                variant="outlined"
                size="small"
              >
                {isMobile ? <ViewIcon fontSize="small" /> : 'View'}
              </Button>
              <Button 
                onClick={handleLogout}
                startIcon={isMobile ? undefined : <LogoutIcon />}
                sx={{ 
                  color: 'error.main',
                  fontSize: { xs: '0.7rem', sm: '0.85rem' },
                  px: { xs: 1, sm: 1.5 },
                  py: { xs: 0.4, sm: 0.6 },
                  minWidth: { xs: 'auto', sm: 'auto' },
                  '&:hover': { bgcolor: 'error.main', color: 'white' }
                }}
                variant="outlined"
                size="small"
              >
                {isMobile ? <LogoutIcon fontSize="small" /> : 'Logout'}
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            bgcolor: 'background.default',
            width: '100%',
            overflow: 'auto',
            p: { xs: 1, sm: 1.5, md: 2 }
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
