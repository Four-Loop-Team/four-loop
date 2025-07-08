import { Logo } from '@/components/brand';
import { Box, Container, Typography } from '@mui/material';

/**
 * Main application homepage component.
 *
 * This is the root page component that renders the Four Loop Digital
 * homepage with hero section, company logo, and main navigation.
 * Implements responsive design and accessibility best practices.
 *
 * @component
 * @example
 * ```tsx
 * // Rendered automatically by Next.js at the root route
 * // No direct usage required - this is the page component for "/"
 * ```
 *
 * @returns {JSX.Element} The homepage layout with hero section
 *
 * @accessibility
 * - Semantic HTML structure with proper landmarks
 * - Skip navigation support via id="home"
 * - Responsive design for all screen sizes
 * - High contrast logo and text for visibility
 *
 * @performance
 * - Optimized image loading via Next.js Image component
 * - Minimal JavaScript bundle for fast page loads
 * - CSS-in-JS styling with Material-UI for efficient delivery
 */
export default function App() {
  return (
    <main>
      {/* Home Section */}
      <Box
        id='home'
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 10, md: 12 }, // Account for sticky navigation
        }}
      >
        <Container maxWidth='lg'>
          <Box textAlign='center'>
            <Logo
              sx={{
                mx: 'auto',
                mb: 4,
                display: 'inline-block',
              }}
              alt='Four Loop Digital - Professional Digital Consulting Services'
            />
            <Typography variant='h1' component='h1' gutterBottom>
              Welcome to Four Loop Digital
            </Typography>
            <Typography variant='h5' component='h2' color='text.secondary'>
              Digital Consulting Services
            </Typography>
          </Box>
        </Container>
      </Box>
    </main>
  );
}
