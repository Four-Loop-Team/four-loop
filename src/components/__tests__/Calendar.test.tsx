import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Calendar, DatePicker } from '../ui/Calendar/Calendar';

// Helper function to create consistent local dates for testing
const createTestDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  // Create local date (month is 0-indexed)
  return new Date(year, month - 1, day);
};

describe('Calendar', () => {
  const defaultProps = {
    value: createTestDate('2024-01-15'),
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(createTestDate('2024-01-15'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render without crashing', () => {
    render(<Calendar {...defaultProps} />);
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it('should display the current month and year', () => {
    render(<Calendar {...defaultProps} />);

    expect(screen.getByText('January 2024')).toBeInTheDocument();
  });

  it('should call onChange when a date is clicked', () => {
    const onChange = jest.fn();
    render(<Calendar {...defaultProps} onChange={onChange} />);

    const dateButton = screen.getByRole('button', { name: '15' });
    fireEvent.click(dateButton);
    expect(onChange).toHaveBeenCalledWith(expect.any(Date));
  });

  it('should handle multiple date selection', () => {
    const onChange = jest.fn();
    // Start with no initial value for cleaner testing
    render(<Calendar onChange={onChange} multiple />);

    const date1 = screen.getByRole('button', { name: '15' });
    const date2 = screen.getByRole('button', { name: '16' });

    // Click to select both dates
    fireEvent.click(date1);
    fireEvent.click(date2);

    expect(onChange).toHaveBeenCalledTimes(2);
    const lastCall = onChange.mock.calls[
      onChange.mock.calls.length - 1
    ][0] as Date[];
    expect(lastCall).toHaveLength(2);
    // Check dates by comparing their date components instead of exact timestamp
    const dates = lastCall.map((d: Date) => ({
      day: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear(),
    }));
    expect(dates).toEqual(
      expect.arrayContaining([
        { day: 15, month: 0, year: 2024 },
        { day: 16, month: 0, year: 2024 },
      ])
    );
  });

  it('should handle deselecting dates in multiple mode', () => {
    const onChange = jest.fn();
    // Start with a selected date
    render(
      <Calendar
        value={createTestDate('2024-01-15')}
        onChange={onChange}
        multiple
      />
    );

    const date1 = screen.getByRole('button', { name: '15' });

    // The 15th is already selected via value prop
    // Click to deselect it
    fireEvent.click(date1);

    expect(onChange).toHaveBeenCalledTimes(1);
    const lastCall = onChange.mock.calls[
      onChange.mock.calls.length - 1
    ][0] as Date[];
    expect(lastCall).toEqual([]);
  });

  it('should handle range selection', () => {
    const onChange = jest.fn();
    render(<Calendar onChange={onChange} range />);

    const startDate = screen.getByRole('button', { name: '10' });
    const endDate = screen.getByRole('button', { name: '20' });

    fireEvent.click(startDate);
    fireEvent.click(endDate);

    expect(onChange).toHaveBeenCalledTimes(2);
    const lastCall = onChange.mock.calls[
      onChange.mock.calls.length - 1
    ][0] as Date[];
    expect(lastCall).toHaveLength(2);
    // Check dates by comparing their date components
    const dates = lastCall.map((d: Date) => ({
      day: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear(),
    }));
    expect(dates).toEqual([
      { day: 10, month: 0, year: 2024 },
      { day: 20, month: 0, year: 2024 },
    ]);
  });

  it('should handle reverse range selection', () => {
    const onChange = jest.fn();
    render(<Calendar onChange={onChange} range />);

    const startDate = screen.getByRole('button', { name: '20' });
    const endDate = screen.getByRole('button', { name: '10' });

    fireEvent.click(startDate);
    fireEvent.click(endDate);

    const lastCall = onChange.mock.calls[
      onChange.mock.calls.length - 1
    ][0] as Date[];
    expect(lastCall).toHaveLength(2);
    // Check dates by comparing their date components
    const dates = lastCall.map((d: Date) => ({
      day: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear(),
    }));
    expect(dates).toEqual([
      { day: 10, month: 0, year: 2024 },
      { day: 20, month: 0, year: 2024 },
    ]);
  });

  it('should navigate to previous month', () => {
    render(<Calendar {...defaultProps} />);

    const prevButton = screen.getByRole('button', { name: 'Previous month' });
    fireEvent.click(prevButton);

    expect(screen.getByText('December 2023')).toBeInTheDocument();
  });

  it('should navigate to next month', () => {
    render(<Calendar {...defaultProps} />);

    const nextButton = screen.getByRole('button', { name: 'Next month' });
    fireEvent.click(nextButton);

    expect(screen.getByText('February 2024')).toBeInTheDocument();
  });

  it('should handle today button', () => {
    const onChange = jest.fn();
    render(<Calendar {...defaultProps} onChange={onChange} showToday />);

    const todayButton = screen.getByRole('button', { name: 'Today' });
    fireEvent.click(todayButton);

    const lastCall = onChange.mock.calls[
      onChange.mock.calls.length - 1
    ][0] as Date;
    expect(lastCall.getDate()).toBe(15);
    expect(lastCall.getMonth()).toBe(0);
    expect(lastCall.getFullYear()).toBe(2024);
  });

  it('should handle clear button', () => {
    const onChange = jest.fn();
    render(<Calendar {...defaultProps} onChange={onChange} showClear />);

    const clearButton = screen.getByRole('button', { name: 'Clear' });
    fireEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('should handle clear button in multiple mode', () => {
    const onChange = jest.fn();
    render(
      <Calendar {...defaultProps} onChange={onChange} multiple showClear />
    );

    const clearButton = screen.getByRole('button', { name: 'Clear' });
    fireEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('should respect disabled dates', () => {
    const disabledDate = createTestDate('2024-01-10');
    const onChange = jest.fn();
    render(
      <Calendar
        {...defaultProps}
        onChange={onChange}
        disabledDates={[disabledDate]}
      />
    );

    const disabledButton = screen.getByRole('button', { name: '10' });
    expect(disabledButton).toBeDisabled();

    fireEvent.click(disabledButton);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should respect min date', () => {
    const minDate = new Date('2024-01-10');
    const onChange = jest.fn();
    render(
      <Calendar {...defaultProps} onChange={onChange} minDate={minDate} />
    );

    // Date before min should be disabled
    const earlyDate = screen.getByRole('button', { name: '5' });
    fireEvent.click(earlyDate);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should respect max date', () => {
    const maxDate = new Date('2024-01-10');
    const onChange = jest.fn();
    render(
      <Calendar {...defaultProps} onChange={onChange} maxDate={maxDate} />
    );

    // Date after max should be disabled
    const lateDate = screen.getByRole('button', { name: '20' });
    fireEvent.click(lateDate);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should show week numbers when enabled', () => {
    render(<Calendar {...defaultProps} showWeekNumbers />);

    expect(screen.getByText('Wk')).toBeInTheDocument();
  });

  it('should handle different sizes', () => {
    const { rerender } = render(<Calendar {...defaultProps} size='sm' />);
    expect(screen.getByTestId('calendar')).toBeInTheDocument();

    rerender(<Calendar {...defaultProps} size='lg' />);
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it('should handle different variants', () => {
    const { rerender } = render(
      <Calendar {...defaultProps} variant='compact' />
    );
    expect(screen.getByTestId('calendar')).toBeInTheDocument();

    rerender(<Calendar {...defaultProps} variant='inline' />);
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it('should handle different first day of week', () => {
    render(<Calendar {...defaultProps} firstDayOfWeek={1} />);

    // Check that Monday appears first
    const headers = screen.getAllByText(/Mon|Tue|Wed|Thu|Fri|Sat|Sun/);
    expect(headers[0]).toHaveTextContent('Mon');
  });

  it('should handle custom date renderer', () => {
    const customRenderer = (date: Date) => `Custom ${date.getDate()}`;
    render(<Calendar {...defaultProps} renderDate={customRenderer} />);

    expect(screen.getByText('Custom 15')).toBeInTheDocument();
  });

  it('should show time picker when enabled', () => {
    render(<Calendar {...defaultProps} showTime />);

    // Click a date to show time picker
    const dateButton = screen.getByRole('button', { name: '15' });
    fireEvent.click(dateButton);

    // Time picker should be visible - check for multiple elements with "00"
    expect(screen.getAllByDisplayValue('00')).toHaveLength(2); // Hours and minutes
  });

  it('should handle locale changes', () => {
    render(<Calendar {...defaultProps} locale='es-ES' />);

    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it('should handle array value prop', () => {
    const arrayValue = [new Date('2024-01-10'), new Date('2024-01-15')];
    render(<Calendar value={arrayValue} onChange={jest.fn()} multiple />);

    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it('should handle null value prop', () => {
    render(<Calendar value={null} onChange={jest.fn()} />);

    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<Calendar {...defaultProps} className='custom-calendar' />);

    expect(screen.getByTestId('calendar')).toHaveClass('custom-calendar');
  });

  it('should use custom testId', () => {
    render(<Calendar {...defaultProps} data-testid='custom-calendar' />);

    expect(screen.getByTestId('custom-calendar')).toBeInTheDocument();
  });
});

describe('DatePicker', () => {
  const defaultProps = {
    value: createTestDate('2024-01-15'),
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(createTestDate('2024-01-15'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render input field', () => {
    render(<DatePicker {...defaultProps} />);

    // Due to timezone differences, check for the date component being present
    const input = screen.getByTestId('date-picker').querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input?.value).toMatch(/\d{2}\/\d{2}\/2024/);
  });

  it('should open calendar on input click', async () => {
    render(<DatePicker {...defaultProps} />);

    const input = screen.getByTestId('date-picker').querySelector('input');
    expect(input).toBeInTheDocument();
    fireEvent.click(input!);

    await waitFor(() => {
      expect(screen.getByText('January 2024')).toBeInTheDocument();
    });
  });

  it('should close calendar when clicking outside', async () => {
    render(<DatePicker {...defaultProps} />);

    const input = screen.getByTestId('date-picker').querySelector('input');
    expect(input).toBeInTheDocument();
    fireEvent.click(input!);

    await waitFor(() => {
      expect(screen.getByText('January 2024')).toBeInTheDocument();
    });

    // Click outside
    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.queryByText('January 2024')).not.toBeInTheDocument();
    });
  });

  it('should handle controlled open state', () => {
    const onOpenChange = jest.fn();
    render(
      <DatePicker {...defaultProps} open={true} onOpenChange={onOpenChange} />
    );

    expect(screen.getByText('January 2024')).toBeInTheDocument();
  });

  it('should handle custom placeholder', () => {
    render(
      <DatePicker value={null} onChange={jest.fn()} placeholder='Choose date' />
    );

    expect(screen.getByPlaceholderText('Choose date')).toBeInTheDocument();
  });

  it('should handle disabled state', () => {
    render(<DatePicker {...defaultProps} disabled />);

    const input = screen.getByTestId('date-picker').querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();

    fireEvent.click(input!);
    expect(screen.queryByText('January 2024')).not.toBeInTheDocument();
  });

  it('should handle readonly state', () => {
    render(<DatePicker {...defaultProps} readOnly />);

    const input = screen.getByTestId('date-picker').querySelector('input');
    expect(input).toBeInTheDocument();
    fireEvent.click(input!);

    expect(screen.queryByText('January 2024')).not.toBeInTheDocument();
  });

  it('should handle error state', () => {
    render(<DatePicker {...defaultProps} error />);

    const input = screen.getByTestId('date-picker').querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('border-red-500');
  });

  it('should handle different sizes', () => {
    const { rerender } = render(<DatePicker {...defaultProps} size='sm' />);
    const input1 = screen.getByTestId('date-picker').querySelector('input');
    expect(input1).toBeInTheDocument();

    rerender(<DatePicker {...defaultProps} size='lg' />);
    const input2 = screen.getByTestId('date-picker').querySelector('input');
    expect(input2).toBeInTheDocument();
  });

  it('should hide icon when disabled', () => {
    render(<DatePicker {...defaultProps} showIcon={false} />);

    const svg = screen.queryByRole('img', { hidden: true });
    expect(svg).not.toBeInTheDocument();
  });

  it('should handle custom trigger', () => {
    const trigger = <button>Custom trigger</button>;
    render(<DatePicker {...defaultProps} trigger={trigger} />);

    expect(
      screen.getByRole('button', { name: 'Custom trigger' })
    ).toBeInTheDocument();
  });

  it('should handle different placements', () => {
    const { rerender } = render(
      <DatePicker {...defaultProps} placement='top-start' open />
    );
    expect(screen.getByText('January 2024')).toBeInTheDocument();

    rerender(<DatePicker {...defaultProps} placement='bottom-end' open />);
    expect(screen.getByText('January 2024')).toBeInTheDocument();
  });

  it('should format array values for multiple selection', () => {
    const arrayValue = [
      createTestDate('2024-01-10'),
      createTestDate('2024-01-15'),
    ];
    render(<DatePicker value={arrayValue} onChange={jest.fn()} multiple />);

    const input = screen.getByTestId('date-picker').querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input?.value).toMatch(/\d{2}\/\d{2}\/2024, \d{2}\/\d{2}\/2024/);
  });

  it('should handle custom format', () => {
    render(<DatePicker {...defaultProps} format='DD/MM/YYYY' />);

    const input = screen.getByTestId('date-picker').querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input?.value).toMatch(/\d{2}\/\d{2}\/2024/);
  });

  it('should close dropdown after single date selection', async () => {
    render(<DatePicker value={null} onChange={jest.fn()} />);

    const input = screen.getByPlaceholderText('Select date');
    fireEvent.click(input);

    await waitFor(() => {
      expect(screen.getByText('January 2024')).toBeInTheDocument();
    });

    const dateButton = screen.getByRole('button', { name: '15' });
    fireEvent.click(dateButton);

    await waitFor(() => {
      expect(screen.queryByText('January 2024')).not.toBeInTheDocument();
    });
  });

  it('should apply custom className', () => {
    render(<DatePicker {...defaultProps} className='custom-picker' />);

    expect(screen.getByTestId('date-picker')).toHaveClass('custom-picker');
  });

  it('should use custom testId', () => {
    render(<DatePicker {...defaultProps} data-testid='custom-picker' />);

    expect(screen.getByTestId('custom-picker')).toBeInTheDocument();
  });
});
