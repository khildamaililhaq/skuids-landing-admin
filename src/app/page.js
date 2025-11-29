'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../components/ThemeProvider';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';
import BenefitsSection from '../components/BenefitsSection';
import PlatformsSection from '../components/PlatformsSection';
import TestimonialsSection from '../components/TestimonialsSection';
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
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'secondary.main' }} suppressHydrationWarning>
      {/* Header with Logo */}
      <Header />

      {/* Hero Section */}
      <HeroSection heroData={content?.hero} /> 

      {/* How It Works */}
      <HowItWorksSection howItWorksData={content?.howItWorks} />

      {/* Agent Benefits */}
      <BenefitsSection 
        title="For Agents"
        description="Build your team and grow your income with our powerful tools and support"
        benefits={content?.agentBenefits}
        backgroundColor="transparent"
      />

      {/* Host Benefits */}
      <BenefitsSection 
        title="For Hosts"
        description="Start earning immediately with flexible earning opportunities"
        benefits={content?.hostBenefits}
        backgroundColor="transparent"
      />

      {/* Platforms Section */}
      <PlatformsSection 
        platforms={content?.platforms}
        title="Stream & Earn on Top Platforms"
      />

      {/* Testimonials */}
      <TestimonialsSection 
        testimonials={content?.testimonials}
        title="Success Stories from Our Community"
      />

      {/* Footer */}
      <Footer contactData={content?.contact} />
    </Box>
  );
}
