'use client';

import Input from '@/components/ui/Input/Input';
import { useDesignSystem } from '@/lib/hooks';
import { Box, Container, Typography } from '@mui/material';
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
  const { colors, spacing, typography } = useDesignSystem();

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
        pt: { xs: spacing.section.sm, md: spacing.section.md }, // Using section spacing
        pb: { xs: spacing.section.sm, md: spacing.section.md }, // Using section spacing
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
            backgroundColor: colors.background.accent, // Primary brand color background
            borderRadius: '86px', // Same as intro section
            paddingTop: spacing.section.sm, // Using section spacing (64px)
            paddingBottom: spacing.section.sm, // Using section spacing (64px)
            paddingLeft: spacing.layout.lg, // Using layout spacing (similar to 58px)
            paddingRight: spacing.layout.lg, // Using layout spacing (similar to 58px)
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              borderBottom: `1px solid ${colors.text.muted}`,
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
                    fontWeight: typography.fontWeight.normal, // Using typography tokens
                    color: colors.text.primary, // Dark text for light background
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
                    color: colors.text.primary, // Secondary text color
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
              <Input
                type='email'
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
                label='Where can we reach you?'
                placeholder='your.email@example.com'
                variant='filled'
              />
            </Box>

            {/* Textarea */}
            <Box sx={{ mb: spacing.layout.sm, mt: spacing.component.lg }}>
              <Input
                label='What can we help you build?'
                multiline
                variant='filled'
                value={project}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setProject(e.target.value)
                }
                required
                placeholder='Tell us about your project...'
                rows={1}
              />
            </Box>

            {/* Submit Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                component='button'
                type='submit'
                sx={{
                  backgroundColor: 'transparent',
                  color: colors.text.primary,
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
                    color: colors.text.primary,
                  },
                }}
              >
                <Box
                  component='span'
                  sx={{
                    color: colors.text.primary,
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
                    color: colors.text.primary,
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
