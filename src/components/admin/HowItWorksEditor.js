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

export default function HowItWorksEditor({ data, onChange }) {
  const [editingStep, setEditingStep] = useState(null);

  const steps = data || [];

  const handleAddStep = () => {
    const newStep = {
      step: steps.length + 1,
      title: 'New Step',
      description: 'Step description'
    };
    onChange([...steps, newStep]);
  };

  const handleUpdateStep = (index, field, value) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleDeleteStep = (index) => {
    onChange(steps.filter((_, i) => i !== index));
  };

  return (
    <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, rgba(207, 170, 10, 0.05) 0%, rgba(255, 252, 245, 1) 100%)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
          How It Works Steps
        </Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddStep}
          variant="contained"
          size="small"
          sx={{ bgcolor: 'primary.main' }}
        >
          Add Step
        </Button>
      </Box>

      <Stack spacing={2}>
        {steps.map((step, index) => (
          <Card key={index} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  Step {step.step}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteStep(index)}
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
                    value={step.title}
                    onChange={(e) => handleUpdateStep(index, 'title', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Description"
                    value={step.description}
                    onChange={(e) => handleUpdateStep(index, 'description', e.target.value)}
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
