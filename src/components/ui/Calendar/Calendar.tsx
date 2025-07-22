/**
 * @fileoverview Calendar/DatePicker Component with comprehensive date selection features.
 * Provides calendar view, date input, time picker, and range selection capabilities.
 */

import { useDesignSystem } from '@/lib/hooks';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  CalendarGridProps,
  CalendarProps,
  DatePickerProps,
  TimePickerProps,
} from './types';

/**
 * Checks if two dates represent the same day.
 *
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns True if dates are the same day
 */
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

/**
 * Checks if two dates are in the same month and year.
 *
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns True if dates are in the same month
 */
const isSameMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

/**
 * Adds a specified number of days to a date.
 *
 * @param date - Base date
 * @param days - Number of days to add (can be negative)
 * @returns New date with days added
 */
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Adds a specified number of months to a date.
 *
 * @param date - Base date
 * @param months - Number of months to add (can be negative)
 * @returns New date with months added
 */
const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Gets the start of the week for a given date.
 *
 * @param date - Date to find week start for
 * @param firstDayOfWeek - First day of week (0 = Sunday, 1 = Monday)
 * @returns Date representing the start of the week
 */
const startOfWeek = (date: Date, firstDayOfWeek: number): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;
  result.setDate(result.getDate() - diff);
  return result;
};

const formatDate = (date: Date, format?: string): string => {
  if (!format) {
    return date.toLocaleDateString();
  }

  // Simple format implementation
  return format
    .replace('YYYY', date.getFullYear().toString())
    .replace('MM', (date.getMonth() + 1).toString().padStart(2, '0'))
    .replace('DD', date.getDate().toString().padStart(2, '0'));
};

const isDateDisabled = (
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[]
): boolean => {
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  if (disabledDates?.some((disabled) => isSameDay(date, disabled))) return true;
  return false;
};

