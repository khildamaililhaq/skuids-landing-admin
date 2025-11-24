import { Box, Typography, Grid } from '@mui/material';

export default function FeaturesSection({ features }) {
    const imageWidth = features?.imageWidth || 50; // Default 50%
    const textWidth = 100 - imageWidth;

    return (
        <Box
            sx={{
                py: { xs: 4, md: 8 },
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'tertiary.main', // Tertiary background color
            }}
        >
            <Grid container sx={{ minHeight: { xs: 'auto', md: '500px' } }}>
                {/* Image Section */}
                {features?.image && (
                    <Grid
                        item
                        xs={12}
                        md={imageWidth / 10} // Convert percentage to grid units (50% = 5/10)
                        sx={{
                            position: 'relative',
                            display: { xs: 'none', md: 'block' }, // Hide on mobile, show on desktop
                            display: 'flex',
                            justifyContent: 'center', // Center-align the image
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            component="img"
                            src={features.image}
                            alt={features?.title || 'Feature image'}
                            sx={{
                                width: '100%',
                                maxWidth: '100%', // Ensure it doesn't exceed container
                                height: 'auto',
                                maxHeight: '500px',
                                objectFit: 'cover',
                                borderRadius: 0,
                            }}
                        />
                    </Grid>
                )}

                {/* Text Section */}
                <Grid
                    item
                    xs={12}
                    md={features?.image ? textWidth / 10 : 12} // Full width if no image
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        px: { xs: 2, md: 6 },
                        py: { xs: 4, md: 0 },
                        textAlign: { xs: 'center', md: 'left' }, // Center on mobile, left-align on desktop
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                            fontWeight: 700,
                            mb: 3,
                            color: 'primary.main', // Dark primary color for contrast
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {features?.title || 'Features Title'}
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { xs: '1.1rem', md: '1.3rem' },
                            color: 'primary.dark', // Darker primary color for subtitle
                            mb: 4,
                            lineHeight: 1.6,
                            fontWeight: 400,
                        }}
                    >
                        {features?.description || 'Features description'}
                    </Typography>

                    {features?.content && (
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'primary.main', // Dark primary color for content
                                lineHeight: 1.8,
                                fontSize: { xs: '1rem', md: '1.1rem' },
                                fontWeight: 400,
                            }}
                        >
                            {features.content}
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}