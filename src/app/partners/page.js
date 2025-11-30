'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../components/ThemeProvider';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getContent, incrementVisitCount, getPartners } from '../../lib/supabase';
import Image from 'next/image';
import Link from 'next/link';

export default function PartnersPage() {
  const { updateTheme } = useTheme();
  const [content, setContent] = useState(null);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const updateThemeRef = useRef(updateTheme);

  useEffect(() => {
    updateThemeRef.current = updateTheme;
  }, [updateTheme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch content
        const contentResult = await getContent();
        if (contentResult.success) {
          setContent(contentResult.data);

          // Apply theme from content if available
          if (contentResult.data.theme) {
            updateThemeRef.current({
              mode: contentResult.data.theme.mode || 'light',
              primaryColor: contentResult.data.theme.primaryColor || '#CFAA0A',
              secondaryColor: contentResult.data.theme.secondaryColor || '#8E7629',
              warningColor: contentResult.data.theme.warningColor || '#B3261E',
              backgroundDefault: contentResult.data.theme.backgroundDefault || '#FFFCF5',
              backgroundPaper: contentResult.data.theme.backgroundPaper || '#FFFFFF',
            });
          }
        } else {
          console.error('Failed to fetch content:', contentResult.error);
        }

        // Fetch partners
        const partnersResult = await getPartners();
        if (partnersResult.success) {
          setPartners(partnersResult.data);
        } else {
          console.error('Failed to fetch partners:', partnersResult.error);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Increment visit count on page load
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await incrementVisitCount('partners');
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

        {/* Partners Section */}
        <Box sx={{ py: 8, px: 2 }}>
          <Typography variant="h2" align="center" gutterBottom>
            Our Partners
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Meet our official partners
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Interested in becoming an agent? <Link href="/register" style={{ color: 'primary.main', textDecoration: 'none' }}>Register here</Link> or <Link href="/login" style={{ color: 'primary.main', textDecoration: 'none' }}>Login</Link> to access your client area.
          </Typography>

          {partners.length > 0 ? (
            <Grid container spacing={4} justifyContent="center">
              {partners.map((partner) => (
                <Grid item xs={12} sm={6} md={4} key={partner.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {partner.photo && (
                      <CardMedia sx={{ height: 200, position: 'relative' }}>
                        <Image
                          src={partner.photo}
                          alt={partner.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </CardMedia>
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {partner.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {partner.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {partner.agent_join_link && (
                          <Button
                            variant="outlined"
                            size="small"
                            href={partner.agent_join_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Join as Agent
                          </Button>
                        )}
                        {partner.hosts_join_link && (
                          <Button
                            variant="contained"
                            size="small"
                            href={partner.hosts_join_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Join as Host
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h6" align="center" color="text.secondary">
              No partners available at the moment.
            </Typography>
          )}
        </Box>

        {/* Footer */}
        <Footer contactData={content?.contact} />
      </Box>
    </motion.div>
  );
}