'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Link as MuiLink,
  CircularProgress
} from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import Link from 'next/link';
import { registerPoppoHost } from '../../lib/supabase';

export default function RegisterAsPoppoHostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    poppoId: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 5000);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.poppoId.trim()) {
      newErrors.poppoId = 'Poppo ID is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showAlert('Please fill in all required fields correctly', 'error');
      return;
    }

    setLoading(true);

    try {
      const result = await registerPoppoHost(formData);

      if (result.success) {
        showAlert('Registration successful! Welcome to Ekacita Poppo Host Program');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        showAlert('Registration failed: ' + result.error, 'error');
      }
    } catch (error) {
      showAlert('Network error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <PersonAddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Register as Poppo Host
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join our Poppo Host community and start earning today
          </Typography>
        </Box>

        {alert && (
          <Alert severity={alert.severity} sx={{ mb: 3 }}>
            {alert.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Full Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                required
                autoFocus
              />
            </Grid>

            {/* Date of Birth */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Gender */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  label="Gender"
                  required
                >
                  <MenuItem value="">
                    <em>Select Gender</em>
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
                {errors.gender && (
                  <Typography variant="caption" color="error">
                    {errors.gender}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                placeholder="e.g., +1 (555) 123-4567"
                required
              />
            </Grid>

            {/* Poppo ID */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Poppo ID"
                name="poppoId"
                value={formData.poppoId}
                onChange={(e) => handleInputChange('poppoId', e.target.value)}
                error={!!errors.poppoId}
                helperText={errors.poppoId}
                required
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box sx={{ mt: 4, mb: 3 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Registering...
                </>
              ) : (
                'Register as Poppo Host'
              )}
            </Button>
          </Box>

          {/* Divider */}
          <Box sx={{ textAlign: 'center', my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              ─────────────────────────────
            </Typography>
          </Box>

          {/* Additional Info */}
          <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>What you'll get:</strong>
            </Typography>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#666' }}>
              <li>Access to exclusive hosting opportunities</li>
              <li>Competitive commission rates</li>
              <li>Professional support and training</li>
              <li>Real-time earnings tracking</li>
              <li>Marketing tools and resources</li>
            </ul>
          </Box>

          {/* Links */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already registered?{' '}
              <MuiLink component={Link} href="/login" sx={{ textDecoration: 'none' }}>
                Login here
              </MuiLink>
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Looking for something else?{' '}
              <MuiLink component={Link} href="/" sx={{ textDecoration: 'none' }}>
                Back to home
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* FAQ Section */}
      <Box sx={{ mt: 6, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Box component="dl">
          <Typography component="dt" variant="subtitle2" sx={{ mt: 2, fontWeight: 600 }}>
            Q: How long does approval take?
          </Typography>
          <Typography component="dd" variant="body2" color="text.secondary" sx={{ ml: 2, mb: 2 }}>
            A: We typically review applications within 24-48 hours. You'll receive an email notification once approved.
          </Typography>

          <Typography component="dt" variant="subtitle2" sx={{ mt: 2, fontWeight: 600 }}>
            Q: Do I need to be a Poppo user already?
          </Typography>
          <Typography component="dd" variant="body2" color="text.secondary" sx={{ ml: 2, mb: 2 }}>
            A: Yes, you need an active Poppo account to get started. If you don't have one, create it first.
          </Typography>

          <Typography component="dt" variant="subtitle2" sx={{ mt: 2, fontWeight: 600 }}>
            Q: What are the payment terms?
          </Typography>
          <Typography component="dd" variant="body2" color="text.secondary" sx={{ ml: 2, mb: 2 }}>
            A: Payments are processed weekly. You can request withdrawals to your bank account or e-wallet.
          </Typography>

          <Typography component="dt" variant="subtitle2" sx={{ mt: 2, fontWeight: 600 }}>
            Q: Can I update my information later?
          </Typography>
          <Typography component="dd" variant="body2" color="text.secondary" sx={{ ml: 2, mb: 2 }}>
            A: Yes, you can update your profile information anytime through the dashboard after approval.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
