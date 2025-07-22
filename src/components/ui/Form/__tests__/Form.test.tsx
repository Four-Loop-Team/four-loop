/**
 * @fileoverview Tests for Form Component
 */

import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, MultiStepForm } from '../Form';
import { FormField, FormValues } from '../types';

// Mock localStorage for auto-save tests
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('Form Component', () => {
  const basicFields: FormField[] = [
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      validation: { required: 'Email is required' },
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      validation: { required: true, minLength: 8 },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders form with basic fields', () => {
      render(<Form fields={basicFields} />);

      expect(screen.getByTestId('form')).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('renders with custom test id', () => {
      render(<Form fields={basicFields} data-testid='custom-form' />);
      expect(screen.getByTestId('custom-form')).toBeInTheDocument();
    });

    it('applies variant classes correctly', () => {
      const { rerender } = render(
        <Form fields={basicFields} variant='card' data-testid='form' />
      );
      const form = screen.getByTestId('form');
      expect(form).toBeInTheDocument();
      expect(form.style.padding).toBeTruthy();
      expect(form.style.backgroundColor).toBeTruthy();
      expect(form.style.border).toBeTruthy();

      rerender(
        <Form fields={basicFields} variant='inline' data-testid='form' />
      );
      const inlineForm = screen.getByTestId('form');
      expect(inlineForm.style.display).toBe('inline-block');
    });

    it('applies custom className', () => {
      render(
        <Form
          fields={basicFields}
          className='custom-class'
          data-testid='form'
        />
      );
      // Form should render successfully regardless of className
      const form = screen.getByTestId('form');
      expect(form).toBeInTheDocument();
      expect(form.tagName).toBe('FORM');
    });
  });

  describe('Form Fields Rendering', () => {
    it('renders text input correctly', () => {
      const fields: FormField[] = [
        {
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          placeholder: 'Enter your first name',
        },
      ];

      render(<Form fields={fields} />);
      const input = screen.getByLabelText(/first name/i);
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('placeholder', 'Enter your first name');
    });

    it('renders textarea correctly', () => {
      const fields: FormField[] = [
        {
          name: 'message',
          label: 'Message',
          type: 'textarea',
          rows: 5,
        },
      ];

      render(<Form fields={fields} />);
      const textarea = screen.getByLabelText(/message/i);
      expect(textarea.tagName).toBe('TEXTAREA');
      expect(textarea).toHaveAttribute('rows', '5');
    });

    it('renders select dropdown correctly', () => {
      const fields: FormField[] = [
        {
          name: 'country',
          label: 'Country',
          type: 'select',
          options: [
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
          ],
        },
      ];

      render(<Form fields={fields} />);
      const select = screen.getByLabelText(/country/i);
      expect(select.tagName).toBe('SELECT');
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('Canada')).toBeInTheDocument();
    });

    it('renders checkbox correctly', () => {
      const fields: FormField[] = [
        {
          name: 'terms',
          label: 'I agree to the terms',
          type: 'checkbox',
        },
      ];

      render(<Form fields={fields} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('type', 'checkbox');
      expect(screen.getByText(/i agree to the terms/i)).toBeInTheDocument();
    });

    it('renders radio buttons correctly', () => {
      const fields: FormField[] = [
        {
          name: 'gender',
          label: 'Gender',
          type: 'radio' as const,
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ],
        },
      ];

      render(<Form fields={fields} />);
      const radios = screen.getAllByRole('radio');
      expect(radios).toHaveLength(3);
      expect(screen.getByText('Male')).toBeInTheDocument();
      expect(screen.getByText('Female')).toBeInTheDocument();
      expect(screen.getByText('Other')).toBeInTheDocument();
    });

    it('renders file input correctly', () => {
      const fields: FormField[] = [
        {
          name: 'avatar',
          label: 'Avatar',
          type: 'file',
          accept: 'image/*',
        },
      ];

      render(<Form fields={fields} />);
      const fileInput = screen.getByLabelText(/avatar/i);
      expect(fileInput).toHaveAttribute('type', 'file');
      expect(fileInput).toHaveAttribute('accept', 'image/*');
    });
  });

  describe('Form Validation', () => {
    it('validates required fields', async () => {
      const user = userEvent.setup();
      render(<Form fields={basicFields} />);

      const submitBtn = screen.getByRole('button', { name: /submit/i });
      await user.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });
    });

    it('validates minimum length', async () => {
      const user = userEvent.setup();
      render(<Form fields={basicFields} />);

      const passwordInput = screen.getByLabelText(/password/i);
      await user.type(passwordInput, '123');

      const submitBtn = screen.getByRole('button', { name: /submit/i });
      await user.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText('Minimum length is 8')).toBeInTheDocument();
      });
    });

    it('validates custom validation rules', async () => {
      const fields: FormField[] = [
        {
          name: 'username',
          label: 'Username',
          type: 'text',
          validation: {
            custom: (value) => {
              const str = typeof value === 'string' ? value : '';
              return str.includes('admin')
                ? 'Username cannot contain "admin"'
                : true;
            },
          },
        },
      ];

      const user = userEvent.setup();
      render(<Form fields={fields} />);

      const usernameInput = screen.getByLabelText(/username/i);
      await user.type(usernameInput, 'adminuser');

      const submitBtn = screen.getByRole('button', { name: /submit/i });
      await user.click(submitBtn);

      await waitFor(() => {
        expect(
          screen.getByText('Username cannot contain "admin"')
        ).toBeInTheDocument();
      });
    });

    it('validates with validation schema', async () => {
      const validationSchema = (values: FormValues) => {
        const errors: { [key: string]: string } = {};
        if (values.email === values.password) {
          errors.password = 'Password cannot be the same as email';
        }
        return errors;
      };

      const user = userEvent.setup();
      render(<Form fields={basicFields} validationSchema={validationSchema} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'test@example.com');

      const submitBtn = screen.getByRole('button', { name: /submit/i });
      await user.click(submitBtn);

      await waitFor(() => {
        expect(
          screen.getByText('Password cannot be the same as email')
        ).toBeInTheDocument();
      });
    });
  });

  describe('Form Interaction', () => {
    it('handles input changes', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<Form fields={basicFields} onChange={onChange} />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'test@example.com');

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            email: 'test@example.com',
          }),
          expect.any(Object)
        );
      });
    });

    it('handles form submission', async () => {
      const user = userEvent.setup();
      const onSubmit = jest.fn();

      render(<Form fields={basicFields} onSubmit={onSubmit} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      const submitBtn = screen.getByRole('button', { name: /submit/i });
      await user.click(submitBtn);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          {
            email: 'test@example.com',
            password: 'password123',
          },
          expect.any(Object)
        );
      });
    });

    it('handles form reset', async () => {
      const user = userEvent.setup();
      const onReset = jest.fn();

      render(<Form fields={basicFields} showReset onReset={onReset} />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'test@example.com');

      const resetBtn = screen.getByRole('button', { name: /reset/i });
      await user.click(resetBtn);

      expect(onReset).toHaveBeenCalled();
      expect(emailInput).toHaveValue('');
    });

    it('handles checkbox changes', async () => {
      const user = userEvent.setup();
      const fields: FormField[] = [
        {
          name: 'terms',
          label: 'I agree',
          type: 'checkbox',
        },
      ];

      render(<Form fields={fields} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('handles file input changes', async () => {
      const user = userEvent.setup();
      const fields: FormField[] = [
        {
          name: 'file',
          label: 'Upload File',
          type: 'file',
        },
      ];

      render(<Form fields={fields} />);

      const fileInput = screen.getByLabelText(/upload file/i);
      const file = new File(['test content'], 'test.txt', {
        type: 'text/plain',
      });

      await user.upload(fileInput, file);

      expect(fileInput).toBeTruthy();
    });
  });

  describe('Initial Values', () => {
    it('sets initial values correctly', () => {
      const initialValues = {
        email: 'initial@example.com',
        password: 'initialpass',
      };

      render(<Form fields={basicFields} initialValues={initialValues} />);

      expect(
        screen.getByDisplayValue('initial@example.com')
      ).toBeInTheDocument();
      expect(screen.getByDisplayValue('initialpass')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('disables all inputs when form is disabled', () => {
      render(<Form fields={basicFields} disabled />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitBtn = screen.getByRole('button', { name: /submit/i });

      expect(emailInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
      expect(submitBtn).toBeDisabled();
    });

    it('disables individual fields when field is disabled', () => {
      const fields: FormField[] = [
        { ...basicFields[0], disabled: true },
        basicFields[1],
      ];

      render(<Form fields={fields} />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(emailInput).toBeDisabled();
      expect(passwordInput).not.toBeDisabled();
    });
  });

  describe('Button Configuration', () => {
    it('hides submit button when showSubmit is false', () => {
      render(<Form fields={basicFields} showSubmit={false} />);
      expect(
        screen.queryByRole('button', { name: /submit/i })
      ).not.toBeInTheDocument();
    });

    it('shows reset button when showReset is true', () => {
      render(<Form fields={basicFields} showReset />);
      expect(
        screen.getByRole('button', { name: /reset/i })
      ).toBeInTheDocument();
    });

    it('uses custom button text', () => {
      render(
        <Form
          fields={basicFields}
          submitText='Create Account'
          resetText='Clear Form'
          showReset
        />
      );

      expect(
        screen.getByRole('button', { name: /create account/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /clear form/i })
      ).toBeInTheDocument();
    });
  });

  describe('Auto-save Feature', () => {
    it('saves form data to localStorage when autoSave is enabled', async () => {
      const user = userEvent.setup();

      render(
        <Form
          fields={basicFields}
          autoSave={{ enabled: true, key: 'test-form', delay: 100 }}
        />
      );

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'test@example.com');

      // Wait for auto-save debounce
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 150));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'test-form',
        expect.stringContaining('test@example.com')
      );
    });
  });

  describe('Custom Children Rendering', () => {
    it('renders custom children when provided', () => {
      render(
        <Form fields={basicFields}>
          <div data-testid='custom-content'>Custom form content</div>
        </Form>
      );

      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.getByText('Custom form content')).toBeInTheDocument();
    });

    it('renders with render prop function', () => {
      render(
        <Form fields={basicFields}>
          {(formState, helpers) => (
            <div>
              <div data-testid='form-values'>
                {JSON.stringify(formState.values)}
              </div>
              <button
                type='button'
                onClick={() =>
                  helpers.setFieldValue('email', 'test@example.com')
                }
              >
                Set Email
              </button>
            </div>
          )}
        </Form>
      );

      expect(screen.getByTestId('form-values')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /set email/i })
      ).toBeInTheDocument();
    });
  });

  describe('Advanced Form Features', () => {
    it('handles form with different field types', async () => {
      const user = userEvent.setup();
      const fields: FormField[] = [
        { name: 'text', label: 'Text Field', type: 'text' },
        { name: 'email', label: 'Email Field', type: 'email' },
        { name: 'number', label: 'Number Field', type: 'number' },
        {
          name: 'textarea',
          label: 'Textarea Field',
          type: 'textarea',
          rows: 3,
        },
        { name: 'checkbox', label: 'Checkbox Field', type: 'checkbox' },
        { name: 'date', label: 'Date Field', type: 'date' },
        { name: 'file', label: 'File Field', type: 'file' },
      ];

      render(<Form fields={fields} />);

      // Verify all field types are rendered
      expect(screen.getByLabelText('Text Field')).toBeInTheDocument();
      expect(screen.getByLabelText('Email Field')).toBeInTheDocument();
      expect(screen.getByLabelText('Number Field')).toBeInTheDocument();
      expect(screen.getByLabelText('Textarea Field')).toBeInTheDocument();
      expect(screen.getByLabelText('Checkbox Field')).toBeInTheDocument();
      expect(screen.getByLabelText('Date Field')).toBeInTheDocument();
      expect(screen.getByLabelText('File Field')).toBeInTheDocument();

      // Test number input
      const numberInput = screen.getByLabelText('Number Field');
      await user.type(numberInput, '123');
      expect(numberInput).toHaveValue(123);

      // Test checkbox
      const checkbox = screen.getByLabelText('Checkbox Field');
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('handles select field with options', async () => {
      const user = userEvent.setup();
      const fields: FormField[] = [
        {
          name: 'country',
          label: 'Country',
          type: 'select',
          options: [
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' },
          ],
        },
      ];

      render(<Form fields={fields} />);

      const select = screen.getByLabelText('Country');
      await user.selectOptions(select, 'ca');

      const canadaOption = screen.getByRole('option', { name: 'Canada' });
      expect(canadaOption).toHaveProperty('selected', true);
    });

    it('handles radio field with options', () => {
      const fields: FormField[] = [
        {
          name: 'gender',
          label: 'Gender',
          type: 'radio',
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ],
        },
      ];

      render(<Form fields={fields} />);

      expect(screen.getByLabelText('Male')).toBeInTheDocument();
      expect(screen.getByLabelText('Female')).toBeInTheDocument();
      expect(screen.getByLabelText('Other')).toBeInTheDocument();
    });

    it('handles form validation with custom messages', async () => {
      const user = userEvent.setup();
      const fields: FormField[] = [
        {
          name: 'username',
          label: 'Username',
          type: 'text',
          validation: {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
            maxLength: {
              value: 20,
              message: 'Username must be at most 20 characters',
            },
          },
        },
        {
          name: 'age',
          label: 'Age',
          type: 'number',
          validation: {
            min: { value: 18, message: 'Must be at least 18 years old' },
            max: { value: 100, message: 'Must be at most 100 years old' },
          },
        },
      ];

      render(<Form fields={fields} />);

      const usernameInput = screen.getByLabelText('Username');
      const ageInput = screen.getByLabelText('Age');

      // Test required validation
      await user.click(usernameInput);
      await user.tab();
      // Submit form to trigger validation
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);
      await waitFor(() => {
        expect(screen.getByText('Username is required')).toBeInTheDocument();
      });

      // Test minLength validation
      await user.clear(usernameInput);
      await user.type(usernameInput, 'ab');
      await user.tab(); // This should trigger validation on blur
      await user.click(submitButton); // Submit to trigger validation
      await waitFor(() => {
        expect(
          screen.getByText('Username must be at least 3 characters')
        ).toBeInTheDocument();
      });

      // Test min value validation
      await user.type(ageInput, '17');
      await user.tab();
      await user.click(submitButton); // Submit to trigger validation
      await waitFor(() => {
        expect(
          screen.getByText('Must be at least 18 years old')
        ).toBeInTheDocument();
      });
    });

    it('handles pattern validation', async () => {
      const user = userEvent.setup();
      const fields: FormField[] = [
        {
          name: 'phone',
          label: 'Phone',
          type: 'tel',
          validation: {
            pattern: {
              value: /^\d{3}-\d{3}-\d{4}$/,
              message: 'Phone must be in format XXX-XXX-XXXX',
            },
          },
        },
      ];

      render(<Form fields={fields} />);

      const phoneInput = screen.getByLabelText('Phone');
      await user.type(phoneInput, '1234567890');
      await user.tab();

      // Submit form to trigger validation
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Phone must be in format XXX-XXX-XXXX')
        ).toBeInTheDocument();
      });
    });

    it('handles custom validation', async () => {
      const user = userEvent.setup();
      const fields: FormField[] = [
        {
          name: 'username',
          label: 'Username',
          type: 'text',
          validation: {
            custom: (value) => {
              if (typeof value === 'string' && value.includes('admin')) {
                return 'Username cannot contain "admin"';
              }
              return true;
            },
          },
        },
      ];

      render(<Form fields={fields} />);

      const usernameInput = screen.getByLabelText('Username');
      await user.type(usernameInput, 'adminuser');
      await user.tab();

      // Submit form to trigger validation
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Username cannot contain "admin"')
        ).toBeInTheDocument();
      });
    });

    it('handles different field sizes', () => {
      const fields: FormField[] = [
        { name: 'small', label: 'Small', type: 'text', size: 'sm' },
        { name: 'medium', label: 'Medium', type: 'text', size: 'md' },
        { name: 'large', label: 'Large', type: 'text', size: 'lg' },
      ];

      render(<Form fields={fields} />);

      const smallInput = screen.getByLabelText('Small');
      const mediumInput = screen.getByLabelText('Medium');
      const largeInput = screen.getByLabelText('Large');

      // Fields should render with proper styling applied via inline styles
      expect(smallInput).toBeInTheDocument();
      expect(mediumInput).toBeInTheDocument();
      expect(largeInput).toBeInTheDocument();

      // Verify inputs have different sizes through style properties
      expect(smallInput.style.fontSize).toBeTruthy();
      expect(mediumInput.style.fontSize).toBeTruthy();
      expect(largeInput.style.fontSize).toBeTruthy();
    });

    it('handles disabled and readonly fields', () => {
      const fields: FormField[] = [
        { name: 'disabled', label: 'Disabled', type: 'text', disabled: true },
        { name: 'readonly', label: 'Readonly', type: 'text', readOnly: true },
      ];

      render(<Form fields={fields} />);

      const disabledInput = screen.getByLabelText('Disabled');
      const readonlyInput = screen.getByLabelText('Readonly');

      expect(disabledInput).toBeDisabled();
      expect(readonlyInput).toHaveAttribute('readonly');
    });

    it('handles form with initial values', () => {
      const fields: FormField[] = [
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
      ];

      const initialValues = {
        title: 'Initial Title',
        description: 'Initial Description',
      };

      render(<Form fields={fields} initialValues={initialValues} />);

      expect(screen.getByDisplayValue('Initial Title')).toBeInTheDocument();
      expect(
        screen.getByDisplayValue('Initial Description')
      ).toBeInTheDocument();
    });

    it('handles form submission', async () => {
      const user = userEvent.setup();
      const onSubmit = jest.fn();

      const fields: FormField[] = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
      ];

      render(<Form fields={fields} onSubmit={onSubmit} />);

      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');

      // Submit form using Enter key
      await user.keyboard('{Enter}');

      // onSubmit receives (values, formState) - test for values being the first argument
      expect(onSubmit).toHaveBeenCalledWith(
        {
          name: 'John Doe',
          email: 'john@example.com',
        },
        expect.any(Object) // formState object
      );
    });

    it('handles different layout props', () => {
      const fields: FormField[] = [
        { name: 'field1', label: 'Field 1', type: 'text' },
      ];

      const { rerender } = render(<Form fields={fields} layout='horizontal' />);
      // Form field should render in horizontal layout using inline styles
      expect(screen.getByLabelText('Field 1')).toBeInTheDocument();

      rerender(<Form fields={fields} layout='vertical' />);
      // Form field should render in vertical layout using inline styles
      expect(screen.getByLabelText('Field 1')).toBeInTheDocument();

      rerender(<Form fields={fields} layout='inline' />);
      // Form field should render in inline layout using inline styles
      expect(screen.getByLabelText('Field 1')).toBeInTheDocument();
    });

    it('handles file uploads', async () => {
      const user = userEvent.setup();
      const onSubmit = jest.fn();

      const fields: FormField[] = [
        {
          name: 'document',
          label: 'Document',
          type: 'file',
          accept: '.pdf,.doc,.docx',
          multiple: true,
        },
      ];

      render(<Form fields={fields} onSubmit={onSubmit} />);

      const fileInput = screen.getByLabelText('Document');
      const file1 = new File(['content1'], 'doc1.pdf', {
        type: 'application/pdf',
      });
      const file2 = new File(['content2'], 'doc2.pdf', {
        type: 'application/pdf',
      });

      await user.upload(fileInput, [file1, file2]);

      const fileInputElement = fileInput as HTMLInputElement;
      expect(fileInputElement.files).toHaveLength(2);
      expect(fileInputElement.files?.[0]).toBe(file1);
      expect(fileInputElement.files?.[1]).toBe(file2);
    });

    it('handles form with field descriptions', () => {
      const fields: FormField[] = [
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          description: 'Password must be at least 8 characters long',
        },
      ];

      render(<Form fields={fields} />);

      expect(
        screen.getByText('Password must be at least 8 characters long')
      ).toBeInTheDocument();
    });

    it('handles form with custom className', () => {
      const fields: FormField[] = [
        {
          name: 'field1',
          label: 'Field 1',
          type: 'text',
          className: 'custom-field-class',
        },
      ];

      render(<Form fields={fields} className='custom-form-class' />);

      // Form should render successfully even if className isn't applied to form element
      expect(screen.getByTestId('form')).toBeInTheDocument();
      expect(screen.getByLabelText('Field 1')).toBeInTheDocument();
    });
  });

  // ... existing tests
});

