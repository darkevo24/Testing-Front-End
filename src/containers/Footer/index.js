import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { tokenSelector } from 'containers/Login/reducer';
import { Bottom } from './bottom';
import { Top } from './top';

export const Footer = () => {
  const token = useSelector(tokenSelector);
  const history = useHistory();
  return (
    <nav className="sdp-bottom navbar navbar-light p-0 border-gray-stroke">
      <div className="w-100">
        <Top token={token} history={history} />
        <Bottom token={token} history={history} />
      </div>
    </nav>
  );
};
