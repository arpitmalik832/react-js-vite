/**
 * Abc Test unit tests.
 * @file This file is saved as `Abc.test.jsx`.
 */
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import Component from '../Abc';

describe('Unit tests for Abc Page', () => {
  afterEach(cleanup);
  it('snapshot test', () => {
    const component = render(<Component />);

    expect(component).toMatchSnapshot();
  });
});
