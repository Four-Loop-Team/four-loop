import { Box, Card, CardContent, Paper, Typography } from '@mui/material';
import React from 'react';
import {
  CardGrid,
  GridContainer,
  GridItem,
  ThreeColumnLayout,
  TwoColumnLayout,
} from './Grid';

/**
 * @fileoverview GridSystemDemo Component - Comprehensive grid system demonstration
 * @component GridSystemDemo
 *
 * @description
 * A comprehensive demonstration component showcasing the project's 12-column grid system capabilities.
 * This component serves as both documentation and testing playground for the grid system, providing
 * interactive examples of various grid layouts with visual feedback and responsive behavior demonstrations.
 *
 * @features
 * - ✅ Basic grid container and item examples
 * - ✅ Responsive breakpoint demonstrations (xs, sm, md, lg, xl)
 * - ✅ Pre-built layout components (TwoColumnLayout, ThreeColumnLayout)
 * - ✅ CardGrid responsive card layouts
 * - ✅ Advanced grid positioning and offset examples
 * - ✅ Auto-sizing column demonstrations
 * - ✅ Gap size variations (xs, sm, md, lg, xl)
 * - ✅ Container size examples (default, lg, xl, fluid)
 * - ✅ CSS Grid and Flexbox implementations
 * - ✅ Visual spacing and alignment guides
 * - ✅ Real-world layout patterns
 *
 * @example
 * ```tsx
 * // Basic usage in a design system documentation page
 * <GridSystemDemo />
 *
 * // Used in layout testing and development
 * function LayoutDevelopmentPage() {
 *   return (
 *     <div>
 *       <h1>Grid System Examples</h1>
 *       <GridSystemDemo />
 *     </div>
 *   );
 * }
 *
 * // In a design system showcase
 * import { GridSystemDemo } from '@/components/system';
 *
 * function DesignSystemPage() {
 *   return (
 *     <section>
 *       <h2>Grid System</h2>
 *       <GridSystemDemo />
 *     </section>
 *   );
 * }
 * ```
 *
 * @see {@link GridContainer} - Main grid container component
 * @see {@link GridItem} - Individual grid item component
 * @see {@link TwoColumnLayout} - Pre-built two-column layout
 * @see {@link ThreeColumnLayout} - Pre-built three-column layout
 * @see {@link CardGrid} - Responsive card grid component
 *
 * @accessibility
 * - Semantic HTML structure with proper headings
 * - Color contrast compliant design tokens
 * - Responsive design for all screen sizes
 * - Keyboard navigable interface
 * - Screen reader compatible content structure
 *
 * @performance
 * - Lightweight implementation with minimal re-renders
 * - CSS-based grid system for optimal performance
 * - Efficient responsive breakpoint handling
 * - Optimized Material-UI component usage
 */
