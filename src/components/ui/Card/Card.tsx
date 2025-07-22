import { useDesignSystem } from '@/lib/hooks';
import { HTMLAttributes, forwardRef } from 'react';

/**
 * Card component props interface
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card variant style */
  variant?: 'default' | 'elevated' | 'outlined';
  /** Internal padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Adds hover effects when true */
  hoverable?: boolean;
}

/**
 * A flexible card component with different variants and customizable content areas.
 *
 * @component
 * @example
 * ```tsx
 * <Card variant="elevated">
 *   <CardHeader title="Card Title" subtitle="Card subtitle" />
 *   <CardContent>
 *     <p>Card content goes here</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'md',
      hoverable = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const { colors, spacing, shadows, radius } = useDesignSystem();

    const baseStyles: React.CSSProperties = {
      backgroundColor: colors.background.inverse,
      borderRadius: radius.md,
    };

    const variantStyles: Record<string, React.CSSProperties> = {
      default: {
        border: `1px solid ${colors.border.muted}`,
      },
      elevated: {
        boxShadow: shadows.md,
      },
      outlined: {
        border: `2px solid ${colors.border.default}`,
      },
    };

    const paddingStyles: Record<string, React.CSSProperties> = {
      none: { padding: 0 },
      sm: { padding: spacing.component.sm },
      md: { padding: spacing.component.md },
      lg: { padding: spacing.component.lg },
    };

    const hoverStyles: React.CSSProperties = hoverable
      ? {
          transition: 'box-shadow 0.2s ease-in-out',
          cursor: 'pointer',
        }
      : {};

    const combinedStyles: React.CSSProperties = {
      ...baseStyles,
      ...variantStyles[variant],
      ...paddingStyles[padding],
      ...hoverStyles,
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (hoverable) {
        e.currentTarget.style.boxShadow = shadows.lg;
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (hoverable) {
        e.currentTarget.style.boxShadow =
          variantStyles[variant]?.boxShadow || shadows.md;
      }
    };

    return (
      <div
        ref={ref}
        style={combinedStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card subcomponents

/**
 * Card header component props interface
 */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Header title */
  title?: string;
  /** Optional subtitle */
  subtitle?: string;
}

/**
 * Card header component with title and optional subtitle.
 *
 * @component
 * @example
 * ```tsx
 * <CardHeader title="Card Title" subtitle="Card subtitle" />
 * ```
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, title, subtitle, className = '', ...props }, ref) => {
    const { colors, spacing } = useDesignSystem();

    const headerStyles: React.CSSProperties = {
      paddingBottom: spacing.component.sm,
      borderBottom: `1px solid ${colors.border.muted}`,
    };

    return (
      <div ref={ref} style={headerStyles} className={className} {...props}>
        {title && <h3 className='card-title'>{title}</h3>}
        {subtitle && <p className='card-subtitle'>{subtitle}</p>}
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * Card content area component props interface
 */
export type CardContentProps = HTMLAttributes<HTMLDivElement>;

/**
 * Card content area component for main content.
 *
 * @component
 * @example
 * ```tsx
 * <CardContent>
 *   <p>Your content here</p>
 * </CardContent>
 * ```
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = '', ...props }, ref) => {
    const { spacing } = useDesignSystem();

    const contentStyles: React.CSSProperties = {
      paddingTop: spacing.component.sm,
      paddingBottom: spacing.component.sm,
    };

    return (
      <div ref={ref} style={contentStyles} className={className} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

/**
 * Card footer component props interface
 */
export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

/**
 * Card footer component for actions and additional content.
 *
 * @component
 * @example
 * ```tsx
 * <CardFooter>
 *   <Button>Action</Button>
 * </CardFooter>
 * ```
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = '', ...props }, ref) => {
    const { colors, spacing } = useDesignSystem();

    const footerStyles: React.CSSProperties = {
      paddingTop: spacing.component.sm,
      borderTop: `1px solid ${colors.border.muted}`,
    };

    return (
      <div ref={ref} style={footerStyles} className={className} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export default Card;
