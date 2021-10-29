import React from 'react';
import { useHistory } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export const Breadcrumbs = ({ breadcrumbsList }) => {
  const history = useHistory();
  return (
    <Breadcrumb className="cursor-pointer w-100 d-flex align-items-center bg-gray pt-12 pl-100">
      {breadcrumbsList.map((item) => (
        <Breadcrumb.Item
          key={item.path || item.label}
          onClick={() => !item?.isActive && history.push(item.path)}
          active={item.isActive}>
          {item.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
