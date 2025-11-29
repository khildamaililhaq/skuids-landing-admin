'use client';

import { Box, Container, Typography, Grid } from '@mui/material';
import FeatureCard from './FeatureCard';
import { useTheme } from './ThemeProvider';

export default function HowItWorksSection({ howItWorksData }) {
  const theme = useTheme();

  if (!howItWorksData || !howItWorksData.steps) {
    return null;
  }

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        background: `linear-gradient(135deg, ${theme.palette.background.default}80 0%, ${theme.palette.primary.main}15 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {howItWorksData.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 600,
              mx: 'auto',
              mb: 4,
            }}
          >
            {howItWorksData.description}
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 4 }}>
          {howItWorksData.steps.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard
                number={step.number}
                title={step.title}
                description={step.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
