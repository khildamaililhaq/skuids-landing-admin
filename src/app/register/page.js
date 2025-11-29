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
  Grid,
  Link as MuiLink
} from '@mui/material';
import { PersonAdd as RegisterIcon } from '@mui/icons-material';
import Link from 'next/link';
import { registerAgent, getCurrentAgent } from '../../lib/supabase';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone_number: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (!formData.name.trim() || !formData.username.trim() || !formData.email.trim() || !formData.password) {
      showAlert('Please fill in all required fields', 'error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showAlert('Passwords do not match', 'error');
      return;
    }

    if (formData.password.length < 6) {
      showAlert('Password must be at least 6 characters', 'error');
      return;
    }

    setLoading(true);

    const result = await registerAgent({
      name: formData.name,
      username: formData.username,
      phone_number: formData.phone_number,
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      const message = result.message || result.partial 
        ? 'Registration successful! Please check your email to verify your account before logging in.'
        : 'Registration successful! You can now log in.';
      showAlert(message);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      showAlert('Registration failed: ' + result.error, 'error');
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <RegisterIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Agent Registration
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join Skuids as an agent and access the client area
          </Typography>
        </Box>

        {alert && (
          <Alert severity={alert.severity} sx={{ mb: 3 }}>
            {alert.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                required
                variant="outlined"
                helperText="Choose a unique username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone_number}
                onChange={(e) => handleInputChange('phone_number', e.target.value)}
                variant="outlined"
                placeholder="+62..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                variant="outlined"
                helperText="Minimum 6 characters"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? 'Registering...' : 'Register as Agent'}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <MuiLink component={Link} href="/login" sx={{ textDecoration: 'none' }}>
              Login here
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}