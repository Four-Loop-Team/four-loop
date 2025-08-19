'use client';

import { useDesignSystem } from '@/lib/hooks';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import NavigationSkeleton from './NavigationSkeleton';

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
  const { colors } = useDesignSystem();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    // Brief delay to show skeleton loading state
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Add scroll detection with useLayoutEffect to prevent flash
  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };

    // Don't call handleScroll immediately - let it start transparent
    // The scroll listener will handle the state properly

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

      // Apply conditional logic for slider positioning
      let adjustedLeft = linkRect.left - containerRect.left;
      let adjustedWidth = linkRect.width;

      if (linkRect.left === containerRect.left) {
        // First item: extend width to the right
        adjustedLeft = 0;
        adjustedWidth = linkRect.width + 5;
      } else if (linkRect.right === containerRect.right) {
        // Last item: extend width to the left
        adjustedLeft = linkRect.left - containerRect.left - 5;
        adjustedWidth = linkRect.width + 5;
      } else {
        // Middle item: extend width on both sides
        adjustedLeft = linkRect.left - containerRect.left - 5;
        adjustedWidth = linkRect.width + 10;
      }

      setSliderStyle({
        left: adjustedLeft,
        width: adjustedWidth,
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

  // Show skeleton while component is mounting
  if (!mounted) {
    return <NavigationSkeleton />;
  }

  return (
    <>
      {/* Mobile Dropdown Menu - slides down from top */}
      <Box
        role='navigation'
        aria-label='Mobile navigation menu'
        id='mobile-navigation-menu'
        sx={{
          display: { xs: 'block', md: 'none' }, // Use responsive display instead of JS
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.background.accent,
          // Fixed height to match the transform of sticky nav
          height: mobileOpen ? '300px' : '0', // Reduced height for better content fit
          transform: mobileOpen ? 'translateY(0)' : 'translateY(-100%)',
          opacity: mobileOpen ? 1 : 0,
          visibility: mobileOpen ? 'visible' : 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 999, // Below the sticky nav
          borderTopLeftRadius: '86px', // Match contact section radius
          borderTopRightRadius: '86px', // Match contact section radius
          borderBottom: `1px solid ${colors.border.default}`,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          overflow: 'hidden',
          // Add padding for left/right edges, but handle top spacing separately
          px: '50px',
        }}
      >
        {/* Menu Handle */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: '15px', // Exactly 15px from top
            pb: '8px',
          }}
        >
          <Box
            sx={{
              width: '100px', // Increased to 100px long
              height: '4px',
              backgroundColor: colors.text.primary,
              borderRadius: '2px',
            }}
          />
        </Box>

        {/* Menu Items */}
        <Box
          sx={{
            // Reduced from 50px to 35px (50px - 15px)
            pt: '35px',
            pb: '16px', // Minimal bottom padding
          }}
        >
          {navigationItems.map((item, index) => {
            const active = isActive(item.href);
            return (
              <Box
                key={item.label}
                sx={{
                  borderTop:
                    index === 0 ? `1px solid ${colors.text.primary}` : 'none', // Line above first item
                  borderBottom: `1px solid ${colors.text.primary}`, // Line below every item
                }}
              >
                <Box
                  component={Link}
                  href={item.href}
                  onClick={handleNavClick}
                  prefetch={true}
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                    color: active ? colors.text.primary : colors.text.primary, // Always use primary text color for visibility
                    fontSize: '1.25rem',
                    fontWeight: active ? 600 : 400,
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    py: '16px', // Minimal padding - just enough for touch targets
                    '&:hover': {
                      color: colors.text.primary,
                      opacity: 0.7, // Use opacity for hover instead of color change
                    },
                  }}
                >
                  {item.label}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <AppBar
        position='sticky'
        elevation={0}
        component='nav'
        aria-label='Main navigation'
        color='inherit'
        sx={{
          backgroundColor: scrolled ? colors.background.primary : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
          borderBottom: 'none',
          boxShadow: 'none',
          zIndex: 1000, // Above the dropdown menu
          // Use transform based on mobileOpen state for mobile screens only
          transform: {
            xs: mobileOpen ? 'translateY(300px)' : 'translateY(0)',
            md: 'translateY(0)', // Never transform on desktop
          },
          // Add fade-out effect using mask for better visibility
          maskImage:
            'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
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
            <Link href='/' className='nav-brand-link' prefetch={true}>
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
                    color: 'var(--text-inverse)', // Use brand variable for white text
                    whiteSpace: 'nowrap', // Ensure whitespace is preserved
                  }}
                >
                  FOUR LOOP{' '}
                  <Box component='span' sx={{ color: 'var(--text-accent)' }}>
                    DIGITAL
                  </Box>
                </Box>
              </Box>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box
                ref={navContainerRef}
                sx={{
                  backgroundColor: 'var(--background-accent)',
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
                    backgroundColor: 'var(--background-secondary)',
                    border: '1px solid var(--border-accent)',
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
                    buttonPadding = '6px 15px 6px 20px';
                  } else if (item.label === 'About Us') {
                    buttonPadding = '6px 15px';
                  } else if (item.label === 'Contact') {
                    buttonPadding = '6px 20px 6px 15px';
                  } else {
                    buttonPadding = '6px 15px'; // fallback updated to match About Us
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className='nav-menu-link'
                      prefetch={true}
                    >
                      <Button
                        sx={{
                          color: active
                            ? 'var(--text-inverse)'
                            : 'var(--text-primary)',
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
                              ? 'var(--text-inverse)'
                              : 'var(--text-inverse)',
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

            {/* Mobile Menu Button - always render to prevent layout shift */}
            <Box
              sx={{
                display: { xs: 'block', md: 'none' }, // Use responsive display instead of JS
                minWidth: '60px', // Make it wider
                minHeight: '48px',
              }}
            >
              <IconButton
                edge='end'
                onClick={handleDrawerToggle}
                sx={{
                  color: colors.text.accent, // Use accent color to match "DIGITAL" text
                  width: '60px', // Make button wider
                  minHeight: '48px', // Increased size
                  padding: '12px', // Add padding for larger touch target
                  alignSelf: 'flex-start', // Align to top to match toolbar positioning
                  '& .MuiSvgIcon-root': {
                    fontSize: '2.25rem', // Make the icon even bigger
                    width: '36px', // Make icon wider
                    height: '36px', // Make icon taller
                  },
                }}
                aria-label={
                  mobileOpen ? 'Close navigation menu' : 'Open navigation menu'
                }
                aria-expanded={mobileOpen}
                aria-controls='mobile-navigation-menu'
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
