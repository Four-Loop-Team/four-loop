/**
 * Calendar/DatePicker component types and interfaces
 */

export interface CalendarProps {
  /** Selected date(s) */
  value?: Date | Date[] | null | undefined;
  /** Date change handler */
  onChange?: (date: Date | Date[] | null) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Disabled dates */
  disabledDates?: Date[];
  /** Whether to allow multiple date selection */
  multiple?: boolean;
  /** Whether to allow range selection */
  range?: boolean;
  /** First day of week (0 = Sunday, 1 = Monday, etc.) */
  firstDayOfWeek?: number;
  /** Show week numbers */
  showWeekNumbers?: boolean;
  /** Calendar size */
  size?: 'sm' | 'md' | 'lg';
  /** Component class name */
  className?: string;
  /** Custom date cell renderer */
  renderDate?: (
    date: Date,
    isSelected: boolean,
    isDisabled: boolean
  ) => React.ReactNode;
  /** Locale for date formatting */
  locale?: string;
  /** Time selection mode */
  showTime?: boolean;
  /** Time format (12h or 24h) */
  timeFormat?: '12h' | '24h';
  /** Show today button */
  showToday?: boolean;
  /** Show clear button */
  showClear?: boolean;
  /** Calendar variant */
  variant?: 'default' | 'compact' | 'inline';
  /** Test ID */
  'data-testid'?: string;
}

export interface DatePickerProps extends Omit<CalendarProps, 'variant'> {
  /** Input placeholder text */
  placeholder?: string;
  /** Date format for display */
  format?: string;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether input is read only */
  readOnly?: boolean;
  /** Input error state */
  error?: boolean;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Show calendar icon */
  showIcon?: boolean;
  /** Custom trigger element */
  trigger?: React.ReactNode;
  /** Dropdown placement */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  /** Whether dropdown is open (controlled) */
  open?: boolean;
  /** Open state change handler */
  onOpenChange?: (open: boolean) => void;
}

export interface CalendarGridProps {
  /** Current month being displayed */
  currentMonth: Date;
  /** Selected date(s) */
  selectedDates: Date[];
  /** Minimum selectable date */
  minDate?: Date | undefined;
  /** Maximum selectable date */
  maxDate?: Date | undefined;
  /** Disabled dates */
  disabledDates?: Date[] | undefined;
  /** First day of week */
  firstDayOfWeek: number;
  /** Whether multiple selection is enabled */
  multiple: boolean;
  /** Whether range selection is enabled */
  range: boolean;
  /** Date click handler */
  onDateClick: (date: Date) => void;
  /** Custom date cell renderer */
  renderDate?:
    | ((
        date: Date,
        isSelected: boolean,
        isDisabled: boolean
      ) => React.ReactNode)
    | undefined;
  /** Show week numbers */
  showWeekNumbers: boolean;
  /** Calendar size */
  size: 'sm' | 'md' | 'lg';
}

export interface TimePickerProps {
  /** Selected time */
  value?: Date;
  /** Time change handler */
  onChange?: (time: Date) => void;
  /** Time format */
  format?: '12h' | '24h';
  /** Minimum time */
  minTime?: Date;
  /** Maximum time */
  maxTime?: Date;
  /** Minute step */
  minuteStep?: number;
  /** Hour step */
  hourStep?: number;
  /** Component size */
  size?: 'sm' | 'md' | 'lg';
  /** Component class name */
  className?: string;
  /** Whether time picker is disabled */
  disabled?: boolean;
}
