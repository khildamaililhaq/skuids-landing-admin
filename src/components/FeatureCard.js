'use client';

import { Box, Card, CardContent, Typography, useTheme as useMuiTheme } from '@mui/material';

export default function FeatureCard({ icon, title, description, number }) {
  const theme = useMuiTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.mode === 'dark' ? '#1a1a1a' : '#f5f5f5'} 100%)`,
        border: `2px solid ${theme.palette.primary.main}40`,
        borderRadius: 3,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 12px 24px ${theme.palette.primary.main}40`,
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
        {number && (
          <Typography
            variant="h2"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              mb: 1,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            {number}
          </Typography>
        )}
        {icon && (
          <Typography
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 2,
            }}
          >
            {icon}
          </Typography>
        )}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            mb: 1.5,
            color: theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
