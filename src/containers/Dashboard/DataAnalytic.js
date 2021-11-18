import Dashboard from 'containers/Dashboard';

const DataAnalytic = () => {
  const props = {
    options: [
      { title: 'Corona Virus Covid-19 Indonesia', url: 'http://103.170.104.187:8088/r/31?standalone=true' },
      { title: 'Cuaca dan Gempa Bumi', url: 'http://103.170.104.187:8088/r/33?standalone=true' },
      { title: 'PIHPS Nasional', url: 'http://103.170.104.187:8088/r/32?standalone=true' },
    ],
    title: 'Data Analytic',
  };

  return <Dashboard {...props} />;
};

export default DataAnalytic;
