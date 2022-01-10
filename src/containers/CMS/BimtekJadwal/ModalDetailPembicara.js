import { useEffect } from 'react';
import moment from 'moment';
import isFunction from 'lodash/isFunction';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { apiUrls, post, put } from 'utils/request';
import { DatePicker, Input, Modal, Notification } from 'components';

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

export const ModalDetailPembicara = ({
  statusModal,
  visible,
  idPembicara,
  dataEditPembicara,
  initialCall,
  idJadwal,
  apiError,
  setAPIError,
}) => {
  const {
    control: controlPembicara,
    formState: { errors: errorsPembicara },
    reset: resetPembicara,
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

  const handleAPICall = async (method, url, params, message, callBack) => {
    try {
      await method(url, {}, params);
      visible();
      handleNotification('secondary', `${message}`, 'check');
      initialCall();
      isFunction(callBack) && callBack();
      setAPIError(false);
    } catch (e) {
      setAPIError(true);
      visible();
      return handleNotification('secondary', `Error, ${e.message}`, 'cross');
    }
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
        nama,
        tanggalMulai,
        tanggalSelesai,
      },
    ];
    handleAPICall(
      post,
      `${apiUrls.cmsBimtekJadwal}/${idJadwal}/pembicara`,
      { data: { pembicara: obj } },
      'Berhasil Menambah Pembicara',
    );
    if (!apiError) {
      resetPembicara({});
      setValuePembicara('tambahPembicara', '');
      setValuePembicara('tambahPembicaraWaktuMulai', '');
      setValuePembicara('tambahPembicaraJamMulai', '');
      setValuePembicara('tambahPembicaraWaktuSelesai', '');
      setValuePembicara('tambahPembicaraJamSelesai', '');
    }
  };

  const onEditPembicara = (data) => {
    let tanggalMulaiCheck = moment(data.tambahPembicaraWaktuMulaiUpdate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    let tanggalSelesaiCheck = moment(data.tambahPembicaraWaktuSelesaiUpdate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    if (tanggalMulaiCheck === 'Invalid date') {
      tanggalMulaiCheck = moment(data.tambahPembicaraWaktuMulaiUpdate).format('YYYY-MM-DD');
    }
    if (tanggalSelesaiCheck === 'Invalid date') {
      tanggalSelesaiCheck = moment(data.tambahPembicaraWaktuSelesaiUpdate).format('YYYY-MM-DD');
    }

    const nama = data.tambahPembicaraUpdate;
    const tanggalMulai = `${tanggalMulaiCheck} ${data.tambahPembicaraJamMulaiUpdate}:00`;
    const tanggalSelesai = `${tanggalSelesaiCheck} ${data.tambahPembicaraJamSelesaiUpdate}:00`;
    if (!moment(tanggalSelesai).isAfter(tanggalMulai)) {
      visible();
      return handleNotification('secondary', 'Gagal, Rentang Waktu Tidak Valid', 'cross');
    }
    let obj = {
      nama,
      tanggalMulai,
      tanggalSelesai,
    };
    handleAPICall(
      put,
      `${apiUrls.cmsBimtekJadwal}/${idJadwal}/pembicara/${idPembicara}`,
      { data: obj },
      'Berhasil Merubah Pembicara',
    );
  };

  switch (statusModal) {
    case 'pembicara':
      return (
        <Modal
          className="cms-bimtek-materi"
          title={statusModal === 'pembicara' ? 'Tambah Pembicara Baru' : 'Ubah Pembicara'}
          visible={visible}
          onClose={visible}>
          <Form
            onSubmit={
              statusModal === 'pembicara'
                ? handleSubmitPembicara(onAddPembicara)
                : handleSubmitEditPembicara(onEditPembicara)
            }>
            <div className="mb-10">
              <Row>
                <Input
                  group
                  label="Nama Pembicara"
                  name={statusModal === 'pembicara' ? 'tambahPembicara' : 'tambahPembicaraUpdate'}
                  control={statusModal === 'pembicara' ? controlPembicara : controlEditPembicara}
                  error={
                    statusModal === 'pembicara'
                      ? errorsPembicara.tambahPembicara?.message
                      : errorsEditPembicara.tambahPembicaraUpdate?.message
                  }
                  rules={{ required: true }}
                />
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Mulai Sesi"
                    name={statusModal === 'pembicara' ? 'tambahPembicaraWaktuMulai' : 'tambahPembicaraWaktuMulaiUpdate'}
                    control={statusModal === 'pembicara' ? controlPembicara : controlEditPembicara}
                    error={
                      statusModal === 'pembicara'
                        ? errorsPembicara.tambahPembicaraWaktuMulai?.message
                        : errorsEditPembicara.tambahPembicaraWaktuMulaiUpdate?.message
                    }
                    rules={{ required: true }}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name={statusModal === 'pembicara' ? 'tambahPembicaraJamMulai' : 'tambahPembicaraJamMulaiUpdate'}
                    control={statusModal === 'pembicara' ? controlPembicara : controlEditPembicara}
                    error={
                      statusModal === 'pembicara'
                        ? errorsPembicara.tambahPembicaraJamMulai?.message
                        : errorsEditPembicara.tambahPembicaraJamMulaiUpdate?.message
                    }
                    rules={{ required: true }}
                  />
                </Col>
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Selesai Sesi"
                    name={statusModal === 'pembicara' ? 'tambahPembicaraWaktuSelesai' : 'tambahPembicaraWaktuSelesaiUpdate'}
                    control={statusModal === 'pembicara' ? controlPembicara : controlEditPembicara}
                    error={
                      statusModal === 'pembicara'
                        ? errorsPembicara.tambahPembicaraWaktuSelesai?.message
                        : errorsEditPembicara.tambahPembicaraWaktuSelesaiUpdate?.message
                    }
                    rules={{ required: true }}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name={statusModal === 'pembicara' ? 'tambahPembicaraJamSelesai' : 'tambahPembicaraJamSelesaiUpdate'}
                    control={statusModal === 'pembicara' ? controlPembicara : controlEditPembicara}
                    error={
                      statusModal === 'pembicara'
                        ? errorsPembicara.tambahPembicaraJamSelesai?.message
                        : errorsEditPembicara.tambahPembicaraJamSelesaiUpdate?.message
                    }
                    rules={{ required: true }}
                  />
                </Col>
              </Row>
            </div>
            <div className="d-flex justify-content-end">
              <Button className="br-4 mr-8 px-40 py-10 bg-transparent" variant="outline-none" onClick={visible}>
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
export default ModalDetailPembicara;
