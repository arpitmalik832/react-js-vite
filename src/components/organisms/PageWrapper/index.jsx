import { Outlet } from 'react-router-dom';

const PageWrapper = () => (
  <div>
    Page Wrapper
    <Outlet />
  </div>
);

export default PageWrapper;
