/**
 * @fileoverview Accordion and Collapsible Components - Four Loop branded MUI Accordion
 * @component Accordion
 *
 * @description
 * Four Loop branded accordion components built on top of MUI Accordion for:
 * - Full accessibility and ARIA compliance
 * - Keyboard navigation support
 * - Focus management
 * - Screen reader compatibility
 * - Four Loop visual branding
 * - Custom hover states and animations
 *
 * @features
 * - ✅ Built on MUI Accordion foundation
 * - ✅ Single/multiple expansion modes
 * - ✅ Controlled/uncontrolled behavior
 * - ✅ Multiple visual variants
 * - ✅ Enhanced hover states
 * - ✅ Four Loop branding
 * - ✅ Full accessibility
 * - ✅ TypeScript support
 *
 * @example
 * ```tsx
 * // Basic accordion usage
 * <Accordion
 *   items={[
 *     {
 *       id: '1',
 *       trigger: 'Section 1',
 *       content: <div>Content for section 1</div>
 *     },
 *     {
 *       id: '2',
 *       trigger: 'Section 2',
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
 * ```
 *
 * @accessibility
 * - Full MUI Accordion accessibility
 * - ARIA expanded/collapsed states
 * - Keyboard navigation (Enter, Space, Arrow keys)
 * - Focus management
 * - Screen reader compatible
 * - High contrast support
 */

'use client';

