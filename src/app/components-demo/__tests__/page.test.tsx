import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComponentsDemo from '../page';

// Mock all the UI components
jest.mock('@/components/ui', () => ({
  Accordion: () => <div data-testid='accordion'>Accordion Component</div>,
  Button: ({
    children,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    [key: string]: unknown;
  }) => (
    <button
      onClick={onClick}
      data-testid='button'
      {...(props as Record<string, unknown>)}
    >
      {children}
    </button>
  ),
  Calendar: () => <div data-testid='calendar'>Calendar Component</div>,
  Card: ({ children, ...props }: any) => (
    <div data-testid='card' {...props}>
      {children}
    </div>
  ),
  CardContent: ({ children, ...props }: any) => (
    <div data-testid='card-content' {...props}>
      {children}
    </div>
  ),
  CardFooter: ({ children, ...props }: any) => (
    <div data-testid='card-footer' {...props}>
      {children}
    </div>
  ),
  CardHeader: ({ children, title, subtitle, ...props }: any) => (
    <div data-testid='card-header' {...props}>
      {title && <div>{title}</div>}
      {subtitle && <div>{subtitle}</div>}
      {children}
    </div>
  ),
  Chart: () => <div data-testid='chart'>Chart Component</div>,
  DataTable: () => <div data-testid='data-table'>DataTable Component</div>,
  Dropdown: () => <div data-testid='dropdown'>Dropdown Component</div>,
  FileUpload: () => <div data-testid='file-upload'>FileUpload Component</div>,
  Form: ({ children, ...props }: any) => (
    <form data-testid='form' {...props}>
      {children}
    </form>
  ),
  Input: ({ ...props }: any) => <input data-testid='input' {...props} />,
  Modal: ({ isOpen, children, ...props }: any) =>
    isOpen ? (
      <div data-testid='modal' {...props}>
        {children}
      </div>
    ) : null,
  RichTextEditor: () => (
    <div data-testid='rich-text-editor'>RichTextEditor Component</div>
  ),
  Sticky: ({ children, ...props }: any) => (
    <div data-testid='sticky' {...props}>
      {children}
    </div>
  ),
  StickyHeader: ({ children, ...props }: any) => (
    <div data-testid='sticky-header' {...props}>
      {children}
    </div>
  ),
  Tabs: () => <div data-testid='tabs'>Tabs Component</div>,
  Timeline: () => <div data-testid='timeline'>Timeline Component</div>,
}));

describe('ComponentsDemo', () => {
  it('should render without crashing', () => {
    render(<ComponentsDemo />);
    expect(screen.getByText('🧩 Component Showcase')).toBeInTheDocument();
  });

  it('should display the main heading', () => {
    render(<ComponentsDemo />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '🧩 Component Showcase'
    );
  });

  it('should display the subtitle', () => {
    render(<ComponentsDemo />);
    expect(
      screen.getByText(/Interactive demonstration of all UI components/)
    ).toBeInTheDocument();
  });

  it('should render all component sections', () => {
    render(<ComponentsDemo />);

    // Check for section headings
    expect(screen.getByText('📝 Form Components')).toBeInTheDocument();
    expect(screen.getByText('🎛️ Interactive Components')).toBeInTheDocument();
    expect(screen.getByText('📊 Data Display')).toBeInTheDocument();
    expect(screen.getByText('🧭 Navigation')).toBeInTheDocument();
    expect(screen.getByText('🎨 Layout & Structure')).toBeInTheDocument();
    expect(screen.getByText('📱 Advanced Components')).toBeInTheDocument();
  });

  it('should render form components', () => {
    render(<ComponentsDemo />);

    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getAllByTestId('input')).toHaveLength(6); // Multiple inputs exist
    expect(screen.getByTestId('file-upload')).toBeInTheDocument();
    expect(screen.getByTestId('rich-text-editor')).toBeInTheDocument();
  });

  it('should render interactive components', () => {
    render(<ComponentsDemo />);

    expect(screen.getAllByTestId('dropdown')).toHaveLength(2); // Multiple dropdowns exist
    expect(screen.getByTestId('accordion')).toBeInTheDocument();
    expect(screen.getByTestId('tabs')).toBeInTheDocument();
  });

  it('should render data display components', () => {
    render(<ComponentsDemo />);

    expect(screen.getByTestId('data-table')).toBeInTheDocument();
    expect(screen.getByTestId('chart')).toBeInTheDocument();
    expect(screen.getByTestId('timeline')).toBeInTheDocument();
  });

  it('should render layout components', () => {
    render(<ComponentsDemo />);

    expect(screen.getAllByTestId('card').length).toBeGreaterThan(0); // Multiple cards exist
    expect(screen.getByTestId('sticky')).toBeInTheDocument();
    expect(screen.getAllByTestId('sticky-header')).toHaveLength(2); // One in header, one in navigation section
  });

  it('should render calendar component', () => {
    render(<ComponentsDemo />);
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it('should handle modal interaction', async () => {
    const user = userEvent.setup();
    render(<ComponentsDemo />);

    // Find and click the button to open modal
    const openModalButton = screen.getByText(/Open Modal/);
    expect(openModalButton).toBeInTheDocument();

    // Initially modal should not be visible
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

    // Click to open modal
    await user.click(openModalButton);

    // Modal should now be visible
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });
  });

  it('should display component descriptions', () => {
    render(<ComponentsDemo />);

    // Check for component descriptions
    expect(
      screen.getByText(/Complete form with validation/)
    ).toBeInTheDocument();
    expect(screen.getByText(/File drag-and-drop upload/)).toBeInTheDocument();
    expect(
      screen.getByText(/Rich text editing capabilities/)
    ).toBeInTheDocument();
  });

  it('should have proper accessibility structure', () => {
    render(<ComponentsDemo />);

    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();

    // Check for section headings
    const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(sectionHeadings.length).toBeGreaterThan(0);
  });

  it('should render example data for data table', () => {
    render(<ComponentsDemo />);
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });

  it('should render chart with sample data', () => {
    render(<ComponentsDemo />);
    expect(screen.getByTestId('chart')).toBeInTheDocument();
  });

  it('should display usage notes', () => {
    render(<ComponentsDemo />);
    expect(
      screen.getByText(/All components support theming/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Built with accessibility in mind/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Responsive design included/)).toBeInTheDocument();
  });
});
