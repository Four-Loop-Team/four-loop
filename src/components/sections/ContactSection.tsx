'use client';

import { ButtonPrimary } from '@/components/ui/Button';
import { Box, Container, Typography } from '@mui/material';

/**
 * Contact section component
 * Features contact information and call-to-action in a rounded box that overlaps the Partners section
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
        position: 'relative',
        pt: { xs: 0, md: 0 },
        pb: { xs: 8, md: 12 },
        mt: { xs: -4, md: -8 }, // Negative margin to overlap Partners section
        zIndex: 10,
      }}
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            background: 'linear-gradient(135deg, #A8E6A3 0%, #68D391 100%)',
            borderRadius: { xs: '24px', md: '32px' },
            py: { xs: 6, md: 8 },
            px: { xs: 4, md: 6 },
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            position: 'relative',
            color: 'black',
          }}
        >
          <Typography
            variant='h2'
            component='h2'
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 600,
              mb: 2,
              color: 'black',
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
              color: 'black',
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
                color: 'black',
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
                color: 'black',
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
              border: '2px solid rgba(0, 0, 0, 0.2)',
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
            textAlign: 'center',
          }}
        >
          <Typography
            variant='body2'
            sx={{
              fontSize: '0.875rem',
              opacity: 0.7,
              color: 'white',
            }}
          >
            © 2024 Four Loop Digital
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
