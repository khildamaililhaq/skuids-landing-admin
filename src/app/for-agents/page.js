'use client';

import { Box, Typography, Container, Button, Grid, useTheme as useMuiTheme } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BenefitsSection from '../../components/BenefitsSection';
import HowItWorksSection from '../../components/HowItWorksSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import { getContent } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ForAgentsPage() {
  const theme = useMuiTheme();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      const result = await getContent();
      if (result.success) {
        setContent(result.data);
      }
    };
    fetchContent();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh' }} suppressHydrationWarning>
      <Header />

      {/* Hero Section for Agents */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 2, md: 4 },
          background: `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, ${theme.palette.secondary.main}20 100%)`,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              fontSize: { xs: '2rem', md: '3.5rem' },
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Grow Your Team & Earn Big
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              mb: 4,
              lineHeight: 1.8,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Become a Skuids Agent and build a network of hosts. Earn competitive commissions from their earnings, access professional marketing tools, and receive dedicated support.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              href="/register"
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                bgcolor: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
            >
              Register as Agent
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
              }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Agent Benefits */}
      <BenefitsSection
        title="Why Become a Skuids Agent?"
        description="We provide everything you need to succeed"
        benefits={content?.agentBenefits}
      />

      {/* How It Works for Agents */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Agent Journey
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 600,
                mx: 'auto',
                mb: 4,
              }}
            >
              The path to building a successful agent business with Skuids
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                step: '1',
                title: 'Complete Your Profile',
                description: 'Set up your agent profile and get verified by our team. Add your experience and target market.',
              },
              {
                step: '2',
                title: 'Access Marketing Tools',
                description: 'Get instant access to professional marketing materials, recruitment templates, and tracking dashboards.',
              },
              {
                step: '3',
                title: 'Recruit Hosts',
                description: 'Start recruiting talented hosts using our marketing tools. We provide training and support.',
              },
              {
                step: '4',
                title: 'Earn Commissions',
                description: 'Earn competitive commissions from your hosts\' earnings on supported platforms like Chamet and Poppo.',
              },
            ].map((item, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Box
                  sx={{
                    p: 4,
                    border: `2px solid ${theme.palette.primary.main}40`,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.mode === 'dark' ? '#1a1a1a' : '#f5f5f5'} 100%)`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '2.5rem',
                      fontWeight: 'bold',
                      color: theme.palette.primary.main,
                      mb: 1,
                    }}
                  >
                    {item.step}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials from Agents */}
      <TestimonialsSection
        testimonials={content?.testimonials?.filter(t => t.role === 'Agent')}
        title="Meet Our Top Agents"
      />

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 4 },
          textAlign: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Ready to Start Your Agent Journey?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              fontSize: '1.1rem',
              opacity: 0.95,
            }}
          >
            Join hundreds of successful agents already earning with Skuids
          </Typography>
          <Button
            component={Link}
            href="/register"
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              bgcolor: 'white',
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#FFFCF5',
              },
            }}
          >
            Register Now
          </Button>
        </Container>
      </Box>

      <Footer contactData={content?.contact} />
    </Box>
  );
}
