import React from 'react';
import Button from 'react-bootstrap/Button';

import Logo from 'assets/logo-satu.jpg';
import './header.scss';

export const AdminHeader = () => {
  return (
    <nav className="sdp-header navbar navbar-light border-bottom">
      <div className="container-fluid px-24">
        <img src={Logo} alt="" />
        <Button
          variant="secondary"
          onClick={() => {
            // TODO: implement logout of the user
          }}>
          Logout
        </Button>
      </div>
    </nav>
  );
};
