/**
 * @fileoverview Theme Provider Component for managing application-wide theme state.
 * Provides theme switching functionality with local storage persistence and system preference detection.
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Available theme options for the application.
 */
type Theme = 'light' | 'dark' | 'auto';

/**
 * Theme context interface defining available theme operations.
 */
interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook to access theme context and operations.
 * Must be used within a ThemeProvider component.
 *
 * @returns Theme context with current theme state and operations
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, setTheme, toggleTheme } = useTheme();
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       Current theme: {theme}
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Props for the ThemeProvider component.
 */
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

/**
 * ThemeProvider component that manages theme state and provides context to child components.
 * Handles theme persistence, system preference detection, and CSS class application.
 *
 * @param props - ThemeProvider configuration
 * @param props.children - Child components that will have access to theme context
 * @param props.defaultTheme - Default theme to use (defaults to 'auto')
 * @param props.storageKey - Local storage key for theme persistence (defaults to 'theme')
 * @returns Theme provider context wrapper
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <ThemeProvider defaultTheme="light" storageKey="app-theme">
 *       <YourAppComponents />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = 'auto',
  storageKey = 'four-loop-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme;
    if (savedTheme) {
      setThemeState(savedTheme);
    }
    setMounted(true);
  }, [storageKey]);

  // Update resolved theme based on current theme and system preference
  useEffect(() => {
    const updateResolvedTheme = () => {
      let resolved: 'light' | 'dark';

      if (theme === 'auto') {
        resolved = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      } else {
        resolved = theme;
      }

      setResolvedTheme(resolved);

      // Update document data attribute
      document.documentElement.setAttribute('data-theme', resolved);

      // Also update class for compatibility
      document.documentElement.classList.toggle('dark', resolved === 'dark');
    };

    if (mounted) {
      updateResolvedTheme();

      // Listen for system theme changes when in auto mode
      if (theme === 'auto') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', updateResolvedTheme);
        return () =>
          mediaQuery.removeEventListener('change', updateResolvedTheme);
      }
    }

    // Return undefined for other cases
    return undefined;
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  const toggleTheme = () => {
    if (theme === 'auto') {
      // When in auto mode, toggle to the opposite of current resolved theme
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    } else {
      // When manually set, toggle between light and dark
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };

  // Don't update DOM until mounted to avoid hydration mismatch, but still provide context
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Theme Toggle Button Component
 * Pre-built component for theme switching
 */
interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'p-1 text-sm',
    md: 'p-2 text-base',
    lg: 'p-3 text-lg',
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        inline-flex items-center justify-center
        rounded-md border border-default
        bg-surface hover:bg-surface-secondary
        transition-colors duration-200
        ${sizeClasses[size]}
        ${className}
      `}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Current theme: ${theme} (${resolvedTheme})`}
    >
      {resolvedTheme === 'dark' ? (
        // Sun icon for light mode
        <svg
          style={{ width: '1.25rem', height: '1.25rem' }}
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707' />
          <circle cx='12' cy='12' r='5' />
        </svg>
      ) : (
        // Moon icon for dark mode
        <svg
          style={{ width: '1.25rem', height: '1.25rem' }}
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' />
        </svg>
      )}
    </button>
  );
}

/**
 * Theme Selector Component
 * Dropdown for selecting between light, dark, and auto themes
 */
export function ThemeSelector({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as Theme)}
      className={`
        input rounded-md border-default
        bg-surface text-primary
        focus:ring focus:border-interactive
        ${className}
      `}
      aria-label='Select theme'
    >
      <option value='light'>Light</option>
      <option value='dark'>Dark</option>
      <option value='auto'>Auto (System)</option>
    </select>
  );
}
