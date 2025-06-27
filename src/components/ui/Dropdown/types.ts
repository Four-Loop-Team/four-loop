/**
 * Dropdown/Select component types and interfaces
 */

export interface Option {
  /** Unique value for the option */
  value: string | number;
  /** Display label for the option */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Additional data for the option */
  data?: Record<string, unknown>;
  /** Icon for the option */
  icon?: React.ReactNode;
  /** Description text for the option */
  description?: string;
}

export interface OptionGroup {
  /** Group label */
  label: string;
  /** Options in the group */
  options: Option[];
}

export interface DropdownProps {
  /** Available options */
  options: Option[] | OptionGroup[];
  /** Currently selected value(s) */
  value?: string | number | Array<string | number>;
  /** Placeholder text */
  placeholder?: string;
  /** Whether multiple selection is allowed */
  multiple?: boolean;
  /** Whether the dropdown is searchable */
  searchable?: boolean;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Whether the dropdown is in loading state */
  loading?: boolean;
  /** Whether the dropdown is required */
  required?: boolean;
  /** Whether the dropdown has an error */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Helper text to display */
  helperText?: string;
  /** Label for the dropdown */
  label?: string;
  /** Size of the dropdown */
  size?: 'sm' | 'md' | 'lg';
  /** Maximum height of the dropdown menu */
  maxHeight?: string;
  /** Whether to allow creating new options */
  creatable?: boolean;
  /** Whether to clear the search on selection */
  clearSearchOnSelect?: boolean;
  /** Custom filter function */
  filterFunction?: (option: Option, searchTerm: string) => boolean;
  /** Custom option renderer */
  optionRenderer?: (
    option: Option,
    isSelected: boolean,
    isHighlighted: boolean
  ) => React.ReactNode;
  /** Custom value renderer */
  valueRenderer?: (option: Option | Option[]) => React.ReactNode;
  /** Custom no options message */
  noOptionsMessage?: string;
  /** Custom loading message */
  loadingMessage?: string;
  /** Function called when value changes */
  onChange?: (
    value: string | number | Array<string | number>,
    option?: Option | Option[]
  ) => void;
  /** Function called when search changes */
  onSearch?: (searchTerm: string) => void;
  /** Function called when dropdown opens */
  onOpen?: () => void;
  /** Function called when dropdown closes */
  onClose?: () => void;
  /** Function called when creating a new option */
  onCreate?: (inputValue: string) => void;
  /** Additional class names */
  className?: string;
  /** Additional class names for the menu */
  menuClassName?: string;
  /** Data attributes */
  'data-testid'?: string;
}

export interface DropdownRef {
  /** Focus the dropdown */
  focus: () => void;
  /** Blur the dropdown */
  blur: () => void;
  /** Open the dropdown */
  open: () => void;
  /** Close the dropdown */
  close: () => void;
  /** Clear the selection */
  clear: () => void;
}

export interface DropdownContextValue {
  isOpen: boolean;
  searchTerm: string;
  highlightedIndex: number;
  selectedOptions: Option[];
  filteredOptions: (Option | OptionGroup)[];
  setSearchTerm: (term: string) => void;
  setHighlightedIndex: (index: number) => void;
  selectOption: (option: Option) => void;
  removeOption: (option: Option) => void;
  openDropdown: () => void;
  closeDropdown: () => void;
}
