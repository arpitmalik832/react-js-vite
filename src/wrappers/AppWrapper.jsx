import App from '../App';
import ReduxWrapper from './ReduxWrapper';

const AppWrapper = () => (
  <ReduxWrapper>
    <App />
  </ReduxWrapper>
);

export default AppWrapper;
