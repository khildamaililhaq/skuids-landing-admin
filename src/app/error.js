'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Error({ error, reset }) {
  const router = useRouter();
  const t = useTranslations();

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
          {t('errors.oops')}
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
          {t('errors.somethingWentWrong')}
        </Typography>
        <Typography sx={{ mb: 4, color: 'text.secondary' }}>
          {error?.message || t('errors.unexpectedError')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => router.push('/')}
          >
            {t('errors.goHome')}
          </Button>
          <Button
            variant="outlined"
            onClick={reset}
          >
            {t('errors.tryAgain')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
