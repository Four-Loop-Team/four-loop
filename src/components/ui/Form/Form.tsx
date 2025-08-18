'use client';

import Button from '@/components/ui/Button/Button';
import { useDesignSystem } from '@/lib/hooks';
import EastIcon from '@mui/icons-material/East';
import {
  Alert,
  Box,
  Container,
  Fade,
  FormControl,
  FormHelperText,
  Typography,
} from '@mui/material';
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
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  /** Whether the form is in a loading state */
  loading?: boolean;
  /** Additional styling */
  sx?: object;
  /** Whether to show the form in a container */
  contained?: boolean;
  /** Whether to use the accent background styling (default: true) */
  accentBackground?: boolean;
  /** Button color variant */
  buttonColor?: 'light' | 'dark';
  /** ID attribute for the form section */
  id?: string;
  /** Success message to show after form submission */
  successMessage?: string;
  /** Error message to show if form submission fails */
  errorMessage?: string;
  /** Whether to show success state */
  showSuccess?: boolean;
  /** Whether to show error state */
  showError?: boolean;
  /** Callback when form is successfully submitted */
  onSuccess?: () => void;
  /** Callback when form submission fails */
  onError?: (error: string) => void;
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
  buttonColor,
  id,
  successMessage = 'Thank you! Your message has been sent successfully.',
  errorMessage,
  showSuccess = false,
  showError = false,
  onSuccess,
  onError,
}) => {
  const { colors, spacing, typography } = useDesignSystem();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await onSubmit?.(event);
      onSuccess?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred';
      onError?.(errorMessage);
    }
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
              ? `1px solid ${colors.text.primary}`
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
      <FormControl
        component='form'
        onSubmit={handleSubmit}
        fullWidth
        error={showError}
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
              mt: spacing.component.lg,
            },
          }}
        >
          {children}
        </Box>

        {/* General Form Helper Text for accessibility */}
        {(showError || showSuccess) && (
          <FormHelperText
            sx={{
              textAlign: 'center',
              fontSize: typography.fontSize.xs,
              mt: spacing.component.xs,
              visibility: 'hidden', // Hidden but available for screen readers
            }}
          >
            {showSuccess
              ? 'Form submitted successfully'
              : showError
                ? 'Form contains errors'
                : ''}
          </FormHelperText>
        )}

        {/* Success Message */}
        {showSuccess && (
          <Fade in={showSuccess}>
            <Alert
              severity='success'
              sx={{
                mt: spacing.layout.sm,
                borderRadius: '12px',
                '& .MuiAlert-message': {
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                },
              }}
            >
              {successMessage}
            </Alert>
          </Fade>
        )}

        {/* Error Message */}
        {showError && errorMessage && (
          <Fade in={showError}>
            <Alert
              severity='error'
              sx={{
                mt: spacing.layout.sm,
                borderRadius: '12px',
                '& .MuiAlert-message': {
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                },
              }}
            >
              {errorMessage}
            </Alert>
          </Fade>
        )}

        {/* Submit Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: spacing.component.sm,
          }}
        >
          <Button
            type='submit'
            variant='text'
            color={buttonColor || (accentBackground ? 'dark' : 'light')}
            disabled={loading || showSuccess}
            size='large'
            endIcon={!loading ? <EastIcon fontSize='small' /> : undefined}
            sx={{
              color: colors.text.primary,
              fontWeight: typography.fontWeight.medium,
              fontFamily: typography.fontFamily.primary,
              textTransform: 'none',
              minWidth: '44px',
              minHeight: '44px',
            }}
          >
            {loading
              ? 'Submitting...'
              : showSuccess
                ? 'Message Sent!'
                : submitText}
          </Button>
        </Box>
      </FormControl>
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
