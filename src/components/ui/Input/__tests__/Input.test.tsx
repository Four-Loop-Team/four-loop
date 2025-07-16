import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import Input from '../Input';

// Material-UI theme for testing
const theme = createTheme();

// Wrapper component to provide theme context
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Input Component', () => {
  it('renders with Material-UI TextField', () => {
    render(<Input data-testid='input' />, { wrapper: TestWrapper });

    const input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('MuiTextField-root');
  });

  it('renders with label', () => {
    render(<Input label='Test Label' data-testid='input' />, {
      wrapper: TestWrapper,
    });

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders error state with string error', () => {
    render(<Input error='This is an error' data-testid='input' />, {
      wrapper: TestWrapper,
    });

    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('applies filled variant by default', () => {
    render(<Input data-testid='input' />, { wrapper: TestWrapper });

    const input = screen.getByTestId('input');
    // The actual element should have the filled variant class
    expect(input.querySelector('.MuiFilledInput-root')).toBeInTheDocument();
  });

  it('applies outlined variant when specified', () => {
    render(<Input variant='outlined' data-testid='input' />, {
      wrapper: TestWrapper,
    });

    const input = screen.getByTestId('input');
    expect(input.querySelector('.MuiOutlinedInput-root')).toBeInTheDocument();
  });

  it('renders with icons', () => {
    const LeftIcon = () => <span data-testid='left-icon'>left</span>;
    const RightIcon = () => <span data-testid='right-icon'>right</span>;

    render(
      <Input
        leftIcon={<LeftIcon />}
        rightIcon={<RightIcon />}
        data-testid='input'
      />,
      { wrapper: TestWrapper }
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });
});
