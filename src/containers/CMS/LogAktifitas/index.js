import { useHistory, useLocation } from 'react-router-dom';
import { CMSTable } from 'components';

// import './index.scss';

const LogActivity = () => {
  const history = useHistory();
  const LIST_TABLE = [
    {
      id_user: 'ibrohim@gmail.com',
      ip: '120.722.322',
      time: '22/10/2021',
      activity: 'Membuat permintaan data baru PD00021',
      status: 'Berhasil',
    },
    {
      id_user: 'ibrohim@gmail.com',
      ip: '120.722.322',
      time: '22/10/2021',
      activity: 'Membuat permintaan data baru PD00021',
      status: 'Berhasil',
    },
    {
      id_user: 'ibrohim@gmail.com',
      ip: '120.722.322',
      time: '22/10/2021',
      activity: 'Membuat permintaan data baru PD00021',
      status: 'Berhasil',
    },
    {
      id_user: 'ibrohim@gmail.com',
      ip: '120.722.322',
      time: '22/10/2021',
      activity: 'Membuat permintaan data baru PD00021',
      status: 'Berhasil',
    },
    {
      id_user: 'ibrohim@gmail.com',
      ip: '120.722.322',
      time: '22/10/2021',
      activity: 'Membuat permintaan data baru PD00021',
      status: 'Berhasil',
    },
    {
      id_user: 'ibrohim@gmail.com',
      ip: '120.722.322',
      time: '22/10/2021',
      activity: 'Membuat permintaan data baru PD00021',
      status: 'Berhasil',
    },
    {
      id_user: 'ibrohim@gmail.com',
      ip: '120.722.322',
      time: '22/10/2021',
      activity: 'Membuat permintaan data baru PD00021',
      status: 'Error',
    },
    {
      id_user: 'ibrohim@gmail.com',
      ip: '120.722.322',
      time: '22/10/2021',
      activity: 'Membuat permintaan data baru PD00021',
      status: 'Gagal',
    },
    {
      id_user: 'ibrohim@gmail.com',
      ip: '120.722.322',
      time: '22/10/2021',
      activity: 'Membuat permintaan data baru PD00021',
      status: 'Error',
    },
    {
      id_user: 'ibrohim@gmail.com',
      ip: '120.722.322',
      time: '22/10/2021',
      activity: 'Membuat permintaan data baru PD00021',
      status: 'Gagal',
    },
  ];
  return (
    <div className="container">
      <CMSTable
        customWidth={[20, 20, 20, 20, 20]}
        header={['ID Pengguna', 'Alamat IP', 'Waktu', 'Aktivitas', 'Status']}
        data={LIST_TABLE.map((item) => {
          let value = {
            data: [item.id_user, item.ip, item.time, item.activity, item.status],
            action: '/cms/api-detail/' + item.id,
          };
          return value;
        })}
      />
    </div>
  );
};

export default LogActivity;
