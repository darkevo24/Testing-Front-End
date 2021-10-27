import { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { logout } from 'containers/Login/reducer';
import Logo from 'assets/logo-satu.jpg';
import './header.scss';

export const AdminHeader = () => {
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, []);
  return (
    <nav className="sdp-header navbar navbar-light border-bottom">
      <div className="container-fluid px-24">
        <img src={Logo} alt="" />
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};
