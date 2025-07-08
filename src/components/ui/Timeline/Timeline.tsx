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

  const orientationClasses = {
    vertical: 'flex flex-col',
    horizontal: 'flex flex-row overflow-x-auto',
  };

  const variantClasses = {
    default: '',
    minimal: 'space-y-2',
    detailed: 'space-y-4',
  };

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center py-8 ${className}`}
        data-testid={`${testId}-loading`}
      >
        <div className='flex items-center gap-2 text-gray-500'>
          <svg className='animate-spin w-5 h-5' fill='none' viewBox='0 0 24 24'>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
          <span>{loadingMessage}</span>
        </div>
      </div>
    );
  }

  if (sortedItems.length === 0) {
    return (
      <div
        className={`flex items-center justify-center py-8 text-gray-500 ${className}`}
        data-testid={`${testId}-empty`}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={`${orientationClasses[orientation]} ${variantClasses[variant]} ${className}`}
      data-testid={testId}
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
  const sizeClasses = {
    sm: {
      icon: 'w-6 h-6',
      content: 'text-sm',
      title: 'text-sm font-medium',
      timestamp: 'text-xs',
      padding: 'p-3',
    },
    md: {
      icon: 'w-8 h-8',
      content: 'text-base',
      title: 'text-base font-medium',
      timestamp: 'text-sm',
      padding: 'p-4',
    },
    lg: {
      icon: 'w-10 h-10',
      content: 'text-lg',
      title: 'text-lg font-medium',
      timestamp: 'text-base',
      padding: 'p-5',
    },
  };

  const getIcon = () => {
    if (item.icon) return item.icon;

    switch (item.type) {
      case 'success':
        return (
          <svg
            className='w-full h-full text-green-600'
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
            className='w-full h-full text-red-600'
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
            className='w-full h-full text-yellow-600'
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
            className='w-full h-full text-blue-600'
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
        return <div className='w-full h-full bg-gray-400 rounded-full'></div>;
    }
  };

  const getIconBackgroundColor = () => {
    if (item.highlighted) return 'bg-blue-100';

    switch (item.type) {
      case 'success':
        return 'bg-green-100';
      case 'error':
        return 'bg-red-100';
      case 'warning':
        return 'bg-yellow-100';
      case 'info':
        return 'bg-blue-100';
      default:
        return 'bg-gray-100';
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
        className={`
          flex flex-col items-center min-w-0 flex-shrink-0
          ${isClickable ? 'cursor-pointer hover:opacity-80' : ''}
          ${className}
        `}
        onClick={isClickable ? handleClick : undefined}
        data-testid={`${testId}-${item.id}`}
      >
        {/* Icon */}
        <div
          className={`
          relative flex items-center justify-center rounded-full border-2 border-white shadow-sm
          ${sizeClasses[size].icon} ${getIconBackgroundColor()}
        `}
        >
          {getIcon()}
        </div>

        {/* Connector */}
        {showConnector && <div className='w-px h-4 bg-gray-300 my-2'></div>}

        {/* Content */}
        <div className={`text-center max-w-xs ${sizeClasses[size].padding}`}>
          {showTimestamp && (
            <time
              className={`block text-gray-500 mb-1 ${sizeClasses[size].timestamp}`}
            >
              {formatTimestamp(item.timestamp)}
            </time>
          )}
          <h3 className={`${sizeClasses[size].title} text-gray-900 mb-1`}>
            {item.title}
          </h3>
          {(item.content ?? item.description) && (
            <div className={`text-gray-600 ${sizeClasses[size].content}`}>
              {item.content ?? item.description}
            </div>
          )}
          {item.actions && item.actions.length > 0 && (
            <div className='flex gap-1 mt-2 justify-center'>
              {item.actions.map((action, actionIndex) => (
                <button
                  key={actionIndex}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick();
                  }}
                  className={`
                    text-xs px-2 py-1 rounded transition-colors duration-200
                    ${
                      action.variant === 'primary'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : action.variant === 'secondary'
                          ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                          : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                    }
                  `}
                >
                  {action.icon && <span className='mr-1'>{action.icon}</span>}
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Vertical orientation
  return (
    <div
      className={`
        relative flex gap-4
        ${isClickable ? 'cursor-pointer hover:opacity-80' : ''}
        ${className}
      `}
      onClick={isClickable ? handleClick : undefined}
      data-testid={`${testId}-${item.id}`}
    >
      {/* Icon and connector */}
      <div className='flex flex-col items-center'>
        <div
          className={`
          relative flex items-center justify-center rounded-full border-2 border-white shadow-sm
          ${sizeClasses[size].icon} ${getIconBackgroundColor()}
        `}
        >
          {getIcon()}
        </div>
        {showConnector && <div className='w-px flex-1 bg-gray-300 mt-2'></div>}
      </div>

      {/* Content */}
      <div
        className={`flex-1 pb-8 ${sizeClasses[size].padding} ${variant === 'detailed' ? 'bg-white border border-gray-200 rounded-lg shadow-sm' : ''}`}
      >
        {showTimestamp && (
          <time
            className={`block text-gray-500 mb-1 ${sizeClasses[size].timestamp}`}
          >
            {formatTimestamp(item.timestamp)}
          </time>
        )}
        <h3 className={`${sizeClasses[size].title} text-gray-900 mb-2`}>
          {item.title}
        </h3>
        {(item.content ?? item.description) && (
          <div className={`text-gray-600 mb-3 ${sizeClasses[size].content}`}>
            {item.content ?? item.description}
          </div>
        )}
        {item.actions && item.actions.length > 0 && (
          <div className='flex gap-2'>
            {item.actions.map((action, actionIndex) => (
              <button
                key={actionIndex}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick();
                }}
                className={`
                  text-sm px-3 py-1 rounded transition-colors duration-200
                  ${
                    action.variant === 'primary'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : action.variant === 'secondary'
                        ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                        : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                  }
                `}
              >
                {action.icon && <span className='mr-1'>{action.icon}</span>}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Export components with proper names
export { Timeline, TimelineItemComponent };
