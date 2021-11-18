import Dashboard from 'containers/Dashboard';

const DashboardEksekutif = () => {
  const props = {
    options: [{ title: 'Dashboard RPJMN', url: 'http://103.170.104.187:8088/r/30?standalone=true' }],
    title: 'Dashboard Eksekutif',
  };

  return <Dashboard {...props} />;
};

export default DashboardEksekutif;
