'use client';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const navigationItems = [
  { label: 'Work', href: '/work' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Main navigation component with responsive design and optimized client-side routing.
 *
 * This component provides the primary navigation for the Four Loop Digital website,
 * featuring responsive mobile/desktop layouts, optimized client-side navigation with
 * Next.js Link components and prefetching, and visual active state indicators based
 * on current route. The header persists across page transitions for optimal UX.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Navigation />
 * ```
 *
 * @returns {JSX.Element} The rendered navigation component with responsive behavior
 *
 * @accessibility
 * - Supports keyboard navigation
 * - ARIA labels for mobile menu toggle
 * - Semantic navigation structure
 * - High contrast focus indicators
 *
 * @performance
 * - Client-side routing with Next.js Link components
 * - Page prefetching for instant navigation
 * - Conditional rendering for mobile/desktop
 * - Efficient active page detection
 * - Header persistence across page transitions
 */
export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [sliderStyle, setSliderStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = useCallback(
    (href: string) => {
      // Since / redirects to /work, treat both / and /work as active for the Work nav item
      if (href === '/work') {
        return pathname === '/' || pathname === '/work';
      }
      return pathname === href;
    },
    [pathname]
  );

  const updateSliderPosition = useCallback(() => {
    if (!navContainerRef.current || isMobile) return;

    const activeIndex = navigationItems.findIndex((item) =>
      isActive(item.href)
    );

    if (activeIndex === -1) {
      setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const links = navContainerRef.current.querySelectorAll('a');
    const activeLink = links[activeIndex];

    if (activeLink) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      setSliderStyle({
        left: linkRect.left - containerRect.left - 7.5, // Offset left by 7.5px to center the extra width
        width: linkRect.width + 15, // Make background 15px wider (was 10px, now adding 5px more)
        opacity: 1,
      });
    }
  }, [isMobile, isActive]);

  // Immediate position update on mount
  useEffect(() => {
    if (mounted && !isMobile) {
      // Use setTimeout to ensure DOM is ready, but make it immediate
      setTimeout(updateSliderPosition, 0);
    }
  }, [updateSliderPosition, mounted, isMobile]);

  useEffect(() => {
    // Immediate update on route change
    if (mounted && !isMobile) {
      updateSliderPosition();
    }
  }, [updateSliderPosition, mounted, isMobile]);

  useEffect(() => {
    const handleResize = () => {
      updateSliderPosition();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateSliderPosition]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = () => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  // Mobile drawer content
  const drawer = (
    <Box
      sx={{
        width: 'var(--nav-mobile-width)',
        height: '100%',
        bgcolor: 'transparent',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 3,
          borderBottom: '1px solid rgba(226, 232, 145, 0.2)',
        }}
      >
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: 'white',
            minWidth: '44px',
            minHeight: '44px',
            p: 1,
            '&:hover': {
              backgroundColor: 'rgba(226, 232, 145, 0.1)',
            },
          }}
        >
          <CloseIcon sx={{ fontSize: '1.5rem' }} />
        </IconButton>
      </Box>
      <List sx={{ px: 'var(--space-lg)', pt: 'var(--space-md)' }}>
        {navigationItems.map((item) => {
          const active = isActive(item.href);
          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 1.5 }}>
              <Link
                href={item.href}
                style={{ textDecoration: 'none', width: '100%' }}
                onClick={handleNavClick}
                prefetch={true}
              >
                <ListItemButton
                  sx={{
                    borderRadius: 3,
                    color: active
                      ? 'var(--drawer-active-text)'
                      : 'var(--drawer-inactive-text)',
                    backgroundColor: active
                      ? 'var(--drawer-active-background)'
                      : 'transparent',
                    border: active
                      ? '1px solid var(--drawer-active-border)'
                      : '1px solid transparent',
                    py: 'var(--space-lg)',
                    px: 'var(--space-2xl)',
                    transition: 'var(--nav-button-transition)',
                    '&:hover': {
                      backgroundColor: active
                        ? 'var(--drawer-hover-background)'
                        : 'rgba(255, 255, 255, 0.08)',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '1.1rem',
                        fontWeight: active ? 600 : 500,
                        letterSpacing: '0.02em',
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position='sticky'
        elevation={0}
        component='nav'
        aria-label='Main navigation'
        sx={{
          backgroundColor: 'var(--nav-background)',
          borderBottom: 'none',
          boxShadow: 'none', // Remove any shadow
          '&::after': {
            display: 'none', // Remove any pseudo-element borders
          },
          '&::before': {
            display: 'none', // Remove any pseudo-element borders
          },
          '& .MuiToolbar-root': {
            borderBottom: 'none !important',
          },
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            '& .MuiToolbar-root': { borderBottom: 'none' },
            maxWidth: { xs: '100%', md: '1160px' }, // Limit to 1160px on desktop
            margin: '0 auto', // Center the container
            padding: 0, // Remove container padding
          }}
        >
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              minHeight: { xs: '100px', md: '146px' }, // Updated header height: 146px
              px: { xs: '1.5rem', md: 0 }, // Remove default padding, will add specific spacing
              paddingLeft: { xs: '1.5rem', md: '54px' }, // Updated left spacing: 54px from edge
              paddingRight: { xs: '1.5rem', md: '54px' }, // Updated right spacing: 54px from edge
              alignItems: 'center', // Center items vertically by default
              borderBottom: 'none', // Ensure no border
              position: 'relative', // For absolute positioning of logo
            }}
          >
            {/* Logo */}
            <Link
              href='/'
              style={{ textDecoration: 'none', color: 'white' }}
              prefetch={true}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  position: { xs: 'static', md: 'absolute' }, // Absolute on desktop
                  top: { xs: 'auto', md: '74px' }, // Updated top positioning: 74px on desktop
                  left: { xs: 'auto', md: '54px' }, // Updated left positioning: 54px on desktop
                }}
              >
                <Box
                  sx={{
                    fontSize: { xs: '1.5rem', md: '1.75rem' }, // Adjust font size
                    fontWeight: 600,
                    letterSpacing: '0.1em', // Reduce letter spacing to match design
                    fontFamily: 'inherit',
                  }}
                >
                  FOUR LOOP{' '}
                  <Box
                    component='span'
                    sx={{ color: 'var(--nav-container-background)' }}
                  >
                    DIGITAL
                  </Box>
                </Box>
              </Box>
            </Link>

            {/* Desktop Navigation */}
            {mounted && !isMobile && (
              <Box
                ref={navContainerRef}
                sx={{
                  backgroundColor: 'var(--nav-container-background)',
                  borderRadius: 'var(--nav-container-border-radius)',
                  padding: '0px',
                  display: 'flex',
                  gap: '0px',
                  position: 'relative',
                }}
              >
                {/* Sliding Background */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    height: '100%',
                    backgroundColor: 'var(--nav-slider-background)',
                    border: '1px solid var(--nav-slider-border)',
                    borderRadius: 'var(--nav-container-border-radius)',
                    transition: 'var(--nav-slider-transition)',
                    zIndex: 1,
                    left: `${sliderStyle.left}px`,
                    width: `${sliderStyle.width}px`,
                    opacity: sliderStyle.opacity,
                  }}
                />
                {navigationItems.map((item) => {
                  const active = isActive(item.href);

                  // Define specific padding for each navigation item
                  let buttonPadding;
                  if (item.label === 'Work') {
                    buttonPadding = '0 15px 0 20px';
                  } else if (item.label === 'About Us') {
                    buttonPadding = '0 15px';
                  } else if (item.label === 'Contact') {
                    buttonPadding = '0 20px 0 15px';
                  } else {
                    buttonPadding = '0 15px'; // fallback updated to match About Us
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      style={{ textDecoration: 'none' }}
                      prefetch={true}
                    >
                      <Button
                        sx={{
                          color: active
                            ? 'var(--nav-text-active)'
                            : 'var(--nav-text-inactive)',
                          textTransform: 'none',
                          fontSize: '1rem',
                          fontWeight: 400, // Normal weight, not bold
                          padding: buttonPadding, // Custom padding for each button
                          borderRadius: 'var(--nav-container-border-radius)',
                          minWidth: 'auto',
                          backgroundColor: 'transparent',
                          border: '1px solid transparent',
                          margin: 0, // All buttons have 0 margin
                          zIndex: 2,
                          position: 'relative',
                          transition: 'color 0.15s ease',
                          '&:hover': {
                            color: active
                              ? 'var(--nav-text-active)'
                              : 'var(--nav-text-hover)',
                            backgroundColor: 'transparent',
                          },
                        }}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </Box>
            )}

            {/* Mobile Menu Button */}
            {mounted && isMobile && (
              <IconButton
                edge='end'
                onClick={handleDrawerToggle}
                sx={{
                  color: 'white',
                  minWidth: '44px',
                  minHeight: '44px',
                  alignSelf: 'flex-start', // Align to top to match toolbar positioning
                }}
                aria-label={
                  mobileOpen ? 'Close navigation menu' : 'Open navigation menu'
                }
                aria-expanded={mobileOpen}
                aria-controls='mobile-navigation-menu'
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      {mounted && (
        <Drawer
          variant='temporary'
          anchor='right'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          PaperProps={{
            id: 'mobile-navigation-menu',
            role: 'navigation',
            'aria-label': 'Mobile navigation menu',
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 'var(--nav-mobile-width)',
              backgroundColor: 'var(--drawer-background)',
              backgroundImage:
                'linear-gradient(135deg, var(--drawer-background) 0%, #2d4747 100%)',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
}
