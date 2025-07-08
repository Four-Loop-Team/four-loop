import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ThemeProvider,
  ThemeSelector,
  ThemeToggle,
  useTheme,
} from '../ThemeProvider';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock matchMedia for system theme detection
const mockMatchMedia = jest.fn();
Object.defineProperty(window, 'matchMedia', {
  value: mockMatchMedia,
});

// Test component that uses the useTheme hook
function TestComponent() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid='current-theme'>{theme}</span>
      <span data-testid='resolved-theme'>{resolvedTheme}</span>
      <button data-testid='set-light' onClick={() => setTheme('light')}>
        Set Light
      </button>
      <button data-testid='set-dark' onClick={() => setTheme('dark')}>
        Set Dark
      </button>
      <button data-testid='set-auto' onClick={() => setTheme('auto')}>
        Set Auto
      </button>
      <button data-testid='toggle-theme' onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    // Clear all mocks
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
    mockMatchMedia.mockClear();

    // Make localStorage.getItem return null by default
    localStorageMock.getItem.mockReturnValue(null);

    // Mock document.documentElement
    Object.defineProperty(document, 'documentElement', {
      value: {
        setAttribute: jest.fn(),
        classList: {
          toggle: jest.fn(),
        },
      },
      writable: true,
      configurable: true,
    });

    // Default matchMedia mock
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)' ? false : false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  it('should provide theme context to children', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Wait for the component to mount and context to be available
    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('auto');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
    });
  });

  it('should use default theme when provided', () => {
    render(
      <ThemeProvider defaultTheme='dark'>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
  });

  it('should load theme from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(localStorageMock.getItem).toHaveBeenCalledWith('four-loop-theme');
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('should use custom storage key', () => {
    localStorageMock.getItem.mockReturnValue('light');

    render(
      <ThemeProvider storageKey='custom-theme'>
        <TestComponent />
      </ThemeProvider>
    );

    expect(localStorageMock.getItem).toHaveBeenCalledWith('custom-theme');
  });

  it('should set theme and save to localStorage', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await userEvent.click(screen.getByTestId('set-dark'));

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'four-loop-theme',
      'dark'
    );
  });

  it('should resolve auto theme based on system preference', () => {
    // Mock dark system preference
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)' ? true : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <ThemeProvider defaultTheme='auto'>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('auto');
    expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
  });

  it('should toggle theme correctly from light to dark', async () => {
    render(
      <ThemeProvider defaultTheme='light'>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

    await userEvent.click(screen.getByTestId('toggle-theme'));

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('should toggle theme correctly from dark to light', async () => {
    render(
      <ThemeProvider defaultTheme='dark'>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

    await userEvent.click(screen.getByTestId('toggle-theme'));

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('should toggle from auto to opposite of resolved theme', async () => {
    // Mock light system preference
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)' ? false : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <ThemeProvider defaultTheme='auto'>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('auto');
    expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');

    await userEvent.click(screen.getByTestId('toggle-theme'));

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('should update document attributes when theme changes', async () => {
    const setAttributeMock = jest.fn();
    const toggleMock = jest.fn();

    Object.defineProperty(document, 'documentElement', {
      value: {
        setAttribute: setAttributeMock,
        classList: {
          toggle: toggleMock,
        },
      },
      writable: true,
      configurable: true,
    });

    render(
      <ThemeProvider defaultTheme='light'>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(setAttributeMock).toHaveBeenCalledWith('data-theme', 'light');
      expect(toggleMock).toHaveBeenCalledWith('dark', false);
    });

    await userEvent.click(screen.getByTestId('set-dark'));

    await waitFor(() => {
      expect(setAttributeMock).toHaveBeenCalledWith('data-theme', 'dark');
      expect(toggleMock).toHaveBeenCalledWith('dark', true);
    });
  });

  it('should listen to system theme changes in auto mode', async () => {
    const addEventListenerMock = jest.fn();
    const removeEventListenerMock = jest.fn();

    mockMatchMedia.mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)' ? false : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
      dispatchEvent: jest.fn(),
    }));

    render(
      <ThemeProvider defaultTheme='auto'>
        <TestComponent />
      </ThemeProvider>
    );

    // Wait for the component to mount and set up listeners
    await waitFor(() => {
      expect(addEventListenerMock).toHaveBeenCalledWith(
        'change',
        expect.any(Function)
      );
    });
  });

  it('should render children before mount without theme context', () => {
    const { container } = render(
      <ThemeProvider>
        <div data-testid='child'>Child content</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});

describe('useTheme', () => {
  it('should throw error when used outside ThemeProvider', () => {
    const TestComponentOutside = () => {
      useTheme();
      return <div>Test</div>;
    };

    // Suppress console.error for this test
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<TestComponentOutside />)).toThrow(
      'useTheme must be used within a ThemeProvider'
    );

    consoleSpy.mockRestore();
  });
});

describe('ThemeToggle', () => {
  it('should render toggle button with correct icons', () => {
    render(
      <ThemeProvider defaultTheme='light'>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark theme');
    expect(button).toHaveAttribute('title', 'Current theme: light (light)');

    // Should show moon icon for switching to dark
    const moonIcon = button.querySelector('svg');
    expect(moonIcon).toBeInTheDocument();
  });

  it('should toggle theme when clicked', async () => {
    render(
      <ThemeProvider defaultTheme='light'>
        <ThemeToggle />
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

    await userEvent.click(screen.getByRole('button', { name: /switch to/i }));

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('should apply custom className and size', () => {
    render(
      <ThemeProvider>
        <ThemeToggle className='custom-class' size='lg' />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('p-3'); // lg size
  });

  it('should show correct icon for dark theme', async () => {
    render(
      <ThemeProvider defaultTheme='dark'>
        <ThemeToggle />
      </ThemeProvider>
    );

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /switch to/i });
      expect(button).toHaveAttribute('aria-label', 'Switch to light theme');
      expect(button).toHaveAttribute('title', 'Current theme: dark (dark)');
    });
  });
});

describe('ThemeSelector', () => {
  it('should render select with correct options', () => {
    render(
      <ThemeProvider defaultTheme='light'>
        <ThemeSelector />
      </ThemeProvider>
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('light');
    expect(select).toHaveAttribute('aria-label', 'Select theme');

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('Light');
    expect(options[1]).toHaveTextContent('Dark');
    expect(options[2]).toHaveTextContent('Auto (System)');
  });

  it('should change theme when option is selected', async () => {
    render(
      <ThemeProvider defaultTheme='light'>
        <ThemeSelector />
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

    await userEvent.selectOptions(screen.getByRole('combobox'), 'dark');

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('should apply custom className', () => {
    render(
      <ThemeProvider>
        <ThemeSelector className='custom-select' />
      </ThemeProvider>
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('custom-select');
  });
});
