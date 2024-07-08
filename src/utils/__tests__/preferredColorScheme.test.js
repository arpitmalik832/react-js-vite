import '@testing-library/jest-dom';

import preferredColorScheme from '../eventListeners/preferredColorScheme';
import matchMediaMock from '../../__tests__/__mocks__/matchMediaMock';

describe('preferredColorScheme unit tests', () => {
  const callBackFn = jest.fn();

  it('preferredColorScheme functions test', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => matchMediaMock(query, true)),
    });

    preferredColorScheme.callBackFn();
    preferredColorScheme.subscribe(callBackFn);
    preferredColorScheme.callBackFn();
    expect(callBackFn).toHaveBeenCalledTimes(2);
    preferredColorScheme.unSubscribe();
  });
});
