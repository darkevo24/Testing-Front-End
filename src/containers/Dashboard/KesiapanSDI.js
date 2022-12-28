import Dashboard from 'containers/Dashboard';
import { getAnalyticsUrl } from 'utils/constants';

const KesiapanSDI = () => {
  const props = {
    options: [
      { title: '2021', url: getAnalyticsUrl('superset/dashboard/40/') },
      { title: '2022', url: getAnalyticsUrl('r/28?standalone=true') },
    ],
    title: 'Kesiapan SDI',
  };

  return <Dashboard {...props} />;
};

export default KesiapanSDI;