const GridSystemDemo: React.FC = () => {
  // Sample items for card grid
  const sampleCards = Array.from({ length: 8 }, (_, index) => (
    <Card key={index} sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Card {index + 1}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          This is a sample card to demonstrate the grid system layout.
        </Typography>
      </CardContent>
    </Card>
  ));

  return (
    <Box sx={{ py: 4 }}>
      {/* Page Header */}
      <GridContainer size='lg'>
        <GridItem xs={12}>
          <Typography variant='h2' component='h1' gutterBottom>
            Dual Grid System Demo
          </Typography>
          <Typography variant='h5' color='text.secondary' paragraph>
            Comprehensive examples of our 12-column layout grid combined with
            8px spacing system.
          </Typography>
          <Typography variant='body1' color='text.secondary' paragraph>
            This demonstration showcases how Four Loop Digital uses two
            complementary grid systems: the{' '}
            <strong>12-column responsive layout</strong> for structural
            flexibility and the <strong>8px spacing system</strong> for visual
            harmony.
          </Typography>
        </GridItem>
      </GridContainer>

      {/* Basic Grid Examples */}
      <GridContainer size='lg' gap='md' sx={{ mb: 6 }}>
        <GridItem xs={12}>
          <Typography variant='h4' gutterBottom>
            Basic Grid Examples
          </Typography>
        </GridItem>

        {/* Equal Columns */}
        <GridItem xs={12}>
          <Typography variant='h6' gutterBottom>
            Equal Columns (4 columns)
          </Typography>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
            <Typography>Column 1</Typography>
          </Paper>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light' }}>
            <Typography>Column 2</Typography>
          </Paper>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
            <Typography>Column 3</Typography>
          </Paper>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light' }}>
            <Typography>Column 4</Typography>
          </Paper>
        </GridItem>

        {/* Responsive Layout */}
        <GridItem xs={12} sx={{ mt: 4 }}>
          <Typography variant='h6' gutterBottom>
            Responsive Layout (xs=12, sm=8+4, md=9+3)
          </Typography>
        </GridItem>
        <GridItem xs={12} sm={8} md={9}>
          <Paper sx={{ p: 3, bgcolor: 'var(--nav-container-background)' }}>
            <Typography variant='h6'>Main Content Area</Typography>
            <Typography>
              This content area adapts to different screen sizes. On extra small
              screens (xs), it takes the full width (12 columns). On small
              screens (sm), it takes 8 columns. On medium screens and up (md+),
              it takes 9 columns.
            </Typography>
          </Paper>
        </GridItem>
        <GridItem xs={12} sm={4} md={3}>
          <Paper sx={{ p: 3, bgcolor: 'var(--drawer-background)' }}>
            <Typography
              variant='h6'
              sx={{ color: 'var(--drawer-inactive-text)' }}
            >
              Sidebar
            </Typography>
            <Typography sx={{ color: 'var(--drawer-inactive-text)' }}>
              Responsive sidebar that stacks on mobile.
            </Typography>
          </Paper>
        </GridItem>
      </GridContainer>

      {/* 8px Spacing Integration */}
      <GridContainer size='lg' gap='md' sx={{ mb: 6 }}>
        <GridItem xs={12}>
          <Typography variant='h4' gutterBottom>
            8px Spacing System Integration
          </Typography>
          <Typography variant='body1' color='text.secondary' paragraph>
            Our grid system integrates seamlessly with the 8px spacing system.
            Grid gaps, component padding, and margins all follow 8px multiples
            for visual consistency.
          </Typography>
        </GridItem>

        {/* Spacing Examples */}
        <GridItem xs={12}>
          <Typography variant='h6' gutterBottom>
            Grid Gap Sizes (8px Multiples)
          </Typography>
        </GridItem>

        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((gapSize) => {
          const gapPixels = {
            xs: '8px (8px × 1)',
            sm: '16px (8px × 2)',
            md: '24px (8px × 3)',
            lg: '32px (8px × 4)',
            xl: '48px (8px × 6)',
          };

          return (
            <GridItem key={gapSize} xs={12} sx={{ mb: 3 }}>
              <Typography variant='body2' gutterBottom>
                Gap: {gapSize} = {gapPixels[gapSize]}
              </Typography>
              <GridContainer
                gap={gapSize}
                sx={{
                  border: '1px dashed',
                  borderColor: 'divider',
                  p: 2,
                  borderRadius: 1,
                }}
              >
                <GridItem xs={6} sm={3}>
                  <Paper
                    sx={{
                      p: 2, // 16px = 8px × 2
                      textAlign: 'center',
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                    }}
                  >
                    <Typography variant='caption'>p: 2 (16px)</Typography>
                  </Paper>
                </GridItem>
                <GridItem xs={6} sm={3}>
                  <Paper
                    sx={{
                      p: 3, // 24px = 8px × 3
                      textAlign: 'center',
                      bgcolor: 'secondary.light',
                      color: 'secondary.contrastText',
                    }}
                  >
                    <Typography variant='caption'>p: 3 (24px)</Typography>
                  </Paper>
                </GridItem>
                <GridItem xs={6} sm={3}>
                  <Paper
                    sx={{
                      p: 4, // 32px = 8px × 4
                      textAlign: 'center',
                      bgcolor: 'success.light',
                      color: 'success.contrastText',
                    }}
                  >
                    <Typography variant='caption'>p: 4 (32px)</Typography>
                  </Paper>
                </GridItem>
                <GridItem xs={6} sm={3}>
                  <Paper
                    sx={{
                      p: 6, // 48px = 8px × 6
                      textAlign: 'center',
                      bgcolor: 'warning.light',
                      color: 'warning.contrastText',
                    }}
                  >
                    <Typography variant='caption'>p: 6 (48px)</Typography>
                  </Paper>
                </GridItem>
              </GridContainer>
            </GridItem>
          );
        })}

        {/* Real-world Integration Example */}
        <GridItem xs={12} sx={{ mt: 4 }}>
          <Typography variant='h6' gutterBottom>
            Real-world Integration Example
          </Typography>
          <Typography variant='body2' color='text.secondary' paragraph>
            A practical example showing both systems working together:
          </Typography>

          <GridContainer
            gap='lg'
            sx={{
              // 32px gap = 8px × 4
              p: 3, // 24px padding = 8px × 3
              bgcolor: 'background.paper',
              border: '2px dashed',
              borderColor: 'primary.main',
              borderRadius: 2,
            }}
          >
            <GridItem xs={12}>
              <Typography
                variant='caption'
                color='primary.main'
                gutterBottom
                display='block'
              >
                {'<GridContainer gap="lg" sx={{ p: 3 }}>'}{' '}
                {/* Shows both systems */}
              </Typography>
            </GridItem>
            <GridItem xs={12} md={8}>
              <Paper
                sx={{
                  p: 4, // 32px padding = 8px × 4
                  bgcolor: 'var(--nav-container-background)',
                  color: 'var(--nav-text-primary)',
                  mb: 2, // 16px margin = 8px × 2
                }}
              >
                <Typography variant='h6' sx={{ mb: 2 }}>
                  {' '}
                  {/* 16px margin = 8px × 2 */}
                  Main Content (8/12 columns)
                </Typography>
                <Typography variant='body2'>
                  • 12-column grid: xs={'{12}'} md={'{8}'}
                  <br />• 8px spacing: p={'{4}'} (32px padding), mb={'{2}'}{' '}
                  (16px margin)
                  <br />• Grid gap: lg (32px between items)
                </Typography>
              </Paper>
            </GridItem>
            <GridItem xs={12} md={4}>
              <Paper
                sx={{
                  p: 3, // 24px padding = 8px × 3
                  bgcolor: 'var(--drawer-background)',
                  color: 'var(--drawer-inactive-text)',
                  mb: 2, // 16px margin = 8px × 2
                }}
              >
                <Typography variant='h6' sx={{ mb: 2 }}>
                  {' '}
                  {/* 16px margin = 8px × 2 */}
                  Sidebar (4/12 columns)
                </Typography>
                <Typography variant='body2'>
                  • 12-column grid: xs={'{12}'} md={'{4}'}
                  <br />• 8px spacing: p={'{3}'} (24px padding), mb={'{2}'}{' '}
                  (16px margin)
                  <br />• Responsive: stacks on mobile, side-by-side on desktop
                </Typography>
              </Paper>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>

      {/* Pre-built Layout Components */}
      <GridContainer size='lg' gap='md' sx={{ mb: 6 }}>
        <GridItem xs={12}>
          <Typography variant='h4' gutterBottom>
            Pre-built Layout Components
          </Typography>
        </GridItem>

        {/* Two Column Layout */}
        <GridItem xs={12}>
          <Typography variant='h6' gutterBottom>
            Two Column Layout
          </Typography>
          <TwoColumnLayout
            left={
              <Paper sx={{ p: 3, bgcolor: 'var(--nav-container-background)' }}>
                <Typography variant='h6'>Left Column</Typography>
                <Typography>
                  Content for the left side of the layout.
                </Typography>
              </Paper>
            }
            right={
              <Paper sx={{ p: 3, bgcolor: 'var(--drawer-background)' }}>
                <Typography
                  variant='h6'
                  sx={{ color: 'var(--drawer-inactive-text)' }}
                >
                  Right Column
                </Typography>
                <Typography sx={{ color: 'var(--drawer-inactive-text)' }}>
                  Content for the right side of the layout.
                </Typography>
              </Paper>
            }
            leftWidth={{ xs: 12, md: 5 }}
            rightWidth={{ xs: 12, md: 7 }}
            gap='lg'
          />
        </GridItem>

        {/* Three Column Layout */}
        <GridItem xs={12} sx={{ mt: 4 }}>
          <Typography variant='h6' gutterBottom>
            Three Column Layout
          </Typography>
          <ThreeColumnLayout
            left={
              <Paper sx={{ p: 2, bgcolor: 'primary.light' }}>
                <Typography variant='subtitle1'>Left</Typography>
                <Typography variant='body2'>Left sidebar content</Typography>
              </Paper>
            }
            center={
              <Paper sx={{ p: 2, bgcolor: 'var(--nav-container-background)' }}>
                <Typography variant='subtitle1'>Center</Typography>
                <Typography variant='body2'>Main content area</Typography>
              </Paper>
            }
            right={
              <Paper sx={{ p: 2, bgcolor: 'secondary.light' }}>
                <Typography variant='subtitle1'>Right</Typography>
                <Typography variant='body2'>Right sidebar content</Typography>
              </Paper>
            }
            leftWidth={{ xs: 12, md: 3 }}
            centerWidth={{ xs: 12, md: 6 }}
            rightWidth={{ xs: 12, md: 3 }}
            gap='md'
          />
        </GridItem>
      </GridContainer>

      {/* Card Grid Layout */}
      <GridContainer size='lg' gap='md' sx={{ mb: 6 }}>
        <GridItem xs={12}>
          <Typography variant='h4' gutterBottom>
            Card Grid Layout
          </Typography>
          <Typography variant='body1' paragraph>
            Responsive card grid that adapts to screen size: 1 column on mobile,
            2 on small screens, 3 on medium screens, and 4 on large screens.
          </Typography>
        </GridItem>

        <GridItem xs={12}>
          <CardGrid items={sampleCards} xs={1} sm={2} md={3} lg={4} gap='md' />
        </GridItem>
      </GridContainer>

      {/* Advanced Grid Features */}
      <GridContainer size='lg' gap='md' sx={{ mb: 6 }}>
        <GridItem xs={12}>
          <Typography variant='h4' gutterBottom>
            Advanced Grid Features
          </Typography>
        </GridItem>

        {/* Grid Positioning */}
        <GridItem xs={12}>
          <Typography variant='h6' gutterBottom>
            CSS Grid Positioning (start and end)
          </Typography>
        </GridItem>
        <GridItem xs={6} start={2} end={8}>
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              bgcolor: 'var(--nav-container-background)',
            }}
          >
            <Typography>
              Positioned from column 2 to column 8 (6 columns wide)
            </Typography>
          </Paper>
        </GridItem>

        {/* Offset Example */}
        <GridItem xs={12} sx={{ mt: 2 }}>
          <Typography variant='h6' gutterBottom>
            Column Offset Example
          </Typography>
        </GridItem>
        <GridItem xs={4} start={5}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
            <Typography>Offset by 4 columns</Typography>
          </Paper>
        </GridItem>

        {/* Auto Columns */}
        <GridItem xs={12} sx={{ mt: 2 }}>
          <Typography variant='h6' gutterBottom>
            Auto-sizing Columns
          </Typography>
        </GridItem>
        <GridItem xs={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light' }}>
            <Typography>Fixed 3 cols</Typography>
          </Paper>
        </GridItem>
        <GridItem auto>
          <Paper
            sx={{
              p: 2,
              textAlign: 'center',
              bgcolor: 'var(--drawer-background)',
            }}
          >
            <Typography sx={{ color: 'var(--drawer-inactive-text)' }}>
              Auto-sizing (fills remaining space)
            </Typography>
          </Paper>
        </GridItem>
        <GridItem xs={2}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light' }}>
            <Typography>Fixed 2 cols</Typography>
          </Paper>
        </GridItem>
      </GridContainer>

      {/* Gap Examples */}
      <GridContainer size='lg' gap='md' sx={{ mb: 6 }}>
        <GridItem xs={12}>
          <Typography variant='h4' gutterBottom>
            Gap Size Examples
          </Typography>
        </GridItem>

        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((gapSize) => (
          <GridItem key={gapSize} xs={12} sx={{ mb: 3 }}>
            <Typography variant='h6' gutterBottom>
              Gap: {gapSize}
            </Typography>
            <GridContainer gap={gapSize} sx={{ border: '1px dashed grey' }}>
              {[1, 2, 3, 4].map((col) => (
                <GridItem key={col} xs={3}>
                  <Paper
                    sx={{ p: 1, textAlign: 'center', bgcolor: 'primary.light' }}
                  >
                    <Typography variant='body2'>Col {col}</Typography>
                  </Paper>
                </GridItem>
              ))}
            </GridContainer>
          </GridItem>
        ))}
      </GridContainer>

      {/* Container Size Examples */}
      <Box sx={{ mb: 6 }}>
        <GridContainer size='lg'>
          <GridItem xs={12}>
            <Typography variant='h4' gutterBottom>
              Container Size Examples
            </Typography>
          </GridItem>
        </GridContainer>

        {/* Default Container */}
        <GridContainer size='default' sx={{ mb: 3, border: '2px solid blue' }}>
          <GridItem xs={12}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography>Default Container (max-width: 1200px)</Typography>
            </Paper>
          </GridItem>
        </GridContainer>

        {/* Large Container */}
        <GridContainer size='lg' sx={{ mb: 3, border: '2px solid green' }}>
          <GridItem xs={12}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography>Large Container (max-width: 1400px)</Typography>
            </Paper>
          </GridItem>
        </GridContainer>

        {/* Extra Large Container */}
        <GridContainer size='xl' sx={{ mb: 3, border: '2px solid purple' }}>
          <GridItem xs={12}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography>Extra Large Container (max-width: 1600px)</Typography>
            </Paper>
          </GridItem>
        </GridContainer>

        {/* Fluid Container */}
        <GridContainer size='fluid' sx={{ border: '2px solid red' }}>
          <GridItem xs={12}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography>
                Fluid Container (no max-width, full width)
              </Typography>
            </Paper>
          </GridItem>
        </GridContainer>
      </Box>
    </Box>
  );
};

export default GridSystemDemo;
