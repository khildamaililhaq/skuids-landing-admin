'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Container,
  Link as MuiLink
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import Link from 'next/link';
import { loginAgent, getCurrentAgent } from '../../lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // Check if already logged in
    const checkAuth = async () => {
      const result = await getCurrentAgent();
      if (result.success) {
        router.push('/client');
      }
    };
    checkAuth();
  }, [router]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      showAlert('Please fill in all fields', 'error');
      return;
    }

    setLoading(true);

    const result = await loginAgent(formData.email, formData.password);

    if (result.success) {
      showAlert('Login successful!');
      router.push('/client');
    } else {
      showAlert('Login failed: ' + result.error, 'error');
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <LoginIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Agent Login
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Access your client area
          </Typography>
        </Box>

        {alert && (
          <Alert severity={alert.severity} sx={{ mb: 3 }}>
            {alert.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <MuiLink component={Link} href="/register" sx={{ textDecoration: 'none' }}>
              Register here
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}