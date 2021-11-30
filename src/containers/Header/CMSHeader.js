import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout, userSelector } from 'containers/Login/reducer';
import Logo from 'assets/logo-satu.jpg';

export const CMSHeader = () => {
  const history = useHistory();
  const user = useSelector(userSelector);
  const { t } = useTranslation();

  const goTo = (params) => () => history.push(params);

  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(logout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <nav className="sdp-cms-header navbar navbar-light border-bottom-gray-stroke">
      <div className="container-fluid pr-0">
        <img src={Logo} alt="brand-logo" />
        <ul className="nav justify-content-end">
          <li className="my-11">
            <button onClick={goTo('/home')} className="br-6 border-gray-stroke px-16 py-9">
              Portal SDI
            </button>
          </li>
          <li className="d-flex justify-content-end flex-row align-items-center my-19 bg-gray-lighter">
            <NavDropdown title={user?.name || 'Achmad Adam'} id="user-nav-dropdown" className="user-nav h-100">
              <NavDropdown.Item>{t('header.userNav.changePassword')}</NavDropdown.Item>
              <NavDropdown.Item>{t('header.userNav.privacyPolicy')}</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>{t('header.userNav.signOut')}</NavDropdown.Item>
            </NavDropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
};
