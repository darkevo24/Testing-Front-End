import React from 'react';
import CMSDashboardManage from '.';

const CMSDashboardEksekutif = () => {
  const props = {
    title: 'Dashboard Eksekutif',
    //url: 'http://103.170.104.187:8088/dashboard/list/?filters=(owners:(label:%27User%20Dashboard%20Eksekutif%27,value:5))&pageIndex=0&sortColumn=dashboard_title&sortOrder=asc&viewMode=table',
    url: 'http://103.170.104.187:8088/login/',
  };

  return <CMSDashboardManage {...props} />;
};

export default CMSDashboardEksekutif;
