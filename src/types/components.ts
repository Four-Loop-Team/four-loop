/**
 * Component prop type definitions
 */

import { ReactNode } from 'react';
import { A11yProps, GridProps, NavigationItem } from './global';

// Logo component props
export interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

// Navigation component props
export interface NavigationProps {
  items: NavigationItem[];
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
  className?: string;
}

// Grid component props
export interface GridComponentProps extends GridProps {
  children: ReactNode;
  container?: boolean;
  item?: boolean;
  className?: string;
}

// Breadcrumb navigation props
export interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
  separator?: ReactNode;
  className?: string;
}

// Skip navigation link props
export interface SkipNavigationLinkProps extends A11yProps {
  target: string;
  children: ReactNode;
  className?: string;
}

// Grid system demo props
export interface GridSystemDemoProps {
  showLabels?: boolean;
  interactive?: boolean;
  className?: string;
}

// Theme provider props
export interface MuiThemeProviderProps {
  children: ReactNode;
  theme?: 'light' | 'dark' | 'auto';
}
