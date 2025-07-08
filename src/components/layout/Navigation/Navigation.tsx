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
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const navigationItems = [
  { label: 'Work', href: '/work' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Main navigation component with responsive design and page routing.
 *
 * This component provides the primary navigation for the Four Loop Digital website,
 * featuring responsive mobile/desktop layouts, page-based routing between sections,
 * and visual active state indicators based on current route.
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
 * - Client-side routing with Next.js
 * - Conditional rendering for mobile/desktop
 * - Efficient active page detection
 */
export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (href: string) => {
    // Since / redirects to /work, treat both / and /work as active for the Work nav item
    if (href === '/work') {
      return pathname === '/' || pathname === '/work';
    }
    return pathname === href;
  };

  const handleNavClick = (href: string) => {
    router.push(href);
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
              <ListItemButton
                onClick={() => handleNavClick(item.href)}
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
            <Box
              onClick={() => handleNavClick('/')}
              sx={{
                textDecoration: 'none',
                color: 'white',
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

            {/* Desktop Navigation */}
            {mounted && !isMobile && (
              <Box
                sx={{
                  backgroundColor: 'var(--nav-container-background)',
                  borderRadius: 'var(--nav-container-border-radius)',
                  padding: '0px',
                  display: 'flex',
                  gap: '0px',
                  position: 'relative',
                }}
              >
                {navigationItems.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <Button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
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
                        backgroundColor: active
                          ? 'var(--nav-slider-background)'
                          : 'transparent',
                        border: active
                          ? '2px solid var(--nav-slider-border)'
                          : '2px solid transparent',
                        marginLeft:
                          index > 0 ? 'var(--nav-button-overlap)' : '0px',
                        zIndex: 2,
                        position: 'relative',
                        transition: 'var(--nav-slider-transition)',
                        '&:hover': {
                          color: active
                            ? 'var(--nav-text-active)'
                            : 'var(--nav-text-hover)',
                          backgroundColor: active
                            ? 'var(--nav-slider-background)'
                            : 'rgba(226, 232, 145, 0.1)',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
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
