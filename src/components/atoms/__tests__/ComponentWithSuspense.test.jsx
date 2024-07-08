import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import ComponentWithSuspense from '../ComponentWithSuspense';

jest.mock('../../organisms/Loader', () => ({
  default: jest.fn(() => <div data-testid="mock-loader" />),
}));

describe('ComponentWithSuspense unit tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('ComponentWithSuspense snapshot test', () => {
    const Component = () => <div data-testid="mock-component" />;

    const component = render(
      <ComponentWithSuspense component={<Component />} />,
    );

    expect(component).toMatchSnapshot();
  });

  test('ComponentWithSuspense with fallback', () => {
    const Component = () => <div data-testid="mock-component" />;
    const Fallback = () => <div data-testid="mock-fallback" />;

    const { getByTestId } = render(
      <ComponentWithSuspense
        component={<Component />}
        fallback={<Fallback />}
      />,
    );

    expect(getByTestId('mock-component')).toBeInTheDocument();
  });
});
