import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outlined';
  inputSize?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      variant = 'default',
      inputSize = 'md',
      leftIcon,
      rightIcon,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const baseClasses = 'w-full rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500';
    
    const variantClasses = {
      default: 'border border-gray-300 bg-white',
      filled: 'border-0 bg-gray-100',
      outlined: 'border-2 border-gray-300 bg-white'
    };

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg'
    };

    const stateClasses = error 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
      : 'focus:border-blue-500';

    const iconPadding = {
      left: leftIcon ? (inputSize === 'sm' ? 'pl-10' : inputSize === 'lg' ? 'pl-12' : 'pl-11') : '',
      right: rightIcon ? (inputSize === 'sm' ? 'pr-10' : inputSize === 'lg' ? 'pr-12' : 'pr-11') : ''
    };

    const inputClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[inputSize],
      stateClasses,
      iconPadding.left,
      iconPadding.right,
      className
    ].filter(Boolean).join(' ');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">{leftIcon}</span>
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-400">{rightIcon}</span>
            </div>
          )}
        </div>
        
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
