import React from 'react';
import CMSDashboardManage from '.';

const CMSDashboardEksekutif = () => {
  const props = { title: 'Dashboard Eksekutif', url: 'http://103.170.104.187:8088/r/28?standalone=true' };

  return <CMSDashboardManage {...props} />;
};

export default CMSDashboardEksekutif;
