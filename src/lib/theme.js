// Design tokens and constants for consistent styling
import { createTheme } from '@mui/material/styles';

export const COLORS = {
  primary: {
    main: '#CFAA0A',        // Primary
    light: '#F7D96F',       // Primary Container
    dark: '#8D7200',
    contrastText: '#FFFFFF' // On Primary
  },
  secondary: {
    main: '#8E7629',
    light: '#E0C276',       // Secondary Container
    dark: '#594700',
    contrastText: '#FFFFFF'
  },
  tertiary: {
    main: '#009A98',
    light: '#67D0CE',
    dark: '#004F4C',
    contrastText: '#FFFFFF'
  },
  background: {
    default: '#FFFCF5',
    paper: '#FFFFFF'
  },
  text: {
    primary: '#1A1A15',
    secondary: '#47473F'
  },
  neutral: {
    10: '#1A1A15',
    20: '#2F2F2A',
    30: '#47473F',
    40: '#5F5F56',
    50: '#77776D',
    60: '#909086',
    70: '#AAAA9F',
    80: '#C5C5BA',
    90: '#E2E2D7',
    95: '#F6F6EC',
    99: '#FDFCFA'
  },
  warning: {
    main: '#B3261E',
    light: '#F9DEDC',
    dark: '#B3261E'
  },
  social: {
    facebook: '#1877F2',
    instagram: '#E1306C',
    whatsapp: '#25D366',
    tiktok: '#000000',
    youtube: '#FF0000'
  }
};

export const SPACING = {
  xs: 1,      // 8px
  sm: 1.5,    // 12px
  md: 2,      // 16px
  lg: 3,      // 24px
  xl: 4,      // 32px
  xxl: 6,     // 48px
  xxxl: 8     // 64px
};

export const BORDER_RADIUS = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  round: '50%'
};

export const SHADOWS = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  md: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
  lg: '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)',
  xl: '0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05)',
  glow: '0 0 20px rgba(132, 220, 0, 0.3)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)'
};

export const TRANSITIONS = {
  fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '0.5s cubic-bezier(0.4, 0, 0.2, 1)'
};

export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};

// Common component styles
export const COMPONENT_STYLES = {
  card: {
    borderRadius: BORDER_RADIUS.lg,
    boxShadow: SHADOWS.sm,
    border: '1px solid rgba(0, 95, 115, 0.1)',
    transition: TRANSITIONS.normal,
    '&:hover': {
      boxShadow: SHADOWS.md,
      transform: 'translateY(-2px)'
    }
  },

  button: {
    borderRadius: BORDER_RADIUS.xl,
    fontWeight: 600,
    textTransform: 'none',
    transition: TRANSITIONS.normal
  },

  input: {
    '& .MuiOutlinedInput-root': {
      borderRadius: BORDER_RADIUS.md,
      transition: TRANSITIONS.fast,
      '&:hover fieldset': {
        borderColor: COLORS.primary.main
      },
      '&.Mui-focused fieldset': {
        borderColor: COLORS.primary.main
      }
    }
  },

  glassmorphism: {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: BORDER_RADIUS.xl,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
  },

  gradient: {
    primary: `linear-gradient(135deg, ${COLORS.primary.main} 0%, ${COLORS.primary.light} 100%)`,
    secondary: `linear-gradient(135deg, ${COLORS.secondary.main} 0%, ${COLORS.secondary.light} 100%)`,
    tertiary: `linear-gradient(135deg, ${COLORS.tertiary.main} 0%, ${COLORS.tertiary.light} 100%)`,
    dark: `linear-gradient(135deg, ${COLORS.text.primary} 0%, ${COLORS.neutral[20]} 100%)`,
    accent: `linear-gradient(135deg, ${COLORS.primary.main} 0%, ${COLORS.tertiary.main} 50%, ${COLORS.secondary.main} 100%)`
  },

  modernCard: {
    borderRadius: BORDER_RADIUS.xl,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: SHADOWS.lg,
    transition: TRANSITIONS.normal,
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: SHADOWS.xl
    }
  }
};

// Admin-specific styles
export const ADMIN_STYLES = {
  section: {
    p: 3,
    mb: 3,
    borderRadius: BORDER_RADIUS.lg,
    border: '1px solid rgba(0, 95, 115, 0.1)'
  },

  preview: {
    p: 2,
    border: '1px solid rgba(0, 95, 115, 0.2)',
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: 'background.default'
  },

  formField: {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: COLORS.primary.main
      }
    }
  }
};

