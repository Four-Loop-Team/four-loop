'use client';

import {
  colors,
  spacing,
  typography,
} from '@/components/system/BrandThemeProvider/BrandThemeProvider';
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
        pt: { xs: spacing.section.xs, md: spacing.section.md }, // Using section spacing
        pb: { xs: spacing.section.xs, md: spacing.section.md }, // Using section spacing
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
          px: { xs: spacing.component.sm, md: spacing.component.lg }, // Using component spacing
        }}
      >
        <Box
          sx={{
            backgroundColor: colors.highlight, // Primary brand color background
            borderRadius: '86px', // Same as intro section
            paddingTop: spacing.section.xs, // Using section spacing (64px)
            paddingBottom: spacing.section.xs, // Using section spacing (64px)
            paddingLeft: spacing.layout.lg, // Using layout spacing (similar to 58px)
            paddingRight: spacing.layout.lg, // Using layout spacing (similar to 58px)
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              borderBottom: `1px solid ${colors.textMuted}`,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'flex-start',
                gap: { xs: spacing.component.sm, md: spacing.component.lg }, // Using component spacing
                mb: { xs: spacing.layout.xs, md: spacing.layout.sm }, // Using layout spacing
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: { xs: spacing.component.sm, md: spacing.component.lg }, // Using component spacing
                }}
              >
                <Typography
                  variant='h2'
                  component='h2'
                  sx={{
                    fontSize: {
                      xs: typography.fontSize['4xl'],
                      md: typography.fontSize['6xl'],
                    }, // Using typography tokens
                    fontWeight: typography.fontWeight.regular, // Using typography tokens
                    color: colors.textDark, // Dark text for light background
                    lineHeight: typography.lineHeight.tight, // Using typography tokens
                  }}
                >
                  Get in Touch
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      xs: typography.fontSize.base,
                      md: typography.fontSize.xl,
                    }, // Using typography tokens
                    color: colors.textDark, // Secondary text color
                    fontWeight: typography.fontWeight.light, // Using typography tokens
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
              paddingTop: spacing.layout.sm, // Using layout spacing (48px)
              paddingBottom: spacing.layout.xs, // Using layout spacing (32px)
            }}
          >
            {/* Email Input */}
            <Box sx={{ mb: spacing.layout.xs, mt: spacing.component.lg }}>
              <TextField
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                variant='filled'
                label='Where can we reach you?'
                InputProps={{
                  placeholder: 'your.email@example.com',
                }}
                InputLabelProps={{
                  required: false,
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: colors.textDark,
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: colors.textDark,
                  },
                  '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                    color: colors.textDark,
                  },
                  '& .MuiInputBase-input': {
                    color: colors.textDark,
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: colors.textMuted,
                    opacity: 0.6,
                  },
                  '& .MuiFilledInput-root': {
                    backgroundColor: `rgba(53, 53, 53, 0.08)`,
                    '&:hover': {
                      backgroundColor: `rgba(53, 53, 53, 0.12)`,
                    },
                    '&.Mui-focused': {
                      backgroundColor: `rgba(53, 53, 53, 0.08)`,
                    },
                  },
                  '& .MuiFilledInput-underline:before': {
                    borderBottomColor: colors.textDark,
                  },
                  '& .MuiFilledInput-underline:hover:before': {
                    borderBottomColor: colors.textDark,
                  },
                  '& .MuiFilledInput-underline:after': {
                    borderBottomColor: colors.textDark,
                  },
                }}
              />
            </Box>

            {/* Textarea */}
            <Box sx={{ mb: spacing.layout.sm, mt: spacing.component.lg }}>
              <TextField
                id='filled-textarea'
                label='What can we help you build?'
                multiline
                variant='filled'
                value={project}
                onChange={(e) => setProject(e.target.value)}
                required
                fullWidth
                InputProps={{
                  placeholder: 'Tell us about your project...',
                }}
                InputLabelProps={{
                  required: false,
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: colors.textDark,
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: colors.textMuted,
                  },
                  '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                    color: colors.textMuted,
                  },
                  '& .MuiInputBase-input': {
                    color: colors.textDark,
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: colors.textMuted,
                    opacity: 0.6,
                  },
                  '& .MuiFilledInput-root': {
                    backgroundColor: `rgba(53, 53, 53, 0.08)`,
                    '&:hover': {
                      backgroundColor: `rgba(53, 53, 53, 0.12)`,
                    },
                    '&.Mui-focused': {
                      backgroundColor: `rgba(53, 53, 53, 0.08)`,
                    },
                  },
                  '& .MuiFilledInput-underline:before': {
                    borderBottomColor: colors.textDark,
                  },
                  '& .MuiFilledInput-underline:hover:before': {
                    borderBottomColor: colors.textDark,
                  },
                  '& .MuiFilledInput-underline:after': {
                    borderBottomColor: colors.textDark,
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
                  color: colors.textDark,
                  border: 'none',
                  borderRadius: spacing.component.lg, // Using spacing tokens (24px)
                  fontSize: typography.fontSize.lg, // Using typography tokens
                  fontWeight: typography.fontWeight.medium, // Using typography tokens
                  padding: `${spacing.component.md} ${spacing.component.lg}`, // Using spacing tokens (12px 24px becomes 16px 24px)
                  minWidth: '44px',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: spacing.component.xs, // Using spacing tokens
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  fontFamily: typography.fontFamily.primary, // Using typography tokens
                  textDecoration: 'none',
                  lineHeight: typography.lineHeight.tight, // Using typography tokens
                  '&:hover': {
                    opacity: 0.8,
                    transform: 'translateY(-1px)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                  // Force visibility with secondary color
                  '& *': {
                    color: colors.textDark,
                  },
                }}
              >
                <Box
                  component='span'
                  sx={{
                    color: colors.textDark,
                    fontSize: typography.fontSize.lg, // Using typography tokens
                    fontWeight: typography.fontWeight.medium, // Using typography tokens
                  }}
                >
                  Let&apos;s Talk
                </Box>
                <Box
                  component='span'
                  sx={{
                    fontSize: '1.2em',
                    color: colors.textDark,
                    marginLeft: spacing.component.sm, // Using spacing tokens
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
