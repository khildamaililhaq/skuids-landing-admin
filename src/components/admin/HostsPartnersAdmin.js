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
  useMediaQuery
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Add as AddIcon
} from '@mui/icons-material';
import {
  getHostPartners,
  getPartnerHosts,
  updateHostPartner,
  deleteHostPartner,
  createHostPartner,
  getHosts,
  getPartners,
  supabase
} from '../../lib/supabase';

export default function HostsPartnersAdmin() {
  const [hostPartners, setHostPartners] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingHostPartner, setEditingHostPartner] = useState(null);
  const [formData, setFormData] = useState({
    host_id: '',
    partner_id: '',
    is_proceeded: false,
    is_banned: false
  });
  const [alert, setAlert] = useState(null);
  const [filterProceed, setFilterProceed] = useState('all'); // all, proceeded, pending
  const [filterBanned, setFilterBanned] = useState('all'); // all, banned, active
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    loadData();
    subscribeToChanges();
  }, []);

  const subscribeToChanges = () => {
    const subscription = supabase
      .channel('hosts_partners_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'hosts_partners'
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
      // Load all host-partner relationships
      const { data: allHostPartners } = await supabase
        .from('hosts_partners')
        .select('*, hosts(name, email), partners(name)')
        .order('register_date', { ascending: false });

      setHostPartners(allHostPartners || []);

      // Load hosts and partners for dropdown selection
      const hostsResult = await getHosts();
      const partnersResult = await getPartners();
      
      if (hostsResult.success) setHosts(hostsResult.data || []);
      if (partnersResult.success) setPartners(partnersResult.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
      showAlert('Error loading data: ' + error.message, 'error');
    }
    setLoading(false);
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleApprove = async (hostPartnerId) => {
    const result = await updateHostPartner(hostPartnerId, {
      isProceed: true,
      isBanned: false
    });

    if (result.success) {
      showAlert('Host-Partner approved successfully');
      loadData();
    } else {
      showAlert('Error approving: ' + result.error, 'error');
    }
  };

  const handleBan = async (hostPartnerId, isBanned) => {
    const result = await updateHostPartner(hostPartnerId, {
      isBanned: !isBanned
    });

    if (result.success) {
      showAlert(!isBanned ? 'Host-Partner banned' : 'Host-Partner unbanned');
      loadData();
    } else {
      showAlert('Error updating ban status: ' + result.error, 'error');
    }
  };

  const handleEdit = (hostPartner) => {
    setEditingHostPartner(hostPartner);
    setFormData({
      host_id: hostPartner.host_id,
      partner_id: hostPartner.partner_id,
      is_proceeded: hostPartner.is_proceeded,
      is_banned: hostPartner.is_banned
    });
    setDialogOpen(true);
  };

  const handleDelete = async (hostPartnerId) => {
    if (confirm('Are you sure you want to delete this host-partner relationship?')) {
      const result = await deleteHostPartner(hostPartnerId);

      if (result.success) {
        showAlert('Host-Partner deleted successfully');
        loadData();
      } else {
        showAlert('Error deleting: ' + result.error, 'error');
      }
    }
  };

  const handleSave = async () => {
    if (!formData.host_id || !formData.partner_id) {
      showAlert('Please select both host and partner', 'error');
      return;
    }

    if (editingHostPartner) {
      // Update existing
      const result = await updateHostPartner(editingHostPartner.id, {
        isProceed: formData.is_proceeded,
        isBanned: formData.is_banned
      });

      if (result.success) {
        showAlert('Host-Partner updated successfully');
        loadData();
        setDialogOpen(false);
      } else {
        showAlert('Error updating: ' + result.error, 'error');
      }
    } else {
      // Create new
      const result = await createHostPartner(
        formData.host_id,
        formData.partner_id,
        new Date()
      );

      if (result.success) {
        showAlert('Host-Partner created successfully');
        loadData();
        setDialogOpen(false);
      } else {
        showAlert('Error creating: ' + result.error, 'error');
      }
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingHostPartner(null);
    setFormData({
      host_id: '',
      partner_id: '',
      is_proceeded: false,
      is_banned: false
    });
  };

  // Filter data based on selections
  const filteredData = hostPartners.filter(item => {
    let proceedMatch = filterProceed === 'all' 
      ? true 
      : filterProceed === 'proceeded' ? item.is_proceeded : !item.is_proceeded;
    
    let bannedMatch = filterBanned === 'all'
      ? true
      : filterBanned === 'banned' ? item.is_banned : !item.is_banned;

    return proceedMatch && bannedMatch;
  });

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
          Hosts & Partners Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Add Link
        </Button>
      </Box>

      {/* Filter Section */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            fullWidth
            label="Approval Status"
            value={filterProceed}
            onChange={(e) => setFilterProceed(e.target.value)}
            size="small"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="proceeded">Approved</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            fullWidth
            label="Ban Status"
            value={filterBanned}
            onChange={(e) => setFilterBanned(e.target.value)}
            size="small"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="banned">Banned</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* Desktop Table View */}
      {!isMobile && (
        <TableContainer component={Paper} sx={{ display: { xs: 'none', md: 'table' } }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Host Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Host Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Partner Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Approved</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Banned</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Register Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((hostPartner) => (
                <TableRow key={hostPartner.id} hover>
                  <TableCell>{hostPartner.hosts?.name || 'N/A'}</TableCell>
                  <TableCell>{hostPartner.hosts?.email || 'N/A'}</TableCell>
                  <TableCell>{hostPartner.partners?.name || 'N/A'}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={hostPartner.is_proceeded ? 'Yes' : 'No'}
                      color={hostPartner.is_proceeded ? 'success' : 'warning'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={hostPartner.is_banned ? 'Yes' : 'No'}
                      color={hostPartner.is_banned ? 'error' : 'success'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(hostPartner.register_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleApprove(hostPartner.id)}
                      disabled={hostPartner.is_proceeded}
                      title="Approve"
                    >
                      <ApproveIcon fontSize="small" color={hostPartner.is_proceeded ? 'disabled' : 'success'} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleBan(hostPartner.id, hostPartner.is_banned)}
                      title={hostPartner.is_banned ? 'Unban' : 'Ban'}
                    >
                      <RejectIcon fontSize="small" color={hostPartner.is_banned ? 'error' : 'inherit'} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(hostPartner)}
                      title="Edit"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(hostPartner.id)}
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
          {filteredData.map((hostPartner) => (
            <Card key={hostPartner.id}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {hostPartner.hosts?.name || 'N/A'}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mb: 1, color: 'text.secondary' }}>
                  {hostPartner.hosts?.email || 'N/A'}
                </Typography>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  → {hostPartner.partners?.name || 'N/A'}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label={`Approved: ${hostPartner.is_proceeded ? 'Yes' : 'No'}`}
                    color={hostPartner.is_proceeded ? 'success' : 'warning'}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={`Banned: ${hostPartner.is_banned ? 'Yes' : 'No'}`}
                    color={hostPartner.is_banned ? 'error' : 'success'}
                    size="small"
                    variant="outlined"
                  />
                </Box>

                <Typography variant="caption" display="block" sx={{ mb: 2, color: 'text.secondary' }}>
                  Joined: {new Date(hostPartner.register_date).toLocaleDateString()}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <IconButton
                    size="small"
                    onClick={() => handleApprove(hostPartner.id)}
                    disabled={hostPartner.is_proceeded}
                  >
                    <ApproveIcon fontSize="small" color={hostPartner.is_proceeded ? 'disabled' : 'success'} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleBan(hostPartner.id, hostPartner.is_banned)}
                  >
                    <RejectIcon fontSize="small" color={hostPartner.is_banned ? 'error' : 'inherit'} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(hostPartner)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(hostPartner.id)}
                  >
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {filteredData.length === 0 && (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="textSecondary">
            No host-partner relationships found
          </Typography>
        </Paper>
      )}

      {/* Dialog for adding/editing */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {editingHostPartner ? 'Edit Host-Partner Link' : 'Add New Host-Partner Link'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            select
            fullWidth
            label="Host"
            value={formData.host_id}
            onChange={(e) => setFormData({ ...formData, host_id: e.target.value })}
            disabled={!!editingHostPartner}
            sx={{ mb: 2 }}
          >
            {hosts.map((host) => (
              <MenuItem key={host.id} value={host.id}>
                {host.name} ({host.email})
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            label="Partner"
            value={formData.partner_id}
            onChange={(e) => setFormData({ ...formData, partner_id: e.target.value })}
            disabled={!!editingHostPartner}
            sx={{ mb: 2 }}
          >
            {partners.map((partner) => (
              <MenuItem key={partner.id} value={partner.id}>
                {partner.name}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                type="checkbox"
                label="Approved"
                checked={formData.is_proceeded}
                onChange={(e) => setFormData({ ...formData, is_proceeded: e.target.checked })}
                InputProps={{
                  type: 'checkbox'
                }}
                sx={{ mb: 2 }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                type="checkbox"
                label="Banned"
                checked={formData.is_banned}
                onChange={(e) => setFormData({ ...formData, is_banned: e.target.checked })}
                InputProps={{
                  type: 'checkbox'
                }}
                sx={{ mb: 2 }}
              />
            </Box>
          </Box>
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
