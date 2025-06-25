import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Logo from '@/components/Logo';

export default function App() {
  return (
    <>
      {/* Home Section */}
      <Box
        id='home'
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 10, md: 12 }, // Account for sticky navigation
        }}
      >
        <Container maxWidth='lg'>
          <Box textAlign='center'>
            <Logo
              sx={{
                mx: 'auto',
                mb: 4,
                display: 'inline-block',
              }}
              alt='Four Loop Digital - Professional Digital Consulting Services'
            />
            <Typography variant='h1' component='h1' gutterBottom>
              Welcome to Four Loop Digital
            </Typography>
            <Typography variant='h5' component='h2' color='text.secondary'>
              Digital Consulting Services
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Work Section */}
      <Box
        id='work'
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(53, 53, 53, 0.05)',
        }}
      >
        <Container maxWidth='lg'>
          <Box textAlign='center'>
            <Typography variant='h2' component='h2' gutterBottom>
              Our Work
            </Typography>
            <Typography
              variant='h6'
              component='h3'
              color='text.secondary'
              sx={{ mb: 6 }}
            >
              Discover our portfolio of digital solutions and client success
              stories.
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ maxWidth: '800px', mx: 'auto' }}
            >
              We specialize in creating innovative digital experiences that
              drive business growth. Our portfolio showcases web applications,
              mobile solutions, and digital transformation projects that have
              helped our clients achieve their goals.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Box
        id='about'
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth='lg'>
          <Box textAlign='center'>
            <Typography variant='h2' component='h2' gutterBottom>
              About Us
            </Typography>
            <Typography
              variant='h6'
              component='h3'
              color='text.secondary'
              sx={{ mb: 6 }}
            >
              Learn more about Four Loop Digital and our mission to deliver
              exceptional digital experiences.
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ maxWidth: '800px', mx: 'auto' }}
            >
              Four Loop Digital is a forward-thinking digital consultancy
              dedicated to transforming businesses through innovative technology
              solutions. Our team of experienced developers, designers, and
              strategists work collaboratively to bring your digital vision to
              life.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box
        id='contact'
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(53, 53, 53, 0.05)',
        }}
      >
        <Container maxWidth='lg'>
          <Box textAlign='center'>
            <Typography variant='h2' component='h2' gutterBottom>
              Contact Us
            </Typography>
            <Typography
              variant='h6'
              component='h3'
              color='text.secondary'
              sx={{ mb: 6 }}
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
        </Container>
      </Box>
    </>
  );
}
