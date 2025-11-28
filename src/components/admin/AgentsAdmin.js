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
  Alert,
  Collapse,
  Button,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Business as PartnerIcon,
  CheckCircle as ApprovedIcon,
  Pending as PendingIcon
} from '@mui/icons-material';
import { getAgents, updateAgent, deleteAgent, getAgentPartners, updateAgentPartner } from '../../lib/supabase';
import Image from 'next/image';

export default function AgentsAdmin() {
  const [agents, setAgents] = useState([]);
  const [agentPartners, setAgentPartners] = useState({});
  const [expandedRows, setExpandedRows] = useState({});
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    const result = await getAgents();
    if (result.success) {
      setAgents(result.data);

      // Load partner data for each agent
      const partnersData = {};
      for (const agent of result.data) {
        const partnerResult = await getAgentPartners(agent.id);
        if (partnerResult.success) {
          partnersData[agent.id] = partnerResult.data;
        }
      }
      setAgentPartners(partnersData);
    } else {
      console.error('Error loading agents:', result.error);
    }
    setLoading(false);
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleToggleStatus = async (agentId, currentStatus) => {
    const result = await updateAgent(agentId, { is_active: !currentStatus });
    if (result.success) {
      showAlert(`Agent ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      loadAgents();
    } else {
      showAlert('Error updating agent status: ' + result.error, 'error');
    }
  };

  const handleDelete = async (agentId) => {
    if (window.confirm('Are you sure you want to delete this agent? This action cannot be undone.')) {
      const result = await deleteAgent(agentId);
      if (result.success) {
        showAlert('Agent deleted successfully');
        loadAgents();
      } else {
        showAlert('Error deleting agent: ' + result.error, 'error');
      }
    }
  };

  const toggleRowExpansion = (agentId) => {
    setExpandedRows(prev => ({
      ...prev,
      [agentId]: !prev[agentId]
    }));
  };

  const handleApprovePartner = async (agentPartnerId) => {
    const result = await updateAgentPartner(agentPartnerId, {
      status: true,
      approved_date: new Date().toISOString(),
      approved_by: null // Would need current admin user ID
    });

    if (result.success) {
      showAlert('Partner request approved successfully');
      loadAgents(); // Reload to get updated data
    } else {
      showAlert('Error approving partner request: ' + result.error, 'error');
    }
  };

  const handleRejectPartner = async (agentPartnerId) => {
    const result = await updateAgentPartner(agentPartnerId, {
      status: false,
      approved_date: null,
      approved_by: null
    });

    if (result.success) {
      showAlert('Partner request rejected');
      loadAgents(); // Reload to get updated data
    } else {
      showAlert('Error rejecting partner request: ' + result.error, 'error');
    }
  };

  if (loading) {
    return <Typography>Loading agents...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1">
          Agents Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage registered agents and their account status
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
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Registered</TableCell>
              <TableCell>Partner Requests</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agents.map((agent) => {
              const agentPartnerData = agentPartners[agent.id] || [];
              const hasPartners = agentPartnerData.length > 0;

              return (
                <>
                  <TableRow key={agent.id}>
                    <TableCell>
                      {hasPartners && (
                        <IconButton
                          onClick={() => toggleRowExpansion(agent.id)}
                          size="small"
                        >
                          {expandedRows[agent.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell>{agent.name}</TableCell>
                    <TableCell>{agent.username}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.phone_number || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip
                        label={agent.is_active ? 'Active' : 'Inactive'}
                        color={agent.is_active ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(agent.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${agentPartnerData.length} requests`}
                        color={agentPartnerData.length > 0 ? 'primary' : 'default'}
                        size="small"
                        variant={agentPartnerData.length > 0 ? 'filled' : 'outlined'}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleToggleStatus(agent.id, agent.is_active)}
                        color={agent.is_active ? 'error' : 'success'}
                        title={agent.is_active ? 'Deactivate' : 'Activate'}
                        size="small"
                      >
                        {agent.is_active ? <InactiveIcon /> : <ActiveIcon />}
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(agent.id)}
                        color="error"
                        title="Delete Agent"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>

                  {/* Expandable Partner Details Row */}
                  {hasPartners && (
                    <TableRow>
                      <TableCell colSpan={9} sx={{ py: 0 }}>
                        <Collapse in={expandedRows[agent.id]} timeout="auto" unmountOnExit>
                          <Box sx={{ py: 2, px: 3, bgcolor: 'grey.50' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                              Partner Requests for {agent.name}
                            </Typography>
                            <Grid container spacing={2}>
                              {agentPartnerData.map((agentPartner) => (
                                <Grid item xs={12} md={6} key={agentPartner.id}>
                                  <Card variant="outlined">
                                    <CardContent sx={{ pb: 2 }}>
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                          <PartnerIcon color="primary" />
                                          <Typography variant="h6">
                                            {agentPartner.partners?.name}
                                          </Typography>
                                        </Box>
                                        <Chip
                                          label={agentPartner.status ? 'Approved' : 'Pending'}
                                          color={agentPartner.status ? 'success' : 'warning'}
                                          size="small"
                                        />
                                      </Box>

                                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Applied: {new Date(agentPartner.created_at).toLocaleDateString()}
                                      </Typography>

                                      {agentPartner.status && agentPartner.approved_date && (
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                          Approved: {new Date(agentPartner.approved_date).toLocaleDateString()}
                                        </Typography>
                                      )}

                                      {agentPartner.status && (
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                                          {agentPartner.invitee_host_link && (
                                            <Button
                                              size="small"
                                              variant="outlined"
                                              href={agentPartner.invitee_host_link}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              Host Link
                                            </Button>
                                          )}
                                          {agentPartner.invitee_agent_link && (
                                            <Button
                                              size="small"
                                              variant="outlined"
                                              href={agentPartner.invitee_agent_link}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              Agent Link
                                            </Button>
                                          )}
                                        </Box>
                                      )}

                                      {/* Application Images */}
                                      {agentPartner.application_images && agentPartner.application_images.length > 0 && (
                                        <Box sx={{ mb: 2 }}>
                                          <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>
                                            Application Images ({agentPartner.application_images.length}):
                                          </Typography>
                                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                            {agentPartner.application_images.map((image, imgIndex) => (
                                              <Box
                                                key={imgIndex}
                                                sx={{
                                                  width: 80,
                                                  height: 80,
                                                  borderRadius: 1,
                                                  overflow: 'hidden',
                                                  border: '1px solid',
                                                  borderColor: 'divider',
                                                  cursor: 'pointer',
                                                  '&:hover': {
                                                    borderColor: 'primary.main',
                                                    boxShadow: 1
                                                  }
                                                }}
                                                onClick={() => window.open(image, '_blank')}
                                                title="Click to view full size"
                                              >
                                                <Image
                                                  src={image}
                                                  alt={`Application image ${imgIndex + 1}`}
                                                  width={80}
                                                  height={80}
                                                  style={{ objectFit: 'cover' }}
                                                />
                                              </Box>
                                            ))}
                                          </Box>
                                        </Box>
                                      )}

                                      <Box sx={{ display: 'flex', gap: 1 }}>
                                        {!agentPartner.status ? (
                                          <Button
                                            size="small"
                                            variant="contained"
                                            color="success"
                                            onClick={() => handleApprovePartner(agentPartner.id)}
                                          >
                                            Approve
                                          </Button>
                                        ) : (
                                          <Button
                                            size="small"
                                            variant="outlined"
                                            color="warning"
                                            onClick={() => handleRejectPartner(agentPartner.id)}
                                          >
                                            Reject
                                          </Button>
                                        )}
                                      </Box>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {agents.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No agents registered yet.
          </Typography>
        </Box>
      )}
    </Box>
  );
}