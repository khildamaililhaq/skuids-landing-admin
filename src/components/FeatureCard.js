'use client';

import { Box, Card, CardContent, Typography, useTheme as useMuiTheme, alpha, Stack } from '@mui/material';

export default function FeatureCard({ icon, title, description, number, isStepCard = false }) {
  const theme = useMuiTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
        border: `2px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        borderRadius: '16px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
          border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: { xs: 3, md: 4 } }}>
        <Stack spacing={2} sx={{ height: '100%', justifyContent: 'center' }}>
          {/* Step Number or Icon */}
          {number && (
            <Box
              sx={{
                width: isStepCard ? 60 : 70,
                height: isStepCard ? 60 : 70,
                margin: '0 auto',
                borderRadius: isStepCard ? '12px' : '50%',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.primary.contrastText,
                  fontWeight: 800,
                  fontSize: { xs: '1.75rem', md: '2rem' },
                }}
              >
                {number}
              </Typography>
            </Box>
          )}

          {icon && !number && (
            <Typography
              sx={{
                fontSize: { xs: '2.5rem', md: '3rem' },
                mb: 1,
              }}
            >
              {icon}
            </Typography>
          )}

          {/* Title */}
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              lineHeight: 1.7,
              fontSize: { xs: '0.95rem', md: '1rem' },
            }}
          >
            {description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
