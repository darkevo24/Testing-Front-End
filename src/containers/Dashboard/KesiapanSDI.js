import Dashboard from 'containers/Dashboard';

const KesiapanSDI = () => {
  const props = {
    options: [
      { title: 'Pusat', url: 'http://103.170.104.187:8088/r/28?standalone=true' },
      { title: 'Daerah', url: 'http://103.170.104.187:8088/r/28?standalone=true' },
    ],
    title: 'Kesiapan SDI',
  };

  return <Dashboard {...props} />;
};

export default KesiapanSDI;
