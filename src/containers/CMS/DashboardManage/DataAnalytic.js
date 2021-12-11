import React from 'react';
import { getAnalyticsUrl } from 'utils/constants';
import CMSDashboardManage from '.';

const CMSDataAnalytic = () => {
  const props = {
    title: 'Data Analytic',
    url: getAnalyticsUrl('login'),
  };

  return <CMSDashboardManage {...props} />;
};

export default CMSDataAnalytic;
