import React from 'react';
import CMSDashboardManage from '.';

const CMSDashboardEksekutif = () => {
  const props = { title: 'Dashboard Eksekutif', url: 'http://103.170.104.187:8088/dashboard/list/' };

  return <CMSDashboardManage {...props} />;
};

export default CMSDashboardEksekutif;
