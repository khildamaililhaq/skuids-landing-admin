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
  Avatar
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import { uploadFileToStorage } from '../../lib/supabase';
import FileUpload from '../ui/FileUpload';

// Common emoji icons for benefits
const BENEFIT_EMOJIS = [
  '📊', '💰', '🤝', '🎯', '🎁', '📋', '🌐', '📚',
  '⭐', '🚀', '💡', '✨', '🏆', '💎', '🔥', '🌟',
  '📈', '💻', '🎨', '🎯', '👥', '🔐', '⚡', '🌈'
];

export default function BenefitsEditor({ data, title, onChange }) {
  const benefits = data || [];
  const [uploading, setUploading] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleAddBenefit = () => {
    const newBenefit = {
      id: Date.now(),
      title: 'New Benefit',
      description: 'Benefit description',
      icon: '⭐',
      image: ''
    };
    onChange([...benefits, newBenefit]);
  };

  const handleUpdateBenefit = (index, field, value) => {
    const updated = [...benefits];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleDeleteBenefit = (index) => {
    onChange(benefits.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (index, file) => {
    if (!file) return;

    setUploading(index);
    try {
      const result = await uploadFileToStorage(file, 'benefits');
      if (result.success) {
        handleUpdateBenefit(index, 'image', result.url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(null);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, rgba(207, 170, 10, 0.05) 0%, rgba(255, 252, 245, 1) 100%)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
          {title}
        </Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddBenefit}
          variant="contained"
          size="small"
          sx={{ bgcolor: 'primary.main' }}
        >
          Add
        </Button>
      </Box>

      <Stack spacing={2}>
        {benefits.map((benefit, index) => (
          <Card key={benefit.id || index} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Benefit {index + 1}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteBenefit(index)}
                  sx={{ color: 'error.main' }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Grid container spacing={2}>
                {/* Icon/Emoji Selector */}
                <Grid item xs={12} sm={3}>
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>
                      Icon
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      {BENEFIT_EMOJIS.map((emoji) => (
                        <Button
                          key={emoji}
                          onClick={() => handleUpdateBenefit(index, 'icon', emoji)}
                          sx={{
                            fontSize: '1.5rem',
                            minWidth: 'auto',
                            p: 1,
                            border: benefit.icon === emoji ? '2px solid' : '1px solid',
                            borderColor: benefit.icon === emoji ? 'primary.main' : 'divider',
                            bgcolor: benefit.icon === emoji ? 'primary.light' : 'transparent',
                          }}
                        >
                          {emoji}
                        </Button>
                      ))}
                    </Box>
                  </Box>
                </Grid>

                {/* Title */}
                <Grid item xs={12} sm={9}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Title"
                    value={benefit.title}
                    onChange={(e) => handleUpdateBenefit(index, 'title', e.target.value)}
                    variant="outlined"
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Description"
                    value={benefit.description}
                    onChange={(e) => handleUpdateBenefit(index, 'description', e.target.value)}
                    multiline
                    rows={2}
                    variant="outlined"
                  />
                </Grid>

                {/* Image Upload */}
                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>
                      Card Image
                    </Typography>
                    <FileUpload
                      onFileSelect={(file) => handleImageUpload(index, file)}
                      loading={uploading === index}
                      accept="image/*"
                      helperText="Upload a card image (optional)"
                    />
                  </Box>

                  {/* Image Preview */}
                  {benefit.image && (
                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        textAlign: 'center',
                        bgcolor: 'background.default'
                      }}
                    >
                      <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'text.secondary' }}>
                        Current Image
                      </Typography>
                      <Box
                        component="img"
                        src={benefit.image}
                        alt={benefit.title}
                        sx={{
                          maxWidth: '100%',
                          maxHeight: 200,
                          borderRadius: 1,
                          objectFit: 'cover'
                        }}
                      />
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleUpdateBenefit(index, 'image', '')}
                        sx={{ mt: 1 }}
                      >
                        Remove Image
                      </Button>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Paper>
  );
}
