'use client';

import { Container, Typography, Box } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LocationsMap from '../../components/LocationsMap';

export default function LocationsPage() {
  return (
    <>
      <Header />
      <Box sx={{ minHeight: '100vh', bgcolor: '#FFFCF5' }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}>
            Lokasi Kami
          </Typography>
          <LocationsMap />
        </Container>
      </Box>
      <Footer />
    </>
  );
}