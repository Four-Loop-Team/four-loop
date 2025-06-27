import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Card, { CardContent, CardFooter, CardHeader } from '../Card';

describe('Card Accessibility Tests', () => {
  it('should have no accessibility violations - basic card', async () => {
    const { container } = render(
      <Card>
        <p>Basic card content</p>
      </Card>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations - card with all components', async () => {
    const { container } = render(
      <Card>
        <CardHeader title='Product Title' subtitle='Product description' />
        <CardContent>
          <p>This is the main content of the card with detailed information.</p>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </CardContent>
        <CardFooter>
          <button type='button'>Primary Action</button>
          <button type='button'>Secondary Action</button>
        </CardFooter>
      </Card>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations - card with semantic roles', async () => {
    const { container } = render(
      <Card role='article' aria-labelledby='card-title'>
        <CardHeader
          title='Article Title'
          subtitle='Published on June 26, 2025'
        />
        <CardContent>
          <p>This is an article about accessibility in React components.</p>
        </CardContent>
        <CardFooter>
          <a href='/read-more' aria-label='Read more about accessibility'>
            Read More
          </a>
        </CardFooter>
      </Card>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations - interactive card', async () => {
    const { container } = render(
      <Card
        hoverable
        role='button'
        tabIndex={0}
        aria-label='Interactive product card'
      >
        <CardHeader title='Interactive Product' />
        <CardContent>
          <p>Click this entire card to view product details.</p>
        </CardContent>
      </Card>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations - card with form elements', async () => {
    const { container } = render(
      <Card>
        <CardHeader title='Contact Form' />
        <CardContent>
          <form>
            <div>
              <label htmlFor='name'>Name:</label>
              <input type='text' id='name' name='name' required />
            </div>
            <div>
              <label htmlFor='email'>Email:</label>
              <input type='email' id='email' name='email' required />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <button type='submit'>Submit</button>
          <button type='reset'>Reset</button>
        </CardFooter>
      </Card>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations - nested cards', async () => {
    const { container } = render(
      <div>
        <Card>
          <CardHeader title='Parent Card' />
          <CardContent>
            <p>This card contains other cards:</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Card variant='outlined'>
                <CardContent>
                  <h4>Nested Card 1</h4>
                  <p>First nested card content</p>
                </CardContent>
              </Card>
              <Card variant='outlined'>
                <CardContent>
                  <h4>Nested Card 2</h4>
                  <p>Second nested card content</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
