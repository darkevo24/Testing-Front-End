import React from 'react';
import Logo from 'assets/logo-satu.jpg';
import './header.scss';

export const CMSHeader = () => {
  return (
    <nav className="sdp-cms-header navbar navbar-light border-bottom-gray-stroke">
      <div className="container-fluid pr-0">
        <img src={Logo} alt="" />
        <ul className="nav justify-content-end">
          <li className="my-11">
            <button className="br-6 border-gray-stroke px-16 py-9">Portal SDI</button>
          </li>
          <li className="d-flex justify-content-end flex-row align-items-center ml-16 pl-24 my-19 border-left-gray-stroke bg-gray-lighter">
            <label className="fw-bold fs-14 lh-17 sdp-text-black-dark">Achmad Albar</label>
          </li>
        </ul>
      </div>
    </nav>
  );
};
