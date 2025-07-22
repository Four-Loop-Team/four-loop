'use client';

import { Input } from '@/components/ui/Input';
import { useDesignSystem } from '@/lib/hooks';
import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';

/**
 * Enhanced Contact section component using custom Input component
 * This demonstrates how the ContactSection could be migrated to use our custom Input component
 * instead of Material-UI TextField
 *
 * @component
 * @example
 * ```tsx
 * <ContactSectionWithCustomInput />
 * ```
 */
export const ContactSectionWithCustomInput = () => {
  const { colors, spacing, typography } = useDesignSystem();
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // TODO: Implement actual form submission logic
  };

  return (
    <Box
      id='contact'
      component='section'
      sx={{
        display: 'flex',
        alignItems: 'center',
        pt: { xs: spacing.section.sm, md: spacing.section.md },
        pb: { xs: spacing.section.sm, md: spacing.section.md },
        backgroundColor: 'transparent',
        color: 'white',
        position: 'relative',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: { xs: '100%', md: '1160px' },
          margin: '0 auto',
          px: { xs: spacing.component.sm, md: spacing.component.lg },
        }}
      >
        <Box
          sx={{
            backgroundColor: colors.background.accent,
            borderRadius: '86px',
            paddingTop: spacing.section.sm,
            paddingBottom: spacing.section.sm,
            paddingLeft: spacing.layout.lg,
            paddingRight: spacing.layout.lg,
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              textAlign: 'center',
              paddingBottom: spacing.layout.xs,
              borderBottom: `1px solid ${colors.text.muted}`,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'flex-start',
                gap: { xs: spacing.component.sm, md: spacing.component.lg },
                mb: { xs: spacing.layout.xs, md: spacing.layout.sm },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: { xs: spacing.component.sm, md: spacing.component.lg },
                }}
              >
                <Typography
                  variant='h2'
                  component='h2'
                  sx={{
                    fontSize: {
                      xs: typography.fontSize['4xl'],
                      md: typography.fontSize['6xl'],
                    },
                    fontWeight: typography.fontWeight.normal,
                    color: colors.text.primary,
                    lineHeight: typography.lineHeight.tight,
                  }}
                >
                  Get in Touch
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      xs: typography.fontSize.base,
                      md: typography.fontSize.xl,
                    },
                    color: colors.text.primary,
                    fontWeight: typography.fontWeight.light,
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
              paddingTop: spacing.layout.sm,
              paddingBottom: spacing.layout.xs,
            }}
          >
            {/* Email Input - Using Custom Input Component */}
            <Box sx={{ mb: spacing.layout.xs, mt: spacing.component.lg }}>
              <Input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                label='Where can we reach you?'
                placeholder='your.email@example.com'
                variant='filled'
                inputSize='lg'
                className='custom-filled-input'
              />
            </Box>

            {/* Textarea - Using Custom Input Component */}
            <Box sx={{ mb: spacing.layout.sm, mt: spacing.component.lg }}>
              <Input
                multiline
                rows={4}
                label='What can we help you build?'
                value={project}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setProject(e.target.value)
                }
                required
                placeholder='Tell us about your project...'
                variant='filled'
                inputSize='lg'
                className='custom-filled-textarea'
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
                  borderRadius: spacing.component.lg,
                  fontSize: typography.fontSize.lg,
                  fontWeight: typography.fontWeight.medium,
                  padding: `${spacing.component.md} ${spacing.component.lg}`,
                  minWidth: '44px',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: spacing.component.xs,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  fontFamily: typography.fontFamily.primary,
                  textDecoration: 'none',
                  lineHeight: typography.lineHeight.tight,
                  '&:hover': {
                    opacity: 0.8,
                    transform: 'translateY(-1px)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                }}
              >
                <Box
                  component='span'
                  sx={{
                    color: colors.text.primary,
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.medium,
                  }}
                >
                  Let&apos;s Talk
                </Box>
                <Box
                  component='span'
                  sx={{
                    fontSize: '1.2em',
                    color: colors.text.primary,
                    marginLeft: spacing.component.sm,
                  }}
                >
                  →
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Custom CSS for styling the filled inputs to match original design */}
      <style jsx>{`
        :global(.custom-filled-input input) {
          color: #353535 !important;
          background-color: rgba(53, 53, 53, 0.08) !important;
        }
        :global(.custom-filled-input input:hover) {
          background-color: rgba(53, 53, 53, 0.12) !important;
        }
        :global(.custom-filled-input input:focus) {
          background-color: rgba(53, 53, 53, 0.08) !important;
        }
        :global(.custom-filled-input label) {
          color: #353535 !important;
        }
        :global(.custom-filled-input input::placeholder) {
          color: #6b7280 !important;
          opacity: 0.6 !important;
        }
        :global(.custom-filled-textarea textarea) {
          color: #353535 !important;
          background-color: rgba(53, 53, 53, 0.08) !important;
        }
        :global(.custom-filled-textarea textarea:hover) {
          background-color: rgba(53, 53, 53, 0.12) !important;
        }
        :global(.custom-filled-textarea textarea:focus) {
          background-color: rgba(53, 53, 53, 0.08) !important;
        }
        :global(.custom-filled-textarea label) {
          color: #353535 !important;
        }
        :global(.custom-filled-textarea textarea::placeholder) {
          color: #6b7280 !important;
          opacity: 0.6 !important;
        }
      `}</style>
    </Box>
  );
};
