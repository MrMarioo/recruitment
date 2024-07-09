import renderer from 'react-test-renderer';

import App from '@/src/App';
import '@testing-library/jest-dom';

describe('App', () => {
  it('should match snapshot', () => {
    const snapshot = renderer.create(<App />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
