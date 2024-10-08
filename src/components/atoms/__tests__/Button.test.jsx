/**
 * Button unit tests.
 * @file The file is saved as `Button.test.jsx`.
 */
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Component from '../Button';

jest.mock('@arpitmalik832/react-js-rollup-monorepo-library', () => ({
  slices: {
    updateStore: jest.fn(),
  },
  useDispatch: jest.fn(() => () => jest.fn()),
}));

describe('Button unit tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('Button snapshot test', () => {
    const component = render(<Component />);

    expect(component).toMatchSnapshot();
  });

  it('Button renders correctly', () => {
    const { getByTestId } = render(<Component />);

    expect(getByTestId('button')).toHaveTextContent('Button');
    fireEvent.click(getByTestId('button'));
  });
});
