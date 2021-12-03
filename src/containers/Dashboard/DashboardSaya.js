import Dashboard from 'containers/Dashboard';

const DashboardSaya = () => {
  const props = {
    options: [{ title: 'Dashboard Saya', url: 'http://103.170.104.187:8088/login/' }],
    title: 'Dashboard Saya',
  };

  return <Dashboard {...props} />;
};

export default DashboardSaya;
