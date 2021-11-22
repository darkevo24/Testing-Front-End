import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bn from '../../../utils/bemNames';
import React from 'react';
import CMSDashboardManage from '.';

const bem = bn('content-table');

const CMSDataAnalytic = () => {
  const props = { title: 'Data Analytic', url: 'http://103.170.104.187:8088/r/28?standalone=true' };

  return <CMSDashboardManage {...props} />;
};

export default CMSDataAnalytic;
