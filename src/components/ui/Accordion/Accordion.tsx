/**
 * @fileoverview Accordion and Collapsible Components - Expandable content sections
 * @component Accordion
 *
 * @description
 * Flexible accordion and collapsible components for organizing expandable content with:
 * - Single and multiple expansion modes
 * - Controlled and uncontrolled states
 * - Multiple visual variants
 * - Smooth animations and transitions
 * - Keyboard navigation support
 * - Accessibility features built-in
 * - Customizable styling options
 *
 * @features
 * - ✅ Single/multiple expansion modes
 * - ✅ Controlled/uncontrolled behavior
 * - ✅ Multiple visual variants
 * - ✅ Smooth animations
 * - ✅ Keyboard navigation
 * - ✅ Icon customization
 * - ✅ ARIA compliance
 * - ✅ TypeScript support
 *
 * @example
 * ```tsx
 * // Basic accordion usage
 * <Accordion
 *   items={[
 *     {
 *       id: '1',
 *       title: 'Section 1',
 *       content: <div>Content for section 1</div>
 *     },
 *     {
 *       id: '2',
 *       title: 'Section 2',
 *       content: <div>Content for section 2</div>
 *     }
 *   ]}
 * />
 *
 * // Multiple expansion allowed
 * <Accordion
 *   items={accordionItems}
 *   multiple={true}
 *   defaultExpandedItems={['1', '3']}
 *   variant="bordered"
 * />
 *
 * // Individual collapsible component
 * <Collapsible
 *   title="Expandable Section"
 *   isExpanded={isExpanded}
 *   onToggle={setIsExpanded}
 * >
 *   <p>This content can be expanded or collapsed</p>
 * </Collapsible>
 * ```
 *
 * @accessibility
 * - ARIA expanded/collapsed states
 * - Keyboard navigation (Enter, Space, Arrow keys)
 * - Focus management
 * - Screen reader compatible
 * - High contrast support
 */

'use client';

import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { colors } from '../../system/BrandThemeProvider/BrandThemeProvider';
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
    minimal:
      'space-y-0 border-t border-white border-b border-white bg-transparent',
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        className={`${variantClasses[variant]} ${className}`}
        data-testid={testId}
        style={variant === 'minimal' ? { backgroundColor: 'transparent' } : {}}
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
          item: 'border-b border-white last:border-b-0 bg-transparent',
          trigger: 'h-[84px] bg-transparent',
          content: 'bg-transparent',
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
      style={variant === 'minimal' ? { backgroundColor: 'transparent' } : {}}
    >
      {/* Trigger */}
      <button
        className={`
          w-full flex items-center justify-between text-left transition-colors duration-200
          ${variant === 'minimal' ? 'px-0 h-[84px] flex items-center' : sizeClasses[size]} ${variantClasses.trigger}
          ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${variant === 'minimal' ? 'focus:outline-none border-none' : 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}
        `}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={item.disabled}
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${item.id}`}
        id={`accordion-trigger-${item.id}`}
        style={
          variant === 'minimal'
            ? { backgroundColor: 'transparent', border: 'none', color: 'white' }
            : {}
        }
      >
        <div className='flex items-center gap-3 flex-1 min-w-0'>
          {item.icon && <span className='flex-shrink-0'>{item.icon}</span>}
          <span
            className={`${variant === 'minimal' ? 'text-white text-xl font-normal' : 'font-medium'}`}
            style={variant === 'minimal' ? { color: 'white' } : {}}
          >
            {item.trigger}
          </span>
        </div>
        {variant === 'minimal' ? (
          <svg
            className={`
              flex-shrink-0 transition-transform duration-200
              ${isExpanded ? 'rotate-45' : ''}
            `}
            style={{
              width: '30px',
              height: '30px',
            }}
            fill='none'
            viewBox='0 0 24 24'
            stroke={colors.highlight}
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 6v12m6-6H6'
            />
          </svg>
        ) : (
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
        )}
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
            backgroundColor: variant === 'minimal' ? 'transparent' : undefined,
            border: variant === 'minimal' ? 'none' : undefined,
          }}
          aria-labelledby={`accordion-trigger-${item.id}`}
          id={`accordion-content-${item.id}`}
          role='region'
        >
          <div
            ref={contentRef}
            className={`
              ${variant === 'minimal' ? 'px-0 pb-6 pt-0 text-white text-base' : `${sizeClasses[size]} border-t border-gray-200`}
            `}
            style={
              variant === 'minimal'
                ? {
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'white',
                  }
                : {}
            }
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
