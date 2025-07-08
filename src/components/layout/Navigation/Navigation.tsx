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
import styles from './Navigation.module.scss';

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
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const navContainerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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

  // Update slider position when pathname changes or component mounts
  const updateSliderPosition = useCallback(() => {
    if (!navContainerRef.current) return;

    const activeIndex = navigationItems.findIndex((item) =>
      isActive(item.href)
    );
    if (activeIndex === -1) {
      setSliderStyle({ left: 0, width: 0 });
      return;
    }

    const buttons = navContainerRef.current.querySelectorAll('a');
    const activeButton = buttons[activeIndex];

    if (activeButton) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setSliderStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      });
    }
  }, [isActive]);

  useEffect(() => {
    if (mounted && !isMobile && navContainerRef.current) {
      updateSliderPosition();
    }
  }, [pathname, mounted, isMobile, updateSliderPosition]);

  // Add resize listener to update slider position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (mounted && !isMobile && navContainerRef.current) {
        updateSliderPosition();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mounted, isMobile, updateSliderPosition]);

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
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Container maxWidth='xl'>
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              minHeight: { xs: 64, md: 80 },
              px: { xs: 'var(--space-md)', md: 'var(--space-lg)' },
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
                }}
              >
                <Box
                  sx={{
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    fontWeight: 600,
                    letterSpacing: '0.1em',
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
                className={styles.navigation__container}
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
                  className={styles.navigation__slider}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    height: '100%',
                    backgroundColor: 'var(--nav-slider-background)',
                    border: '2px solid var(--nav-slider-border)',
                    borderRadius: 'var(--nav-container-border-radius)',
                    transition: 'var(--nav-slider-transition)',
                    transform: `translateX(${sliderStyle.left}px)`,
                    width: `${sliderStyle.width}px`,
                    zIndex: 1,
                  }}
                />
                {navigationItems.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      style={{ textDecoration: 'none' }}
                      prefetch={true}
                    >
                      <Button
                        className={`${styles.navigation__button} ${
                          active
                            ? styles['navigation__button--active']
                            : styles['navigation__button--inactive']
                        }`}
                        sx={{
                          color: active
                            ? 'var(--nav-text-active)'
                            : 'var(--nav-text-inactive)',
                          textTransform: 'none',
                          fontSize: '1rem',
                          fontWeight: 500,
                          px: 'var(--nav-button-padding-x)',
                          py: 'var(--nav-button-padding-y)',
                          borderRadius: 'var(--nav-container-border-radius)',
                          minWidth: 'auto',
                          backgroundColor: 'transparent', // Remove individual button background
                          border: '2px solid transparent',
                          marginLeft:
                            index > 0 ? 'var(--nav-button-overlap)' : '0px',
                          zIndex: 2,
                          position: 'relative',
                          transition: 'var(--nav-button-transition)',
                          '&:hover': {
                            color: active
                              ? 'var(--nav-text-active)'
                              : 'var(--nav-text-hover)',
                            backgroundColor: 'transparent', // Keep background transparent on hover
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
