import { useSelector } from 'react-redux';
import { AdminHeader } from '../containers/Header';

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

export default function AdminLayout({ children }) {
  const isLoggedIn = useSelector((state) => state?.admin?.auth);
  const Layout = isLoggedIn ? AdminAppLayout : AdminAuthLayout;
  return <Layout>{children}</Layout>;
}
