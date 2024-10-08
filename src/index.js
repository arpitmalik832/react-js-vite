/**
 * This is the entry point of the application.
 * @file This file is saved as `index.js`.
 */
import {
  SWRegistration,
  APP,
} from '@arpitmalik832/react-js-rollup-monorepo-library';

// eslint-disable-next-line import/extensions
import('./bootstrap.jsx').then(({ mount }) =>
  mount(document.getElementById('app')),
);

SWRegistration.register();

if (process.env.NODE_ENV !== APP.ENVS.PROD) {
  import('@arpitmalik832/react-js-rollup-monorepo-library').then(
    ({ reportWebVitals: func }) => func(),
  );
}
