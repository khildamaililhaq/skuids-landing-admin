import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

export default function ProductGrid({
  products,
  selectedCategory,
  categories,
  sidebarWidth = 280
}) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box sx={{ mb: 4 }}>
      {/* Filter indicator */}
      {selectedCategory && (
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 500,
              fontSize: '0.9rem'
            }}
          >
            Showing: {categories.find(cat => cat.id === selectedCategory)?.name || 'Category'}
          </Typography>
        </Box>
      )}

      {/* Elegant grid */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                cursor: 'pointer',
                border: `1px solid ${theme.palette.grey[300]}`,
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                '&:hover': {
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  transform: 'translateY(-2px)',
                  borderColor: theme.palette.grey[400]
                }
              }}
              onClick={() => router.push(`/products/${product.id}`)}
            >
              {/* Image */}
              <Box sx={{
                height: 240,
                bgcolor: theme.palette.background.default,
                position: 'relative',
                overflow: 'hidden'
              }}>
                {product.images && product.images.length > 0 ? (
                  <CardMedia
                    component="img"
                    height="100%"
                    image={product.images[0]}
                    alt={product.title}
                    sx={{
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                    onError={(e) => {
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                ) : (
                  <Box sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.grey[500],
                    flexDirection: 'column'
                  }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      No Image
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.grey[400] }}>
                      {product.title}
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Content */}
              <CardContent sx={{
                p: 2.5,
                '&:last-child': { pb: 2.5 }
              }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                    lineHeight: 1.4,
                    mb: 0.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {product.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No products */}
      {products.length === 0 && (
        <Box sx={{
          textAlign: 'center',
          py: 8,
          px: 2
        }}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 400,
              mb: 1
            }}
          >
            No products found
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.grey[500],
              maxWidth: '400px',
              mx: 'auto'
            }}
          >
            Try adjusting your filters or check back later for new products.
          </Typography>
        </Box>
      )}
    </Box>
  );
}