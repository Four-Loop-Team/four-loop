/**
 * @fileoverview Timeline Component - Flexible timeline for displaying chronological events.
 * @component Timeline
 *
 * @description
 * Provides versatile timeline visualization with customizable appearance and behavior.
 * Perfect for displaying chronological events, project milestones, or process steps with:
 * - Vertical and horizontal orientations
 * - Custom item styling and content
 * - Responsive design
 * - Accessibility support
 * - Flexible timestamp formatting
 *
 * @example
 * ```tsx
 * // Basic timeline
 * <Timeline
 *   items={[
 *     {
 *       timestamp: new Date('2023-01-01'),
 *       title: 'Project Started',
 *       description: 'Initial project setup and planning'
 *     },
 *     {
 *       timestamp: new Date('2023-02-15'),
 *       title: 'First Milestone',
 *       description: 'Completed core functionality'
 *     }
 *   ]}
 * />
 *
 * // Horizontal timeline with custom formatting
 * <Timeline
 *   items={timelineItems}
 *   orientation="horizontal"
 *   formatTimestamp={(date) => date.toLocaleDateString()}
 * />
 * ```
 */

import React, { useMemo } from 'react';
import { useDesignSystem } from '../../../hooks/useDesignSystem';
import { TimelineItemProps, TimelineProps } from './types';

/**
 * Default timestamp formatter function for timeline items.
 * Formats dates using Intl.DateTimeFormat with localized formatting.
 *
 * @param timestamp - Date object or ISO string to format
 * @returns Formatted date string
 */
const defaultFormatTimestamp = (timestamp: Date | string): string => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;

  // Handle invalid dates gracefully
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Timeline component for displaying chronological events in a visual timeline format.
 * Supports vertical and horizontal orientations with customizable styling and behavior.
 *
 * @component
 * @param props - Timeline configuration options
 * @param props.items - Array of timeline items to display
 * @param props.orientation - Timeline layout direction ('vertical' | 'horizontal')
 * @param props.variant - Visual style variant ('default' | 'compact' | 'detailed')
 * @param props.size - Timeline size ('sm' | 'md' | 'lg')
 * @param props.showTimestamps - Whether to display timestamps for items
 * @param props.formatTimestamp - Custom timestamp formatting function
 * @param props.showConnectors - Whether to show connecting lines between items
 * @param props.reverse - Whether to reverse the chronological order
 * @param props.loading - Whether the timeline is in loading state
 * @param props.loadingMessage - Message to display while loading
 * @param props.emptyMessage - Message to display when no items exist
 * @param props.onItemClick - Click handler for timeline items
 * @param props.itemRenderer - Custom renderer for timeline items
 * @param props.className - Additional CSS classes for the timeline container
 * @param props.itemClassName - Additional CSS classes for timeline items
 * @returns Timeline component with chronological event display
 *
 * @example
 * ```tsx
 * // Basic timeline with events
 * <Timeline
 *   items={[
 *     {
 *       id: '1',
 *       title: 'Project Started',
 *       description: 'Initial project setup and planning',
 *       timestamp: new Date('2024-01-01'),
 *       status: 'completed'
 *     },
 *     {
 *       id: '2',
 *       title: 'Development Phase',
 *       description: 'Core feature development',
 *       timestamp: new Date('2024-02-15'),
 *       status: 'in-progress'
 *     }
 *   ]}
 *   orientation="vertical"
 *   showTimestamps={true}
 * />
 *
 * // Horizontal timeline with custom formatting
 * <Timeline
 *   items={events}
 *   orientation="horizontal"
 *   variant="compact"
 *   formatTimestamp={(date) => format(date, 'MMM dd')}
 *   onItemClick={(item) => setSelectedEvent(item)}
 * />
 * ```
 */
