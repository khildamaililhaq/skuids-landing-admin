'use client';

import { Box, Container, Typography, Grid, Card, CardContent, Chip, Button, useTheme as useMuiTheme, Stack, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { TrendingUp } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { getPartners } from '@/lib/supabase';

export default function PlatformsSection({ title = 'Supported Platforms' }) {
  const theme = useMuiTheme();
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const result = await getPartners();
        if (result.success && result.data) {
          setPlatforms(result.data);
        }
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading || !platforms || platforms.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, sm: 10, md: 14 },
        px: { xs: 2, sm: 3, md: 4 },
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.main}08 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ width: '100%' }}
        >
          <Stack spacing={3} sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: 'clamp(1.75rem, 6vw, 3rem)', md: '3rem' },
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.01em',
                }}
              >
                {title}
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  maxWidth: 700,
                  mx: 'auto',
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.6,
                }}
              >
                Expand your reach and maximize earnings across all major streaming platforms
              </Typography>
            </motion.div>
          </Stack>
        </motion.div>

        {/* Platforms Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ width: '100%' }}
        >
          <Grid container spacing={{ xs: 3, sm: 4, md: 4 }} sx={{ justifyContent: 'center' }}>
            {platforms.map((platform, index) => (
              <Grid item xs={12} md={6} key={platform.id || index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <motion.div variants={itemVariants} style={{ height: '100%', width: '100%', maxWidth: 400, display: 'flex', justifyContent: 'center' }}>
                  <Card
                    sx={{
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                        border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                      },
                    }}
                  >
                    {/* Partner Image */}
                    {platform.photo && (
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          height: 200,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          component="img"
                          src={platform.photo}
                          alt={platform.name}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.05)',
                            },
                          }}
                        />
                      </Box>
                    )}

                    <CardContent sx={{ p: { xs: 3, md: 4 }, flexGrow: 1 }}>
                      <Stack spacing={3} sx={{ height: '100%' }}>
                        {/* Platform Header with Logo */}
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          spacing={2}
                        >
                          <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                            {platform.logo_url && (
                              <Box
                                component="img"
                                src={platform.logo_url}
                                alt={platform.name}
                                sx={{
                                  width: 48,
                                  height: 48,
                                  objectFit: 'contain',
                                  borderRadius: 1,
                                }}
                              />
                            )}
                            <Typography
                              variant="h5"
                              sx={{
                                fontWeight: 700,
                                color: theme.palette.primary.main,
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                              }}
                            >
                              {platform.name}
                            </Typography>
                          </Stack>
                          {platform.status && (
                            <Chip
                              label={platform.status}
                              size="small"
                              sx={{
                                bgcolor: platform.status === 'active' 
                                  ? `${theme.palette.success.main}20` 
                                  : `${theme.palette.grey[500]}20`,
                                color: platform.status === 'active' 
                                  ? theme.palette.success.main 
                                  : theme.palette.grey[600],
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                textTransform: 'capitalize',
                              }}
                            />
                          )}
                        </Stack>

                        {/* Description */}
                        {/* Description removed */}

                        {/* Website Link */}
                        {platform.website && (
                          <Box sx={{ mt: 'auto' }}>
                            <Typography
                              component="a"
                              href={platform.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                color: theme.palette.primary.main,
                                fontSize: { xs: '0.85rem', md: '0.9rem' },
                                fontWeight: 600,
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 0.5,
                                '&:hover': {
                                  textDecoration: 'underline',
                                },
                              }}
                            >
                              Visit Website →
                            </Typography>
                          </Box>
                        )}

                        {/* Action Buttons */}
                        <Stack direction="column" spacing={1} sx={{ mt: 'auto' }}>
                          <Button
                            variant="contained"
                            size="small"
                            href={platform.host_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            disabled={!platform.host_link}
                            sx={{
                              fontWeight: 600,
                              fontSize: '0.85rem',
                              textTransform: 'none',
                              backgroundColor: theme.palette.primary.main,
                              '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                              },
                              '&:disabled': {
                                backgroundColor: theme.palette.grey[300],
                                color: theme.palette.grey[500],
                              },
                            }}
                          >
                            Join Host
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            href={platform.agent_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            disabled={!platform.agent_link}
                            sx={{
                              fontWeight: 600,
                              fontSize: '0.85rem',
                              textTransform: 'none',
                              borderColor: theme.palette.primary.main,
                              color: theme.palette.primary.main,
                              '&:hover': {
                                borderColor: theme.palette.primary.dark,
                                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                              },
                              '&:disabled': {
                                borderColor: theme.palette.grey[300],
                                color: theme.palette.grey[500],
                              },
                            }}
                          >
                            Join Agent
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
