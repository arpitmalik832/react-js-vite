/**
 * The main application component.
 * @file The file is saved as `App.jsx`.
 */
import { RouterProvider } from 'react-router-dom';

import router from './routes';
import useAppMount from './hooks/useAppMount';

/**
 * Main application component.
 * @returns {import('react').JSX.Element} The rendered application.
 * @example
 * <App />
 */
function App() {
  useAppMount();

  return <RouterProvider router={router} />;
}

export default App;
