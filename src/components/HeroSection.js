"use client";

import { useEffect, useState } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useTranslation } from '../utils/i18n';
import Link from 'next/link';

export default function HeroSection({ heroData }) {
  const theme = useTheme();
  const { t } = useTranslation();

  console.log('HeroSection received heroData:', heroData);
  console.log('Background video URL:', heroData?.backgroundVideo);

  // Test video URL accessibility
  useEffect(() => {
    if (heroData?.backgroundVideo) {
      fetch(heroData.backgroundVideo, { method: 'HEAD' })
        .then(response => {
          console.log('Video URL accessible:', response.ok, response.status);
        })
        .catch(error => {
          console.error('Video URL not accessible:', error);
        });
    }
  }, [heroData?.backgroundVideo]);

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        backgroundColor: 'secondary.main',
        overflow: 'hidden',
      }}
    >
      {/* Left section - Hero text */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 8 },
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              mb: { xs: 2, md: 3 },
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
              background: `linear-gradient(135deg, ${theme.palette.common.white} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(132, 220, 0, 0.3)',
              textAlign: 'center',
            }}
          >
            {heroData?.title || t('hero.title')}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Typography
            variant="h5"
            component="p"
            sx={{
              mb: { xs: 4, md: 6 },
              color: alpha(theme.palette.common.white, 0.9),
              fontWeight: 400,
              textAlign: 'center',
              maxWidth: '500px',
            }}
          >
            {heroData?.subtitle || t('hero.subtitle')}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, justifyContent: 'center', flexWrap: 'wrap' }}>
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
                background: `linear-gradient(135deg, ${theme.palette.tertiary.main} 0%, ${theme.palette.tertiary.light} 100%)`,
                boxShadow: '0 8px 25px rgba(132, 220, 0, 0.3)',
                minWidth: { xs: '160px', md: '200px' },
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.tertiary.light} 0%, ${theme.palette.tertiary.main} 100%)`,
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 35px rgba(132, 220, 0, 0.4)',
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
                borderColor: theme.palette.tertiary.main,
                color: theme.palette.tertiary.main,
                borderWidth: '2px',
                px: { xs: 4, md: 6 },
                py: { xs: 2, md: 2.5 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 600,
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
                background: 'transparent',
                minWidth: { xs: '160px', md: '200px' },
                '&:hover': {
                  borderColor: theme.palette.tertiary.dark,
                  color: theme.palette.tertiary.dark,
                  background: alpha(theme.palette.tertiary.main, 0.1),
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 25px rgba(132, 220, 0, 0.2)',
                },
              }}
            >
              {heroData?.secondButtonText || t('hero.learnMore')}
            </Button>
          </Box>
        </motion.div>

        {/* Floating background icons */}
        {[
          { src: '/icon1.png', delay: 0, x: [0, 200, -100], y: [0, -150, 120], top: '10%', left: '20%', size: 80 },
          { src: '/icon2.png', delay: 1, x: [0, -240, 160], y: [0, 200, -80], top: '30%', left: '70%', size: 40 },
          { src: '/icon1.png', delay: 2, x: [0, 300, -140], y: [0, -120, 180], top: '50%', left: '10%', size: 60 },
          { src: '/icon2.png', delay: 0.5, x: [0, -180, 220], y: [0, 160, -100], top: '70%', left: '80%', size: 50 },
          { src: '/icon1.png', delay: 1.5, x: [0, 260, -120], y: [0, -140, 200], top: '20%', left: '50%', size: 70 },
          { src: '/icon2.png', delay: 2.5, x: [0, -280, 140], y: [0, 180, -60], top: '60%', left: '30%', size: 45 },
          { src: '/icon1.png', delay: 3, x: [0, 160, -200], y: [0, -100, 140], top: '40%', left: '60%', size: 55 },
          { src: '/icon2.png', delay: 0.8, x: [0, -220, 180], y: [0, 120, -160], top: '80%', left: '15%', size: 65 },
          { src: '/icon1.png', delay: 1.2, x: [0, 240, -80], y: [0, -180, 100], top: '15%', left: '85%', size: 75 },
          { src: '/icon2.png', delay: 2.2, x: [0, -260, 120], y: [0, 140, -120], top: '55%', left: '40%', size: 35 },
          { src: '/icon1.png', delay: 0.3, x: [0, 280, -160], y: [0, -80, 170], top: '35%', left: '5%', size: 90 },
          { src: '/icon2.png', delay: 1.8, x: [0, -200, 240], y: [0, 170, -90], top: '75%', left: '55%', size: 50 },
        ].map((icon, index) => (
          <motion.img
            key={index}
            src={icon.src}
            alt="floating icon"
            style={{
              position: 'absolute',
              width: `${icon.size}px`,
              height: `${icon.size}px`,
              opacity: 0.6,
              zIndex: 1,
              top: icon.top,
              left: icon.left,
            }}
            initial={{ x: icon.x[0], y: icon.y[0] }}
            animate={{
              x: icon.x,
              y: icon.y,
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + index,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: icon.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </Box>

      {/* Right section - Background hero video */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          height: { xs: '60vh', md: '100vh' },
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              // top: 0,
              // left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '20px',
              filter: 'brightness(0.8) contrast(1.1)',
              opacity: 0.9,
            }}
          >
            <source src={heroData?.backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '20px',
              background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.1) 100%)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      </Box>
    </Box>
  );
}
