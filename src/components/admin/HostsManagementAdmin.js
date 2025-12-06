'use client';

import React, { useState, useEffect } from 'react';
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
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Collapse,
  TablePagination
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon
} from '@mui/icons-material';
import {
  getHosts,
  getHostPartners,
  updateHost,
  deleteHost,
  registerHost,
  updateHostPartner,
  deleteHostPartner,
  getPartners,
  supabase
} from '../../lib/supabase';

export default function HostsManagementAdmin() {
  const [hosts, setHosts] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editingHost, setEditingHost] = useState(null);
  const [viewingHost, setViewingHost] = useState(null);
  const [expandedHostId, setExpandedHostId] = useState(null);
  const [hostPartnersData, setHostPartnersData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    loadData();
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
          loadData();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const hostsResult = await getHosts(0, 999);
      const partnersResult = await getPartners();

      if (hostsResult.success) {
        setHosts(hostsResult.data || []);
      }
      if (partnersResult.success) {
        setPartners(partnersResult.data || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      showAlert('Error loading data: ' + error.message, 'error');
    }
    setLoading(false);
  };

  const loadHostPartners = async (hostId) => {
    try {
      const result = await getHostPartners(hostId);
      if (result.success) {
        setHostPartnersData(prev => ({
          ...prev,
          [hostId]: result.data
        }));
      }
    } catch (error) {
      console.error('Error loading host partners:', error);
    }
  };

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

  const handleDOBChange = (value) => {
    // Accept only digits and hyphens
    value = value.replace(/[^\d-]/g, '');
    
    // Auto-format as user types: dd-mm-yyyy
    if (value.length === 2 && !value.includes('-')) {
      value = value + '-';
    } else if (value.length === 5 && (value.match(/-/g) || []).length === 1) {
      value = value + '-';
    } else if (value.length > 10) {
      value = value.substring(0, 10);
    }
    
    setFormData({ ...formData, dateOfBirth: value });
  };

  const handleExpandClick = (hostId) => {
    if (expandedHostId === hostId) {
      setExpandedHostId(null);
    } else {
      setExpandedHostId(hostId);
      if (!hostPartnersData[hostId]) {
        loadHostPartners(hostId);
      }
    }
  };

  const handleEdit = (host) => {
    setEditingHost(host);
    setFormData({
      name: host.name || '',
      dateOfBirth: displayDOB(host.date_of_birth) || '',
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
        loadData();
      } else {
        showAlert('Error deleting host: ' + result.error, 'error');
      }
    }
  };

  const handleApprovePartner = async (hostPartnerId) => {
    const result = await updateHostPartner(hostPartnerId, {
      isProceed: true,
      isBanned: false
    });

    if (result.success) {
      showAlert('Partner approved');
      if (expandedHostId) {
        loadHostPartners(expandedHostId);
      }
    } else {
      showAlert('Error approving: ' + result.error, 'error');
    }
  };

  const handleBanPartner = async (hostPartnerId, isBanned) => {
    const result = await updateHostPartner(hostPartnerId, {
      isBanned: !isBanned
    });

    if (result.success) {
      showAlert(!isBanned ? 'Partner banned' : 'Partner unbanned');
      if (expandedHostId) {
        loadHostPartners(expandedHostId);
      }
    } else {
      showAlert('Error updating ban status: ' + result.error, 'error');
    }
  };

  const handleDeletePartner = async (hostPartnerId) => {
    if (confirm('Are you sure you want to delete this host-partner relationship?')) {
      const result = await deleteHostPartner(hostPartnerId);

      if (result.success) {
        showAlert('Relationship deleted');
        if (expandedHostId) {
          loadHostPartners(expandedHostId);
        }
      } else {
        showAlert('Error deleting: ' + result.error, 'error');
      }
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.dateOfBirth || !formData.gender || !formData.domicile || !formData.whatsappNumber) {
      showAlert('Please fill in all required fields', 'error');
      return;
    }

    try {
      if (editingHost) {
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
          loadData();
          setDialogOpen(false);
        } else {
          showAlert('Error updating host: ' + result.error, 'error');
        }
      } else {
        const result = await registerHost({
          name: formData.name,
          dateOfBirth: formatDOB(formData.dateOfBirth),
          gender: formData.gender,
          domicile: formData.domicile,
          whatsappNumber: formData.whatsappNumber,
          email: formData.email
        });

        if (result.success) {
          showAlert('Host created successfully');
          loadData();
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter hosts based on search term
  const filteredHosts = hosts.filter(host =>
    host.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    host.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    host.whatsapp_number?.includes(searchTerm)
  );

  const paginatedHosts = filteredHosts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
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
          Hosts & Partnerships Management
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell width="50px" />
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>WhatsApp</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Domicile</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Registered</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedHosts.map((host) => (
                <React.Fragment key={host.id}>
                  <TableRow hover>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleExpandClick(host.id)}
                      >
                        {expandedHostId === host.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{host.name}</TableCell>
                    <TableCell>{host.email || '-'}</TableCell>
                    <TableCell>{host.whatsapp_number}</TableCell>
                    <TableCell>{host.domicile}</TableCell>
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

                  {/* Expanded Row for Partners */}
                  <TableRow>
                    <TableCell colSpan={7} sx={{ p: 0 }}>
                      <Collapse in={expandedHostId === host.id} timeout="auto" unmountOnExit>
                        <Box sx={{ p: 3, backgroundColor: '#fafafa' }}>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Platform Partnerships
                          </Typography>

                          {hostPartnersData[host.id] && hostPartnersData[host.id].length > 0 ? (
                            <TableContainer component={Paper} variant="outlined">
                              <Table size="small">
                                <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                                  <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Platform</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Approved</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Banned</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Joined</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {hostPartnersData[host.id].map((hp) => {
                                    const partnerName = partners.find(p => p.id === hp.partner_id)?.name || 'Unknown';
                                    return (
                                      <TableRow key={hp.id}>
                                        <TableCell>{partnerName}</TableCell>
                                        <TableCell align="center">
                                          <Chip
                                            label={hp.is_proceeded ? 'Yes' : 'No'}
                                            color={hp.is_proceeded ? 'success' : 'warning'}
                                            size="small"
                                            variant="outlined"
                                          />
                                        </TableCell>
                                        <TableCell align="center">
                                          <Chip
                                            label={hp.is_banned ? 'Yes' : 'No'}
                                            color={hp.is_banned ? 'error' : 'success'}
                                            size="small"
                                            variant="outlined"
                                          />
                                        </TableCell>
                                        <TableCell>
                                          {new Date(hp.register_date).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell align="center">
                                          <IconButton
                                            size="small"
                                            onClick={() => handleApprovePartner(hp.id)}
                                            disabled={hp.is_proceeded}
                                            title="Approve"
                                          >
                                            <ApproveIcon fontSize="small" color={hp.is_proceeded ? 'disabled' : 'success'} />
                                          </IconButton>
                                          <IconButton
                                            size="small"
                                            onClick={() => handleBanPartner(hp.id, hp.is_banned)}
                                            title={hp.is_banned ? 'Unban' : 'Ban'}
                                          >
                                            <RejectIcon fontSize="small" color={hp.is_banned ? 'error' : 'inherit'} />
                                          </IconButton>
                                          <IconButton
                                            size="small"
                                            onClick={() => handleDeletePartner(hp.id)}
                                            title="Delete"
                                          >
                                            <DeleteIcon fontSize="small" color="error" />
                                          </IconButton>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          ) : (
                            <Typography color="textSecondary">No partnerships found</Typography>
                          )}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredHosts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}

      {/* Mobile Card View */}
      {isMobile && (
        <Box sx={{ display: { xs: 'grid', md: 'none' }, gridTemplateColumns: '1fr', gap: 2 }}>
          {paginatedHosts.map((host) => (
            <Card key={host.id}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {host.name}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleExpandClick(host.id)}
                  >
                    {expandedHostId === host.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>

                <Box sx={{ mb: 2 }}>
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

                <Typography variant="caption" display="block" sx={{ mb: 2, color: 'text.secondary' }}>
                  Registered: {new Date(host.created_at).toLocaleDateString()}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mb: 2 }}>
                  <IconButton size="small" onClick={() => handleView(host)}>
                    <ViewIcon fontSize="small" color="info" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleEdit(host)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(host.id)}>
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                </Box>

                {/* Expanded Partner List */}
                <Collapse in={expandedHostId === host.id} timeout="auto" unmountOnExit>
                  <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #eee' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Platforms
                    </Typography>
                    {hostPartnersData[host.id] && hostPartnersData[host.id].length > 0 ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {hostPartnersData[host.id].map((hp) => {
                          const partnerName = partners.find(p => p.id === hp.partner_id)?.name || 'Unknown';
                          return (
                            <Card key={hp.id} variant="outlined" sx={{ p: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                    {partnerName}
                                  </Typography>
                                  <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                                    <Chip
                                      label={hp.is_proceeded ? 'Approved' : 'Pending'}
                                      size="small"
                                      color={hp.is_proceeded ? 'success' : 'warning'}
                                      variant="outlined"
                                    />
                                    {hp.is_banned && (
                                      <Chip
                                        label="Banned"
                                        size="small"
                                        color="error"
                                        variant="outlined"
                                      />
                                    )}
                                  </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleApprovePartner(hp.id)}
                                    disabled={hp.is_proceeded}
                                  >
                                    <ApproveIcon fontSize="small" color={hp.is_proceeded ? 'disabled' : 'success'} />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleBanPartner(hp.id, hp.is_banned)}
                                  >
                                    <RejectIcon fontSize="small" color={hp.is_banned ? 'error' : 'inherit'} />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleDeletePartner(hp.id)}
                                  >
                                    <DeleteIcon fontSize="small" color="error" />
                                  </IconButton>
                                </Box>
                              </Box>
                            </Card>
                          );
                        })}
                      </Box>
                    ) : (
                      <Typography variant="caption" color="textSecondary">
                        No partnerships found
                      </Typography>
                    )}
                  </Box>
                </Collapse>
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
            label="Date of Birth (dd-mm-yyyy)"
            value={formData.dateOfBirth}
            onChange={(e) => handleDOBChange(e.target.value)}
            required
            sx={{ mb: 2 }}
            placeholder="dd-mm-yyyy"
            inputProps={{
              maxLength: 10,
              pattern: '\\d{2}-\\d{2}-\\d{4}'
            }}
            helperText="Format: dd-mm-yyyy (e.g., 15-03-1990)"
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
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
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
