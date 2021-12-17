import Dashboard from 'containers/Dashboard';
import { getAnalyticsUrl } from 'utils/constants';

const KesiapanSDI = () => {
  const props = {
    options: [
      { title: 'Pusat', url: getAnalyticsUrl('superset/dashboard/40/') },
      { title: 'Daerah', url: getAnalyticsUrl('r/28?standalone=true') },
    ],
    title: 'Kesiapan SDI',
  };

  return <Dashboard {...props} />;
};

export default KesiapanSDI;
