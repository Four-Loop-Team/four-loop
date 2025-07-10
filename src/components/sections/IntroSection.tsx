'use client';

import { Logo } from '@/components/brand';
import { Box, Container, Typography } from '@mui/material';

/**
 * Intro section component for the homepage/work page
 * Features the Four Loop Digital logo and company description in a styled container
 *
 * @component
 * @example
 * ```tsx
 * <IntroSection />
 * ```
 */
export const IntroSection = () => {
  return (
    <Box
      component='section'
      sx={{
        display: 'flex',
        alignItems: 'center',
        pt: 0, // Remove top padding to sit against header
        pb: { xs: 8, md: 12 }, // Keep bottom padding
        backgroundColor: '#353535', // Match navigation background
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
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(168, 230, 163, 0.2)',
            borderRadius: '16px',
            padding: { xs: 4, md: 6 },
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 4,
              position: 'relative',
            }}
          >
            {/* Left column - Text content */}
            <Box sx={{ flex: 1, order: { xs: 2, md: 1 } }}>
              <Typography
                variant='body1'
                sx={{
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.6,
                  color: '#E2E8F0',
                }}
              >
                At Four Loop Digital, we believe in building better brands
                through bold digital solutions. We remove roadblocks, elevate
                identities, and exceed expectations, because our clients&apos;
                success is our success. We lead with expertise, grow through
                reputation, and stay grounded in partnership, inside and out.
              </Typography>

              <Typography
                variant='h2'
                component='h1'
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 600,
                  color: '#A8E6A3',
                  lineHeight: 1.2,
                }}
              >
                Crafted Code. Thoughtful Design. Real Results.
              </Typography>
            </Box>

            {/* Vertical divider line */}
            <Box
              sx={{
                width: '1px',
                height: { xs: '1px', md: '200px' },
                background:
                  'linear-gradient(180deg, transparent 0%, #A8E6A3 50%, transparent 100%)',
                order: { xs: 1, md: 2 },
                display: { xs: 'none', md: 'block' },
              }}
            />

            {/* Right column - Logo */}
            <Box sx={{ flex: 1, order: { xs: 1, md: 3 } }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: { xs: 'auto', md: '300px' },
                }}
              >
                <Logo
                  sx={{
                    width: { xs: 200, sm: 250, md: 280 },
                    height: 'auto',
                    filter: 'brightness(1.1)',
                  }}
                  alt='Four Loop Digital - Building better brands through bold digital solutions'
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Bottom horizontal line */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, #A8E6A3 50%, transparent 100%)',
        }}
      />
    </Box>
  );
};
