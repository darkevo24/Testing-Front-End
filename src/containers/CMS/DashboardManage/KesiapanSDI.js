import React from 'react';
import CMSDashboardManage from '.';

const CMSKesiapanSDI = () => {
  const props = { title: 'Kesiapan SDI', url: 'http://103.170.104.187:8088/dashboard/list/' };

  return <CMSDashboardManage {...props} />;
};

export default CMSKesiapanSDI;
