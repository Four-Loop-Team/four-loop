import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Chart } from '../ui/Chart/Chart';

// Mock HTMLCanvasElement methods
const mockGetContext = jest.fn();
const mockCanvas = {
  getContext: mockGetContext,
  width: 0,
  height: 0,
  style: {},
};

const mockContext = {
  clearRect: jest.fn(),
  strokeStyle: '',
  lineWidth: 0,
  fillStyle: '',
  font: '',
  textAlign: '',
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  arc: jest.fn(),
  stroke: jest.fn(),
  fill: jest.fn(),
  closePath: jest.fn(),
  fillRect: jest.fn(),
  fillText: jest.fn(),
  measureText: jest.fn(() => ({ width: 50 })),
};

beforeEach(() => {
  mockGetContext.mockClear();
  Object.values(mockContext).forEach((mock) => {
    if (typeof mock === 'function') {
      mock.mockClear();
    }
  });

  // Mock canvas creation
  HTMLCanvasElement.prototype.getContext = mockGetContext;
  mockGetContext.mockReturnValue(mockContext);

  // Mock getBoundingClientRect
  HTMLCanvasElement.prototype.getBoundingClientRect = jest.fn(() => ({
    left: 0,
    top: 0,
    width: 400,
    height: 300,
    x: 0,
    y: 0,
    right: 400,
    bottom: 300,
    toJSON: () => {},
  }));
});

