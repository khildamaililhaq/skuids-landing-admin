'use client';

import { Box, Container, Typography, Grid } from '@mui/material';
import FeatureCard from './FeatureCard';
import { useTheme } from './ThemeProvider';

export default function BenefitsSection({ title, description, benefits, backgroundColor = 'transparent' }) {
  const theme = useTheme();

  if (!benefits || benefits.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        backgroundColor: backgroundColor,
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
            {title}
          </Typography>
          {description && (
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 600,
                mx: 'auto',
                mb: 4,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>

        <Grid container spacing={4}>
          {benefits.map((benefit) => (
            <Grid item xs={12} sm={6} md={3} key={benefit.id}>
              <FeatureCard
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
