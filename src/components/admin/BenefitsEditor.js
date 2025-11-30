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

export default function BenefitsEditor({ data, title, onChange }) {
  const benefits = data || [];

  const handleAddBenefit = () => {
    const newBenefit = {
      title: 'New Benefit',
      description: 'Benefit description'
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
          <Card key={index} sx={{ border: '1px solid', borderColor: 'divider' }}>
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Title"
                    value={benefit.title}
                    onChange={(e) => handleUpdateBenefit(index, 'title', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
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
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Paper>
  );
}
