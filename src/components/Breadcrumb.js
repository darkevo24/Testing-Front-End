import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export const Breadcrumbs = (list, action) => (
  <Breadcrumb>
    {list.map((item, index) => (
      <Breadcrumb.Item onClick={() => action(item.path)} active={index === list.length - 1}>
        {item.label}
      </Breadcrumb.Item>
    ))}
  </Breadcrumb>
);
