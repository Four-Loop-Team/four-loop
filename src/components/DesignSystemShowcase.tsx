/**
 * @fileoverview Design System Component Examples and demonstrations.
 * Showcases how to use enhanced design tokens in React components with comprehensive examples.
 */

import React from 'react';
import { DESIGN_SYSTEM } from '../constants/design-system';

/**
 * Props for the Button component.
 */
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * Button component implementing design system tokens for consistent styling.
 * Provides multiple variants and sizes following the established design system.
 *
 * @param props - Button configuration
 * @param props.variant - Visual style variant (defaults to 'primary')
 * @param props.size - Size variant (defaults to 'md')
 * @param props.children - Button content
 * @param props.onClick - Click event handler
 * @param props.disabled - Whether the button is disabled
 * @returns Styled button component with design system tokens
 *
 * @example
 * ```tsx
 * // Primary button (default)
 * <Button onClick={() => alert('Clicked!')}>
 *   Primary Action
 * </Button>
 *
 * // Secondary button with different size
 * <Button variant="secondary" size="lg">
 *   Secondary Action
 * </Button>
 *
 * // Disabled tertiary button
 * <Button variant="tertiary" disabled>
 *   Disabled Action
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
}) => {
  const styles = {
    // Base styles using design tokens
    padding: DESIGN_SYSTEM.components.button.padding[size],
    fontSize: DESIGN_SYSTEM.components.button.fontSize[size],
    fontWeight: DESIGN_SYSTEM.typography.weights.medium,
    borderRadius: DESIGN_SYSTEM.components.button.borderRadius,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: DESIGN_SYSTEM.animation.presets.all,
    boxShadow: disabled ? 'none' : DESIGN_SYSTEM.components.button.shadow,

    // Variant-specific styles
    ...(variant === 'primary' && {
      backgroundColor: disabled
        ? DESIGN_SYSTEM.colors.extended.disabled.background
        : DESIGN_SYSTEM.colors.brand.primary[500],
      color: disabled ? DESIGN_SYSTEM.colors.extended.disabled.text : '#ffffff',
    }),

    ...(variant === 'secondary' && {
      backgroundColor: disabled
        ? DESIGN_SYSTEM.colors.extended.disabled.background
        : 'transparent',
      color: disabled
        ? DESIGN_SYSTEM.colors.extended.disabled.text
        : DESIGN_SYSTEM.colors.brand.primary[600],
      border: `1px solid ${
        disabled
          ? DESIGN_SYSTEM.colors.extended.disabled.border
          : DESIGN_SYSTEM.colors.brand.primary[300]
      }`,
    }),

    ...(variant === 'tertiary' && {
      backgroundColor: 'transparent',
      color: disabled
        ? DESIGN_SYSTEM.colors.extended.disabled.text
        : DESIGN_SYSTEM.colors.brand.primary[600],
      padding: `${DESIGN_SYSTEM.spacing.scale[2]} ${DESIGN_SYSTEM.spacing.scale[3]}`,
    }),
  };

  return (
    <button
      style={styles}
      onClick={onClick}
      disabled={disabled}
      className='button'
    >
      {children}
    </button>
  );
};

/**
 * Props for the Card component.
 */
interface CardProps {
  children: React.ReactNode;
  elevation?: 'sm' | 'md' | 'lg';
  padding?: 'sm' | 'md' | 'lg';
}

/**
 * Card component using design system tokens for consistent container styling.
 * Provides elevation levels and padding options following the design system specifications.
 *
 * @param props - Card configuration
 * @param props.children - Content to be displayed within the card
 * @param props.elevation - Shadow depth level (defaults to 'md')
 * @param props.padding - Internal spacing level (defaults to 'md')
 * @returns Styled card container with design system styling
 *
 * @example
 * ```tsx
 * // Basic card with default styling
 * <Card>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here.</p>
 * </Card>
 *
 * // Card with high elevation and large padding
 * <Card elevation="lg" padding="lg">
 *   <h2>Important Content</h2>
 *   <p>This card stands out more.</p>
 * </Card>
 *
 * // Subtle card with minimal styling
 * <Card elevation="sm" padding="sm">
 *   <span>Compact content</span>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  children,
  elevation = 'md',
  padding = 'md',
}) => {
  const paddingMap = {
    sm: DESIGN_SYSTEM.spacing.scale[4],
    md: DESIGN_SYSTEM.spacing.scale[6],
    lg: DESIGN_SYSTEM.spacing.scale[8],
  };

  const shadowMap = {
    sm: DESIGN_SYSTEM.shadows.sm,
    md: DESIGN_SYSTEM.shadows.md,
    lg: DESIGN_SYSTEM.shadows.lg,
  };

  const styles = {
    backgroundColor: DESIGN_SYSTEM.colors.contextual.surface.primary,
    borderRadius: DESIGN_SYSTEM.components.card.borderRadius,
    padding: paddingMap[padding],
    boxShadow: shadowMap[elevation],
    border: `1px solid ${DESIGN_SYSTEM.colors.contextual.border.default}`,
  };

  return (
    <div style={styles} className='card'>
      {children}
    </div>
  );
};

