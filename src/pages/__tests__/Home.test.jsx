import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Component from '../Home';

jest.mock('../../components/atoms/Button', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-button" />),
}));

jest.mock('../../hooks/useBackPress', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Unit tests for Home Page', () => {
  afterEach(cleanup);
  it('snapshot test', () => {
    const component = render(<Component />);

    expect(component).toMatchSnapshot();
  });
});
