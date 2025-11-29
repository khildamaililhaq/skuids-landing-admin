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
  Stack
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';

export default function TestimonialsEditor({ data, onChange }) {
  const testimonials = data || [];

  const handleAddTestimonial = () => {
    const newTestimonial = {
      name: 'Name',
      role: 'Host',
      quote: 'Testimonial text',
      earnings: '$XXX/month'
    };
    onChange([...testimonials, newTestimonial]);
  };

  const handleUpdateTestimonial = (index, field, value) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleDeleteTestimonial = (index) => {
    onChange(testimonials.filter((_, i) => i !== index));
  };

  return (
    <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
          Testimonials
        </Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddTestimonial}
          variant="contained"
          size="small"
          sx={{ bgcolor: 'primary.main' }}
        >
          Add Testimonial
        </Button>
      </Box>

      <Stack spacing={2}>
        {testimonials.map((testimonial, index) => (
          <Card key={index} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  {testimonial.name || `Testimonial ${index + 1}`}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteTestimonial(index)}
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
                    value={testimonial.name}
                    onChange={(e) => handleUpdateTestimonial(index, 'name', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Role"
                    value={testimonial.role}
                    onChange={(e) => handleUpdateTestimonial(index, 'role', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Earnings"
                    value={testimonial.earnings || ''}
                    onChange={(e) => handleUpdateTestimonial(index, 'earnings', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Avatar URL"
                    value={testimonial.avatar || ''}
                    onChange={(e) => handleUpdateTestimonial(index, 'avatar', e.target.value)}
                    variant="outlined"
                    placeholder="/avatars/user.jpg"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Quote"
                    value={testimonial.quote}
                    onChange={(e) => handleUpdateTestimonial(index, 'quote', e.target.value)}
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Paper>
  );
}
