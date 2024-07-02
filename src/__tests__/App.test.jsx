import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('snapshot test for component', () => {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
  });

  it('renders the app component', () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId('button'));
  });
});
