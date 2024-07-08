import '@testing-library/jest-dom';

import {
  log,
  errorLog,
  warnLog,
  isLocalhost,
  debugLog,
  traceLog,
  tableLog,
  infoLog,
} from '../commonUtils';

describe('test commonUtils', () => {
  const test = 'test';

  beforeEach(() => {
    jest.resetModules();
  });

  it('test the log function in prod env', () => {
    process.env.NODE_ENV = 'production';

    log(test);
  });

  it('test the log function in stg env', () => {
    process.env.NODE_ENV = 'staging';

    log(test);
  });

  it('test the errorLog function in prod env', () => {
    process.env.NODE_ENV = 'production';

    errorLog(test);
  });

  it('test the errorLog function in stg env', () => {
    process.env.NODE_ENV = 'staging';

    errorLog(test);
  });

  it('test the warnLog function in prod env', () => {
    process.env.NODE_ENV = 'production';

    warnLog(test);
  });

  it('test the warnLog function in stg env', () => {
    process.env.NODE_ENV = 'staging';

    warnLog(test);
  });

  it('test the debugLog function in prod env', () => {
    process.env.NODE_ENV = 'production';

    debugLog(test);
  });

  it('test the debugLog function in stg env', () => {
    process.env.NODE_ENV = 'staging';

    debugLog(test);
  });

  it('test the traceLog function in prod env', () => {
    process.env.NODE_ENV = 'production';

    traceLog(test);
  });

  it('test the traceLog function in stg env', () => {
    process.env.NODE_ENV = 'staging';

    traceLog(test);
  });

  it('test the tableLog function in prod env', () => {
    process.env.NODE_ENV = 'production';

    tableLog(test);
  });

  it('test the tableLog function in stg env', () => {
    process.env.NODE_ENV = 'staging';

    tableLog(test);
  });

  it('test the infoLog function in prod env', () => {
    process.env.NODE_ENV = 'production';

    infoLog(test);
  });

  it('test the infoLog function in stg env', () => {
    process.env.NODE_ENV = 'staging';

    infoLog(test);
  });

  it('testing the isLocalHostUtil', () => {
    // Overwrite the hostname before rendering
    delete window.location;
    window.location = { hostname: 'localhost' };

    expect(isLocalhost()).toBeTruthy();
  });

  it('testing the isLocalHostUtil', () => {
    // Overwrite the hostname before rendering
    delete window.location;
    window.location = { hostname: 'example.com' };

    expect(isLocalhost()).toBeFalsy();
  });
});
