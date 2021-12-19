import Dashboard from 'containers/Dashboard';
import { getAnalyticsUrl } from 'utils/constants';

const DashboardSaya = () => {
  const props = {
    options: [
      {
        title: 'Dashboard Saya',
        url: getAnalyticsUrl('dashboard/list/?filters=(owners:(label:%27Walidata%201%27,value:7))'),
      },
    ],
    title: 'Dashboard Saya',
  };

  return <Dashboard {...props} />;
};

export default DashboardSaya;
