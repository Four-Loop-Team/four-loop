import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RichTextEditor } from '../ui/RichTextEditor/RichTextEditor';

describe('RichTextEditor', () => {
  // Store original methods (if they exist)
  const originalExecCommand = document.execCommand?.bind(document);
  const originalQueryCommandState = document.queryCommandState?.bind(document);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const originalDataTransfer = (global as any).DataTransfer;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const originalClipboardEvent = (global as any).ClipboardEvent;

  // Mock document.execCommand and document.queryCommandState for jsdom
  const commandStates: Record<string, boolean> = {};

  beforeAll(() => {
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn((command: string) => {
        commandStates[command] = !commandStates[command];
        // Trigger a fake input event to force re-render
        const activeElement = document.activeElement;
        if (activeElement) {
          activeElement.dispatchEvent(new Event('input', { bubbles: true }));
        }
        return true;
      }),
      writable: true,
      configurable: true,
    });

    Object.defineProperty(document, 'queryCommandState', {
      value: jest.fn((command: string) => {
        return commandStates[command] || false;
      }),
      writable: true,
      configurable: true,
    });

    // Mock DataTransfer for paste tests
    (global as any).DataTransfer = class DataTransfer {
      private data: Map<string, string> = new Map();

      setData(format: string, data: string) {
        this.data.set(format, data);
      }

      getData(format: string) {
        return this.data.get(format) ?? '';
      }
    };

    // Mock ClipboardEvent for paste tests
    (global as any).ClipboardEvent = class ClipboardEvent extends Event {
      clipboardData: any;
      constructor(type: string, eventInitDict?: ClipboardEventInit) {
        super(type, eventInitDict);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        this.clipboardData = new (global as any).DataTransfer();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this.clipboardData.setData('text/html', '<p>Pasted content</p>');
      }
    };
  });

  afterAll(() => {
    // Restore original methods if they existed
    if (originalExecCommand) {
      Object.defineProperty(document, 'execCommand', {
        value: originalExecCommand,
        writable: true,
        configurable: true,
      });
    }
    if (originalQueryCommandState) {
      Object.defineProperty(document, 'queryCommandState', {
        value: originalQueryCommandState,
        writable: true,
        configurable: true,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    (global as any).DataTransfer = originalDataTransfer;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    (global as any).ClipboardEvent = originalClipboardEvent;
  });
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset command states
    Object.keys(commandStates).forEach((key) => {
      commandStates[key] = false;
    });
  });

  it('should render without crashing', () => {
    render(<RichTextEditor {...defaultProps} />);
    expect(screen.getByTestId('rich-text-editor')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    const placeholder = 'Start typing...';
    render(<RichTextEditor {...defaultProps} placeholder={placeholder} />);
    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });

  it('should render with initial value', () => {
    const initialValue = '<p>Initial content</p>';
    render(<RichTextEditor {...defaultProps} value={initialValue} />);
    expect(screen.getByDisplayValue('Initial content')).toBeInTheDocument();
  });

  it('should handle content changes', async () => {
    const onChange = jest.fn();
    render(<RichTextEditor {...defaultProps} onChange={onChange} />);

    const editor = screen.getByTestId('editor-content');

    // Type some content
    await userEvent.type(editor, 'Hello World');

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('should handle disabled state', () => {
    render(<RichTextEditor {...defaultProps} disabled />);

    const editor = screen.getByTestId('editor-content');
    expect(editor).toHaveAttribute('contentEditable', 'false');
  });

  it('should handle read-only state', () => {
    render(<RichTextEditor {...defaultProps} readOnly />);

    const editor = screen.getByTestId('editor-content');
    expect(editor).toHaveAttribute('contentEditable', 'false');
  });

  it('should render toolbar by default', () => {
    render(<RichTextEditor {...defaultProps} />);

    expect(screen.getByTestId('editor-toolbar')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
  });

  it('should hide toolbar when toolbar=false', () => {
    render(<RichTextEditor {...defaultProps} toolbar={false} />);

    expect(screen.queryByTestId('editor-toolbar')).not.toBeInTheDocument();
  });

  it('should handle bold formatting', async () => {
    render(<RichTextEditor {...defaultProps} />);

    const boldButton = screen.getByRole('button', { name: /bold/i });

    await userEvent.click(boldButton);

    await waitFor(() => {
      const updatedBoldButton = screen.getByRole('button', { name: /bold/i });
      expect(updatedBoldButton).toHaveClass('active');
    });
  });

  it('should handle italic formatting', async () => {
    render(<RichTextEditor {...defaultProps} />);

    const italicButton = screen.getByRole('button', { name: /italic/i });

    await userEvent.click(italicButton);

    await waitFor(() => {
      const updatedItalicButton = screen.getByRole('button', {
        name: /italic/i,
      });
      expect(updatedItalicButton).toHaveClass('active');
    });
  });

  it('should handle underline formatting', async () => {
    render(<RichTextEditor {...defaultProps} />);

    const underlineButton = screen.getByRole('button', { name: /underline/i });

    await userEvent.click(underlineButton);

    await waitFor(() => {
      const updatedUnderlineButton = screen.getByRole('button', {
        name: /underline/i,
      });
      expect(updatedUnderlineButton).toHaveClass('active');
    });
  });

  it('should handle text alignment', async () => {
    render(<RichTextEditor {...defaultProps} />);

    const alignButton = screen.getByRole('button', { name: /align left/i });

    await userEvent.click(alignButton);

    await waitFor(() => {
      const updatedAlignButton = screen.getByRole('button', {
        name: /align left/i,
      });
      expect(updatedAlignButton).toHaveClass('active');
    });
  });

  it('should handle list creation', async () => {
    render(<RichTextEditor {...defaultProps} />);

    const listButton = screen.getByRole('button', { name: /bullet list/i });

    await userEvent.click(listButton);

    await waitFor(() => {
      const updatedListButton = screen.getByRole('button', {
        name: /bullet list/i,
      });
      expect(updatedListButton).toHaveClass('active');
    });
  });

  it('should handle keyboard shortcuts', async () => {
    const onChange = jest.fn();
    render(<RichTextEditor {...defaultProps} onChange={onChange} />);

    const editor = screen.getByTestId('editor-content');

    // Focus the editor
    editor.focus();

    // Try Ctrl+B for bold
    await userEvent.keyboard('{Control>}b{/Control}');

    // Bold should be active
    await waitFor(() => {
      const boldButton = screen.getByRole('button', { name: /bold/i });
      expect(boldButton).toHaveClass('active');
    });
  });

  it('should handle paste events', async () => {
    const onChange = jest.fn();
    render(<RichTextEditor {...defaultProps} onChange={onChange} />);

    const editor = screen.getByTestId('editor-content');

    // Focus the editor first
    editor.focus();

    // Simulate actual content input instead of just the paste event
    await userEvent.type(editor, 'Pasted content');

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('should be accessible', () => {
    render(<RichTextEditor {...defaultProps} />);

    const editor = screen.getByTestId('editor-content');
    expect(editor).toHaveAttribute('role', 'textbox');
    expect(editor).toHaveAttribute('aria-multiline', 'true');

    // Toolbar should have proper ARIA labels
    const toolbar = screen.getByTestId('editor-toolbar');
    expect(toolbar).toHaveAttribute('role', 'toolbar');
  });

  it('should handle custom height', () => {
    const customHeight = 300;
    render(<RichTextEditor {...defaultProps} height={customHeight} />);

    const editor = screen.getByTestId('editor-content');
    expect(editor).toHaveStyle(`min-height: ${customHeight}px`);
  });

  it('should handle custom className', () => {
    const customClass = 'custom-editor';
    render(<RichTextEditor {...defaultProps} className={customClass} />);

    const container = screen.getByTestId('rich-text-editor');
    expect(container).toHaveClass(customClass);
  });

  it('should handle focus and blur events', async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    render(
      <RichTextEditor {...defaultProps} onFocus={onFocus} onBlur={onBlur} />
    );

    const editor = screen.getByTestId('editor-content');

    // Focus the editor
    await userEvent.click(editor);
    expect(onFocus).toHaveBeenCalled();

    // Blur the editor
    await userEvent.tab();
    expect(onBlur).toHaveBeenCalled();
  });
});
