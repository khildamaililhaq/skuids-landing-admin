'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Alert
} from '@mui/material';
import { Person as ProfileIcon } from '@mui/icons-material';
import ClientLayout from '../../../components/client/ClientLayout';
import { getCurrentAgent, updateAgent } from '../../../lib/supabase';

export default function ClientProfilePage() {
  const router = useRouter();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone_number: '',
    email: ''
  });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const loadAgent = async () => {
      const result = await getCurrentAgent();
      if (result.success) {
        setAgent(result.data);
        setFormData({
          name: result.data.name || '',
          username: result.data.username || '',
          phone_number: result.data.phone_number || '',
          email: result.data.email || ''
        });
      } else {
        router.push('/login');
      }
      setLoading(false);
    };
    loadAgent();
  }, [router]);

  const showAlert = (message, severity = 'success') => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!agent) return;

    const result = await updateAgent(agent.id, formData);

    if (result.success) {
      showAlert('Profile updated successfully');
      setAgent(result.data);
      setEditing(false);
    } else {
      showAlert('Error updating profile: ' + result.error, 'error');
    }
  };

  if (loading) {
    return (
      <ClientLayout agent={null}>
        <Typography>Loading...</Typography>
      </ClientLayout>
    );
  }

  if (!agent) {
    return null;
  }

  return (
    <ClientLayout agent={agent}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your account information
        </Typography>

        {alert && (
          <Alert severity={alert.severity} sx={{ mb: 3 }}>
            {alert.message}
          </Alert>
        )}

        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', mr: 3 }}>
              {agent.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h5">{agent.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Agent since {new Date(agent.created_at).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!editing}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                disabled={!editing}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!editing}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone_number}
                onChange={(e) => handleInputChange('phone_number', e.target.value)}
                disabled={!editing}
                variant="outlined"
                placeholder="+62..."
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            {!editing ? (
              <Button variant="contained" onClick={() => setEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <>
                <Button variant="contained" onClick={handleSave}>
                  Save Changes
                </Button>
                <Button variant="outlined" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </Paper>
      </Box>
    </ClientLayout>
  );
}