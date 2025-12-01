'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '../../components/AdminDashboard';
import { subscribeToAuthChanges, signOutUser } from '../../lib/supabase';
import { Box, CircularProgress } from '@mui/material';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Supabase authentication state changes
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        // Check if user has admin role
        const userRole = user.user_metadata?.role;
        if (userRole === 'admin') {
          setIsAuthenticated(true);
        } else {
          // User is logged in but not an admin
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

    // Cleanup subscription
    return () => unsubscribe();
  }, [router]);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <AdminDashboard onLogout={handleLogout} />
  );
}
