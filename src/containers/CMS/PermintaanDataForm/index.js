import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import InputGroup from 'react-bootstrap/InputGroup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getPermintaanDataDetail,
  permintaanDataDetailSelector,
  postPermintaanDataProses,
  postPermintaanDataSelesai,
  postPermintaanDataTolak,
} from './reducer';
import { Input } from 'components';
import bn from 'utils/bemNames';
import { LogStatus } from 'components/Sidebars/LogStatus';
import { LeftChevron } from 'components/Icons';
import Modal from 'components/Modal';

const bem = bn('content-detail');
export const tolakFormId = 'tolak-form-id';
export const prosesFormId = 'proses-form-id';
export const selesaiFormId = 'selesai-form-id';

const SuccessText = () => {
  const history = useHistory();
  const backToTable = () => {
    history.push('/permintaan-data');
  };
  return (
    <div className="d-flex">
      <div className="icon-box py-4 px-4 w-auto" onClick={backToTable}>
        <LeftChevron></LeftChevron>
      </div>
      <Row className="permintaan-data-form-success fw-bold justify-content-center align-items-center">Selesai</Row>
    </div>
  );
};

const TerkirimText = () => {
  const history = useHistory();
  const backToTable = () => {
    history.push('/permintaan-data');
  };
  return (
    <div className="d-flex">
      <div className="icon-box py-4 px-4 w-auto" onClick={backToTable}>
        <LeftChevron></LeftChevron>
      </div>
      <Row className="permintaan-data-form-terkirim fw-bold justify-content-center align-items-center">Terkirim</Row>
    </div>
  );
};

const DiprosesText = () => {
  const history = useHistory();
  const backToTable = () => {
    history.push('/permintaan-data');
  };
  return (
    <div className="d-flex">
      <div className="icon-box py-4 px-4 w-auto" onClick={backToTable}>
        <LeftChevron></LeftChevron>
      </div>
      <Row className="permintaan-data-form-terproses fw-bold justify-content-center align-items-center">Terproses</Row>
    </div>
  );
};

const TerkirimButton = ({ onTolak, onProses }) => {
  return (
    <div>
      <Button className="ml-10" variant="secondary" style={{ width: '112px' }} onClick={onTolak}>
        Tolak
      </Button>
      <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={onProses}>
        Proses
      </Button>
    </div>
  );
};

const DiprosesButton = ({ onSelesai }) => {
  return (
    <div>
      <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={onSelesai}>
        Selesai
      </Button>
    </div>
  );
};

