/**
 * @fileoverview Dropdown/Select Component with advanced features.
 * @component Dropdown
 *
 * @description
 * Flexible dropdown with search, multi-select, grouping, and accessibility support.
 * Provides a comprehensive dropdown/select component with features like:
 * - Single and multi-select modes
 * - Search functionality
 * - Grouping of options
 * - Keyboard navigation
 * - Custom styling and theming
 * - Accessibility compliance
 *
 * @example
 * ```tsx
 * // Basic dropdown
 * <Dropdown
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' }
 *   ]}
 *   placeholder="Select an option..."
 *   onChange={(value) => console.log(value)}
 * />
 *
 * // Multi-select dropdown
 * <Dropdown
 *   options={options}
 *   multiple
 *   placeholder="Select multiple options..."
 *   onChange={(values) => console.log(values)}
 * />
 *
 * // Dropdown with search
 * <Dropdown
 *   options={options}
 *   searchable
 *   placeholder="Search and select..."
 * />
 * ```
 */

import React, {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  DropdownContextValue,
  DropdownProps,
  DropdownRef,
  Option,
  OptionGroup,
} from './types';

/**
 * Context for sharing dropdown state and methods between components.
 */
const DropdownContext = createContext<DropdownContextValue | null>(null);

/**
 * Type guard to check if an item is an OptionGroup.
 *
 * @param item - Option or OptionGroup to check
 * @returns True if the item is an OptionGroup
 */
const isOptionGroup = (item: Option | OptionGroup): item is OptionGroup => {
  return 'options' in item;
};

/**
 * Flattens nested option groups into a single array of options.
 *
 * @param items - Array of options and option groups
 * @returns Flattened array of options
 */
const flattenOptions = (items: Array<Option | OptionGroup>): Option[] => {
  return items.reduce<Option[]>((acc, item) => {
    if (isOptionGroup(item)) {
      return [...acc, ...item.options];
    }
    return [...acc, item];
  }, []);
};

/**
 * Default filter function for searching dropdown options.
 * Searches both label and value fields with case-insensitive matching.
 *
 * @param option - Option to filter
 * @param searchTerm - Search term to match against
 * @returns True if option matches the search term
 */
const defaultFilterFunction = (option: Option, searchTerm: string): boolean => {
  const term = searchTerm.toLowerCase();
  return (
    option.label.toLowerCase().includes(term) ||
    option.value.toString().toLowerCase().includes(term)
  );
};

/**
 * Advanced dropdown/select component with search, multi-select, and grouping capabilities.
 * Provides comprehensive form control functionality with accessibility support.
 *
 * @component
 * @param props - Dropdown configuration options
 * @param props.options - Array of options or option groups to display
 * @param props.value - Currently selected value(s)
 * @param props.placeholder - Placeholder text when no option is selected
 * @param props.multiple - Enable multi-select functionality
 * @param props.searchable - Enable search/filter functionality
 * @param props.disabled - Disable the dropdown
 * @param props.loading - Show loading state
 * @param props.required - Mark as required field
 * @param props.error - Show error state
 * @param props.errorMessage - Error message to display
 * @param props.helperText - Helper text below the dropdown
 * @param props.label - Label for the dropdown
 * @param props.size - Size variant ('sm' | 'md' | 'lg')
 * @param props.maxHeight - Maximum height of the dropdown menu
 * @param props.creatable - Allow creating new options
 * @param props.clearSearchOnSelect - Clear search term after selection
 * @param props.filterFunction - Custom filtering function for search
 * @param props.optionRenderer - Custom option rendering function
 * @returns Advanced dropdown component with ref support
 *
 * @example
 * ```tsx
 * // Basic dropdown
 * <Dropdown
 *   options={[
 *     { value: 'apple', label: 'Apple' },
 *     { value: 'banana', label: 'Banana' },
 *     { value: 'orange', label: 'Orange' }
 *   ]}
 *   value={selectedFruit}
 *   onChange={setSelectedFruit}
 *   placeholder="Choose a fruit"
 * />
 *
 * // Multi-select with search
 * <Dropdown
 *   options={countries}
 *   value={selectedCountries}
 *   onChange={setSelectedCountries}
 *   multiple
 *   searchable
 *   placeholder="Select countries"
 * />
 *
 * // Grouped options
 * <Dropdown
 *   options={[
 *     {
 *       label: 'Fruits',
 *       options: [
 *         { value: 'apple', label: 'Apple' },
 *         { value: 'banana', label: 'Banana' }
 *       ]
 *     },
 *     {
 *       label: 'Vegetables',
 *       options: [
 *         { value: 'carrot', label: 'Carrot' },
 *         { value: 'lettuce', label: 'Lettuce' }
 *       ]
 *     }
 *   ]}
 *   value={selection}
 *   onChange={setSelection}
 * />
 * ```
 */
