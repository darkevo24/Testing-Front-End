import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { AdminHeader } from 'containers/Header';
import { CMSHeader } from 'containers/Header/CMSHeader';
import { tokenSelector } from 'containers/Login/reducer';
import { CMSSidebar } from 'components/Sidebars/CMSSidebar';

export const AdminAuthLayout = ({ children }) => {
  return <div className="auth-container admin-auth-container">{children}</div>;
};

export const AdminAppLayout = ({ children }) => {
  return (
    <div className="app-container admin-app-container">
      <AdminHeader />
      {children}
    </div>
  );
};

export const CMSAppLayout = ({ children }) => {
  const Sidebar = window.location.pathname !== '/cms/dashboard' ? CMSSidebar : 'div';
  return (
    <div className="app-container admin-app-container">
      <CMSHeader />
      <div className="d-flex">
        <Sidebar />
        <div style={{ width: '100%' }}>{children}</div>
      </div>
    </div>
  );
};

export const AdminLayout = ({ children }) => {
  const token = useSelector(tokenSelector);
  const Layout = !!token ? AdminAppLayout : AdminAuthLayout;
  return <Layout>{children}</Layout>;
};

export const CMSLayout = ({ children }) => {
  const token = useSelector(tokenSelector);
  const Layout = !!token ? CMSAppLayout : AdminAuthLayout;
  return <Layout>{children}</Layout>;
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useSelector(tokenSelector);
  return <Route {...rest} render={(props) => (token ? <Component {...props} /> : <Redirect to="/admin/login" />)} />;
};

export const PublicRoute = ({ component: Component, ...rest }) => {
  const token = useSelector(tokenSelector);
  return <Route {...rest} render={(props) => (!token ? <Component {...props} /> : <Redirect to="/admin/dafter" />)} />;
};

AdminLayout.PrivateRoute = PrivateRoute;
AdminLayout.PublicRoute = PublicRoute;

CMSLayout.PrivateRoute = PrivateRoute;
CMSLayout.PublicRoute = PublicRoute;

export default AdminLayout;
