'use client';

import { Box, Container, Typography, Grid, Card, CardContent, Avatar, useTheme as useMuiTheme } from '@mui/material';

export default function TestimonialsSection({ testimonials, title = 'Success Stories' }) {
  const theme = useMuiTheme();

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
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
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={4} key={testimonial.id}>
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
                    boxShadow: `0 12px 24px ${theme.palette.primary.main}40`,
                    borderColor: theme.palette.primary.main,
                  },
                  p: 3,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        mr: 2,
                        bgcolor: theme.palette.primary.main,
                      }}
                    >
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      fontStyle: 'italic',
                      color: theme.palette.text.secondary,
                      mb: 3,
                      lineHeight: 1.8,
                    }}
                  >
                    "{testimonial.quote}"
                  </Typography>

                  <Typography
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                    }}
                  >
                    {testimonial.earnings}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
