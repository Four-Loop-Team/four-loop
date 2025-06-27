/**
 * Design System Demo Page
 * Showcases both the enhanced design system and theme switching
 */

'use client';

import { DesignSystemShowcase } from '@/components/DesignSystemShowcase';
import { DESIGN_SYSTEM } from '@/constants/design-system';
import { Box, Container, Button as MuiButton, Typography } from '@mui/material';
import dynamicImport from 'next/dynamic';

// Dynamically import theme components to avoid SSR issues
const ThemeSelector = dynamicImport(
  () =>
    import('@/components/ThemeProvider').then((mod) => ({
      default: mod.ThemeSelector,
    })),
  { ssr: false }
);

const ThemeToggle = dynamicImport(
  () =>
    import('@/components/ThemeProvider').then((mod) => ({
      default: mod.ThemeToggle,
    })),
  { ssr: false }
);

const ThemeStatusIndicator = dynamicImport(
  () =>
    import('@/components/ThemeStatusIndicator').then((mod) => ({
      default: mod.ThemeStatusIndicator,
    })),
  { ssr: false }
);

export default function DesignSystemDemo() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header with theme controls */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          py: 2,
          position: 'sticky',
          top: 0,
          backgroundColor: 'background.paper',
          zIndex: 10,
        }}
      >
        <Container maxWidth='lg'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography variant='h4' component='h1'>
              Design System Demo
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography
                variant='body2'
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                Theme:
              </Typography>
              <ThemeSelector className='text-sm' />
              <ThemeToggle size='sm' />
              <ThemeStatusIndicator />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Design System Showcase */}
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <DesignSystemShowcase />
      </Container>

      {/* Integration Examples */}
      <Box sx={{ backgroundColor: 'background.default', py: 6 }}>
        <Container maxWidth='lg'>
          <Typography
            variant='h3'
            component='h2'
            gutterBottom
            textAlign='center'
          >
            MUI + Design System Integration
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 4,
              mt: 4,
            }}
          >
            {/* MUI Components */}
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                boxShadow: 1,
              }}
            >
              <Typography variant='h5' gutterBottom>
                MUI Components
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <MuiButton variant='contained' color='primary'>
                  MUI Primary Button
                </MuiButton>
                <MuiButton variant='outlined' color='secondary'>
                  MUI Secondary Button
                </MuiButton>
                <Typography variant='body1'>
                  This text uses MUI Typography with theme integration.
                </Typography>
              </Box>
            </Box>

            {/* Design System Components with CSS */}
            <Box
              className='card'
              style={{
                backgroundColor:
                  DESIGN_SYSTEM.colors.contextual.surface.primary,
              }}
            >
              <Typography variant='h5' gutterBottom>
                Design System Components
              </Typography>
              <div className='flex flex-col gap-sm'>
                <button className='btn btn-primary btn-md'>
                  Design System Button
                </button>
                <button className='btn btn-secondary btn-md'>
                  Secondary Button
                </button>
                <p className='text-base text-primary'>
                  This text uses design system utility classes.
                </p>
              </div>
            </Box>
          </Box>

          {/* Color Palette Demo */}
          <Box sx={{ mt: 6 }}>
            <Typography
              variant='h4'
              component='h3'
              gutterBottom
              textAlign='center'
            >
              Enhanced Color Palette
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(4, 1fr)',
                  md: 'repeat(6, 1fr)',
                },
                gap: 2,
                mt: 3,
              }}
            >
              {/* Primary Colors */}
              {Object.entries(DESIGN_SYSTEM.colors.brand.primary).map(
                ([shade, color]) => (
                  <Box
                    key={`primary-${shade}`}
                    sx={{
                      aspectRatio: '1',
                      backgroundColor: color,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 1,
                      borderColor: 'divider',
                    }}
                  >
                    <Typography
                      variant='caption'
                      sx={{
                        color: parseInt(shade) > 400 ? 'white' : 'black',
                        fontWeight: 'medium',
                        textAlign: 'center',
                      }}
                    >
                      {shade}
                    </Typography>
                  </Box>
                )
              )}
            </Box>

            <Typography variant='h6' sx={{ mt: 4, mb: 2 }}>
              Semantic Colors
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(4, 1fr)',
                },
                gap: 2,
              }}
            >
              {Object.entries(DESIGN_SYSTEM.colors.semantic).map(
                ([type, colors]) => (
                  <Box
                    key={type}
                    sx={{
                      aspectRatio: '2/1',
                      backgroundColor: colors[500],
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    <Typography
                      variant='body2'
                      sx={{ fontWeight: 'medium', textTransform: 'capitalize' }}
                    >
                      {type}
                    </Typography>
                  </Box>
                )
              )}
            </Box>
          </Box>

          {/* Typography Scale Demo */}
          <Box sx={{ mt: 6 }}>
            <Typography
              variant='h4'
              component='h3'
              gutterBottom
              textAlign='center'
            >
              Typography Scale
            </Typography>

            <Box sx={{ mt: 3, '& > *': { mb: 2 } }}>
              {Object.entries(DESIGN_SYSTEM.typography.sizes)
                .slice(-8)
                .reverse()
                .map(([size, value]) => (
                  <Typography
                    key={size}
                    sx={{
                      fontSize: value,
                      fontWeight: DESIGN_SYSTEM.typography.weights.medium,
                      lineHeight: DESIGN_SYSTEM.typography.lineHeights.normal,
                    }}
                  >
                    {size.toUpperCase()}: The quick brown fox jumps over the
                    lazy dog ({value})
                  </Typography>
                ))}
            </Box>
          </Box>

          {/* Spacing Demo */}
          <Box sx={{ mt: 6 }}>
            <Typography
              variant='h4'
              component='h3'
              gutterBottom
              textAlign='center'
            >
              Spacing System
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Typography variant='h6' gutterBottom>
                Component Spacing
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  '& > div': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                    minWidth: '60px',
                    minHeight: '40px',
                  },
                }}
              >
                {Object.entries(DESIGN_SYSTEM.spacing.semantic.component).map(
                  ([size, value]) => (
                    <Box key={size} sx={{ padding: value }}>
                      <Typography
                        variant='caption'
                        sx={{ fontWeight: 'medium' }}
                      >
                        {size}: {value}
                      </Typography>
                    </Box>
                  )
                )}
              </Box>
            </Box>
          </Box>

          {/* Theme Demo Section */}
          <Box sx={{ mt: 6 }}>
            <Typography
              variant='h4'
              component='h3'
              gutterBottom
              textAlign='center'
            >
              Theme System Demo
            </Typography>

            <Box
              sx={{
                mt: 3,
                p: 3,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant='h6' gutterBottom>
                Dynamic Theme Elements
              </Typography>

              <Box sx={{ display: 'grid', gap: 3, mt: 2 }}>
                {/* Theme-aware cards */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 1,
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant='subtitle1'>Primary</Typography>
                    <Typography variant='body2'>
                      Adapts to theme changes
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 1,
                      backgroundColor: 'secondary.main',
                      color: 'secondary.contrastText',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant='subtitle1'>Secondary</Typography>
                    <Typography variant='body2'>Theme-aware colors</Typography>
                  </Box>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 1,
                      backgroundColor: 'background.default',
                      border: 1,
                      borderColor: 'divider',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant='subtitle1' color='text.primary'>
                      Surface
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Background adapts
                    </Typography>
                  </Box>
                </Box>

                {/* Theme transition notice */}
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: 'info.light',
                    border: 1,
                    borderColor: 'info.main',
                  }}
                >
                  <Typography variant='body2' color='info.dark'>
                    💡 Try switching themes using the controls above to see all
                    elements adapt dynamically!
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
