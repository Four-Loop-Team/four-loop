import { redirect } from 'next/navigation';
import WorkPage from '../page';

// Mock the redirect function
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

const mockedRedirect = redirect as jest.MockedFunction<typeof redirect>;

describe('WorkPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('redirects to homepage', () => {
    // Create the component but don't render it since it redirects
    const component = WorkPage();

    // Verify redirect was called with correct path
    expect(mockedRedirect).toHaveBeenCalledWith('/');

    // Component should return null
    expect(component).toBeNull();
  });

  test('calls redirect on component instantiation', () => {
    WorkPage();

    expect(mockedRedirect).toHaveBeenCalledTimes(1);
    expect(mockedRedirect).toHaveBeenCalledWith('/');
  });
});
