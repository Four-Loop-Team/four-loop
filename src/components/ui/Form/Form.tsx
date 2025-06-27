/**
 * Form Component - Fixed Version
 * A comprehensive form wrapper with validation, field management, and multi-step support
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FormErrors,
  FormField,
  FormFieldProps,
  FormHelpers,
  FormProps,
  FormState,
  FormTouched,
  FormValues,
  MultiStepFormProps,
  MultiStepFormState,
} from './types';

// Form validation utilities
const validateField = (field: FormField, value: unknown): string => {
  const { validation } = field;
  if (!validation) return '';

  // Required validation
  if (validation.required) {
    const isEmpty = value === null || value === undefined || value === '';
    if (isEmpty) {
      return typeof validation.required === 'string'
        ? validation.required
        : `${field.label ?? field.name} is required`;
    }
  }

  const stringValue =
    value && typeof value === 'string'
      ? value
      : typeof value === 'number'
        ? String(value)
        : '';
  const numericValue = Number(value);

  // Length validations
  if (validation.minLength) {
    const { value: min, message } =
      typeof validation.minLength === 'object'
        ? validation.minLength
        : {
            value: validation.minLength,
            message: `Minimum length is ${validation.minLength}`,
          };

    if (stringValue.length < min) {
      return message;
    }
  }

  if (validation.maxLength) {
    const { value: max, message } =
      typeof validation.maxLength === 'object'
        ? validation.maxLength
        : {
            value: validation.maxLength,
            message: `Maximum length is ${validation.maxLength}`,
          };

    if (stringValue.length > max) {
      return message;
    }
  }

  // Numeric validations
  if (validation.min && !isNaN(numericValue)) {
    const { value: min, message } =
      typeof validation.min === 'object'
        ? validation.min
        : {
            value: validation.min,
            message: `Minimum value is ${validation.min}`,
          };

    if (numericValue < min) {
      return message;
    }
  }

  if (validation.max && !isNaN(numericValue)) {
    const { value: max, message } =
      typeof validation.max === 'object'
        ? validation.max
        : {
            value: validation.max,
            message: `Maximum value is ${validation.max}`,
          };

    if (numericValue > max) {
      return message;
    }
  }

  // Pattern validation
  if (validation.pattern && stringValue) {
    if (validation.pattern instanceof RegExp) {
      if (!validation.pattern.test(stringValue)) {
        return 'Invalid format';
      }
    } else {
      const { value: pattern, message } = validation.pattern;
      if (!pattern.test(stringValue)) {
        return message;
      }
    }
  }

  // Custom validation
  if (validation.custom) {
    const result = validation.custom(value);
    if (typeof result === 'string') {
      return result;
    }
    if (result === false) {
      return 'Invalid value';
    }
  }

  return '';
};

// Individual form field component
const FormFieldComponent: React.FC<FormFieldProps> = ({
  field,
  value,
  error,
  touched,
  onChange,
  onBlur,
  layout,
  size,
  disabled,
}) => {
  const {
    name,
    label,
    type = 'text',
    placeholder,
    required,
    disabled: fieldDisabled,
    readOnly,
    options,
    description,
    rows = 3,
    multiple,
    accept,
    className = '',
  } = field;

  const isDisabled = disabled || fieldDisabled;
  const showError = touched && error;

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  const inputClasses = `
    ${sizeClasses[size]}
    w-full border rounded-md
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-colors
    ${showError ? 'border-red-500' : 'border-gray-300'}
    ${isDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
    ${readOnly ? 'cursor-default' : ''}
    ${className}
  `;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { type: inputType, checked } = e.target as HTMLInputElement;
    let newValue: unknown;

    if (inputType === 'checkbox') {
      newValue = checked;
    } else if (inputType === 'file') {
      const files = (e.target as HTMLInputElement).files;
      newValue = multiple ? Array.from(files ?? []) : (files?.[0] ?? null);
    } else if (multiple && type === 'select') {
      const selectElement = e.target as HTMLSelectElement;
      newValue = Array.from(selectElement.selectedOptions).map(
        (option) => option.value
      );
    } else {
      newValue = e.target.value;
    }

    onChange(newValue);
  };

  const renderInput = () => {
    const valueAsString =
      value && typeof value === 'string'
        ? value
        : typeof value === 'number'
          ? String(value)
          : '';

    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={name}
            value={valueAsString}
            placeholder={placeholder}
            required={required}
            disabled={isDisabled}
            readOnly={readOnly}
            rows={rows}
            className={inputClasses}
            onChange={handleChange}
            onBlur={onBlur}
          />
        );

      case 'select':
        return (
          <select
            name={name}
            value={multiple ? undefined : valueAsString}
            required={required}
            disabled={isDisabled}
            multiple={multiple}
            className={inputClasses}
            onChange={handleChange}
            onBlur={onBlur}
          >
            {!multiple && !required && (
              <option value=''>Select an option</option>
            )}
            {options?.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className='flex items-center'>
            <input
              type='checkbox'
              name={name}
              checked={Boolean(value)}
              required={required}
              disabled={isDisabled}
              readOnly={readOnly}
              className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
              onChange={handleChange}
              onBlur={onBlur}
            />
            {label && (
              <label
                htmlFor={name}
                className='ml-2 block text-sm text-gray-900'
              >
                {label}
                {required && <span className='text-red-500 ml-1'>*</span>}
              </label>
            )}
          </div>
        );

      case 'radio':
        return (
          <div className='space-y-2'>
            {options?.map((option) => (
              <div key={option.value} className='flex items-center'>
                <input
                  type='radio'
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  required={required}
                  disabled={isDisabled ?? option.disabled}
                  className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                  onChange={handleChange}
                  onBlur={onBlur}
                />
                <label className='ml-2 block text-sm text-gray-900'>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      case 'file':
        return (
          <input
            type='file'
            name={name}
            required={required}
            disabled={isDisabled}
            multiple={multiple}
            accept={accept}
            className={inputClasses}
            onChange={handleChange}
            onBlur={onBlur}
          />
        );

      default:
        return (
          <input
            type={type}
            name={name}
            value={valueAsString}
            placeholder={placeholder}
            required={required}
            disabled={isDisabled}
            readOnly={readOnly}
            className={inputClasses}
            onChange={handleChange}
            onBlur={onBlur}
          />
        );
    }
  };

  const layoutClasses = {
    vertical: 'mb-4',
    horizontal: 'grid grid-cols-3 gap-4 items-start mb-4',
    inline: 'inline-block mr-4 mb-2',
  };

  return (
    <div className={layoutClasses[layout]}>
      {label && type !== 'checkbox' && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium text-gray-700 ${layout === 'horizontal' ? 'pt-2' : 'mb-1'}`}
        >
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}

      <div className={layout === 'horizontal' ? 'col-span-2' : ''}>
        {renderInput()}

        {description && (
          <p className='mt-1 text-sm text-gray-500'>{description}</p>
        )}

        {showError && <p className='mt-1 text-sm text-red-600'>{error}</p>}
      </div>
    </div>
  );
};

// Main Form component
export const Form: React.FC<FormProps> = ({
  fields = [],
  initialValues = {},
  validationSchema,
  onSubmit,
  onChange,
  onValidate,
  onReset,
  layout = 'vertical',
  size = 'md',
  disabled = false,
  className = '',
  children,
  submitText = 'Submit',
  resetText = 'Reset',
  showSubmit = true,
  showReset = false,
  variant = 'default',
  autoSave,
  'data-testid': testId = 'form',
}) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute derived state
  const isDirty = useMemo(() => {
    return Object.keys(values).some(
      (key) => values[key] !== initialValues[key]
    );
  }, [values, initialValues]);

  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  const formState = useMemo<FormState>(
    () => ({
      values,
      errors,
      touched,
      isSubmitting,
      isValid,
      isDirty,
    }),
    [values, errors, touched, isSubmitting, isValid, isDirty]
  );

  // Validate all fields
  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    // Field-level validation
    for (const field of fields) {
      const error = validateField(field, values[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    }

    // Schema validation
    if (validationSchema) {
      const schemaErrors = validationSchema(values);
      Object.assign(newErrors, schemaErrors);
    }

    // Custom validation
    if (onValidate) {
      const customErrors = onValidate(values);
      Object.assign(newErrors, customErrors);
    }

    return newErrors;
  }, [fields, values, validationSchema, onValidate]);

  // Validate single field
  const validateFieldCallback = useCallback(
    (name: string): string => {
      const field = fields.find((f) => f.name === name);
      if (!field) return '';

      return validateField(field, values[name]);
    },
    [fields, values]
  );

  // Form helpers
  const helpers = useMemo<FormHelpers>(
    () => ({
      setFieldValue: (name: string, value: unknown) => {
        setValues((prev) => ({ ...prev, [name]: value }));
      },

      setFieldError: (name: string, error: string) => {
        setErrors((prev) => ({ ...prev, [name]: error }));
      },

      setFieldTouched: (name: string, touched: boolean) => {
        setTouched((prev) => ({ ...prev, [name]: touched }));
      },

      setValues: (newValues: Partial<FormValues>) => {
        setValues((prev) => ({ ...prev, ...newValues }));
      },

      setErrors: (newErrors: Partial<FormErrors>) => {
        setErrors((prev) => {
          const result: FormErrors = { ...prev };
          Object.entries(newErrors).forEach(([key, value]) => {
            if (value !== undefined) {
              result[key] = value;
            }
          });
          return result;
        });
      },

      setSubmitting: (submitting: boolean) => {
        setIsSubmitting(submitting);
      },

      resetForm: () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
        onReset?.();
      },

      validateForm: () => Promise.resolve(validateForm()),
      validateField: (name: string) =>
        Promise.resolve(validateFieldCallback(name)),

      submitForm: async () => {
        setIsSubmitting(true);

        try {
          const validationErrors = validateForm();
          setErrors(validationErrors);

          if (Object.keys(validationErrors).length === 0) {
            await onSubmit?.(values, formState);
          }
        } finally {
          setIsSubmitting(false);
        }
      },

      getFieldProps: (name: string) => ({
        name,
        value: values[name],
        onChange: (
          e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          >
        ) => {
          const { type, checked } = e.target as HTMLInputElement;
          const newValue = type === 'checkbox' ? checked : e.target.value;
          setValues((prev) => ({ ...prev, [name]: newValue }));
        },
        onBlur: () => {
          setTouched((prev) => ({ ...prev, [name]: true }));
        },
        error: errors[name],
        touched: touched[name],
      }),
    }),
    [
      values,
      errors,
      touched,
      initialValues,
      onReset,
      validateForm,
      validateFieldCallback,
      formState,
      onSubmit,
    ]
  );

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave?.enabled) return;

    const timeoutId = setTimeout(() => {
      if (autoSave.key) {
        localStorage.setItem(autoSave.key, JSON.stringify(values));
      }
    }, autoSave.delay ?? 1000);

    return () => clearTimeout(timeoutId);
  }, [values, autoSave]);

  // Call onChange when values change
  useEffect(() => {
    onChange?.(values, formState);
  }, [values, formState, onChange]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched: FormTouched = {};
    fields.forEach((field) => {
      allTouched[field.name] = true;
    });
    setTouched(allTouched);

    void helpers.submitForm();
  };

  // Variant classes
  const variantClasses = {
    default: '',
    card: 'p-6 bg-white border border-gray-200 rounded-lg shadow-sm',
    inline: 'inline-block',
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${variantClasses[variant]} ${className}`}
      data-testid={testId}
    >
      {typeof children === 'function'
        ? children(formState, helpers)
        : (children ?? (
            <>
              {fields.map((field) => (
                <FormFieldComponent
                  key={field.name}
                  field={field}
                  value={values[field.name]}
                  error={errors[field.name]}
                  touched={touched[field.name]}
                  onChange={(value) => helpers.setFieldValue(field.name, value)}
                  onBlur={() => helpers.setFieldTouched(field.name, true)}
                  layout={layout}
                  size={size}
                  disabled={disabled}
                />
              ))}
            </>
          ))}

      {(showSubmit || showReset) && (
        <div
          className={`flex ${layout === 'horizontal' ? 'col-start-2 col-span-2' : ''} gap-2 mt-6`}
        >
          {showSubmit && (
            <button
              type='submit'
              disabled={disabled || isSubmitting}
              className={`
                px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed
                ${size === 'sm' ? 'px-3 py-1 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : ''}
              `}
            >
              {isSubmitting ? 'Submitting...' : submitText}
            </button>
          )}

          {showReset && (
            <button
              type='button'
              onClick={helpers.resetForm}
              disabled={disabled || isSubmitting}
              className={`
                px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md
                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed
                ${size === 'sm' ? 'px-3 py-1 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : ''}
              `}
            >
              {resetText}
            </button>
          )}
        </div>
      )}
    </form>
  );
};

// Multi-step form component with simplified logic
export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  initialValues = {},
  onSubmit,
  onStepChange,
  onComplete,
  allowBackward = true,
  showStepNumbers = true,
  showProgress = true,
  size = 'md',
  className = '',
  submitText = 'Submit',
  previousText = 'Previous',
  nextText = 'Next',
  'data-testid': testId = 'multi-step-form',
}) => {
  const [state, setState] = useState<MultiStepFormState>({
    currentStep: 0,
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    completedSteps: new Set(),
  });

  const currentStepConfig = steps[state.currentStep];
  const isLastStep = state.currentStep === steps.length - 1;
  const isFirstStep = state.currentStep === 0;

  // Validate current step
  const validateCurrentStep = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    for (const field of currentStepConfig.fields) {
      const error = validateField(field, state.values[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    }

    if (currentStepConfig.validation) {
      const stepErrors = currentStepConfig.validation(state.values);
      Object.assign(newErrors, stepErrors);
    }

    return newErrors;
  }, [currentStepConfig, state.values]);

  // Handle next step
  const handleNext = () => {
    const stepErrors = validateCurrentStep();

    setState((prev) => ({
      ...prev,
      errors: { ...prev.errors, ...stepErrors },
      touched: {
        ...prev.touched,
        ...currentStepConfig.fields.reduce((acc, field) => {
          acc[field.name] = true;
          return acc;
        }, {} as FormTouched),
      },
    }));

    if (Object.keys(stepErrors).length === 0) {
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
        completedSteps: new Set(prev.completedSteps).add(prev.currentStep),
      }));

      onStepChange?.(state.currentStep + 1, state.values);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (allowBackward && !isFirstStep) {
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep - 1,
      }));

      onStepChange?.(state.currentStep - 1, state.values);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    setState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const stepErrors = validateCurrentStep();

      if (Object.keys(stepErrors).length === 0) {
        void onSubmit?.(state.values);
        onComplete?.(state.values);
      } else {
        setState((prev) => ({
          ...prev,
          errors: { ...prev.errors, ...stepErrors },
          touched: {
            ...prev.touched,
            ...currentStepConfig.fields.reduce((acc, field) => {
              acc[field.name] = true;
              return acc;
            }, {} as FormTouched),
          },
        }));
      }
    } finally {
      setState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <div className={`max-w-2xl mx-auto ${className}`} data-testid={testId}>
      {/* Progress indicator */}
      {showProgress && (
        <div className='mb-8'>
          <div className='flex items-center'>
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className='flex items-center'>
                  <div
                    className={`
                      flex items-center justify-center w-8 h-8 rounded-full border-2
                      ${
                        index === state.currentStep
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : state.completedSteps.has(index)
                            ? 'border-green-600 bg-green-600 text-white'
                            : 'border-gray-300 bg-white text-gray-500'
                      }
                    `}
                  >
                    {state.completedSteps.has(index) ? (
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    ) : showStepNumbers ? (
                      index + 1
                    ) : null}
                  </div>
                  {showStepNumbers && (
                    <div className='ml-2'>
                      <p
                        className={`text-sm font-medium ${index === state.currentStep ? 'text-blue-600' : 'text-gray-500'}`}
                      >
                        {step.title}
                      </p>
                      {step.description && (
                        <p className='text-xs text-gray-400'>
                          {step.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 ml-4 mr-4 ${
                      state.completedSteps.has(index)
                        ? 'bg-green-600'
                        : 'bg-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Current step content */}
      <div className='bg-white p-6 border border-gray-200 rounded-lg shadow-sm'>
        <div className='mb-6'>
          <h2 className='text-lg font-semibold text-gray-900'>
            {currentStepConfig.title}
          </h2>
          {currentStepConfig.description && (
            <p className='mt-1 text-sm text-gray-600'>
              {currentStepConfig.description}
            </p>
          )}
        </div>

        {/* Form fields for current step */}
        <div className='space-y-4'>
          {currentStepConfig.fields.map((field) => (
            <FormFieldComponent
              key={field.name}
              field={field}
              value={state.values[field.name]}
              error={state.errors[field.name]}
              touched={state.touched[field.name]}
              onChange={(value) =>
                setState((prev) => ({
                  ...prev,
                  values: { ...prev.values, [field.name]: value },
                }))
              }
              onBlur={() =>
                setState((prev) => ({
                  ...prev,
                  touched: { ...prev.touched, [field.name]: true },
                }))
              }
              layout='vertical'
              size={size}
              disabled={state.isSubmitting}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className='flex justify-between mt-8'>
          <button
            type='button'
            onClick={handlePrevious}
            disabled={isFirstStep || !allowBackward || state.isSubmitting}
            className={`
              px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md
              hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              ${size === 'sm' ? 'px-3 py-1 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : ''}
            `}
          >
            {previousText}
          </button>

          {isLastStep ? (
            <button
              type='button'
              onClick={handleSubmit}
              disabled={state.isSubmitting}
              className={`
                px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed
                ${size === 'sm' ? 'px-3 py-1 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : ''}
              `}
            >
              {state.isSubmitting ? 'Submitting...' : submitText}
            </button>
          ) : (
            <button
              type='button'
              onClick={handleNext}
              disabled={state.isSubmitting}
              className={`
                px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed
                ${size === 'sm' ? 'px-3 py-1 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : ''}
              `}
            >
              {nextText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
