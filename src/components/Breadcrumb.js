import React from 'react';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export const Breadcrumbs = ({ breadcrumbsList, className }) => {
  const history = useHistory();
  return (
    <Breadcrumb
      className={cx('sdp-breadcrumbs cursor-pointer w-100 d-flex align-items-center bg-gray pt-12 pl-100', className)}>
      {breadcrumbsList.map((item) => (
        <Breadcrumb.Item
          key={item.path || item.label}
          onClick={() => !item?.isActive && history.push(item.path)}
          active={!item.isActive}>
          {item.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
