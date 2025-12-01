'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Alert
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as ProfileIcon,
  Business as PartnersIcon,
  CheckCircle as ApprovedIcon,
  Pending as PendingIcon
} from '@mui/icons-material';
import ClientLayout from '../../components/client/ClientLayout';
import { getCurrentAgent, getAgentPartners, supabase } from '../../lib/supabase';

export default function ClientPage() {
  const router = useRouter();
  const [agent, setAgent] = useState(null);
  const [agentPartners, setAgentPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // First verify user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      
      // Check user role - reject only if explicitly admin or other invalid role
      const userRole = user.user_metadata?.role;
      if (userRole === 'admin') {
        router.push('/admin');
        return;
      }
      
      if (userRole && userRole !== 'agent') {
        // Invalid role
        router.push('/login');
        return;
      }

      const agentResult = await getCurrentAgent();
      if (agentResult.success) {
        setAgent(agentResult.data);
        // Load agent partners
        const partnersResult = await getAgentPartners(agentResult.data.id);
        if (partnersResult.success) {
          setAgentPartners(partnersResult.data);
        }
      } else {
        router.push('/login');
      }
      setLoading(false);
    };
    loadData();
  }, [router]);

  if (loading) {
    return (
      <ClientLayout agent={null}>
        <Typography>Loading...</Typography>
      </ClientLayout>
    );
  }

  if (!agent) {
    return null; // Will redirect
  }

  const approvedPartners = agentPartners.filter(ap => ap.status);
  const pendingPartners = agentPartners.filter(ap => !ap.status);

  return (
    <ClientLayout agent={agent}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {agent.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Here's an overview of your agent dashboard
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <PartnersIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" color="primary.main">
                  {agentPartners.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Partners
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <ApprovedIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                <Typography variant="h4" color="success.main">
                  {approvedPartners.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Approved Partners
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <PendingIcon sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                <Typography variant="h4" color="warning.main">
                  {pendingPartners.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending Approval
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Partners */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Your Partners
          </Typography>

          {agentPartners.length > 0 ? (
            <Grid container spacing={2}>
              {agentPartners.slice(0, 6).map((agentPartner) => (
                <Grid item xs={12} md={6} key={agentPartner.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6">
                          {agentPartner.partners?.name}
                        </Typography>
                        <Chip
                          label={agentPartner.status ? 'Approved' : 'Pending'}
                          color={agentPartner.status ? 'success' : 'warning'}
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {agentPartner.partners?.description}
                      </Typography>
                      {agentPartner.status && (
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="info">
              You haven't joined any partners yet. Visit the Partners page to get started.
            </Alert>
          )}

          {agentPartners.length > 6 && (
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button variant="outlined" onClick={() => router.push('/client/partners')}>
                View All Partners
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </ClientLayout>
  );
}