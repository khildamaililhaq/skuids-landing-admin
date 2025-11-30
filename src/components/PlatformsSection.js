'use client';

import { Box, Container, Typography, Grid, Card, CardContent, Chip, useTheme as useMuiTheme } from '@mui/material';

export default function PlatformsSection({ platforms, title = 'Supported Platforms' }) {
  const theme = useMuiTheme();

  if (!platforms || platforms.length === 0) {
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
            {title}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {platforms.map((platform) => (
            <Grid item xs={12} md={6} key={platform.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.mode === 'dark' ? '#1a1a1a' : '#f5f5f5'} 100%)`,
                  border: `2px solid ${theme.palette.primary.main}40`,
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 24px ${theme.palette.primary.main}40`,
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      color: theme.palette.primary.main,
                    }}
                  >
                    {platform.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 3,
                      lineHeight: 1.8,
                    }}
                  >
                    {platform.description}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Key Features:
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {platform.features.map((feature, idx) => (
                      <Chip
                        key={idx}
                        label={feature}
                        size="small"
                        sx={{
                          bgcolor: `${theme.palette.primary.main}20`,
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                          '&:hover': {
                            bgcolor: `${theme.palette.primary.main}40`,
                          },
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
