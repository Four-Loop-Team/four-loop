'use client';

import { Box, Container, Typography } from '@mui/material';

/**
 * Partners section component
 * Features information about company partnerships and collaborations
 */
export const PartnersSection = () => {
  return (
    <Box
      component='section'
      sx={{
        py: { xs: 8, md: 12 },
        background:
          'linear-gradient(45deg, rgba(168, 230, 163, 0.1) 0%, rgba(226, 232, 240, 0.1) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
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
            rgba(255, 255, 255, 0.03) 1px,
            rgba(255, 255, 255, 0.03) 20px
          )`,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant='h2'
          component='h2'
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 600,
            mb: 2,
            color: 'text.primary',
          }}
        >
          Partners
        </Typography>

        <Typography
          variant='subtitle1'
          sx={{
            fontSize: { xs: '1rem', md: '1.125rem' },
            color: 'text.secondary',
            mb: 6,
          }}
        >
          Companies we love
        </Typography>

        <Box sx={{ maxWidth: '800px' }}>
          <Typography
            variant='h3'
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 600,
              color: '#A8E6A3', // Green accent
              mb: 3,
            }}
          >
            Partnerships That Shaped Our Journey.
          </Typography>

          <Typography
            variant='body1'
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.7,
              color: 'text.primary',
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
    </Box>
  );
};
