import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
} from '@mui/material';
import { Email, LocationOn, Schedule } from '@mui/icons-material';
import type { Metadata } from 'next';
import { contactMetadata } from '@/lib/metadata';
import {
  generateWebPageSchema,
  renderStructuredData,
} from '@/lib/structured-data';

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

      <Container maxWidth='lg' sx={{ py: 8 }}>
        {/* Hero Section */}
        <Box textAlign='center' sx={{ mb: 8 }}>
          <Typography variant='h1' component='h1' gutterBottom>
            Contact Us
          </Typography>
          <Typography variant='h5' color='text.secondary' sx={{ mb: 4 }}>
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
              <CardContent sx={{ p: 4 }}>
                <Typography variant='h4' component='h2' gutterBottom>
                  Start Your Project
                </Typography>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  sx={{ mb: 4 }}
                >
                  Fill out the form below and we&apos;ll get back to you within
                  24 hours.
                </Typography>

                <Box
                  component='form'
                  sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
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
                    sx={{ alignSelf: 'flex-start', mt: 2 }}
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

              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Email sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant='h6'>Email Us</Typography>
                      <Typography variant='body2' color='text.secondary'>
                        hello@fourloop.digital
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Schedule sx={{ mr: 2, color: 'primary.main' }} />
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
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn sx={{ mr: 2, color: 'primary.main' }} />
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
