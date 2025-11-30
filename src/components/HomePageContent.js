'use client';

import { Box } from '@mui/material';
import Header from './Header';
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';
import BenefitsSection from './BenefitsSection';
import PlatformsSection from './PlatformsSection';
import TestimonialsSection from './TestimonialsSection';
import Footer from './Footer';

export default function HomePageContent({ content }) {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
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