/**
 * Props for the Input component.
 */
interface InputProps {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  disabled?: boolean;
}

/**
 * Input component using design system tokens for consistent form field styling.
 * Provides multiple sizes and states following the design system specifications.
 *
 * @param props - Input configuration
 * @param props.type - Input type (defaults to 'text')
 * @param props.placeholder - Placeholder text
 * @param props.value - Current input value
 * @param props.onChange - Change event handler
 * @param props.size - Size variant (defaults to 'md')
 * @param props.error - Whether the input is in error state
 * @param props.disabled - Whether the input is disabled
 * @returns Styled input field with design system tokens
 *
 * @example
 * ```tsx
 * // Basic text input
 * <Input
 *   placeholder="Enter your name"
 *   onChange={(e) => setValue(e.target.value)}
 * />
 *
 * // Email input with error state
 * <Input
 *   type="email"
 *   placeholder="email@example.com"
 *   error={hasError}
 *   size="lg"
 * />
 *
 * // Disabled password input
 * <Input
 *   type="password"
 *   disabled
 *   placeholder="Password"
 * />
 * ```
 */
export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  size = 'md',
  error = false,
  disabled = false,
}) => {
  const styles = {
    padding: DESIGN_SYSTEM.components.input.padding[size],
    fontSize: DESIGN_SYSTEM.components.input.fontSize[size],
    borderRadius: DESIGN_SYSTEM.components.input.borderRadius,
    border: `1px solid ${
      error
        ? DESIGN_SYSTEM.colors.semantic.error[500]
        : DESIGN_SYSTEM.colors.contextual.border.default
    }`,
    backgroundColor: disabled
      ? DESIGN_SYSTEM.colors.extended.disabled.background
      : DESIGN_SYSTEM.colors.contextual.surface.primary,
    color: disabled
      ? DESIGN_SYSTEM.colors.extended.disabled.text
      : DESIGN_SYSTEM.colors.contextual.text.primary,
    transition: DESIGN_SYSTEM.animation.presets.color,
    outline: 'none',
    width: '100%',

    '&:focus': {
      borderColor: error
        ? DESIGN_SYSTEM.colors.semantic.error[500]
        : DESIGN_SYSTEM.colors.brand.primary[500],
      boxShadow: `0 0 0 2px ${
        error
          ? DESIGN_SYSTEM.colors.semantic.error[100]
          : DESIGN_SYSTEM.colors.brand.primary[100]
      }`,
    },
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={styles}
      className='design-system-input'
    />
  );
};

