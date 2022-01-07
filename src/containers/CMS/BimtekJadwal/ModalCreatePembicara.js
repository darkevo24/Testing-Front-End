import { useEffect } from 'react';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { apiUrls, post } from 'utils/request';
import { DatePicker, Input, Modal, Table, Notification } from 'components';
import { Galery, Close } from 'components/Icons';

const schemaPembicara = yup
  .object({
    tambahPembicara: yup.string().required(),
    tambahPembicaraWaktuMulai: yup.string().required(),
    tambahPembicaraJamMulai: yup.string().required(),
    tambahPembicaraWaktuSelesai: yup.string().required(),
    tambahPembicaraJamSelesai: yup.string().required(),
  })
  .required();

const schemaEditPembicara = yup
  .object({
    tambahPembicaraUpdate: yup.string().required(),
    tambahPembicaraWaktuMulaiUpdate: yup.string().required(),
    tambahPembicaraJamMulaiUpdate: yup.string().required(),
    tambahPembicaraWaktuSelesaiUpdate: yup.string().required(),
    tambahPembicaraJamSelesaiUpdate: yup.string().required(),
  })
  .required();

export const ModalCreatePembicara = ({
  statusModal,
  visible,
  dataPembicara,
  setDataPembicara,
  idPembicara,
  dataEditPembicara,
}) => {
  const {
    control: controlPembicara,
    formState: { errors: errorsPembicara },
    setValue: setValuePembicara,
    handleSubmit: handleSubmitPembicara,
  } = useForm({
    resolver: yupResolver(schemaPembicara),
    defaultValues: {
      tambahPembicara: '',
      tambahPembicaraWaktuMulai: '',
      tambahPembicaraJamMulai: '',
      tambahPembicaraWaktuSelesai: '',
      tambahPembicaraJamSelesai: '',
    },
  });

  const {
    control: controlEditPembicara,
    formState: { errors: errorsEditPembicara },
    setValue: setValueEditPembicara,
    handleSubmit: handleSubmitEditPembicara,
  } = useForm({
    resolver: yupResolver(schemaEditPembicara),
    defaultValues: {
      tambahPembicaraUpdate: '',
      tambahPembicaraWaktuMulaiUpdate: '',
      tambahPembicaraJamMulaiUpdate: '',
      tambahPembicaraWaktuSelesaiUpdate: '',
      tambahPembicaraJamSelesaiUpdate: '',
    },
  });
  let data = dataEditPembicara;
  useEffect(() => {
    if (data) {
      setValueEditPembicara('tambahPembicaraUpdate', data.nama);
      setValueEditPembicara('tambahPembicaraWaktuMulaiUpdate', moment(data.tanggalMulai).format('DD/MM/YYYY'));
      setValueEditPembicara('tambahPembicaraWaktuSelesaiUpdate', moment(data.tanggalSelesai).format('DD/MM/YYYY'));
      setValueEditPembicara('tambahPembicaraJamMulaiUpdate', moment(data.tanggalMulai).format('HH:mm'));
      setValueEditPembicara('tambahPembicaraJamSelesaiUpdate', moment(data.tanggalSelesai).format('HH:mm'));
    }
  }, [data]);

  const handleNotification = (type, message, icon) => {
    Notification.show({
      type,
      message,
      icon,
    });
  };

  const onAddPembicara = (data) => {
    const nama = data.tambahPembicara;
    const tanggalMulai = `${moment(data.tambahPembicaraWaktuMulai).format('YYYY-MM-DD')} ${data.tambahPembicaraJamMulai}:00`;
    const tanggalSelesai = `${moment(data.tambahPembicaraWaktuSelesai).format('YYYY-MM-DD')} ${
      data.tambahPembicaraJamSelesai
    }:00`;
    if (!moment(tanggalSelesai).isAfter(tanggalMulai)) {
      visible();
      return handleNotification('secondary', 'Gagal, Rentang Waktu Tidak Valid', 'cross');
    }
    let obj = [
      {
        id: (Math.random() + 1).toString(36).substring(7),
        nama,
        tanggalMulai,
        tanggalSelesai,
      },
    ];
    setDataPembicara([...dataPembicara, obj[0]]);
    visible();
    setValuePembicara('tambahPembicara', '');
    setValuePembicara('tambahPembicaraWaktuMulai', '');
    setValuePembicara('tambahPembicaraWaktuSelesai', '');
    setValuePembicara('tambahPembicaraJamMulai', '');
    setValuePembicara('tambahPembicaraJamSelesai', '');
    return handleNotification('secondary', 'Berhasil Menambahkan Pembicara', 'check');
  };

  const onEditPembicara = (data) => {
    if (!idPembicara) {
      visible();
      return handleNotification('secondary', 'Gagal Merubah Pembicara ', 'cross');
    }
    let tanggalMulaiCheck = moment(data.tambahPembicaraWaktuMulaiUpdate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    let tanggalSelesaiCheck = moment(data.tambahPembicaraWaktuSelesaiUpdate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    if (tanggalMulaiCheck === 'Invalid date') {
      tanggalMulaiCheck = moment(data.tambahPembicaraWaktuMulaiUpdate).format('YYYY-MM-DD');
    }
    if (tanggalSelesaiCheck === 'Invalid date') {
      tanggalSelesaiCheck = moment(data.tambahPembicaraWaktuSelesaiUpdate).format('YYYY-MM-DD');
    }
    if (!moment(tanggalSelesaiCheck).isAfter(tanggalMulaiCheck)) {
      visible();
      return handleNotification('secondary', 'Gagal, Rentang Waktu Tidak Valid', 'cross');
    }
    const nama = data.tambahPembicaraUpdate;
    const tanggalMulai = `${tanggalMulaiCheck} ${data.tambahPembicaraJamMulaiUpdate}:00`;
    const tanggalSelesai = `${tanggalSelesaiCheck} ${data.tambahPembicaraJamSelesaiUpdate}:00`;
    let obj = [
      {
        id: (Math.random() + 1).toString(36).substring(7),
        nama,
        tanggalMulai,
        tanggalSelesai,
      },
    ];
    let newDataPembicara = dataPembicara.filter((x) => x.id !== idPembicara);
    setDataPembicara([...newDataPembicara, obj[0]]);
    visible();
    return handleNotification('secondary', 'Berhasil Merubah Pembicara ', 'check');
  };

  switch (statusModal) {
    case 'pembicara':
      return (
        <Modal className="cms-bimtek-materi" title="Tambah Pembicara Baru" visible={visible} onClose={visible}>
          <Form onSubmit={handleSubmitPembicara(onAddPembicara)}>
            <div className="mb-10">
              <Row>
                <Input
                  group
                  label="Nama Pembicara"
                  name="tambahPembicara"
                  control={controlPembicara}
                  error={errorsPembicara.tambahPembicara?.message}
                  rules={{ required: true }}
                />
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Mulai Sesi"
                    name="tambahPembicaraWaktuMulai"
                    control={controlPembicara}
                    error={errorsPembicara.tambahPembicaraWaktuMulai?.message}
                    rules={{ required: true }}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="tambahPembicaraJamMulai"
                    control={controlPembicara}
                    error={errorsPembicara.tambahPembicaraJamMulai?.message}
                    rules={{ required: true }}
                  />
                </Col>
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Selesai Sesi"
                    name="tambahPembicaraWaktuSelesai"
                    control={controlPembicara}
                    error={errorsPembicara.tambahPembicaraWaktuSelesai?.message}
                    rules={{ required: true }}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="tambahPembicaraJamSelesai"
                    control={controlPembicara}
                    error={errorsPembicara.tambahPembicaraJamSelesai?.message}
                    rules={{ required: true }}
                  />
                </Col>
              </Row>
            </div>
            <div className="d-flex justify-content-end">
              <Button className="br-4 mr-8 px-40 py-5 bg-transparent" variant="outline-none" onClick={visible}>
                Batal
              </Button>
              <Button type="submit" className="mx-10" variant="info" style={{ width: '112px' }}>
                Simpan
              </Button>
            </div>
          </Form>
        </Modal>
      );
    case 'editPembicara':
      return (
        <Modal className="cms-bimtek-materi" title="Ubah Pembicara" visible={visible} onClose={visible}>
          <Form onSubmit={handleSubmitEditPembicara(onEditPembicara)}>
            <div className="mb-10">
              <Row>
                <Input
                  group
                  label="Nama Pembicara"
                  name="tambahPembicaraUpdate"
                  control={controlEditPembicara}
                  error={errorsEditPembicara.tambahPembicaraUpdate?.message}
                  rules={{ required: true }}
                />
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Mulai Sesi"
                    name="tambahPembicaraWaktuMulaiUpdate"
                    control={controlEditPembicara}
                    error={errorsEditPembicara.tambahPembicaraWaktuMulaiUpdate?.message}
                    rules={{ required: true }}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="tambahPembicaraJamMulaiUpdate"
                    control={controlEditPembicara}
                    error={errorsEditPembicara.tambahPembicaraJamMulaiUpdate?.message}
                    rules={{ required: true }}
                  />
                </Col>
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Selesai Sesi"
                    name="tambahPembicaraWaktuSelesaiUpdate"
                    error={errorsEditPembicara.tambahPembicaraWaktuSelesaiUpdate?.message}
                    rules={{ required: true }}
                    control={controlEditPembicara}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="tambahPembicaraJamSelesaiUpdate"
                    error={errorsEditPembicara.tambahPembicaraJamSelesaiUpdate?.message}
                    rules={{ required: true }}
                    control={controlEditPembicara}
                  />
                </Col>
              </Row>
            </div>
            <div className="d-flex justify-content-end">
              <Button className="br-4 mr-8 px-40 py-5 bg-transparent" variant="outline-none" onClick={visible}>
                Batal
              </Button>
              <Button type="submit" className="mx-10" variant="info" style={{ width: '112px' }}>
                Simpan
              </Button>
            </div>
          </Form>
        </Modal>
      );
    default:
      return null;
  }
};
export default ModalCreatePembicara;
