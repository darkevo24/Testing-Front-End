import { useKeycloak } from '@react-keycloak/web';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { userSelector } from 'containers/Login/reducer';
import Logo from 'assets/logo-satu.jpg';
import { removeAllCookie } from 'utils/cookie';

export const CMSHeader = () => {
  const history = useHistory();
  const user = useSelector(userSelector);
  const { t } = useTranslation();

  const goTo = (params) => () => history.push(params);

  const { keycloak } = useKeycloak();

  return (
    <nav className="sdp-cms-header navbar navbar-light border-bottom-gray-stroke">
      <div className="container-fluid pr-0 hpx-56">
        <img src={Logo} alt="brand-logo" />
        <ul className="nav d-flex align-items-center justify-content-end h-100">
          <Button onClick={goTo('/home')} variant="outline-secondary" className="br-6 hpx-35">
            {t('header.userNav.sdiPortal')}
          </Button>
          <li className="d-flex justify-content-end flex-row align-items-center h-100">
            <NavDropdown title={user?.nama || 'Achmad Adam'} id="user-nav-dropdown" className="user-nav h-100">
              <NavDropdown.Item onClick={goTo('/change-user-password')}>
                {t('header.userNav.changePassword')}
              </NavDropdown.Item>
              <NavDropdown.Item>{t('header.userNav.privacyPolicy')}</NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  removeAllCookie();
                  keycloak.logout();
                }}>
                {t('header.userNav.signOut')}
              </NavDropdown.Item>
            </NavDropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
};
