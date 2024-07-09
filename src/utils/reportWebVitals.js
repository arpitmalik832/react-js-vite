import { onLCP, onFID, onCLS, onFCP, onTTFB } from 'web-vitals';

import { log } from './commonUtils';

const reportWebVitals = () => {
  onCLS(log);
  onFID(log);
  onLCP(log);
  onFCP(log);
  onTTFB(log);
};

export default reportWebVitals;
