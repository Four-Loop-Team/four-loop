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
        background: '#1a2332',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top horizontal line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, #A8E6A3 50%, transparent 100%)',
        }}
      />

      {/* Background pattern overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 1px,
            rgba(168, 230, 163, 0.05) 1px,
            rgba(168, 230, 163, 0.05) 40px
          )`,
          pointerEvents: 'none',
        }}
      />

      <Container
        maxWidth={false}
        sx={{
          maxWidth: { xs: '100%', md: '1160px' }, // Limit to 1160px on desktop
          margin: '0 auto', // Center the container
          px: { xs: 2, md: 3 }, // Add some padding
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant='h2'
            component='h2'
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 3,
              color: 'white',
            }}
          >
            Partners
          </Typography>

          <Typography
            variant='subtitle1'
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              color: '#A8E6A3',
              mb: 2,
              fontWeight: 500,
            }}
          >
            Companies we love
          </Typography>
        </Box>

        <Box
          sx={{
            maxWidth: '900px',
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          <Typography
            variant='h3'
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 600,
              color: '#A8E6A3',
              mb: 4,
              lineHeight: 1.3,
            }}
          >
            Partnerships That Shaped Our Journey.
          </Typography>

          <Typography
            variant='body1'
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              lineHeight: 1.7,
              color: '#E2E8F0',
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Over the past 25 years, we&apos;ve collaborated with teams across
            industries to bring ideas to life, through thoughtful design,
            reliable code, and a lot of listening. The logos behind us represent
            more than just brands; they reflect relationships we&apos;ve built,
            problems we&apos;ve solved together, and the trust we&apos;ve been
            fortunate to earn along the way.
          </Typography>
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
