'use client';

import { Box, Container, Typography } from '@mui/material';
import { Logo } from '@/components/brand';

/**
 * Intro section component for the homepage/work page
 * Features the Four Loop Digital logo and company description
 */
export const IntroSection = () => {
  return (
    <Box
      component='section'
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #1a2332 0%, #2d3748 100%)',
        color: 'white',
      }}
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
          }}
        >
          {/* Left column - Text content */}
          <Box sx={{ flex: 1, order: { xs: 2, md: 1 } }}>
            <Typography
              variant='body1'
              sx={{
                mb: 3,
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.6,
              }}
            >
              At Four Loop Digital, we believe in building better brands through
              bold digital solutions. We remove roadblocks, elevate identities,
              and exceed expectations, because our clients&apos; success is our
              success. We lead with expertise, grow through reputation, and stay
              grounded in partnership, inside and out.
            </Typography>

            <Typography
              variant='h2'
              component='h1'
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 600,
                color: '#A8E6A3', // Green accent color
                mb: 1,
              }}
            >
              Crafted Code. Thoughtful Design.
            </Typography>

            <Typography
              variant='h3'
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                fontWeight: 500,
                color: '#E2E8F0',
              }}
            >
              Real Results.
            </Typography>
          </Box>

          {/* Right column - Logo */}
          <Box sx={{ flex: 1, order: { xs: 1, md: 2 } }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: { xs: 'auto', md: '400px' },
              }}
            >
              <Logo
                sx={{
                  width: { xs: 200, sm: 250, md: 300 },
                  height: 'auto',
                  filter: 'brightness(1.1)',
                }}
                alt='Four Loop Digital - Building better brands through bold digital solutions'
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
