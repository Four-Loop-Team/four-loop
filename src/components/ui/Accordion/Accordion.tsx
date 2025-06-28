/**
 * Accordion and Collapsible Components
 * Flexible components for expandable content sections
 */

import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  AccordionContextValue,
  AccordionItemProps,
  AccordionProps,
  CollapsibleProps,
} from './types';

// Accordion Context
const AccordionContext = createContext<AccordionContextValue | null>(null);

// Main Accordion component
const Accordion: React.FC<AccordionProps> = ({
  items,
  expandedItems: controlledExpandedItems,
  defaultExpandedItems = [],
  multiple = false,
  collapsible = true,
  variant = 'default',
  size = 'md',
  animated = true,
  animationDuration = 200,
  onChange,
  onExpand,
  onCollapse,
  className = '',
  itemClassName = '',
  'data-testid': testId = 'accordion',
}) => {
  const isControlled = controlledExpandedItems !== undefined;
  const [internalExpandedItems, setInternalExpandedItems] =
    useState<string[]>(defaultExpandedItems);

  const expandedItems = isControlled
    ? controlledExpandedItems
    : internalExpandedItems;

  const toggleItem = useCallback(
    (itemId: string) => {
      const isCurrentlyExpanded = expandedItems.includes(itemId);
      let newExpandedItems: string[];

      if (isCurrentlyExpanded) {
        if (collapsible) {
          newExpandedItems = expandedItems.filter((id) => id !== itemId);
          onCollapse?.(itemId);
        } else {
          return; // Don't allow collapsing if collapsible is false
        }
      } else {
        if (multiple) {
          newExpandedItems = [...expandedItems, itemId];
        } else {
          newExpandedItems = [itemId];
          // Collapse other items when not in multiple mode
          expandedItems.forEach((id) => {
            if (id !== itemId) {
              onCollapse?.(id);
            }
          });
        }
        onExpand?.(itemId);
      }

      if (!isControlled) {
        setInternalExpandedItems(newExpandedItems);
      }
      onChange?.(newExpandedItems);
    },
    [
      expandedItems,
      multiple,
      collapsible,
      isControlled,
      onChange,
      onExpand,
      onCollapse,
    ]
  );

  const contextValue: AccordionContextValue = {
    expandedItems,
    toggleItem,
    multiple,
    variant,
    size,
    animated,
    animationDuration,
  };

  const variantClasses = {
    default: 'space-y-2',
    bordered: 'space-y-0 border border-gray-200 rounded-md overflow-hidden',
    filled: 'space-y-1 bg-gray-50 p-2 rounded-md',
    minimal: 'space-y-0',
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        className={`${variantClasses[variant]} ${className}`}
        data-testid={testId}
      >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isExpanded={expandedItems.includes(item.id)}
            onToggle={() => toggleItem(item.id)}
            variant={variant}
            size={size}
            animated={animated}
            animationDuration={animationDuration}
            className={itemClassName}
          />
        ))}
      </div>
    </AccordionContext.Provider>
  );
};

