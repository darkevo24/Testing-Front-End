import React from 'react';
import cx from 'classnames';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import { useHistory, useLocation } from 'react-router-dom';

import Logo from 'assets/logo-satu.jpg';
import './header.scss';

const TAB_LIST_1 = [
  { title: 'Beranda', link: '/home' },
  { title: 'Dataset', link: '/data-set' },
  { title: 'Berita', link: '/berita' },
  { title: 'Tentang', link: '/tentang' },
];
const TAB_LIST_2 = [
  { title: 'Sandbox', link: '/sandbox' },
  { title: 'Forum', link: '/forum' },
];

const getTabList = (list, pathname, history) => {
  return list.map((tab) => (
    <Nav.Link
      className={cx({
        active: pathname === tab.link,
      })}
      key={tab.link}
      onClick={() => history.push(tab.link)}>
      {tab.title}
    </Nav.Link>
  ));
};

export const Header = () => {
  const history = useHistory();
  const location = useLocation();

  const goTo = (params) => () => history.push(params);

  return (
    <Navbar bg="transparent" className="sdp-header">
      <Container className="mw-100">
        <img src={Logo} alt="" />
        <Nav>
          {getTabList(TAB_LIST_1, location.pathname, history)}
          {/* <NavDropdown
            className={cx({
              active: ['/Layanan1'].includes(location.pathname),
            })}
            title="Layanan"
            id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => history.push('/Layanan1')}>Layanan 1</NavDropdown.Item>
          </NavDropdown> */}
          {/* {getTabList(TAB_LIST_2, location.pathname, history)} */}
          <Button variant="info" className="btn-rounded" onClick={goTo('/admin/login')}>
            Sign In
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};
