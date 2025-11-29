'use client';

import { Box, Typography, Container, Button, Grid, useTheme as useMuiTheme } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BenefitsSection from '../../components/BenefitsSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import { getContent } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ForHostsPage() {
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

      {/* Hero Section for Hosts */}
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
            Earn Money While Streaming
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
            Start your livestream career with Skuids. Earn from viewer gifts, daily missions, and bonuses. Work flexibly on your own schedule.
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
              Start as Host
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

      {/* Host Benefits */}
      <BenefitsSection
        title="Why Stream with Skuids?"
        description="Multiple ways to earn and grow your audience"
        benefits={content?.hostBenefits}
      />

      {/* How Hosts Earn */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 4 },
          background: `linear-gradient(135deg, ${theme.palette.background.default}80 0%, ${theme.palette.primary.main}15 100%)`,
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
              Multiple Income Streams
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
              Maximize your earnings with diverse monetization options
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                icon: '🎁',
                title: 'Viewer Gifts',
                description: 'Receive virtual gifts from viewers during your streams. Each gift has real monetary value that you can cash out.',
                earning: 'Variable based on viewers',
              },
              {
                icon: '📋',
                title: 'Daily Missions',
                description: 'Complete daily missions set by platforms. Easy tasks that give you reliable daily income on top of gift earnings.',
                earning: '$50-500+ per day',
              },
              {
                icon: '🏆',
                title: 'Bonus Challenges',
                description: 'Participate in special challenges and tournaments. Win bonuses and special rewards for achieving milestones.',
                earning: '$100-2000+',
              },
              {
                icon: '⭐',
                title: 'Audience Building',
                description: 'Grow your followers and get rewarded. Higher follower counts unlock premium features and higher earning rates.',
                earning: 'Tier-based rewards',
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
                  <Typography sx={{ fontSize: '2.5rem', mb: 2 }}>
                    {item.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                    {item.description}
                  </Typography>
                  <Typography sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                    {item.earning}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials from Hosts */}
      <TestimonialsSection
        testimonials={content?.testimonials?.filter(t => t.role === 'Host')}
        title="Hear from Our Top Hosts"
      />

      {/* Getting Started */}
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
              Get Started in 3 Steps
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                step: '1',
                title: 'Register',
                description: 'Create your Skuids account and complete your profile. Verification takes less than 24 hours.',
              },
              {
                step: '2',
                title: 'Choose Platform',
                description: 'Select which livestreaming platform to join. You can stream on multiple platforms for more earnings.',
              },
              {
                step: '3',
                title: 'Start Streaming',
                description: 'Launch your first stream and start earning! Our support team is here if you need help.',
              },
            ].map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Box
                  sx={{
                    textAlign: 'center',
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
                      mb: 2,
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
            Start Earning Today
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              fontSize: '1.1rem',
              opacity: 0.95,
            }}
          >
            Join thousands of hosts already making money with Skuids
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
                bgcolor: '#f0f0f0',
              },
            }}
          >
            Register as Host
          </Button>
        </Container>
      </Box>

      <Footer contactData={content?.contact} />
    </Box>
  );
}
