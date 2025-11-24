import { useState, useEffect, useRef } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { alpha } from '@mui/material/styles';
import FeaturesSection from './FeaturesSection';
import ProductsSection from './ProductsSection';

export default function ProductsFeaturesSection({ features, products }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const tabsRef = useRef([]);

  const handleTabChange = (newValue) => {
    if (newValue !== activeTab) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTab(newValue);
        setTimeout(() => setIsTransitioning(false), 100);
      }, 150);
    }
  };

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const tabLabels = [
    { label: 'Our Services', icon: '🚀' },
    { label: 'Why Choose Us', icon: '⭐' }
  ];

  return (
      <Box
          id="products"
          ref={containerRef}
          sx={{
            py: { xs: 8, md: 12 },
            width: '100%',
            position: 'relative',
            background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
            overflow: 'hidden',
          }}
      >

        {/* Main Content Container */}
        <Box sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%'
        }}>
          {/* Modern Minimal Tabs Container */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: { xs: 6, md: 8 },
            position: 'relative',
            px: { xs: 2, sm: 3 },
            zIndex: 10
          }}>
            {/* Clean Tab Container */}
            <Box sx={{
              display: 'flex',
              background: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(20px)',
              borderRadius: '50px',
              p: 1.5,
              border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              position: 'relative',
            }}>
              {tabLabels.map((tab, index) => (
                  <Box
                      key={index}
                      ref={el => tabsRef.current[index] = el}
                      onClick={() => handleTabChange(index)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: { xs: 4, sm: 5 },
                        py: { xs: 2.5, sm: 3 },
                        borderRadius: '40px',
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 2,
                        overflow: 'hidden',
                        minWidth: { xs: '140px', sm: '160px' },
                        justifyContent: 'center',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        background: activeTab === index
                            ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`
                            : 'transparent',
                        color: activeTab === index
                            ? theme.palette.common.white
                            : theme.palette.text.secondary,
                        boxShadow: activeTab === index
                            ? '0 8px 25px rgba(132, 220, 0, 0.3)'
                            : 'none',
                        transform: activeTab === index ? 'scale(1.05)' : 'scale(1)',
                        '&:hover': {
                          color: activeTab === index
                              ? theme.palette.common.white
                              : theme.palette.text.primary,
                          transform: 'scale(1.02)',
                          '& .tab-icon': {
                            transform: 'scale(1.1) rotate(5deg)',
                          }
                        },
                        '&:active': {
                          transform: 'scale(0.98)',
                          transition: 'all 0.1s ease',
                        }
                      }}
                  >
                    <Typography
                        className="tab-icon"
                        sx={{
                          fontSize: { xs: '1.2rem', sm: '1.4rem' },
                          fontWeight: activeTab === index ? 700 : 500,
                          position: 'relative',
                          zIndex: 3,
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                    >
                      {tab.icon}
                    </Typography>
                    <Typography
                        sx={{
                          fontSize: { xs: '0.85rem', sm: '0.95rem' },
                          fontWeight: activeTab === index ? 600 : 500,
                          position: 'relative',
                          zIndex: 3,
                          whiteSpace: 'nowrap',
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase',
                          transition: 'all 0.3s ease'
                        }}
                    >
                      {tab.label}
                    </Typography>
                  </Box>
              ))}
            </Box>
          </Box>

          {/* Modern Content Area */}
          <Box sx={{
            position: 'relative',
            width: '100%',
            minHeight: '500px',
          }}>
            {/* Content Container with Glassmorphism */}
            <Box sx={{
              width: '100%',
              opacity: isTransitioning ? 0.7 : 1,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
            }}>
              {activeTab === 0 ? (
                  <ProductsSection products={products} />
              ) : (
                  <FeaturesSection features={features} />
              )}
            </Box>
          </Box>
        </Box>

        {/* Modern Tab Animations */}
        <style jsx global>{`
          /* Smooth tab transitions */
          .tab-transition {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}</style>
      </Box>
  );
}