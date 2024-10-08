/**
 * This file contains the bootstrap logic for mounting the React application.
 * @file This file is saved as `src/bootstrap.jsx`.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import AppProvider from './providers/AppProvider';

/**
 * Mounts the React application to the provided DOM element.
 * @param {HTMLElement} ele - The DOM element to mount the React application to.
 * @returns {Function} A function to unmount the React application.
 * @example
 * const unmount = mount(document.getElementById('root'));
 * // To unmount the application
 * unmount();
 */
function mount(ele) {
  const root = createRoot(ele);

  root.render(
    <StrictMode>
      <AppProvider />
    </StrictMode>,
  );

  return () => queueMicrotask(() => root.unmount());
}

export { mount };