const Timeline: React.FC<TimelineProps> = ({
  items,
  orientation = 'vertical',
  variant = 'default',
  size = 'md',
  showTimestamps = true,
  formatTimestamp = defaultFormatTimestamp,
  showConnectors = true,
  reverse = false,
  loading = false,
  loadingMessage = 'Loading timeline...',
  emptyMessage = 'No timeline items to display',
  onItemClick,
  itemRenderer,
  className = '',
  itemClassName = '',
  'data-testid': testId = 'timeline',
}) => {
  const tokens = useDesignSystem();

  // Sort and reverse items if needed
  const sortedItems = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      const dateA =
        typeof a.timestamp === 'string' ? new Date(a.timestamp) : a.timestamp;
      const dateB =
        typeof b.timestamp === 'string' ? new Date(b.timestamp) : b.timestamp;

      // Handle invalid dates - put them at the end
      const timeA = dateA.getTime();
      const timeB = dateB.getTime();

      if (isNaN(timeA) && isNaN(timeB)) return 0;
      if (isNaN(timeA)) return 1;
      if (isNaN(timeB)) return -1;

      return timeB - timeA; // Latest first by default
    });
    return reverse ? sorted.reverse() : sorted;
  }, [items, reverse]);

  const getOrientationStyles = (orientation: 'vertical' | 'horizontal') => {
    switch (orientation) {
      case 'horizontal':
        return {
          display: 'flex',
          flexDirection: 'row' as const,
          overflowX: 'auto' as const,
          gap: tokens.spacing.component.lg,
        };
      default:
        return {
          display: 'flex',
          flexDirection: 'column' as const,
          gap: tokens.spacing.component.sm,
        };
    }
  };

  const getVariantSpacing = (variant: 'default' | 'minimal' | 'detailed') => {
    switch (variant) {
      case 'minimal':
        return tokens.spacing.component.xs;
      case 'detailed':
        return tokens.spacing.component.lg;
      default:
        return tokens.spacing.component.sm;
    }
  };

  if (loading) {
    return (
      <div
        className={`timeline-loading-wrapper ${className}`}
        data-testid={`${testId}-loading`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: tokens.spacing.layout.lg,
          gap: tokens.spacing.component.sm,
        }}
      >
        <div
          className='timeline-loading'
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: tokens.spacing.component.sm,
            color: tokens.colors.text.muted,
          }}
        >
          <svg
            className='timeline-spinner'
            fill='none'
            viewBox='0 0 24 24'
            style={{
              width: '24px',
              height: '24px',
              animation: 'spin 1s linear infinite',
            }}
          >
            <circle
              className='timeline-spinner-circle'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
              style={{ opacity: 0.25 }}
            />
            <path
              className='timeline-spinner-path'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              style={{ opacity: 0.75 }}
            />
          </svg>
          <span style={{ fontSize: tokens.typography.fontSize.base }}>
            {loadingMessage}
          </span>
        </div>
      </div>
    );
  }

  if (sortedItems.length === 0) {
    return (
      <div
        className={`timeline-empty-wrapper ${className}`}
        data-testid={`${testId}-empty`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: tokens.spacing.layout.lg,
          color: tokens.colors.text.muted,
          fontSize: tokens.typography.fontSize.base,
        }}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={`timeline-container ${className}`}
      data-testid={testId}
      style={{
        ...getOrientationStyles(orientation),
        gap: getVariantSpacing(variant),
      }}
    >
      {sortedItems.map((item, index) => {
        const isLast = index === sortedItems.length - 1;

        if (itemRenderer) {
          return (
            <div key={item.id} className={itemClassName}>
              {itemRenderer(item, index)}
            </div>
          );
        }

        return (
          <TimelineItemComponent
            key={item.id}
            item={item}
            index={index}
            isLast={isLast}
            orientation={orientation}
            variant={variant}
            size={size}
            showTimestamp={showTimestamps}
            formatTimestamp={formatTimestamp}
            showConnector={showConnectors && !isLast}
            {...(onItemClick && { onClick: onItemClick })}
            className={itemClassName}
          />
        );
      })}
    </div>
  );
};

