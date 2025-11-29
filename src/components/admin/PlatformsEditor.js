import { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Card,
  CardContent,
  Stack,
  Chip
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';

export default function PlatformsEditor({ data, onChange }) {
  const platforms = data || [];

  const handleAddPlatform = () => {
    const newPlatform = {
      name: 'New Platform',
      description: 'Platform description',
      features: [],
      earning_potential: '$0'
    };
    onChange([...platforms, newPlatform]);
  };

  const handleUpdatePlatform = (index, field, value) => {
    const updated = [...platforms];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleDeletePlatform = (index) => {
    onChange(platforms.filter((_, i) => i !== index));
  };

  const handleAddFeature = (platformIndex) => {
    const updated = [...platforms];
    if (!updated[platformIndex].features) {
      updated[platformIndex].features = [];
    }
    updated[platformIndex].features.push('New Feature');
    onChange(updated);
  };

  const handleUpdateFeature = (platformIndex, featureIndex, value) => {
    const updated = [...platforms];
    updated[platformIndex].features[featureIndex] = value;
    onChange(updated);
  };

  const handleDeleteFeature = (platformIndex, featureIndex) => {
    const updated = [...platforms];
    updated[platformIndex].features.splice(featureIndex, 1);
    onChange(updated);
  };

  return (
    <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
          Platforms
        </Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddPlatform}
          variant="contained"
          size="small"
          sx={{ bgcolor: 'primary.main' }}
        >
          Add Platform
        </Button>
      </Box>

      <Stack spacing={2}>
        {platforms.map((platform, index) => (
          <Card key={index} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  {platform.name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleDeletePlatform(index)}
                  sx={{ color: 'error.main' }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Name"
                    value={platform.name}
                    onChange={(e) => handleUpdatePlatform(index, 'name', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Earning Potential"
                    value={platform.earning_potential || ''}
                    onChange={(e) => handleUpdatePlatform(index, 'earning_potential', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Description"
                    value={platform.description}
                    onChange={(e) => handleUpdatePlatform(index, 'description', e.target.value)}
                    multiline
                    rows={2}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                      Features
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                      {(platform.features || []).map((feature, fIndex) => (
                        <Chip
                          key={fIndex}
                          label={feature}
                          onDelete={() => handleDeleteFeature(index, fIndex)}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                      <Button
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => handleAddFeature(index)}
                        sx={{ textTransform: 'none', fontSize: '0.75rem' }}
                      >
                        Add Feature
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Paper>
  );
}
