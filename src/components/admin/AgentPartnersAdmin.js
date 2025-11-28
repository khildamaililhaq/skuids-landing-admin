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
  Alert,
  Grid
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon
} from '@mui/icons-material';
import { getAllAgentPartners, updateAgentPartner, deleteAgentPartner } from '../../lib/supabase';

export default function AgentPartnersAdmin() {
  const [agentPartners, setAgentPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [formData, setFormData] = useState({
    invitee_host_link: '',
    invitee_agent_link: ''
  });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    loadAgentPartners();
  }, []);

  const loadAgentPartners = async () => {
    const result = await getAllAgentPartners();
    if (result.success) {
      setAgentPartners(result.data);
    } else {
      console.error('Error loading agent partners:', result.error);
    }
    setLoading(false);
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleApprove = async (agentPartnerId) => {
    const result = await updateAgentPartner(agentPartnerId, {
      status: true,
      approved_date: new Date().toISOString(),
      approved_by: null // Would need to get current admin user ID
    });

    if (result.success) {
      showAlert('Agent partner approved successfully');
      loadAgentPartners();
    } else {
      showAlert('Error approving agent partner: ' + result.error, 'error');
    }
  };

  const handleReject = async (agentPartnerId) => {
    const result = await updateAgentPartner(agentPartnerId, {
      status: false,
      approved_date: null,
      approved_by: null
    });

    if (result.success) {
      showAlert('Agent partner rejected');
      loadAgentPartners();
    } else {
      showAlert('Error rejecting agent partner: ' + result.error, 'error');
    }
  };

  const handleEdit = (agentPartner) => {
    setEditingPartner(agentPartner);
    setFormData({
      invitee_host_link: agentPartner.invitee_host_link || '',
      invitee_agent_link: agentPartner.invitee_agent_link || ''
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingPartner) return;

    const result = await updateAgentPartner(editingPartner.id, formData);

    if (result.success) {
      showAlert('Agent partner updated successfully');
      loadAgentPartners();
      setDialogOpen(false);
      setEditingPartner(null);
    } else {
      showAlert('Error updating agent partner: ' + result.error, 'error');
    }
  };

  const handleDelete = async (agentPartnerId) => {
    if (window.confirm('Are you sure you want to delete this agent-partner relationship?')) {
      const result = await deleteAgentPartner(agentPartnerId);
      if (result.success) {
        showAlert('Agent partner relationship deleted successfully');
        loadAgentPartners();
      } else {
        showAlert('Error deleting agent partner: ' + result.error, 'error');
      }
    }
  };

  if (loading) {
    return <Typography>Loading agent partners...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1">
          Agent-Partner Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage agent applications to partners and approval status
        </Typography>
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
              <TableCell>Agent</TableCell>
              <TableCell>Partner</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Applied Date</TableCell>
              <TableCell>Approved Date</TableCell>
              <TableCell>Host Link</TableCell>
              <TableCell>Agent Link</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agentPartners.map((agentPartner) => (
              <TableRow key={agentPartner.id}>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {agentPartner.agents?.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {agentPartner.agents?.email}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {agentPartner.partners?.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={agentPartner.status ? 'Approved' : 'Pending'}
                    color={agentPartner.status ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(agentPartner.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {agentPartner.approved_date
                    ? new Date(agentPartner.approved_date).toLocaleDateString()
                    : 'N/A'
                  }
                </TableCell>
                <TableCell>
                  {agentPartner.invitee_host_link ? (
                    <Button
                      size="small"
                      href={agentPartner.invitee_host_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </Button>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  {agentPartner.invitee_agent_link ? (
                    <Button
                      size="small"
                      href={agentPartner.invitee_agent_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </Button>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  {!agentPartner.status && (
                    <IconButton
                      onClick={() => handleApprove(agentPartner.id)}
                      color="success"
                      title="Approve"
                      size="small"
                    >
                      <ApproveIcon />
                    </IconButton>
                  )}
                  {agentPartner.status && (
                    <IconButton
                      onClick={() => handleReject(agentPartner.id)}
                      color="warning"
                      title="Reject"
                      size="small"
                    >
                      <RejectIcon />
                    </IconButton>
                  )}
                  <IconButton
                    onClick={() => handleEdit(agentPartner)}
                    color="primary"
                    title="Edit Links"
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(agentPartner.id)}
                    color="error"
                    title="Delete"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {agentPartners.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No agent-partner relationships found.
          </Typography>
        </Box>
      )}

      {/* Edit Links Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit Invite Links for {editingPartner?.agents?.name} - {editingPartner?.partners?.name}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Host Invite Link"
                value={formData.invitee_host_link}
                onChange={(e) => setFormData(prev => ({ ...prev, invitee_host_link: e.target.value }))}
                variant="outlined"
                placeholder="https://..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Agent Invite Link"
                value={formData.invitee_agent_link}
                onChange={(e) => setFormData(prev => ({ ...prev, invitee_agent_link: e.target.value }))}
                variant="outlined"
                placeholder="https://..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save Links
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}