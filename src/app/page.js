'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeProvider';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CampaignSection from '../components/CampaignSection';
import AnimatedSpacer from '../components/AnimatedSpacer';
import ProductsFeaturesSection from '../components/ProductsFeaturesSection';
import Footer from '../components/Footer';
import { getContent, incrementVisitCount } from '../lib/supabase';

export default function Home() {
  const { updateTheme } = useTheme();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const updateThemeRef = useRef(updateTheme);

  useEffect(() => {
    updateThemeRef.current = updateTheme;
  }, [updateTheme]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const result = await getContent();
        if (result.success) {
          setContent(result.data);
          
          // Apply theme from content if available
          if (result.data.theme) {
            updateThemeRef.current({
              mode: result.data.theme.mode || 'light',
              primaryColor: result.data.theme.primaryColor || '#005F73',
              secondaryColor: result.data.theme.secondaryColor || '#FFE347',
              warningColor: result.data.theme.warningColor || '#FF90AD',
              backgroundDefault: result.data.theme.backgroundDefault || '#F5F5F5',
              backgroundPaper: result.data.theme.backgroundPaper || '#FFFFFF',
            });
          }
        } else {
          console.error('Failed to fetch content:', result.error);
        }
      } catch (error) {
        console.error('Failed to fetch content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Increment visit count on page load
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await incrementVisitCount('landing');
      } catch (error) {
        console.error('Failed to track visit:', error);
      }
    };

    trackVisit();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4">Memuat...</Typography>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ minHeight: '100vh', backgroundColor: 'secondary.main', paddingTop: '80px' }}>
        {/* Header with Logo */}
        <Header />

        {/* Page Sections */}
        <HeroSection heroData={content?.hero} />
        {/* <ProductsFeaturesSection features={content?.features} /> */}
        {/* <CampaignSection campaigns={content?.hero?.campaigns} /> */}

        {/* Footer */}
        <Footer contactData={content?.contact} />
      </Box>
    </motion.div>
  );
}
