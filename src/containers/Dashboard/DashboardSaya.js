import Dashboard from 'containers/Dashboard';

const DashboardSaya = () => {
  const props = {
    options: [{ title: 'Dashboard Saya', url: 'about:blank' }],
    title: 'Dashboard Saya',
  };

  return <Dashboard {...props} />;
};

export default DashboardSaya;
