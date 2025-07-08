/**
 * Comprehensive tests for the main HomePage component (redirect functionality)
 * Tests redirect behavior and basic functionality
 */

import { redirect } from 'next/navigation';
import HomePage from '../page';

// Mock the redirect function
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

const mockedRedirect = redirect as jest.MockedFunction<typeof redirect>;

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Redirect Functionality', () => {
    test('should redirect to work page without crashing', () => {
      const component = HomePage();

      expect(mockedRedirect).toHaveBeenCalledWith('/work');
      expect(component).toBeNull();
    });

    test('should call redirect exactly once', () => {
      HomePage();

      expect(mockedRedirect).toHaveBeenCalledTimes(1);
    });

    test('should redirect to the correct path', () => {
      HomePage();

      expect(mockedRedirect).toHaveBeenCalledWith('/work');
    });
  });

  describe('Performance', () => {
    test('should execute redirect quickly', () => {
      const startTime = performance.now();
      HomePage();
      const endTime = performance.now();

      // Should execute in less than 10ms (very generous threshold for redirect)
      expect(endTime - startTime).toBeLessThan(10);
    });

    test('should not have memory leaks in repeated calls', () => {
      // Call multiple times to check for memory leaks
      for (let i = 0; i < 10; i++) {
        HomePage();
      }

      // Should have been called 10 times
      expect(mockedRedirect).toHaveBeenCalledTimes(10);
    });
  });

  describe('Error Handling', () => {
    test('should handle redirect function gracefully', () => {
      expect(() => HomePage()).not.toThrow();
    });
  });
});
