import React from 'react';
import cx from 'classname';
import Button from 'react-bootstrap/Button';
import { useHistory, useLocation } from 'react-router-dom';

import Logo from 'assets/logo-satu.jpg';
import { Anchor } from 'components/Custom';
import './header.scss';

const TAB_LIST_1 = [
  { title: 'Beranda', link: '/' },
  { title: 'Data Set', link: '/data-set' },
];
const TAB_LIST_2 = [
  { title: 'Sandbox', link: '/sandbox' },
  { title: 'Forum', link: '/forum' },
  { title: 'Berita', link: '/berita' },
  { title: 'Tentang', link: '/tentang' },
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

export const Header = () => {
  const history = useHistory();
  const location = useLocation();

  const goTo = (params) => () => history.push(params);

  return (
    <nav className="sdp-header navbar navbar-light">
      <div className="container-fluid">
        <img src={Logo} alt="" />
        <ul className="nav justify-content-end">
          {getTabList(TAB_LIST_1, location.pathname, history)}
          <li className="nav-item dropdown">
            <Anchor
              className={cx('nav-link dropdown-toggle', {
                active: ['/Layanan1'].includes(location.pathname),
              })}
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              Layanan
            </Anchor>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Anchor className="dropdown-item" onClick={() => history.push('/Layanan1')}>
                  Layanan 1
                </Anchor>
              </li>
            </ul>
          </li>
          {getTabList(TAB_LIST_2, location.pathname, history)}
          <li>
            <Button variant="info" onClick={goTo('/auth/login')}>
              Sign In
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
