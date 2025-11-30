'use client';

'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Chip, Avatar, Tooltip, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, useTheme, useMediaQuery, Pagination } from '@mui/material';
import { Factory as FactoryIcon, Business as BusinessIcon, LocalShipping as LocalShippingIcon, Store as StoreIcon, Map as MapIcon } from '@mui/icons-material';
import dynamic from 'next/dynamic';
import { getLocations } from '../lib/supabase';

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Map controller component to handle dynamic centering
const MapController = dynamic(() => import('react-leaflet').then((mod) => {
  const { useMap } = mod;
  return ({ selectedLocation }) => {
    const map = useMap();
    useEffect(() => {
      if (selectedLocation && selectedLocation.latitude && selectedLocation.longitude) {
        map.setView([selectedLocation.latitude, selectedLocation.longitude], 15);
      }
    }, [selectedLocation, map]);
    return null;
  };
}), { ssr: false });

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Import Icon synchronously since it's just a utility
let leafletIcon = null;
if (typeof window !== 'undefined') {
  try {
    const { Icon } = require('leaflet');
    leafletIcon = Icon;
  } catch (e) {
    console.warn('Leaflet Icon not available');
  }
}

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

const LocationsMap = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([-6.2088, 106.8456]); // Jakarta coordinates [lat, lng]
  const [mapZoom, setMapZoom] = useState(10);
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLocations, setTotalLocations] = useState(0);
  const locationsPerPage = 10;

  // Load locations on component mount
  useEffect(() => {
    loadLocations(currentPage);
  }, []);

  // Set mounted to true on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load locations when page changes
  useEffect(() => {
    if (currentPage > 1) {
      loadLocations(currentPage);
    }
  }, [currentPage]);

  // Category configuration with icons and colors
  const categoryConfig = {
    'Pabrik': {
      icon: FactoryIcon,
      color: theme.palette.primary?.main || '#1976d2',
      bgColor: theme.palette.primary?.light + '33' || '#e3f2fd'
    },
    'Supplier': {
      icon: BusinessIcon,
      color: theme.palette.secondary?.main || '#7b1fa2',
      bgColor: theme.palette.secondary?.light + '33' || '#f3e5f5'
    },
    'Dropshipper': {
      icon: LocalShippingIcon,
      color: theme.palette.warning?.main || '#f57c00',
      bgColor: theme.palette.warning?.light + '33' || '#fff3e0'
    },
    'Toko': {
      icon: StoreIcon,
      color: theme.palette.tertiary?.main || '#388e3c',
      bgColor: theme.palette.tertiary?.light + '33' || '#e8f5e8'
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  // Calculate map center and zoom based on locations or selected location
  useEffect(() => {
    if (selectedLocation && selectedLocation.latitude && selectedLocation.longitude) {
      // Center on selected location
      setMapCenter([selectedLocation.latitude, selectedLocation.longitude]);
      setMapZoom(15);
    } else if (locations.length > 0) {
      // Calculate center point from all locations
      let totalLat = 0;
      let totalLng = 0;
      let validLocations = 0;

      locations.forEach(location => {
        if (location.latitude && location.longitude) {
          totalLat += location.latitude;
          totalLng += location.longitude;
          validLocations++;
        }
      });

      if (validLocations > 0) {
        const centerLat = totalLat / validLocations;
        const centerLng = totalLng / validLocations;
        setMapCenter([centerLat, centerLng]);
        setMapZoom(locations.length === 1 ? 15 : 10);
      }
    }
  }, [locations, selectedLocation]);

  const loadLocations = async (page = 1) => {
    setLoading(true);
    try {
      const from = (page - 1) * locationsPerPage;
      const to = from + locationsPerPage - 1;
      const result = await getLocations(from, to);
      if (result.success) {
        setLocations(result.data);
        setTotalLocations(result.count);
      } else {
        console.error('Error loading locations:', result.error);
        setLocations([]);
      }
    } catch (error) {
      console.error('Error loading locations:', error);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  // Create custom marker icon
  const createCustomIcon = (category) => {
    const config = categoryConfig[category] || categoryConfig['Toko'];
    if (!leafletIcon) return null;

    return new leafletIcon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="${config.bgColor}" stroke="${config.color}" stroke-width="3"/>
          <circle cx="20" cy="15" r="6" fill="${config.color}"/>
          <rect x="18" y="21" width="4" height="8" fill="${config.color}"/>
        </svg>
      `)}`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });
  };

  // Location marker component
  const LocationMarker = ({ location, onMarkerClick }) => {
    const config = categoryConfig[location.category] || categoryConfig['Toko'];

    return (
      <Marker
        position={[location.latitude, location.longitude]}
        icon={createCustomIcon(location.category)}
        eventHandlers={{
          click: () => onMarkerClick(location),
        }}
      >
        <Popup>
          <div style={{ padding: '8px', maxWidth: '200px' }}>
            <h4 style={{
              margin: '0 0 4px 0',
              color: config.color,
              fontSize: '14px',
              fontWeight: 600
            }}>
              {location.name}
            </h4>
            <p style={{
              margin: '0 0 4px 0',
              fontSize: '12px',
              color: theme.palette.text.secondary
            }}>
              {location.category}
            </p>
            {location.description && (
              <p style={{
                margin: 0,
                fontSize: '12px',
                color: theme.palette.text.secondary
              }}>
                {location.description}
              </p>
            )}
          </div>
        </Popup>
      </Marker>
    );
  };

  const getCategoryIcon = (category) => {
    const config = categoryConfig[category] || categoryConfig['Toko'];
    const IconComponent = config.icon;
    return <IconComponent sx={{ color: config.color }} />;
  };

  const getCategoryColor = (category) => {
    const config = categoryConfig[category] || categoryConfig['Toko'];
    return config.color;
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // This function is no longer needed with React-Leaflet

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading locations...</Typography>
      </Box>
    );
  }

  if (locations.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <MapIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          No locations available
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Business locations will appear here once added in the admin panel.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Location List and Details */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
          <MapIcon />
          Lokasi Kami
        </Typography>

        {isMobile ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            {locations.map((location) => (
              <Card
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                sx={{
                  cursor: 'pointer',
                  bgcolor: selectedLocation?.id === location.id ? 'action.selected' : 'inherit',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    {getCategoryIcon(location.category)}
                    <Typography variant="h6" fontWeight={selectedLocation?.id === location.id ? 600 : 400}>
                      {location.name}
                    </Typography>
                  </Box>
                  <Chip
                    label={location.category}
                    size="small"
                    sx={{
                      bgcolor: getCategoryColor(location.category),
                      color: 'white',
                      mb: 1
                    }}
                  />
                  <Typography variant="body2">
                    {location.description || 'Tidak ada deskripsi'}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nama</TableCell>
                  <TableCell>Kategori</TableCell>
                  <TableCell>Deskripsi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locations.map((location) => (
                  <TableRow
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    sx={{
                      cursor: 'pointer',
                      bgcolor: selectedLocation?.id === location.id ? 'action.selected' : 'inherit',
                      '&:hover': {
                        bgcolor: 'action.hover'
                      }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getCategoryIcon(location.category)}
                        <Typography variant="body1" fontWeight={selectedLocation?.id === location.id ? 600 : 400}>
                          {location.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={location.category}
                        size="small"
                        sx={{
                          bgcolor: getCategoryColor(location.category),
                          color: 'white'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{
                        maxWidth: 300,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {location.description || 'No description'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Selected Location Details */}
        {selectedLocation && (
          <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: getCategoryColor(selectedLocation.category) }}>
                {getCategoryIcon(selectedLocation.category)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ color: getCategoryColor(selectedLocation.category) }}>
                  {selectedLocation.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedLocation.category}
                </Typography>
                {selectedLocation.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {selectedLocation.description}
                  </Typography>
                )}
              </Box>
            </Box>
          </Paper>
        )}

        {/* Pagination */}
        {totalLocations > locationsPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={Math.ceil(totalLocations / locationsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="medium"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Box>

      {/* Map Container */}
      {mounted ? (
        <Paper
          sx={{
            height: 400,
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          {loading ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.50'
              }}
            >
              <CircularProgress size={40} sx={{ mb: 2 }} />
              <Typography variant="body1">Memuat lokasi...</Typography>
            </Box>
          ) : locations.length === 0 ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.50',
                p: 3
              }}
            >
              <MapIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Tidak ada lokasi tersedia
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lokasi bisnis akan muncul di sini setelah ditambahkan di panel admin.
              </Typography>
            </Box>
          ) : (
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapController selectedLocation={selectedLocation} />
              {locations.map((location) => (
                location.latitude && location.longitude && (
                  <LocationMarker
                    key={location.id}
                    location={location}
                    onMarkerClick={(loc) => setSelectedLocation(loc)}
                  />
                )
              ))}
            </MapContainer>
          )}
        </Paper>
      ) : (
        <Paper
          sx={{
            height: 400,
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.50'
          }}
        >
          <Typography variant="body1">Memuat peta...</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default LocationsMap;