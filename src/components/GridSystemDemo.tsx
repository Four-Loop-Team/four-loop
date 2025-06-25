import React from 'react';
import { Box, Card, CardContent, Typography, Paper } from '@mui/material';
import {
  GridContainer,
  GridItem,
  TwoColumnLayout,
  ThreeColumnLayout,
  CardGrid,
} from '../components/Grid';

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
            12-Column Grid System Demo
          </Typography>
          <Typography variant='h5' color='text.secondary' paragraph>
            Comprehensive examples of the responsive grid system in action.
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
