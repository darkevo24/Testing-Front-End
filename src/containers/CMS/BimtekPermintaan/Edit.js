import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker, Input, Modal } from 'components';
import Notification from 'components/Notification';
import { LogStatus } from 'components/Sidebars/LogStatus';
import bn from 'utils/bemNames';
import { LeftChevron } from 'components/Icons';
import {
  bimtekLogSelector,
  bimtekPermintaanDataDetail,
  getPermintaanDataDetail,
  getListLogAktifitas,
  postStatusApprove,
  postStatusReject,
} from './reducer';

const bem = bn('content-detail');

const CMSBimtekPermintaanEdit = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { records } = useSelector(bimtekLogSelector);
  const detailPermintaan = useSelector(bimtekPermintaanDataDetail);
  const [showModalSetuju, setModalSetuju] = useState(false);
  const [showModalTolak, setModalTolak] = useState(false);

  const fetchBimtekLog = (params) => {
    return dispatch(getListLogAktifitas(params));
  };
  const fetchPermintaanDetail = (params) => {
    return dispatch(getPermintaanDataDetail(params));
  };

  useEffect(() => {
    fetchBimtekLog({ id });
    fetchPermintaanDetail({ id });
  }, []);

  const data = useMemo(() => detailPermintaan || {}, [detailPermintaan]);

  useEffect(() => {
    reset(data);
  }, [data]);

  const schema = yup
    .object({
      // name: yup.string().required(),
    })
    .required();

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
      waktuMulai: moment(data?.tanggalRequest).format('HH:mm'),
    },
  });

  const onSubmitTest = (dataInput) => {
    console.log(dataInput);
  };
  const onSubmitProses = (data) => {
    let obj = {
      id,
    };
    dispatch(postStatusApprove(obj)).then((res) => {
      res?.error
        ? Notification.show({
            type: 'secondary',
            message: <div> Gagal Update Status </div>,
            icon: 'cross',
          })
        : Notification.show({
            type: 'secondary',
            message: <div> Berhasil Update Status </div>,
            icon: 'check',
          });
    });
    setModalSetuju(false);
  };

  const onSubmitTolak = (data) => {
    let obj = {
      id,
    };
    dispatch(postStatusReject(obj)).then((res) => {
      res?.error
        ? Notification.show({
            type: 'secondary',
            message: <div> Gagal Update Status </div>,
            icon: 'cross',
          })
        : Notification.show({
            type: 'secondary',
            message: <div> Berhasil Update Status </div>,
            icon: 'check',
          });
    });
    setModalTolak(false);
  };

  const SuccessText = () => {
    const history = useHistory();
    const backToTable = () => {
      history.push('/cms/bimtek-permintaan');
    };
    return (
      <div className="d-flex">
        <div className="icon-box px-10" onClick={backToTable}>
          <LeftChevron></LeftChevron>
        </div>
        <Row className="permintaan-data-form-success fw-bold justify-content-center align-items-center">{data.status}</Row>
      </div>
    );
  };

  const WaitingText = () => {
    const history = useHistory();
    const backToTable = () => {
      history.push('/cms/bimtek-permintaan');
    };
    return (
      <div className="d-flex">
        <div className="icon-box" onClick={backToTable}>
          <LeftChevron></LeftChevron>
        </div>
        <Row className="permintaan-data-form-terproses fw-bold justify-content-center align-items-center">{data.status}</Row>
      </div>
    );
  };

  const DraftText = () => {
    const history = useHistory();
    const backToTable = () => {
      history.push('/cms/bimtek-permintaan');
    };
    return (
      <div className="d-flex">
        <div className="icon-box pr-10 pl-5" onClick={backToTable}>
          <LeftChevron></LeftChevron>
        </div>
        <Row className="permintaan-data-form-terkirim fw-bold justify-content-center align-items-center">{data.status}</Row>
      </div>
    );
  };

  const ButtonStatusPublish = () => {
    return (
      <div>
        <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => setModalSetuju(true)}>
          UnPublish
        </Button>
      </div>
    );
  };

  const ButtonStatusApproved = () => {
    return (
      <div>
        <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => setModalSetuju(true)}>
          Publish
        </Button>
      </div>
    );
  };

  const ButtonStatusWaitingList = () => {
    return (
      <div>
        <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => setModalSetuju(true)}>
          Ubah Ke Draft
        </Button>
      </div>
    );
  };

  const ButtonStatusDraft = () => {
    return (
      <div>
        <Button className="ml-10" variant="secondary" style={{ width: '112px' }} onClick={() => setModalTolak(true)}>
          Tolak
        </Button>
        <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => setModalSetuju(true)}>
          Setujui
        </Button>
      </div>
    );
  };

  const StatusBar = () => {
    switch (data.status) {
      case 'WAITING_REQUEST_APPROVAL':
        return <WaitingText />;
      case 'PUBLISHED':
        return <SuccessText />;
      case 'WAITING_APPROVAL':
        return <WaitingText />;
      case 'DRAFT':
        return <WaitingText />;
      default:
        return null;
    }
  };

  const ButtonStatusAction = () => {
    switch (data.status) {
      case 'WAITING_REQUEST_APPROVAL':
        return <ButtonStatusWaitingList />;
      case 'PUBLISHED':
        return <ButtonStatusPublish />;
      case 'WAITING_APPROVAL':
        return <ButtonStatusWaitingList />;
      case 'DRAFT':
        return <ButtonStatusDraft />;
      case 'APPROVED':
        return <ButtonStatusApproved />;
      default:
        return null;
    }
  };

  return (
    <div className={bem.e('cms-permintaan-detail')}>
      <StatusBar />
      <Row className={bem.e('section')}>
        <Col sm={9}>
          <div>
            <div className="d-flex justify-content-between mb-4">
              <div className={bem.e('title')}>Permintaan Bimbingan Teknis Baru</div>
              <ButtonStatusAction />
            </div>
            <Form className="sdp-form" onSubmit={handleSubmit(onSubmitTest)}>
              <Input readOnly group label="Nama Lengkap" name="requestor.nama" control={control} />
              <Input readOnly group label="Dinas Instansi" name="requestor.instansiName" control={control} />
              <Input readOnly group label="No. Handphoen" name="requestor.noHp" control={control} />
              <Input readOnly group label="Kota Pelaksana" name="kota" control={control} />
              <Input readOnly group label="Provinsi/Kab/Kota" name="requestor.provinsiName" control={control} />
              <Input readOnly group label="Jabatan / Peran Daftar" name="requestor.roles" control={control} />
              <Input readOnly group label="Email" name="requestor.email" control={control} />
              <Input readOnly group label="Ekspektasi Jumlah Peserta" name="ekspektasiJumlahPeserta" control={control} />
              <Input readOnly group label="Tagging Materi" name="tagMateri" control={control} />
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Mulai Pelaksanaan Disetujui"
                    name=""
                    control={control}
                    rules={{ required: false }}
                    error={errors.publishedDate?.message}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="waktuMulai"
                    control={control}
                    rules={{ required: false }}
                    error={errors.publishedTime?.message}
                  />
                </Col>
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Selesai Pelaksanaan Disetujui"
                    name=""
                    control={control}
                    rules={{ required: false }}
                    error={errors.publishedDate?.message}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="publishedTime"
                    control={control}
                    rules={{ required: false }}
                    error={errors.publishedTime?.message}
                  />
                </Col>
              </Row>
              <Button variant="secondary" type="submit">
                Proses test
              </Button>
            </Form>
          </div>
        </Col>
        <Col sm={3}>
          <LogStatus data={records} />
        </Col>
        <Modal
          showHeader={false}
          className="cms-bimtek-permintaan-detail"
          title="Tambah Pembicari Baru"
          visible={showModalSetuju}
          onClose={() => setModalSetuju(false)}>
          <div className="mt-20 mb-20">
            <p className="mb-0">
              Apakah anda yakin ingin
              <span className="sdp-text-blue fw-bold"> Menyetujui </span>
              Permintaan Bimbingan Teknis {id} ?
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmitProses)} noValidate>
            <div className="d-flex justify-content-end">
              <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={() => setModalSetuju()}>
                Batal
              </Button>
              <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                Konfirmasi
              </Button>
            </div>
          </Form>
        </Modal>
        <Modal
          showHeader={false}
          className="cms-bimtek-permintaan-detail"
          title="Tambah Pembicari Baru"
          visible={showModalTolak}
          onClose={() => setModalTolak(false)}>
          <div className="mt-20 mb-20">
            <p className="mb-0">
              Apakah anda yakin ingin
              <span className="text-danger"> Menolak </span>
              Permintaan Bimbingan Teknis {id} ?
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmitTolak)} noValidate>
            <Input as="textarea" control={control} />
            <div className="d-flex justify-content-end mt-20">
              <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={() => setModalTolak()}>
                Batal
              </Button>
              <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                Tolak
              </Button>
            </div>
          </Form>
        </Modal>
      </Row>
    </div>
  );
};

export default CMSBimtekPermintaanEdit;
