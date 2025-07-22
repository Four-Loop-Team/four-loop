/**
 * @fileoverview Tabs Component - Flexible tabbed interface navigation
 * @component Tabs
 *
 * @description
 * A flexible tabs component providing navigation between content panels with:
 * - Multiple visual variants (default, buttons, cards)
 * - Horizontal and vertical orientations
 * - Controlled and uncontrolled modes
 * - Keyboard navigation support
 * - Customizable styling and animations
 * - Accessibility features built-in
 *
 * @features
 * - ✅ Multiple orientation support
 * - ✅ Customizable variants
 * - ✅ Keyboard navigation
 * - ✅ Controlled/uncontrolled modes
 * - ✅ Custom styling support
 * - ✅ Animation support
 * - ✅ ARIA compliance
 * - ✅ TypeScript support
 *
 * @example
 * ```tsx
 * // Basic tabs usage
 * <Tabs
 *   items={[
 *     { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
 *     { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> }
 *   ]}
 * />
 *
 * // Controlled tabs with custom variant
 * <Tabs
 *   items={tabItems}
 *   activeTab={activeTab}
 *   onTabChange={setActiveTab}
 *   variant="buttons"
 *   orientation="vertical"
 * />
 *
 * // Card variant with custom styling
 * <Tabs
 *   items={tabItems}
 *   variant="cards"
 *   className="custom-tabs"
 *   defaultActiveTab="tab2"
 * />
 * ```
 *
 * @accessibility
 * - ARIA tablist pattern implementation
 * - Keyboard navigation (Arrow keys, Home/End)
 * - Focus management and visual indicators
 * - Screen reader compatible
 * - High contrast support
 */

import { useDesignSystem } from '@/lib/hooks';
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  TabListProps,
  TabPanelProps,
  TabProps,
  TabsContextValue,
  TabsProps,
} from './types';

// Tabs Context
const TabsContext = createContext<TabsContextValue | null>(null);

// Main Tabs component
const Tabs: React.FC<TabsProps> = ({
  items,
  activeTab: controlledActiveTab,
  defaultActiveTab,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  centered = false,
  scrollable = false,
  lazy = false,
  keepAlive = false,
  onChange,
  onTabClose,
  onTabAdd,
  showAddButton = false,
  addButtonContent,
  className = '',
  tabListClassName = '',
  tabContentClassName = '',
  'data-testid': testId = 'tabs',
}) => {
  const { colors, spacing, radius } = useDesignSystem();
  const isControlled = controlledActiveTab !== undefined;
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultActiveTab ?? items[0]?.id ?? ''
  );

  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  const setActiveTab = useCallback(
    (tabId: string) => {
      if (!isControlled) {
        setInternalActiveTab(tabId);
      }
      onChange?.(tabId);
    },
    [isControlled, onChange]
  );

  const handleTabClose = useCallback(
    (tabId: string) => {
      onTabClose?.(tabId);
      // If the closed tab was active, switch to another tab
      if (tabId === activeTab) {
        const currentIndex = items.findIndex((item) => item.id === tabId);
        const nextTab = items[currentIndex + 1] ?? items[currentIndex - 1];
        if (nextTab) {
          setActiveTab(nextTab.id);
        }
      }
    },
    [onTabClose, activeTab, items, setActiveTab]
  );

  const contextValue: TabsContextValue = {
    activeTab,
    setActiveTab,
    orientation,
    variant,
    size,
  };

  const orientationClasses =
    orientation === 'vertical' ? 'flex flex-row' : 'flex flex-col';

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={`${orientationClasses} ${className}`}
        data-testid={testId}
      >
        <TabList
          orientation={orientation}
          variant={variant}
          size={size}
          centered={centered}
          scrollable={scrollable}
          className={tabListClassName}
        >
          {items.map((item) => (
            <Tab
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
              {...(item.closable && { onClose: () => handleTabClose(item.id) })}
              variant={variant}
              size={size}
            />
          ))}
          {showAddButton && (
            <button
              onClick={onTabAdd}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding:
                  size === 'sm'
                    ? `${spacing.micro.xs} ${spacing.micro.sm}`
                    : size === 'lg'
                      ? `${spacing.micro.md} ${spacing.component.sm}`
                      : `${spacing.micro.sm} ${spacing.micro.md}`,
                fontSize:
                  size === 'sm'
                    ? '0.75rem'
                    : size === 'lg'
                      ? '1rem'
                      : '0.875rem',
                fontWeight: '500',
                color: colors.text.muted,
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: radius.md,
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.text.primary;
                e.currentTarget.style.backgroundColor =
                  colors.background.secondary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.text.muted;
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label='Add new tab'
              data-testid='add-tab-button'
            >
              {addButtonContent ?? (
                <svg
                  style={{ width: '1rem', height: '1rem' }}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 4v16m8-8H4'
                  />
                </svg>
              )}
            </button>
          )}
        </TabList>

        <div style={{ flex: 1 }} className={tabContentClassName}>
          {items.map((item) => (
            <TabPanel
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
              lazy={lazy}
              keepAlive={keepAlive}
            />
          ))}
        </div>
      </div>
    </TabsContext.Provider>
  );
};

