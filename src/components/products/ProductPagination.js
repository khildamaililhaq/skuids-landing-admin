import { Box, Typography, Pagination } from '@mui/material';

export default function ProductPagination({
  totalPages,
  currentPage,
  onPageChange,
  totalProducts,
  productsPerPage = 20
}) {
  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, mb: 4 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
        size="medium"
        showFirstButton
        showLastButton
      />

      {totalProducts > 0 && (
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', textAlign: 'center' }}>
          Showing {((currentPage - 1) * productsPerPage) + 1} - {Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts} products
        </Typography>
      )}
    </Box>
  );
}