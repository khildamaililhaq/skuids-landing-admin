// Design tokens and constants for consistent styling
import { createTheme } from '@mui/material/styles';

export const COLORS = {
  primary: {
    main: '#84DC00',
    light: '#A8E633',
    dark: '#5DA800',
    contrastText: '#000000'
  },
  secondary: {
    main: '#7b3cc3',
    light: '#7b3cc3',
    dark: '#7b3cc3',
    contrastText: '#FFFFFF'
  },
  warning: {
    main: '#FF4444',
    light: '#FF6666',
    dark: '#CC0000'
  },
  tertiary: {
    main: '#FFA500',
    light: '#FFBF00',
    dark: '#CC8400',
    contrastText: '#000000'
  },
  background: {
    default: '#F0F0F0',
    paper: '#FFFFFF'
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
    primary: 'linear-gradient(135deg, #84DC00 0%, #A8E633 100%)',
    secondary: 'linear-gradient(135deg, #0066FF 0%, #3399FF 100%)',
    tertiary: 'linear-gradient(135deg, #FFA500 0%, #FFBF00 100%)',
    dark: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    accent: 'linear-gradient(135deg, #84DC00 0%, #0066FF 50%, #FFA500 100%)'
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

  // Ensure COLORS object is properly defined
  const defaultColors = {
    primary: { main: '#84DC00', light: '#A8E633', dark: '#5DA800', contrastText: '#000000' },
    secondary: { main: '#0066FF', light: '#3399FF', dark: '#0044CC', contrastText: '#FFFFFF' },
    warning: { main: '#FF4444', light: '#FF6666', dark: '#CC0000' },
    tertiary: { main: '#FFA500', light: '#FFBF00', dark: '#CC8400', contrastText: '#000000' },
    background: { default: '#F0F0F0', paper: '#FFFFFF' }
  };

  const colors = COLORS || defaultColors;

  return createTheme({
    palette: {
      mode: safeConfig.mode || 'light',
      primary: {
        main: safeConfig.primaryColor || colors.primary.main,
        light: colors.primary.light,
        dark: colors.primary.dark,
        contrastText: colors.primary.contrastText,
      },
      secondary: {
        main: safeConfig.secondaryColor || colors.secondary.main,
        light: colors.secondary.light,
        dark: colors.secondary.dark,
        contrastText: colors.secondary.contrastText,
      },
      warning: {
        main: safeConfig.warningColor || colors.warning.main,
        light: colors.warning.light,
        dark: colors.warning.dark,
      },
      tertiary: {
        main: safeConfig.tertiaryColor || colors.tertiary.main,
        light: colors.tertiary.light,
        dark: colors.tertiary.dark,
        contrastText: colors.tertiary.contrastText,
      },
      background: {
        default: safeConfig.backgroundDefault || colors.background.default,
        paper: safeConfig.backgroundPaper || colors.background.paper,
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.005em',
      },
      h4: {
        fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
        lineHeight: 1.7,
        fontWeight: 400,
      },
      body2: {
        fontSize: 'clamp(0.75rem, 1.25vw, 0.875rem)',
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
            borderRadius: BORDER_RADIUS.xl,
            fontWeight: 600,
            textTransform: 'none',
            padding: '14px 28px',
            boxShadow: 'none',
            transition: TRANSITIONS.normal,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transition: 'left 0.5s',
            },
            '&:hover::before': {
              left: '100%',
            },
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: SHADOWS.lg,
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
          contained: {
            background: 'linear-gradient(135deg, #84DC00 0%, #A8E633 100%)',
            boxShadow: SHADOWS.md,
            '&:hover': {
              background: 'linear-gradient(135deg, #A8E633 0%, #84DC00 100%)',
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
              borderRadius: BORDER_RADIUS.md,
              transition: TRANSITIONS.fast,
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: BORDER_RADIUS.xl,
            boxShadow: SHADOWS.md,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            transition: TRANSITIONS.normal,
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: SHADOWS.lg,
              border: '1px solid rgba(132, 220, 0, 0.2)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
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