import { RouterProvider } from 'react-router-dom';

import router from './routes';
import useAppMount from './hooks/useAppMount';

const App = () => {
  useAppMount();

  return <RouterProvider router={router} />;
};

export default App;
