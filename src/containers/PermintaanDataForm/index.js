import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker, Dropdown, Input } from 'components';
import { submitForm } from 'utils/helper';
import { nameData } from '../../utils/dataConfig/dafter';
import { LeftChevron } from '../../components/Icons';
import { useHistory } from 'react-router-dom';

export const permintaanDataFormId = 'permintaan-data-form-id';
export const submitPermintaanDataForm = submitForm(permintaanDataFormId);
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

const PermintaanDataForm = ({ data, onSubmit }) => {
  const history = useHistory();
  const backToTable = () => {
    history.push('/permintaan-data');
  };
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
      <Row className="d-flex">
        <div className="icon-box border py-4 px-4 w-auto" onClick={backToTable}>
          <LeftChevron></LeftChevron>
        </div>
        <Row className="permintaan-data-form-success fw-bold justify-content-center align-items-center">Selesai</Row>
      </Row>
      <Row className="d-flex">
        <div className="icon-box border py-4 px-4 w-auto" onClick={backToTable}>
          <LeftChevron></LeftChevron>
        </div>
        <Row className="permintaan-data-form-terkirim fw-bold justify-content-center align-items-center">Terkirim</Row>
      </Row>
      <Row className="d-flex">
        <div className="icon-box border py-4 px-4 w-auto" onClick={backToTable}>
          <LeftChevron></LeftChevron>
        </div>
        <Row className="permintaan-data-form-terproses fw-bold justify-content-center align-items-center">Terproses</Row>
      </Row>
      <div className="p-5 d-flex flex-row">
        <Row className="w-75 px-5">
          <Col>
            <h1 className="mb-5 fw-bold">Detail</h1>
          </Col>
          <Col>
            <Button variant="info" className="text-white py-2 px-5 fw-bold float-end mx-4">
              Selesai
            </Button>
            <Button variant="info" className="text-white py-2 px-5 fw-bold float-end">
              Proses
            </Button>
            <Button variant="outline-secondary" className="text-black fw-bold py-2 px-5 mx-4 float-end">
              Tolak
            </Button>
          </Col>
          <Form id={permintaanDataFormId} onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
              group
              label="Deskripsi Data"
              name="deskripsi"
              control={control}
              rules={{ required: true }}
              error={errors.deskripsi?.message}
            />
            <Input
              group
              label="Tujuan Permintaan Data"
              name="tujuanPermintaan"
              control={control}
              rules={{ required: true }}
              error={errors.tujuanPermintaan?.message}
            />
            <DatePicker
              group
              label="Target Waktu"
              name="targetWaktu"
              control={control}
              rules={{ required: true }}
              error={errors.targetWaktu?.message}
            />
            <Dropdown
              group
              label="Produsen Data"
              name="produsen"
              control={control}
              rules={{ required: true }}
              placeholder="Pilih produsen"
              options={nameData.map((name) => ({ value: name, label: name }))}
              error={errors.induk?.message}
            />
            <Dropdown
              group
              label="Jenis Data"
              name="tipe"
              control={control}
              rules={{ required: true }}
              placeholder="Pilih jenis data"
              options={nameData.map((name) => ({ value: name, label: name }))}
              error={errors.induk?.message}
            />
            <Input
              group
              label="URL Dataset"
              name="url"
              isLink
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
    </div>
  );
};

export default PermintaanDataForm;
