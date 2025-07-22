import { COLOR_TOKENS } from '@/constants/design-tokens-consolidated';
import { useDesignSystemMUI } from '@/lib/hooks';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';

/**
 * Input component props interface extending Material-UI TextField
 */
export interface InputProps
  extends Omit<TextFieldProps, 'size' | 'error' | 'variant'> {
  /** Input size */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Error message to display (will set error state to true) */
  error?: string | boolean;
  /** Input variant style */
  variant?: 'default' | 'filled' | 'outlined' | 'standard';
  /** Icon to display on the left side */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side */
  rightIcon?: React.ReactNode;
  /** HTML input pattern attribute for validation */
  pattern?: string;
  /** Input mode for mobile keyboards */
  inputMode?:
    | 'none'
    | 'text'
    | 'decimal'
    | 'numeric'
    | 'tel'
    | 'search'
    | 'email'
    | 'url';
}

/**
 * Styled TextField with our brand styling
 */
const StyledTextField = (props: TextFieldProps) => {
  const muiTheme = useDesignSystemMUI();

  const styledProps = {
    ...props,
    sx: {
      '& .MuiInputLabel-root': {
        color: muiTheme.palette.text.primary,
        '&.Mui-focused': {
          color: muiTheme.palette.text.primary,
        },
        '& .MuiInputLabel-asterisk': {
          display: 'none',
        },
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: COLOR_TOKENS.border.muted,
        },
        '&:hover fieldset': {
          borderColor: muiTheme.palette.text.primary,
        },
        '&.Mui-focused fieldset': {
          borderColor: muiTheme.palette.text.primary,
          borderWidth: '2px',
        },
      },
      '& .MuiFilledInput-root': {
        backgroundColor: 'rgba(53, 53, 53, 0.08)',
        '&:hover': {
          backgroundColor: 'rgba(53, 53, 53, 0.12)',
        },
        '&.Mui-focused': {
          backgroundColor: 'rgba(53, 53, 53, 0.08)',
        },
        '&:before': {
          borderBottomColor: muiTheme.palette.text.primary,
        },
        '&:hover:before': {
          borderBottomColor: muiTheme.palette.text.primary,
        },
        '&:after': {
          borderBottomColor: muiTheme.palette.text.primary,
        },
      },
      '& .MuiInputBase-input': {
        color: muiTheme.palette.text.primary,
      },
      '& .MuiFormHelperText-root': {
        color: muiTheme.palette.text.secondary,
        '&.Mui-error': {
          color: muiTheme.palette.error.main,
        },
      },
      ...props.sx,
    },
  };

  return <TextField {...styledProps} />;
};

/**
 * A comprehensive input component with validation and accessibility features.
 * Built on top of Material-UI's TextField with our brand styling.
 *
 * @component
 * @example
 * ```tsx
 * // Basic input
 * <Input label="Email" placeholder="Enter your email" />
 *
 * // With error state
 * <Input
 *   label="Password"
 *   type="password"
 *   error
 *   helperText="Password is required"
 * />
 *
 * // Multiline textarea
 * <Input
 *   label="Description"
 *   multiline
 *   rows={4}
 *   placeholder="Tell us about your project..."
 * />
 *
 * // Filled variant with floating label
 * <Input
 *   label="Name"
 *   variant="filled"
 *   placeholder="Enter your name"
 * />
 * ```
 */
const Input = forwardRef<HTMLDivElement, InputProps>(
  (
    {
      inputSize = 'md',
      variant = 'filled',
      error,
      leftIcon,
      rightIcon,
      pattern,
      inputMode,
      ...props
    },
    ref
  ) => {
    // Map our inputSize to Material-UI size
    const muiSize =
      inputSize === 'sm' ? 'small' : inputSize === 'lg' ? 'medium' : 'medium';

    // Convert variant 'default' to 'outlined' for Material-UI
    const muiVariant = variant === 'default' ? 'outlined' : variant;

    // Handle error prop - if it's a string, use it as helperText and set error to true
    const hasError = Boolean(error);
    const errorText = typeof error === 'string' ? error : undefined;
    const helperText = errorText ?? props.helperText;

    // Prepare InputProps for icons
    const inputPropsForIcons: {
      startAdornment?: React.ReactNode;
      endAdornment?: React.ReactNode;
    } = {};

    // Prepare inputProps for HTML attributes
    const htmlInputProps: {
      pattern?: string;
      inputMode?:
        | 'none'
        | 'text'
        | 'decimal'
        | 'numeric'
        | 'tel'
        | 'search'
        | 'email'
        | 'url';
    } = {};

    if (leftIcon) {
      inputPropsForIcons.startAdornment = (
        <InputAdornment position='start'>{leftIcon}</InputAdornment>
      );
    }
    if (rightIcon) {
      inputPropsForIcons.endAdornment = (
        <InputAdornment position='end'>{rightIcon}</InputAdornment>
      );
    }

    if (pattern) {
      htmlInputProps.pattern = pattern;
    }
    if (inputMode) {
      htmlInputProps.inputMode = inputMode;
    }

    return (
      <StyledTextField
        ref={ref}
        variant={muiVariant}
        size={muiSize}
        fullWidth
        error={hasError}
        helperText={helperText}
        InputProps={
          Object.keys(inputPropsForIcons).length > 0 ? inputPropsForIcons : {}
        }
        inputProps={
          Object.keys(htmlInputProps).length > 0 ? htmlInputProps : {}
        }
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
