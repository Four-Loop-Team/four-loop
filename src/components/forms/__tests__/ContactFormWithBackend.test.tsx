import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ContactFormWithBackend from '../ContactFormWithBackend';

// Mock fetch globally
global.fetch = jest.fn();

const theme = createTheme();

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ContactFormWithBackend', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('renders the contact form with all fields', () => {
    renderWithTheme(<ContactFormWithBackend />);

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument();
    expect(screen.getByText(/security question/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /send message/i })
    ).toBeInTheDocument();
  });

  it('generates a math question for CAPTCHA', () => {
    renderWithTheme(<ContactFormWithBackend />);

    const mathQuestion = screen.getByText(/what is \d+ [+\-] \d+\?/i);
    expect(mathQuestion).toBeInTheDocument();
  });

  it('displays validation errors for empty required fields', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: () =>
        Promise.resolve({
          error: 'Invalid form data',
          details: [
            'Name is required',
            'Email is required',
            'Subject is required',
            'Message is required',
          ],
        }),
    });

    renderWithTheme(<ContactFormWithBackend />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/please fix the following issues/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it('submits form successfully with valid data', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          message: 'Your message has been sent successfully!',
        }),
    });

    const onSuccess = jest.fn();
    renderWithTheme(<ContactFormWithBackend onSuccess={onSuccess} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/your email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: 'Test Subject' },
    });
    fireEvent.change(screen.getByLabelText(/your message/i), {
      target: { value: 'This is a test message.' },
    });

    // Find and solve the math question
    const mathText = screen.getByText(/what is \d+ [+\-] \d+\?/i).textContent;
    const mathMatch = mathText?.match(/What is (\d+) ([+\-]) (\d+)\?/);
    if (mathMatch) {
      const num1 = parseInt(mathMatch[1]);
      const operator = mathMatch[2];
      const num2 = parseInt(mathMatch[3]);
      const answer = operator === '+' ? num1 + num2 : num1 - num2;

      fireEvent.change(screen.getByLabelText(/your answer/i), {
        target: { value: answer.toString() },
      });
    }

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('handles network errors gracefully', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const onError = jest.fn();
    renderWithTheme(<ContactFormWithBackend onError={onError} />);

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith('Network error. Please try again.');
    });
  });

  it('disables submit button while submitting', async () => {
    (fetch as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );

    renderWithTheme(<ContactFormWithBackend />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    expect(
      screen.getByRole('button', { name: /sending message/i })
    ).toBeDisabled();
  });

  it('clears form after successful submission', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          message: 'Your message has been sent successfully!',
        }),
    });

    renderWithTheme(<ContactFormWithBackend />);

    const nameField = screen.getByLabelText(/your name/i) as HTMLInputElement;
    const emailField = screen.getByLabelText(/your email/i) as HTMLInputElement;
    const subjectField = screen.getByLabelText(/subject/i) as HTMLInputElement;
    const messageField = screen.getByLabelText(
      /your message/i
    ) as HTMLTextAreaElement;

    // Fill out the form
    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectField, { target: { value: 'Test Subject' } });
    fireEvent.change(messageField, {
      target: { value: 'This is a test message.' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(nameField.value).toBe('');
      expect(emailField.value).toBe('');
      expect(subjectField.value).toBe('');
      expect(messageField.value).toBe('');
    });
  });

  it('does not submit multiple times when clicked rapidly', async () => {
    (fetch as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () => Promise.resolve({ success: true }),
              }),
            100
          )
        )
    );

    renderWithTheme(<ContactFormWithBackend />);

    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Click multiple times rapidly
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
