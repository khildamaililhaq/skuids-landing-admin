'use client';

import { Box, Typography, Container, Button, Grid, Card, CardContent } from '@mui/material';
import { useTheme } from '../../components/ThemeProvider';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PlatformsSection from '../../components/PlatformsSection';
import { getContent } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PlatformsPage() {
  const theme = useTheme();
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
    <Box sx={{ minHeight: '100vh' }}>
      <Header />

      {/* Hero Section */}
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
            Livestream on Top Platforms
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
            Skuids partners with leading livestreaming platforms to bring you the best opportunities and highest earning potential.
          </Typography>
        </Container>
      </Box>

      {/* Platforms Overview */}
      <PlatformsSection platforms={content?.platforms} title="Our Partner Platforms" />

      {/* Comparison Section */}
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
              Platform Comparison
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
              Choose one or stream on all platforms to maximize your earnings
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Comparison Headers */}
            <Grid item xs={12} md={3}>
              <Box sx={{ fontWeight: 'bold', mb: 2 }}>Feature</Box>
            </Grid>
            {content?.platforms?.map((platform) => (
              <Grid item xs={12} md={9 / content.platforms.length} key={platform.id}>
                <Box sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                  {platform.name}
                </Box>
              </Grid>
            ))}

            {/* Comparison Rows */}
            {[
              { feature: 'Gift Conversion Rate', values: ['High (75-85%)', 'Medium-High (70-80%)'] },
              { feature: 'Daily Missions', values: ['Yes, $50-500+', 'Yes, $50-500+'] },
              { feature: 'Geographic Focus', values: ['Southeast Asia', 'Global'] },
              { feature: 'User Base', values: ['Millions Daily', 'Growing Worldwide'] },
              { feature: 'Streaming Quality', values: ['HD (720p-1080p)', 'Full HD 1080p+'] },
              { feature: 'Support Availability', values: ['24/7', '24/7'] },
            ].map((row, idx) => (
              <Box key={idx} sx={{ display: 'contents' }}>
                <Grid item xs={12} md={3}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      py: 2,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    {row.feature}
                  </Typography>
                </Grid>
                {row.values.map((value, vIdx) => (
                  <Grid item xs={12} md={9 / content?.platforms?.length} key={vIdx}>
                    <Typography
                      sx={{
                        py: 2,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        textAlign: 'center',
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {value}
                    </Typography>
                  </Grid>
                ))}
              </Box>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why Multi-Platform */}
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
              Benefits of Multi-Platform Streaming
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                icon: '📈',
                title: 'Maximize Earnings',
                description: 'Stream on multiple platforms simultaneously to multiply your earning potential and reach different audiences.',
              },
              {
                icon: '🌍',
                title: 'Global Reach',
                description: 'Access viewers from different regions. Chamet focuses on Asia while Poppo has a worldwide audience.',
              },
              {
                icon: '💪',
                title: 'Grow Faster',
                description: 'Build larger audiences across platforms. More viewers mean more gifts, missions, and opportunities.',
              },
              {
                icon: '🔄',
                title: 'Reduce Risk',
                description: 'Diversify your income across platforms. Platform changes won\'t affect your total earnings as much.',
              },
            ].map((item, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Card
                  sx={{
                    h: '100%',
                    background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.mode === 'dark' ? '#1a1a1a' : '#f5f5f5'} 100%)`,
                    border: `2px solid ${theme.palette.primary.main}40`,
                    borderRadius: 3,
                    p: 3,
                  }}
                >
                  <CardContent>
                    <Typography sx={{ fontSize: '2.5rem', mb: 2 }}>
                      {item.icon}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
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
            Ready to Start Streaming?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              fontSize: '1.1rem',
              opacity: 0.95,
            }}
          >
            Choose your platform or stream on all of them. Skuids supports you every step of the way.
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
                bgcolor: 'white',
                color: theme.palette.primary.main,
                fontWeight: 'bold',
              }}
            >
              Get Started
            </Button>
            <Button
              component={Link}
              href="/for-hosts"
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderColor: 'white',
                color: 'white',
              }}
            >
              Learn More About Hosting
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer contactData={content?.contact} />
    </Box>
  );
}
