'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductSidebar from '../../components/products/ProductSidebar';
import MobileCategoryFilter from '../../components/products/MobileCategoryFilter';
import ProductGrid from '../../components/products/ProductGrid';
import ProductPagination from '../../components/products/ProductPagination';
import { getProducts, getCategories, getProductsByCategory } from '../../lib/supabase';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const sidebarWidth = 280;
  const productsPerPage = 20;

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async (categoryId = null, page = 1) => {
    setLoading(true);
    let result;

    const from = (page - 1) * productsPerPage;
    const to = from + productsPerPage - 1;

    if (categoryId) {
      result = await getProductsByCategory(categoryId, from, to);
    } else {
      result = await getProducts(from, to);
    }

    if (result.success) {
      setProducts(result.data || []);
      setTotalProducts(result.count || 0);
      setTotalPages(Math.ceil((result.count || 0) / productsPerPage));
    }
    setLoading(false);
  };

  const loadCategories = async () => {
    const result = await getCategories();
    if (result.success) {
      setCategories(result.data);
    }
  };


  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when changing category
    loadProducts(categoryId, 1);
  };

  const handleClearFilter = () => {
    setSelectedCategory(null);
    setCurrentPage(1); // Reset to first page when clearing filter
    loadProducts(null, 1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    loadProducts(selectedCategory, page);
  };

  if (loading) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4, px: 2 }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center'
          }}>
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                color: 'text.secondary',
                fontWeight: 500
              }}
            >
              Loading Products...
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                maxWidth: '300px'
              }}
            >
              Please wait while we fetch the latest products for you
            </Typography>
          </Box>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Box sx={{ minHeight: '100vh', bgcolor: '#FFFCF5' }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>

          {/* Simple Title */}
          <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}>
            Our Products
          </Typography>

          {/* Simple Filter */}
          <Box sx={{ mb: 3 }}>
            <MobileCategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
              onClearFilter={handleClearFilter}
            />
          </Box>

          {/* Simple Grid */}
          <ProductGrid
            products={products}
            selectedCategory={selectedCategory}
            categories={categories}
            sidebarWidth={sidebarWidth}
          />

          {/* Simple Pagination */}
          <ProductPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalProducts={totalProducts}
            productsPerPage={productsPerPage}
          />

        </Container>
      </Box>
      <Footer />
    </>
  );
}
