'use client';

import { Box, Container, Typography, Grid, Card, CardContent, Chip, useTheme as useMuiTheme, Stack, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { TrendingUp } from '@mui/icons-material';

export default function PlatformsSection({ platforms, title = 'Supported Platforms' }) {
  const theme = useMuiTheme();

  if (!platforms || platforms.length === 0) {
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
          <Grid container spacing={{ xs: 3, sm: 4, md: 4 }}>
            {platforms.map((platform, index) => (
              <Grid item xs={12} md={6} key={platform.id || index}>
                <motion.div variants={itemVariants} style={{ height: '100%' }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                      borderRadius: '16px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                        border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, md: 4 }, flexGrow: 1 }}>
                      <Stack spacing={3} sx={{ height: '100%' }}>
                        {/* Platform Header */}
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          spacing={2}
                        >
                          <Stack spacing={1} sx={{ flex: 1 }}>
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
                          <TrendingUp
                            sx={{
                              color: theme.palette.primary.main,
                              fontSize: '2rem',
                              opacity: 0.2,
                            }}
                          />
                        </Stack>

                        {/* Description */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary,
                            lineHeight: 1.8,
                            fontSize: { xs: '0.95rem', md: '1rem' },
                          }}
                        >
                          {platform.description}
                        </Typography>

                        {/* Key Features */}
                        <Stack spacing={2}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 700,
                              color: theme.palette.text.primary,
                              fontSize: { xs: '0.9rem', md: '1rem' },
                            }}
                          >
                            Key Features:
                          </Typography>

                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                            {platform.features && platform.features.length > 0
                              ? platform.features.map((feature, idx) => (
                                  <Chip
                                    key={idx}
                                    label={feature}
                                    size="small"
                                    sx={{
                                      bgcolor: `${theme.palette.primary.main}15`,
                                      color: theme.palette.primary.main,
                                      fontWeight: 600,
                                      fontSize: '0.8rem',
                                      height: 'auto',
                                      padding: '8px 4px',
                                      transition: 'all 0.2s ease',
                                      '&:hover': {
                                        bgcolor: `${theme.palette.primary.main}25`,
                                        transform: 'scale(1.05)',
                                      },
                                    }}
                                  />
                                ))
                              : null}
                          </Box>
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
