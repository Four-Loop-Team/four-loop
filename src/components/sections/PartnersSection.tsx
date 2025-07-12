'use client';

import { Box, Container, Typography } from '@mui/material';

/**
 * Partners section component
 * Features information about company partnerships and collaborations
 *
 * @component
 * @example
 * ```tsx
 * <PartnersSection />
 * ```
 */
export const PartnersSection = () => {
  return (
    <Box
      component='section'
      sx={{
        py: { xs: 8, md: 12 },
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
          px: { xs: 2, md: '82px' }, // Add 82px padding on desktop
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            mb: { xs: 6, md: 8 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'flex-start',
              gap: { xs: 2, md: 3 },
              mb: { xs: 4, md: 6 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                gap: { xs: 2, md: 3 },
              }}
            >
              <Typography
                variant='h2'
                component='h2'
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 400,
                  color: 'white',
                  lineHeight: 1,
                }}
              >
                Partners
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: 'white',
                  fontWeight: 300,
                }}
              >
                /&nbsp;&nbsp;&nbsp;&nbsp;Companies we love
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            textAlign: 'left',
            borderTop: '1px solid white',
            borderBottom: '1px solid white',
            py: 4,
          }}
        >
          <Typography
            variant='body1'
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              lineHeight: 1.7,
              color: 'white',
            }}
          >
            <span style={{ color: '#e2e891' }}>
              Partnerships That Shaped Our Journey.
            </span>{' '}
            Over the past 25 years, we&apos;ve collaborated with teams across
            industries to bring ideas to life, through thoughtful design,
            reliable code, and a lot of listening. The logos behind us represent
            more than just brands; they reflect relationships we&apos;ve built,
            problems we&apos;ve solved together, and the trust we&apos;ve been
            fortunate to earn along the way.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
