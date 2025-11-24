'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  CloudUpload as UploadIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { getPartners, createPartner, updatePartner, deletePartner, uploadFileToStorage } from '../../lib/supabase';
import Image from 'next/image';

export default function PartnersAdmin() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    photo: '',
    agent_join_link: '',
    hosts_join_link: ''
  });
  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    const result = await getPartners();
    if (result.success) {
      setPartners(result.data);
    } else {
      console.error('Error loading partners:', result.error);
    }
    setLoading(false);
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleOpenDialog = (partner = null) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData({
        name: partner.name || '',
        description: partner.description || '',
        photo: partner.photo || '',
        agent_join_link: partner.agent_join_link || '',
        hosts_join_link: partner.hosts_join_link || ''
      });
    } else {
      setEditingPartner(null);
      setFormData({
        name: '',
        description: '',
        photo: '',
        agent_join_link: '',
        hosts_join_link: ''
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingPartner(null);
    setFormData({
      name: '',
      description: '',
      photo: '',
      agent_join_link: '',
      hosts_join_link: ''
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    const result = await uploadFileToStorage(file, 'partners');
    if (result.success) {
      setFormData(prev => ({ ...prev, photo: result.url }));
      showAlert('Photo uploaded successfully');
    } else {
      showAlert('Error uploading photo: ' + result.error, 'error');
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      showAlert('Name is required', 'error');
      return;
    }

    setUploading(true);

    let result;
    if (editingPartner) {
      result = await updatePartner(editingPartner.id, formData);
    } else {
      result = await createPartner(formData);
    }

    if (result.success) {
      showAlert(`Partner ${editingPartner ? 'updated' : 'created'} successfully`);
      loadPartners();
      handleCloseDialog();
    } else {
      showAlert('Error saving partner: ' + result.error, 'error');
    }

    setUploading(false);
  };

  const handleDelete = async (partnerId) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      const result = await deletePartner(partnerId);
      if (result.success) {
        showAlert('Partner deleted successfully');
        loadPartners();
      } else {
        showAlert('Error deleting partner: ' + result.error, 'error');
      }
    }
  };

  if (loading) {
    return <Typography>Loading partners...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Partners Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Partner
        </Button>
      </Box>

      {alert && (
        <Alert severity={alert.severity} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Agent Link</TableCell>
              <TableCell>Hosts Link</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell>
                  {partner.photo ? (
                    <Box sx={{ position: 'relative', width: 60, height: 60, borderRadius: 1, overflow: 'hidden' }}>
                      <Image
                        src={partner.photo}
                        alt={partner.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>
                  ) : (
                    <Box sx={{ width: 60, height: 60, bgcolor: 'grey.200', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ImageIcon />
                    </Box>
                  )}
                </TableCell>
                <TableCell>{partner.name}</TableCell>
                <TableCell>
                  {partner.description ? partner.description.substring(0, 50) + '...' : 'No description'}
                </TableCell>
                <TableCell>
                  {partner.agent_join_link ? (
                    <a href={partner.agent_join_link} target="_blank" rel="noopener noreferrer">
                      Link
                    </a>
                  ) : 'N/A'}
                </TableCell>
                <TableCell>
                  {partner.hosts_join_link ? (
                    <a href={partner.hosts_join_link} target="_blank" rel="noopener noreferrer">
                      Link
                    </a>
                  ) : 'N/A'}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(partner)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(partner.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {partners.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No partners found. Click 'Add Partner' to create your first partner.
          </Typography>
        </Box>
      )}

      {/* Partner Form Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5" component="div" sx={{ color: 'primary.main', fontWeight: 600 }}>
            {editingPartner ? 'Edit Partner' : 'Add New Partner'}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Partner Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                multiline
                rows={3}
                variant="outlined"
                placeholder="Describe the partner..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Agent Join Link"
                value={formData.agent_join_link}
                onChange={(e) => handleInputChange('agent_join_link', e.target.value)}
                variant="outlined"
                placeholder="https://..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Hosts Join Link"
                value={formData.hosts_join_link}
                onChange={(e) => handleInputChange('hosts_join_link', e.target.value)}
                variant="outlined"
                placeholder="https://..."
              />
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Partner Photo
                </Typography>
                {formData.photo ? (
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ position: 'relative', width: 100, height: 100, borderRadius: 1, overflow: 'hidden' }}>
                      <Image
                        src={formData.photo}
                        alt="Partner photo"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>
                    <IconButton
                      onClick={() => setFormData(prev => ({ ...prev, photo: '' }))}
                      sx={{ bgcolor: 'error.main', color: 'white' }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Box>
                ) : null}
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadIcon />}
                  disabled={uploading}
                  fullWidth
                >
                  {uploading ? <CircularProgress size={20} /> : 'Upload Photo'}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handlePhotoUpload(e.target.files[0])}
                  />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} disabled={uploading}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={uploading || !formData.name.trim()}
            sx={{ minWidth: 100 }}
          >
            {uploading ? <CircularProgress size={20} color="inherit" /> : 'Save Partner'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}