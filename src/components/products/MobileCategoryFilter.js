import { Box, Typography, Button, Chip } from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';

export default function MobileCategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
  onClearFilter
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Filter by Category
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        <Button
          variant={selectedCategory === null ? "contained" : "outlined"}
          onClick={() => onCategorySelect(null)}
          sx={{
            textTransform: 'none',
            fontSize: '0.9rem',
            px: 2,
            py: 1
          }}
        >
          All Products
        </Button>

        {categories.slice(0, 6).map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "contained" : "outlined"}
            onClick={() => onCategorySelect(category.id)}
            sx={{
              textTransform: 'none',
              fontSize: '0.9rem',
              px: 2,
              py: 1
            }}
          >
            {category.name}
          </Button>
        ))}
      </Box>

      {selectedCategory && (
        <Button
          variant="text"
          onClick={onClearFilter}
          sx={{
            textTransform: 'none',
            color: 'text.secondary',
            fontSize: '0.9rem'
          }}
        >
          Clear Filter
        </Button>
      )}
    </Box>
  );
}