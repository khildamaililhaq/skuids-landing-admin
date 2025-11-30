"use client";

import { Box, Typography, Button, Container, Grid, Stack } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection({ heroData }) {
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <Box
      id="hero"
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: '90vh', sm: '95vh', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
        backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 50%, ${alpha(theme.palette.tertiary.main, 0.15)} 0%, transparent 50%),
                       radial-gradient(circle at 80% 80%, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 50%)`,
          zIndex: 1,
          pointerEvents: 'none',
        },
      }}
    >
      {/* Background Video/Image */}
      {heroData?.backgroundVideo && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.3)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`,
              zIndex: 1,
            },
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroData?.videoPoster}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          >
            <source src={heroData.backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      )}

      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 6, sm: 8, md: 12 },
          px: { xs: 2, sm: 3, md: 4 },
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left side - Text Content */}
          <Grid item xs={12} md={6}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ width: '100%' }}
            >
              <Stack spacing={{ xs: 3, sm: 4, md: 5 }}>
                {/* Main Headline */}
                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      fontSize: {
                        xs: 'clamp(2rem, 8vw, 3.5rem)',
                        sm: 'clamp(2.5rem, 8vw, 3.5rem)',
                        md: '4rem',
                      },
                      fontWeight: 800,
                      color: theme.palette.common.white,
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {heroData?.title || 'Stream Your Way to Success'}
                  </Typography>
                </motion.div>

                {/* Subheadline */}
                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h5"
                    component="p"
                    sx={{
                      fontSize: {
                        xs: 'clamp(1rem, 4vw, 1.375rem)',
                        md: '1.5rem',
                      },
                      color: alpha(theme.palette.common.white, 0.95),
                      fontWeight: 500,
                      lineHeight: 1.6,
                      maxWidth: '95%',
                    }}
                  >
                    {heroData?.subtitle || 'Join thousands of creators earning real income through livestreaming'}
                  </Typography>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 2, sm: 2.5 }}
                    sx={{ pt: { xs: 2, md: 3 } }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      component={heroData?.buttonUrl ? Link : 'button'}
                      href={heroData?.buttonUrl || '#'}
                      sx={{
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.75, sm: 2 },
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        fontWeight: 700,
                        borderRadius: '12px',
                        backgroundColor: theme.palette.tertiary.main,
                        color: theme.palette.tertiary.contrastText,
                        boxShadow: `0 8px 24px ${alpha(theme.palette.tertiary.main, 0.4)}`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          backgroundColor: theme.palette.tertiary.dark,
                          boxShadow: `0 12px 32px ${alpha(theme.palette.tertiary.main, 0.6)}`,
                          transform: 'translateY(-2px)',
                        },
                        '&:active': {
                          transform: 'translateY(0)',
                        },
                      }}
                    >
                      {heroData?.buttonText || 'Get Started'}
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      component={heroData?.secondButtonUrl ? Link : 'button'}
                      href={heroData?.secondButtonUrl || '#'}
                      sx={{
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.75, sm: 2 },
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        fontWeight: 700,
                        borderRadius: '12px',
                        borderColor: theme.palette.common.white,
                        color: theme.palette.common.white,
                        borderWidth: '2px',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          borderColor: theme.palette.tertiary.light,
                          backgroundColor: alpha(theme.palette.tertiary.main, 0.15),
                          color: theme.palette.tertiary.light,
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      {heroData?.secondButtonText || 'Learn More'}
                    </Button>
                  </Stack>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div variants={itemVariants}>
                  <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: alpha(theme.palette.common.white, 0.8),
                        fontSize: '0.95rem',
                      }}
                    >
                      ✓ 10,000+ Active Creators
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: alpha(theme.palette.common.white, 0.8),
                        fontSize: '0.95rem',
                      }}
                    >
                      ✓ $50M+ Earned
                    </Typography>
                  </Stack>
                </motion.div>
              </Stack>
            </motion.div>
          </Grid>

          {/* Right side - Visual Element */}
          {heroData?.backgroundVideo && (
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <motion.div
                variants={itemVariants}
                style={{
                  width: '100%',
                  maxWidth: '480px',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.4)}`,
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    >
                      <source src={heroData.backgroundVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Scroll Indicator */}
      <Box
        component={motion.div}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        sx={{
          position: 'absolute',
          bottom: { xs: 20, md: 30 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: alpha(theme.palette.common.white, 0.7),
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          Scroll to explore
        </Typography>
        <Box
          sx={{
            width: '24px',
            height: '36px',
            border: `2px solid ${alpha(theme.palette.common.white, 0.5)}`,
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            p: '8px',
          }}
        >
          <Box
            sx={{
              width: '3px',
              height: '8px',
              backgroundColor: alpha(theme.palette.common.white, 0.7),
              borderRadius: '1.5px',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
