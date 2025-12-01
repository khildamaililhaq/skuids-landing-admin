'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  CircularProgress
} from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';
import { signInUser, subscribeToAuthChanges } from '../../../lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if already logged in as admin
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        const userRole = user.user_metadata?.role;
        if (userRole === 'admin') {
          router.push('/admin');
          return;
        }
      }
      setChecking(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signInUser(credentials.email, credentials.password);
      if (result.success) {
        // Success - user will be redirected by auth check
        router.push('/admin');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card sx={{ width: '100%', maxWidth: 400 }}>
          <CardContent sx={{ p: 4 }}>
            <Box textAlign="center" mb={3}>
              <AdminPanelSettings sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" component="h1" fontWeight={600}>
                Admin Login
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Access the admin panel
              </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                margin="normal"
                required
                autoFocus
                disabled={loading}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                margin="normal"
                required
                disabled={loading}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, py: 1.5 }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <Box mt={3} p={2} bgcolor="background.default" borderRadius={1}>
              <Typography variant="caption" color="text.secondary">
                Admin credentials required. Only users with admin role can access this area.
              </Typography>
            </Box>

            <Box mt={2} textAlign="center">
              <Typography variant="body2" color="text.secondary">
                <a href="/for-agents" style={{ color: '#0066cc', textDecoration: 'none' }}>
                  Looking for agent login?
                </a>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