const CMSPermintaanDataView = () => {
  const [showTolakModal, isSetShowTolakModal] = useState(false);
  const [showProsesModal, isSetShowProsesModal] = useState(false);
  const [showSelesaiModal, isSetShowSelesaiModal] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const setShowTolakModal = () => {
    isSetShowTolakModal(true);
  };

  const hideTolakModal = () => {
    isSetShowTolakModal(false);
  };

  const setShowProsesModal = () => {
    isSetShowProsesModal(true);
  };

  const hideProsesModal = () => {
    isSetShowProsesModal(false);
  };

  const setShowSelesaiModal = () => {
    isSetShowSelesaiModal(true);
  };

  const hideSelesaiModal = () => {
    isSetShowSelesaiModal(false);
  };

  const dataLog = [
    {
      date: '12 Desember 2021',
      status: 'Selesai',
      content: 'Dataset sudah dapat di akses di portal data.go.id',
    },
    {
      date: '10 Desember 2021',
      status: 'Diproses',
      content: 'Dataset sudah dapat di akses di portal data.go.id',
    },
    {
      date: '08 Desember 2021',
      status: 'Terkirim',
      content: 'Dataset sudah dapat di akses di portal data.go.id',
    },
    {
      date: '08 Desember 2021',
      status: 'Dibuat',
      content: 'Dataset sudah dapat di akses di portal data.go.id',
    },
  ];
  const schema = yup
    .object({
      id: yup.mixed().required(),
      namaPeminta: yup.mixed().required(),
      deskripsi: yup.mixed().required(),
      jenisData: yup.string().required(),
      tanggaltarget: yup.string().required(),
      produsen: yup.mixed().required(),
      tipe: yup.mixed().required(),
      tanggalPermintaan: yup.string().required(),
      tujuanPermintaan: yup.string().required(),
      status: yup.mixed().required(),
      catatan: yup.mixed().required(),
      urlDataset: yup.string().required(),
    })
    .required();

  const dispatch = useDispatch();
  const result = useSelector(permintaanDataDetailSelector);
  const fetchDataset = () => {
    const url = window.location.pathname;
    const id = url.split('/')[3];
    return dispatch(getPermintaanDataDetail(id));
  };
  const onSubmitTolak = (data) => {
    const url = window.location.pathname;
    const id = url.split('/')[3];
    dispatch(postPermintaanDataTolak(id));
    window.location.reload();
    hideTolakModal();
  };

  const onSubmitProses = (data) => {
    const url = window.location.pathname;
    const id = url.split('/')[3];
    dispatch(postPermintaanDataProses(id));
    window.location.reload();
  };

  const onSubmitSelesai = (data) => {
    const url = window.location.pathname;
    const id = url.split('/')[3];
    dispatch(postPermintaanDataSelesai(id));
    window.location.reload();
  };

  const data = useMemo(() => result || {}, [result]);
  useEffect(() => {
    fetchDataset();
    reset(data);
  }, [trigger]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
    },
  });

  return (
    <div>
      {data.status === 'SELESAI' ? <SuccessText /> : null}
      {data.status === 'TERKIRIM' ? <TerkirimText /> : null}
      {data.status === 'DIPROSES' ? <DiprosesText /> : null}
      <Row className={bem.e('section')}>
        <Col sm={9} className="my-5">
          <div>
            <div className="d-flex justify-content-between mb-4">
              <div className={bem.e('title')}>Detail</div>
              <div>
                {data.status === 'TERKIRIM' ? (
                  <TerkirimButton onTolak={setShowTolakModal} onProses={setShowProsesModal} />
                ) : null}
                {data.status === 'DIPROSES' ? <DiprosesButton onSelesai={setShowSelesaiModal} /> : null}
              </div>
            </div>
            <Form className="sdp-form" noValidate>
              <Input isDisabled={true} group label="Deskripsi Data" name="deskripsi" control={control} />
              <Input isDisabled={true} group label="Tujuan Permintaan data" name="tujuanPermintaan" control={control} />
              <Input isDisabled={true} group label="Target Waktu" name="tanggalTarget" control={control} />
              <Input isDisabled={true} group label="Produsen Data" name="produsen" control={control} />
              <Input isDisabled={true} group label="Jenis Data" name="jenisData" control={control} />
              <Input isDisabled={true} group isLink label="URL Dataset" name="urlDataset" control={control} />
            </Form>
            <div>
              <h5 className="fw-bold mb-3 border-bottom-gray-stroke py-2">Informasi Peminta Data</h5>
              <ul>
                <div className="d-flex flex-row">
                  <div className="col-2">
                    <p className="fw-bold">Nama Lengkap</p>
                  </div>
                  <div className="col-2">
                    <p className="fw-light">{data.user?.name}</p>
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div className="col-2">
                    <p className="fw-bold">NIP/NIK</p>
                  </div>
                  <div className="col-2">
                    <p className="fw-light">{data.user?.roles}</p>
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div className="col-2">
                    <p className="fw-bold">Instansi</p>
                  </div>
                  <div className="col-2">
                    <p className="fw-light">{data.user?.instansi}</p>
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div className="col-2">
                    <p className="fw-bold">Unit Kerja</p>
                  </div>
                  <div className="col-2">
                    <p className="fw-light">{data.user?.unitKerja}</p>
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div className="col-2">
                    <p className="fw-bold">Status Kepegawaian</p>
                  </div>
                  <div className="col-2">
                    <p className="fw-light">{data.status}</p>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </Col>
        <Col sm={3} className="my-5">
          <LogStatus data={dataLog} />
        </Col>
        <Modal showHeader={false} visible={showTolakModal} onClose={() => hideTolakModal()}>
          <div className="mt-20 mb-20">
            <p className="font-weight-bold mb-0">
              Apakah anda yakin ingin
              <span className="text-danger"> menolak </span>
              Permintaan Data
            </p>
            PD00013?
          </div>
          <Form id={tolakFormId} onSubmit={handleSubmit(onSubmitTolak)} noValidate>
            <Form.Group as={Col} md="12" className="mb-16">
              <Input
                name="catatan"
                as="textarea"
                control={control}
                rules={{ required: true }}
                placeholder="Tulis catatan"
                type="text"
                error={errors.catatan?.message}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={() => hideTolakModal()}>
                Batal
              </Button>
              <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => onSubmitTolak()}>
                proses
              </Button>
            </div>
          </Form>
        </Modal>
        <Modal showHeader={false} visible={showProsesModal} onClose={() => hideProsesModal(false)}>
          <div className="mt-20 mb-20">
            <p className="mb-0">
              Apakah anda yakin ingin
              <span className="text-blue"> Menyelesaikan </span>
              Permintaan Data
            </p>
            <span className="font-weight-bold"> PD00013 </span>?
          </div>
          <div className="alert"> Masukan url dataset terkait pada kolom berikut </div>
          <InputGroup>
            <div className="url">URL</div>
            <Form.Control variant="normal" type="text" />
          </InputGroup>
          <Form id={prosesFormId} onSubmit={handleSubmit(onSubmitProses)} noValidate>
            <Form.Group as={Col} md="12" className="mb-16 mt-15">
              <Input
                name="catatan"
                as="textarea"
                control={control}
                rules={{ required: true }}
                placeholder="Tulis catatan"
                type="text"
                error={errors.catatan?.message}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={() => hideProsesModal()}>
                Batal
              </Button>
              <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => onSubmitProses()}>
                proses
              </Button>
            </div>
          </Form>
        </Modal>
        <Modal
          showHeader={false}
          visible={showSelesaiModal}
          onClose={() => hideSelesaiModal()}
          title=""
          actions={[
            { variant: 'secondary', text: 'Batal', onClick: () => hideSelesaiModal() },
            { text: 'Konfirmasi', type: 'submit', onClick: () => onSubmitSelesai() },
          ]}>
          <Form id={selesaiFormId} onSubmit={handleSubmit(onSubmitSelesai)} noValidate>
            <Form.Group as={Col} md="12" className="mb-16">
              <Input group isLink label="URL Dataset" name="url" control={control} rules={{ required: true }} />
              <Input
                name="catatan"
                as="textarea"
                control={control}
                rules={{ required: true }}
                placeholder="Tulis catatan"
                type="text"
                error={errors.catatan?.message}
              />
            </Form.Group>
          </Form>
        </Modal>
      </Row>
    </div>
  );
};

export default CMSPermintaanDataView;