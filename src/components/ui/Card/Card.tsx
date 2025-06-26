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
    const baseClasses = 'bg-white rounded-lg';

    const variantClasses = {
      default: 'border border-gray-200',
      elevated: 'shadow-md',
      outlined: 'border-2 border-gray-300',
    };

    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const hoverClasses = hoverable ? 'transition-shadow hover:shadow-lg' : '';

    const classes = [
      baseClasses,
      variantClasses[variant],
      paddingClasses[padding],
      hoverClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
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
    const classes = ['pb-4 border-b border-gray-200', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {title && (
          <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
        )}
        {subtitle && <p className='mt-1 text-sm text-gray-600'>{subtitle}</p>}
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
    const classes = ['py-4', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
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
    const classes = ['pt-4 border-t border-gray-200', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export default Card;
