import { useCallback } from 'react';
import cx from 'classnames';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import isArray from 'lodash/isArray';
import map from 'lodash/map';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { logout } from 'containers/Login/reducer';
import { tokenSelector } from 'containers/Login/reducer';

import Logo from 'assets/logo-satu.jpg';

const COMMON_ROUTES = [
  { title: 'Beranda', link: '/home' },
  { title: 'Dataset', link: '/new-dataset' },
];

const PUBLIC_ROUTES = [...COMMON_ROUTES, { title: 'Berita', link: '/berita' }, { title: 'Tentang', link: '/tentang' }];
const MEMBER_ROUTES = [
  ...COMMON_ROUTES,
  {
    title: 'Layanan',
    links: [
      { title: 'Permintaan Data', link: '/permintaan-data' },
      { title: 'Bimtek', link: '/bimtek' },
      { title: 'Komunitas Ahli', link: '/komunitas-ahli' },
      { title: 'Forum SDI', link: '/forum' },
    ],
  },
  {
    title: 'Dashboard',
    links: [
      { title: 'Kesiapan SDI', link: '/kesiapan-sdi' },
      { title: 'Eksekutif', link: '/eksekutif' },
      { title: 'Data Analytic', link: '/data-analytic' },
    ],
  },
  {
    title: 'Sandbox',
    links: [
      { title: 'Daftar Data', link: '/dafter' },
      { title: 'Metadata Registry', link: '/sdmx' },
    ],
  },
  { title: 'Berita', link: '/berita' },
  { title: 'Tentang', link: '/tentang' },
  { title: 'API', link: '/api' },
];

const getNavDropDown = (tab, pathname, goTo) => {
  return (
    <NavDropdown
      className={cx({
        active: map(tab.links, 'link').includes(pathname),
      })}
      title={tab.title}
      id={`${tab.title}-nav-dropdown`}>
      {map(tab.links, (route) => (
        <NavDropdown.Item key={route.link} onClick={goTo(route.link)}>
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
    return (
      <Nav.Link
        className={cx({
          active: pathname === tab.link,
        })}
        key={tab.link}
        onClick={goTo(tab.link)}>
        {tab.title}
      </Nav.Link>
    );
  });
};

export const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const token = useSelector(tokenSelector);

  const isLoggedIn = !!token;

  const goTo = (params) => () => history.push(params);

  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(logout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPublicNav = () => {
    return (
      <Nav className="h-100 d-flex align-items-center">
        {getNavLinks(PUBLIC_ROUTES, location.pathname, goTo)}
        <Button variant="info" className="btn-rounded ml-32" onClick={goTo('/login')}>
          Masuk
        </Button>
      </Nav>
    );
  };

  const renderMemberNav = () => {
    return (
      <Nav className="h-100 d-flex align-items-center">
        {getNavLinks(MEMBER_ROUTES, location.pathname, goTo)}
        {/* TODO: replace title with actual user name */}
        <NavDropdown title="Achmad Adam" id="user-nav-dropdown" className="user-nav h-100">
          <NavDropdown.Item onClick={handleLogout}>Sign Out</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  };

  return (
    <Navbar bg="transparent" className="sdp-header">
      <Container className={cx('mw-100 h-100', { 'pr-24': !isLoggedIn })}>
        <img src={Logo} alt="" />
        {isLoggedIn ? renderMemberNav() : renderPublicNav()}
      </Container>
    </Navbar>
  );
};
