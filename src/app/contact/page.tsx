import { SEMANTIC_SPACING } from '@/constants/spacing';
import { contactMetadata } from '@/lib/metadata';
import {
  generateWebPageSchema,
  renderStructuredData,
} from '@/lib/structured-data';
import { Email, LocationOn, Schedule } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = contactMetadata;

export default function ContactPage() {
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

      <Container
        maxWidth={false}
        sx={{
          maxWidth: { xs: '100%', md: '1160px' }, // Limit to 1160px on desktop
          margin: '0 auto', // Center the container
          px: { xs: 2, md: 3 }, // Add some padding
          py: 8,
        }}
      >
        {/* Hero Section */}
        <Box textAlign='center' sx={{ mb: SEMANTIC_SPACING.section.lg }}>
          <Typography variant='h1' component='h1' gutterBottom>
            Contact Us
          </Typography>
          <Typography
            variant='h5'
            color='text.secondary'
            sx={{ mb: SEMANTIC_SPACING.layout.sm }}
          >
            Get in touch with our team to discuss your next digital project.
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            sx={{ maxWidth: '800px', mx: 'auto' }}
          >
            Ready to start your digital transformation journey? We&apos;d love
            to hear about your project and explore how we can help you achieve
            your business objectives through innovative digital solutions.
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent sx={{ p: SEMANTIC_SPACING.layout.sm }}>
                <Typography variant='h4' component='h2' gutterBottom>
                  Start Your Project
                </Typography>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  sx={{ mb: SEMANTIC_SPACING.layout.sm }}
                >
                  Fill out the form below and we&apos;ll get back to you within
                  24 hours.
                </Typography>

                <Box
                  component='form'
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: SEMANTIC_SPACING.component.xl,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label='First Name'
                        name='firstName'
                        required
                        variant='outlined'
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label='Last Name'
                        name='lastName'
                        required
                        variant='outlined'
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    label='Email Address'
                    name='email'
                    type='email'
                    required
                    variant='outlined'
                  />

                  <TextField
                    fullWidth
                    label='Project Description'
                    name='description'
                    multiline
                    rows={4}
                    placeholder='Tell us about your project...'
                    variant='outlined'
                  />

                  <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    sx={{
                      alignSelf: 'flex-start',
                      mt: SEMANTIC_SPACING.component.md,
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Information */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box>
              <Typography variant='h4' component='h2' gutterBottom>
                Get in Touch
              </Typography>

              <Card sx={{ mb: SEMANTIC_SPACING.component.xl }}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: SEMANTIC_SPACING.component.md,
                    }}
                  >
                    <Email
                      sx={{
                        mr: SEMANTIC_SPACING.component.md,
                        color: 'primary.main',
                      }}
                    />
                    <Box>
                      <Typography variant='h6'>Email Us</Typography>
                      <Typography variant='body2' color='text.secondary'>
                        hello@fourloop.digital
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ mb: SEMANTIC_SPACING.component.xl }}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: SEMANTIC_SPACING.component.md,
                    }}
                  >
                    <Schedule
                      sx={{
                        mr: SEMANTIC_SPACING.component.md,
                        color: 'primary.main',
                      }}
                    />
                    <Box>
                      <Typography variant='h6'>Business Hours</Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Monday - Friday: 9AM - 6PM EST
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: SEMANTIC_SPACING.component.md,
                    }}
                  >
                    <LocationOn
                      sx={{
                        mr: SEMANTIC_SPACING.component.md,
                        color: 'primary.main',
                      }}
                    />
                    <Box>
                      <Typography variant='h6'>Location</Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Remote-First, Worldwide
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
