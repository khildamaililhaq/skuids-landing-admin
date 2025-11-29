import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Alert,
  Snackbar,
  CircularProgress,
  Button,
  Tabs,
  Tab
} from '@mui/material';
import { getContent, updateContent } from '../../lib/supabase';
import LogoEditor from './LogoEditor';
import HeroEditor from './HeroEditor';
import ProductsFeaturesEditor from './ProductsFeaturesEditor';
import AboutEditor from './AboutEditor';
import ContactEditor from './ContactEditor';
import HowItWorksEditor from './HowItWorksEditor';
import BenefitsEditor from './BenefitsEditor';
import PlatformsEditor from './PlatformsEditor';
import TestimonialsEditor from './TestimonialsEditor';

export default function LandingPageProperties() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [uploadNotice, setUploadNotice] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const result = await getContent();
      if (result.success) {
        setContent(result.data);
      } else {
        setError('Failed to fetch content: ' + result.error);
      }
    } catch (error) {
      setError('Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      const result = await updateContent(content);
      if (result.success) {
        setSuccess(true);
      } else {
        setError('Failed to save content: ' + result.error);
      }
    } catch (error) {
      setError('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Box textAlign="center">
          <CircularProgress size={60} sx={{ color: 'primary.main', mb: 3 }} />
          <Typography variant="h6" color="text.secondary">
            Loading content...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
            Landing Page Content
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Edit all sections of your landing page in one place
          </Typography>
        </Box>
        <Button
          onClick={saveContent}
          disabled={saving}
          variant="contained"
          sx={{ 
            bgcolor: 'primary.main',
            minWidth: 160,
            py: 1.5,
            fontWeight: 600,
            fontSize: '1rem'
          }}
        >
          {saving ? 'Saving...' : '💾 Save Changes'}
        </Button>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.default'
          }}
        >
          <Tab label="Hero" />
          <Tab label="How It Works" />
          <Tab label="Agent Benefits" />
          <Tab label="Host Benefits" />
          <Tab label="Platforms" />
          <Tab label="Testimonials" />
          <Tab label="Features" />
          <Tab label="About & Contact" />
          <Tab label="Branding" />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Hero Tab */}
          {activeTab === 0 && (
            <Box>
              <HeroEditor
                content={content}
                setContent={setContent}
                onError={setError}
                onUploadNotice={setUploadNotice}
              />
            </Box>
          )}

          {/* How It Works Tab */}
          {activeTab === 1 && (
            <HowItWorksEditor 
              data={content?.howItWorks}
              onChange={(data) => setContent({ ...content, howItWorks: data })}
            />
          )}

          {/* Agent Benefits Tab */}
          {activeTab === 2 && (
            <BenefitsEditor 
              data={content?.agentBenefits}
              title="Agent Benefits"
              onChange={(data) => setContent({ ...content, agentBenefits: data })}
            />
          )}

          {/* Host Benefits Tab */}
          {activeTab === 3 && (
            <BenefitsEditor 
              data={content?.hostBenefits}
              title="Host Benefits"
              onChange={(data) => setContent({ ...content, hostBenefits: data })}
            />
          )}

          {/* Platforms Tab */}
          {activeTab === 4 && (
            <PlatformsEditor 
              data={content?.platforms}
              onChange={(data) => setContent({ ...content, platforms: data })}
            />
          )}

          {/* Testimonials Tab */}
          {activeTab === 5 && (
            <TestimonialsEditor 
              data={content?.testimonials}
              onChange={(data) => setContent({ ...content, testimonials: data })}
            />
          )}

          {/* Features Tab */}
          {activeTab === 6 && (
            <ProductsFeaturesEditor 
              content={content} 
              setContent={setContent} 
              onError={setError} 
              onUploadNotice={setUploadNotice} 
            />
          )}

          {/* About & Contact Tab */}
          {activeTab === 7 && (
            <Box>
              <AboutEditor 
                content={content} 
                setContent={setContent} 
              />
              <Box sx={{ mt: 4 }}>
                <ContactEditor 
                  content={content} 
                  setContent={setContent} 
                />
              </Box>
            </Box>
          )}

          {/* Branding Tab */}
          {activeTab === 8 && (
            <LogoEditor
              content={content}
              setContent={setContent}
              onError={setError}
              onUploadNotice={setUploadNotice}
            />
          )}
        </Box>
      </Paper>

      {/* Notifications */}
      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          ✅ Content saved successfully! Your changes are now live.
        </Alert>
      </Snackbar>

      <Snackbar open={!!error} autoHideDuration={5000} onClose={() => setError('')}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={!!uploadNotice} autoHideDuration={3000} onClose={() => setUploadNotice('')}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {uploadNotice}
        </Alert>
      </Snackbar>
    </Container>
  );
}
