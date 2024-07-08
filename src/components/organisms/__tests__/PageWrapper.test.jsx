import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import PageWrapper from '../PageWrapper';

describe('PageWrapper unit tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('PageWrapper snapshot test', () => {
    const component = render(<PageWrapper />);

    expect(component).toMatchSnapshot();
  });
});
