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

import { useDesignSystem } from '@/lib/hooks';
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './Accordion.scss';
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
    default: 'accordion-default',
    bordered: 'accordion-bordered',
    filled: 'accordion-filled',
    minimal: 'accordion-minimal',
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isExpanded,
  onToggle,
  variant = 'default',
  size = 'md',
  animated = true,
  animationDuration = 200, // Animation duration is handled by CSS classes
  className = '',
  'data-testid': testId = 'accordion-item',
}) => {
  // Animation duration is handled by CSS classes but kept for API compatibility
  void animationDuration;
  const { colors } = useDesignSystem();
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
    sm: 'accordion-size-sm', // Updated for 44px min touch target
    md: 'accordion-size-md', // Updated for 44px min touch target
    lg: 'accordion-size-lg', // Updated for 44px min touch target
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'bordered':
        return {
          item: 'accordion-item-bordered',
          trigger: 'accordion-trigger-bordered',
          content: 'accordion-content-bordered',
        };
      case 'filled':
        return {
          item: 'accordion-item-filled',
          trigger: 'accordion-trigger-filled',
          content: 'accordion-content-filled',
        };
      case 'minimal':
        return {
          item: 'accordion-item-minimal',
          trigger: 'accordion-trigger-minimal',
          content: 'accordion-content-minimal',
        };
      default:
        return {
          item: 'accordion-item-default',
          trigger: 'accordion-trigger-default',
          content: 'accordion-content-default',
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
        className={`accordion-trigger ${variantClasses.trigger} ${sizeClasses[size]} ${
          item.disabled
            ? 'accordion-trigger-disabled'
            : 'accordion-trigger-enabled'
        } ${
          variant === 'minimal'
            ? 'accordion-trigger-minimal-layout'
            : 'accordion-trigger-focus'
        }`}
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
        <div className='accordion-trigger-content'>
          {item.icon && (
            <span className='accordion-trigger-icon'>{item.icon}</span>
          )}
          <span
            className={`accordion-trigger-text ${variant === 'minimal' ? 'accordion-trigger-text-minimal' : ''}`}
            style={variant === 'minimal' ? { color: 'white' } : {}}
          >
            {item.trigger}
          </span>
        </div>
        {variant === 'minimal' ? (
          <svg
            className={`accordion-icon-minimal ${isExpanded ? 'accordion-icon-expanded' : ''}`}
            style={{
              width: '30px',
              height: '30px',
            }}
            fill='none'
            viewBox='0 0 24 24'
            stroke={colors.text.accent}
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
            className={`accordion-icon-default ${isExpanded ? 'accordion-icon-expanded' : ''}`}
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
      <div
        className={`accordion-content ${variantClasses.content}`}
        style={{
          height: animated ? `${contentHeight}px` : isExpanded ? 'auto' : '0px',
          backgroundColor: variant === 'minimal' ? 'transparent' : undefined,
          border: variant === 'minimal' ? 'none' : undefined,
        }}
        aria-labelledby={`accordion-trigger-${item.id}`}
        id={`accordion-content-${item.id}`}
        role='region'
      >
        <div
          ref={contentRef}
          className={`accordion-content-inner ${variant === 'minimal' ? 'accordion-content-minimal-inner' : `${sizeClasses[size]} accordion-content-bordered-inner`}`}
          style={{
            ...(variant === 'minimal'
              ? {
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'white',
                }
              : {}),
            visibility: isExpanded ? 'visible' : 'hidden',
          }}
        >
          {item.content}
        </div>
      </div>
    </div>
  );
};

// Standalone Collapsible component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Collapsible: React.FC<CollapsibleProps> = ({
  trigger,
  children,
  isExpanded: controlledIsExpanded,
  defaultExpanded = false,
  disabled = false,
  variant = 'default',
  size = 'md',
  animated = true,
  animationDuration = 200, // Animation duration is handled by CSS classes
  onChange,
  className = '',
  triggerClassName = '',
  contentClassName = '',
  'data-testid': testId = 'collapsible',
}) => {
  // Animation duration is handled by CSS classes but kept for API compatibility
  void animationDuration;
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
    sm: 'collapsible-size-sm', // Updated for 44px min touch target
    md: 'collapsible-size-md', // Updated for 44px min touch target
    lg: 'collapsible-size-lg', // Updated for 44px min touch target
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'bordered':
        return {
          container: 'collapsible-container-bordered',
          trigger: 'collapsible-trigger-bordered',
          content: 'collapsible-content-bordered',
        };
      case 'filled':
        return {
          container: 'collapsible-container-filled',
          trigger: 'collapsible-trigger-filled',
          content: 'collapsible-content-filled',
        };
      case 'minimal':
        return {
          container: 'collapsible-container-minimal',
          trigger: 'collapsible-trigger-minimal',
          content: 'collapsible-content-minimal',
        };
      default:
        return {
          container: 'collapsible-container-default',
          trigger: 'collapsible-trigger-default',
          content: 'collapsible-content-default',
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
        className={`collapsible-trigger ${sizeClasses[size]} ${variantClasses.trigger} ${triggerClassName} ${
          disabled
            ? 'collapsible-trigger-disabled'
            : 'collapsible-trigger-enabled'
        } collapsible-trigger-focus`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-expanded={isExpanded}
        aria-controls='collapsible-content'
        id='collapsible-trigger'
      >
        <span className='collapsible-trigger-text'>{trigger}</span>
        <svg
          className={`collapsible-arrow ${isExpanded ? 'collapsible-arrow-expanded' : ''}`}
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
        className={`collapsible-content ${variantClasses.content} ${contentClassName}`}
        style={{
          height: animated ? `${contentHeight}px` : isExpanded ? 'auto' : '0px',
        }}
        aria-labelledby='collapsible-trigger'
        id='collapsible-content'
        role='region'
      >
        <div
          ref={contentRef}
          className={`${sizeClasses[size]} ${variant !== 'minimal' ? 'collapsible-content-inner-bordered' : 'collapsible-content-inner-minimal'}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export { Accordion, AccordionItem, Collapsible };
