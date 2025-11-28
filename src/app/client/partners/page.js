'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar
} from '@mui/material';
import {
  Business as PartnersIcon,
  CheckCircle as ApprovedIcon,
  Pending as PendingIcon,
  Add as JoinIcon,
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Image as ImageIcon
} from '@mui/icons-material';
import ClientLayout from '../../../components/client/ClientLayout';
import {
  getCurrentAgent,
  getPartners,
  getAgentPartners,
  createAgentPartner,
  uploadFileToStorage
} from '../../../lib/supabase';
import Image from 'next/image';

export default function ClientPartnersPage() {
  const router = useRouter();
  const [agent, setAgent] = useState(null);
  const [partners, setPartners] = useState([]);
  const [agentPartners, setAgentPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [joinReason, setJoinReason] = useState('');
  const [applicationImages, setApplicationImages] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const agentResult = await getCurrentAgent();
      if (agentResult.success) {
        setAgent(agentResult.data);

        // Load all partners
        const partnersResult = await getPartners();
        if (partnersResult.success) {
          setPartners(partnersResult.data);
        }

        // Load agent's partner relationships
        const agentPartnersResult = await getAgentPartners(agentResult.data.id);
        if (agentPartnersResult.success) {
          setAgentPartners(agentPartnersResult.data);
        }
      } else {
        router.push('/login');
      }
      setLoading(false);
    };
    loadData();
  }, [router]);

  const showAlert = (message, severity = 'success') => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleJoinPartner = (partner) => {
    setSelectedPartner(partner);
    setJoinReason('');
    setApplicationImages([]);
    setJoinDialogOpen(true);
  };

  const handleImageUpload = async (files) => {
    if (files.length === 0) return;

    setUploadingImages(true);
    const uploadedUrls = [];

    for (const file of files) {
      const result = await uploadFileToStorage(file, 'agent-applications');
      if (result.success) {
        uploadedUrls.push(result.url);
      } else {
        showAlert('Error uploading image: ' + result.error, 'error');
      }
    }

    setApplicationImages(prev => [...prev, ...uploadedUrls]);
    setUploadingImages(false);
  };

  const removeImage = (index) => {
    setApplicationImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleConfirmJoin = async () => {
    if (!selectedPartner || !agent) return;

    const result = await createAgentPartner({
      agent_id: agent.id,
      partner_id: selectedPartner.id,
      status: false, // Pending approval
      application_images: applicationImages
    });

    if (result.success) {
      showAlert('Join request submitted successfully! Waiting for approval.');
      setJoinDialogOpen(false);
      setSelectedPartner(null);
      setJoinReason('');
      setApplicationImages([]);

      // Refresh agent partners
      const agentPartnersResult = await getAgentPartners(agent.id);
      if (agentPartnersResult.success) {
        setAgentPartners(agentPartnersResult.data);
      }
    } else {
      showAlert('Failed to join partner: ' + result.error, 'error');
    }
  };

  const getPartnerStatus = (partnerId) => {
    const agentPartner = agentPartners.find(ap => ap.partner_id === partnerId);
    return agentPartner || null;
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
          Partners
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Join partners to access exclusive resources and opportunities
        </Typography>

        {alert && (
          <Alert severity={alert.severity} sx={{ mb: 3 }}>
            {alert.message}
          </Alert>
        )}

        <Grid container spacing={3}>
          {partners.map((partner) => {
            const agentPartner = getPartnerStatus(partner.id);

            return (
              <Grid item xs={12} md={6} lg={4} key={partner.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {partner.photo && (
                    <CardMedia sx={{ height: 200, position: 'relative' }}>
                      <Image
                        src={partner.photo}
                        alt={partner.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </CardMedia>
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" component="h2">
                        {partner.name}
                      </Typography>
                      {agentPartner && (
                        <Chip
                          label={agentPartner.status ? 'Approved' : 'Pending'}
                          color={agentPartner.status ? 'success' : 'warning'}
                          size="small"
                          icon={agentPartner.status ? <ApprovedIcon /> : <PendingIcon />}
                        />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {partner.description}
                    </Typography>

                    {agentPartner ? (
                      agentPartner.status ? (
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {agentPartner.invitee_host_link && (
                            <Button
                              size="small"
                              variant="contained"
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
                      ) : (
                        <Typography variant="body2" color="warning.main">
                          Waiting for approval
                        </Typography>
                      )
                    ) : (
                      <Button
                        variant="contained"
                        startIcon={<JoinIcon />}
                        onClick={() => handleJoinPartner(partner)}
                        fullWidth
                      >
                        Join Partner
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {partners.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <PartnersIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No partners available at the moment.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Join Partner Dialog */}
      <Dialog open={joinDialogOpen} onClose={() => setJoinDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Join {selectedPartner?.name}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Your join request will be reviewed by administrators. Please upload supporting documents/images and provide details about your application.
          </Typography>

          {/* Image Upload Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Supporting Documents/Images *
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Upload images of your qualifications, experience, or other relevant documents
            </Typography>

            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadIcon />}
              disabled={uploadingImages}
              sx={{ mb: 2 }}
            >
              {uploadingImages ? 'Uploading...' : 'Upload Images'}
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={(e) => handleImageUpload(Array.from(e.target.files))}
              />
            </Button>

            {applicationImages.length > 0 && (
              <ImageList cols={3} rowHeight={100} sx={{ mb: 2 }}>
                {applicationImages.map((image, index) => (
                  <ImageListItem key={index}>
                    <Image
                      src={image}
                      alt={`Application image ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <ImageListItemBar
                      actionIcon={
                        <IconButton
                          onClick={() => removeImage(index)}
                          sx={{ color: 'white' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </Box>

          <TextField
            fullWidth
            label="Additional Information (Optional)"
            multiline
            rows={3}
            value={joinReason}
            onChange={(e) => setJoinReason(e.target.value)}
            variant="outlined"
            placeholder="Tell us about your experience, qualifications, or why you want to join..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setJoinDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirmJoin} variant="contained">
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </ClientLayout>
  );
}