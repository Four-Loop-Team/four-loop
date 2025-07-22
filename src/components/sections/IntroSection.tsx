'use client';

import { Logo } from '@/components/brand';
import { useDesignSystem } from '@/lib/hooks';
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
  const { colors, spacing, typography } = useDesignSystem();

  return (
    <Box
      component='section'
      sx={{
        display: 'flex',
        alignItems: 'center',
        pt: 0, // Remove top padding to sit against header
        pb: 0, // Remove bottom padding - moved to services section
        backgroundColor: 'transparent', // Remove background to show app background
        color: 'white',
        position: 'relative',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: { xs: '100%', md: '1160px' }, // Limit to 1160px on desktop
          margin: '0 auto', // Center the container
          px: { xs: spacing.component.sm, md: spacing.component.lg }, // Using component spacing
        }}
      >
        <Box
          sx={{
            backgroundColor: colors.background.secondary,
            borderRadius: '86px',
            paddingTop: spacing.section.sm, // Using section spacing (64px)
            paddingBottom: spacing.section.sm, // Using section spacing (64px)
            paddingLeft: spacing.layout.lg, // Using layout spacing (similar to 58px)
            paddingRight: spacing.layout.lg, // Using layout spacing (similar to 58px)
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: spacing.layout.xs, // Using layout spacing
              position: 'relative',
              borderTop: `1px solid ${colors.text.inverse}`,
              borderBottom: `1px solid ${colors.text.inverse}`,
              paddingTop: spacing.layout.xs, // Using layout spacing (32px)
              paddingBottom: spacing.layout.xs, // Using layout spacing (32px)
            }}
          >
            {/* Left column - Text content */}
            <Box
              sx={{
                flex: '0 0 60%',
                order: { xs: 2, md: 1 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingY: spacing.layout.xs, // Using layout spacing (32px)
                paddingLeft: spacing.component.xl, // Using component spacing (similar to 28px)
                paddingRight: spacing.layout.lg, // Using layout spacing (similar to 100px)
              }}
            >
              <Typography
                variant='body1'
                sx={{
                  fontSize: {
                    xs: typography.fontSize.base,
                    md: typography.fontSize.lg,
                  }, // Using typography tokens
                  lineHeight: typography.lineHeight.relaxed, // Using typography tokens
                  color: colors.text.inverse,
                }}
              >
                At Four Loop Digital, we believe in building better brands
                through bold digital solutions. We remove roadblocks, elevate
                identities, and exceed expectations, because our clients&apos;
                success is our success. We lead with expertise, grow through
                reputation, and stay grounded in partnership, inside and out.
                <br />
                <Box
                  component='span'
                  sx={{
                    fontSize: {
                      xs: typography.fontSize.base,
                      md: typography.fontSize.lg,
                    }, // Using typography tokens
                    lineHeight: typography.lineHeight.relaxed, // Using typography tokens
                    color: colors.text.accent,
                  }}
                >
                  Crafted Code. Thoughtful Design. Real Results.
                </Box>
              </Typography>
            </Box>

            {/* Right column - Logo */}
            <Box
              sx={{
                flex: '0 0 40%',
                order: { xs: 1, md: 3 },
                borderLeft: {
                  xs: 'none',
                  md: `1px solid ${colors.text.inverse}`,
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: { xs: 'auto', md: '18rem' }, // Using fixed height instead of spacing scale
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
    </Box>
  );
};
