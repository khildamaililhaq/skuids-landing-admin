'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import AdminLayout from '../../../components/admin/AdminLayout';
import HostsManagementAdmin from '../../../components/admin/HostsManagementAdmin';
import { subscribeToAuthChanges, signOutUser } from '../../../lib/supabase';

export default function HostsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        const userRole = user.user_metadata?.role;
        if (userRole === 'admin') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          signOutUser();
          router.push('/admin/login');
        }
      } else {
        setIsAuthenticated(false);
        router.push('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <HostsManagementAdmin />
    </AdminLayout>
  );
}
