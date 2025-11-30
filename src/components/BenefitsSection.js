'use client';

import { Box, Container, Typography, Grid, useTheme as useMuiTheme, Stack, Card, CardContent, CardMedia, alpha, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp } from '@mui/icons-material';

const BenefitCard = ({ benefit, index, theme }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
        delay: i * 0.1,
      },
    }),
    hover: {
      y: -12,
      boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
    },
  };

  // Generate a dynamic gradient based on index
  const gradients = [
    `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, ${theme.palette.primary.main}05 100%)`,
    `linear-gradient(135deg, ${theme.palette.secondary.main}20 0%, ${theme.palette.secondary.main}05 100%)`,
    `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
    `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.success.main}10 100%)`,
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: '-100px' }}
        style={{ 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
      <Card
        sx={{
          height: 460,
          maxHeight: 460,
          maxWidth: 360,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '20px',
          overflow: 'hidden',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          background: gradient,
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          '@media (max-width: 900px)': {
            height: 'auto',
            // maxWidth: '200px',
            maxHeight: '500px',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover::before': {
            opacity: 1,
          },
        }}
      >
        {/* Image Section with overlay - Fixed height */}
        <Box
          sx={{
            position: 'relative',
            height: 180,
            width: '100%',
            overflow: 'hidden',
            background: gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {benefit.image ? (
            <Box
              component="img"
              src={benefit.image}
              alt={benefit.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
              }}
            />
          ) : (
            <motion.div
              variants={imageVariants}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
              }}
            >
              {benefit.icon && (
                <Box
                  sx={{
                    fontSize: '3.5rem',
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',
                  }}
                >
                  {benefit.icon}
                </Box>
              )}
            </motion.div>
          )}

          {/* Animated background elements */}
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: alpha(theme.palette.primary.main, 0.1),
              animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              '@keyframes pulse': {
                '0%, 100%': { transform: 'scale(1)', opacity: 0.5 },
                '50%': { transform: 'scale(1.1)', opacity: 0.8 },
              },
            }}
          />
        </Box>

        {/* Content Section */}
        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            p: { xs: 2.5, md: 3 },
            pb: { xs: 2.5, md: 3 },
            textAlign: 'center',
            height: 280,
            maxHeight: 280,
            overflow: 'hidden',
            '@media (max-width: 900px)': {
              height: 'auto',
              maxHeight: 'none',
            },
          }}
        >
          {/* Badge */}
          <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'center' }}>
            <Chip
              icon={<CheckCircle sx={{ fontSize: '1.2rem !important' }} />}
              label="Featured"
              size="small"
              sx={{
                background: alpha(theme.palette.primary.main, 0.15),
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: '0.75rem',
                height: 28,
                '& .MuiChip-icon': {
                  color: 'inherit',
                },
              }}
            />
          </Box>

          {/* Title - Fixed lines */}
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.15rem', md: '1.35rem' },
              color: theme.palette.text.primary,
              mb: 1.5,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: '2.6rem',
              maxHeight: '2.6rem',
              flexShrink: 0,
            }}
          >
            {benefit.title}
          </Typography>

          {/* Description - Fixed lines */}
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              lineHeight: 1.6,
              fontSize: { xs: '0.9rem', md: '0.95rem' },
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: '4.8rem',
              maxHeight: '4.8rem',
              flexShrink: 0,
            }}
          >
            {benefit.description}
          </Typography>

          {/* Icon button at bottom - centered */}
          <motion.div
            whileHover={{ x: 0, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              Learn More
              <TrendingUp sx={{ fontSize: '1.2rem' }} />
            </Box>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
    </Box>
  );
};

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
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-20%',
          right: '-5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.06)}, transparent)`,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.05)}, transparent)`,
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
          <Stack spacing={3} sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
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

        {/* Benefits Grid - Modern Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ width: '100%' }}
        >
          <Grid 
            container 
            spacing={{ xs: 3, sm: 3, md: 4 }}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {benefits.map((benefit, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={6} 
                lg={3} 
                key={benefit.id || index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <BenefitCard benefit={benefit} index={index} theme={theme} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