// Animation keyframes (for CSS-in-JS)
export const ANIMATIONS = {
  float: `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
  `,
  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.2); }
    }
  `,
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `
};

// Common validation patterns
export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/.+/,
  phone: /^[\+]?[1-9][\d]{0,15}$/
};

// File upload configurations
export const UPLOAD_CONFIG = {
  image: {
    accept: 'image/*',
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
  },
  video: {
    accept: 'video/*',
    maxSize: 50 * 1024 * 1024, // 50MB
    allowedTypes: ['video/mp4', 'video/webm', 'video/ogg']
  },
  document: {
    accept: '.pdf,.doc,.docx,.txt',
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
  }
};

// API endpoints and configurations
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  storageBucket: 'assets',
  contentTable: 'content',
  productsTable: 'products',
  categoriesTable: 'product_categories',
  locationsTable: 'locations'
};

// Create custom Material-UI theme from configuration
export const createCustomTheme = (config) => {
  // Ensure config is defined
  const safeConfig = config || {};

  return createTheme({
    palette: {
      mode: safeConfig.mode || 'light',
      primary: {
        main: safeConfig.primaryColor || COLORS.primary.main,
        light: COLORS.primary.light,
        dark: COLORS.primary.dark,
        contrastText: COLORS.primary.contrastText,
      },
      secondary: {
        main: safeConfig.secondaryColor || COLORS.secondary.main,
        light: COLORS.secondary.light,
        dark: COLORS.secondary.dark,
        contrastText: COLORS.secondary.contrastText,
      },
      warning: {
        main: COLORS.warning.main,
        light: COLORS.warning.light,
        dark: COLORS.warning.dark,
      },
      tertiary: {
        main: safeConfig.tertiaryColor || COLORS.tertiary.main,
        light: COLORS.tertiary.light,
        dark: COLORS.tertiary.dark,
        contrastText: COLORS.tertiary.contrastText,
      },
      background: {
        default: safeConfig.backgroundDefault || COLORS.background.default,
        paper: safeConfig.backgroundPaper || COLORS.background.paper,
      },
      text: {
        primary: COLORS.text.primary,
        secondary: COLORS.text.secondary,
      },
      social: {
        facebook: COLORS.social.facebook,
        instagram: COLORS.social.instagram,
        whatsapp: COLORS.social.whatsapp,
        tiktok: COLORS.social.tiktok,
        youtube: COLORS.social.youtube,
      },
      neutral: COLORS.neutral,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '3rem',
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.005em',
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.7,
        fontWeight: 400,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
        fontWeight: 400,
      },
      button: {
        fontSize: '0.875rem',
        fontWeight: 600,
        textTransform: 'none',
        letterSpacing: '0.02em',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            fontWeight: 600,
            textTransform: 'none',
            padding: '10px 20px',
            boxShadow: 'none',
            transition: TRANSITIONS.normal,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: SHADOWS.md,
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
          contained: {
            background: `linear-gradient(135deg, ${COLORS.primary.main} 0%, ${COLORS.primary.light} 100%)`,
            boxShadow: SHADOWS.md,
            '&:hover': {
              background: `linear-gradient(135deg, ${COLORS.primary.light} 0%, ${COLORS.primary.main} 100%)`,
              boxShadow: SHADOWS.lg,
            },
          },
          outlined: {
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
              background: 'rgba(255, 255, 255, 0.05)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              transition: TRANSITIONS.fast,
              '&:hover fieldset': {
                borderColor: COLORS.primary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: COLORS.primary.main,
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: SHADOWS.md,
            border: `1px solid ${COLORS.neutral[90]}`,
            background: COLORS.background.paper,
            transition: TRANSITIONS.normal,
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: SHADOWS.lg,
              borderColor: COLORS.primary.light,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: 16,
          },
        },
      },
    },
    breakpoints: {
      values: BREAKPOINTS,
    },
  });
};

const themeConstants = {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TRANSITIONS,
  BREAKPOINTS,
  COMPONENT_STYLES,
  ADMIN_STYLES,
  ANIMATIONS,
  VALIDATION,
  UPLOAD_CONFIG,
  API_CONFIG,
  createCustomTheme
};

export default themeConstants;