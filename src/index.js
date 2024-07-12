import { ENVS } from './configs/app';
import SWRegistration from './services/SWRegistration';

import('./bootstrap').then(({ mount }) =>
  mount(document.getElementById('app')),
);

SWRegistration.register();

if (process.env.NODE_ENV !== ENVS.PROD) {
  import('./utils/reportWebVitals').then(({ default: func }) => func());
}
