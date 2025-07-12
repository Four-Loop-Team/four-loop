'use client';

import { Button } from '@/components/ui';
import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

interface ColorSwatch {
  name: string;
  value: string;
  description: string;
}

export default function StyleGuide() {
  const colors: ColorSwatch[] = [
    {
      name: 'Primary',
      value: '#e2e891',
      description: 'Primary brand color - signature green-yellow',
    },
    {
      name: 'Secondary',
      value: '#353535',
      description: 'Secondary brand color - dark background',
    },
    {
      name: 'Surface',
      value: '#232323',
      description: 'Component surfaces and containers',
    },
    {
      name: 'Accent',
      value: '#69685a',
      description: 'Logo accent color for subtle highlights',
    },
    {
      name: 'Text Primary',
      value: '#ffffff',
      description: 'Primary text on dark backgrounds',
    },
    {
      name: 'Text Secondary',
      value: '#353535',
      description: 'Secondary text on light backgrounds',
    },
    {
      name: 'Success',
      value: '#22c55e',
      description: 'Success states and confirmations',
    },
    {
      name: 'Warning',
      value: '#f59e0b',
      description: 'Warning states and cautions',
    },
    {
      name: 'Error',
      value: '#ef4444',
      description: 'Error states and destructive actions',
    },
    {
      name: 'Info',
      value: '#3b82f6',
      description: 'Informational messages and hints',
    },
  ];

  const spacing = [
    {
      name: 'xs',
      value: '0.25rem',
      pixels: '4px',
      description: 'Minimal spacing for tight layouts',
    },
    {
      name: 'sm',
      value: '0.5rem',
      pixels: '8px',
      description: 'Small spacing for compact elements',
    },
    {
      name: 'md',
      value: '1rem',
      pixels: '16px',
      description: 'Medium spacing for general layouts',
    },
    {
      name: 'lg',
      value: '1.5rem',
      pixels: '24px',
      description: 'Large spacing for section separation',
    },
    {
      name: 'xl',
      value: '2rem',
      pixels: '32px',
      description: 'Extra large spacing for major sections',
    },
    {
      name: '2xl',
      value: '3rem',
      pixels: '48px',
      description: 'Double extra large for page sections',
    },
    {
      name: '3xl',
      value: '4rem',
      pixels: '64px',
      description: 'Maximum spacing for major page divisions',
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#353535',
        color: '#ffffff',
        minHeight: '100vh',
        padding: 0,
      }}
    >
      <Container maxWidth='lg' sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant='h1'
            component='h1'
            gutterBottom
            sx={{ color: '#e2e891' }}
          >
            Four Loop Digital Design System
          </Typography>
          <Typography
            variant='h6'
            sx={{ color: '#ffffff', opacity: 0.8 }}
            gutterBottom
          >
            Comprehensive reference for developers and designers
          </Typography>
          <Typography variant='body1' sx={{ color: '#ffffff', opacity: 0.7 }}>
            This style guide documents the design tokens, components, and
            patterns used throughout the Four Loop Digital design system.
          </Typography>
        </Box>{' '}
        {/* Color Palette */}
        <Paper
          elevation={1}
          sx={{
            p: 4,
            mb: 4,
            backgroundColor: '#232323',
            border: '1px solid #69685a',
          }}
        >
          <Typography
            variant='h3'
            component='h2'
            gutterBottom
            sx={{ color: '#e2e891' }}
          >
            Color Palette
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: '#ffffff', opacity: 0.8, mb: 3 }}
          >
            Our color system provides semantic meaning and ensures
            accessibility.
          </Typography>

          <Stack spacing={2}>
            {colors.map((color) => (
              <Box
                key={color.name}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  backgroundColor: '#232323',
                  border: '1px solid #69685a',
                  borderRadius: 1,
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    backgroundColor: color.value,
                    borderRadius: 1,
                    mr: 2,
                    border: '1px solid #69685a',
                  }}
                />
                <Box>
                  <Typography
                    variant='h6'
                    component='h3'
                    sx={{ color: '#ffffff' }}
                  >
                    {color.name}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ color: '#ffffff', opacity: 0.8 }}
                  >
                    {color.value}
                  </Typography>
                  <Typography
                    variant='caption'
                    sx={{ color: '#ffffff', opacity: 0.6 }}
                  >
                    {color.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Paper>
        {/* Typography */}
        <Paper
          elevation={1}
          sx={{
            p: 4,
            mb: 4,
            backgroundColor: '#232323',
            border: '1px solid #69685a',
          }}
        >
          <Typography
            variant='h3'
            component='h2'
            gutterBottom
            sx={{ color: '#e2e891' }}
          >
            Typography Scale
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: '#ffffff', opacity: 0.8, mb: 3 }}
          >
            Our typography system creates hierarchy and improves readability.
          </Typography>

          <Stack spacing={3}>
            <Box
              sx={{
                p: 2,
                backgroundColor: '#353535',
                border: '1px solid #69685a',
                borderRadius: 1,
              }}
            >
              <Typography variant='h1' sx={{ color: '#e2e891' }}>
                H1 - Main Page Title
              </Typography>
              <Typography
                variant='caption'
                sx={{ color: '#ffffff', opacity: 0.6 }}
              >
                Used for primary page headings
              </Typography>
            </Box>
            <Box
              sx={{
                p: 2,
                backgroundColor: '#353535',
                border: '1px solid #69685a',
                borderRadius: 1,
              }}
            >
              <Typography variant='h2' sx={{ color: '#ffffff' }}>
                H2 - Section Heading
              </Typography>
              <Typography
                variant='caption'
                sx={{ color: '#ffffff', opacity: 0.6 }}
              >
                Used for major section titles
              </Typography>
            </Box>
            <Box
              sx={{
                p: 2,
                backgroundColor: '#353535',
                border: '1px solid #69685a',
                borderRadius: 1,
              }}
            >
              <Typography variant='h3' sx={{ color: '#ffffff' }}>
                H3 - Subsection Heading
              </Typography>
              <Typography
                variant='caption'
                sx={{ color: '#ffffff', opacity: 0.6 }}
              >
                Used for subsection titles
              </Typography>
            </Box>
            <Box
              sx={{
                p: 2,
                backgroundColor: '#353535',
                border: '1px solid #69685a',
                borderRadius: 1,
              }}
            >
              <Typography variant='body1' sx={{ color: '#ffffff' }}>
                Body 1 - Primary body text content that is easy to read
              </Typography>
              <Typography
                variant='caption'
                sx={{ color: '#ffffff', opacity: 0.6 }}
              >
                Used for main content text
              </Typography>
            </Box>
            <Box
              sx={{
                p: 2,
                backgroundColor: '#353535',
                border: '1px solid #69685a',
                borderRadius: 1,
              }}
            >
              <Typography
                variant='body2'
                sx={{ color: '#ffffff', opacity: 0.8 }}
              >
                Body 2 - Secondary body text for additional information
              </Typography>
              <Typography
                variant='caption'
                sx={{ color: '#ffffff', opacity: 0.6 }}
              >
                Used for secondary content
              </Typography>
            </Box>
          </Stack>
        </Paper>
        {/* Spacing System */}
        <Paper
          elevation={1}
          sx={{
            p: 4,
            mb: 4,
            backgroundColor: '#232323',
            border: '1px solid #69685a',
          }}
        >
          <Typography
            variant='h3'
            component='h2'
            gutterBottom
            sx={{ color: '#e2e891' }}
          >
            Spacing System
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: '#ffffff', opacity: 0.8, mb: 3 }}
          >
            Consistent spacing creates rhythm and visual balance using an 8px
            base grid.
          </Typography>

          <Stack spacing={2}>
            {spacing.map((space) => (
              <Box
                key={space.name}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  backgroundColor: '#353535',
                  border: '1px solid #69685a',
                  borderRadius: 1,
                }}
              >
                <Box
                  sx={{
                    width: space.value,
                    height: '20px',
                    backgroundColor: '#e2e891',
                    borderRadius: 1,
                    mr: 2,
                    minWidth: '8px',
                    minHeight: '8px',
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant='h6' sx={{ color: '#ffffff' }}>
                    {space.name}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ color: '#ffffff', opacity: 0.8 }}
                  >
                    {space.value} ({space.pixels})
                  </Typography>
                  <Typography
                    variant='caption'
                    sx={{ color: '#ffffff', opacity: 0.6 }}
                  >
                    {space.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Paper>
        {/* Component Examples */}
        <Paper
          elevation={1}
          sx={{
            p: 4,
            mb: 4,
            backgroundColor: '#232323',
            border: '1px solid #69685a',
          }}
        >
          <Typography
            variant='h3'
            component='h2'
            gutterBottom
            sx={{ color: '#e2e891' }}
          >
            Component Examples
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: '#ffffff', opacity: 0.8, mb: 3 }}
          >
            Common components demonstrating the design system in action.
          </Typography>

          <Stack spacing={4}>
            {/* Buttons */}
            <Card
              sx={{ backgroundColor: '#353535', border: '1px solid #69685a' }}
            >
              <CardContent>
                <Typography variant='h5' gutterBottom sx={{ color: '#ffffff' }}>
                  Buttons
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: '#ffffff', opacity: 0.8, mb: 2 }}
                >
                  Using Tailwind classes with your custom styling
                </Typography>
                <Stack
                  spacing={2}
                  direction='row'
                  sx={{ flexWrap: 'wrap', gap: 2 }}
                >
                  <Button variant='primary'>Primary</Button>
                  <Button variant='secondary'>Secondary</Button>
                  <Button variant='outline'>Outline</Button>
                  <Button variant='ghost'>Ghost</Button>
                </Stack>
              </CardContent>
            </Card>

            {/* Semantic Colors */}
            <Card
              sx={{ backgroundColor: '#353535', border: '1px solid #69685a' }}
            >
              <CardContent>
                <Typography variant='h5' gutterBottom sx={{ color: '#ffffff' }}>
                  Semantic Colors
                </Typography>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid #22c55e',
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant='body2' sx={{ color: '#22c55e' }}>
                      ✓ Success message
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid #f59e0b',
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant='body2' sx={{ color: '#f59e0b' }}>
                      ⚠ Warning message
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid #ef4444',
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant='body2' sx={{ color: '#ef4444' }}>
                      ✗ Error message
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid #3b82f6',
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant='body2' sx={{ color: '#3b82f6' }}>
                      ℹ Info message
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Paper>
        {/* Usage Guidelines */}
        <Paper
          elevation={1}
          sx={{
            p: 4,
            backgroundColor: '#232323',
            border: '1px solid #69685a',
          }}
        >
          <Typography
            variant='h3'
            component='h2'
            gutterBottom
            sx={{ color: '#e2e891' }}
          >
            Usage Guidelines
          </Typography>

          <Stack spacing={4} direction={{ xs: 'column', md: 'row' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant='h5' gutterBottom sx={{ color: '#22c55e' }}>
                Do&apos;s
              </Typography>
              <Stack spacing={1}>
                <Typography
                  variant='body2'
                  sx={{ color: '#ffffff', opacity: 0.8 }}
                >
                  • Use the primary green (#e2e891) for brand elements and
                  calls-to-action
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: '#ffffff', opacity: 0.8 }}
                >
                  • Follow the 8px spacing grid for consistent layouts
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: '#ffffff', opacity: 0.8 }}
                >
                  • Apply semantic colors for state communication
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: '#ffffff', opacity: 0.8 }}
                >
                  • Use dark backgrounds (#353535) with light text (#ffffff)
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: '#ffffff', opacity: 0.8 }}
                >
                  • Maintain consistent component patterns with Tailwind
                  utilities
                </Typography>
              </Stack>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant='h5' gutterBottom sx={{ color: '#ef4444' }}>
                Don&apos;ts
              </Typography>
              <Stack spacing={1}>
                <Typography
                  variant='body2'
                  sx={{ color: '#ffffff', opacity: 0.8 }}
                >
                  • Don&apos;t use arbitrary colors outside the brand palette
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: '#ffffff', opacity: 0.8 }}
                >
                  • Don&apos;t break the 8px spacing grid with custom values
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: '#ffffff', opacity: 0.8 }}
                >
                  • Don&apos;t use light backgrounds without proper contrast
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: '#ffffff', opacity: 0.8 }}
                >
                  • Don&apos;t mix different design systems or component
                  libraries
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: '#ffffff', opacity: 0.8 }}
                >
                  • Don&apos;t override brand colors for semantic states
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