// AccordionItem component
const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isExpanded,
  onToggle,
  variant = 'default',
  size = 'md',
  animated = true,
  animationDuration = 200,
  className = '',
  'data-testid': testId = 'accordion-item',
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(
    isExpanded ? undefined : 0
  );

  useEffect(() => {
    if (animated && contentRef.current) {
      if (isExpanded) {
        setContentHeight(contentRef.current.scrollHeight);
      } else {
        setContentHeight(0);
      }
    }
  }, [isExpanded, animated]);

  const sizeClasses = {
    sm: 'px-4 py-3 text-sm min-h-[44px]', // Updated for 44px min touch target
    md: 'px-6 py-3 text-base min-h-[44px]', // Updated for 44px min touch target
    lg: 'px-8 py-4 text-lg min-h-[44px]', // Updated for 44px min touch target
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'bordered':
        return {
          item: 'border-b border-gray-200 last:border-b-0',
          trigger: 'hover:bg-gray-50',
          content: 'bg-white',
        };
      case 'filled':
        return {
          item: 'bg-white rounded-md shadow-sm',
          trigger: 'hover:bg-gray-50',
          content: 'bg-gray-50',
        };
      case 'minimal':
        return {
          item: 'border-b border-gray-100 last:border-b-0',
          trigger: 'hover:bg-gray-50',
          content: 'bg-white',
        };
      default:
        return {
          item: 'bg-white border border-gray-200 rounded-md shadow-sm',
          trigger: 'hover:bg-gray-50',
          content: 'bg-white',
        };
    }
  };

  const variantClasses = getVariantClasses();

  const handleToggle = () => {
    if (!item.disabled) {
      onToggle();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      className={`${variantClasses.item} ${className}`}
      data-testid={`${testId}-${item.id}`}
    >
      {/* Trigger */}
      <button
        className={`
          w-full flex items-center justify-between text-left transition-colors duration-200
          ${sizeClasses[size]} ${variantClasses.trigger}
          ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        `}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={item.disabled}
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${item.id}`}
        id={`accordion-trigger-${item.id}`}
      >
        <div className='flex items-center gap-3 flex-1 min-w-0'>
          {item.icon && <span className='flex-shrink-0'>{item.icon}</span>}
          <span className='font-medium'>{item.trigger}</span>
        </div>
        <svg
          className={`
            w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0
            ${isExpanded ? 'rotate-180' : ''}
          `}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {/* Content */}
      {isExpanded && (
        <div
          className={`
            overflow-hidden transition-all duration-${animationDuration} ease-in-out
            ${variantClasses.content}
          `}
          style={{
            height: animated ? `${contentHeight}px` : 'auto',
          }}
          aria-labelledby={`accordion-trigger-${item.id}`}
          id={`accordion-content-${item.id}`}
          role='region'
        >
          <div
            ref={contentRef}
            className={`${sizeClasses[size]} border-t border-gray-200`}
          >
            {item.content}
          </div>
        </div>
      )}
    </div>
  );
};

// Standalone Collapsible component
const Collapsible: React.FC<CollapsibleProps> = ({
  trigger,
  children,
  isExpanded: controlledIsExpanded,
  defaultExpanded = false,
  disabled = false,
  variant = 'default',
  size = 'md',
  animated = true,
  animationDuration = 200,
  onChange,
  className = '',
  triggerClassName = '',
  contentClassName = '',
  'data-testid': testId = 'collapsible',
}) => {
  const isControlled = controlledIsExpanded !== undefined;
  const [internalIsExpanded, setInternalIsExpanded] = useState(defaultExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(
    defaultExpanded ? undefined : 0
  );

  const isExpanded = isControlled ? controlledIsExpanded : internalIsExpanded;

  useEffect(() => {
    if (animated && contentRef.current) {
      if (isExpanded) {
        setContentHeight(contentRef.current.scrollHeight);
      } else {
        setContentHeight(0);
      }
    }
  }, [isExpanded, animated]);

  const handleToggle = () => {
    if (disabled) return;

    const newExpanded = !isExpanded;
    if (!isControlled) {
      setInternalIsExpanded(newExpanded);
    }
    onChange?.(newExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  const sizeClasses = {
    sm: 'px-4 py-3 text-sm min-h-[44px]', // Updated for 44px min touch target
    md: 'px-6 py-3 text-base min-h-[44px]', // Updated for 44px min touch target
    lg: 'px-8 py-4 text-lg min-h-[44px]', // Updated for 44px min touch target
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'bordered':
        return {
          container: 'border border-gray-200 rounded-md overflow-hidden',
          trigger: 'bg-white hover:bg-gray-50 border-b border-gray-200',
          content: 'bg-white',
        };
      case 'filled':
        return {
          container: 'bg-gray-50 rounded-md',
          trigger: 'bg-white hover:bg-gray-50 rounded-t-md',
          content: 'bg-gray-50',
        };
      case 'minimal':
        return {
          container: '',
          trigger: 'hover:bg-gray-50',
          content: 'bg-white',
        };
      default:
        return {
          container: 'bg-white border border-gray-200 rounded-md shadow-sm',
          trigger: 'hover:bg-gray-50',
          content: 'bg-white',
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <div
      className={`${variantClasses.container} ${className}`}
      data-testid={testId}
    >
      {/* Trigger */}
      <button
        className={`
          w-full flex items-center justify-between text-left transition-colors duration-200
          ${sizeClasses[size]} ${variantClasses.trigger} ${triggerClassName}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        `}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-expanded={isExpanded}
        aria-controls='collapsible-content'
        id='collapsible-trigger'
      >
        <span className='flex-1 min-w-0'>{trigger}</span>
        <svg
          className={`
            w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2
            ${isExpanded ? 'rotate-180' : ''}
          `}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {/* Content */}
      <div
        className={`
          overflow-hidden transition-all duration-${animationDuration} ease-in-out
          ${variantClasses.content} ${contentClassName}
        `}
        style={{
          height: animated ? `${contentHeight}px` : isExpanded ? 'auto' : '0px',
        }}
        aria-labelledby='collapsible-trigger'
        id='collapsible-content'
        role='region'
      >
        <div
          ref={contentRef}
          className={`${sizeClasses[size]} ${variant !== 'minimal' ? 'border-t border-gray-200' : ''}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export { Accordion, AccordionItem, Collapsible };
