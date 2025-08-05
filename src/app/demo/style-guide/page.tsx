'use client';

import { GridContainer, GridItem } from '@/components/system/Grid';
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
import Link from 'next/link';

interface ColorSwatch {
  name: string;
  value: string;
  description: string;
}

export default function StyleGuide() {
  const colors: ColorSwatch[] = [
    {
      name: 'Highlight',
      value: '#e2e891',
      description:
        'Yellow-green highlight/attention color (Logo, text, background)',
    },
    {
      name: 'Background Primary',
      value: '#353535',
      description: 'Main website background, text and borders on light',
    },
    {
      name: 'Background Secondary',
      value: '#232323',
      description: 'Darker background for content that needs to stand out',
    },
    {
      name: 'Text Light',
      value: '#ffffff',
      description: 'Text and borders on dark backgrounds',
    },
    // MUI State Colors (keep for components)
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
      name: 'xs (0.5)',
      value: '0.25rem',
      pixels: '4px',
      description: 'Minimal spacing for tight layouts (8px ÷ 2)',
      eightPxMultiple: '8px ÷ 2',
    },
    {
      name: 'sm (2)',
      value: '0.5rem',
      pixels: '8px',
      description: 'Base unit of the 8px grid system (8px × 1)',
      eightPxMultiple: '8px × 1',
    },
    {
      name: 'md (4)',
      value: '1rem',
      pixels: '16px',
      description: 'Medium spacing for general layouts (8px × 2)',
      eightPxMultiple: '8px × 2',
    },
    {
      name: 'lg (6)',
      value: '1.5rem',
      pixels: '24px',
      description: 'Large spacing for section separation (8px × 3)',
      eightPxMultiple: '8px × 3',
    },
    {
      name: 'xl (8)',
      value: '2rem',
      pixels: '32px',
      description: 'Extra large spacing for major sections (8px × 4)',
      eightPxMultiple: '8px × 4',
    },
    {
      name: '2xl (12)',
      value: '3rem',
      pixels: '48px',
      description: 'Double extra large for page sections (8px × 6)',
      eightPxMultiple: '8px × 6',
    },
    {
      name: '3xl (16)',
      value: '4rem',
      pixels: '64px',
      description: 'Maximum spacing for major page divisions (8px × 8)',
      eightPxMultiple: '8px × 8',
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'var(--background-primary)',
        color: 'var(--text-primary)',
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
            sx={{ color: 'var(--text-accent)' }}
          >
            Four Loop Digital Design System
          </Typography>
          <Typography
            variant='h6'
            sx={{ color: 'var(--text-primary)', opacity: 0.8 }}
          >
            Comprehensive reference for developers and designers
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: 'var(--text-primary)', opacity: 0.7 }}
          >
            This style guide documents the design tokens, components, and
            patterns used throughout the Four Loop Digital design system.
          </Typography>

          {/* Navigation Links */}
          <Box sx={{ mt: 3 }}>
            <Stack direction='row' spacing={2}>
              <Link href='/demo/components' style={{ textDecoration: 'none' }}>
                <Button variant='outline'>🧩 Components</Button>
              </Link>
              <Link
                href='/demo/presentations'
                style={{ textDecoration: 'none' }}
              >
                <Button variant='outline'>🎯 Presentations</Button>
              </Link>
            </Stack>
          </Box>
        </Box>

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
        {/* Dual Grid System */}
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
            Dual Grid System
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: '#ffffff', opacity: 0.8, mb: 3 }}
          >
            Four Loop Digital uses a dual grid approach that combines
            **12-column responsive layout** with **8px spacing system** to
            create layouts that are both structurally flexible and visually
            harmonious.
          </Typography>

          {/* 8px Spacing System */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant='h5'
              component='h3'
              gutterBottom
              sx={{ color: '#e2e891' }}
            >
              8px Spacing System
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: '#ffffff', opacity: 0.8, mb: 3 }}
            >
              Controls spacing, padding, margins, and gaps between elements.
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
                      {space.value} ({space.pixels}) - {space.eightPxMultiple}
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
          </Box>

          {/* 12-Column Grid System */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant='h5'
              component='h3'
              gutterBottom
              sx={{ color: '#e2e891' }}
            >
              12-Column Layout Grid
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: '#ffffff', opacity: 0.8, mb: 3 }}
            >
              Controls layout structure and responsive column spans.
            </Typography>

            {/* Grid Demonstration */}
            <GridContainer gap='md' sx={{ mb: 3 }}>
              {/* Full Width */}
              <GridItem xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: '#e2e891',
                    color: '#353535',
                    mb: 1,
                  }}
                >
                  <Typography variant='body2' fontWeight='bold'>
                    xs={'{12}'} - Full Width (12 columns)
                  </Typography>
                </Paper>
              </GridItem>

              {/* Half Width */}
              <GridItem xs={12} sm={6}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: '#69685a',
                    color: '#ffffff',
                    mb: 1,
                  }}
                >
                  <Typography variant='body2' fontWeight='bold'>
                    xs={'{12}'} sm={'{6}'} - Half Width
                  </Typography>
                </Paper>
              </GridItem>
              <GridItem xs={12} sm={6}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: '#69685a',
                    color: '#ffffff',
                    mb: 1,
                  }}
                >
                  <Typography variant='body2' fontWeight='bold'>
                    xs={'{12}'} sm={'{6}'} - Half Width
                  </Typography>
                </Paper>
              </GridItem>

              {/* Thirds */}
              <GridItem xs={12} sm={6} md={4}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: '#e2e891',
                    color: '#353535',
                    mb: 1,
                  }}
                >
                  <Typography variant='body2' fontWeight='bold'>
                    xs={'{12}'} sm={'{6}'} md={'{4}'} - Third
                  </Typography>
                </Paper>
              </GridItem>
              <GridItem xs={12} sm={6} md={4}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: '#e2e891',
                    color: '#353535',
                    mb: 1,
                  }}
                >
                  <Typography variant='body2' fontWeight='bold'>
                    xs={'{12}'} sm={'{6}'} md={'{4}'} - Third
                  </Typography>
                </Paper>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: '#e2e891',
                    color: '#353535',
                    mb: 1,
                  }}
                >
                  <Typography variant='body2' fontWeight='bold'>
                    xs={'{12}'} sm={'{12}'} md={'{4}'} - Third
                  </Typography>
                </Paper>
              </GridItem>

              {/* Asymmetric Layout */}
              <GridItem xs={12} md={8}>
                <Paper
                  sx={{
                    p: 3,
                    bgcolor: '#353535',
                    color: '#ffffff',
                    mb: 1,
                  }}
                >
                  <Typography variant='h6' gutterBottom>
                    Main Content Area (8/12 cols)
                  </Typography>
                  <Typography variant='body2' sx={{ opacity: 0.8 }}>
                    This content area demonstrates the 12-column grid with 8px
                    spacing system. The gap between items uses our md spacing
                    (24px = 8px × 3).
                  </Typography>
                </Paper>
              </GridItem>
              <GridItem xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    bgcolor: '#69685a',
                    color: '#ffffff',
                    mb: 1,
                  }}
                >
                  <Typography variant='h6' gutterBottom>
                    Sidebar (4/12 cols)
                  </Typography>
                  <Typography variant='body2' sx={{ opacity: 0.8 }}>
                    Responsive sidebar with consistent 8px-based padding.
                  </Typography>
                </Paper>
              </GridItem>
            </GridContainer>

            {/* Gap Demonstration */}
            <Typography
              variant='h6'
              component='h4'
              gutterBottom
              sx={{ color: '#e2e891', mt: 3 }}
            >
              Grid Gap Sizes (8px Multiples)
            </Typography>

            {['xs', 'sm', 'md', 'lg', 'xl'].map((gapSize) => {
              const gapValues = {
                xs: '8px',
                sm: '16px',
                md: '24px',
                lg: '32px',
                xl: '48px',
              };

              return (
                <Box key={gapSize} sx={{ mb: 2 }}>
                  <Typography variant='body2' sx={{ color: '#ffffff', mb: 1 }}>
                    Gap: {gapSize} (
                    {gapValues[gapSize as keyof typeof gapValues]})
                  </Typography>
                  <GridContainer
                    gap={gapSize as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
                  >
                    <GridItem xs={4}>
                      <Paper
                        sx={{
                          p: 1,
                          textAlign: 'center',
                          bgcolor: '#e2e891',
                          color: '#353535',
                        }}
                      >
                        <Typography variant='caption'>Col 1</Typography>
                      </Paper>
                    </GridItem>
                    <GridItem xs={4}>
                      <Paper
                        sx={{
                          p: 1,
                          textAlign: 'center',
                          bgcolor: '#e2e891',
                          color: '#353535',
                        }}
                      >
                        <Typography variant='caption'>Col 2</Typography>
                      </Paper>
                    </GridItem>
                    <GridItem xs={4}>
                      <Paper
                        sx={{
                          p: 1,
                          textAlign: 'center',
                          bgcolor: '#e2e891',
                          color: '#353535',
                        }}
                      >
                        <Typography variant='caption'>Col 3</Typography>
                      </Paper>
                    </GridItem>
                  </GridContainer>
                </Box>
              );
            })}
          </Box>

          {/* Integration Example */}
          <Box>
            <Typography
              variant='h5'
              component='h3'
              gutterBottom
              sx={{ color: '#e2e891' }}
            >
              Integration Example
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: '#ffffff', opacity: 0.8, mb: 3 }}
            >
              How both systems work together in real layouts:
            </Typography>

            <GridContainer
              gap='lg'
              sx={{
                p: 3,
                backgroundColor: '#232323',
                border: '2px dashed #69685a',
                borderRadius: 2,
              }}
            >
              <GridItem xs={12}>
                <Typography variant='body2' sx={{ color: '#e2e891', mb: 2 }}>
                  {'<GridContainer gap="lg">'} {/* 32px gap = 8px × 4 */}
                </Typography>
              </GridItem>
              <GridItem xs={12} md={6}>
                <Paper
                  sx={{
                    p: 3, // 24px padding = 8px × 3
                    bgcolor: '#353535',
                    color: '#ffffff',
                  }}
                >
                  <Typography variant='h6' sx={{ mb: 2 }}>
                    {' '}
                    {/* 16px margin = 8px × 2 */}
                    Card Title
                  </Typography>
                  <Typography variant='body2'>
                    This card uses:
                    <br />• 12-column grid: xs={'{12}'} md={'{6}'}
                    <br />• 8px spacing: p={'{3}'} (24px padding)
                    <br />• Grid gap: lg (32px between cards)
                  </Typography>
                </Paper>
              </GridItem>
              <GridItem xs={12} md={6}>
                <Paper
                  sx={{
                    p: 3, // 24px padding = 8px × 3
                    bgcolor: '#353535',
                    color: '#ffffff',
                  }}
                >
                  <Typography variant='h6' sx={{ mb: 2 }}>
                    {' '}
                    {/* 16px margin = 8px × 2 */}
                    Card Title
                  </Typography>
                  <Typography variant='body2'>
                    Both cards maintain:
                    <br />• Structural consistency (12-col grid)
                    <br />• Visual harmony (8px spacing)
                    <br />• Responsive behavior (xs/md breakpoints)
                  </Typography>
                </Paper>
              </GridItem>
            </GridContainer>
          </Box>
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
                  Using design system classes with your custom styling
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
                  • Maintain consistent component patterns with design system
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
