'use client';

import { Box, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';

/**
 * Contact section component
 * Features contact form in a rounded box matching the intro section design
 *
 * @component
 * @example
 * ```tsx
 * <ContactSection />
 * ```
 */
export const ContactSection = () => {
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // TODO: Implement form submission logic
  };

  return (
    <Box
      id='contact'
      component='section'
      sx={{
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 8, md: 12 },
        pb: { xs: 8, md: 12 },
        backgroundColor: 'transparent',
        color: 'white',
        position: 'relative',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: { xs: '100%', md: '1160px' }, // Limit to 1160px on desktop
          margin: '0 auto', // Center the container
          px: { xs: 2, md: 3 }, // Add some padding
        }}
      >
        <Box
          sx={{
            backgroundColor: '#e2e891', // Primary brand color background
            borderRadius: '86px', // Same as intro section
            paddingTop: '64px',
            paddingBottom: '64px',
            paddingLeft: '58px',
            paddingRight: '58px',
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              borderBottom: '1px solid #353535',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'flex-start',
                gap: { xs: 2, md: 3 },
                mb: { xs: 4, md: 6 },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: { xs: 2, md: 3 },
                }}
              >
                <Typography
                  variant='h2'
                  component='h2'
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    fontWeight: 400,
                    color: '#353535', // Secondary text color
                    lineHeight: 1,
                  }}
                >
                  Get in Touch
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    color: '#353535', // Secondary text color
                    fontWeight: 300,
                  }}
                >
                  /&nbsp;&nbsp;&nbsp;&nbsp;Tell us about your project
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Form Section */}
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
              paddingTop: '48px', // Increased for floating label space
              paddingBottom: '32px',
            }}
          >
            {/* Email Input */}
            <Box sx={{ mb: 4, mt: 3 }}>
              <TextField
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                variant='filled'
                label='Where can we reach you?'
                placeholder='your.email@example.com'
                InputLabelProps={{
                  required: false,
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: '#353535',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#666666',
                  },
                  '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                    color: '#666666',
                  },
                  '& .MuiInputBase-input': {
                    color: '#353535',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#353535',
                    opacity: 0.7,
                  },
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'rgba(53, 53, 53, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(53, 53, 53, 0.15)',
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(53, 53, 53, 0.1)',
                    },
                  },
                  '& .MuiFilledInput-underline:before': {
                    borderBottomColor: '#353535',
                  },
                  '& .MuiFilledInput-underline:hover:before': {
                    borderBottomColor: '#353535',
                  },
                  '& .MuiFilledInput-underline:after': {
                    borderBottomColor: '#353535',
                  },
                }}
              />
            </Box>

            {/* Textarea */}
            <Box sx={{ mb: 6, mt: 3 }}>
              <TextField
                id='filled-textarea'
                label='What can we help you build?'
                placeholder='Tell us about your project...'
                multiline
                variant='filled'
                value={project}
                onChange={(e) => setProject(e.target.value)}
                required
                fullWidth
                InputLabelProps={{
                  required: false,
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: '#353535',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#666666',
                  },
                  '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                    color: '#666666',
                  },
                  '& .MuiInputBase-input': {
                    color: '#353535',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#353535',
                    opacity: 0.7,
                  },
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'rgba(53, 53, 53, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(53, 53, 53, 0.15)',
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(53, 53, 53, 0.1)',
                    },
                  },
                  '& .MuiFilledInput-underline:before': {
                    borderBottomColor: '#353535',
                  },
                  '& .MuiFilledInput-underline:hover:before': {
                    borderBottomColor: '#353535',
                  },
                  '& .MuiFilledInput-underline:after': {
                    borderBottomColor: '#353535',
                  },
                }}
              />
            </Box>

            {/* Submit Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                component='button'
                type='submit'
                sx={{
                  backgroundColor: 'transparent',
                  color: '#353535',
                  border: 'none',
                  borderRadius: '24px',
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  padding: '12px 24px',
                  minWidth: '44px',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  fontFamily: 'inherit',
                  textDecoration: 'none',
                  lineHeight: 1,
                  '&:hover': {
                    opacity: 0.8,
                    transform: 'translateY(-1px)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                  // Force visibility with secondary color
                  '& *': {
                    color: '#353535',
                  },
                }}
              >
                <Box
                  component='span'
                  sx={{
                    color: '#353535',
                    fontSize: '1.125rem',
                    fontWeight: 500,
                  }}
                >
                  Let&apos;s Talk
                </Box>
                <Box
                  component='span'
                  sx={{
                    fontSize: '1.2em',
                    color: '#353535',
                    marginLeft: '8px',
                  }}
                >
                  →
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
