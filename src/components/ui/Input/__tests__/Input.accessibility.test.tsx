import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Input from '../Input';

describe('Input Accessibility Tests', () => {
  it('should have no accessibility violations - basic input', async () => {
    const { container } = render(<Input label='Username' />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations - input with error', async () => {
    const { container } = render(
      <Input
        label='Email Address'
        error='Please enter a valid email address'
        type='email'
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations - input with helper text', async () => {
    const { container } = render(
      <Input
        label='Password'
        helperText='Must be at least 8 characters long'
        type='password'
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations - input with icons', async () => {
    const SearchIcon = () => <span aria-label='Search'>🔍</span>;
    const ClearIcon = () => (
      <button type='button' aria-label='Clear input'>
        ✕
      </button>
    );

    const { container } = render(
      <Input
        label='Search'
        leftIcon={<SearchIcon />}
        rightIcon={<ClearIcon />}
        placeholder='Search for products...'
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations - required input', async () => {
    const { container } = render(
      <Input
        label='Full Name'
        required
        aria-describedby='name-help'
        helperText='Enter your first and last name'
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations - input in form context', async () => {
    const { container } = render(
      <form>
        <fieldset>
          <legend>Contact Information</legend>
          <Input
            label='First Name'
            required
            helperText='Enter your first name'
          />
          <Input label='Last Name' required helperText='Enter your last name' />
          <Input
            label='Email'
            type='email'
            required
            helperText="We'll use this to contact you"
          />
          <Input
            label='Phone Number'
            type='tel'
            helperText='Optional: Include area code'
          />
        </fieldset>
        <button type='submit'>Submit</button>
      </form>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations - disabled input', async () => {
    const { container } = render(
      <Input
        label='Account ID'
        disabled
        value='12345'
        helperText='This field cannot be edited'
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations - input with ARIA attributes', async () => {
    const { container } = render(
      <Input
        label='Credit Card Number'
        type='text'
        aria-describedby='cc-help security-notice'
        helperText='Enter your 16-digit credit card number'
        autoComplete='cc-number'
        inputMode='numeric'
        pattern='[0-9\s]{13,19}'
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations - input with multiple validation states', async () => {
    const { container } = render(
      <div>
        <Input
          label='Valid Email'
          type='email'
          value='user@example.com'
          helperText='This email address is valid'
        />
        <Input
          label='Invalid Email'
          type='email'
          value='invalid-email'
          error='Please enter a valid email address'
        />
        <Input
          label='Required Field'
          required
          error='This field is required'
          aria-invalid='true'
        />
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
