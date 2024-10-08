/**
 * This is the entry point of the application.
 * @file This file is saved as `index.js`.
 */
import { SWRegistration } from '@arpitmalik832/react-js-rollup-monorepo-library';

import { ENVS } from '../build_utils/config/index.mjs';

// eslint-disable-next-line import/extensions
import('./bootstrap.jsx').then(({ mount }) =>
  mount(document.getElementById('app')),
);

SWRegistration.register();

if (process.env.APP_ENV !== ENVS.PROD) {
  import('@arpitmalik832/react-js-rollup-monorepo-library').then(
    ({ reportWebVitals: func }) => func(),
  );
}
