import Dashboard from 'containers/Dashboard';
import { getAnalyticsUrl } from 'utils/constants';

const KesiapanSDI = () => {
  const props = {
    options: [
      { title: '2021', url: getAnalyticsUrl('superset/dashboard/asesmen-sdi-2021/') },
      { title: '2022', url: getAnalyticsUrl('superset/dashboard/asesmen-sdi-2022/') },
    ],
    title: 'Kesiapan SDI',
  };

  return <Dashboard {...props} />;
};

export default KesiapanSDI;
