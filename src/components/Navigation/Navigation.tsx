'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { label: 'Work', href: '/work' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sliderPosition, setSliderPosition] = useState({ left: 0, width: 0 });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const buttonRefs = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isMobile) return;

    const updateSliderPosition = () => {
      const activeIndex = navigationItems.findIndex(
        (item) => pathname === item.href,
      );
      if (
        activeIndex === -1 ||
        !buttonRefs.current[activeIndex] ||
        !containerRef.current
      ) {
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

    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateSliderPosition, 50);

    // Update on resize
    window.addEventListener('resize', updateSliderPosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateSliderPosition);
    };
  }, [mounted, isMobile, pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 300, height: '100%', bgcolor: 'transparent' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 3,
          borderBottom: '1px solid rgba(168, 198, 134, 0.2)',
        }}
      >
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: 'white',
            p: 1,
            '&:hover': {
              backgroundColor: 'rgba(168, 198, 134, 0.1)',
            },
          }}
        >
          <CloseIcon sx={{ fontSize: '1.5rem' }} />
        </IconButton>
      </Box>
      <List sx={{ px: 3, pt: 2 }}>
        {navigationItems.map((item) => {
          const active = isActive(item.href);
          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 1.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 3,
                  color: active ? '#a8c686' : 'white',
                  backgroundColor: active
                    ? 'rgba(168, 198, 134, 0.15)'
                    : 'transparent',
                  border: active
                    ? '1px solid rgba(168, 198, 134, 0.3)'
                    : '1px solid transparent',
                  py: 1.5,
                  px: 2.5,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: active
                      ? 'rgba(168, 198, 134, 0.25)'
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
        sx={{
          backgroundColor: '#3a5a5a',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Container maxWidth='xl'>
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              minHeight: { xs: 64, md: 80 },
              px: { xs: 2, md: 3 },
            }}
          >
            {/* Logo */}
            <Box
              component={Link}
              href='/'
              sx={{
                textDecoration: 'none',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
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
                <Box component='span' sx={{ color: '#a8c686' }}>
                  DIGITAL
                </Box>
              </Box>
            </Box>

            {/* Desktop Navigation */}
            {mounted && !isMobile && (
              <Box
                ref={containerRef}
                sx={{
                  backgroundColor: '#a8c686',
                  borderRadius: '50px',
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
                    backgroundColor: '#3a5a5a',
                    borderRadius: '50px',
                    border: '2px solid #a8c686',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
                      component={Link}
                      href={item.href}
                      ref={(el) => {
                        buttonRefs.current[index] = el;
                      }}
                      sx={{
                        color: active ? 'white' : '#3a5a5a',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                        px: 3,
                        py: 1,
                        borderRadius: '50px',
                        minWidth: 'auto',
                        backgroundColor: 'transparent',
                        border: 'none',
                        marginLeft: index > 0 ? '-20px' : '0px',
                        zIndex: 2,
                        position: 'relative',
                        '&:hover': {
                          color: active ? 'white' : 'white',
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
                sx={{ color: 'white' }}
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
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 300,
              backgroundColor: '#3a5a5a',
              backgroundImage:
                'linear-gradient(135deg, #3a5a5a 0%, #2d4747 100%)',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
}
