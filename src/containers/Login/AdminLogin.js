import { Redirect } from 'react-router-dom';

const AdminLogin = () => {
  return (
    <Redirect
      to={{
        pathname: '/home',
        params: { login: true },
      }}
    />
  );
};

export default AdminLogin;
