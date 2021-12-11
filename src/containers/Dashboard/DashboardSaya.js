import Dashboard from 'containers/Dashboard';

const DashboardSaya = () => {
  const props = {
    options: [
      {
        title: 'Dashboard Saya',
        url: 'http://103.170.104.187:8088/dashboard/list/?filters=(owners:(label:%27Walidata%201%27,value:7))',
      },
    ],
    title: 'Dashboard Saya',
  };

  return <Dashboard {...props} />;
};

export default DashboardSaya;
