import React from 'react';
import CMSDashboardManage from '.';

const CMSDataAnalytic = () => {
  const props = { title: 'Data Analytic', url: 'http://103.170.104.187:8088/dashboard/list/' };

  return <CMSDashboardManage {...props} />;
};

export default CMSDataAnalytic;
