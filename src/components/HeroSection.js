"use client";

import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection({ heroData }) {
  const theme = useTheme();
  const t = useTranslations();

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'secondary.main',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        },
      }}
    >
      {/* Background Video */}
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

      <Container maxWidth={false} sx={{ py: 8, px: { xs: 2, md: 4 }, position: 'relative', zIndex: 2 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left side - Text Content */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box sx={{ maxWidth: '600px' }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            mb: { xs: 3, md: 4 },
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
            fontWeight: 700,
            color: 'common.white',
            lineHeight: 1.2,
          }}
        >
          {heroData?.title || t('hero.title')}
        </Typography>

        <Typography
          variant="h5"
          component="p"
          sx={{
            mb: { xs: 4, md: 6 },
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
            color: alpha(theme.palette.common.white, 0.9),
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          {heroData?.subtitle || t('hero.subtitle')}
        </Typography>

        <Box sx={{
          display: 'flex',
          gap: { xs: 2, md: 3 },
          justifyContent: { xs: 'center', md: 'flex-start' },
          flexWrap: 'wrap'
        }}>
          <Button
            variant="contained"
            size="large"
            component={heroData?.buttonUrl ? Link : 'button'}
            href={heroData?.buttonUrl || '#'}
            sx={{
              px: { xs: 4, md: 6 },
              py: { xs: 2, md: 2.5 },
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 600,
              borderRadius: '50px',
              backgroundColor: 'tertiary.main',
              minWidth: { xs: '160px', md: '200px' },
              '&:hover': {
                backgroundColor: 'tertiary.dark',
              },
            }}
          >
            {heroData?.buttonText || t('hero.cta')}
          </Button>

          <Button
            variant="outlined"
            size="large"
            component={heroData?.secondButtonUrl ? Link : 'button'}
            href={heroData?.secondButtonUrl || '#'}
            sx={{
              borderColor: 'tertiary.main',
              color: 'tertiary.main',
              borderWidth: '2px',
              px: { xs: 4, md: 6 },
              py: { xs: 2, md: 2.5 },
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 600,
              borderRadius: '50px',
              minWidth: { xs: '160px', md: '200px' },
              '&:hover': {
                borderColor: 'tertiary.dark',
                color: 'tertiary.dark',
                backgroundColor: alpha(theme.palette.tertiary.main, 0.1),
              },
            }}
          >
            {heroData?.secondButtonText || t('hero.learnMore')}
          </Button>
        </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Right side - Video/Image Banner (Optional) */}
          {heroData?.backgroundVideo && (
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ width: '100%', maxWidth: '500px' }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.3)}`,
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
    </Box>
  );
}