// TimelineItem component
const TimelineItemComponent: React.FC<TimelineItemProps> = ({
  item,
  orientation = 'vertical',
  variant = 'default',
  size = 'md',
  showTimestamp = true,
  formatTimestamp = defaultFormatTimestamp,
  showConnector = true,
  onClick,
  className = '',
  'data-testid': testId = 'timeline-item',
}) => {
  const tokens = useDesignSystem();

  const getSizeStyles = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm':
        return {
          icon: { width: '24px', height: '24px' },
          content: { fontSize: tokens.typography.fontSize.sm },
          title: {
            fontSize: tokens.typography.fontSize.sm,
            fontWeight: tokens.typography.fontWeight.medium,
          },
          timestamp: { fontSize: tokens.typography.fontSize.xs },
          padding: tokens.spacing.component.sm,
        };
      case 'lg':
        return {
          icon: { width: '40px', height: '40px' },
          content: { fontSize: tokens.typography.fontSize.lg },
          title: {
            fontSize: tokens.typography.fontSize.lg,
            fontWeight: tokens.typography.fontWeight.medium,
          },
          timestamp: { fontSize: tokens.typography.fontSize.base },
          padding: tokens.spacing.component.lg,
        };
      default: // md
        return {
          icon: { width: '32px', height: '32px' },
          content: { fontSize: tokens.typography.fontSize.base },
          title: {
            fontSize: tokens.typography.fontSize.base,
            fontWeight: tokens.typography.fontWeight.medium,
          },
          timestamp: { fontSize: tokens.typography.fontSize.sm },
          padding: tokens.spacing.component.md,
        };
    }
  };

  const sizeStyles = getSizeStyles(size);

  const getIcon = () => {
    if (item.icon) return item.icon;

    switch (item.type) {
      case 'success':
        return (
          <svg
            className='timeline-icon-svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'error':
        return (
          <svg
            className='timeline-icon-svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'warning':
        return (
          <svg
            className='timeline-icon-svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'info':
        return (
          <svg
            className='timeline-icon-svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
              clipRule='evenodd'
            />
          </svg>
        );
      default:
        return <div className='timeline-icon-default'></div>;
    }
  };

  const getIconBackgroundColor = () => {
    if (item.highlighted) {
      return { backgroundColor: tokens.colors.state.info + '20' }; // 20% opacity
    }

    switch (item.type) {
      case 'success':
        return { backgroundColor: tokens.colors.state.success + '20' };
      case 'error':
        return { backgroundColor: tokens.colors.state.error + '20' };
      case 'warning':
        return { backgroundColor: tokens.colors.state.warning + '20' };
      case 'info':
        return { backgroundColor: tokens.colors.state.info + '20' };
      default:
        return { backgroundColor: tokens.colors.background.secondary };
    }
  };

  const getIconColor = () => {
    if (item.highlighted) {
      return { color: tokens.colors.state.info };
    }

    switch (item.type) {
      case 'success':
        return { color: tokens.colors.state.success };
      case 'error':
        return { color: tokens.colors.state.error };
      case 'warning':
        return { color: tokens.colors.state.warning };
      case 'info':
        return { color: tokens.colors.state.info };
      default:
        return { color: tokens.colors.text.muted };
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(item);
    }
  };

  const isClickable = !!onClick;

  if (orientation === 'horizontal') {
    return (
      <div
        className={`timeline-item-horizontal ${className}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: 0,
          flexShrink: 0,
          cursor: isClickable ? 'pointer' : 'default',
          opacity: 1,
          transition: 'opacity 150ms ease-in-out',
        }}
        onClick={isClickable ? handleClick : undefined}
        data-testid={`${testId}-${item.id}`}
        onMouseEnter={(e) => {
          if (isClickable) {
            e.currentTarget.style.opacity = '0.8';
          }
        }}
        onMouseLeave={(e) => {
          if (isClickable) {
            e.currentTarget.style.opacity = '1';
          }
        }}
      >
        {/* Icon */}
        <div
          className='timeline-icon-container'
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            border: `2px solid ${tokens.colors.background.inverse}`,
            boxShadow: tokens.shadows.sm,
            ...sizeStyles.icon,
            ...getIconBackgroundColor(),
            ...getIconColor(),
          }}
        >
          {getIcon()}
        </div>

        {/* Connector */}
        {showConnector && (
          <div
            className='timeline-connector-compact'
            style={{
              width: '2px',
              height: tokens.spacing.component.lg,
              backgroundColor: tokens.colors.border.default,
              margin: `${tokens.spacing.micro.xs} 0`,
            }}
          />
        )}

        {/* Content */}
        <div
          className='timeline-item-content-compact'
          style={{
            padding: sizeStyles.padding,
            textAlign: 'center',
            maxWidth: '200px',
          }}
        >
          {showTimestamp && (
            <time
              className='timeline-item-timestamp'
              style={{
                display: 'block',
                marginBottom: tokens.spacing.micro.xs,
                color: tokens.colors.text.muted,
                ...sizeStyles.timestamp,
              }}
            >
              {formatTimestamp(item.timestamp)}
            </time>
          )}
          <h3
            className='timeline-item-title'
            style={{
              margin: 0,
              marginBottom: tokens.spacing.micro.xs,
              color: tokens.colors.text.primary,
              ...sizeStyles.title,
            }}
          >
            {item.title}
          </h3>
          {(item.content ?? item.description) && (
            <div
              className='timeline-item-content'
              style={{
                color: tokens.colors.text.primary,
                lineHeight: tokens.typography.lineHeight.relaxed,
                ...sizeStyles.content,
              }}
            >
              {item.content ?? item.description}
            </div>
          )}
          {item.actions && item.actions.length > 0 && (
            <div
              className='timeline-actions'
              style={{
                display: 'flex',
                gap: tokens.spacing.micro.xs,
                marginTop: tokens.spacing.component.sm,
                justifyContent: 'center',
              }}
            >
              {item.actions.map((action, actionIndex) => {
                const getActionStyles = () => {
                  switch (action.variant) {
                    case 'primary':
                      return {
                        backgroundColor: tokens.colors.state.info,
                        color: tokens.colors.text.inverse,
                        hoverBackgroundColor: '#2563eb',
                      };
                    case 'secondary':
                      return {
                        backgroundColor: tokens.colors.background.secondary,
                        color: tokens.colors.text.primary,
                        hoverBackgroundColor: tokens.colors.background.primary,
                      };
                    default:
                      return {
                        backgroundColor: 'transparent',
                        color: tokens.colors.state.info,
                        hoverBackgroundColor: tokens.colors.state.info + '10',
                      };
                  }
                };

                const actionStyles = getActionStyles();

                return (
                  <button
                    key={actionIndex}
                    onClick={(e) => {
                      e.stopPropagation();
                      action.onClick();
                    }}
                    className='timeline-action-button'
                    style={{
                      fontSize: tokens.typography.fontSize.xs,
                      padding: `${tokens.spacing.micro.xs} ${tokens.spacing.micro.sm}`,
                      borderRadius: tokens.radius.sm,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 200ms ease-in-out',
                      backgroundColor: actionStyles.backgroundColor,
                      color: actionStyles.color,
                      display: 'flex',
                      alignItems: 'center',
                      gap: tokens.spacing.micro.xs,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        actionStyles.hoverBackgroundColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        actionStyles.backgroundColor;
                    }}
                  >
                    {action.icon && (
                      <span style={{ marginRight: tokens.spacing.micro.xs }}>
                        {action.icon}
                      </span>
                    )}
                    {action.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Vertical orientation
  return (
    <div
      className={`timeline-item-vertical ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        gap: tokens.spacing.component.md,
        cursor: isClickable ? 'pointer' : 'default',
        opacity: 1,
        transition: 'opacity 150ms ease-in-out',
      }}
      onClick={isClickable ? handleClick : undefined}
      data-testid={`${testId}-${item.id}`}
      onMouseEnter={(e) => {
        if (isClickable) {
          e.currentTarget.style.opacity = '0.8';
        }
      }}
      onMouseLeave={(e) => {
        if (isClickable) {
          e.currentTarget.style.opacity = '1';
        }
      }}
    >
      {/* Icon and connector */}
      <div
        className='timeline-icon-container'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <div
          className='timeline-icon'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            border: `2px solid ${tokens.colors.background.inverse}`,
            boxShadow: tokens.shadows.sm,
            ...sizeStyles.icon,
            ...getIconBackgroundColor(),
            ...getIconColor(),
          }}
        >
          {getIcon()}
        </div>
        {showConnector && (
          <div
            className='timeline-connector'
            style={{
              width: '2px',
              height: '100%',
              backgroundColor: tokens.colors.border.default,
              marginTop: tokens.spacing.micro.sm,
              flexGrow: 1,
              minHeight: tokens.spacing.component.xl,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div
        className='timeline-content'
        style={{
          padding: sizeStyles.padding,
          flex: 1,
          backgroundColor:
            variant === 'detailed'
              ? tokens.colors.surface.primary
              : 'transparent',
          borderRadius: variant === 'detailed' ? tokens.radius.md : 0,
          boxShadow: variant === 'detailed' ? tokens.shadows.sm : 'none',
        }}
      >
        {showTimestamp && (
          <time
            className='timeline-item-timestamp'
            style={{
              display: 'block',
              marginBottom: tokens.spacing.micro.sm,
              color: tokens.colors.text.muted,
              ...sizeStyles.timestamp,
            }}
          >
            {formatTimestamp(item.timestamp)}
          </time>
        )}
        <h3
          className='timeline-item-title'
          style={{
            margin: 0,
            marginBottom: tokens.spacing.micro.sm,
            color: tokens.colors.text.primary,
            ...sizeStyles.title,
          }}
        >
          {item.title}
        </h3>
        {(item.content ?? item.description) && (
          <div
            className='timeline-item-content'
            style={{
              color: tokens.colors.text.primary,
              lineHeight: tokens.typography.lineHeight.relaxed,
              marginBottom: tokens.spacing.component.sm,
              ...sizeStyles.content,
            }}
          >
            {item.content ?? item.description}
          </div>
        )}
        {item.actions && item.actions.length > 0 && (
          <div
            className='timeline-actions-detailed'
            style={{
              display: 'flex',
              gap: tokens.spacing.component.sm,
              flexWrap: 'wrap',
              marginTop: tokens.spacing.component.sm,
            }}
          >
            {item.actions.map((action, actionIndex) => {
              const getActionStyles = () => {
                switch (action.variant) {
                  case 'primary':
                    return {
                      backgroundColor: tokens.colors.state.info,
                      color: tokens.colors.text.inverse,
                      hoverBackgroundColor: '#2563eb',
                    };
                  case 'secondary':
                    return {
                      backgroundColor: tokens.colors.background.secondary,
                      color: tokens.colors.text.primary,
                      hoverBackgroundColor: tokens.colors.background.primary,
                    };
                  default:
                    return {
                      backgroundColor: 'transparent',
                      color: tokens.colors.state.info,
                      hoverBackgroundColor: tokens.colors.state.info + '10',
                    };
                }
              };

              const actionStyles = getActionStyles();

              return (
                <button
                  key={actionIndex}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick();
                  }}
                  className='timeline-action-button-detailed'
                  style={{
                    fontSize: tokens.typography.fontSize.sm,
                    padding: `${tokens.spacing.micro.sm} ${tokens.spacing.component.sm}`,
                    borderRadius: tokens.radius.sm,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 200ms ease-in-out',
                    backgroundColor: actionStyles.backgroundColor,
                    color: actionStyles.color,
                    display: 'flex',
                    alignItems: 'center',
                    gap: tokens.spacing.micro.xs,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      actionStyles.hoverBackgroundColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      actionStyles.backgroundColor;
                  }}
                >
                  {action.icon && (
                    <span style={{ marginRight: tokens.spacing.micro.xs }}>
                      {action.icon}
                    </span>
                  )}
                  {action.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// Export components with proper names
export { Timeline, TimelineItemComponent };
