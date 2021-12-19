import React from 'react';
import { getAnalyticsUrl } from 'utils/constants';
import CMSDashboardManage from '.';

const CMSDashboardEksekutif = () => {
  const props = {
    title: 'Dashboard Eksekutif',
    url: getAnalyticsUrl('login'),
  };

  return <CMSDashboardManage {...props} />;
};

export default CMSDashboardEksekutif;
