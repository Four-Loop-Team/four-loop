import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import type { Metadata } from 'next';
import { workMetadata } from '@/lib/metadata';
import {
  generateWebPageSchema,
  renderStructuredData,
  webDevelopmentServiceSchema,
  mobileAppServiceSchema,
  digitalConsultingServiceSchema,
} from '@/lib/structured-data';

export const metadata: Metadata = workMetadata;

export default function WorkPage() {
  const webPageSchema = generateWebPageSchema({
    name: 'Our Work - Four Loop Digital Portfolio',
    description:
      "Explore Four Loop Digital's portfolio of successful projects and client success stories.",
    url: 'https://fourloop.digital/work',
  });

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
          __html: renderStructuredData(webDevelopmentServiceSchema),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: renderStructuredData(mobileAppServiceSchema),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: renderStructuredData(digitalConsultingServiceSchema),
        }}
      />
      <Container maxWidth='lg' sx={{ py: 8 }}>
        {/* Hero Section */}
        <Box textAlign='center' sx={{ mb: 8 }}>
          <Typography variant='h1' component='h1' gutterBottom>
            Our Work & Services
          </Typography>
          <Typography variant='h5' color='text.secondary' sx={{ mb: 4 }}>
            Discover our portfolio of digital solutions and client success
            stories.
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}
          >
            Four Loop Digital specializes in creating innovative digital
            experiences that drive business growth. Our comprehensive portfolio
            showcases web applications, mobile solutions, and digital
            transformation projects that have helped our clients achieve their
            strategic objectives and competitive advantages.
          </Typography>
        </Box>

        {/* Services Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {[
            {
              title: 'Web Development',
              description:
                'Custom web applications built with modern technologies including React, Next.js, Node.js, and cloud platforms. We specialize in scalable, performance-optimized solutions.',
              technologies: [
                'React',
                'Next.js',
                'TypeScript',
                'Node.js',
                'AWS',
                'Vercel',
              ],
              features: [
                'Progressive Web Applications (PWA)',
                'Server-Side Rendering (SSR)',
                'API Development & Integration',
                'E-commerce Solutions',
                'Content Management Systems',
                'Performance Optimization',
              ],
            },
            {
              title: 'Mobile App Development',
              description:
                'Native and cross-platform mobile applications for iOS and Android. From concept to app store deployment with ongoing maintenance and updates.',
              technologies: [
                'React Native',
                'Flutter',
                'Swift',
                'Kotlin',
                'Firebase',
              ],
              features: [
                'Cross-Platform Development',
                'Native iOS & Android Apps',
                'App Store Optimization',
                'Push Notifications',
                'Offline Functionality',
                'Analytics Integration',
              ],
            },
            {
              title: 'Digital Consulting',
              description:
                'Strategic digital transformation consulting to modernize your business processes, improve efficiency, and drive growth through technology.',
              technologies: [
                'Strategy',
                'Architecture',
                'Cloud',
                'DevOps',
                'Analytics',
              ],
              features: [
                'Digital Strategy Development',
                'Technology Architecture Review',
                'Cloud Migration Planning',
                'Process Automation',
                'Data Analytics Setup',
                'Team Training & Support',
              ],
            },
          ].map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant='h4' component='h2' gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    sx={{ mb: 3 }}
                  >
                    {service.description}
                  </Typography>

                  <Typography variant='h6' component='h3' gutterBottom>
                    Key Features:
                  </Typography>
                  <Box component='ul' sx={{ pl: 2, mb: 3 }}>
                    {service.features.map((feature, idx) => (
                      <Typography
                        component='li'
                        variant='body2'
                        key={idx}
                        sx={{ mb: 0.5 }}
                      >
                        {feature}
                      </Typography>
                    ))}
                  </Box>

                  <Typography variant='h6' component='h3' gutterBottom>
                    Technologies:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {service.technologies.map((tech, idx) => (
                      <Chip
                        key={idx}
                        label={tech}
                        size='small'
                        variant='outlined'
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Process Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant='h2'
            component='h2'
            textAlign='center'
            gutterBottom
          >
            Our Development Process
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            textAlign='center'
            sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
          >
            We follow a proven methodology that ensures successful project
            delivery, on-time completion, and exceptional quality. Our agile
            approach allows for flexibility while maintaining clear
            communication and measurable progress throughout the development
            lifecycle.
          </Typography>

          <Grid container spacing={3}>
            {[
              {
                step: '1',
                title: 'Discovery & Planning',
                description:
                  'Understanding your business goals, technical requirements, and user needs through comprehensive analysis and stakeholder interviews.',
              },
              {
                step: '2',
                title: 'Design & Architecture',
                description:
                  'Creating user-centered designs and robust technical architecture that scales with your business growth and future needs.',
              },
              {
                step: '3',
                title: 'Development & Testing',
                description:
                  'Agile development with continuous integration, automated testing, and regular client feedback to ensure quality and alignment.',
              },
              {
                step: '4',
                title: 'Deployment & Support',
                description:
                  'Smooth production deployment with comprehensive documentation, training, and ongoing maintenance and support services.',
              },
            ].map((process, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      flexShrink: 0,
                    }}
                  >
                    {process.step}
                  </Box>
                  <Box>
                    <Typography variant='h6' component='h3' gutterBottom>
                      {process.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {process.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box
          textAlign='center'
          sx={{ py: 6, bgcolor: 'grey.50', borderRadius: 2 }}
        >
          <Typography variant='h3' component='h2' gutterBottom>
            Ready to Start Your Project?
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
          >
            Let&apos;s discuss how Four Loop Digital can help transform your
            business through innovative technology solutions. Contact us today
            for a free consultation and project assessment.
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            <strong>Contact us:</strong> Reach out through our contact page to
            schedule a consultation and discover how we can accelerate your
            digital transformation journey.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
