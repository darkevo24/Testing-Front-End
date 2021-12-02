import Dashboard from 'containers/Dashboard';

const DashboardSaya = () => {
  const props = {
    options: [{ title: 'Dashboard Saya', url: 'http://www.google.com' }],
    title: 'Dashboard Saya',
  };

  return <Dashboard {...props} />;
};

export default DashboardSaya;
