import React from 'react';
import { Bottom } from './bottom';
import { Top } from './top';

export const Footer = () => {
  return (
    <nav className="sdp-bottom navbar navbar-light p-0 border-gray-stroke">
      <div className="w-100">
        <Top />
        <Bottom />
      </div>
    </nav>
  );
};
