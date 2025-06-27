/* eslint-disable @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-unsafe-call */
import { act, renderHook } from '@testing-library/react';
import {
  useScrollDirection,
  useScrollPosition,
  useScrollThreshold,
} from '../useScrollPosition';

// Mock throttle function from utils
jest.mock('../../utils', () => ({
  throttle: jest.fn((fn: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), 0); // Use 0 delay for tests
    };
  }),
}));

describe('useScrollPosition Hook', () => {
  let scrollEventListeners: Array<EventListener> = [];

  beforeEach(() => {
    scrollEventListeners = [];

    // Mock window scroll properties
    Object.defineProperty(window, 'pageXOffset', {
      writable: true,
      value: 0,
    });
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      value: 0,
    });

    // Mock addEventListener/removeEventListener
    jest
      .spyOn(window, 'addEventListener')
      .mockImplementation((event, listener) => {
        if (event === 'scroll') {
          scrollEventListeners.push(listener as EventListener);
        }
      });

    jest
      .spyOn(window, 'removeEventListener')
      .mockImplementation((event, listener) => {
        if (event === 'scroll') {
          const index = scrollEventListeners.indexOf(listener as EventListener);
          if (index > -1) {
            scrollEventListeners.splice(index, 1);
          }
        }
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    scrollEventListeners = [];
  });

  describe('useScrollPosition', () => {
    it('should initialize with zero scroll position', () => {
      const { result } = renderHook(() => useScrollPosition());

      expect(result.current).toEqual({ x: 0, y: 0 });
    });

    it('should set up scroll event listener on mount', () => {
      renderHook(() => useScrollPosition());

      expect(window.addEventListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );
      expect(scrollEventListeners).toHaveLength(1);
    });

    it('should update position when scroll event fires', async () => {
      const { result } = renderHook(() => useScrollPosition());

      // Change scroll position
      Object.defineProperty(window, 'pageXOffset', { value: 100 });
      Object.defineProperty(window, 'pageYOffset', { value: 200 });

      // Trigger scroll event
      act(() => {
        scrollEventListeners.forEach((listener) => {
          listener(new Event('scroll'));
        });
      });

      // Wait for throttled update
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      expect(result.current).toEqual({ x: 100, y: 200 });
    });

    it('should clean up event listener on unmount', () => {
      const { unmount } = renderHook(() => useScrollPosition());

      unmount();

      expect(window.removeEventListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );
    });

    it('should handle SSR gracefully', () => {
      const originalWindow = global.window;
      // @ts-expect-error - Temporarily removing window for SSR test
      delete global.window;

      const { result } = renderHook(() => useScrollPosition());

      expect(result.current).toEqual({ x: 0, y: 0 });

      // Restore window
      global.window = originalWindow;
    });

    it('should set initial position on mount', async () => {
      // Set initial scroll position
      Object.defineProperty(window, 'pageXOffset', { value: 50 });
      Object.defineProperty(window, 'pageYOffset', { value: 75 });

      const { result } = renderHook(() => useScrollPosition());

      // Wait for initial position update
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      expect(result.current).toEqual({ x: 50, y: 75 });
    });
  });

  describe('useScrollDirection', () => {
    it('should initialize with null direction', () => {
      const { result } = renderHook(() => useScrollDirection());

      expect(result.current).toBeNull();
    });

    it('should detect downward scroll', async () => {
      const { result } = renderHook(() => useScrollDirection());

      // Start at top
      Object.defineProperty(window, 'pageYOffset', { value: 0 });

      // Scroll down
      act(() => {
        Object.defineProperty(window, 'pageYOffset', { value: 100 });
        scrollEventListeners.forEach((listener) => {
          listener(new Event('scroll'));
        });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      expect(result.current).toBe('down');
    });

    it('should detect upward scroll', async () => {
      const { result } = renderHook(() => useScrollDirection());

      // Start scrolled down
      Object.defineProperty(window, 'pageYOffset', { value: 100 });

      // Initial scroll to set lastScrollY
      act(() => {
        scrollEventListeners.forEach((listener) => {
          listener(new Event('scroll'));
        });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      // Scroll up
      act(() => {
        Object.defineProperty(window, 'pageYOffset', { value: 50 });
        scrollEventListeners.forEach((listener) => {
          listener(new Event('scroll'));
        });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      expect(result.current).toBe('up');
    });

    it('should not change direction when scroll position is same', async () => {
      const { result } = renderHook(() => useScrollDirection());

      // Set initial position
      Object.defineProperty(window, 'pageYOffset', { value: 100 });

      act(() => {
        scrollEventListeners.forEach((listener) => {
          listener(new Event('scroll'));
        });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      const initialDirection = result.current;

      // Trigger scroll with same position
      act(() => {
        scrollEventListeners.forEach((listener) => {
          listener(new Event('scroll'));
        });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      expect(result.current).toBe(initialDirection);
    });

    it('should handle SSR gracefully', () => {
      const originalWindow = global.window;
      // @ts-expect-error - Temporarily removing window for SSR test
      delete global.window;

      const { result } = renderHook(() => useScrollDirection());

      expect(result.current).toBeNull();

      // Restore window
      global.window = originalWindow;
    });

    it('should clean up event listener on unmount', () => {
      const { unmount } = renderHook(() => useScrollDirection());

      unmount();

      expect(window.removeEventListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );
    });
  });

  describe('useScrollThreshold', () => {
    it('should return false when below default threshold', () => {
      Object.defineProperty(window, 'pageYOffset', { value: 50 });

      const { result } = renderHook(() => useScrollThreshold());

      expect(result.current).toBe(false);
    });

    it('should return true when above default threshold', async () => {
      Object.defineProperty(window, 'pageYOffset', { value: 150 });

      const { result } = renderHook(() => useScrollThreshold());

      // Wait for scroll position update
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      expect(result.current).toBe(true);
    });

    it('should use custom threshold', async () => {
      Object.defineProperty(window, 'pageYOffset', { value: 150 });

      const { result } = renderHook(() => useScrollThreshold(200));

      // Wait for scroll position update
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      expect(result.current).toBe(false);
    });

    it('should return true when above custom threshold', async () => {
      Object.defineProperty(window, 'pageYOffset', { value: 250 });

      const { result } = renderHook(() => useScrollThreshold(200));

      // Wait for scroll position update
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      expect(result.current).toBe(true);
    });

    it('should update when scroll position changes', async () => {
      const { result, rerender } = renderHook(() => useScrollThreshold(100));

      // Start below threshold
      Object.defineProperty(window, 'pageYOffset', { value: 50 });

      act(() => {
        scrollEventListeners.forEach((listener) => {
          listener(new Event('scroll'));
        });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      expect(result.current).toBe(false);

      // Scroll above threshold
      Object.defineProperty(window, 'pageYOffset', { value: 150 });

      act(() => {
        scrollEventListeners.forEach((listener) => {
          listener(new Event('scroll'));
        });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      expect(result.current).toBe(true);
    });
  });

  describe('Integration', () => {
    it('should work together with multiple hooks', async () => {
      const { result: positionResult } = renderHook(() => useScrollPosition());
      const { result: directionResult } = renderHook(() =>
        useScrollDirection()
      );
      const { result: thresholdResult } = renderHook(() =>
        useScrollThreshold(100)
      );

      // Simulate scroll down
      Object.defineProperty(window, 'pageYOffset', { value: 150 });

      act(() => {
        scrollEventListeners.forEach((listener) => {
          listener(new Event('scroll'));
        });
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      expect(positionResult.current.y).toBe(150);
      expect(directionResult.current).toBe('down');
      expect(thresholdResult.current).toBe(true);
    });
  });
});
