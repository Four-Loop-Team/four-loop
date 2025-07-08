import { redirect } from 'next/navigation';
import HomePage from './page';

// Mock the redirect function
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

const mockedRedirect = redirect as jest.MockedFunction<typeof redirect>;

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to work page', () => {
    // Create the component but don't render it since it redirects
    const component = HomePage();

    // Verify redirect was called with correct path
    expect(mockedRedirect).toHaveBeenCalledWith('/work');

    // Component should return null
    expect(component).toBeNull();
  });

  it('calls redirect on component instantiation', () => {
    HomePage();

    expect(mockedRedirect).toHaveBeenCalledTimes(1);
    expect(mockedRedirect).toHaveBeenCalledWith('/work');
  });

  it('renders without crashing (before redirect)', () => {
    const component = HomePage();
    // The component function should execute without throwing
    expect(component).toBeNull();
  });
});
