import Button from 'react-bootstrap/Button';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CMSTable, DatePicker } from 'components';

import './index.scss';

const schema = yup
  .object({
    title: yup.string().required(),
    category: yup.mixed().required(),
    thumbnail: yup.mixed().required(),
  })
  .required();

const LogActivity = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
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
    <div className="log-activity">
      <div className="container">
        <div className="header-log">
          <div className="wrapper-left">
            <h1> Log Aktivitas </h1>
            <Button className="" variant="info" style={{ width: '112px' }}>
              Download
            </Button>
            <Button
              className="ml-10 bg-white sdp-text-grey-dark border-gray-stroke secondary"
              variant="secondary"
              style={{ width: '112px' }}>
              Backup
            </Button>
          </div>
          <div className="wrapper-right">
            <div className="date">
              <p>Awal</p>
              <DatePicker
                name="publishedDate"
                control={control}
                rules={{ required: false }}
                error={errors.publishedDate?.message}
              />
            </div>
            <div className="date">
              <p>Akhir</p>
              <DatePicker
                name="publishedDate"
                control={control}
                rules={{ required: false }}
                error={errors.publishedDate?.message}
              />
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default LogActivity;
