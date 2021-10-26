import React from 'react';
import { Bottom } from './bottom';
import { Top } from './top';

export const Footer = () => (
  <nav className="sdp-bottom navbar navbar-light p-0 pt-80 border-gray-stroke">
    <div className="w-100">
      <Top />
      <Bottom />
    </div>
  </nav>
);
