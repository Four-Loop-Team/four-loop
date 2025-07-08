'use client';

import { Accordion } from '@/components/ui/Accordion';
import { ButtonPrimary } from '@/components/ui/Button';
import { Box, Container, Typography } from '@mui/material';

/**
 * Services section component
 * Features service areas with expandable details and collaboration CTA
 */
export const ServicesSection = () => {
  const services = [
    {
      id: 'digital-design',
      trigger: 'Digital Design',
      content:
        'User-centered design solutions that elevate your brand and engage your audience across all digital touchpoints.',
    },
    {
      id: 'web-development',
      trigger: 'Web Development',
      content:
        'Custom web applications built with modern technologies, optimized for performance, scalability, and user experience.',
    },
    {
      id: 'visual-identity',
      trigger: 'Visual Identity',
      content:
        'Comprehensive brand identity systems that establish consistent visual communication across all platforms.',
    },
    {
      id: 'mobile-app-development',
      trigger: 'Mobile App Development',
      content:
        'Native and cross-platform mobile applications designed for optimal performance and user engagement.',
    },
  ];

  const handleCollaborationClick = () => {
    // Navigate to contact section or handle collaboration
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      component='section'
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
        color: 'white',
      }}
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'flex-start',
            gap: 6,
          }}
        >
          {/* Left column - Header and CTA */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant='h2'
              component='h2'
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 600,
                mb: 2,
              }}
            >
              Services
            </Typography>

            <Typography
              variant='subtitle1'
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                color: '#E2E8F0',
                mb: 4,
              }}
            >
              Our areas of expertise
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <ButtonPrimary onClick={handleCollaborationClick}>
                Let&apos;s Collaborate
              </ButtonPrimary>
            </Box>
          </Box>

          {/* Right column - Services Accordion */}
          <Box sx={{ flex: 1 }}>
            <Accordion
              items={services}
              variant='minimal'
              multiple={false}
              collapsible={true}
            />

            {/* Mobile CTA */}
            <Box sx={{ mt: 4, display: { xs: 'block', md: 'none' } }}>
              <ButtonPrimary onClick={handleCollaborationClick}>
                Let&apos;s Collaborate
              </ButtonPrimary>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
