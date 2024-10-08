/**
 * This file is used to create the router for the application.
 * @file This file is saved as `routes/index.jsx`.
 */
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ComponentWithSuspense } from '@arpitmalik832/react-js-rollup-monorepo-library';

import PageWrapper from '../components/organisms/PageWrapper';
import routes from './routes';

const Error = lazy(
  () => import(/* webpackChunkName: 'Error' */ '../pages/Error'),
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageWrapper />,
    errorElement: <ComponentWithSuspense component={<Error />} />,
    children: [...routes],
  },
]);

export default router;
