'use client';

import { Box, Typography, Container, Grid, Card, CardContent, useTheme as useMuiTheme } from '@mui/material';
import { useTheme } from '../../components/ThemeProvider';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getContent, incrementVisitCount } from '../../lib/supabase';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const { palette } = useMuiTheme();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      const result = await getContent();
      if (result.success) {
        setContent(result.data);
      }
      await incrementVisitCount('about');
    };
    fetchContent();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 2, md: 4 },
          background: `linear-gradient(135deg, ${palette.primary.main}20 0%, ${palette.secondary.main}20 100%)`,
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
              background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            About Skuids
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: palette.text.secondary,
              mb: 4,
              lineHeight: 1.8,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Connecting talented creators with top livestreaming platforms globally
          </Typography>
        </Container>
      </Box>

      {/* Story Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    mb: 3,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Our Story
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: palette.text.secondary,
                    mb: 3,
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                  }}
                >
                  Skuids was founded with a simple vision: to democratize livestream entertainment and create genuine income opportunities for talented creators worldwide.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: palette.text.secondary,
                    mb: 3,
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                  }}
                >
                  We recognized that many talented individuals wanted to build careers in livestreaming but lacked the connections, tools, and support to succeed. We set out to bridge that gap.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: palette.text.secondary,
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                  }}
                >
                  Today, Skuids is proud to support hundreds of successful hosts and agents earning real money while building thriving communities on leading livestreaming platforms.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${palette.primary.main}20 0%, ${palette.secondary.main}20 100%)`,
                  borderRadius: 3,
                  p: 4,
                  textAlign: 'center',
                  minHeight: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h4" sx={{ color: palette.text.secondary }}>
                  [Placeholder for company image/video]
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission & Values */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 4 },
          background: `linear-gradient(135deg, ${palette.background.default}80 0%, ${palette.primary.main}15 100%)`,
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
                background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Our Mission & Values
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                icon: '🎯',
                title: 'Our Mission',
                description:
                  'To democratize livestream entertainment earnings, making it accessible to anyone with talent and dedication.',
              },
              {
                icon: '🤝',
                title: 'Integrity',
                description:
                  'Fair commissions, timely payouts, and transparent communication are core to everything we do.',
              },
              {
                icon: '💪',
                title: 'Empowerment',
                description:
                  'We provide tools, support, and opportunities for our members to build successful streaming careers.',
              },
              {
                icon: '🌟',
                title: 'Innovation',
                description:
                  'We continuously evolve with new features, tools, and opportunities for our community.',
              },
            ].map((item, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Card
                  sx={{
                    height: '100%',
                    background: `linear-gradient(135deg, ${palette.background.paper} 0%, ${palette.mode === 'dark' ? '#1a1a1a' : '#f5f5f5'} 100%)`,
                    border: `2px solid ${palette.primary.main}40`,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 24px ${palette.primary.main}40`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography sx={{ fontSize: '2.5rem', mb: 2 }}>
                      {item.icon}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.8 }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* By The Numbers */}
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
                background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              By The Numbers
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              { number: '500+', label: 'Active Members', icon: '👥' },
              { number: '$2M+', label: 'Total Earnings Paid Out', icon: '💰' },
              { number: '2', label: 'Partner Platforms', icon: '🌐' },
              { number: '24/7', label: 'Support Available', icon: '🤝' },
            ].map((stat, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    border: `2px solid ${palette.primary.main}40`,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${palette.background.paper} 0%, ${palette.mode === 'dark' ? '#1a1a1a' : '#f5f5f5'} 100%)`,
                  }}
                >
                  <Typography sx={{ fontSize: '3rem', mb: 2 }}>
                    {stat.icon}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      color: palette.primary.main,
                      mb: 1,
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography sx={{ color: palette.text.secondary }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer contactData={content?.contact} />
    </Box>
  );
}