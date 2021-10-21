import React from 'react';
import { Bottom } from './bottom';
import { Top } from './top';

export const Footer = () => (
  <nav className="sdp-bottom navbar navbar-light ">
    <div className="container-fluid">
      <Top />
      <Bottom />
    </div>
  </nav>
);
