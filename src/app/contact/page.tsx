import { Container, Typography, Box } from '@mui/material';

export default function ContactPage() {
  return (
    <Container maxWidth='lg' sx={{ py: 8 }}>
      <Box textAlign='center'>
        <Typography variant='h2' component='h1' gutterBottom>
          Contact Us
        </Typography>
        <Typography variant='h6' color='text.secondary'>
          Get in touch with our team to discuss your next digital project.
        </Typography>
      </Box>
    </Container>
  );
}
