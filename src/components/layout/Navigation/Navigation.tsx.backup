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
import { useEffect, useRef, useState } from 'react';

const navigationItems = [
  { label: 'Work', href: '#work' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sliderPosition, setSliderPosition] = useState({ left: 0, width: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const [isNavigating, setIsNavigating] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const buttonRefs = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll-based active section detection with debouncing
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      // Skip scroll updates if user is actively navigating
      if (isNavigating) return;

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Debounce scroll updates to prevent rapid state changes
      scrollTimeoutRef.current = setTimeout(() => {
        const sections = ['home', 'work', 'about', 'contact'];
        const scrollPosition = window.scrollY + 200; // Offset for navigation height

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }, 100); // 100ms debounce
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [mounted, isNavigating]);

  // Update slider position based on active section
  useEffect(() => {
    if (!mounted || isMobile) return;

    const updateSliderPosition = () => {
      const activeIndex = navigationItems.findIndex(
        (item) => activeSection === item.href.substring(1) // Remove # from href
      );
      if (
        activeIndex === -1 ||
        !buttonRefs.current[activeIndex] ||
        !containerRef.current
      ) {
        setSliderPosition({ left: 0, width: 0 });
        return;
      }

      const activeButton = buttonRefs.current[activeIndex];
      const container = containerRef.current;

      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      const left = buttonRect.left - containerRect.left;
      const width = buttonRect.width;

      setSliderPosition({ left, width });
    };

    // Use requestAnimationFrame for smooth updates
    const rafId = requestAnimationFrame(updateSliderPosition);

    // Only add resize listener, not during every effect run
    const handleResize = () => {
      requestAnimationFrame(updateSliderPosition);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mounted, isMobile, activeSection]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (href: string) => {
    const sectionId = href.substring(1); // Remove # from href
    return activeSection === sectionId;
  };

  const handleNavClick = (href: string) => {
    const sectionId = href.substring(1);

    // Immediately update active section for instant slider movement
    setActiveSection(sectionId);

    // Set navigation flag to prevent scroll interference
    setIsNavigating(true);

    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 100; // Account for sticky navigation
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });

      // Clear navigation flag after scroll is likely complete
      setTimeout(() => {
        setIsNavigating(false);
      }, 1000); // Give enough time for smooth scroll to complete
    } else {
      // If section not found, clear navigation flag immediately
      setIsNavigating(false);
    }

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
              onClick={() => handleNavClick('#home')}
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
                ref={containerRef}
                sx={{
                  backgroundColor: 'var(--nav-container-background)',
                  borderRadius: 'var(--nav-container-border-radius)',
                  padding: '0px',
                  display: 'flex',
                  gap: '0px',
                  position: 'relative',
                }}
              >
                {/* Animated Background Slider */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    height: '100%',
                    backgroundColor: 'var(--nav-slider-background)',
                    borderRadius: 'var(--nav-container-border-radius)',
                    border: '2px solid var(--nav-slider-border)',
                    transition: 'var(--nav-slider-transition)',
                    willChange: 'left, width, opacity',
                    zIndex: 1,
                    left: `${sliderPosition.left}px`,
                    width: `${sliderPosition.width}px`,
                    opacity: sliderPosition.width > 0 ? 1 : 0,
                  }}
                />
                {navigationItems.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <Button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      ref={(el) => {
                        buttonRefs.current[index] = el;
                      }}
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
                        backgroundColor: 'transparent',
                        border: 'none',
                        marginLeft:
                          index > 0 ? 'var(--nav-button-overlap)' : '0px',
                        zIndex: 2,
                        position: 'relative',
                        '&:hover': {
                          color: active
                            ? 'var(--nav-text-active)'
                            : 'var(--nav-text-hover)',
                          zIndex: 3,
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
