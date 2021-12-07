import { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { logout } from 'containers/Login/reducer';
import Logo from 'assets/logo-satu.jpg';
import { Anchor } from 'components/Custom';
import { useHistory, useLocation } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import cx from 'classnames';

const TAB_LIST_1 = [
  { title: 'Beranda', link: '/home' },
  { title: 'Dataset', link: '/dataset' },
];
const TAB_LIST_2 = [
  { title: 'Berita', link: '/berita' },
  { title: 'Tentang', link: '/tentang' },
  { title: 'API', link: '/api' },
];

const getTabList = (list, pathname, history) => {
  return list.map((tab) => (
    <li key={tab.title} className="nav-item">
      <Anchor
        className={cx('nav-link', {
          active: pathname === tab.link,
        })}
        aria-current="page"
        onClick={() => history.push(tab.link)}>
        {tab.title}
      </Anchor>
    </li>
  ));
};
export const AdminHeader = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(logout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Navbar bg="transparent" className="sdp-header">
      <Container className="mw-100">
        <img src={Logo} alt="" />
        <Nav>
          {getTabList(TAB_LIST_1, location.pathname, history)}
          <NavDropdown
            className={cx({
              active: ['/Layanan1'].includes(location.pathname),
            })}
            title="Layanan"
            id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => history.push('/permintaan-data')}>Permintaan Data</NavDropdown.Item>
            <NavDropdown.Item onClick={() => history.push('/bimtek')}>Bimtek</NavDropdown.Item>
            <NavDropdown.Item onClick={() => history.push('/komunitas-ahli')}>Komunitas Ahli</NavDropdown.Item>
            <NavDropdown.Item onClick={() => history.push('/forum-sdi')}>Forum SDI</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className={cx({
              active: ['/Layanan1'].includes(location.pathname),
            })}
            title="Dashboard"
            id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => history.push('/kesiapan-sdi')}>Kesiapan SDI</NavDropdown.Item>
            <NavDropdown.Item onClick={() => history.push('/dashboard-eksekutif')}>Eksekutif</NavDropdown.Item>
            <NavDropdown.Item onClick={() => history.push('/data-analytic')}>Data Analytic</NavDropdown.Item>
            <NavDropdown.Item onClick={() => history.push('/dashboard-saya')}>Dashboard Saya</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className={cx({
              active: ['/Layanan1'].includes(location.pathname),
            })}
            title="Sandbox"
            id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => history.push('/daftar')}>Daftar Data</NavDropdown.Item>
            <NavDropdown.Item onClick={() => history.push('/sdmx')}>Metadata Registry</NavDropdown.Item>
          </NavDropdown>
          {getTabList(TAB_LIST_2, location.pathname, history)}
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};
