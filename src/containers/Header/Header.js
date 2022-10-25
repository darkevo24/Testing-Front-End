import { useMemo, useState, useEffect } from 'react';
import cx from 'classnames';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import isArray from 'lodash/isArray';
import _ from 'lodash';
import get from 'lodash/get';
import map from 'lodash/map';
import { useTranslation } from 'react-i18next';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { userSelector } from 'containers/Login/reducer';
import { getAnalyticsUrl, katalogUrl } from 'utils/constants';

import { removeAllCookie } from '../../utils/cookie';
import { globalData } from '../App/reducer';
import { Roles } from 'containers/App/config';

const getPathnameFromRoute = (route) => get(route, 'link.pathname', route.link);

const getNavDropDown = (tab, pathname, goTo) => {
  const id = `${tab.title}-nav-dropdown`;
  const loginSuperset = () => window.open(getAnalyticsUrl('login'));
  return (
    <NavDropdown
      className={cx({
        active: map(tab.links, getPathnameFromRoute).includes(pathname),
      })}
      title={tab.title}
      key={id}
      id={id}>
      {map(tab.links, (route) => (
        <NavDropdown.Item
          key={getPathnameFromRoute(route)}
          href={route.link[0] !== '/' ? route.link : ''}
          onClick={route.link === '/dashboard-saya' ? loginSuperset : route.link[0] !== '/' ? null : goTo(route.link)}>
          {route.title}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

const getNavLinks = (list, pathname, goTo) => {
  return list.map((tab) => {
    if (tab.links && isArray(tab.links)) {
      return getNavDropDown(tab, pathname, goTo);
    }
    const currentPathname = getPathnameFromRoute(tab);
    return (
      <Nav.Link
        className={cx({
          active: pathname === currentPathname,
        })}
        key={currentPathname}
        onClick={goTo(tab.link)}>
        {tab.title}
      </Nav.Link>
    );
  });
};

export const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const { keycloak } = useKeycloak();
  const user = useSelector(userSelector);
  const { records } = useSelector(globalData);
  const [logoHeader, setLogoHeader] = useState(null);
  const { t } = useTranslation();
  const fromLogin = _.get(history, 'location.params.login', false);

  const showAppSec = useMemo(() => {
    if (!user) return false;
    const { roles = null } = user;
    return ![Roles.MEMBER, Roles.REGISTERED_USER, Roles.EKSEKUTIF].includes(roles);
  }, [user]);

  useEffect(() => {
    if (!_.isEmpty(records)) {
      let data = _.groupBy(records, 'code');
      if (!_.isEmpty(data.LOGO_HEADER[0])) {
        setLogoHeader(data.LOGO_HEADER[0].content.url);
      }
    }
  }, [records]);

  const isLoggedIn = !!keycloak.authenticated;

  const goTo = (params) => () => history.push(params);

  const COMMON_ROUTES = useMemo(
    () => [
      { title: 'Beranda', link: '/home' },
      {
        title: 'Dataset',
        link: isLoggedIn
          ? '/dataset'
          : {
              pathname: '/topic-detail',
            },
      },
    ],
    [isLoggedIn],
  );

  const PUBLIC_ROUTES = useMemo(
    () => [...COMMON_ROUTES, { title: 'Berita', link: '/berita' }, { title: 'Tentang', link: '/tentang' }],
    [],
  );

  const MEMBER_ROUTES = useMemo(
    () => [
      ...COMMON_ROUTES,
      {
        title: 'Layanan',
        links: [
          { title: 'Permintaan Data', link: '/permintaan-data' },
          { title: 'Bimtek', link: '/bimtek-summary' },
          { title: 'Komunitas Ahli', link: '/komunitas-ahli' },
          { title: 'Forum SDI', link: '/forum-sdi' },
          // { title: 'Glosarium', link: '/Glosarium' },
          { title: 'SDI Wiki', link: '/sdi-wiki' },
          { title: 'CKAN', link: `${katalogUrl}/user/saml2login` },
          // { title: 'Persetujuan Anggaran Biaya', link: '/permintaan-budget' },
        ],
      },
      {
        title: 'Dashboard',
        links: [
          { title: 'Kesiapan SDI', link: '/kesiapan-sdi' },
          { title: 'Eksekutif', link: '/dashboard-eksekutif' },
          { title: 'Data Prioritas', link: '/dataprioritas' },
          { title: 'Dashboard Saya', link: '/dashboard-saya' },
        ],
      },
      {
        title: 'Sandbox',
        links: [
          { title: 'Daftar Data', link: '/daftar' },
          { title: 'Metadata Registry', link: '/sdmx' },
        ],
      },
      { title: 'Berita', link: '/berita' },
      { title: 'Tentang', link: '/tentang' },
      // { title: 'API', link: '/api' },
    ],
    [isLoggedIn],
  );

  useEffect(() => {
    setTimeout(() => {
      if (fromLogin && !isLoggedIn) {
        keycloak.login();
      }
    }, 300);
  }, [fromLogin]);

  const renderPublicNav = () => {
    return (
      <Nav className="h-100 d-flex align-items-center">
        {getNavLinks(PUBLIC_ROUTES, location.pathname, goTo)}
        <Button variant="info" className="btn-rounded ml-32" onClick={keycloak.login}>
          Masuk
        </Button>
      </Nav>
    );
  };

  const renderMemberNav = () => {
    return (
      <Nav className="h-100 d-flex align-items-center">
        {getNavLinks(MEMBER_ROUTES, location.pathname, goTo)}
        <NavDropdown title={user?.nama || 'Achmad Adam'} id="user-nav-dropdown" className="user-nav h-100">
          <NavDropdown.Item onClick={goTo('/change-user-password')}>{t('header.userNav.changePassword')}</NavDropdown.Item>
          {showAppSec && <NavDropdown.Item onClick={goTo('/cms')}>{t('header.userNav.cmsApplication')}</NavDropdown.Item>}
          <NavDropdown.Item onClick={goTo('/policy')}>{t('header.userNav.privacyPolicy')}</NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              removeAllCookie();
              keycloak.logout();
            }}>
            {t('header.userNav.signOut')}
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  };

  return (
    <Navbar bg="transparent" className="sdp-header">
      <Container className={cx('mw-100 h-100', { 'pr-24': !isLoggedIn })}>
        <img src={logoHeader} alt="brand-logo" className="cursor-pointer logo-header" onClick={goTo('/home')} />
        {isLoggedIn ? renderMemberNav() : renderPublicNav()}
      </Container>
    </Navbar>
  );
};
