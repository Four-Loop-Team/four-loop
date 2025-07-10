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
        pt: 0,
        pb: { xs: 8, md: 12 },
        backgroundColor: 'transparent',
        color: 'white',
        position: 'relative',
      }}
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            mb: { xs: 6, md: 8 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              gap: { xs: 2, md: 3 },
              mb: { xs: 4, md: 6 },
            }}
          >
            <Typography
              variant='h2'
              component='h2'
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 400,
                color: 'white',
                lineHeight: 1,
              }}
            >
              Services
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 300,
              }}
            >
              / Our areas of expertise
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: { xs: 'stretch', lg: 'flex-start' },
            gap: { xs: 8, lg: 12 },
          }}
        >
          {/* Services Accordion */}
          <Box
            sx={{
              flex: '1 1 65%',
              width: '100%',
              maxWidth: { xs: '100%', lg: '65%' },
            }}
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
              flex: '1 1 35%',
              width: '100%',
              maxWidth: { xs: '100%', lg: '35%' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', lg: 'flex-end' },
              justifyContent: 'flex-start',
              textAlign: { xs: 'center', lg: 'right' },
              pt: { xs: 0, lg: 2 },
            }}
          >
            <Box
              sx={{
                maxWidth: { xs: '100%', lg: '300px' },
              }}
            >
              <Typography
                variant='h3'
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  fontWeight: 600,
                  mb: 3,
                  color: 'white',
                }}
              >
                Ready to get started?
              </Typography>

              <Typography
                variant='body1'
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: 'rgba(255, 255, 255, 0.8)',
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
        </Box>
      </Container>
    </Box>
  );
};
