import React from 'react';
import { getAnalyticsUrl } from 'utils/constants';
import CMSDashboardManage from '.';

const CMSKesiapanSDI = () => {
  const props = {
    title: 'Kesiapan SDI',
    url: getAnalyticsUrl('login'),
  };

  return <CMSDashboardManage {...props} />;
};

export default CMSKesiapanSDI;
