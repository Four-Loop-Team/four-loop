import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Sticky } from '../ui/Sticky/Sticky';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

mockIntersectionObserver.mockImplementation(
  (callback: IntersectionObserverCallback) => ({
    observe: mockObserve,
    disconnect: mockDisconnect,
    unobserve: jest.fn(),
    callback,
  })
);

// Set up global IntersectionObserver mock
global.IntersectionObserver = mockIntersectionObserver;

describe('Sticky', () => {
  beforeEach(() => {
    mockIntersectionObserver.mockClear();
    mockObserve.mockClear();
    mockDisconnect.mockClear();
  });

  const defaultProps = {
    children: <div>Sticky content</div>,
  };

  it('should render without crashing', () => {
    render(<Sticky {...defaultProps} />);
    expect(screen.getByTestId('sticky')).toBeInTheDocument();
  });

  it('should render children correctly', () => {
    render(
      <Sticky>
        <div>Test sticky content</div>
      </Sticky>
    );
    expect(screen.getByText('Test sticky content')).toBeInTheDocument();
  });

  it('should apply custom testId', () => {
    render(
      <Sticky data-testid='custom-sticky'>
        <div>Content</div>
      </Sticky>
    );
    expect(screen.getByTestId('custom-sticky')).toBeInTheDocument();
  });

  describe('positioning', () => {
    it('should apply top position styles by default', () => {
      render(<Sticky>Content</Sticky>);
      const element = screen.getByTestId('sticky');

      expect(element).toHaveStyle({
        position: 'sticky',
        top: '0px',
        'z-index': '1000',
      });
    });

    it('should apply bottom position styles', () => {
      render(
        <Sticky position='bottom' offset={20}>
          Content
        </Sticky>
      );
      const element = screen.getByTestId('sticky');

      expect(element).toHaveStyle({
        position: 'sticky',
        bottom: '20px',
        'z-index': '1000',
      });
    });

    it('should apply left position styles', () => {
      render(
        <Sticky position='left' offset='2rem'>
          Content
        </Sticky>
      );
      const element = screen.getByTestId('sticky');

      expect(element).toHaveStyle({
        position: 'sticky',
        left: '2rem',
        'z-index': '1000',
      });
    });

    it('should apply right position styles', () => {
      render(
        <Sticky position='right' offset={15}>
          Content
        </Sticky>
      );
      const element = screen.getByTestId('sticky');

      expect(element).toHaveStyle({
        position: 'sticky',
        right: '15px',
        'z-index': '1000',
      });
    });

    it('should handle string offset values', () => {
      render(
        <Sticky position='top' offset='1.5rem'>
          Content
        </Sticky>
      );
      const element = screen.getByTestId('sticky');

      expect(element).toHaveStyle({
        top: '1.5rem',
      });
    });

    it('should apply custom zIndex', () => {
      render(<Sticky zIndex={2000}>Content</Sticky>);
      const element = screen.getByTestId('sticky');

      expect(element).toHaveStyle({
        'z-index': '2000',
      });
    });
  });

  describe('fixed positioning', () => {
    it('should use fixed positioning when fixed prop is true', () => {
      render(<Sticky fixed>Content</Sticky>);
      const element = screen.getByTestId('sticky');

      expect(element).toHaveStyle({
        position: 'fixed',
      });
      expect(element).toHaveClass('fixed');
    });

    it('should not set up IntersectionObserver when fixed is true', () => {
      render(<Sticky fixed>Content</Sticky>);

      expect(mockIntersectionObserver).not.toHaveBeenCalled();
      expect(mockObserve).not.toHaveBeenCalled();
    });

    it('should use sticky positioning by default', () => {
      render(<Sticky>Content</Sticky>);
      const element = screen.getByTestId('sticky');

      expect(element).toHaveStyle({
        position: 'sticky',
      });
      expect(element).toHaveClass('sticky');
    });
  });

  describe('IntersectionObserver integration', () => {
    it('should set up IntersectionObserver for sticky positioning', () => {
      render(<Sticky>Content</Sticky>);

      expect(mockIntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          threshold: 1,
          rootMargin: '-0px 0px 0px 0px',
        })
      );
      expect(mockObserve).toHaveBeenCalled();
    });

    it('should set correct rootMargin with numeric offset', () => {
      render(<Sticky offset={25}>Content</Sticky>);

      expect(mockIntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          rootMargin: '-25px 0px 0px 0px',
        })
      );
    });

    it('should handle string offset in rootMargin', () => {
      render(<Sticky offset='2rem'>Content</Sticky>);

      expect(mockIntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          rootMargin: '-0px 0px 0px 0px', // String offsets default to 0 in rootMargin
        })
      );
    });

    it('should update stuck state when intersection changes', async () => {
      let intersectionCallback: IntersectionObserverCallback;

      mockIntersectionObserver.mockImplementation(
        (callback: IntersectionObserverCallback) => {
          intersectionCallback = callback;
          return {
            observe: mockObserve,
            disconnect: mockDisconnect,
            unobserve: jest.fn(),
          };
        }
      );

      render(<Sticky>Content</Sticky>);
      const element = screen.getByTestId('sticky');

      // Initially not stuck
      expect(element).toHaveAttribute('data-stuck', 'false');

      // Simulate intersection change (element not intersecting = stuck)
      if (intersectionCallback!) {
        const mockEntries: IntersectionObserverEntry[] = [
          {
            isIntersecting: false,
            target: element,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRatio: 0,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: {} as DOMRectReadOnly,
            time: Date.now(),
          },
        ];
        const mockObserver = {} as IntersectionObserver;
        intersectionCallback(mockEntries, mockObserver);
      }

      await waitFor(() => {
        expect(element).toHaveAttribute('data-stuck', 'true');
      });

      // Simulate intersection change (element intersecting = not stuck)
      if (intersectionCallback!) {
        const mockEntries: IntersectionObserverEntry[] = [
          {
            isIntersecting: true,
            target: element,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRatio: 1,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: {} as DOMRectReadOnly,
            time: Date.now(),
          },
        ];
        const mockObserver = {} as IntersectionObserver;
        intersectionCallback(mockEntries, mockObserver);
      }

      await waitFor(() => {
        expect(element).toHaveAttribute('data-stuck', 'false');
      });
    });

    it('should disconnect observer on unmount', () => {
      const { unmount } = render(<Sticky>Content</Sticky>);

      unmount();

      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('should reconnect observer when offset changes', () => {
      const { rerender } = render(<Sticky offset={10}>Content</Sticky>);

      expect(mockDisconnect).toHaveBeenCalledTimes(0);

      rerender(<Sticky offset={20}>Content</Sticky>);

      expect(mockDisconnect).toHaveBeenCalledTimes(1);
      expect(mockIntersectionObserver).toHaveBeenCalledTimes(2);
    });
  });

  describe('responsive breakpoints', () => {
    it('should apply responsive classes for small breakpoint', () => {
      render(<Sticky breakpoint='sm'>Content</Sticky>);
      const element = screen.getByTestId('sticky');

      expect(element).toHaveClass('sm:sticky');
    });

    it('should apply responsive classes for medium breakpoint', () => {
      render(<Sticky breakpoint='md'>Content</Sticky>);
      const element = screen.getByTestId('sticky');

      expect(element).toHaveClass('md:sticky');
    });

    it('should apply responsive classes for large breakpoint', () => {
      render(<Sticky breakpoint='lg'>Content</Sticky>);
      const element = screen.getByTestId('sticky');

      expect(element).toHaveClass('lg:sticky');
    });

    it('should apply responsive classes for extra large breakpoint', () => {
      render(<Sticky breakpoint='xl'>Content</Sticky>);
      const element = screen.getByTestId('sticky');

      expect(element).toHaveClass('xl:sticky');
    });

    it('should handle invalid breakpoint gracefully', () => {
      render(<Sticky {...({ breakpoint: 'invalid' } as any)}>Content</Sticky>);
      const element = screen.getByTestId('sticky');

      expect(element).toHaveClass('sticky');
      expect(element).not.toHaveClass('invalid:sticky');
    });

    it('should combine breakpoint with fixed positioning', () => {
      render(
        <Sticky breakpoint='md' fixed>
          Content
        </Sticky>
      );
      const element = screen.getByTestId('sticky');

      expect(element).toHaveClass('md:fixed');
    });
  });

  describe('className and styling', () => {
    it('should apply custom className', () => {
      render(<Sticky className='custom-class'>Content</Sticky>);
      const element = screen.getByTestId('sticky');

      expect(element).toHaveClass('custom-class');
      expect(element).toHaveClass('sticky');
    });

    it('should combine multiple classes correctly', () => {
      render(
        <Sticky className='bg-white shadow-lg' breakpoint='md'>
          Content
        </Sticky>
      );
      const element = screen.getByTestId('sticky');

      expect(element).toHaveClass('md:sticky', 'bg-white', 'shadow-lg');
    });
  });

  describe('accessibility', () => {
    it('should be accessible to screen readers', () => {
      render(
        <Sticky>
          <nav aria-label='Main navigation'>
            <a href='#section1'>Section 1</a>
            <a href='#section2'>Section 2</a>
          </nav>
        </Sticky>
      );

      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(nav).toBeInTheDocument();

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2);
    });

    it('should maintain focus management', () => {
      render(
        <Sticky>
          <button>Focusable button</button>
        </Sticky>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('edge cases', () => {
    it('should handle missing element ref gracefully', () => {
      // This test ensures the useEffect doesn't crash if ref is null
      const { unmount } = render(<Sticky>Content</Sticky>);

      expect(() => unmount()).not.toThrow();
    });

    it('should handle zero offset', () => {
      render(<Sticky offset={0}>Content</Sticky>);
      const element = screen.getByTestId('sticky');

      expect(element).toHaveStyle({
        top: '0px',
      });
    });

    it('should handle negative offset', () => {
      render(<Sticky offset={-10}>Content</Sticky>);
      const element = screen.getByTestId('sticky');

      expect(element).toHaveStyle({
        top: '-10px',
      });
    });
  });
});
