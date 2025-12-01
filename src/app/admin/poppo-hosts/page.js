'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../../components/admin/AdminLayout';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  TablePagination,
  Card,
  CardContent,
  Stack,
  useTheme,
  useMediaQuery,
  IconButton,
  Collapse,
  Typography
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { getPoppoHosts, updatePoppoHost, deletePoppoHost, subscribeToAuthChanges, signOutUser } from '../../../lib/supabase';

function PoppoHostsContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 5 : 10);
  const [totalCount, setTotalCount] = useState(0);
  
  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [editingHost, setEditingHost] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    poppoId: '',
    email: ''
  });

  useEffect(() => {
    loadHosts();
  }, [page, rowsPerPage]);

  const loadHosts = async () => {
    setLoading(true);
    const from = page * rowsPerPage;
    const to = from + rowsPerPage - 1;
    
    const result = await getPoppoHosts(from, to);
    
    if (result.success) {
      setHosts(result.data);
      setTotalCount(result.count);
    } else {
      showAlert('Failed to load hosts: ' + result.error, 'error');
    }
    
    setLoading(false);
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 5000);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (host) => {
    setEditingHost(host);
    setFormData({
      name: host.name,
      dateOfBirth: host.date_of_birth,
      gender: host.gender,
      phoneNumber: host.phone_number,
      poppoId: host.poppo_id,
      email: host.email
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingHost(null);
    setFormData({
      name: '',
      dateOfBirth: '',
      gender: '',
      phoneNumber: '',
      poppoId: '',
      email: ''
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!editingHost) return;

    const result = await updatePoppoHost(editingHost.id, formData);
    
    if (result.success) {
      showAlert('Host updated successfully');
      handleCloseDialog();
      loadHosts();
    } else {
      showAlert('Failed to update host: ' + result.error, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this host record?')) {
      return;
    }

    const result = await deletePoppoHost(id);
    
    if (result.success) {
      showAlert('Host deleted successfully');
      loadHosts();
    } else {
      showAlert('Failed to delete host: ' + result.error, 'error');
    }
  };

  if (loading && hosts.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  // Mobile card view
  const MobileHostCard = ({ host }) => (
    <Card sx={{ mb: 2, boxShadow: 1 }}>
      <CardContent sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600, mb: 0.5 }}>
              {host.name}
            </Typography>
            <Chip
              label={host.gender.charAt(0).toUpperCase() + host.gender.slice(1)}
              size="small"
              color={host.gender === 'male' ? 'primary' : 'secondary'}
              variant="outlined"
              sx={{ mr: 1, mb: 1 }}
            />
            <Chip label={host.poppo_id} size="small" sx={{ mb: 1 }} />
          </Box>
          <IconButton
            size="small"
            onClick={() => setExpandedRow(expandedRow === host.id ? null : host.id)}
          >
            <ExpandMoreIcon sx={{ transform: expandedRow === host.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
          </IconButton>
        </Box>
        
        <Collapse in={expandedRow === host.id} timeout="auto">
          <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>DOB:</strong> {new Date(host.date_of_birth).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Phone:</strong> {host.phone_number}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Email:</strong> {host.email}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              <strong>Registered:</strong> {new Date(host.created_at).toLocaleDateString()}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => handleEditClick(host)}
                fullWidth
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(host.id)}
                fullWidth
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
      {alert && (
        <Alert severity={alert.severity} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}

      {isMobile ? (
        <Box>
          {hosts.length === 0 ? (
            <Typography sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
              No hosts found
            </Typography>
          ) : (
            hosts.map((host) => <MobileHostCard key={host.id} host={host} />)
          )}
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
          <Table size={isTablet ? 'small' : 'medium'}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                {!isTablet && <TableCell sx={{ fontWeight: 700 }}>DOB</TableCell>}
                <TableCell sx={{ fontWeight: 700 }}>Gender</TableCell>
                {!isTablet && <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>}
                <TableCell sx={{ fontWeight: 700 }}>Poppo ID</TableCell>
                {!isTablet && <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>}
                {!isTablet && <TableCell sx={{ fontWeight: 700 }}>Registered</TableCell>}
                <TableCell align="center" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hosts.map((host) => (
                <TableRow key={host.id} hover sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                  <TableCell>{host.name}</TableCell>
                  {!isTablet && <TableCell>{new Date(host.date_of_birth).toLocaleDateString()}</TableCell>}
                  <TableCell>
                    <Chip
                      label={host.gender.charAt(0).toUpperCase() + host.gender.slice(1)}
                      size="small"
                      color={host.gender === 'male' ? 'primary' : 'secondary'}
                      variant="outlined"
                    />
                  </TableCell>
                  {!isTablet && <TableCell>{host.phone_number}</TableCell>}
                  <TableCell>{host.poppo_id}</TableCell>
                  {!isTablet && <TableCell>{host.email}</TableCell>}
                  {!isTablet && <TableCell>{new Date(host.created_at).toLocaleDateString()}</TableCell>}
                  <TableCell align="center">
                    <Stack direction={isTablet ? "column" : "row"} spacing={0.5}>
                      <IconButton
                        size="small"
                        onClick={() => handleEditClick(host)}
                        color="primary"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(host.id)}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            sx={{ 
              '& .MuiToolbar-root': {
                px: { xs: 1, sm: 2 }
              }
            }}
          />
        </TableContainer>
      )}

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit Poppo Host
          <Button
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Poppo ID"
                value={formData.poppoId}
                onChange={(e) => handleInputChange('poppoId', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default function PoppoHostsAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        const userRole = user.user_metadata?.role;
        if (userRole === 'admin') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          signOutUser();
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5">Access Denied</Typography>
        <Typography>Only admins can access this page.</Typography>
        <Button href="/admin/login" variant="contained">Go to Admin Login</Button>
      </Box>
    );
  }

  return (
    <AdminLayout onLogout={handleLogout}>
      <PoppoHostsContent />
    </AdminLayout>
  );
}