import { useDesignSystem } from '@/lib/hooks';
import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
} from '@mui/material';
import React, { createContext, useCallback, useState } from 'react';
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
  const { colors } = useDesignSystem();
  const isControlled = controlledExpandedItems !== undefined;
  const [internalExpandedItems, setInternalExpandedItems] =
    useState<string[]>(defaultExpandedItems);

  const expandedItems = isControlled
    ? controlledExpandedItems
    : internalExpandedItems;

  const handleChange = useCallback(
    (itemId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      let newExpandedItems: string[];

      if (isExpanded) {
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
      } else {
        if (collapsible) {
          newExpandedItems = expandedItems.filter((id) => id !== itemId);
          onCollapse?.(itemId);
        } else {
          return; // Don't allow collapsing if collapsible is false
        }
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
    toggleItem: (itemId: string) => {
      const isExpanded = expandedItems.includes(itemId);
      handleChange(itemId)({} as React.SyntheticEvent, !isExpanded);
    },
    multiple,
    variant,
    size,
    animated,
    animationDuration,
  };

  const getContainerStyles = () => {
    const baseStyles = {
      backgroundColor: 'transparent',
      borderTop: `1px solid ${colors.border.inverse}`, // White border above
      borderBottom: `1px solid ${colors.border.inverse}`, // White border below
      borderRadius: 0,
      boxShadow: 'none',
      overflow: 'visible', // Prevent content clipping
      margin: '8px 0', // Allow natural spacing for content push-down
      padding: '0', // Remove padding to let items handle their own spacing
    };

    switch (variant) {
      case 'bordered':
        return {
          ...baseStyles,
          border: `1px solid ${colors.border.inverse}`, // All borders white
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          backgroundColor: colors.surface.primary,
        };
      case 'filled':
        return {
          ...baseStyles,
          backgroundColor: colors.surface.secondary,
          padding: '16px',
          borderRadius: '12px',
        };
      case 'minimal':
        return baseStyles;
      default:
        return baseStyles; // Always use minimal style as base
    }
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        className={className}
        data-testid={testId}
        style={getContainerStyles()}
      >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isExpanded={expandedItems.includes(item.id)}
            onToggle={() => contextValue.toggleItem(item.id)}
            onChange={handleChange(item.id)}
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

// AccordionItem component using MUI Accordion
const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isExpanded,
  onChange,
  variant = 'default',
  size = 'md',
  className = '',
  'data-testid': testId = 'accordion-item',
}) => {
  const { colors } = useDesignSystem();

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          minHeight: '44px',
          fontSize: '14px',
          padding: '8px 16px',
        };
      case 'lg':
        return {
          minHeight: '64px',
          fontSize: '18px',
          padding: '16px 24px',
        };
      default:
        return {
          minHeight: '54px',
          fontSize: '16px',
          padding: '12px 20px',
        };
    }
  };

  const getVariantStyles = () => {
    const sizeStyles = getSizeStyles();

    switch (variant) {
      case 'minimal':
        return {
          backgroundColor: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${colors.border.inverse}`, // Changed to inverse border
          borderRadius: 0,
          color: colors.text.inverse,
          minHeight: '84px', // Changed from height to minHeight to allow expansion
          '&:last-child': {
            borderBottom: 'none',
          },
          // Remove the margin override to allow natural MUI behavior
          // '&.Mui-expanded': {
          //   margin: 0,
          // },
          '& .MuiAccordionSummary-root': {
            backgroundColor: 'transparent',
            padding: '0',
            minHeight: '84px',
            color: colors.text.inverse,
            fontWeight: 300, // Match info section styling
            lineHeight: 1.6, // Match info section styling
            fontSize: '19px', // Header now uses 19px
            '&:hover': {
              backgroundColor: 'transparent',
              '& .MuiAccordionSummary-expandIconWrapper': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '50%',
                transition:
                  'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              },
            },
          },
          '& .MuiAccordionSummary-content': {
            margin: 0,
            alignItems: 'center',
            fontWeight: 300, // Match info section styling
            lineHeight: 1.6, // Match info section styling
            fontSize: '19px', // Header content also uses 19px
          },
          '& .MuiAccordionSummary-expandIconWrapper': {
            color: colors.text.accent,
            transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          },
          '& .MuiAccordionDetails-root': {
            padding: `0 0 24px 0`, // Fixed padding to prevent overlap
            backgroundColor: 'transparent',
            color: colors.text.inverse,
            fontSize: '16px', // Content now uses default size (16px)
            lineHeight: 1.6, // Consistent line height
            marginBottom: '16px', // Add margin to prevent overlap with content below
          },
        };
      case 'bordered':
        return {
          border: 'none',
          borderBottom: `1px solid ${colors.border.inverse}`, // Changed to inverse border
          borderRadius: 0,
          boxShadow: 'none',
          '&:last-child': {
            borderBottom: 'none',
          },
          // Remove the margin override to allow natural MUI behavior
          // '&.Mui-expanded': {
          //   margin: 0,
          // },
          '& .MuiAccordionSummary-root': {
            backgroundColor: colors.surface.primary,
            minHeight: sizeStyles.minHeight,
            padding: sizeStyles.padding,
            fontWeight: 300, // Match info section styling
            lineHeight: 1.6, // Match info section styling
            fontSize: '19px', // Header now uses 19px
            '&:hover': {
              backgroundColor: colors.surface.primary,
              '& .MuiAccordionSummary-expandIconWrapper': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '50%',
                transition:
                  'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              },
            },
          },
          '& .MuiAccordionDetails-root': {
            padding: sizeStyles.padding,
            borderTop: `1px solid ${colors.border.inverse}`, // Changed to inverse border
            fontSize: '16px', // Content now uses default size (16px)
            lineHeight: 1.6, // Consistent line height
            marginBottom: '16px', // Add margin to prevent overlap
          },
        };
      case 'filled':
        return {
          backgroundColor: colors.surface.secondary,
          margin: '4px 0',
          borderRadius: '8px',
          '&.Mui-expanded': {
            margin: '4px 0',
          },
          '& .MuiAccordionSummary-root': {
            backgroundColor: colors.surface.primary,
            minHeight: sizeStyles.minHeight,
            padding: sizeStyles.padding,
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            fontWeight: 300, // Match info section styling
            lineHeight: 1.6, // Match info section styling
            fontSize: '19px', // Header now uses 19px
            '&:hover': {
              backgroundColor: colors.surface.primary,
              '& .MuiAccordionSummary-expandIconWrapper': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '50%',
                transition:
                  'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              },
            },
          },
          '& .MuiAccordionDetails-root': {
            padding: sizeStyles.padding,
            backgroundColor: colors.surface.secondary,
            fontSize: '16px', // Content now uses default size (16px)
            lineHeight: 1.6, // Consistent line height
            marginBottom: '16px', // Add margin to prevent overlap
          },
        };
      default:
        return {
          backgroundColor: colors.surface.primary,
          margin: '8px 0',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${colors.border.inverse}`, // Changed to inverse border
          '&.Mui-expanded': {
            margin: '8px 0',
          },
          '& .MuiAccordionSummary-root': {
            minHeight: sizeStyles.minHeight,
            padding: sizeStyles.padding,
            fontWeight: 300, // Match info section styling
            lineHeight: 1.6, // Match info section styling
            fontSize: '19px', // Header now uses 19px
            '&:hover': {
              backgroundColor: colors.surface.primary,
              '& .MuiAccordionSummary-expandIconWrapper': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '50%',
                transition:
                  'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              },
            },
          },
          '& .MuiAccordionDetails-root': {
            padding: sizeStyles.padding,
            fontSize: '16px', // Content now uses default size (16px)
            lineHeight: 1.6, // Consistent line height
            marginBottom: '16px', // Add margin to prevent overlap
          },
        };
    }
  };

  const getExpandIcon = () => {
    if (variant === 'minimal') {
      return (
        <svg
          width='30'
          height='30'
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
      );
    }

    return (
      <svg
        width='20'
        height='20'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
      </svg>
    );
  };

  return (
    <MuiAccordion
      expanded={isExpanded}
      onChange={onChange || (() => {})}
      disabled={item.disabled || false}
      className={className}
      data-testid={`${testId}-${item.id}`}
      sx={getVariantStyles()}
      disableGutters
      elevation={0}
    >
      <MuiAccordionSummary
        expandIcon={getExpandIcon()}
        sx={{
          transition: 'all 0.2s ease-in-out',
          '& .MuiAccordionSummary-content': {
            alignItems: 'center',
            gap: '8px',
          },
        }}
      >
        {item.icon && (
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            {item.icon}
          </span>
        )}
        <span
          style={{
            fontWeight: 500,
            color: variant === 'minimal' ? colors.text.inverse : 'inherit',
          }}
        >
          {item.trigger}
        </span>
      </MuiAccordionSummary>
      <MuiAccordionDetails>{item.content}</MuiAccordionDetails>
    </MuiAccordion>
  );
};

