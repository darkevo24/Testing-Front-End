import Dashboard from 'containers/Dashboard';

const DataAnalytic = () => {
  const props = {
    options: [
      { title: 'Corona Virus Covid-19 Indonesia', url: 'http://103.170.104.187:8088/superset/dashboard/37' },
      { title: 'Cuaca dan Gempa Bumi', url: 'http://103.170.104.187:8088/superset/dashboard/38' },
      { title: 'PIHPS Nasional', url: 'http://103.170.104.187:8088/superset/dashboard/21/' },
    ],
    title: 'Data Analytic',
  };

  return <Dashboard {...props} />;
};

export default DataAnalytic;
