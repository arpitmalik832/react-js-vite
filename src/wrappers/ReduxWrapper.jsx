import { Provider } from 'react-redux';

import store from '../redux/store';

const ReduxWrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxWrapper;