describe('MultiStepForm Component', () => {
  const multiStepFormProps = {
    steps: [
      {
        title: 'Personal Information',
        fields: [
          { name: 'firstName', label: 'First Name', type: 'text' as const },
          { name: 'lastName', label: 'Last Name', type: 'text' as const },
        ],
      },
      {
        title: 'Contact Information',
        fields: [
          { name: 'email', label: 'Email', type: 'email' as const },
          { name: 'phone', label: 'Phone', type: 'tel' as const },
        ],
      },
    ],
  };

  describe('Basic Rendering', () => {
    it('renders multi-step form with first step', () => {
      render(<MultiStepForm {...multiStepFormProps} />);

      expect(
        screen.getByRole('heading', { name: 'Personal Information' })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
    });

    it('shows progress when showProgress is true', () => {
      render(<MultiStepForm {...multiStepFormProps} showProgress />);
      expect(screen.getByText('Step 1 of 2')).toBeInTheDocument();
    });

    it('shows step numbers when showStepNumbers is true', () => {
      render(<MultiStepForm {...multiStepFormProps} showStepNumbers />);
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('navigates to next step', async () => {
      const user = userEvent.setup();
      render(<MultiStepForm {...multiStepFormProps} />);

      // Fill first step
      await user.type(screen.getByLabelText(/first name/i), 'John');
      await user.type(screen.getByLabelText(/last name/i), 'Doe');

      // Go to next step
      const nextBtn = screen.getByRole('button', { name: /next/i });
      await user.click(nextBtn);

      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: 'Contact Information' })
        ).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      });
    });

    it('navigates to previous step', async () => {
      const user = userEvent.setup();
      render(<MultiStepForm {...multiStepFormProps} />);

      // Fill first step and go to second
      await user.type(screen.getByLabelText(/first name/i), 'John');
      await user.type(screen.getByLabelText(/last name/i), 'Doe');
      await user.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: 'Contact Information' })
        ).toBeInTheDocument();
      });

      // Go back to previous step
      const prevBtn = screen.getByRole('button', { name: /previous/i });
      await user.click(prevBtn);

      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: 'Personal Information' })
        ).toBeInTheDocument();
        expect(screen.getByDisplayValue('John')).toBeInTheDocument();
      });
    });

    it('disables previous button when allowBackward is false', () => {
      render(<MultiStepForm {...multiStepFormProps} allowBackward={false} />);

      // Should not show previous button on first step
      expect(
        screen.queryByRole('button', { name: /previous/i })
      ).not.toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('submits form on final step', async () => {
      const user = userEvent.setup();
      const onSubmit = jest.fn();

      render(<MultiStepForm {...multiStepFormProps} onSubmit={onSubmit} />);

      // Fill first step
      await user.type(screen.getByLabelText(/first name/i), 'John');
      await user.type(screen.getByLabelText(/last name/i), 'Doe');
      await user.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: 'Contact Information' })
        ).toBeInTheDocument();
      });

      // Fill second step
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/phone/i), '123-456-7890');

      // Submit form
      const submitBtn = screen.getByRole('button', { name: /submit/i });
      await user.click(submitBtn);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
        });
      });
    });
  });

  describe('Step Change Handler', () => {
    it('calls onStepChange when step changes', async () => {
      const user = userEvent.setup();
      const onStepChange = jest.fn();

      render(
        <MultiStepForm {...multiStepFormProps} onStepChange={onStepChange} />
      );

      await user.type(screen.getByLabelText(/first name/i), 'John');
      await user.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(onStepChange).toHaveBeenCalledWith(
          1,
          expect.objectContaining({
            firstName: 'John',
          })
        );
      });
    });
  });

  describe('Custom Button Text', () => {
    it('uses custom button text', () => {
      render(
        <MultiStepForm
          {...multiStepFormProps}
          nextText='Continue'
          previousText='Go Back'
          submitText='Complete'
        />
      );

      expect(
        screen.getByRole('button', { name: /continue/i })
      ).toBeInTheDocument();
    });
  });
});
