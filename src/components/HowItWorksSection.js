'use client';

import { Box, Container, Typography, Grid, useTheme as useMuiTheme, Stack, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses } from '@mui/material';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';

const QontoConnector = () => {
  const theme = useMuiTheme();
  return (
    <StepConnector
      sx={{
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
          top: 20,
          left: `calc(-50% + 16px)`,
          right: `calc(50% + 16px)`,
        },
        [`&.${stepConnectorClasses.active}`]: {
          [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.primary.main,
            borderWidth: 3,
          },
        },
        [`& .${stepConnectorClasses.line}`]: {
          borderColor: theme.palette.neutral?.[80] || '#ddd',
          borderTopWidth: 3,
          borderRadius: 1,
          transition: 'all 0.3s ease',
        },
      }}
    />
  );
};

export default function HowItWorksSection({ howItWorksData }) {
  const theme = useMuiTheme();

  if (!howItWorksData || !howItWorksData.steps) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, sm: 10, md: 14 },
        px: { xs: 2, sm: 3, md: 4 },
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.main}08 100%)`,
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
                {howItWorksData.title || 'How It Works'}
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
                  fontWeight: 500,
                }}
              >
                {howItWorksData.description || 'Simple steps to get started and begin earning'}
              </Typography>
            </motion.div>
          </Stack>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ width: '100%' }}
        >
          <Grid container spacing={{ xs: 3, sm: 4, md: 5 }}>
            {howItWorksData.steps.map((step, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div variants={itemVariants} style={{ height: '100%' }}>
                  <FeatureCard
                    number={step.number || index + 1}
                    title={step.title}
                    description={step.description}
                    isStepCard={true}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Process Timeline - Desktop Only */}
        {howItWorksData.steps && howItWorksData.steps.length > 0 && (
          <Box
            sx={{
              mt: { xs: 8, md: 10 },
              display: { xs: 'none', md: 'block' },
              px: 2,
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Stepper
                activeStep={howItWorksData.steps.length - 1}
                connector={<QontoConnector />}
                sx={{
                  '& .MuiStepLabel-root': {
                    cursor: 'default',
                  },
                }}
              >
                {howItWorksData.steps.map((step, index) => (
                  <Step key={index}>
                    <StepLabel
                      sx={{
                        '& .MuiStepIcon-root': {
                          width: 40,
                          height: 40,
                          fontSize: '1.5rem',
                          color: theme.palette.neutral?.[80] || '#ddd',
                          transition: 'all 0.3s ease',
                        },
                        '& .MuiStepIcon-root.Mui-active': {
                          color: theme.palette.primary.main,
                          boxShadow: `0 0 0 8px ${theme.palette.primary.main}20`,
                        },
                        '& .MuiStepIcon-root.Mui-completed': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  </Step>
                ))}
              </Stepper>
            </motion.div>
          </Box>
        )}
      </Container>
    </Box>
  );
}
