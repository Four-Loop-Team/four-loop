import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function App() {
  return (
    <Container maxWidth='lg' sx={{ py: 8 }}>
      <Box textAlign='center'>
        <Box 
          className='logo' 
          sx={{ 
            mx: 'auto', 
            mb: 4,
            display: 'inline-block' 
          }} 
        />
        <Typography variant='h2' component='h1' gutterBottom>
          Welcome to Four Loop Digital
        </Typography>
        <Typography variant='h6' color='text.secondary'>
          Digital Consulting Services
        </Typography>
      </Box>
    </Container>
  );
}
