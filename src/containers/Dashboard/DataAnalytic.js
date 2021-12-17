import Dashboard from 'containers/Dashboard';
import { getAnalyticsUrl } from 'utils/constants';

const DataAnalytic = () => {
  const getLink = (id) => `${getAnalyticsUrl('superset/dashboard')}/${id}`;
  const props = {
    options: [
      { title: 'Corona Virus Covid-19 Indonesia', url: getLink('37') },
      { title: 'Cuaca dan Gempa Bumi', url: getLink('38') },
      { title: 'PIHPS Nasional', url: getLink('21') },
    ],
    title: 'Data Analytic',
  };

  return <Dashboard {...props} />;
};

export default DataAnalytic;
