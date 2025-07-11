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
        pt: { xs: 8, md: 12 }, // Add padding moved from intro section
        pb: { xs: 8, md: 12 },
        backgroundColor: 'transparent',
        color: 'white',
        position: 'relative',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: { xs: '100%', md: '1160px' }, // Limit to 1160px on desktop
          margin: '0 auto', // Center the container
          px: { xs: 2, md: '82px' }, // Add 82px padding on desktop
        }}
      >
        <Box
          sx={{
            mb: { xs: 6, md: 8 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: { xs: 2, md: 3 },
              mb: { xs: 4, md: 6 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                gap: { xs: 2, md: 3 },
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
                  color: 'white',
                  fontWeight: 300,
                }}
              >
                /&nbsp;&nbsp;&nbsp;&nbsp;Our areas of expertise
              </Typography>
            </Box>

            <Box
              sx={{
                display: { xs: 'none', lg: 'block' },
              }}
            >
              <ButtonPrimary onClick={handleCollaborationClick}>
                Let&apos;s Collaborate
              </ButtonPrimary>
            </Box>
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
              flex: '1 1 70%',
              width: '100%',
              maxWidth: { xs: '100%', lg: '70%' },
            }}
          >
            <Accordion
              items={services}
              variant='minimal'
              multiple={false}
              collapsible={true}
            />
          </Box>

          {/* Right Section - 30% width */}
          <Box
            sx={{
              flex: '1 1 30%',
              width: '100%',
              maxWidth: { xs: '100%', lg: '30%' },
              display: { xs: 'none', lg: 'block' },
            }}
          >
            {/* Empty space for layout */}
          </Box>

          {/* Mobile CTA Section - only show on mobile */}
          <Box
            sx={{
              display: { xs: 'flex', lg: 'none' },
              justifyContent: 'center',
              mt: 4,
            }}
          >
            <ButtonPrimary onClick={handleCollaborationClick}>
              Let&apos;s Collaborate
            </ButtonPrimary>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
