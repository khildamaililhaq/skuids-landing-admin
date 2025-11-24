import { useState } from 'react';
import { Box, Typography, Grid, Paper, TextField, Button } from '@mui/material';
import { uploadFileToStorage } from '../../lib/supabase';

export default function HeroEditor({ content, setContent, onError, onUploadNotice }) {
  const hero = content?.hero || {};
  const campaigns = hero?.campaigns || [];
  const [uploadingIndex, setUploadingIndex] = useState(null);

  const updateCampaignAt = (index, updated) => {
    const newCampaigns = [...campaigns];
    newCampaigns[index] = updated;
    setContent({ ...content, hero: { ...hero, campaigns: newCampaigns } });
  };

  const removeCampaignAt = (index) => {
    const newCampaigns = campaigns.filter((_, i) => i !== index);
    setContent({ ...content, hero: { ...hero, campaigns: newCampaigns } });
  };

  const addCampaign = () => {
    const newCampaign = { id: Date.now(), image: '', title: '', subtitle: '', buttonText: 'Learn More', buttonUrl: '' };
    setContent({ ...content, hero: { ...hero, campaigns: [...campaigns, newCampaign] } });
  };

  const handleUploadAt = async (index, file) => {
    try {
      if (!file) return;
      setUploadingIndex(index);
      const upload = await uploadFileToStorage(file, 'campaigns');
      if (upload.success) {
        const current = campaigns[index] || {};
        updateCampaignAt(index, { ...current, image: upload.url });
        onUploadNotice && onUploadNotice('Campaign image uploaded');
      } else {
        onError && onError(upload.error || 'Failed to upload image');
      }
    } catch (_err) {
      onError && onError('Failed to upload image');
    } finally {
      setUploadingIndex(null);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Hero Section</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            value={hero?.title || ''}
            onChange={(e) => setContent({ ...content, hero: { ...hero, title: e.target.value } })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Subtitle"
            multiline
            rows={2}
            value={hero?.subtitle || ''}
            onChange={(e) => setContent({ ...content, hero: { ...hero, subtitle: e.target.value } })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Button Text"
            value={hero?.buttonText || ''}
            onChange={(e) => setContent({ ...content, hero: { ...hero, buttonText: e.target.value } })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Button URL"
            value={hero?.buttonUrl || ''}
            onChange={(e) => setContent({ ...content, hero: { ...hero, buttonUrl: e.target.value } })}
            placeholder="/#products"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Second Button Text"
            value={hero?.secondButtonText || ''}
            onChange={(e) => setContent({ ...content, hero: { ...hero, secondButtonText: e.target.value } })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Second Button URL"
            value={hero?.secondButtonUrl || ''}
            onChange={(e) => setContent({ ...content, hero: { ...hero, secondButtonUrl: e.target.value } })}
            placeholder="/locations"
          />
        </Grid>

        {/* Video Background Section */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Video Background</Typography>
          <Box sx={{ mb: 3, p: 2, border: '1px solid rgba(0, 95, 115, 0.2)', borderRadius: 1, backgroundColor: 'background.default' }}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>Background Video Preview:</Typography>
            {hero?.backgroundVideo ? (
              <Box sx={{ height: 200, backgroundColor: 'black', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Box
                  component="video"
                  src={hero.backgroundVideo}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                  controls
                  muted
                />
              </Box>
            ) : (
              <Box sx={{ height: 200, backgroundColor: 'grey.200', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary">No video background set</Typography>
              </Box>
            )}
          </Box>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Video URL"
                value={hero?.backgroundVideo || ''}
                onChange={(e) => setContent({ ...content, hero: { ...hero, backgroundVideo: e.target.value } })}
                placeholder="https://example.com/video.mp4"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <input
                type="file"
                id="hero-video-upload"
                style={{ display: 'none' }}
                accept="video/*"
                onChange={async (e) => {
                  const inputEl = e.target;
                  const file = inputEl.files?.[0];
                  if (file) {
                    try {
                      setUploadingIndex('video');
                      const upload = await uploadFileToStorage(file, 'videos');
                      if (upload.success) {
                        setContent({ ...content, hero: { ...hero, backgroundVideo: upload.url } });
                        onUploadNotice && onUploadNotice('Video uploaded successfully');
                      } else {
                        onError && onError(upload.error || 'Failed to upload video');
                      }
                    } catch (err) {
                      onError && onError('Failed to upload video');
                    } finally {
                      setUploadingIndex(null);
                    }
                  }
                  inputEl.value = '';
                }}
              />
              <label htmlFor="hero-video-upload">
                <Button
                  component="span"
                  variant="outlined"
                  fullWidth
                  disabled={uploadingIndex === 'video'}
                >
                  {uploadingIndex === 'video' ? 'Uploading...' : 'Upload Video'}
                </Button>
              </label>
            </Grid>
          </Grid>
          <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>
            Supported formats: MP4, WebM, OGG. Video will autoplay, loop, and be muted for best user experience.
          </Typography>
        </Grid>

        {/* Image Background Section */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Image Background</Typography>
          <Box sx={{ mb: 3, p: 2, border: '1px solid rgba(0, 95, 115, 0.2)', borderRadius: 1, backgroundColor: 'background.default' }}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>Background Image Preview:</Typography>
            {hero?.backgroundImage ? (
              <Box sx={{ height: 200, backgroundImage: `url(${hero.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Box sx={{ backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', p: 2, borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="body2">Image Background Set</Typography>
                </Box>
              </Box>
            ) : (
              <Box sx={{ height: 200, backgroundColor: 'grey.200', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary">No image background set</Typography>
              </Box>
            )}
          </Box>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Image URL"
                value={hero?.backgroundImage || ''}
                onChange={(e) => setContent({ ...content, hero: { ...hero, backgroundImage: e.target.value } })}
                placeholder="https://example.com/background-image.jpg"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <input
                type="file"
                id="hero-image-upload"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={async (e) => {
                  const inputEl = e.target;
                  const file = inputEl.files?.[0];
                  if (file) {
                    try {
                      setUploadingIndex('image');
                      const upload = await uploadFileToStorage(file, 'images');
                      if (upload.success) {
                        setContent({ ...content, hero: { ...hero, backgroundImage: upload.url } });
                        onUploadNotice && onUploadNotice('Image uploaded successfully');
                      } else {
                        onError && onError(upload.error || 'Failed to upload image');
                      }
                    } catch (err) {
                      onError && onError('Failed to upload image');
                    } finally {
                      setUploadingIndex(null);
                    }
                  }
                  inputEl.value = '';
                }}
              />
              <label htmlFor="hero-image-upload">
                <Button
                  component="span"
                  variant="outlined"
                  fullWidth
                  disabled={uploadingIndex === 'image'}
                >
                  {uploadingIndex === 'image' ? 'Uploading...' : 'Upload Image'}
                </Button>
              </label>
            </Grid>
          </Grid>
          <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>
            Supported formats: JPG, PNG, WebP. Image will be displayed as full background with overlay text.
          </Typography>
        </Grid>

        {/* Hero Images Section */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Hero Images Slider</Typography>

          <Box sx={{ mb: 3, p: 2, border: '1px solid rgba(0, 95, 115, 0.2)', borderRadius: 1, backgroundColor: 'background.default' }}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>Hero Images Preview:</Typography>
            {hero?.heroImages && hero.heroImages.length > 0 ? (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {hero.heroImages.map((img, idx) => (
                  <Box key={idx} sx={{ width: 100, height: 60, backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 1, border: '1px solid rgba(0,0,0,0.1)' }} />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">No hero images set</Typography>
            )}
          </Box>

          {hero?.heroImages && hero.heroImages.map((image, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2, border: '1px solid rgba(0, 95, 115, 0.2)' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    label={`Hero Image ${index + 1} URL`}
                    value={image || ''}
                    onChange={(e) => {
                      const newImages = [...(hero.heroImages || [])];
                      newImages[index] = e.target.value;
                      setContent({ ...content, hero: { ...hero, heroImages: newImages } });
                    }}
                    placeholder="https://example.com/hero-image.jpg"
                  />
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <input
                      type="file"
                      id={`hero-image-${index}`}
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={async (e) => {
                        const inputEl = e.target;
                        const file = inputEl.files?.[0];
                        if (file) {
                          try {
                            setUploadingIndex(`hero-${index}`);
                            const upload = await uploadFileToStorage(file, 'images');
                            if (upload.success) {
                              const newImages = [...(hero.heroImages || [])];
                              newImages[index] = upload.url;
                              setContent({ ...content, hero: { ...hero, heroImages: newImages } });
                              onUploadNotice && onUploadNotice('Hero image uploaded');
                            } else {
                              onError && onError(upload.error || 'Failed to upload image');
                            }
                          } catch (err) {
                            onError && onError('Failed to upload image');
                          } finally {
                            setUploadingIndex(null);
                          }
                        }
                        inputEl.value = '';
                      }}
                    />
                    <label htmlFor={`hero-image-${index}`}>
                      <Button component="span" variant="outlined" size="small" disabled={uploadingIndex === `hero-${index}`}>
                        {uploadingIndex === `hero-${index}` ? 'Uploading...' : 'Upload Image'}
                      </Button>
                    </label>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button variant="outlined" color="error" onClick={() => {
                    const newImages = hero.heroImages.filter((_, i) => i !== index);
                    setContent({ ...content, hero: { ...hero, heroImages: newImages } });
                  }}>Remove</Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Button variant="outlined" onClick={() => {
              const newImages = [...(hero.heroImages || []), ''];
              setContent({ ...content, hero: { ...hero, heroImages: newImages } });
            }}>Add Hero Image</Button>
            <input
              type="file"
              id="hero-images-multiple"
              style={{ display: 'none' }}
              accept="image/*"
              multiple
              onChange={async (e) => {
                const inputEl = e.target;
                const files = Array.from(inputEl.files || []);
                if (files.length > 0) {
                  try {
                    setUploadingIndex('multiple-hero');
                    const uploadPromises = files.map(file => uploadFileToStorage(file, 'images'));
                    const results = await Promise.all(uploadPromises);
                    const successfulUploads = results.filter(result => result.success).map(result => result.url);
                    const newImages = [...(hero.heroImages || []), ...successfulUploads];
                    setContent({ ...content, hero: { ...hero, heroImages: newImages } });
                    onUploadNotice && onUploadNotice(`${successfulUploads.length} hero images uploaded`);
                    if (results.some(result => !result.success)) {
                      onError && onError('Some images failed to upload');
                    }
                  } catch (err) {
                    onError && onError('Failed to upload images');
                  } finally {
                    setUploadingIndex(null);
                  }
                }
                inputEl.value = '';
              }}
            />
            <label htmlFor="hero-images-multiple">
              <Button component="span" variant="outlined" disabled={uploadingIndex === 'multiple-hero'}>
                {uploadingIndex === 'multiple-hero' ? 'Uploading...' : 'Upload Multiple Images'}
              </Button>
            </label>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Campaign Section</Typography>

          <Box sx={{ mb: 3, p: 2, border: '1px solid rgba(0, 95, 115, 0.2)', borderRadius: 1, backgroundColor: 'background.default' }}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>Campaign Preview (showing first campaign):</Typography>
            {campaigns?.[0] && (
              <Box sx={{ height: 200, backgroundImage: `url(${campaigns[0].image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Box sx={{ backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', p: 2, borderRadius: 1, textAlign: 'center', maxWidth: '80%' }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>{campaigns[0].title || 'Campaign Title'}</Typography>
                  <Typography variant="body2">{campaigns[0].subtitle || 'Campaign subtitle will appear here'}</Typography>
                </Box>
              </Box>
            )}
          </Box>

          {campaigns.map((campaign, index) => (
            <Paper key={campaign.id} sx={{ p: 2, mb: 2, border: '1px solid rgba(0, 95, 115, 0.2)' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Campaign Image URL"
                    value={campaign.image || ''}
                    onChange={(e) => updateCampaignAt(index, { ...campaign, image: e.target.value })}
                    placeholder="https://example.com/campaign-image.jpg"
                  />
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <input
                      type="file"
                      id={`slide-image-${index}`}
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={async (e) => {
                        const inputEl = e.target;
                        const file = inputEl.files?.[0];
                        await handleUploadAt(index, file);
                        inputEl.value = '';
                      }}
                    />
                    <label htmlFor={`slide-image-${index}`}>
                      <Button component="span" variant="outlined" size="small" disabled={uploadingIndex === index}>
                        {uploadingIndex === index ? 'Uploading...' : 'Upload Campaign Image'}
                      </Button>
                    </label>
                  </Box>
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Campaign Title"
                    value={campaign.title || ''}
                    onChange={(e) => updateCampaignAt(index, { ...campaign, title: e.target.value })}
                    placeholder="Enter campaign title"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Campaign Subtitle"
                    value={campaign.subtitle || ''}
                    onChange={(e) => updateCampaignAt(index, { ...campaign, subtitle: e.target.value })}
                    placeholder="Enter campaign subtitle"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Button Text"
                    value={campaign.buttonText || ''}
                    onChange={(e) => updateCampaignAt(index, { ...campaign, buttonText: e.target.value })}
                    placeholder="Learn More"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Button URL"
                    value={campaign.buttonUrl || ''}
                    onChange={(e) => updateCampaignAt(index, { ...campaign, buttonUrl: e.target.value })}
                    placeholder="https://example.com"
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Button variant="outlined" color="error" onClick={() => removeCampaignAt(index)}>Remove</Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Button variant="outlined" onClick={addCampaign} sx={{ mt: 1 }}>Add New Campaign</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}


