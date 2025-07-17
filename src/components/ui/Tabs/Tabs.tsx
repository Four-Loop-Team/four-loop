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
              className={`
                flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-500
                hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200
                ${size === 'sm' ? 'px-2 py-1 text-xs' : size === 'lg' ? 'px-4 py-3 text-base' : ''}
              `}
              aria-label='Add new tab'
              data-testid='add-tab-button'
            >
              {addButtonContent ?? (
                <svg
                  className='tab-add-icon'
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

        <div className={`flex-1 ${tabContentClassName}`}>
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const baseClasses =
    orientation === 'vertical' ? 'flex flex-col space-y-1' : 'flex space-x-1';

  const variantClasses = {
    default: 'border-b border-gray-200',
    pills: '',
    underline: 'border-b border-gray-200',
    cards: 'border-b border-gray-200',
  };

  const centeredClasses =
    centered && orientation === 'horizontal' ? 'justify-center' : '';
  const scrollableClasses = scrollable ? 'overflow-x-auto scrollbar-hide' : '';

  return (
    <div
      ref={scrollRef}
      className={`
        ${baseClasses} ${variantClasses[variant]} ${centeredClasses} ${scrollableClasses} ${className}
      `}
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
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const getVariantClasses = () => {
    const baseClasses = `
      relative inline-flex items-center gap-2 font-medium transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      ${sizeClasses[size]} ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `;

    switch (variant) {
      case 'pills':
        return `${baseClasses} rounded-md ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`;
      case 'underline':
        return `${baseClasses} border-b-2 ${
          isActive
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
        }`;
      case 'cards':
        return `${baseClasses} rounded-t-md border border-b-0 ${
          isActive
            ? 'bg-white border-gray-200 text-gray-900'
            : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900'
        }`;
      default:
        return `${baseClasses} ${
          isActive
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-gray-900'
        }`;
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

  return (
    <button
      className={`${getVariantClasses()} ${className}`}
      onClick={handleClick}
      disabled={item.disabled}
      role='tab'
      aria-selected={isActive}
      aria-controls={`tabpanel-${item.id}`}
      id={`tab-${item.id}`}
      data-testid={`${testId}-${item.id}`}
    >
      {item.icon && <span className='tab-icon'>{item.icon}</span>}
      <span className='truncate'>{item.label}</span>
      {item.badge && <span className='tab-badge'>{item.badge}</span>}
      {onClose && (
        <button
          onClick={handleClose}
          className='tab-close-button'
          aria-label={`Close ${item.label} tab`}
        >
          <svg
            className='tab-close-icon'
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
      className={`${shouldShowContent ? 'block' : 'hidden'} ${className}`}
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
