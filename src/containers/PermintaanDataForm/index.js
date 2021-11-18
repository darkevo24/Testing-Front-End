import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from 'components';
import { LeftChevron } from '../../components/Icons';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const permintaanDataFormId = 'permintaan-data-form-id';
const schema = yup
  .object({
    id: yup.mixed().required(),
    namaPeminta: yup.mixed().required(),
    instansi: yup.mixed().required(),
    unitKerja: yup.mixed().required(),
    deskripsi: yup.mixed().required(),
    targetWaktu: yup.mixed().required(),
    produsen: yup.mixed().required(),
    tipe: yup.mixed().required(),
    tanggalPermintaan: yup.mixed().required(),
    status: yup.mixed().required(),
  })
  .required();

const SuccessText = () => {
  const history = useHistory();
  const backToTable = () => {
    history.push('/permintaan-data');
  };
  return (
    <Row className="d-flex">
      <div className="icon-box border py-4 px-4 w-auto" onClick={backToTable}>
        <LeftChevron></LeftChevron>
      </div>
      <Row className="permintaan-data-form-success fw-bold justify-content-center align-items-center">Selesai</Row>
    </Row>
  );
};

const TerkirimText = () => {
  const history = useHistory();
  const backToTable = () => {
    history.push('/permintaan-data');
  };
  return (
    <Row className="d-flex">
      <div className="icon-box border py-4 px-4 w-auto" onClick={backToTable}>
        <LeftChevron></LeftChevron>
      </div>
      <Row className="permintaan-data-form-terkirim fw-bold justify-content-center align-items-center">Terkirim</Row>
    </Row>
  );
};

const DiprosesText = () => {
  const history = useHistory();
  const backToTable = () => {
    history.push('/permintaan-data');
  };
  return (
    <Row className="d-flex">
      <div className="icon-box border py-4 px-4 w-auto" onClick={backToTable}>
        <LeftChevron></LeftChevron>
      </div>
      <Row className="permintaan-data-form-terproses fw-bold justify-content-center align-items-center">Terproses</Row>
    </Row>
  );
};

const TerkirimButton = () => {
  return (
    <Col>
      <Button variant="info" className="text-white py-2 px-5 fw-bold float-end">
        Proses
      </Button>
      <Button variant="outline-secondary" className="text-black fw-bold py-2 px-5 mx-4 float-end">
        Tolak
      </Button>
    </Col>
  );
};

const DiprosesButton = () => {
  return (
    <Col>
      <Button variant="info" className="text-white py-2 px-5 fw-bold float-end mx-4">
        Selesai
      </Button>
    </Col>
  );
};

const PermintaanDataForm = ({ onSubmit }) => {
  const data = useSelector((state) => state.permintaanData?.result.data);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
    },
  });

  return (
    <div className="dafter-form">
      {data.status === 'Selesai' ? <SuccessText /> : null}
      {data.status === 'Terkirim' ? <TerkirimText /> : null}
      {data.status === 'Diproses' ? <DiprosesText /> : null}
      <div className="p-5 d-flex flex-row">
        <Row className="w-75 px-5">
          <Col>
            <h1 className="mb-5 fw-bold">Detail</h1>
          </Col>
          {data.status === 'Terkirim' ? <TerkirimButton /> : null}
          {data.status === 'Diproses' ? <DiprosesButton /> : null}
          <Form id={permintaanDataFormId} onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
              group
              label="Deskripsi Data"
              name="deskripsi"
              control={control}
              isDisabled
              rules={{ required: true }}
              error={errors.deskripsi?.message}
            />
            <Input
              group
              label="Tujuan Permintaan Data"
              name="tujuanPermintaan"
              control={control}
              isDisabled
              rules={{ required: true }}
              error={errors.tujuanPermintaan?.message}
            />
            <Input
              group
              label="Target Waktu"
              name="targetWaktu"
              control={control}
              isDisabled
              rules={{ required: true }}
              error={errors.targetWaktu?.message}
            />
            <Input
              group
              label="Produsen Data"
              name="produsen"
              control={control}
              rules={{ required: true }}
              isDisabled
              error={errors.induk?.message}
            />
            <Input
              group
              label="Jenis Data"
              name="tipe"
              control={control}
              rules={{ required: true }}
              isDisabled
              error={errors.induk?.message}
            />
            <Input
              group
              label="URL Dataset"
              name="url"
              isLink
              isDisabled
              control={control}
              rules={{ required: true }}
              error={errors.url?.message}
            />
            <Button className="invisible" type="submit" />
          </Form>
        </Row>
        <Row className="w-25">
          <h4 className="fw-bold">Log Status</h4>
        </Row>
      </div>
      <div className="px-5">
        <h5 className="px-5 fw-bold mb-3 border-bottom-gray-stroke py-2">Informasi Peminta Data</h5>
        <ul>
          <div className="d-flex flex-row">
            <div className="px-5 col-2">
              <p className="fw-bold">Nama Lengkap</p>
            </div>
            <div className="px-5 col-2">
              <p className="fw-light">Nama</p>
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="px-5 col-2">
              <p className="fw-bold">NIP/NIK</p>
            </div>
            <div className="px-5 col-2">
              <p className="fw-light">NIK</p>
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="px-5 col-2">
              <p className="fw-bold">Instansi</p>
            </div>
            <div className="px-5 col-2">
              <p className="fw-light">{schema.instansi}</p>
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="px-5 col-2">
              <p className="fw-bold">Unit Kerja</p>
            </div>
            <div className="px-5 col-2">
              <p className="fw-light">Unit Kerja</p>
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="px-5 col-2">
              <p className="fw-bold">Status Kepegawaian</p>
            </div>
            <div className="px-5 col-2">
              <p className="fw-light">Status</p>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default PermintaanDataForm;
