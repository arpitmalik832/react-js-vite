import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import AppWrapper from './wrappers/AppWrapper';

const mount = ele => {
  const root = createRoot(ele);

  root.render(
    <StrictMode>
      <AppWrapper />
    </StrictMode>,
  );

  return () => queueMicrotask(() => root.unmount());
};

export { mount };
