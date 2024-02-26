import renderer from 'react-test-renderer';
import App from './page';

it('renders without crashing', () => {
  const component = renderer.create(<App />);
  const app = component.toJSON();
  expect(app).toBeTruthy();
});
