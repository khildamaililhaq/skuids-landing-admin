'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Add as AddIcon
} from '@mui/icons-material';
import {
  getHosts,
  updateHost,
  deleteHost,
  registerHost,
  supabase
} from '../../lib/supabase';

export default function HostsAdmin() {
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editingHost, setEditingHost] = useState(null);
  const [viewingHost, setViewingHost] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    domicile: '',
    whatsappNumber: '',
    email: ''
  });
  const [alert, setAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    loadHosts();
    subscribeToChanges();
  }, []);

  const subscribeToChanges = () => {
    const subscription = supabase
      .channel('hosts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'hosts'
        },
        () => {
          loadHosts();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const loadHosts = async () => {
    setLoading(true);
    try {
      const result = await getHosts();
      if (result.success) {
        setHosts(result.data || []);
      } else {
        showAlert('Error loading hosts: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Error loading hosts:', error);
      showAlert('Error loading hosts: ' + error.message, 'error');
    }
    setLoading(false);
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleEdit = (host) => {
    setEditingHost(host);
    setFormData({
      name: host.name || '',
      dateOfBirth: host.date_of_birth || '',
      gender: host.gender || '',
      domicile: host.domicile || '',
      whatsappNumber: host.whatsapp_number || '',
      email: host.email || ''
    });
    setDialogOpen(true);
  };

  const handleView = (host) => {
    setViewingHost(host);
    setViewDialogOpen(true);
  };

  const handleDelete = async (hostId) => {
    if (confirm('Are you sure you want to delete this host? This action cannot be undone.')) {
      const result = await deleteHost(hostId);

      if (result.success) {
        showAlert('Host deleted successfully');
        loadHosts();
      } else {
        showAlert('Error deleting host: ' + result.error, 'error');
      }
    }
  };

  const handleSave = async () => {
    // Validation
    if (!formData.name || !formData.dateOfBirth || !formData.gender || !formData.domicile || !formData.whatsappNumber) {
      showAlert('Please fill in all required fields', 'error');
      return;
    }

    try {
      if (editingHost) {
        // Update existing
        const result = await updateHost(editingHost.id, {
          name: formData.name,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          domicile: formData.domicile,
          whatsappNumber: formData.whatsappNumber,
          email: formData.email
        });

        if (result.success) {
          showAlert('Host updated successfully');
          loadHosts();
          setDialogOpen(false);
        } else {
          showAlert('Error updating host: ' + result.error, 'error');
        }
      } else {
        // Create new
        const result = await registerHost({
          name: formData.name,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          domicile: formData.domicile,
          whatsappNumber: formData.whatsappNumber,
          email: formData.email
        });

        if (result.success) {
          showAlert('Host created successfully');
          loadHosts();
          setDialogOpen(false);
        } else {
          showAlert('Error creating host: ' + result.error, 'error');
        }
      }
    } catch (error) {
      showAlert('Error saving host: ' + error.message, 'error');
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingHost(null);
    setFormData({
      name: '',
      dateOfBirth: '',
      gender: '',
      domicile: '',
      whatsappNumber: '',
      email: ''
    });
  };

  // Filter hosts based on search term
  const filteredHosts = hosts.filter(host =>
    host.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    host.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    host.whatsapp_number?.includes(searchTerm)
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {alert && <Alert severity={alert.severity} sx={{ mb: 2 }}>{alert.message}</Alert>}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Registered Hosts
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Add Host
        </Button>
      </Box>

      {/* Search Section */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by name, email, or WhatsApp number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          variant="outlined"
        />
      </Box>

      <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
        Total Hosts: {filteredHosts.length}
      </Typography>

      {/* Desktop Table View */}
      {!isMobile && (
        <TableContainer component={Paper} sx={{ display: { xs: 'none', md: 'table' } }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>WhatsApp</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Domicile</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>DOB</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Registered</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHosts.map((host) => (
                <TableRow key={host.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{host.name}</TableCell>
                  <TableCell>{host.email || '-'}</TableCell>
                  <TableCell>{host.whatsapp_number}</TableCell>
                  <TableCell>
                    <Chip
                      label={host.gender || '-'}
                      size="small"
                      variant="outlined"
                      color={host.gender === 'male' ? 'primary' : 'secondary'}
                    />
                  </TableCell>
                  <TableCell>{host.domicile}</TableCell>
                  <TableCell>
                    {host.date_of_birth
                      ? new Date(host.date_of_birth).toLocaleDateString()
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {new Date(host.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleView(host)}
                      title="View"
                    >
                      <ViewIcon fontSize="small" color="info" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(host)}
                      title="Edit"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(host.id)}
                      title="Delete"
                    >
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Mobile Card View */}
      {isMobile && (
        <Box sx={{ display: { xs: 'grid', md: 'none' }, gridTemplateColumns: '1fr', gap: 2 }}>
          {filteredHosts.map((host) => (
            <Card key={host.id}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {host.name}
                </Typography>
                
                <Box sx={{ mb: 1 }}>
                  {host.email && (
                    <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                      📧 {host.email}
                    </Typography>
                  )}
                  <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                    📱 {host.whatsapp_number}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                    📍 {host.domicile}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label={host.gender}
                    size="small"
                    variant="outlined"
                    color={host.gender === 'male' ? 'primary' : 'secondary'}
                  />
                  <Chip
                    label={new Date(host.date_of_birth).toLocaleDateString()}
                    size="small"
                    variant="outlined"
                  />
                </Box>

                <Typography variant="caption" display="block" sx={{ mb: 2, color: 'text.secondary' }}>
                  Registered: {new Date(host.created_at).toLocaleDateString()}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <IconButton
                    size="small"
                    onClick={() => handleView(host)}
                  >
                    <ViewIcon fontSize="small" color="info" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(host)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(host.id)}
                  >
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {filteredHosts.length === 0 && (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="textSecondary">
            {hosts.length === 0 ? 'No hosts registered yet' : 'No hosts match your search'}
          </Typography>
        </Paper>
      )}

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Host Details</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {viewingHost && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="caption" color="textSecondary">Name</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>{viewingHost.name}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="textSecondary">Email</Typography>
                <Typography variant="body1">{viewingHost.email || '-'}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="textSecondary">WhatsApp Number</Typography>
                <Typography variant="body1">{viewingHost.whatsapp_number}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="textSecondary">Gender</Typography>
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{viewingHost.gender}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="textSecondary">Domicile (City/Region)</Typography>
                <Typography variant="body1">{viewingHost.domicile}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="textSecondary">Date of Birth</Typography>
                <Typography variant="body1">
                  {viewingHost.date_of_birth
                    ? new Date(viewingHost.date_of_birth).toLocaleDateString()
                    : '-'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="textSecondary">Registered On</Typography>
                <Typography variant="body1">
                  {new Date(viewingHost.created_at).toLocaleDateString()} at{' '}
                  {new Date(viewingHost.created_at).toLocaleTimeString()}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {editingHost ? 'Edit Host' : 'Add New Host'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="date"
            label="Date of Birth"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            required
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />

          <TextField
            select
            fullWidth
            label="Gender"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            required
            sx={{ mb: 2 }}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </TextField>

          <TextField
            fullWidth
            label="Domicile (City/Region)"
            value={formData.domicile}
            onChange={(e) => setFormData({ ...formData, domicile: e.target.value })}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="WhatsApp Number"
            value={formData.whatsappNumber}
            onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
            placeholder="+62..."
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="email"
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
