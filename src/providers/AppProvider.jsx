/**
 * This provider is used to wrap the application with all the necessary Providers.
 * @file This file is saved as `providers/AppProvider.jsx`.
 */
import { ReduxProvider } from '@arpitmalik832/react-js-rollup-monorepo-library';

import App from '../App';
import store from '../redux/store/store';

/**
 * AppWrapper component that wraps the application with ReduxProvider.
 * @returns {import('react').JSX.Element} The wrapped application component.
 * @example
 * return (
 *   <AppWrapper />
 * );
 */
function AppProvider() {
  return (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );
}

export default AppProvider;
