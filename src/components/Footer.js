import { Box, Typography, Container, Grid, Link, IconButton, Divider } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { Facebook, Instagram, WhatsApp, Phone, Email, LocationOn } from '@mui/icons-material';
import { TikTokIcon, YouTubeIcon } from './SocialIcons';
import { useTranslation } from '../utils/i18n';

export default function Footer({ contactData }) {
  const theme = useTheme();
  const { t } = useTranslation();

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
                color: '#1877F2',
                borderRadius: '50%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: '#1877F2',
                  color: 'white',
                  transform: 'translateY(-4px) scale(1.05)',
                  boxShadow: '0 8px 25px rgba(24, 119, 242, 0.4)',
                },
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
                color: '#E1306C',
                borderRadius: '50%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: '#E1306C',
                  color: 'white',
                  transform: 'translateY(-4px) scale(1.05)',
                  boxShadow: '0 8px 25px rgba(225, 48, 108, 0.4)',
                },
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
                color: '#25D366',
                borderRadius: '50%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: '#25D366',
                  color: 'white',
                  transform: 'translateY(-4px) scale(1.05)',
                  boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)',
                },
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
                color: '#000000',
                borderRadius: '50%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: '#000000',
                  color: 'white',
                  transform: 'translateY(-4px) scale(1.05)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                },
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
                color: '#FF0000',
                borderRadius: '50%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: '#FF0000',
                  color: 'white',
                  transform: 'translateY(-4px) scale(1.05)',
                  boxShadow: '0 8px 25px rgba(255, 0, 0, 0.4)',
                },
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
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.12)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              }
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
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.12)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              }
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