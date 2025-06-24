import { Container, Typography, Box } from '@mui/material';

export default function WorkPage() {
  return (
    <Container maxWidth='lg' sx={{ py: 8 }}>
      <Box textAlign='center'>
        <Typography variant='h2' component='h1' gutterBottom>
          Our Work
        </Typography>
        <Typography variant='h6' color='text.secondary'>
          Discover our portfolio of digital solutions and client success
          stories.
        </Typography>
      </Box>
    </Container>
  );
}
