'use client';

import { Accordion } from '@/components/ui/Accordion';
import { ButtonPrimary } from '@/components/ui/Button';
import { Box, Container, Typography } from '@mui/material';

/**
 * Services section component
 * Features service areas with expandable details and collaboration CTA
 *
 * @component
 * @example
 * ```tsx
 * <ServicesSection />
 * ```
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
        background: '#f8fafc',
        color: '#1a2332',
        position: 'relative',
      }}
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            textAlign: 'center',
            mb: 8,
          }}
        >
          <Typography
            variant='h2'
            component='h2'
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 3,
              color: '#1a2332',
            }}
          >
            Services
          </Typography>

          <Typography
            variant='subtitle1'
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              color: '#4a5568',
              mb: 6,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Our areas of expertise designed to elevate your digital presence
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: { xs: 'center', lg: 'flex-start' },
            gap: { xs: 6, lg: 8 },
          }}
        >
          {/* Services Accordion */}
          <Box
            sx={{ flex: 2, width: '100%', maxWidth: { xs: '100%', lg: '60%' } }}
          >
            <Accordion
              items={services}
              variant='minimal'
              multiple={false}
              collapsible={true}
            />
          </Box>

          {/* CTA Section */}
          <Box
            sx={{
              flex: 1,
              width: '100%',
              maxWidth: { xs: '100%', lg: '40%' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              mt: { xs: 0, lg: 4 },
            }}
          >
            <Typography
              variant='h3'
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 600,
                mb: 3,
                color: '#1a2332',
              }}
            >
              Ready to get started?
            </Typography>

            <Typography
              variant='body1'
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                color: '#4a5568',
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              Let&apos;s collaborate to bring your vision to life with our
              expert team.
            </Typography>

            <ButtonPrimary onClick={handleCollaborationClick}>
              Let&apos;s Collaborate
            </ButtonPrimary>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
