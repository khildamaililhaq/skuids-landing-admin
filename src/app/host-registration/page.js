'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Alert,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material';
import { PersonAdd as PersonAddIcon, CheckCircle as SuccessIcon } from '@mui/icons-material';
import { registerHost } from '../../lib/supabase';

export default function HostRegistrationPage() {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    domicile: '',
    whatsappNumber: '',
    email: '',
  });

  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // No need to load partners since we're not using partner dropdown
  }, []);

  const showAlert = (message, severity = 'success') => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 5000);
  };

  const formatDOB = (ddmmyyyy) => {
    // Convert dd-mm-yyyy to yyyy-mm-dd for storage
    if (!ddmmyyyy || ddmmyyyy.length !== 10) return '';
    const [dd, mm, yyyy] = ddmmyyyy.split('-');
    return `${yyyy}-${mm}-${dd}`;
  };

  const displayDOB = (yyyymmdd) => {
    // Convert yyyy-mm-dd to dd-mm-yyyy for display
    if (!yyyymmdd) return '';
    const [yyyy, mm, dd] = yyyymmdd.split('-');
    return `${dd}-${mm}-${yyyy}`;
  };

  const handleInputChange = (field, value) => {
    if (field === 'dateOfBirth') {
      // Accept only digits and hyphens
      value = value.replace(/[^\d-]/g, '');
      
      // Auto-format as user types: dd-mm-yyyy
      if (value.length === 2 && !value.includes('-')) {
        value = value + '-';
      } else if (value.length === 5 && (value.match(/-/g) || []).length === 1) {
        value = value + '-';
      } else if (value.length > 10) {
        // Keep only valid format
        value = value.substring(0, 10);
      }
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showAlert('Name is required', 'error');
      return false;
    }
    if (!formData.dateOfBirth) {
      showAlert('Date of birth is required', 'error');
      return false;
    }
    // Validate dd-mm-yyyy format
    const dobRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dobRegex.test(formData.dateOfBirth)) {
      showAlert('Date of birth must be in dd-mm-yyyy format', 'error');
      return false;
    }
    // Validate actual date
    const [dd, mm, yyyy] = formData.dateOfBirth.split('-');
    const dob = new Date(`${yyyy}-${mm}-${dd}`);
    if (isNaN(dob.getTime())) {
      showAlert('Please enter a valid date', 'error');
      return false;
    }
    if (!formData.gender) {
      showAlert('Gender is required', 'error');
      return false;
    }
    if (!formData.domicile.trim()) {
      showAlert('Domicile is required', 'error');
      return false;
    }
    if (!formData.whatsappNumber.trim()) {
      showAlert('WhatsApp number is required', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const result = await registerHost({
      name: formData.name,
      dateOfBirth: formatDOB(formData.dateOfBirth),
      gender: formData.gender,
      domicile: formData.domicile,
      whatsappNumber: formData.whatsappNumber,
      email: formData.email || null,
    });

    if (result.success) {
      showAlert('Registration successful! Welcome to Skuids!');
      setSuccess(true);
      setFormData({
        name: '',
        dateOfBirth: '',
        gender: '',
        domicile: '',
        whatsappNumber: '',
        email: '',
      });
      
      // Redirect to home after 2 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } else {
      showAlert('Registration failed: ' + result.error, 'error');
    }

    setLoading(false);
  };

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Card sx={{ textAlign: 'center', p: 4 }}>
          <SuccessIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Registration Successful!
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Welcome to Skuids! You're now registered as a host. Redirecting to home...
          </Typography>
          <CircularProgress />
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <PersonAddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Host Registration
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join Skuids and start earning as a host
          </Typography>
        </Box>

        {alert && (
          <Alert severity={alert.severity} sx={{ mb: 3 }}>
            {alert.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                disabled={loading}
                placeholder="Enter your full name"
              />
            </Grid>

            {/* Date of Birth */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date of Birth (dd-mm-yyyy)"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                required
                disabled={loading}
                placeholder="dd-mm-yyyy"
                inputProps={{
                  maxLength: 10,
                  pattern: '\\d{2}-\\d{2}-\\d{4}'
                }}
                helperText="Format: dd-mm-yyyy (e.g., 15-03-1990)"
              />
            </Grid>

            {/* Gender */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required disabled={loading}>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Domicile */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Domicile (City/Region)"
                value={formData.domicile}
                onChange={(e) => handleInputChange('domicile', e.target.value)}
                required
                disabled={loading}
                placeholder="Enter your city or region"
              />
            </Grid>

            {/* WhatsApp Number */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="WhatsApp Number"
                value={formData.whatsappNumber}
                onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                required
                disabled={loading}
                placeholder="Enter your WhatsApp number (e.g., +62812345678)"
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={loading}
                placeholder="Enter your email (optional)"
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ py: 1.5, mt: 2 }}
              >
                {loading ? 'Registering...' : 'Complete Registration'}
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Info Section */}
        <Box sx={{ mt: 4, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Why join Skuids?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Earn money through live streaming<br />
            • Access to multiple platforms<br />
            • Marketing support from our team<br />
            • Community of successful hosts
          </Typography>
        </Box>

        {/* Footer Links */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already registered?{' '}
            <a href="/login" style={{ color: '#0066cc', textDecoration: 'none' }}>
              Login here
            </a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
