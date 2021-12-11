import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Header } from 'containers/Header';
import { Footer } from 'containers/Footer';
import { tokenSelector } from 'containers/Login/reducer';

export const MemberAppLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <div className="sdp-container">{children}</div>
      <Footer />
    </div>
  );
};

export const MemberAuthLayout = ({ children }) => {
  return <div className="app-container app-auth-container">{children}</div>;
};

export const AppLayout = ({ children }) => {
  const token = useSelector(tokenSelector);
  const Layout = !!token ? MemberAppLayout : MemberAppLayout;
  return <Layout>{children}</Layout>;
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useSelector(tokenSelector);
  return <Route {...rest} render={(props) => (token ? <Component {...props} /> : <Redirect to="/home" />)} />;
};

export const PublicRoute = ({ component: Component, ...rest }) => {
  const token = useSelector(tokenSelector);
  return <Route {...rest} render={(props) => (!token ? <Component {...props} /> : <Redirect to="/home" />)} />;
};

AppLayout.PrivateRoute = PrivateRoute;
AppLayout.PublicRoute = PublicRoute;

export default AppLayout;
