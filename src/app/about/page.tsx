import { aboutMetadata } from '@/lib/metadata';
import {
  generateWebPageSchema,
  renderStructuredData,
} from '@/lib/structured-data';
import { Box, Container, Typography } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = aboutMetadata;

export default function AboutPage() {
  const webPageSchema = generateWebPageSchema({
    name: 'About Four Loop Digital',
    description:
      "Learn about Four Loop Digital's mission, team, and commitment to delivering exceptional digital experiences.",
    url: 'https://fourloop.digital/about',
  });

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: renderStructuredData(webPageSchema),
        }}
      />
      <Container
        maxWidth={false}
        sx={{
          maxWidth: { xs: '100%', md: '1160px' }, // Limit to 1160px on desktop
          margin: '0 auto', // Center the container
          px: { xs: 2, md: 3 }, // Add some padding
          py: 8,
        }}
      >
        <Box textAlign='center'>
          <Typography variant='h1' component='h1' gutterBottom>
            About Us
          </Typography>
          <Typography variant='h6' color='text.secondary'>
            Learn more about Four Loop Digital and our mission to deliver
            exceptional digital experiences.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
