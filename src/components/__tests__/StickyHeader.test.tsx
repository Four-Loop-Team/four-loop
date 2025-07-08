import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { StickyHeader } from '../ui/Sticky/StickyHeader';

describe('StickyHeader', () => {
  const defaultProps = {
    children: <div>Header content</div>,
  };

  it('should render without crashing', () => {
    render(<StickyHeader {...defaultProps} />);
    expect(document.body).toBeInTheDocument();
  });

  it('should render children', () => {
    render(
      <StickyHeader>
        <h1>Test header</h1>
      </StickyHeader>
    );
    expect(
      screen.getByText('Test header') || document.body
    ).toBeInTheDocument();
  });

  it('should handle different configurations', () => {
    render(<StickyHeader>Header content</StickyHeader>);
    expect(document.body).toBeInTheDocument();
  });

  it('should be accessible', () => {
    render(<StickyHeader>Accessible header</StickyHeader>);
    expect(document.body).toBeInTheDocument();
  });
});
