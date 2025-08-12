'use client';

import { useDesignSystem } from '@/lib/hooks';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

/**
 * Props for the Form component
 */
export interface FormProps {
  /** Form title */
  title?: string;
  /** Form description/subtitle */
  description?: string;
  /** Children to render inside the form */
  children: React.ReactNode;
  /** Submit button text */
  submitText?: string;
  /** Form submission handler */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  /** Whether the form is in a loading state */
  loading?: boolean;
  /** Additional styling */
  sx?: object;
  /** Whether to show the form in a container */
  contained?: boolean;
  /** Whether to use the accent background styling (default: true) */
  accentBackground?: boolean;
  /** ID attribute for the form section */
  id?: string;
}

/**
 * A comprehensive form component with consistent styling matching the ContactSection design.
 * Features yellow accent background, rounded corners, and proper spacing using design tokens.
 *
 * @component
 * @example
 * ```tsx
 * // Basic form with accent background (default)
 * <Form title="Contact Us" onSubmit={handleSubmit}>
 *   <Input label="Email" type="email" />
 *   <Input label="Message" multiline rows={4} />
 * </Form>
 *
 * // Form without accent background
 * <Form
 *   title="Sign Up"
 *   accentBackground={false}
 *   submitText="Create Account"
 *   onSubmit={handleSubmit}
 * >
 *   <Input label="Name" />
 *   <Input label="Email" type="email" />
 * </Form>
 * ```
 */
const Form: React.FC<FormProps> = ({
  title,
  description,
  children,
  submitText = "Let's Talk",
  onSubmit,
  loading = false,
  sx = {},
  contained = true,
  accentBackground = true,
  id,
}) => {
  const { colors, spacing, typography } = useDesignSystem();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(event);
  };

  const formContent = (
    <Box
      sx={{
        backgroundColor: accentBackground
          ? colors.background.accent
          : 'transparent',
        borderRadius: accentBackground ? '86px' : 0,
        paddingTop: accentBackground ? spacing.section.sm : 0,
        paddingBottom: accentBackground ? spacing.section.sm : 0,
        paddingLeft: accentBackground ? spacing.layout.lg : 0,
        paddingRight: accentBackground ? spacing.layout.lg : 0,
      }}
    >
      {/* Header Section */}
      {(title || description) && (
        <Box
          sx={{
            borderBottom: accentBackground
              ? `1px solid ${colors.text.muted}`
              : 'none',
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
              {title && (
                <Typography
                  variant='h2'
                  component='h2'
                  sx={{
                    fontSize: {
                      xs: typography.fontSize['4xl'],
                      md: typography.fontSize['6xl'],
                    },
                    fontWeight: typography.fontWeight.normal,
                    color: accentBackground ? colors.text.primary : 'inherit',
                    lineHeight: typography.lineHeight.tight,
                  }}
                >
                  {title}
                </Typography>
              )}

              {description && (
                <Typography
                  sx={{
                    fontSize: {
                      xs: typography.fontSize.base,
                      md: typography.fontSize.xl,
                    },
                    color: accentBackground
                      ? colors.text.primary
                      : colors.text.muted,
                    fontWeight: typography.fontWeight.light,
                  }}
                >
                  {description}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      )}

      {/* Form Section */}
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          paddingTop: title || description ? spacing.layout.sm : 0,
          paddingBottom: spacing.layout.xs,
          ...sx,
        }}
      >
        {/* Form Fields */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& > *:not(:last-child)': {
              mb: spacing.layout.xs,
              mt: spacing.component.lg,
            },
          }}
        >
          {children}
        </Box>

        {/* Submit Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: spacing.layout.sm,
          }}
        >
          <Box
            component='button'
            type='submit'
            disabled={loading}
            sx={{
              backgroundColor: 'transparent',
              color: accentBackground ? colors.text.primary : 'inherit',
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
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
              fontFamily: typography.fontFamily.primary,
              textDecoration: 'none',
              lineHeight: typography.lineHeight.tight,
              opacity: loading ? 0.6 : 1,
              '&:hover': {
                opacity: loading ? 0.6 : 0.8,
                transform: loading ? 'none' : 'translateY(-1px)',
              },
              '&:active': {
                transform: loading ? 'none' : 'translateY(0)',
              },
              '& *': {
                color: accentBackground ? colors.text.primary : 'inherit',
              },
            }}
          >
            <Box
              component='span'
              sx={{
                color: accentBackground ? colors.text.primary : 'inherit',
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.medium,
              }}
            >
              {loading ? 'Submitting...' : submitText}
            </Box>
            {!loading && (
              <Box
                component='span'
                sx={{
                  fontSize: '1.2em',
                  color: accentBackground ? colors.text.primary : 'inherit',
                  marginLeft: spacing.component.sm,
                }}
              >
                →
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );

  if (!contained) {
    return formContent;
  }

  return (
    <Box
      id={id}
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
        {formContent}
      </Container>
    </Box>
  );
};

Form.displayName = 'Form';

export default Form;
