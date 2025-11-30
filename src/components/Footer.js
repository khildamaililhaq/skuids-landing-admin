import { Box, Typography, Container, Grid, Link, IconButton, Divider } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { Facebook, Instagram, WhatsApp, Phone, Email, LocationOn } from '@mui/icons-material';
import { TikTokIcon, YouTubeIcon } from './SocialIcons';
import { useTranslations } from 'next-intl';
import NextLink from 'next/link';

export default function Footer({ contactData }) {
  const theme = useTheme();
  const t = useTranslations();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 3 },
        mt: 0,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 70%, rgba(132, 220, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 165, 0, 0.1) 0%, transparent 50%)',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Navigation Links */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: { xs: 2, md: 4 },
            flexWrap: 'wrap',
            mb: { xs: 4, md: 6 },
            pb: { xs: 3, md: 4 },
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Link component={NextLink} href="/" sx={{ color: 'white', textDecoration: 'none', '&:hover': { opacity: 0.8 } }}>
            Home
          </Link>
          <Link component={NextLink} href="/for-agents" sx={{ color: 'white', textDecoration: 'none', '&:hover': { opacity: 0.8 } }}>
            For Agents
          </Link>
          <Link component={NextLink} href="/for-hosts" sx={{ color: 'white', textDecoration: 'none', '&:hover': { opacity: 0.8 } }}>
            For Hosts
          </Link>
          <Link component={NextLink} href="/platforms" sx={{ color: 'white', textDecoration: 'none', '&:hover': { opacity: 0.8 } }}>
            Platforms
          </Link>
          <Link component={NextLink} href="/about" sx={{ color: 'white', textDecoration: 'none', '&:hover': { opacity: 0.8 } }}>
            About
          </Link>
        </Box>

        {/* Social Media & Contact Info - Simple Layout */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 6 },
          alignItems: { xs: 'center', md: 'flex-start' },
          justifyContent: 'center'
        }}>

          {/* Social Media Icons */}
          <Box sx={{
            display: 'flex',
            gap: { xs: 2, sm: 3 },
            flexWrap: 'wrap',
            justifyContent: 'center',
            mb: { xs: 4, md: 6 }
          }}>
            <IconButton
              component={Link}
              href={contactData?.facebook || 'https://facebook.com/happyjasmine'}
              target="_blank"
              sx={{
                width: { xs: 56, sm: 64 },
                height: { xs: 56, sm: 64 },
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: theme.palette.social?.facebook || '#1877F2',
                borderRadius: '50%',
              }}
            >
              <Facebook sx={{ fontSize: { xs: 28, sm: 32 } }} />
            </IconButton>
            <IconButton
              component={Link}
              href={contactData?.instagram || 'https://instagram.com/happyjasmine'}
              target="_blank"
              sx={{
                width: { xs: 56, sm: 64 },
                height: { xs: 56, sm: 64 },
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: theme.palette.social?.instagram || '#E1306C',
                borderRadius: '50%',
              }}
            >
              <Instagram sx={{ fontSize: { xs: 28, sm: 32 } }} />
            </IconButton>
            <IconButton
              component={Link}
              href={`https://wa.me/${contactData?.whatsapp || '1234567890'}`}
              target="_blank"
              sx={{
                width: { xs: 56, sm: 64 },
                height: { xs: 56, sm: 64 },
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: theme.palette.social?.whatsapp || '#25D366',
                borderRadius: '50%',
              }}
            >
              <WhatsApp sx={{ fontSize: { xs: 28, sm: 32 } }} />
            </IconButton>
            <IconButton
              component={Link}
              href={contactData?.tiktok || 'https://tiktok.com/@happyjasmine'}
              target="_blank"
              sx={{
                width: { xs: 56, sm: 64 },
                height: { xs: 56, sm: 64 },
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: theme.palette.social?.tiktok || '#000000',
                borderRadius: '50%',
              }}
            >
              <TikTokIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
            </IconButton>
            <IconButton
              component={Link}
              href={contactData?.youtube || 'https://youtube.com/happyjasmine'}
              target="_blank"
              sx={{
                width: { xs: 56, sm: 64 },
                height: { xs: 56, sm: 64 },
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: theme.palette.social?.youtube || '#FF0000',
                borderRadius: '50%',
              }}
            >
              <YouTubeIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
            </IconButton>
          </Box>

          {/* Contact Info */}
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 3 },
            alignItems: 'center',
            textAlign: 'center',
            mb: { xs: 4, md: 6 }
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: { xs: 2, sm: 2.5 },
              borderRadius: '16px',
              bgcolor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}>
              <Phone sx={{ fontSize: { xs: 20, sm: 24 }, color: theme.palette.primary.main, flexShrink: 0 }} />
              <Typography variant="body1" sx={{ opacity: 0.95, fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 500 }}>
                {contactData?.phone || '+1 (555) 123-4567'}
              </Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: { xs: 2, sm: 2.5 },
              borderRadius: '16px',
              bgcolor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}>
              <Email sx={{ fontSize: { xs: 20, sm: 24 }, color: theme.palette.primary.main, flexShrink: 0 }} />
              <Typography variant="body1" sx={{ opacity: 0.95, fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 500 }}>
                {contactData?.email || 'hello@happyjasmine.com'}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box sx={{
          textAlign: 'center',
          pt: { xs: 3, sm: 4 },
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          zIndex: 2
        }}>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.7,
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              letterSpacing: '0.02em',
              fontWeight: 400,
            }}
          >
            {t('footer.copyright')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}