// Standalone Collapsible component using MUI Accordion
const Collapsible: React.FC<CollapsibleProps> = ({
  trigger,
  children,
  isExpanded: controlledIsExpanded,
  defaultExpanded = false,
  disabled = false,
  variant = 'default',
  size = 'md',
  onChange,
  className = '',
  triggerClassName = '',
  contentClassName = '',
  'data-testid': testId = 'collapsible',
}) => {
  const { colors } = useDesignSystem();
  const isControlled = controlledIsExpanded !== undefined;
  const [internalIsExpanded, setInternalIsExpanded] = useState(defaultExpanded);

  const isExpanded = isControlled ? controlledIsExpanded : internalIsExpanded;

  const handleChange = (_event: React.SyntheticEvent, expanded: boolean) => {
    if (disabled) return;

    if (!isControlled) {
      setInternalIsExpanded(expanded);
    }
    onChange?.(expanded);
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          minHeight: '44px',
          fontSize: '14px',
          padding: '8px 16px',
        };
      case 'lg':
        return {
          minHeight: '64px',
          fontSize: '18px',
          padding: '16px 24px',
        };
      default:
        return {
          minHeight: '54px',
          fontSize: '16px',
          padding: '12px 20px',
        };
    }
  };

  const getVariantStyles = () => {
    const sizeStyles = getSizeStyles();

    switch (variant) {
      case 'bordered':
        return {
          border: `1px solid ${colors.border.inverse}`, // Changed to inverse border
          borderRadius: '8px',
          overflow: 'hidden',
          '& .MuiAccordionSummary-root': {
            backgroundColor: colors.surface.primary,
            borderBottom: `1px solid ${colors.border.inverse}`, // Changed to inverse border
            minHeight: sizeStyles.minHeight,
            padding: sizeStyles.padding,
            fontWeight: 300, // Match info section styling
            lineHeight: 1.6, // Match info section styling
            fontSize: '19px', // Header now uses 19px
            '&:hover': {
              backgroundColor: colors.surface.primary,
              '& .MuiAccordionSummary-expandIconWrapper': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '50%',
                transition:
                  'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              },
            },
          },
          '& .MuiAccordionDetails-root': {
            padding: sizeStyles.padding,
            fontSize: '16px', // Content now uses default size (16px)
            lineHeight: 1.6, // Consistent line height
            marginBottom: '16px', // Add margin to prevent overlap
          },
        };
      case 'filled':
        return {
          backgroundColor: colors.surface.secondary,
          borderRadius: '8px',
          '& .MuiAccordionSummary-root': {
            backgroundColor: colors.surface.primary,
            minHeight: sizeStyles.minHeight,
            padding: sizeStyles.padding,
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            fontWeight: 300, // Match info section styling
            lineHeight: 1.6, // Match info section styling
            fontSize: '19px', // Header now uses 19px
            '&:hover': {
              backgroundColor: colors.surface.primary,
              '& .MuiAccordionSummary-expandIconWrapper': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '50%',
                transition:
                  'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              },
            },
          },
          '& .MuiAccordionDetails-root': {
            padding: sizeStyles.padding,
            backgroundColor: colors.surface.secondary,
            fontSize: '16px', // Content now uses default size (16px)
            lineHeight: 1.6, // Consistent line height
            marginBottom: '16px', // Add margin to prevent overlap
          },
        };
      case 'minimal':
        return {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          '& .MuiAccordionSummary-root': {
            backgroundColor: 'transparent',
            minHeight: sizeStyles.minHeight,
            padding: sizeStyles.padding,
            fontWeight: 300, // Match info section styling
            lineHeight: 1.6, // Match info section styling
            fontSize: '19px', // Header now uses 19px
            '&:hover': {
              backgroundColor: 'transparent',
              '& .MuiAccordionSummary-expandIconWrapper': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '50%',
                transition:
                  'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              },
            },
          },
          '& .MuiAccordionDetails-root': {
            padding: sizeStyles.padding,
            backgroundColor: colors.surface.primary,
            fontSize: '16px', // Content now uses default size (16px)
            lineHeight: 1.6, // Consistent line height
            marginBottom: '16px', // Add margin to prevent overlap
          },
        };
      default:
        return {
          backgroundColor: colors.surface.primary,
          border: `1px solid ${colors.border.inverse}`, // Changed to inverse border
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          '& .MuiAccordionSummary-root': {
            minHeight: sizeStyles.minHeight,
            padding: sizeStyles.padding,
            fontWeight: 300, // Match info section styling
            lineHeight: 1.6, // Match info section styling
            fontSize: '19px', // Header now uses 19px
            '&:hover': {
              backgroundColor: colors.surface.primary,
              '& .MuiAccordionSummary-expandIconWrapper': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '50%',
                transition:
                  'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              },
            },
          },
          '& .MuiAccordionDetails-root': {
            padding: sizeStyles.padding,
            fontSize: '16px', // Content now uses default size (16px)
            lineHeight: 1.6, // Consistent line height
            marginBottom: '16px', // Add margin to prevent overlap
          },
        };
    }
  };

  return (
    <div className={className} data-testid={testId}>
      <MuiAccordion
        expanded={isExpanded}
        onChange={handleChange}
        disabled={disabled}
        sx={getVariantStyles()}
        disableGutters
        elevation={0}
      >
        <MuiAccordionSummary
          expandIcon={
            <svg
              width='20'
              height='20'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          }
          className={triggerClassName}
          sx={{
            transition: 'all 0.2s ease-in-out',
            '& .MuiAccordionSummary-content': {
              alignItems: 'center',
            },
          }}
        >
          <span style={{ fontWeight: 500 }}>{trigger}</span>
        </MuiAccordionSummary>
        <MuiAccordionDetails className={contentClassName}>
          {children}
        </MuiAccordionDetails>
      </MuiAccordion>
    </div>
  );
};

export { Accordion, AccordionItem, Collapsible };
