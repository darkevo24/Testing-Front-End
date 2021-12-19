import Dashboard from 'containers/Dashboard';
import { getAnalyticsUrl } from 'utils/constants';

const DashboardEksekutif = () => {
  const getLink = (id) => `${getAnalyticsUrl('superset/dashboard')}/${id}`;
  const props = {
    options: [
      { title: 'Dashboard RPJMN - Prioritas Nasional 1', url: getLink('25') },
      { title: 'Dashboard RPJMN - Prioritas Nasional 2', url: getLink('26') },
      { title: 'Dashboard RPJMN - Prioritas Nasional 3', url: getLink('27') },
      { title: 'Dashboard RPJMN - Prioritas Nasional 4', url: getLink('28') },
      { title: 'Dashboard RPJMN - Prioritas Nasional 5', url: getLink('29') },
      { title: 'Dashboard RPJMN - Prioritas Nasional 6', url: getLink('30') },
      { title: 'Dashboard RPJMN - Prioritas Nasional 7', url: getLink('31') },
    ],
    title: 'Dashboard Eksekutif',
  };

  return <Dashboard {...props} />;
};

export default DashboardEksekutif;
