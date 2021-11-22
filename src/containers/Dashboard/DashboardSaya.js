import Dashboard from 'containers/Dashboard';

const DashboardSaya = () => {
  const props = {
    options: [{ title: 'Dashboard Saya', url: 'http://103.170.104.187:8088/r/31?standalone=true' }],
    title: 'Dashboard Saya',
  };

  return <Dashboard {...props} />;
};

export default DashboardSaya;
