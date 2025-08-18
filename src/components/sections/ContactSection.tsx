'use client';

import Form from '@/components/ui/Form/Form';
import Input from '@/components/ui/Input/Input';
import { useDesignSystem } from '@/lib/hooks';
import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface ContactFormData {
  email: string;
  message: string;
  // Security fields
  honeypot?: string;
  website?: string;
  formStartTime?: string;
}

/**
 * Contact section component with enhanced form backend integration
 * Features spam protection, validation, and email delivery via Resend
 *
 * @component
 * @example
 * ```tsx
 * <ContactSection />
 * ```
 */
export const ContactSection = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    message: '',
    honeypot: '',
    website: '',
    formStartTime: '', // Initialize as empty string to avoid hydration mismatch
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { colors, spacing, typography } = useDesignSystem();

  // Set form start time only on client side to avoid hydration mismatch
  useEffect(() => {
    setFormData((prev) => ({ ...prev, formStartTime: Date.now().toString() }));
  }, []);

  const handleInputChange =
    (field: keyof ContactFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setShowError(false);
    setShowSuccess(false);

    try {
      const submissionData = {
        ...formData,
        name: 'Contact Form User', // Default name since we don't collect it
        subject: 'New contact form submission',
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setShowSuccess(true);
        setFormData({
          email: '',
          message: '',
          honeypot: '',
          website: '',
          formStartTime: '', // Reset to empty string, will be set by useEffect
        });
        console.log('Contact form submitted successfully!');
      } else {
        setShowError(true);
        setErrorMessage(
          result.error || 'Failed to send message. Please try again.'
        );
        console.error('Contact form error:', result.error);
      }
    } catch (error) {
      setShowError(true);
      setErrorMessage(
        'Network error. Please check your connection and try again.'
      );
      console.error('Contact form network error:', error);
    } finally {
      setLoading(false);
    }
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
              borderBottom: `1px solid ${colors.text.primary}`,
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
          <Form
            title=''
            description=''
            submitText="Let's Talk"
            onSubmit={handleSubmit}
            loading={loading}
            showSuccess={showSuccess}
            showError={showError}
            successMessage="Thank you! We'll get back to you soon."
            errorMessage={errorMessage}
            accentBackground={false}
            buttonColor='dark'
            contained={false}
            sx={{
              paddingTop: spacing.layout.sm,
              paddingBottom: spacing.layout.xs,
            }}
          >
            {/* Honeypot field for spam protection */}
            <input
              type='text'
              name='website'
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete='off'
              value={formData.website}
              onChange={handleInputChange('website')}
            />

            <Box sx={{ mt: spacing.component.lg }}>
              <Input
                name='email'
                label='Where can we reach you?'
                type='email'
                value={formData.email}
                onChange={handleInputChange('email')}
                required
                placeholder='your.email@example.com'
                variant='filled'
              />
            </Box>

            <Box sx={{ mt: spacing.component.lg }}>
              <Input
                name='message'
                label='What can we help you build?'
                value={formData.message}
                onChange={handleInputChange('message')}
                required
                placeholder='Tell us about your project...'
                variant='filled'
                multiline
                rows={1}
              />
            </Box>
          </Form>

          {/* Copyright Footer - positioned to the right of the submit button area */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              mt: `-${spacing.component.xl}`, // Move up to align with button row
              position: 'relative',
              pr: spacing.component.md,
              pointerEvents: 'none', // Allow clicks to pass through
              '& > *': {
                pointerEvents: 'auto', // Re-enable pointer events for child elements
              },
            }}
          >
            <Typography
              variant='body2'
              sx={{
                fontSize: '0.875rem',
                opacity: 0.7,
                color: colors.text.primary,
                margin: 0,
              }}
            >
              © 2025 Four Loop Digital
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
