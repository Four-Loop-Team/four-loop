import { AppBar, Box, Container, Toolbar } from '@mui/material';

/**
 * Loading skeleton for Navigation component
 * Displays a placeholder layout while the navigation is mounting/loading
 */
export default function NavigationSkeleton() {
  return (
    <AppBar
      position='sticky'
      elevation={0}
      component='nav'
      sx={{
        backgroundColor: 'var(--background-primary)',
        borderBottom: 'none',
        boxShadow: 'none',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: { xs: '100%', md: '1160px' },
          margin: '0 auto',
          padding: 0,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            minHeight: { xs: '100px', md: '146px' },
            px: { xs: '1.5rem', md: 0 },
            paddingLeft: { xs: '1.5rem', md: '54px' },
            paddingRight: { xs: '1.5rem', md: '54px' },
            alignItems: 'center',
            borderBottom: 'none',
            position: 'relative',
          }}
        >
          {/* Logo - Match real Navigation structure exactly */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              position: { xs: 'static', md: 'absolute' },
              top: { xs: 'auto', md: '74px' },
              left: { xs: 'auto', md: '54px' },
            }}
          >
            <Box
              sx={{
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                fontWeight: 600,
                letterSpacing: '0.1em',
                fontFamily: 'inherit',
                color: 'var(--text-inverse)',
                whiteSpace: 'nowrap',
              }}
            >
              FOUR LOOP{' '}
              <Box component='span' sx={{ color: 'var(--text-accent)' }}>
                DIGITAL
              </Box>
            </Box>
          </Box>

          {/* Spacer for desktop - pushes navigation to the right (like real Navigation) */}
          <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }} />

          {/* Desktop Navigation Skeleton - Match real Navigation with actual text content */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: '0px',
              backgroundColor: 'var(--background-accent)',
              borderRadius: 'var(--nav-container-border-radius)',
              padding: '0px',
              position: 'relative',
            }}
          >
            {/* Work button skeleton with actual text */}
            <Box
              sx={{
                padding: '6px 15px 6px 20px', // Match real Work button padding
                height: '44px',
                borderRadius: 'var(--nav-container-border-radius)',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                position: 'relative',
                zIndex: 2,
                fontSize: '1rem',
                fontWeight: 400,
                color: 'transparent', // Hide the text but keep the sizing
                border: '1px solid transparent',
                minWidth: 'auto',
              }}
            >
              Work
            </Box>

            {/* About Us button skeleton with actual text */}
            <Box
              sx={{
                padding: '6px 15px', // Match real About Us button padding
                height: '44px',
                borderRadius: 'var(--nav-container-border-radius)',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                position: 'relative',
                zIndex: 2,
                fontSize: '1rem',
                fontWeight: 400,
                color: 'transparent', // Hide the text but keep the sizing
                border: '1px solid transparent',
                minWidth: 'auto',
              }}
            >
              About Us
            </Box>

            {/* Contact button skeleton with actual text */}
            <Box
              sx={{
                padding: '6px 20px 6px 15px', // Match real Contact button padding
                height: '44px',
                borderRadius: 'var(--nav-container-border-radius)',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                position: 'relative',
                zIndex: 2,
                fontSize: '1rem',
                fontWeight: 400,
                color: 'transparent', // Hide the text but keep the sizing
                border: '1px solid transparent',
                minWidth: 'auto',
              }}
            >
              Contact
            </Box>
          </Box>

          {/* Mobile menu skeleton */}
          <Box
            sx={{
              display: { xs: 'block', md: 'none' },
              width: 44,
              height: 44,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
            }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
