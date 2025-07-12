'use client';

import { ToastProvider } from '@/components/ui/Toast';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <ToastProvider>
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        {/* Demo Navigation */}
        <AppBar position='static' color='transparent' elevation={1}>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Four Loop Digital - Demo
            </Typography>
            <Button
              color='inherit'
              onClick={() => router.push('/demo/components')}
              sx={{ mr: 1 }}
            >
              Components
            </Button>
            <Button
              color='inherit'
              onClick={() => router.push('/demo/style-guide')}
              sx={{ mr: 1 }}
            >
              Style Guide
            </Button>
            <Button color='inherit' onClick={() => router.push('/')}>
              Back to Site
            </Button>
          </Toolbar>
        </AppBar>

        <main>{children}</main>
      </Box>
    </ToastProvider>
  );
}
