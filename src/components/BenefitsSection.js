'use client';

import { Box, Container, Typography, Grid, useTheme as useMuiTheme, Stack, Card, CardContent, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';

export default function BenefitsSection({ title, description, benefits, backgroundColor = 'transparent' }) {
  const theme = useMuiTheme();

  if (!benefits || benefits.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        backgroundColor: backgroundColor,
        background: backgroundColor === 'transparent' 
          ? undefined 
          : `linear-gradient(135deg, ${backgroundColor}00 0%, ${theme.palette.primary.main}05 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)}, transparent)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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

            {description && (
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.secondary,
                    maxWidth: 700,
                    mx: 'auto',
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    lineHeight: 1.6,
                    fontWeight: 500,
                  }}
                >
                  {description}
                </Typography>
              </motion.div>
            )}
          </Stack>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ width: '100%' }}
        >
          <Grid container spacing={{ xs: 3, sm: 4, md: 4 }}>
            {benefits.map((benefit, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={benefit.id || index}
              >
                <motion.div variants={itemVariants} style={{ height: '100%' }}>
                  <FeatureCard
                    icon={benefit.icon}
                    title={benefit.title}
                    description={benefit.description}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Enhanced Benefits List - Optional secondary section */}
        {benefits.length > 0 && (
          <Box sx={{ mt: { xs: 12, md: 16 } }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Grid container spacing={{ xs: 3, md: 4 }}>
                {benefits.slice(0, Math.min(3, benefits.length)).map((benefit, index) => (
                  <Grid item xs={12} md={4} key={`detail-${benefit.id || index}`}>
                    <Stack
                      spacing={2}
                      sx={{
                        p: { xs: 3, md: 4 },
                        borderRadius: '16px',
                        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                          boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.primary.main,
                          fontSize: { xs: '1.1rem', md: '1.25rem' },
                        }}
                      >
                        ✓ {benefit.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          lineHeight: 1.7,
                          fontSize: { xs: '0.95rem', md: '1rem' },
                        }}
                      >
                        {benefit.description}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Box>
        )}
      </Container>
    </Box>
  );
}
