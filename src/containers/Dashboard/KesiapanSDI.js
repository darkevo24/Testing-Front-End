import Dashboard from 'containers/Dashboard';

const KesiapanSDI = () => {
  const props = {
    options: [
      { title: 'Pusat', url: 'http://103.170.104.187:8088/superset/dashboard/40/' },
      { title: 'Daerah', url: 'http://www.google.com' },
    ],
    title: 'Kesiapan SDI',
  };

  return <Dashboard {...props} />;
};

export default KesiapanSDI;
