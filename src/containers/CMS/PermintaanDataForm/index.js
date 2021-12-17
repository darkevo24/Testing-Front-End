import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import InputGroup from 'react-bootstrap/InputGroup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getPermintaanDataDetail,
  getPermintaanDataDetailLog,
  permintaanDataDetailSelector,
  postPermintaanDataProses,
  postPermintaanDataSelesai,
  postPermintaanDataTolak,
} from './reducer';
import Notification from 'components/Notification';
import { Input } from 'components';
import bn from 'utils/bemNames';
import { LogStatus } from 'components/Sidebars/LogStatus';
import { LeftChevron } from 'components/Icons';
import Modal from 'components/Modal';

const bem = bn('content-detail');
export const tolakFormId = 'tolak-form-id';
export const prosesFormId = 'proses-form-id';
export const selesaiFormId = 'selesai-form-id';

const CMSPermintaanDataView = () => {
  const [showTolakModal, isSetShowTolakModal] = useState(false);
  const [showProsesModal, isSetShowProsesModal] = useState(false);
  const [showSelesaiModal, isSetShowSelesaiModal] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { result, dataLog } = useSelector(permintaanDataDetailSelector);

  const SuccessText = () => {
    const history = useHistory();
    const backToTable = () => {
      history.push('/cms/permintaan-data');
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
      history.push('/cms/permintaan-data');
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
      history.push('/cms/permintaan-data');
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

  const schema = yup
    .object({
      // id: yup.mixed().required(),
      // namaPeminta: yup.mixed().required(),
      // deskripsi: yup.mixed().required(),
      // jenisData: yup.string().required(),
      // tanggaltarget: yup.string().required(),
      // produsen: yup.mixed().required(),
      // tipe: yup.mixed().required(),
      // tanggalPermintaan: yup.string().required(),
      // tujuanPermintaan: yup.string().required(),
      // status: yup.mixed().required(),
      catatan: yup.string().required(),
      // catatanproses: yup.string().required(),
      urlDataset: yup.string().required(),
    })
    .required();

  const fetchDataset = () => {
    return dispatch(getPermintaanDataDetail(id));
  };
  const fetchDatasetLog = () => {
    return dispatch(getPermintaanDataDetailLog(id));
  };

  const onSubmitTolak = (data) => {
    let obj = {
      id,
      catatan: data.catatan,
    };
    dispatch(postPermintaanDataTolak(obj)).then((res) => {
      res
        ? Notification.show({
            type: 'secondary',
            message: <div> Permintaan Data Berhasil Ditolak </div>,
            icon: 'check',
          })
        : Notification.show({
            type: 'secondary',
            message: <div> Permintaan Data Gagal Ditolak </div>,
            icon: 'cross',
          });
    });
    hideTolakModal();
  };

  const onSubmitProses = (data) => {
    let obj = {
      id,
      catatan: data.catatan,
    };
    dispatch(postPermintaanDataProses(obj)).then((res) => {
      res
        ? Notification.show({
            type: 'secondary',
            message: <div> Permintaan Data Berhasil Diproses </div>,
            icon: 'check',
          })
        : Notification.show({
            type: 'secondary',
            message: <div> Permintaan Data Gagal Diproses </div>,
            icon: 'cross',
          });
    });
    hideProsesModal();
  };

  const onSubmitSelesai = (data) => {
    console.log(data);
    let obj = {
      id,
      catatan: data.catatan,
      url: data.urlDataset,
    };
    dispatch(postPermintaanDataSelesai(obj)).then((res) => {
      res
        ? Notification.show({
            type: 'secondary',
            message: <div> Permintaan Data Berhasil Diselesaikan </div>,
            icon: 'check',
          })
        : Notification.show({
            type: 'secondary',
            message: <div> Permintaan Data Gagal Diselesaikan </div>,
            icon: 'cross',
          });
    });
    hideSelesaiModal();
  };

  const data = useMemo(() => result || {}, [result]);
  useEffect(() => {
    fetchDataset();
    fetchDatasetLog();
  }, []);

  useEffect(() => {
    reset(data);
  }, [data]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      if(data) {
        return data;
      },
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
              <Input disabled group label="Deskripsi Data" name="deskripsi" control={control} />
              <Input disabled group label="Tujuan Permintaan data" name="tujuanPermintaan" control={control} />
              <Input disabled group label="Target Waktu" name="tanggalTarget" control={control} />
              <Input disabled group label="Produsen Data" name="produsen" control={control} />
              <Input disabled group label="Jenis Data" name="jenisData" control={control} />
              <Input disabled group isLink label="URL Dataset" name="urlDataset" control={control} />
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
        <Modal
          className="modal-permintaan-detail"
          showHeader={false}
          visible={showTolakModal}
          onClose={() => hideTolakModal()}>
          <div className="mt-20 mb-20">
            <p className="font-weight-bold mb-0">
              Apakah anda yakin ingin
              <span className="text-danger"> menolak </span>
              Permintaan Data
            </p>
            {id} ?
          </div>
          <Form onSubmit={handleSubmit(onSubmitTolak)} noValidate>
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
              <span className="length">0/140</span>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={() => hideTolakModal()}>
                Batal
              </Button>
              <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                Proses
              </Button>
            </div>
          </Form>
        </Modal>
        <Modal
          className="modal-permintaan-detail"
          showHeader={false}
          visible={showProsesModal}
          onClose={() => hideProsesModal()}
          title="">
          <div className="mt-20 mb-20">
            <p className="font-weight-bold mb-0">
              Apakah anda yakin ingin
              <span className="text-blue"> memproses </span>
              Permintaan Data
            </p>
            {id} ?
          </div>
          <Form onSubmit={handleSubmit(onSubmitProses)} noValidate>
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
              <span className="length">0/140</span>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={() => hideProsesModal()}>
                Batal
              </Button>
              <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                Proses
              </Button>
            </div>
          </Form>
        </Modal>
        <Modal
          showHeader={false}
          className="modal-permintaan-data-proses"
          visible={showSelesaiModal}
          onClose={() => hideSelesaiModal(false)}>
          <div className="mt-20 mb-20">
            <p className="mb-0">
              Apakah anda yakin ingin
              <span className="text-blue"> Menyelesaikan </span>
              Permintaan Data
            </p>
            <span className="font-weight-bold"> {id} </span>?
          </div>
          <div className="alert"> Masukan url dataset terkait pada kolom berikut </div>
          <Form id={prosesFormId} onSubmit={handleSubmit(onSubmitSelesai)} noValidate>
            <InputGroup>
              <div className="url">URL</div>
              <Input name="urlDataset" control={control} type="text" />
            </InputGroup>
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
              <span className="length">0/140</span>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={() => hideSelesaiModal()}>
                Batal
              </Button>
              <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                Selesai
              </Button>
            </div>
          </Form>
        </Modal>
      </Row>
    </div>
  );
};

export default CMSPermintaanDataView;
