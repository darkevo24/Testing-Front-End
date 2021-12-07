import React from 'react';
import CMSDashboardManage from '.';

const CMSDataAnalytic = () => {
  const props = {
    title: 'Data Analytic',
    //url: 'http://103.170.104.187:8088/dashboard/list/?filters=(owners:(label:%27User%20Dashboard%20Data%20Analytic%27,value:4))',
    url: 'http://103.170.104.187:8088/login/',
  };

  return <CMSDashboardManage {...props} />;
};

export default CMSDataAnalytic;