const Dropdown = forwardRef<DropdownRef, DropdownProps>(
  (
    {
      options,
      value,
      placeholder = 'Select an option...',
      multiple = false,
      searchable = false,
      disabled = false,
      loading = false,
      required = false,
      error = false,
      errorMessage,
      helperText,
      label,
      size = 'md',
      maxHeight = '256px',
      creatable = false,
      clearSearchOnSelect = true,
      filterFunction = defaultFilterFunction,
      optionRenderer,
      valueRenderer,
      noOptionsMessage = 'No options found',
      loadingMessage = 'Loading...',
      onChange,
      onSearch,
      onOpen,
      onClose,
      onCreate,
      className = '',
      menuClassName = '',
      'data-testid': testId = 'dropdown',
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    // Convert value to array for consistent handling
    const selectedValues = useMemo(() => {
      if (value === undefined || value === null) return [];
      return Array.isArray(value) ? value : [value];
    }, [value]);

    // Get all available options (flattened)
    const allOptions = useMemo(() => flattenOptions(options), [options]);

    // Get selected options
    const selectedOptions = useMemo(() => {
      return allOptions.filter((option) =>
        selectedValues.includes(option.value)
      );
    }, [allOptions, selectedValues]);

    // Filter and search options
    const filteredOptions = useMemo(() => {
      if (!searchTerm) return options;

      return options.reduce<Array<Option | OptionGroup>>((acc, item) => {
        if (isOptionGroup(item)) {
          const filteredGroupOptions = item.options.filter((option) =>
            filterFunction(option, searchTerm)
          );
          if (filteredGroupOptions.length > 0) {
            acc.push({ ...item, options: filteredGroupOptions });
          }
        } else {
          if (filterFunction(item, searchTerm)) {
            acc.push(item);
          }
        }
        return acc;
      }, []);
    }, [options, searchTerm, filterFunction]);

    // Get flattened filtered options for keyboard navigation
    const flatFilteredOptions = useMemo(
      () => flattenOptions(filteredOptions),
      [filteredOptions]
    );

    // Handle option selection
    const selectOption = useCallback(
      (option: Option) => {
        if (option.disabled) return;

        let newValue: string | number | Array<string | number>;
        let newSelectedOptions: Option | Option[];

        if (multiple) {
          const isSelected = selectedValues.includes(option.value);
          if (isSelected) {
            newValue = selectedValues.filter((v) => v !== option.value);
            newSelectedOptions = selectedOptions.filter(
              (o) => o.value !== option.value
            );
          } else {
            newValue = [...selectedValues, option.value];
            newSelectedOptions = [...selectedOptions, option];
          }
        } else {
          newValue = option.value;
          newSelectedOptions = option;
          setIsOpen(false);
          onClose?.();
        }

        if (clearSearchOnSelect && searchable) {
          setSearchTerm('');
        }

        setHighlightedIndex(-1);
        onChange?.(newValue, newSelectedOptions);
      },
      [
        multiple,
        selectedValues,
        selectedOptions,
        clearSearchOnSelect,
        searchable,
        onChange,
        onClose,
      ]
    );

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (disabled) return;

        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
              onOpen?.();
            } else {
              setHighlightedIndex((prev) =>
                prev < flatFilteredOptions.length - 1 ? prev + 1 : 0
              );
            }
            break;
          case 'ArrowUp':
            event.preventDefault();
            if (isOpen) {
              setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : flatFilteredOptions.length - 1
              );
            }
            break;
          case 'Enter':
            event.preventDefault();
            if (isOpen && highlightedIndex >= 0) {
              selectOption(flatFilteredOptions[highlightedIndex]);
            } else if (!isOpen) {
              setIsOpen(true);
              onOpen?.();
            }
            break;
          case 'Escape':
            event.preventDefault();
            if (isOpen) {
              setIsOpen(false);
              setHighlightedIndex(-1);
              onClose?.();
            }
            break;
          case 'Tab':
            if (isOpen) {
              setIsOpen(false);
              setHighlightedIndex(-1);
              onClose?.();
            }
            break;
        }
      },
      [
        disabled,
        isOpen,
        highlightedIndex,
        flatFilteredOptions,
        onOpen,
        onClose,
        selectOption,
      ]
    );

    // Handle search input change
    const handleSearchChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        setHighlightedIndex(-1);
        onSearch?.(newSearchTerm);
      },
      [onSearch]
    );

    // Handle dropdown toggle
    const toggleDropdown = useCallback(() => {
      if (disabled) return;

      if (isOpen) {
        setIsOpen(false);
        setHighlightedIndex(-1);
        onClose?.();
      } else {
        setIsOpen(true);
        onOpen?.();
        if (searchable) {
          setTimeout(() => inputRef.current?.focus(), 0);
        }
      }
    }, [disabled, isOpen, searchable, onOpen, onClose]);

    // Handle outside click
    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setHighlightedIndex(-1);
          onClose?.();
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleOutsideClick);
        return () =>
          document.removeEventListener('mousedown', handleOutsideClick);
      }

      return undefined;
    }, [isOpen, onClose]);

    // Expose ref methods
    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          if (searchable) {
            inputRef.current?.focus();
          } else {
            dropdownRef.current?.focus();
          }
        },
        blur: () => {
          if (searchable) {
            inputRef.current?.blur();
          } else {
            dropdownRef.current?.blur();
          }
        },
        open: () => {
          setIsOpen(true);
          onOpen?.();
        },
        close: () => {
          setIsOpen(false);
          setHighlightedIndex(-1);
          onClose?.();
        },
        clear: () => {
          onChange?.(multiple ? [] : '', multiple ? [] : undefined);
          setSearchTerm('');
        },
      }),
      [searchable, multiple, onChange, onOpen, onClose]
    );

    const sizeClasses = {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-sm px-3 py-2',
      lg: 'text-base px-4 py-2.5',
    };

    const menuId = `dropdown-menu-${testId}`;

    const contextValue: DropdownContextValue = {
      isOpen,
      searchTerm,
      highlightedIndex,
      selectedOptions,
      filteredOptions,
      setSearchTerm,
      setHighlightedIndex,
      selectOption,
      removeOption: (option: Option) => {
        if (multiple) {
          const newValue = selectedValues.filter((v) => v !== option.value);
          const newSelectedOptions = selectedOptions.filter(
            (o) => o.value !== option.value
          );
          onChange?.(newValue, newSelectedOptions);
        }
      },
      openDropdown: () => setIsOpen(true),
      closeDropdown: () => setIsOpen(false),
    };

    return (
      <DropdownContext.Provider value={contextValue}>
        <div
          className={`dropdown-wrapper ${className}`}
          ref={dropdownRef}
          data-testid={testId}
        >
          {label && (
            <label
              className={`dropdown-label ${error ? 'dropdown-label-error' : ''}`}
            >
              {label}
              {required && (
                <span className='dropdown-required-indicator'>*</span>
              )}
            </label>
          )}

          <div
            className={`
            relative w-full border rounded-md shadow-sm cursor-pointer transition-colors duration-200
            ${error ? 'border-red-300' : 'border-gray-300 hover:border-gray-400'}
            ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
            ${isOpen ? 'ring-1 ring-blue-500 border-blue-500' : ''}
            ${sizeClasses[size]}
          `}
            onClick={toggleDropdown}
            onKeyDown={handleKeyDown}
            tabIndex={searchable ? -1 : 0}
            role='combobox'
            aria-expanded={isOpen}
            aria-haspopup='listbox'
            aria-controls={menuId}
            aria-disabled={disabled}
            aria-label={label ?? placeholder}
          >
            <div className='dropdown-content-wrapper'>
              <div className='dropdown-content'>
                {searchable && isOpen ? (
                  <input
                    ref={inputRef}
                    type='text'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    className='dropdown-search-input'
                    placeholder={selectedOptions.length > 0 ? '' : placeholder}
                    disabled={disabled}
                  />
                ) : (
                  <div className='truncate'>
                    {selectedOptions.length > 0 ? (
                      valueRenderer ? (
                        valueRenderer(
                          multiple ? selectedOptions : selectedOptions[0]
                        )
                      ) : multiple ? (
                        <div className='dropdown-selected-multiple'>
                          {selectedOptions.map((option) => (
                            <span
                              key={option.value}
                              className='dropdown-selected-tag'
                            >
                              {option.label}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectOption(option);
                                }}
                                className='dropdown-tag-remove'
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      ) : (
                        selectedOptions[0].label
                      )
                    ) : (
                      <span className='dropdown-placeholder'>
                        {placeholder}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className='dropdown-controls'>
                {loading && (
                  <svg
                    className='dropdown-spinner'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='dropdown-spinner-circle'
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
                )}
                <svg
                  className={`dropdown-arrow ${isOpen ? 'dropdown-arrow-open' : ''}`}
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
              </div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <ul
              ref={menuRef}
              id={menuId}
              className={`
              absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg
              max-h-60 overflow-auto focus:outline-none
              ${menuClassName}
            `}
              style={{ maxHeight }}
              role='listbox'
              aria-multiselectable={multiple}
              aria-label='Options'
            >
              {loading ? (
                <li className='dropdown-loading'>{loadingMessage}</li>
              ) : flatFilteredOptions.length === 0 ? (
                <li className='dropdown-empty'>
                  {creatable && searchTerm ? (
                    <button
                      className='dropdown-create-button'
                      onClick={() => onCreate?.(searchTerm)}
                    >
                      Create &quot;{searchTerm}&quot;
                    </button>
                  ) : (
                    noOptionsMessage
                  )}
                </li>
              ) : (
                filteredOptions.map((item, groupIndex) => {
                  if (isOptionGroup(item)) {
                    return (
                      <li key={`group-${groupIndex}`}>
                        <div className='dropdown-group-header'>
                          {item.label}
                        </div>
                        {item.options.map((option) => {
                          const flatIndex = flatFilteredOptions.findIndex(
                            (o) => o.value === option.value
                          );
                          return (
                            <OptionItem
                              key={option.value}
                              option={option}
                              isSelected={selectedValues.includes(option.value)}
                              isHighlighted={highlightedIndex === flatIndex}
                              onClick={() => selectOption(option)}
                              {...(optionRenderer && {
                                renderer: optionRenderer,
                              })}
                            />
                          );
                        })}
                      </li>
                    );
                  } else {
                    const flatIndex = flatFilteredOptions.findIndex(
                      (o) => o.value === item.value
                    );
                    return (
                      <OptionItem
                        key={item.value}
                        option={item}
                        isSelected={selectedValues.includes(item.value)}
                        isHighlighted={highlightedIndex === flatIndex}
                        onClick={() => selectOption(item)}
                        {...(optionRenderer && { renderer: optionRenderer })}
                      />
                    );
                  }
                })
              )}
            </ul>
          )}

          {/* Helper text or error message */}
          {(helperText ?? errorMessage) && (
            <p
              className={`dropdown-helper-text ${error ? 'dropdown-helper-text-error' : ''}`}
            >
              {error ? errorMessage : helperText}
            </p>
          )}
        </div>
      </DropdownContext.Provider>
    );
  }
);

// Option Item Component
interface OptionItemProps {
  option: Option;
  isSelected: boolean;
  isHighlighted: boolean;
  onClick: () => void;
  renderer?: (
    option: Option,
    isSelected: boolean,
    isHighlighted: boolean
  ) => React.ReactNode;
}

const OptionItem: React.FC<OptionItemProps> = ({
  option,
  isSelected,
  isHighlighted,
  onClick,
  renderer,
}) => {
  if (renderer) {
    return (
      <li>
        <div onClick={onClick} className='cursor-pointer'>
          {renderer(option, isSelected, isHighlighted)}
        </div>
      </li>
    );
  }

  return (
    <li
      className={`
        px-3 py-2 cursor-pointer flex items-center justify-between
        ${isHighlighted ? 'bg-blue-50' : 'hover:bg-gray-50'}
        ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={option.disabled ? undefined : onClick}
      role='option'
      aria-selected={isSelected}
    >
      <div className='dropdown-option-content'>
        {option.icon && (
          <span className='dropdown-option-icon'>{option.icon}</span>
        )}
        <div className='dropdown-option-text'>
          <div className='dropdown-option-label'>{option.label}</div>
          {option.description && (
            <div className='dropdown-option-description'>
              {option.description}
            </div>
          )}
        </div>
      </div>
      {isSelected && (
        <svg
          className='dropdown-option-check'
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path
            fillRule='evenodd'
            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
            clipRule='evenodd'
          />
        </svg>
      )}
    </li>
  );
};

Dropdown.displayName = 'Dropdown';

export { Dropdown };