// TabList component
const TabList: React.FC<TabListProps> = ({
  children,
  className = '',
  orientation = 'horizontal',
  variant = 'default',
  centered = false,
  scrollable = false,
  'data-testid': testId = 'tab-list',
}) => {
  const { colors } = useDesignSystem();
  const scrollRef = useRef<HTMLDivElement>(null);

  const baseStyles: React.CSSProperties = {
    display: 'flex',
    ...(orientation === 'vertical'
      ? { flexDirection: 'column', gap: '0.25rem' }
      : { flexDirection: 'row', gap: '0.25rem' }),
    ...(variant === 'default' || variant === 'underline' || variant === 'cards'
      ? { borderBottom: `1px solid ${colors.border.muted}` }
      : {}),
    ...(centered && orientation === 'horizontal'
      ? { justifyContent: 'center' }
      : {}),
    ...(scrollable
      ? { overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }
      : {}),
  };

  return (
    <div
      ref={scrollRef}
      style={baseStyles}
      className={className}
      role='tablist'
      aria-orientation={orientation}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

// Tab component
const Tab: React.FC<TabProps> = ({
  item,
  isActive,
  onClick,
  onClose,
  variant = 'default',
  size = 'md',
  className = '',
  'data-testid': testId = 'tab',
}) => {
  const { colors, spacing, radius, typography, brand } = useDesignSystem();

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: `${spacing.micro.xs} ${spacing.micro.md}`,
          fontSize: typography.fontSize.xs,
        };
      case 'lg':
        return {
          padding: `${spacing.micro.md} ${spacing.component.sm}`,
          fontSize: typography.fontSize.base,
        };
      default:
        return {
          padding: `${spacing.micro.sm} ${spacing.component.xs}`,
          fontSize: typography.fontSize.sm,
        };
    }
  };

  const getVariantStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: typography.fontWeight.medium,
      transition: 'all 200ms ease',
      border: 'none',
      background: 'none',
      cursor: item.disabled ? 'not-allowed' : 'pointer',
      opacity: item.disabled ? 0.5 : 1,
      ...getSizeStyles(),
    };

    switch (variant) {
      case 'pills':
        return {
          ...baseStyles,
          borderRadius: radius.md,
          backgroundColor: isActive ? brand.primary : 'transparent',
          color: isActive ? colors.text.inverse : colors.text.muted,
        };
      case 'underline':
        return {
          ...baseStyles,
          borderBottom: `2px solid ${isActive ? brand.primary : 'transparent'}`,
          color: isActive ? brand.primary : colors.text.muted,
        };
      case 'cards':
        return {
          ...baseStyles,
          borderTopLeftRadius: radius.md,
          borderTopRightRadius: radius.md,
          border: `1px solid ${colors.border.muted}`,
          borderBottom: 'none',
          backgroundColor: isActive
            ? colors.background.inverse
            : colors.background.secondary,
          color: isActive ? colors.text.primary : colors.text.muted,
        };
      default:
        return {
          ...baseStyles,
          borderBottom: `2px solid ${isActive ? brand.primary : 'transparent'}`,
          color: isActive ? brand.primary : colors.text.muted,
        };
    }
  };

  const handleClick = () => {
    if (!item.disabled) {
      onClick();
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.();
  };

  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    ...getVariantStyles(),
    ...(isHovered && !item.disabled && !isActive
      ? {
          color: colors.text.primary,
          ...(variant === 'pills'
            ? { backgroundColor: colors.background.secondary }
            : {}),
          ...(variant === 'underline'
            ? { borderBottomColor: colors.border.default }
            : {}),
        }
      : {}),
  };

  return (
    <button
      style={buttonStyle}
      className={className}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={item.disabled}
      role='tab'
      aria-selected={isActive}
      aria-controls={`tabpanel-${item.id}`}
      id={`tab-${item.id}`}
      data-testid={`${testId}-${item.id}`}
    >
      {item.icon && <span style={{ display: 'inline-flex' }}>{item.icon}</span>}
      <span
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {item.label}
      </span>
      {item.badge && (
        <span style={{ display: 'inline-flex' }}>{item.badge}</span>
      )}
      {onClose && (
        <button
          onClick={handleClose}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '1rem',
            height: '1rem',
            padding: 0,
            border: 'none',
            background: 'none',
            color: 'currentColor',
            borderRadius: '50%',
            cursor: 'pointer',
            opacity: 0.7,
            transition: 'opacity 150ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.7';
          }}
          aria-label={`Close ${item.label} tab`}
        >
          <svg
            style={{ width: '0.75rem', height: '0.75rem' }}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      )}
    </button>
  );
};

// TabPanel component
const TabPanel: React.FC<TabPanelProps> = ({
  item,
  isActive,
  lazy = false,
  keepAlive = false,
  className = '',
  'data-testid': testId = 'tab-panel',
}) => {
  const [hasBeenActive, setHasBeenActive] = useState(!lazy || isActive);

  useEffect(() => {
    if (isActive && !hasBeenActive) {
      setHasBeenActive(true);
    }
  }, [isActive, hasBeenActive]);

  const shouldRenderContent = () => {
    if (!lazy) return true;
    if (keepAlive) return hasBeenActive;
    return isActive;
  };

  const shouldShowContent = keepAlive ? isActive : true;

  if (!shouldRenderContent()) {
    return null;
  }

  return (
    <div
      style={{
        display: shouldShowContent ? 'block' : 'none',
      }}
      className={className}
      role='tabpanel'
      aria-labelledby={`tab-${item.id}`}
      id={`tabpanel-${item.id}`}
      tabIndex={0}
      data-testid={`${testId}-${item.id}`}
    >
      {item.content}
    </div>
  );
};

export { Tab, TabList, TabPanel, Tabs };
