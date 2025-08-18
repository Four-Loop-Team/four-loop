import { GridContainer, GridItem } from '@/components/system/Grid/Grid';
import Form from '@/components/ui/Form/Form';
import { Input } from '@/components/ui/Input';
import {
  DESIGN_TOKENS,
  SEMANTIC_SPACING,
} from '@/constants/design-tokens-consolidated';
import { contactMetadata } from '@/lib/metadata';
import {
  generateWebPageSchema,
  renderStructuredData,
} from '@/lib/structured-data';
import { Email, LocationOn, Schedule } from '@mui/icons-material';
import { Box, Card, CardContent, Typography } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = contactMetadata;

export default function ContactPage() {
  const colors = DESIGN_TOKENS.colors;
  const spacing = {
    component: SEMANTIC_SPACING.component,
    section: SEMANTIC_SPACING.section,
    layout: SEMANTIC_SPACING.layout,
  };
  const typography = DESIGN_TOKENS.typography;

  const webPageSchema = generateWebPageSchema({
    name: 'Contact Four Loop Digital',
    description:
      'Get in touch with Four Loop Digital to discuss your next digital project.',
    url: 'https://fourloop.digital/contact',
  });

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'English',
      areaServed: 'Worldwide',
    },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: renderStructuredData(webPageSchema),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: renderStructuredData(contactPageSchema),
        }}
      />

      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: 'transparent',
          pt: { xs: spacing.section.sm, md: spacing.section.md },
          pb: { xs: spacing.section.sm, md: spacing.section.md },
          color: 'white',
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: '100%', md: '1160px' },
            margin: '0 auto',
            px: { xs: spacing.component.sm, md: spacing.component.lg },
            textAlign: 'center',
          }}
        >
          <Typography
            variant='h1'
            component='h1'
            sx={{
              fontSize: {
                xs: typography.fontSize['4xl'],
                md: typography.fontSize['6xl'],
              },
              fontWeight: typography.fontWeight.normal,
              color: 'white',
              lineHeight: typography.lineHeight.tight,
              mb: spacing.component.lg,
            }}
          >
            Let&apos;s Build Something Amazing
          </Typography>
          <Typography
            variant='body1'
            sx={{
              fontSize: {
                xs: typography.fontSize.lg,
                md: typography.fontSize.xl,
              },
              color: colors.text.muted,
              fontWeight: typography.fontWeight.light,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            Ready to start your digital transformation journey? We&apos;d love
            to hear about your project and explore how we can help you achieve
            your business objectives.
          </Typography>
        </Box>
      </Box>

      {/* Main Contact Section */}
      <Box
        sx={{
          maxWidth: { xs: '100%', md: '1160px' },
          margin: '0 auto',
          px: { xs: spacing.component.sm, md: spacing.component.lg },
          pb: { xs: spacing.section.sm, md: spacing.section.md },
        }}
      >
        <GridContainer gap='lg'>
          {/* Contact Form */}
          <GridItem xs={12} lg={8}>
            <Form
              title='Start Your Project'
              description='/&nbsp;&nbsp;&nbsp;&nbsp;Tell us about your vision'
              submitText='Send Message'
              accentBackground={true}
              contained={false}
            >
              <GridContainer gap='md'>
                <GridItem xs={12} sm={6}>
                  <Input
                    label='First Name'
                    name='firstName'
                    required
                    placeholder='Enter your first name'
                    variant='filled'
                  />
                </GridItem>
                <GridItem xs={12} sm={6}>
                  <Input
                    label='Last Name'
                    name='lastName'
                    required
                    placeholder='Enter your last name'
                    variant='filled'
                  />
                </GridItem>
              </GridContainer>

              <Input
                label='Email Address'
                name='email'
                type='email'
                required
                placeholder='your.email@example.com'
                helperText="We'll never share your email address"
                variant='filled'
              />

              <Input
                label='Project Description'
                name='description'
                multiline
                rows={4}
                placeholder='Tell us about your project goals, timeline, and requirements...'
                helperText='The more details you provide, the better we can help you'
                variant='filled'
              />
            </Form>
          </GridItem>

          {/* Contact Information */}
          <GridItem xs={12} lg={4}>
            <Box
              sx={{
                pl: { xs: 0, lg: spacing.component.lg },
                pt: { xs: spacing.section.sm, lg: 0 },
              }}
            >
              <Typography
                variant='h3'
                component='h2'
                sx={{
                  fontSize: {
                    xs: typography.fontSize['2xl'],
                    md: typography.fontSize['3xl'],
                  },
                  fontWeight: typography.fontWeight.medium,
                  color: 'white',
                  mb: spacing.component.xl,
                  lineHeight: typography.lineHeight.tight,
                }}
              >
                Get in Touch
              </Typography>

              {/* Contact Cards */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: spacing.component.lg,
                }}
              >
                {/* Email Card */}
                <Card
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${colors.text.primary}`,
                    borderRadius: spacing.component.lg,
                  }}
                >
                  <CardContent
                    sx={{
                      p: spacing.component.lg,
                      '&:last-child': { pb: spacing.component.lg },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing.component.md,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: colors.background.accent,
                          borderRadius: '50%',
                          p: spacing.component.sm,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '48px',
                          minHeight: '48px',
                        }}
                      >
                        <Email
                          sx={{ color: colors.text.primary, fontSize: 24 }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant='h6'
                          sx={{
                            color: 'white',
                            fontWeight: typography.fontWeight.medium,
                            mb: spacing.component.xs,
                          }}
                        >
                          Email Us
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{
                            color: colors.text.muted,
                            fontSize: typography.fontSize.sm,
                          }}
                        >
                          hello@fourloop.digital
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                {/* Business Hours Card */}
                <Card
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: spacing.component.lg,
                  }}
                >
                  <CardContent
                    sx={{
                      p: spacing.component.lg,
                      '&:last-child': { pb: spacing.component.lg },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing.component.md,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: colors.background.accent,
                          borderRadius: '50%',
                          p: spacing.component.sm,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '48px',
                          minHeight: '48px',
                        }}
                      >
                        <Schedule
                          sx={{ color: colors.text.primary, fontSize: 24 }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant='h6'
                          sx={{
                            color: 'white',
                            fontWeight: typography.fontWeight.medium,
                            mb: spacing.component.xs,
                          }}
                        >
                          Business Hours
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{
                            color: colors.text.muted,
                            fontSize: typography.fontSize.sm,
                          }}
                        >
                          Monday - Friday: 9AM - 6PM EST
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                {/* Location Card */}
                <Card
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: spacing.component.lg,
                  }}
                >
                  <CardContent
                    sx={{
                      p: spacing.component.lg,
                      '&:last-child': { pb: spacing.component.lg },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing.component.md,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: colors.background.accent,
                          borderRadius: '50%',
                          p: spacing.component.sm,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '48px',
                          minHeight: '48px',
                        }}
                      >
                        <LocationOn
                          sx={{ color: colors.text.primary, fontSize: 24 }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant='h6'
                          sx={{
                            color: 'white',
                            fontWeight: typography.fontWeight.medium,
                            mb: spacing.component.xs,
                          }}
                        >
                          Location
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{
                            color: colors.text.muted,
                            fontSize: typography.fontSize.sm,
                          }}
                        >
                          Remote-First, Worldwide
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </GridItem>
        </GridContainer>
      </Box>
    </>
  );
}
