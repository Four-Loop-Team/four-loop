/**
 * @fileoverview Calendar component exports
 * @component Calendar
 *
 * @description
 * Export module for Calendar and DatePicker components for date selection and navigation.
 * Provides comprehensive date selection components with accessibility and localization support.
 *
 * @example
 * ```tsx
 * import { Calendar, DatePicker } from '@/components/ui/Calendar';
 *
 * <Calendar
 *   selectedDate={new Date()}
 *   onDateSelect={handleDateSelect}
 *   minDate={new Date()}
 * />
 *
 * <DatePicker
 *   value={selectedDate}
 *   onChange={setSelectedDate}
 *   placeholder="Select a date"
 * />
 * ```
 */

export { Calendar, DatePicker } from './Calendar';
export type {
  CalendarGridProps,
  CalendarProps,
  DatePickerProps,
  TimePickerProps,
} from './types';
