import { Box } from '@mui/material';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';
import BenefitsSection from '../components/BenefitsSection';
import PlatformsSection from '../components/PlatformsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';
import HomePageContent from '../components/HomePageContent';
import { getContent, incrementVisitCount } from '../lib/supabase';

// SEO Metadata
export const metadata = {
  title: 'Skuids - Livestream & Earn | Join the Top Streaming Agency',
  description: 'Join Skuids and start earning through livestreaming. Partner with top platforms, grow your audience, and monetize your content with our complete support system.',
  keywords: ['livestreaming', 'earn money', 'content creator', 'streaming agency', 'social media monetization'],
  authors: [{ name: 'Skuids' }],
  openGraph: {
    title: 'Skuids - Livestream & Earn | Join the Top Streaming Agency',
    description: 'Join Skuids and start earning through livestreaming. Partner with top platforms, grow your audience, and monetize your content.',
    url: 'https://skuids.live',
    siteName: 'Skuids',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Skuids - Livestream & Earn',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skuids - Livestream & Earn',
    description: 'Join Skuids and start earning through livestreaming.',
    images: ['/og-image.jpg'],
  },
};

export default async function Home() {
  const result = await getContent();
  const content = result.success ? result.data : null;

  // Increment visit count server-side
  try {
    await incrementVisitCount('landing');
  } catch (error) {
    console.error('Failed to track visit:', error);
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Skuids',
            url: 'https://skuids.live',
            logo: 'https://skuids.live/logo.png',
            description: 'The premier livestreaming agency helping creators earn through multiple platforms',
            sameAs: [
              'https://facebook.com/skuids',
              'https://instagram.com/skuids',
              'https://twitter.com/skuids',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              email: content?.contact?.email || 'support@skuids.live',
            },
          }),
        }}
      />

      <HomePageContent content={content} />
    </>
  );
}
