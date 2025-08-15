'use client';

import { ContactModal } from '@/components/modals';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { useDesignSystem } from '@/lib/hooks';
import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';

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
  const { spacing, typography } = useDesignSystem();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
    setIsContactModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <>
      <Box
        component='section'
        sx={{
          pt: { xs: spacing.section.sm, md: spacing.section.md }, // Using section spacing
          pb: { xs: spacing.section.sm, md: spacing.section.md }, // Using section spacing
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
            px: { xs: spacing.component.sm, md: spacing.section.sm }, // Using spacing tokens (82px ~ section.sm)
          }}
        >
          <Box
            sx={{
              mb: { xs: spacing.layout.sm, md: spacing.layout.lg }, // Using layout spacing
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: { xs: spacing.component.sm, md: spacing.component.lg }, // Using component spacing
                mb: { xs: spacing.layout.xs, md: spacing.layout.sm }, // Using layout spacing
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: { xs: spacing.component.sm, md: spacing.component.lg }, // Using component spacing
                }}
              >
                <Typography
                  variant='h2'
                  component='h2'
                  sx={{
                    fontSize: {
                      xs: typography.fontSize['4xl'],
                      md: typography.fontSize['6xl'],
                    }, // Using typography tokens
                    fontWeight: typography.fontWeight.normal, // Using typography tokens
                    color: 'white',
                    lineHeight: typography.lineHeight.tight, // Using typography tokens
                  }}
                >
                  Services
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      xs: typography.fontSize.base,
                      md: typography.fontSize.xl,
                    }, // Using typography tokens
                    color: 'white',
                    fontWeight: typography.fontWeight.light, // Using typography tokens
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
                <Button variant='outlined' onClick={handleCollaborationClick}>
                  Let&apos;s Collaborate
                </Button>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              alignItems: { xs: 'stretch', lg: 'flex-start' },
              gap: { xs: spacing.section.sm, lg: spacing.section.md }, // Using section spacing
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
                mt: spacing.layout.xs, // Using layout spacing
              }}
            >
              <Button onClick={handleCollaborationClick}>
                Let&apos;s Collaborate
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={handleCloseModal} />
    </>
  );
};
