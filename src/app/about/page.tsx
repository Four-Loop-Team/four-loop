import { Container, Typography, Box } from '@mui/material';

export default function AboutPage() {
  return (
    <Container maxWidth='lg' sx={{ py: 8 }}>
      <Box textAlign='center'>
        <Typography variant='h2' component='h1' gutterBottom>
          About Us
        </Typography>
        <Typography variant='h6' color='text.secondary'>
          Learn more about Four Loop Digital and our mission to deliver
          exceptional digital experiences.
        </Typography>
      </Box>
    </Container>
  );
}
