import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Container, Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export default function ImageSlider({ slides = [], height = '60vh', width = '100%', showText = true }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (slides.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [slides.length]);

    if (!slides.length) return null;

    const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    const handleNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const handleDot = (idx) => setCurrentSlide(idx);

    return (
        <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            {/* Image slider */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    minHeight: 300,
                    background: 'var(--gradient-primary)',
                }}
            >
                {slides.map((slide, idx) => (
                    <Box
                        key={slide.id}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: idx === currentSlide ? 1 : 0,
                            transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                ))}

                {/* Navigation */}
                {slides.length > 1 && (
                    <>
                        <IconButton
                            onClick={handlePrev}
                            sx={{
                                position: 'absolute',
                                left: { xs: 10, md: 30 },
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'white',
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                zIndex: 2,
                                '&:hover': { backgroundColor: 'rgba(0,0,0,0.4)' },
                            }}
                        >
                            <ChevronLeft />
                        </IconButton>
                        <IconButton
                            onClick={handleNext}
                            sx={{
                                position: 'absolute',
                                right: { xs: 10, md: 30 },
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'white',
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                zIndex: 2,
                                '&:hover': { backgroundColor: 'rgba(0,0,0,0.4)' },
                            }}
                        >
                            <ChevronRight />
                        </IconButton>
                    </>
                )}

                {/* Dots */}
                {slides.length > 1 && (
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: 1.5,
                            zIndex: 2,
                        }}
                    >
                        {slides.map((_, idx) => (
                            <Box
                                key={idx}
                                onClick={() => handleDot(idx)}
                                sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: idx === currentSlide ? 'white' : 'rgba(255,255,255,0.4)',
                                    cursor: 'pointer',
                                    border: '2px solid transparent',
                                    '&:hover': {
                                        backgroundColor: 'white',
                                        transform: 'scale(1.2)',
                                        borderColor: 'rgba(255,255,255,0.6)',
                                    },
                                }}
                            />
                        ))}
                    </Box>
                )}
            </Box>

            {/* Caption below image */}
            {showText && (
                <Container maxWidth="lg" sx={{ mt: 4 }}>
                    <Box
                        textAlign="center"
                        sx={{
                            maxWidth: 900,
                            mx: 'auto',
                            px: { xs: 2, md: 4 },
                            pb: { xs: 6, md: 10 }, // Extra bottom padding
                        }}
                    >
                        <Typography
                            variant="h1"
                            component="h1"
                            sx={{
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                                fontWeight: 800,
                                mb: { xs: 2, md: 3 },
                                letterSpacing: '-0.02em',
                                lineHeight: 1.1,
                            }}
                        >
                            {slides[currentSlide].title}
                        </Typography>
                        <Typography
                            variant="h5"
                            component="p"
                            sx={{
                                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                                mb: { xs: 4, md: 6 },
                                maxWidth: 700,
                                mx: 'auto',
                                lineHeight: 1.6,
                                fontWeight: 400,
                                color: 'rgba(0,0,0,0.7)',
                            }}
                        >
                            {slides[currentSlide].subtitle}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'secondary.main',
                                    px: { xs: 3, md: 5 },
                                    py: { xs: 1.5, md: 2 },
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    fontWeight: 600,
                                    borderRadius: '50px',
                                    minWidth: { xs: '140px', md: '180px' },
                                }}
                            >
                                Get Started
                            </Button>
                        </Box>
                    </Box>
                </Container>
            )}
        </Box>
    );
}