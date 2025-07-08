/**
 * @fileoverview Dropdown component exports
 * @component Dropdown
 *
 * @description
 * Export module for Dropdown component with options and option groups.
 * Provides flexible dropdown/select components with search, multi-select, and grouping capabilities.
 *
 * @example
 * ```tsx
 * import { Dropdown } from '@/components/ui/Dropdown';
 * import type { Option } from '@/components/ui/Dropdown';
 *
 * const options: Option[] = [
 *   { value: 'option1', label: 'Option 1' },
 *   { value: 'option2', label: 'Option 2' }
 * ];
 *
 * <Dropdown
 *   options={options}
 *   placeholder="Select an option..."
 *   onChange={handleChange}
 * />
 * ```
 */

export { Dropdown } from './Dropdown';
export type {
  DropdownContextValue,
  DropdownProps,
  DropdownRef,
  Option,
  OptionGroup,
} from './types';