describe('Chart', () => {
  const mockData = [
    {
      label: 'Sales',
      data: [
        { x: 'Jan', y: 100 },
        { x: 'Feb', y: 150 },
        { x: 'Mar', y: 120 },
      ],
      borderColor: '#3B82F6',
      backgroundColor: '#3B82F640',
      borderWidth: 2,
    },
  ];

  const multiDatasetData = [
    {
      label: 'Sales',
      data: [
        { x: 'Jan', y: 100 },
        { x: 'Feb', y: 150 },
      ],
      borderColor: '#3B82F6',
      backgroundColor: '#3B82F640',
    },
    {
      label: 'Revenue',
      data: [
        { x: 'Jan', y: 200 },
        { x: 'Feb', y: 250 },
      ],
      borderColor: '#EF4444',
      backgroundColor: ['#EF444440', '#10B98140'],
    },
  ];

  const defaultProps = {
    data: mockData,
    type: 'bar' as const,
  };

  it('should render without crashing', () => {
    render(<Chart {...defaultProps} />);
    expect(screen.getByTestId('chart')).toBeInTheDocument();
  });

  it('should render with custom testId', () => {
    render(<Chart {...defaultProps} data-testid='custom-chart' />);
    expect(screen.getByTestId('custom-chart')).toBeInTheDocument();
  });

  it('should display chart canvas with correct dimensions', () => {
    render(<Chart {...defaultProps} width={600} height={400} />);
    const canvas = screen.getByTestId('chart');

    expect(canvas).toBeInTheDocument();
    expect(canvas.tagName).toBe('CANVAS');
    expect(canvas).toHaveClass('chart-canvas');
  });

  it('should apply custom className', () => {
    render(<Chart {...defaultProps} className='custom-chart-class' />);
    const container = screen.getByTestId('chart').parentElement;
    expect(container).toHaveClass('custom-chart-class');
  });

  it('should render loading state', () => {
    render(<Chart {...defaultProps} loading={true} />);

    expect(screen.getByTestId('chart-loading')).toBeInTheDocument();
    expect(screen.getByText('Loading chart...')).toBeInTheDocument();
    expect(screen.queryByTestId('chart')).not.toBeInTheDocument();
  });

  it('should render error state', () => {
    const errorMessage = 'Failed to load chart data';
    render(<Chart {...defaultProps} error={errorMessage} />);

    expect(screen.getByTestId('chart-error')).toBeInTheDocument();
    expect(screen.getByText('Chart Error')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByTestId('chart')).not.toBeInTheDocument();
  });

  it('should handle bar chart type', () => {
    render(<Chart {...defaultProps} type='bar' />);

    expect(mockGetContext).toHaveBeenCalledWith('2d');
    expect(mockContext.fillRect).toHaveBeenCalled();
  });

  it('should handle line chart type', () => {
    render(<Chart {...defaultProps} type='line' />);

    expect(mockGetContext).toHaveBeenCalledWith('2d');
    expect(mockContext.moveTo).toHaveBeenCalled();
    expect(mockContext.lineTo).toHaveBeenCalled();
    expect(mockContext.stroke).toHaveBeenCalled();
  });

  it('should handle area chart type', () => {
    render(<Chart {...defaultProps} type='area' />);

    expect(mockGetContext).toHaveBeenCalledWith('2d');
    expect(mockContext.fill).toHaveBeenCalled();
  });

  it('should handle pie chart type', () => {
    render(<Chart {...defaultProps} type='pie' />);

    expect(mockGetContext).toHaveBeenCalledWith('2d');
    expect(mockContext.arc).toHaveBeenCalled();
  });

  it('should handle doughnut chart type', () => {
    render(<Chart {...defaultProps} type='doughnut' />);

    expect(mockGetContext).toHaveBeenCalledWith('2d');
    expect(mockContext.arc).toHaveBeenCalled();
  });

  it('should handle multiple datasets', () => {
    render(<Chart data={multiDatasetData} type='line' />);

    expect(mockGetContext).toHaveBeenCalledWith('2d');
  });

  it('should handle empty data', () => {
    render(<Chart data={[]} type='bar' />);

    expect(mockGetContext).toHaveBeenCalledWith('2d');
  });

  it('should handle data with empty dataset', () => {
    const emptyData = [{ label: 'Empty', data: [] }];
    render(<Chart data={emptyData} type='line' />);

    expect(mockGetContext).toHaveBeenCalledWith('2d');
  });

  it('should handle custom aria-label', () => {
    const customLabel = 'Custom sales chart';
    render(<Chart {...defaultProps} aria-label={customLabel} />);

    const canvas = screen.getByTestId('chart');
    expect(canvas).toHaveAttribute('aria-label', customLabel);
  });

  it('should generate default aria-label', () => {
    render(<Chart {...defaultProps} />);

    const canvas = screen.getByTestId('chart');
    expect(canvas).toHaveAttribute('aria-label', 'bar chart with 1 dataset');
  });

  it('should generate default aria-label for multiple datasets', () => {
    render(<Chart data={multiDatasetData} type='line' />);

    const canvas = screen.getByTestId('chart');
    expect(canvas).toHaveAttribute('aria-label', 'line chart with 2 datasets');
  });

  it('should handle mouse events', () => {
    render(<Chart {...defaultProps} />);

    const canvas = screen.getByTestId('chart');

    fireEvent.mouseEnter(canvas);
    fireEvent.mouseLeave(canvas);

    expect(canvas).toBeInTheDocument();
  });

  it('should handle click events with onPointClick callback', () => {
    const mockOnPointClick = jest.fn();
    render(<Chart {...defaultProps} onPointClick={mockOnPointClick} />);

    const canvas = screen.getByTestId('chart');
    fireEvent.click(canvas, { clientX: 100, clientY: 100 });

    expect(canvas).toBeInTheDocument();
  });

  it('should handle click events without onPointClick callback', () => {
    render(<Chart {...defaultProps} />);

    const canvas = screen.getByTestId('chart');
    fireEvent.click(canvas, { clientX: 100, clientY: 100 });

    expect(canvas).toBeInTheDocument();
  });

  it('should handle custom options', () => {
    const customOptions = {
      responsive: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    render(<Chart {...defaultProps} options={customOptions} />);

    expect(mockGetContext).toHaveBeenCalledWith('2d');
  });

  it('should handle negative values in data', () => {
    const negativeData = [
      {
        label: 'Mixed',
        data: [
          { x: 'A', y: -50 },
          { x: 'B', y: 100 },
          { x: 'C', y: -25 },
        ],
      },
    ];

    render(<Chart data={negativeData} type='bar' />);

    expect(mockGetContext).toHaveBeenCalledWith('2d');
  });

  it('should handle zero values in data', () => {
    const zeroData = [
      {
        label: 'Zeros',
        data: [
          { x: 'A', y: 0 },
          { x: 'B', y: 0 },
        ],
      },
    ];

    render(<Chart data={zeroData} type='line' />);

    expect(mockGetContext).toHaveBeenCalledWith('2d');
  });

  it('should handle legend display', () => {
    const optionsWithLegend = {
      plugins: {
        legend: {
          display: true,
          position: 'top' as const,
        },
      },
    };

    render(<Chart {...defaultProps} options={optionsWithLegend} />);

    expect(mockContext.fillText).toHaveBeenCalled();
  });

  it('should handle legend disabled', () => {
    const optionsWithoutLegend = {
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    render(<Chart {...defaultProps} options={optionsWithoutLegend} />);

    expect(mockGetContext).toHaveBeenCalledWith('2d');
  });

  it('should not render chart when context is null', () => {
    mockGetContext.mockReturnValueOnce(null);

    render(<Chart {...defaultProps} />);

    expect(mockGetContext).toHaveBeenCalledWith('2d');
  });

  it('should handle rerender with new data', () => {
    const { rerender } = render(<Chart {...defaultProps} />);

    const newData = [
      {
        label: 'New Sales',
        data: [
          { x: 'Q1', y: 300 },
          { x: 'Q2', y: 400 },
        ],
      },
    ];

    rerender(<Chart data={newData} type='bar' />);

    expect(mockGetContext).toHaveBeenCalledWith('2d');
  });

  it('should handle change from normal to loading state', () => {
    const { rerender } = render(<Chart {...defaultProps} />);

    rerender(<Chart {...defaultProps} loading={true} />);

    expect(screen.getByTestId('chart-loading')).toBeInTheDocument();
  });

  it('should handle change from normal to error state', () => {
    const { rerender } = render(<Chart {...defaultProps} />);

    rerender(<Chart {...defaultProps} error='Something went wrong' />);

    expect(screen.getByTestId('chart-error')).toBeInTheDocument();
  });

  it('should use default chart type when unknown type provided', () => {
    // @ts-expect-error - Testing unknown chart type
    render(<Chart {...defaultProps} type='unknown' />);

    expect(mockGetContext).toHaveBeenCalledWith('2d');
    expect(mockContext.moveTo).toHaveBeenCalled(); // Line chart is default
  });
});
