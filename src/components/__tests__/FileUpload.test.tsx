import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileUpload } from '../ui/FileUpload/FileUpload';

// Mock file for testing
const createMockFile = (name: string, size: number, type: string) => {
  const file = new File([''], name, { type });
  Object.defineProperty(file, 'size', {
    value: size,
    writable: false,
  });
  return file;
};

describe('FileUpload', () => {
  const defaultProps = {
    onChange: jest.fn(),
    onError: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<FileUpload {...defaultProps} />);
    expect(screen.getByTestId('file-upload')).toBeInTheDocument();
  });

  it('should render with custom placeholder', () => {
    const customPlaceholder = 'Custom upload text';
    render(<FileUpload {...defaultProps} placeholder={customPlaceholder} />);
    expect(screen.getByText(customPlaceholder)).toBeInTheDocument();
  });

  it('should handle single file selection', async () => {
    const onChange = jest.fn();
    render(<FileUpload {...defaultProps} onChange={onChange} />);

    const fileInput = screen.getByTestId('file-input');
    const file = createMockFile('test.jpg', 1024, 'image/jpeg');

    await userEvent.upload(fileInput, file);

    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'test.jpg',
          size: 1024,
          type: 'image/jpeg',
          status: 'success',
        }),
      ])
    );
  });

  it('should handle multiple files selection', async () => {
    const onChange = jest.fn();
    render(<FileUpload {...defaultProps} multiple onChange={onChange} />);

    const fileInput = screen.getByTestId('file-input');
    const files = [
      createMockFile('test1.jpg', 1024, 'image/jpeg'),
      createMockFile('test2.png', 2048, 'image/png'),
    ];

    await userEvent.upload(fileInput, files);

    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ name: 'test1.jpg' }),
        expect.objectContaining({ name: 'test2.png' }),
      ])
    );
  });

  it('should handle file size validation', async () => {
    const onError = jest.fn();
    const maxSize = 1024; // 1KB
    render(
      <FileUpload {...defaultProps} maxSize={maxSize} onError={onError} />
    );

    const fileInput = screen.getByTestId('file-input');
    const largeFile = createMockFile('large.jpg', 2048, 'image/jpeg'); // 2KB

    await userEvent.upload(fileInput, largeFile);

    expect(onError).toHaveBeenCalledWith(
      '',
      'File large.jpg exceeds maximum size'
    );
  });

  it('should handle disabled state', () => {
    render(<FileUpload {...defaultProps} disabled />);

    const container = screen.getByTestId('file-upload');
    expect(container).toHaveClass('file-upload-disabled');

    const fileInput = screen.getByTestId('file-input');
    expect(fileInput).toBeDisabled();
  });

  it('should handle click to open file dialog', async () => {
    render(<FileUpload {...defaultProps} />);

    const container = screen.getByTestId('file-upload');
    const fileInput = screen.getByTestId('file-input');

    // Mock the click method
    const clickSpy = jest.spyOn(fileInput, 'click');

    await userEvent.click(container);

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should not open file dialog when disabled', async () => {
    render(<FileUpload {...defaultProps} disabled />);

    const container = screen.getByTestId('file-upload');
    const fileInput = screen.getByTestId('file-input');

    const clickSpy = jest.spyOn(fileInput, 'click');

    await userEvent.click(container);

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should handle keyboard interaction', async () => {
    render(<FileUpload {...defaultProps} />);

    const container = screen.getByTestId('file-upload');
    const fileInput = screen.getByTestId('file-input');

    const clickSpy = jest.spyOn(fileInput, 'click');

    // Focus the container and press Enter
    container.focus();
    await userEvent.keyboard('{Enter}');

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should handle drag and drop events', () => {
    render(<FileUpload {...defaultProps} />);

    const container = screen.getByTestId('file-upload');

    // Test drag enter
    fireEvent.dragEnter(container);
    expect(container).toHaveClass('file-upload-dragover');

    // Test drag leave
    fireEvent.dragLeave(container);
    expect(container).not.toHaveClass('file-upload-dragover');
  });

  it('should handle file drop', async () => {
    const onChange = jest.fn();
    render(<FileUpload {...defaultProps} onChange={onChange} />);

    const container = screen.getByTestId('file-upload');
    const file = createMockFile('dropped.jpg', 1024, 'image/jpeg');

    const dropEvent = new Event('drop', { bubbles: true });
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: {
        files: [file],
      },
    });

    fireEvent(container, dropEvent);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'dropped.jpg',
            size: 1024,
            type: 'image/jpeg',
          }),
        ])
      );
    });
  });

  it('should accept specific file types', () => {
    render(<FileUpload {...defaultProps} accept='image/*' />);

    const fileInput = screen.getByTestId('file-input');
    expect(fileInput).toHaveAttribute('accept', 'image/*');
  });

  it('should be accessible', () => {
    const ariaLabel = 'Upload your files';
    render(<FileUpload {...defaultProps} aria-label={ariaLabel} />);

    const container = screen.getByTestId('file-upload');
    expect(container).toHaveAttribute('aria-label', ariaLabel);
    expect(container).toHaveAttribute('role', 'button');
    expect(container).toHaveAttribute('tabIndex', '0');
  });

  it('should apply custom className', () => {
    const customClass = 'custom-upload';
    render(<FileUpload {...defaultProps} className={customClass} />);

    const container = screen.getByTestId('file-upload');
    expect(container).toHaveClass(customClass);
  });

  it('should display uploaded files', async () => {
    render(<FileUpload {...defaultProps} />);

    const fileInput = screen.getByTestId('file-input');
    const file = createMockFile('test.pdf', 1024, 'application/pdf');

    await userEvent.upload(fileInput, file);

    expect(screen.getByText('test.pdf')).toBeInTheDocument();
    expect(screen.getByText('1.0 KB')).toBeInTheDocument();
  });
});
