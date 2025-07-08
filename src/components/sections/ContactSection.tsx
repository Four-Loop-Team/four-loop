'use client';

import { ButtonPrimary } from '@/components/ui/Button';
import { Box, Container, Typography } from '@mui/material';

/**
 * Contact section component
 * Features contact information and call-to-action
 */
export const ContactSection = () => {
  const handleLetsTalk = () => {
    // Handle contact form or navigation
    window.location.href = '/contact';
  };

  return (
    <Box
      id='contact'
      component='section'
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #A8E6A3 0%, #68D391 100%)',
        color: 'black',
        position: 'relative',
      }}
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          <Typography
            variant='h2'
            component='h2'
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 600,
              mb: 2,
            }}
          >
            Get In Touch
          </Typography>

          <Typography
            variant='subtitle1'
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              mb: 6,
              opacity: 0.8,
            }}
          >
            Tell us about your project
          </Typography>

          <Box sx={{ mb: 6 }}>
            <Typography
              variant='body1'
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.6,
                mb: 3,
              }}
            >
              Where can we reach you?
            </Typography>

            <Typography
              variant='body1'
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.6,
                mb: 4,
              }}
            >
              What can we help you build?
            </Typography>
          </Box>

          <ButtonPrimary
            onClick={handleLetsTalk}
            className='contact-button'
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              color: 'black',
            }}
          >
            Let&apos;s Talk
          </ButtonPrimary>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            mt: 8,
            pt: 4,
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant='body2'
            sx={{
              fontSize: '0.875rem',
              opacity: 0.7,
            }}
          >
            © 2024 Four Loop Digital
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
