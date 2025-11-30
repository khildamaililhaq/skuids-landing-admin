'use client';

import { Box, Container, Typography, Grid, Card, CardContent, Avatar, useTheme as useMuiTheme, Stack, Rating, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { FormatQuote } from '@mui/icons-material';

export default function TestimonialsSection({ testimonials, title = 'Success Stories' }) {
  const theme = useMuiTheme();

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, sm: 10, md: 14 },
        px: { xs: 2, sm: 3, md: 4 },
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.04)} 0%, ${alpha(theme.palette.secondary.main, 0.04)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ width: '100%' }}
        >
          <Stack spacing={3} sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: 'clamp(1.75rem, 6vw, 3rem)', md: '3rem' },
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.01em',
                }}
              >
                {title}
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  maxWidth: 700,
                  mx: 'auto',
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.6,
                }}
              >
                Hear from our thriving community of successful streamers and content creators
              </Typography>
            </motion.div>
          </Stack>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ width: '100%' }}
        >
          <Grid container spacing={{ xs: 3, sm: 4, md: 4 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} md={4} key={testimonial.id || index}>
                <motion.div variants={itemVariants} style={{ height: '100%' }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                      borderRadius: '16px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                        border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                      },
                      p: { xs: 2.5, md: 3 },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 0 }}>
                      <Stack spacing={3} sx={{ height: '100%' }}>
                        {/* Quote Icon */}
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            opacity: 0.1,
                          }}
                        >
                          <FormatQuote
                            sx={{
                              fontSize: '3rem',
                              color: theme.palette.primary.main,
                            }}
                          />
                        </Box>

                        {/* Testimonial Text */}
                        <Typography
                          variant="body2"
                          sx={{
                            fontStyle: 'italic',
                            color: theme.palette.text.secondary,
                            lineHeight: 1.8,
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            flex: 1,
                            mb: 2,
                          }}
                        >
                          "{testimonial.quote}"
                        </Typography>

                        {/* Divider */}
                        <Box
                          sx={{
                            height: '1px',
                            background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.3)}, transparent)`,
                          }}
                        />

                        {/* Author Info */}
                        <Stack spacing={2}>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{ pt: 1 }}
                          >
                            <Avatar
                              sx={{
                                width: 56,
                                height: 56,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                                fontWeight: 700,
                                fontSize: '1.5rem',
                              }}
                            >
                              {testimonial.name?.charAt(0) || '?'}
                            </Avatar>
                            <Stack spacing={0.5} sx={{ flex: 1 }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 700,
                                  fontSize: '1rem',
                                  color: theme.palette.text.primary,
                                }}
                              >
                                {testimonial.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: theme.palette.text.secondary,
                                  fontSize: '0.8rem',
                                }}
                              >
                                {testimonial.role}
                              </Typography>
                            </Stack>
                          </Stack>

                          {/* Rating */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Rating
                              value={5}
                              readOnly
                              size="small"
                              sx={{
                                '& .MuiRating-iconFilled': {
                                  color: theme.palette.primary.main,
                                },
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{
                                color: theme.palette.text.secondary,
                                fontSize: '0.8rem',
                              }}
                            >
                              5.0
                            </Typography>
                          </Box>

                          {/* Earnings Highlight */}
                          <Box
                            sx={{
                              p: 1.5,
                              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.tertiary.main, 0.1)} 100%)`,
                              borderRadius: '8px',
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            }}
                          >
                            <Stack spacing={0.5}>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: theme.palette.text.secondary,
                                  fontSize: '0.75rem',
                                  fontWeight: 500,
                                }}
                              >
                                Earnings
                              </Typography>
                              <Typography
                                sx={{
                                  color: theme.palette.primary.main,
                                  fontWeight: 700,
                                  fontSize: '1.25rem',
                                }}
                              >
                                {testimonial.earnings}
                              </Typography>
                            </Stack>
                          </Box>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
