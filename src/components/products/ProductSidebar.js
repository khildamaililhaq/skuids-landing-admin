import { Box, Typography, Button, Divider, Stack } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { Clear as ClearIcon } from '@mui/icons-material';

export default function ProductSidebar({
  categories,
  selectedCategory,
  onCategorySelect,
  onClearFilter,
  sidebarWidth = 280
}) {
  const theme = useTheme();

  return (
    <Box
      sx={(theme) => ({
        width: { xs: 0, md: sidebarWidth },
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: { xs: 'none', md: `1px solid ${alpha(theme.palette.primary.main, 0.1)}` },
        position: { xs: 'relative', md: 'fixed' },
        left: { xs: 'auto', md: 0 },
        top: { xs: 'auto', md: 0 },
        bottom: { xs: 'auto', md: 0 },
        mt: { xs: 0, md: '64px' },
        overflowY: { xs: 'visible', md: 'auto' },
        zIndex: 1000,
        display: { xs: 'none', md: 'block' },
        boxShadow: { xs: 'none', md: `4px 0 20px ${alpha(theme.palette.primary.main, 0.08)}` },
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: alpha(theme.palette.primary.main, 0.2),
          borderRadius: '3px',
          '&:hover': {
            background: alpha(theme.palette.primary.main, 0.3),
          }
        }
      })}
    >
      <Box sx={{ p: 3, height: '100%', position: 'relative' }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={(theme) => ({
              color: 'primary.main',
              fontWeight: 700,
              fontSize: '1.2rem',
              mb: 1,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            })}
          >
            Categories
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              fontSize: '0.9rem',
              opacity: 0.8
            }}
          >
            Filter products by category
          </Typography>
        </Box>

        {/* All Products Option */}
        <Box sx={{ mb: 3 }}>
          <Button
            fullWidth
            variant={selectedCategory === null ? "contained" : "outlined"}
            onClick={() => onCategorySelect(null)}
            sx={(theme) => ({
              justifyContent: 'flex-start',
              textTransform: 'none',
              py: 1.8,
              px: 2.5,
              borderRadius: 3,
              fontWeight: 600,
              fontSize: '0.95rem',
              letterSpacing: '0.5px',
              boxShadow: selectedCategory === null
                ? `0 4px 16px ${alpha(theme.palette.primary.main, 0.25)}, 0 2px 8px ${alpha(theme.palette.primary.main, 0.15)}`
                : `0 2px 8px ${alpha(theme.palette.primary.main, 0.08)}`,
              background: selectedCategory === null
                ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                : 'transparent',
              border: selectedCategory === null ? 'none' : `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: selectedCategory === null
                  ? `0 6px 20px ${alpha(theme.palette.primary.main, 0.3)}, 0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
                  : `0 4px 16px ${alpha(theme.palette.primary.main, 0.15)}`,
                background: selectedCategory === null
                  ? `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`
                  : alpha(theme.palette.primary.main, 0.05)
              }
            })}
          >
            All Products
          </Button>
        </Box>

        <Divider
          sx={(theme) => ({
            mb: 3,
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.2)}, transparent)`,
            border: 'none'
          })}
        />

        {/* Categories List */}
        <Box sx={{ flexGrow: 1 }}>
          {categories.length > 0 ? (
            <Stack spacing={1.5}>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  fullWidth
                  variant={selectedCategory === category.id ? "contained" : "text"}
                  onClick={() => onCategorySelect(category.id)}
                  sx={(theme) => ({
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    py: 1.6,
                    px: 2.5,
                    borderRadius: 2.5,
                    fontWeight: 500,
                    minHeight: 'auto',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: selectedCategory === category.id
                      ? `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}, 0 2px 8px ${alpha(theme.palette.primary.main, 0.15)}`
                      : 'none',
                    background: selectedCategory === category.id
                      ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                      : 'transparent',
                    border: selectedCategory === category.id ? 'none' : '1px solid transparent',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                      transition: 'left 0.5s ease',
                    },
                    '&:hover': {
                      transform: 'translateX(4px)',
                      boxShadow: selectedCategory === category.id
                        ? `0 6px 20px ${alpha(theme.palette.primary.main, 0.3)}, 0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
                        : `0 4px 16px ${alpha(theme.palette.primary.main, 0.1)}`,
                      background: selectedCategory === category.id
                        ? `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`
                        : alpha(theme.palette.primary.main, 0.05),
                      '&::before': {
                        left: '100%',
                      }
                    }
                  })}
                >
                  <Box sx={{ textAlign: 'left', width: '100%', position: 'relative', zIndex: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        lineHeight: 1.3,
                        fontSize: '0.95rem',
                        color: selectedCategory === category.id ? 'white' : 'text.primary'
                      }}
                    >
                      {category.name}
                    </Typography>
                    {category.description && (
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          mt: 0.5,
                          lineHeight: 1.3,
                          fontSize: '0.8rem',
                          color: selectedCategory === category.id ? 'rgba(255, 255, 255, 0.8)' : 'text.secondary',
                          opacity: selectedCategory === category.id ? 0.9 : 0.7
                        }}
                      >
                        {category.description.length > 35
                          ? `${category.description.substring(0, 35)}...`
                          : category.description
                        }
                      </Typography>
                    )}
                  </Box>
                </Button>
              ))}
            </Stack>
          ) : (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontStyle: 'italic',
                  opacity: 0.6
                }}
              >
                No categories available
              </Typography>
            </Box>
          )}
        </Box>

        {/* Clear Filter Button */}
        {selectedCategory && (
          <Box sx={(theme) => ({
            mt: 4,
            pt: 3,
            borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            position: 'sticky',
            bottom: 0,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0 0 12px 12px'
          })}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={onClearFilter}
              sx={(theme) => ({
                textTransform: 'none',
                color: 'primary.main',
                borderColor: alpha(theme.palette.primary.main, 0.3),
                py: 1.5,
                borderRadius: 2.5,
                fontWeight: 600,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  color: 'white',
                  bgcolor: 'primary.main',
                  borderColor: 'primary.main',
                  transform: 'translateY(-1px)',
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`
                }
              })}
            >
              Clear Filter
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}