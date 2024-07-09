import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import PageWrapper from '../components/organisms/PageWrapper';
import routes from './routes';
import ComponentWithSuspense from '../components/atoms/ComponentWithSuspense';

const Error = lazy(() => import('../pages/Error'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageWrapper />,
    errorElement: <ComponentWithSuspense component={<Error />} />,
    children: [...routes],
  },
]);

export default router;