// Calendar Grid Component
const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  selectedDates,
  minDate,
  maxDate,
  disabledDates,
  firstDayOfWeek,
  multiple: _multiple, // TODO: Implement multiple date selection
  range: _range, // TODO: Implement date range selection
  onDateClick,
  renderDate,
  showWeekNumbers,
  size,
}) => {
  const { colors, spacing, typography, radius, brand } = useDesignSystem();
  // Generate calendar grid
  const weeks = useMemo(() => {
    const firstOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const firstDate = startOfWeek(firstOfMonth, firstDayOfWeek);

    const weeks: Date[][] = [];
    let currentDate = new Date(firstDate);

    for (let week = 0; week < 6; week++) {
      const weekDates: Date[] = [];
      for (let day = 0; day < 7; day++) {
        weekDates.push(new Date(currentDate));
        currentDate = addDays(currentDate, 1);
      }
      weeks.push(weekDates);

      // Stop if we've moved past the current month and filled at least 4 weeks
      if (week >= 3 && !isSameMonth(currentDate, currentMonth)) {
        break;
      }
    }

    return weeks;
  }, [currentMonth, firstDayOfWeek]);

  // Week day names
  const weekDays = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const orderedDays = [
      ...days.slice(firstDayOfWeek),
      ...days.slice(0, firstDayOfWeek),
    ];
    return orderedDays;
  }, [firstDayOfWeek]);

  // Size styles using design tokens
  const getSizeStyles = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm':
        return {
          fontSize: typography.fontSize.xs,
          padding: spacing.micro.xs,
          height: '1.5rem',
          width: '1.5rem',
        };
      case 'lg':
        return {
          fontSize: typography.fontSize.base,
          padding: spacing.micro.sm,
          height: '2.5rem',
          width: '2.5rem',
        };
      default: // md
        return {
          fontSize: typography.fontSize.sm,
          padding: spacing.micro.sm,
          height: '2rem',
          width: '2rem',
        };
    }
  };

  const cellStyles = getSizeStyles(size);

  return (
    <div style={{ width: '100%' }}>
      {/* Header with day names */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: showWeekNumbers
            ? 'auto repeat(7, 1fr)'
            : 'repeat(7, 1fr)',
          gap: '1px',
          backgroundColor: colors.border.muted,
          borderRadius: radius.md,
          overflow: 'hidden',
          marginBottom: '1px',
        }}
      >
        {showWeekNumbers && (
          <div
            style={{
              padding: spacing.micro.sm,
              backgroundColor: colors.background.secondary,
              fontSize: typography.fontSize.xs,
              fontWeight: typography.fontWeight.medium,
              color: colors.text.muted,
              textAlign: 'center',
            }}
          >
            Wk
          </div>
        )}
        {weekDays.map((day) => (
          <div
            key={day}
            style={{
              padding: spacing.micro.sm,
              backgroundColor: colors.background.secondary,
              fontSize: typography.fontSize.xs,
              fontWeight: typography.fontWeight.medium,
              color: colors.text.muted,
              textAlign: 'center',
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      {weeks.map((week, weekIndex) => (
        <div
          key={weekIndex}
          style={{
            display: 'grid',
            gridTemplateColumns: showWeekNumbers
              ? 'auto repeat(7, 1fr)'
              : 'repeat(7, 1fr)',
            gap: '1px',
            backgroundColor: colors.border.muted,
            marginBottom: '1px',
          }}
        >
          {showWeekNumbers && (
            <div
              style={{
                padding: spacing.micro.sm,
                backgroundColor: colors.background.inverse,
                fontSize: typography.fontSize.xs,
                color: colors.text.muted,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {Math.ceil((week[0].getDate() + firstDayOfWeek) / 7)}
            </div>
          )}
          {week.map((date) => {
            const isSelected = selectedDates.some((selected) =>
              isSameDay(selected, date)
            );
            const isDisabled = isDateDisabled(
              date,
              minDate,
              maxDate,
              disabledDates
            );
            const isOtherMonth = !isSameMonth(date, currentMonth);
            const isToday = isSameDay(date, new Date());

            return (
              <button
                key={date.toISOString()}
                type='button'
                onClick={() => !isDisabled && onDateClick(date)}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                style={{
                  ...cellStyles,
                  border: 'none',
                  backgroundColor: isSelected
                    ? brand.primary
                    : colors.background.inverse,
                  color: isSelected
                    ? colors.text.inverse
                    : isDisabled
                      ? colors.text.muted + '80' // 50% opacity
                      : isOtherMonth
                        ? colors.text.muted
                        : colors.text.primary,
                  borderRadius: radius.md,
                  transition: 'all 200ms ease',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  opacity: isDisabled ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  fontWeight: isToday
                    ? typography.fontWeight.bold
                    : typography.fontWeight.normal,
                  ...(isToday && !isSelected
                    ? {
                        backgroundColor: brand.primary + '20', // 20% opacity
                      }
                    : {}),
                }}
                onMouseEnter={(e) => {
                  if (!isDisabled && !isSelected) {
                    e.currentTarget.style.backgroundColor =
                      colors.background.secondary;
                  } else if (isSelected) {
                    e.currentTarget.style.backgroundColor =
                      brand.primary + 'DD'; // Darker
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isDisabled && !isSelected) {
                    e.currentTarget.style.backgroundColor =
                      colors.background.inverse;
                  } else if (isSelected) {
                    e.currentTarget.style.backgroundColor = brand.primary;
                  }
                  if (isToday && !isSelected) {
                    e.currentTarget.style.backgroundColor =
                      brand.primary + '20';
                  }
                }}
              >
                {renderDate
                  ? renderDate(date, isSelected, isDisabled)
                  : date.getDate()}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Time Picker Component
const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  format = '24h',
  minTime: _minTime, // TODO: Implement time constraints
  maxTime: _maxTime, // TODO: Implement time constraints
  minuteStep = 1,
  hourStep: _hourStep = 1, // TODO: Implement hour stepping
  size = 'md',
  className = '',
  disabled = false,
}) => {
  const { typography, spacing } = useDesignSystem();
  const [hours, setHours] = useState(value?.getHours() ?? 0);
  const [minutes, setMinutes] = useState(value?.getMinutes() ?? 0);
  const [ampm, setAmpm] = useState(
    value ? (value.getHours() >= 12 ? 'PM' : 'AM') : 'AM'
  );

  const updateTime = useCallback(
    (newHours: number, newMinutes: number) => {
      if (!onChange) return;

      const newDate = new Date(value ?? new Date());
      newDate.setHours(newHours);
      newDate.setMinutes(newMinutes);
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);

      onChange(newDate);
    },
    [value, onChange]
  );

  const handleHourChange = (newHours: number) => {
    let actualHours = newHours;
    if (format === '12h') {
      actualHours = ampm === 'PM' && newHours !== 12 ? newHours + 12 : newHours;
      if (ampm === 'AM' && newHours === 12) actualHours = 0;
    }

    setHours(actualHours);
    updateTime(actualHours, minutes);
  };

  const handleMinuteChange = (newMinutes: number) => {
    setMinutes(newMinutes);
    updateTime(hours, newMinutes);
  };

  const handleAmPmChange = (newAmPm: 'AM' | 'PM') => {
    setAmpm(newAmPm);
    const newHours =
      newAmPm === 'PM' && hours < 12
        ? hours + 12
        : newAmPm === 'AM' && hours >= 12
          ? hours - 12
          : hours;
    setHours(newHours);
    updateTime(newHours, minutes);
  };

  const getSizeStyles = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm':
        return {
          fontSize: typography.fontSize.sm,
          paddingLeft: spacing.component.xs,
          paddingRight: spacing.component.xs,
          paddingTop: spacing.micro.xs,
          paddingBottom: spacing.micro.xs,
        };
      case 'lg':
        return {
          fontSize: typography.fontSize.lg,
          paddingLeft: spacing.component.md,
          paddingRight: spacing.component.md,
          paddingTop: spacing.micro.md,
          paddingBottom: spacing.micro.md,
        };
      default:
        return {
          fontSize: typography.fontSize.base,
          paddingLeft: spacing.component.sm,
          paddingRight: spacing.component.sm,
          paddingTop: spacing.micro.sm,
          paddingBottom: spacing.micro.sm,
        };
    }
  };

  const displayHours =
    format === '12h'
      ? hours === 0
        ? 12
        : hours > 12
          ? hours - 12
          : hours
      : hours;

  return (
    <div className={`calendar-time-picker ${className}`}>
      {/* Hours */}
      <select
        value={displayHours}
        onChange={(e) => handleHourChange(Number(e.target.value))}
        disabled={disabled}
        style={{
          ...getSizeStyles(size),
          border: '1px solid #d1d5db',
          borderRadius: '0.375rem',
          backgroundColor: disabled ? '#f3f4f6' : '#ffffff',
          outline: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        onFocus={(e) => {
          e.target.style.outline = '2px solid #3b82f6';
          e.target.style.borderColor = 'transparent';
        }}
        onBlur={(e) => {
          e.target.style.outline = 'none';
          e.target.style.borderColor = '#d1d5db';
        }}
      >
        {Array.from({ length: format === '12h' ? 12 : 24 }, (_, i) => {
          const hour = format === '12h' ? i + 1 : i;
          return (
            <option key={hour} value={hour}>
              {hour.toString().padStart(2, '0')}
            </option>
          );
        })}
      </select>

      <span className='time-separator'>:</span>

      {/* Minutes */}
      <select
        value={minutes}
        onChange={(e) => handleMinuteChange(Number(e.target.value))}
        disabled={disabled}
        style={{
          ...getSizeStyles(size),
          border: '1px solid #d1d5db',
          borderRadius: '0.375rem',
          backgroundColor: disabled ? '#f3f4f6' : '#ffffff',
          outline: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        onFocus={(e) => {
          e.target.style.outline = '2px solid #3b82f6';
          e.target.style.borderColor = 'transparent';
        }}
        onBlur={(e) => {
          e.target.style.outline = 'none';
          e.target.style.borderColor = '#d1d5db';
        }}
      >
        {Array.from({ length: 60 / minuteStep }, (_, i) => {
          const minute = i * minuteStep;
          return (
            <option key={minute} value={minute}>
              {minute.toString().padStart(2, '0')}
            </option>
          );
        })}
      </select>

      {/* AM/PM */}
      {format === '12h' && (
        <select
          value={ampm}
          onChange={(e) => handleAmPmChange(e.target.value as 'AM' | 'PM')}
          disabled={disabled}
          style={{
            ...getSizeStyles(size),
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            backgroundColor: disabled ? '#f3f4f6' : '#ffffff',
            outline: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          onFocus={(e) => {
            e.target.style.outline = '2px solid #3b82f6';
            e.target.style.borderColor = 'transparent';
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none';
            e.target.style.borderColor = '#d1d5db';
          }}
        >
          <option value='AM'>AM</option>
          <option value='PM'>PM</option>
        </select>
      )}
    </div>
  );
};

// Main Calendar Component
/**
 * Calendar component provides [brief description of functionality].
 *
 * This component is designed to [main purpose and use case].
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Calendar>
 *   Content here
 * </Calendar>
 *
 * // With props
 * <Calendar
 *   variant="primary"
 *   size="medium"
 * >
 *   Enhanced content
 * </Calendar>
 * ```
 *
 * @param {ComponentProps} props - The component props
 * @returns {JSX.Element} The rendered Calendar component
 */
export const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates,
  multiple = false,
  range = false,
  firstDayOfWeek = 0,
  showWeekNumbers = false,
  size = 'md',
  className = '',
  renderDate,
  locale = 'en-US',
  showTime = false,
  timeFormat = '24h',
  showToday = true,
  showClear = true,
  variant = 'default',
  'data-testid': testId = 'calendar',
}) => {
  const { colors, spacing, radius } = useDesignSystem();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  });

  // Track if component is controlled or uncontrolled
  const isControlled = value !== undefined;

  // Update internal state when value prop changes (controlled mode)
  useEffect(() => {
    if (isControlled) {
      if (!value) {
        setSelectedDates([]);
      } else {
        setSelectedDates(Array.isArray(value) ? value : [value]);
      }
    }
  }, [value, isControlled]);

  const handleDateClick = useCallback(
    (clickedDate: Date) => {
      let newSelectedDates: Date[];

      if (multiple) {
        // Multiple selection mode
        const isAlreadySelected = selectedDates.some((date) =>
          isSameDay(date, clickedDate)
        );
        if (isAlreadySelected) {
          newSelectedDates = selectedDates.filter(
            (date) => !isSameDay(date, clickedDate)
          );
        } else {
          newSelectedDates = [...selectedDates, clickedDate];
        }
      } else if (range) {
        // Range selection mode
        if (selectedDates.length === 0 || selectedDates.length === 2) {
          newSelectedDates = [clickedDate];
        } else if (selectedDates.length === 1) {
          const [start] = selectedDates;
          if (clickedDate < start) {
            newSelectedDates = [clickedDate, start];
          } else {
            newSelectedDates = [start, clickedDate];
          }
        } else {
          newSelectedDates = [clickedDate];
        }
      } else {
        // Single selection mode
        newSelectedDates = [clickedDate];
      }

      setSelectedDates(newSelectedDates);

      if (onChange) {
        if (multiple || range) {
          onChange(newSelectedDates);
        } else {
          onChange(newSelectedDates[0] ?? null);
        }
      }
    },
    [selectedDates, multiple, range, onChange]
  );

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today);

    // Create a consistent date without time components for testing
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    if (showTime) {
      handleDateClick(today);
    } else {
      handleDateClick(todayDate);
    }
  };

  const handleClear = () => {
    setSelectedDates([]);
    onChange?.(multiple || range ? [] : null);
  };

  // Variant styles
  const getVariantStyles = (variant: 'default' | 'compact' | 'inline') => {
    switch (variant) {
      case 'default':
        return {
          padding: spacing.component.lg,
          backgroundColor: colors.background.primary,
          border: `1px solid ${colors.border.default}`,
          borderRadius: radius.lg,
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        };
      case 'compact':
        return {
          padding: spacing.component.sm,
          backgroundColor: colors.background.primary,
          border: `1px solid ${colors.border.default}`,
          borderRadius: radius.md,
        };
      case 'inline':
        return {
          padding: 0,
        };
    }
  };

  const monthYear = currentMonth.toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      style={getVariantStyles(variant)}
      className={className}
      data-testid={testId}
    >
      {/* Header */}
      <div className='calendar-header'>
        <button
          type='button'
          onClick={handlePreviousMonth}
          className='calendar-nav-button'
          aria-label='Previous month'
        >
          <svg
            className='calendar-nav-icon'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>

        <h2 className='calendar-title'>{monthYear}</h2>

        <button
          type='button'
          onClick={handleNextMonth}
          className='calendar-nav-button'
          aria-label='Next month'
        >
          <svg
            className='calendar-nav-icon'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <CalendarGrid
        currentMonth={currentMonth}
        selectedDates={selectedDates}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        firstDayOfWeek={firstDayOfWeek}
        multiple={multiple}
        range={range}
        onDateClick={handleDateClick}
        renderDate={renderDate}
        showWeekNumbers={showWeekNumbers}
        size={size}
      />

      {/* Time Picker */}
      {showTime && selectedDates.length > 0 && (
        <div
          style={{
            marginTop: spacing.component.sm,
            paddingTop: spacing.component.sm,
            borderTop: `1px solid ${colors.border.muted}`,
          }}
        >
          <TimePicker
            value={selectedDates[0]}
            onChange={(time) => {
              const newDate = new Date(selectedDates[0]);
              newDate.setHours(time.getHours());
              newDate.setMinutes(time.getMinutes());
              handleDateClick(newDate);
            }}
            format={timeFormat}
            size={size}
          />
        </div>
      )}

      {/* Footer */}
      {(showToday || showClear) && (
        <div className='calendar-footer'>
          {showToday && (
            <button
              type='button'
              onClick={handleToday}
              className='calendar-footer-button calendar-footer-button-primary'
            >
              Today
            </button>
          )}
          {showClear && (
            <button
              type='button'
              onClick={handleClear}
              className='calendar-footer-button calendar-footer-button-secondary'
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// DatePicker Component
export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  format = 'MM/DD/YYYY',
  disabled = false,
  readOnly = false,
  error = false,
  size = 'md',
  showIcon = true,
  trigger,
  placement = 'bottom-start',
  open,
  onOpenChange,
  className = '',
  'data-testid': testId = 'date-picker',
  ...calendarProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { colors, spacing, typography, radius } = useDesignSystem();

  const isControlled = open !== undefined;
  const actualIsOpen = isControlled ? open : isOpen;

  // Update input value when value prop changes
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        setInputValue(value.map((d) => formatDate(d, format)).join(', '));
      } else {
        setInputValue(formatDate(value, format));
      }
    } else {
      setInputValue('');
    }
  }, [value, format]);

  const handleToggle = () => {
    if (disabled || readOnly) return;

    const newOpen = !actualIsOpen;
    if (isControlled) {
      onOpenChange?.(newOpen);
    } else {
      setIsOpen(newOpen);
    }
  };

  const handleCalendarChange = (date: Date | Date[] | null) => {
    onChange?.(date);

    // Close dropdown for single date selection
    if (!calendarProps.multiple && !calendarProps.range) {
      if (isControlled) {
        onOpenChange?.(false);
      } else {
        setIsOpen(false);
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isControlled) {
          onOpenChange?.(false);
        } else {
          setIsOpen(false);
        }
      }
    };

    if (actualIsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }

    return undefined;
  }, [actualIsOpen, isControlled, onOpenChange]);

  // Size styles
  const getSizeStyles = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm':
        return {
          paddingLeft: spacing.component.sm,
          paddingRight: spacing.component.sm,
          paddingTop: spacing.micro.xs,
          paddingBottom: spacing.micro.xs,
          fontSize: typography.fontSize.sm,
        };
      case 'lg':
        return {
          paddingLeft: spacing.component.lg,
          paddingRight: spacing.component.lg,
          paddingTop: spacing.micro.md,
          paddingBottom: spacing.micro.md,
          fontSize: typography.fontSize.lg,
        };
      default:
        return {
          paddingLeft: spacing.component.sm,
          paddingRight: spacing.component.sm,
          paddingTop: spacing.micro.sm,
          paddingBottom: spacing.micro.sm,
          fontSize: typography.fontSize.base,
        };
    }
  };

  const getInputStyles = () => ({
    ...getSizeStyles(size),
    width: '100%',
    border: `1px solid ${error ? colors.state.error : colors.border.default}`,
    borderRadius: radius.input,
    backgroundColor: disabled
      ? colors.background.secondary
      : colors.background.primary,
    outline: 'none',
    cursor: disabled ? 'not-allowed' : readOnly ? 'default' : 'pointer',
    transition: 'all 0.15s ease-in-out',
  });

  if (trigger) {
    return (
      <div
        className={`calendar-popup-wrapper ${className}`}
        data-testid={testId}
      >
        <div onClick={handleToggle}>{trigger}</div>

        {actualIsOpen && (
          <div
            ref={dropdownRef}
            style={{
              position: 'absolute',
              zIndex: 50,
              marginTop: placement.includes('bottom') ? spacing.base.xs : '',
              marginBottom: placement.includes('top') ? spacing.base.xs : '',
              left: placement.includes('start') ? 0 : 'auto',
              right: placement.includes('end') ? 0 : 'auto',
              bottom: placement.includes('top') ? '100%' : 'auto',
            }}
          >
            <Calendar
              {...calendarProps}
              value={value}
              onChange={handleCalendarChange}
              variant='default'
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`date-picker-wrapper ${className}`} data-testid={testId}>
      <div className='date-picker-input-wrapper'>
        <input
          ref={inputRef}
          type='text'
          value={inputValue}
          placeholder={placeholder}
          onClick={handleToggle}
          readOnly
          disabled={disabled}
          style={getInputStyles()}
          onFocus={(e) => {
            if (!disabled && !readOnly) {
              e.target.style.outline = `2px solid ${colors.state.info}`;
              e.target.style.borderColor = 'transparent';
            }
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none';
            e.target.style.borderColor = error
              ? colors.state.error
              : colors.border.default;
          }}
        />

        {showIcon && (
          <div className='date-picker-icon-wrapper'>
            <svg
              className='date-picker-icon'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
          </div>
        )}
      </div>

      {actualIsOpen && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            zIndex: 50,
            marginTop: placement.includes('bottom') ? spacing.base.xs : '',
            marginBottom: placement.includes('top') ? spacing.base.xs : '',
            left: placement.includes('start') ? 0 : 'auto',
            right: placement.includes('end') ? 0 : 'auto',
            bottom: placement.includes('top') ? '100%' : 'auto',
          }}
        >
          <Calendar
            {...calendarProps}
            value={value}
            onChange={handleCalendarChange}
            variant='default'
          />
        </div>
      )}
    </div>
  );
};
