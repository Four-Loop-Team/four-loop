/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import renderer from 'react-test-renderer';
import App from './page';

it('renders without crashing', () => {
  const component = renderer.create(<App />);
  const app = component.toJSON();
  expect(app).toBeTruthy();
});
