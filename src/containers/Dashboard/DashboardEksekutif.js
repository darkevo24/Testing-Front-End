import Dashboard from 'containers/Dashboard';

const DashboardEksekutif = () => {
  const props = {
    options: [
      { title: 'Dashboard RPJMN - Prioritas Nasional 1', url: 'http://103.170.104.187:8088/r/30?standalone=true' },
      { title: 'Dashboard RPJMN - Prioritas Nasional 2', url: 'http://103.170.104.187:8088/r/30?standalone=true' },
      { title: 'Dashboard RPJMN - Prioritas Nasional 3', url: 'http://103.170.104.187:8088/r/30?standalone=true' },
      { title: 'Dashboard RPJMN - Prioritas Nasional 4', url: 'http://103.170.104.187:8088/r/30?standalone=true' },
      { title: 'Dashboard RPJMN - Prioritas Nasional 5', url: 'http://103.170.104.187:8088/r/30?standalone=true' },
      { title: 'Dashboard RPJMN - Prioritas Nasional 6', url: 'http://103.170.104.187:8088/r/30?standalone=true' },
      { title: 'Dashboard RPJMN - Prioritas Nasional 7', url: 'http://103.170.104.187:8088/r/30?standalone=true' },
    ],
    title: 'Dashboard Eksekutif',
  };

  return <Dashboard {...props} />;
};

export default DashboardEksekutif;
