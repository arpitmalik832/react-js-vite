import { Suspense } from 'react';

import Loader from '../../organisms/Loader';

const ComponentWithSuspense = ({ component, fallback = <Loader /> }) => (
  <Suspense fallback={fallback}>{component}</Suspense>
);

export default ComponentWithSuspense;
