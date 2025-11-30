'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Error({ error, reset }) {
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>
          Oops!
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
          Something went wrong
        </Typography>
        <Typography sx={{ mb: 4, color: 'text.secondary' }}>
          {error?.message || 'An unexpected error occurred'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => router.push('/')}
          >
            Go Home
          </Button>
          <Button
            variant="outlined"
            onClick={reset}
          >
            Try Again
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
