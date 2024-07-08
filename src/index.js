import { ENVS } from './configs/app';

import('./bootstrap').then(({ mount }) =>
  mount(document.getElementById('app')),
);

if (process.env.NODE_ENV !== ENVS.PROD) {
  import('./utils/reportWebVitals').then(({ default: func }) => func());
}
