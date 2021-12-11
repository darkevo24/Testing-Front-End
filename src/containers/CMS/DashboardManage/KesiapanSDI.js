import React from 'react';
import CMSDashboardManage from '.';

const CMSKesiapanSDI = () => {
  const props = {
    title: 'Kesiapan SDI',
    //url: 'http://103.170.104.187:8088/dashboard/list/?filters=(owners:(label:%27User%20Dashboard%20Kesiapan%20SDI%27,value:3))',
    url: 'http://103.170.104.187:8088/login/',
  };

  return <CMSDashboardManage {...props} />;
};

export default CMSKesiapanSDI;
