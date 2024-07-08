import { ENVS } from '../configs/app';

const log = (...args) => {
  if (process.env.NODE_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};

const errorLog = (...args) => {
  if (process.env.NODE_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.error(...args);
  }
};

const warnLog = (...args) => {
  if (process.env.NODE_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.warn(...args);
  }
};

const debugLog = (...args) => {
  if (process.env.NODE_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.debug(...args);
  }
};

const traceLog = (...args) => {
  if (process.env.NODE_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.trace(...args);
  }
};

const tableLog = (...args) => {
  if (process.env.NODE_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.table(...args);
  }
};

const infoLog = (...args) => {
  if (process.env.NODE_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.info(...args);
  }
};

const isLocalhost = () =>
  Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.0/8 are considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
      ),
  );

export {
  log,
  errorLog,
  warnLog,
  debugLog,
  traceLog,
  tableLog,
  infoLog,
  isLocalhost,
};
