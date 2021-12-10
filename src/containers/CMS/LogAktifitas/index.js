import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import { Search, ModalAlertDanger } from 'components/Icons';
import Button from 'react-bootstrap/Button';
import { CMSTable } from 'components';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker } from 'components';
import { ReactComponent as Prev } from 'assets/prev.svg';
import { ReactComponent as Next } from 'assets/next.svg';
import { Modal } from 'components';
import bn from 'utils/bemNames';

const bem = bn('log-activity');

const schema = yup
  .object({
    title: yup.string().required(),
    category: yup.mixed().required(),
    thumbnail: yup.mixed().required(),
  })
  .required();

const LogActivity = () => {
  const [modalProfile, setModalProfile] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
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
    <div className="sdp-log-activity">
      <div className="container">
        <div className={bem.e('header-log')}>
          <div className="wrapper-left">
            <h1> Log Aktivitas </h1>
            <Button className="" variant="info" style={{ width: '112px' }} onClick={() => setModalProfile(true)}>
              Download
            </Button>
            <Button
              className="ml-10 bg-white sdp-text-grey-dark border-gray-stroke secondary"
              variant="secondary"
              style={{ width: '112px' }}
              onClick={() => setModalProfile(true)}>
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
                arrow={true}
              />
            </div>
            <div className="date">
              <p>Akhir</p>
              <DatePicker
                name="publishedDate"
                control={control}
                rules={{ required: false }}
                error={errors.publishedDate?.message}
                arrow={true}
              />
            </div>
            <InputGroup>
              <Form.Control variant="normal" type="text" placeholder="Pencarian" />
              <Search />
            </InputGroup>
          </div>
        </div>
        <CMSTable
          customWidth={[20, 20, 20, 25, 15]}
          header={['ID Pengguna', 'Alamat IP', 'Waktu', 'Aktivitas']}
          data={LIST_TABLE.map((item) => {
            let value = {
              data: [item.id_user, item.ip, item.time, item.activity],
              action: '',
            };
            return value;
          })}
        />
        <div className="wrapper-pagination pt-25">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link prev" href="#">
                <Prev />
              </a>
            </li>
            <li className="page-item">
              <a className="page-link active" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                4
              </a>
            </li>
            <li className="page-item">
              <a className="page-link next" href="#">
                <Next />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Modal showHeader={false} visible={modalProfile} onClose={() => setModalProfile(false)}>
        <div className="alert">
          <ModalAlertDanger />
          <p className="text-danger pt-15">
            Data log yang di-backup akan didownload ke dalam bentuk csv dan
            <span className="font-weight-bold"> akan dihapus dari sistem </span>
          </p>
        </div>
        <p className="date-backup">
          Backup Log Aktivitas
          <span className="ml-10 mr-5 p-5"> 1 Jan 2021 - 1 Des 2021 </span>?
        </p>
        <div>
          <div className="d-flex justify-content-end pb-20 pr-10">
            <Button
              onClick={() => setModalProfile(false)}
              className="ml-24 bg-white sdp-text-grey-dark border-gray-stroke"
              variant="secondary"
              style={{ width: '112px' }}>
              Batal
            </Button>
            <Button className="mx-10" variant="info" style={{ width: '112px' }}>
              Konfirmasi
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LogActivity;
