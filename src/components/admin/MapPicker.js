'use client';

'use client';

import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MyLocation as MyLocationIcon, Search as SearchIcon } from '@mui/icons-material';
import dynamic from 'next/dynamic';

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });

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

const MapPicker = ({ latitude, longitude, onLocationChange, onLocationSelect }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([-6.2088, 106.8456]); // Jakarta coordinates
  const [mapZoom, setMapZoom] = useState(10);

  // Update map center and zoom when coordinates change
  useEffect(() => {
    if (longitude && latitude) {
      setMapCenter([latitude, longitude]);
      setMapZoom(15);
    }
  }, [latitude, longitude]);

  // Create custom marker icon
  const createMarkerIcon = () => {
    if (!leafletIcon) return null;

    return new leafletIcon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="${theme.palette.warning.main}" stroke="white" stroke-width="3"/>
          <circle cx="20" cy="15" r="6" fill="white"/>
          <rect x="18" y="21" width="4" height="8" fill="white"/>
        </svg>
      `)}`,
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });
  };

  // Create draggable marker component
  const DraggableMarker = ({ position, onPositionChange }) => {
    const [currentPosition, setCurrentPosition] = useState(position);

    const handleDragEnd = (e) => {
      const newPos = e.target.getLatLng();
      const newPosition = [newPos.lat, newPos.lng];
      setCurrentPosition(newPosition);
      onPositionChange(newPosition);
    };

    useEffect(() => {
      setCurrentPosition(position);
    }, [position]);

    return (
      <Marker
        position={currentPosition}
        icon={createMarkerIcon()}
        draggable={true}
        eventHandlers={{
          dragend: handleDragEnd,
        }}
      />
    );
  };



  const searchLocation = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    try {
      // Use Nominatim geocoding (OpenStreetMap)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&countrycodes=id`
      );

      if (response.ok) {
        const results = await response.json();
        setSearchResults(results);
      } else {
        console.error('Geocoding search failed');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching location:', error);
      setSearchResults([]);
    }

    setIsSearching(false);
  };

  const selectLocation = (result) => {
    // Nominatim format
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    const name = result.display_name;

    setSelectedLocation({
      name: name,
      latitude: lat,
      longitude: lng
    });

    // Update parent component
    onLocationChange(lat, lng);
    onLocationSelect?.(result);

    // Update map center and zoom
    setMapCenter([lat, lng]);
    setMapZoom(15);

    setSearchResults([]);
    setSearchQuery(name);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setSelectedLocation({
            name: 'Current Location',
            latitude: lat,
            longitude: lng
          });

          onLocationChange(lat, lng);

          // Update map center and zoom
          setMapCenter([lat, lng]);
          setMapZoom(15);
        },
        (error) => {
          console.error('Error getting current location:', error);
          alert('Unable to get current location. Please check your browser permissions.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <Box>
      {/* Search Section */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
          Location Search
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search for a location (e.g., Jakarta, Bandung)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
            size="small"
          />
          <Button
            variant="contained"
            onClick={searchLocation}
            disabled={isSearching || !searchQuery.trim()}
            startIcon={isSearching ? <CircularProgress size={16} /> : <SearchIcon />}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
          <Button
            variant="outlined"
            onClick={getCurrentLocation}
            startIcon={<MyLocationIcon />}
            data-testid="current-location-btn"
          >
            Current
          </Button>
        </Box>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
            {searchResults.map((result, index) => (
              <Paper
                key={index}
                sx={{
                  p: 1,
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
                onClick={() => selectLocation(result)}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {result.place_name ? result.place_name.split(',')[0] : result.display_name.split(',')[0]}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {result.place_name || result.display_name}
                </Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Paper>

      {/* Interactive Map */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
          Interactive Map
          <Typography variant="caption" sx={{ ml: 1, color: 'success.main' }}>
            • Drag the marker to adjust location
          </Typography>
        </Typography>

        <Box
          sx={{
            width: '100%',
            height: 400,
            borderRadius: 1,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            position: 'relative'
          }}
        >
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
            onClick={(e) => {
              const { lat, lng } = e.latlng;
              onLocationChange(lat, lng);
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {(latitude && longitude) && (
              <DraggableMarker
                position={[latitude, longitude]}
                onPositionChange={(newPos) => onLocationChange(newPos[0], newPos[1])}
              />
            )}
          </MapContainer>
        </Box>

        {/* Instructions */}
        <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="body2" sx={{ color: 'info.contrastText', fontWeight: 500 }}>
            📍 How to use:
          </Typography>
          <Typography variant="body2" sx={{ color: 'info.contrastText', mt: 0.5 }}>
            • Click on the map to place a marker
            • Drag the marker to adjust the exact location
            • Use search above to find specific places
            • Click "Current" to use your current location
            • Powered by OpenStreetMap
          </Typography>
        </Box>

        {/* Coordinate Display */}
        {(latitude && longitude) && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
              <strong>Coordinates:</strong> {latitude}, {longitude}
            </Typography>
            {selectedLocation && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Location:</strong> {selectedLocation.name}
              </Typography>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default MapPicker;