// Typography Component using design tokens
interface TypographyProps {
  variant?: 'display' | 'heading' | 'body' | 'label' | 'caption' | 'overline';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'tertiary' | 'brand';
  align?: 'left' | 'center' | 'right';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
  color = 'primary',
  align = 'left',
  as,
}) => {
  const variantStyles = DESIGN_SYSTEM.typography.semantic[variant];

  const colorMap = {
    primary: DESIGN_SYSTEM.colors.contextual.text.primary,
    secondary: DESIGN_SYSTEM.colors.contextual.text.secondary,
    tertiary: DESIGN_SYSTEM.colors.contextual.text.tertiary,
    brand: DESIGN_SYSTEM.colors.contextual.text.brand,
  };

  const styles: React.CSSProperties = {
    ...variantStyles,
    color: colorMap[color],
    textAlign: align,
    margin: 0,
  };

  // Choose appropriate HTML element based on variant or explicit 'as' prop
  const getElement = () => {
    if (as) return as;
    if (variant === 'display' || variant === 'heading') return 'h2';
    if (variant === 'body') return 'p';
    if (variant === 'caption' || variant === 'overline' || variant === 'label')
      return 'span';
    return 'p';
  };

  const Element = getElement();

  return React.createElement(
    Element as React.ElementType,
    { style: styles },
    children
  );
};

// Layout Grid using design tokens
interface GridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: keyof typeof DESIGN_SYSTEM.spacing.semantic.component;
  responsive?: boolean;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 1,
  gap = 'md',
  responsive = true,
}) => {
  const styles = {
    display: 'grid',
    gridTemplateColumns: responsive
      ? `repeat(auto-fit, minmax(300px, 1fr))`
      : `repeat(${columns}, 1fr)`,
    gap: DESIGN_SYSTEM.spacing.semantic.component[gap],
    width: '100%',
  };

  return (
    <div style={styles} className='grid'>
      {children}
    </div>
  );
};

// Example component showcasing the design system
export const DesignSystemShowcase: React.FC = () => {
  return (
    <div style={{ padding: DESIGN_SYSTEM.spacing.scale[8] }}>
      <Typography variant='display' color='brand' align='center' as='h1'>
        Design System Showcase
      </Typography>

      <div style={{ marginTop: DESIGN_SYSTEM.spacing.scale[8] }}>
        <Grid columns={3} gap='lg'>
          <Card elevation='sm'>
            <Typography variant='heading' as='h3'>
              Buttons
            </Typography>
            <div
              style={{
                display: 'flex',
                gap: DESIGN_SYSTEM.spacing.scale[4],
                marginTop: DESIGN_SYSTEM.spacing.scale[4],
                flexDirection: 'column',
              }}
            >
              <Button variant='primary' size='lg'>
                Primary Large
              </Button>
              <Button variant='secondary' size='md'>
                Secondary Medium
              </Button>
              <Button variant='tertiary' size='sm'>
                Tertiary Small
              </Button>
              <Button variant='primary' disabled>
                Disabled
              </Button>
            </div>
          </Card>

          <Card elevation='md'>
            <Typography variant='heading' as='h3'>
              Inputs
            </Typography>
            <div
              style={{
                marginTop: DESIGN_SYSTEM.spacing.scale[4],
                display: 'flex',
                flexDirection: 'column',
                gap: DESIGN_SYSTEM.spacing.scale[3],
              }}
            >
              <Input placeholder='Default input' />
              <Input placeholder='Large input' size='lg' />
              <Input placeholder='Error state' error />
              <Input placeholder='Disabled' disabled />
            </div>
          </Card>

          <Card elevation='lg'>
            <Typography variant='heading' as='h3'>
              Typography
            </Typography>
            <div style={{ marginTop: DESIGN_SYSTEM.spacing.scale[4] }}>
              <Typography variant='heading' color='brand' as='h4'>
                Heading 4
              </Typography>
              <Typography variant='body'>
                Body text with normal weight and spacing.
              </Typography>
              <Typography variant='body' color='secondary'>
                Secondary body text that&apos;s slightly smaller.
              </Typography>
              <Typography variant='caption' color='tertiary'>
                Caption text for fine print and descriptions.
              </Typography>
            </div>
          </Card>
        </Grid>
      </div>
    </div>
  );
};
