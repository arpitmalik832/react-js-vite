import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { log } from '../../../utils/commonUtils';

const PageWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    log('Route changed:', location.pathname);
  }, [location]);

  return (
    <div>
      Page Wrapper
      <Outlet />
    </div>
  );
};

export default PageWrapper;
