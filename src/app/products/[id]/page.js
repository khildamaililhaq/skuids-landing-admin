'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Typography, Box, Button, Paper, IconButton, Divider, Grid } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight, PlayArrow as PlayIcon, ArrowBack } from '@mui/icons-material';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { getProductById } from '../../../lib/supabase';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const productId = params.id;

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    try {
      const result = await getProductById(productId);
      if (result.success) {
        setProduct(result.data);
        console.log('Product loaded:', result.data);
      } else {
        console.error('Failed to load product:', result.error);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (index) => {
    setActiveImage(index);
  };

  const handlePrevImage = () => {
    if (product?.images?.length > 1) {
      setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    }
  };

  const handleNextImage = () => {
    if (product?.images?.length > 1) {
      setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
    }
  };

  const handleVideoClick = (videoUrl) => {
    window.open(videoUrl, '_blank');
  };

  if (loading) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <Typography variant="h6">Loading product...</Typography>
          </Box>
        </Container>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Product not found</Typography>
            <Button variant="contained" onClick={() => router.push('/products')} startIcon={<ArrowBack />}>
              Back to Products
            </Button>
          </Box>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Mobile-First Layout */}
      <Box sx={{ minHeight: '100vh', bgcolor: '#FFFCF5' }}>
        <Container maxWidth="lg" sx={{ py: 2, px: 2 }}>

          {/* Back Button - Mobile Optimized */}
          <Box sx={{ mb: 2 }}>
            <Button
              variant="text"
              startIcon={<ArrowBack />}
              onClick={() => router.push('/products')}
              sx={{
                color: '#666',
                fontSize: '0.9rem',
                textTransform: 'none',
                p: 1,
                minHeight: 'auto',
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.04)'
                }
              }}
            >
              Back
            </Button>
          </Box>

          {/* Product Title - Always visible at top */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                fontWeight: 700,
                color: '#333',
                lineHeight: 1.2,
                mb: 1
              }}
            >
              {product.title}
            </Typography>

            {/* Price - Prominent */}
            {product.het_price && (
              <Typography
                variant="h5"
                sx={{
                  color: '#e53e3e',
                  fontWeight: 700,
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
                }}
              >
                Rp {product.het_price}
              </Typography>
            )}
          </Box>

          {/* Image Gallery - Mobile Optimized */}
          <Box sx={{ mb: 4 }}>
            {/* Main Image */}
            <Paper
              elevation={0}
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: 350, sm: 500, md: 600 },
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid #e0e0e0',
                mb: 2
              }}
            >
              {product.images && product.images.length > 0 ? (
                <>
                  <Image
                    src={product.images[activeImage]}
                    alt={`${product.title} - Image ${activeImage + 1}`}
                    fill
                    style={{
                      objectFit: 'contain',
                      backgroundColor: 'white'
                    }}
                    onError={(e) => {
                      console.error('Image failed to load:', product.images[activeImage]);
                      e.target.src = '/placeholder.jpg';
                    }}
                  />

                  {/* Navigation Arrows - Only on larger screens */}
                  {product.images.length > 1 && (
                    <>
                      <IconButton
                        sx={{
                          position: 'absolute',
                          left: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          bgcolor: 'rgba(255, 255, 255, 0.9)',
                          color: '#666',
                          width: 40,
                          height: 40,
                          border: '1px solid #ddd',
                          display: { xs: 'none', sm: 'flex' },
                          '&:hover': {
                            bgcolor: 'white'
                          }
                        }}
                        onClick={handlePrevImage}
                      >
                        <KeyboardArrowLeft />
                      </IconButton>
                      <IconButton
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          bgcolor: 'rgba(255, 255, 255, 0.9)',
                          color: '#666',
                          width: 40,
                          height: 40,
                          border: '1px solid #ddd',
                          display: { xs: 'none', sm: 'flex' },
                          '&:hover': {
                            bgcolor: 'white'
                          }
                        }}
                        onClick={handleNextImage}
                      >
                        <KeyboardArrowRight />
                      </IconButton>
                    </>
                  )}

                  {/* Image Counter */}
                  {product.images.length > 1 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                        bgcolor: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.8rem',
                        fontWeight: 500
                      }}
                    >
                      {activeImage + 1} / {product.images.length}
                    </Box>
                  )}
                </>
              ) : (
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#FFFCF5',
                    color: 'text.secondary'
                  }}
                >
                  <Typography variant="h2" sx={{ mb: 1 }}>📷</Typography>
                  <Typography variant="body1">No Images Available</Typography>
                </Box>
              )}
            </Paper>

            {/* Thumbnail Strip - Mobile Friendly */}
            {product.images && product.images.length > 1 && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  overflowX: 'auto',
                  pb: 1,
                  '&::-webkit-scrollbar': {
                    height: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '2px'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#ccc',
                    borderRadius: '2px'
                  }
                }}
              >
                {product.images.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => handleImageChange(index)}
                    sx={{
                      minWidth: 60,
                      height: 60,
                      position: 'relative',
                      cursor: 'pointer',
                      borderRadius: 1,
                      overflow: 'hidden',
                      border: activeImage === index ? '2px solid' : '2px solid',
                      borderColor: activeImage === index ? 'primary.main' : 'neutral.80',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: 'primary.main'
                      }
                    }}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      style={{
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.src = '/placeholder.jpg';
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {/* Product Information - Below images */}
          <Box sx={{ mb: 4 }}>

            {/* Description */}
            {product.description && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 2,
                    fontSize: '1.1rem'
                  }}
                >
                  Deskripsi Produk
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    fontSize: '1rem'
                  }}
                >
                  {product.description}
                </Typography>
              </Box>
            )}

            {/* Nutrition Facts */}
            {product.nutrition_fact && product.nutrition_fact.trim() && isValidUrl(product.nutrition_fact) && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 2,
                    fontSize: '1.1rem'
                  }}
                >
                  Komposisi
                </Typography>
                <Paper
                  sx={{
                    p: 3,
                    bgcolor: '#FFFCF5',
                    borderColor: 'neutral.80',
                    border: '1px solid',
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Image
                    src={product.nutrition_fact}
                    alt="Nutrition Facts"
                    width={800}
                    height={800}
                    style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
                  />
                </Paper>
              </Box>
            )}

            {/* Videos Section */}
            {product.videos && product.videos.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#333',
                    mb: 2,
                    fontSize: '1.1rem'
                  }}
                >
                  Videos
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {product.videos.map((video, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        cursor: 'pointer',
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: '#f8f9fa'
                        }
                      }}
                      onClick={() => handleVideoClick(video)}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: '#f0f0f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <PlayIcon sx={{ color: '#666' }} />
                      </Box>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          Video {index + 1}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          Click to watch
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}
          </Box>

        </Container>
      </Box>

      <Footer />
    </>
  );
}