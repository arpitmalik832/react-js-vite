/**
 * This file is used to export the store based on the environment.
 * @file This file is saved as `redux/store.js`.
 */
import { APP } from '@arpitmalik832/react-js-rollup-monorepo-library';

import devStore from './store.dev.mjs';
import prodStore from './store.prod.mjs';

const store = process.env.NODE_ENV === APP.ENVS.PROD ? prodStore : devStore;

export default store;
