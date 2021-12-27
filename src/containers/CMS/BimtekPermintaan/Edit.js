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
  postStatusDraft,
  postStatusPublish,
  postStatusUnpublish,
  updateStatusBimtekSetujui,
} from './reducer';

const bem = bn('content-detail');

const CMSBimtekPermintaanEdit = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { records } = useSelector(bimtekLogSelector);
  const detailPermintaan = useSelector(bimtekPermintaanDataDetail);
  const [trigger, setTrigger] = useState(false);
  const [objRequired, setObjRequired] = useState({});
  const [showModalSetuju, setModalSetuju] = useState(false);
  const [showModalWaitingSetujui, setModalWaitingSetujui] = useState(false);
  const [showModalTolak, setModalTolak] = useState(false);
  const [showModalDraft, setModalDraft] = useState(false);
  const [showModalPublish, setModalPublish] = useState(false);
  const [showModalUnpublish, setModalUnpublish] = useState(false);
  const fetchBimtekLog = (params) => {
    return dispatch(getListLogAktifitas(params));
  };
  const fetchPermintaanDetail = (params) => {
    return dispatch(getPermintaanDataDetail(params));
  };
  useEffect(() => {
    fetchBimtekLog({ id });
    fetchPermintaanDetail({ id });
  }, [trigger]);

  const data = useMemo(() => detailPermintaan || {}, [detailPermintaan]);

  useEffect(() => {
    reset(data);
  }, [data]);
  const schema = yup.object(objRequired).required();

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
    },
  });
  const backToTable = () => {
    history.push('/cms/bimtek-permintaan');
  };
  const onSetModalWaitingSetujui = () => {
    setObjRequired({
      namaBimbinganTeknis: yup.string().required(),
      tempatBimbinganTeknis: yup.string().required(),
      tanggalMulaiDisetujuiUpdate: yup.string().required(),
      tanggalSelesaiDisetujuiUpdate: yup.string().required(),
      jamMulaiDisetujuiUpdate: yup.string().required(),
      jamSelesaiDisetujuiUpdate: yup.string().required(),
    });
    setModalWaitingSetujui(true);
  };

  const onSetModalTolak = () => {
    setObjRequired({
      catatanTolak: yup.string().required(),
    });
    setModalTolak(true);
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
      catatan: data.catatanTolak,
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

  const onSubmitDraft = (data) => {
    let obj = {
      id,
    };
    dispatch(postStatusDraft(obj)).then((res) => {
      res?.error
        ? Notification.show({
            type: 'secondary',
            message: <div> Gagal Update Status Menjadi Draft </div>,
            icon: 'cross',
          })
        : Notification.show({
            type: 'secondary',
            message: <div> Berhasil Update Status Menjadi Draft </div>,
            icon: 'check',
          });
    });
    setModalDraft(false);
  };

  const onSubmitPublish = (data) => {
    let obj = {
      id,
    };
    dispatch(postStatusPublish(obj)).then((res) => {
      res?.error
        ? Notification.show({
            type: 'secondary',
            message: <div> Gagal Publish Status Permintaan Bimbingan Teknis </div>,
            icon: 'cross',
          })
        : Notification.show({
            type: 'secondary',
            message: <div> Berhasil Publish Status Permintaan Bimbingan Teknis </div>,
            icon: 'check',
          });
    });
    setModalPublish(false);
  };

  const onSubmitUnpublish = (data) => {
    let obj = {
      id,
    };
    dispatch(postStatusUnpublish(obj)).then((res) => {
      res?.error
        ? Notification.show({
            type: 'secondary',
            message: <div> Gagal Unpublish Status </div>,
            icon: 'cross',
          })
        : Notification.show({
            type: 'secondary',
            message: <div> Berhasil Unpublish Status </div>,
            icon: 'check',
          });
    });
    setModalUnpublish(false);
  };

  const onSubmitSetujuiBimbingan = (data) => {
    const tanggalMulaiDisetujui = `${moment(data.tanggalMulaiDisetujuiUpdate).format('YYYY-MM-DD')} ${
      data.jamMulaiDisetujuiUpdate
    }:00`;
    const tanggalSelesaiDisetujui = `${moment(data.tanggalSelesaiDisetujuiUpdate).format('YYYY-MM-DD')} ${
      data.jamSelesaiDisetujuiUpdate
    }:00`;
    let obj = {
      id: data.id,
      namaBimtek: data.namaBimbinganTeknis,
      tagMateri: data.tagMateri,
      tanggalMulaiDisetujui,
      tanggalSelesaiDisetujui,
      kota: data.kotaId,
      alamat: data.tempatBimbinganTeknis,
    };
    dispatch(updateStatusBimtekSetujui(obj)).then((res) => {
      res.payload
        ? Notification.show({
            type: 'secondary',
            message: <div> Berhasil Menyetujui Bimbingan Teknis </div>,
            icon: 'check',
          })
        : Notification.show({
            type: 'secondary',
            message: <div> Gagal Menyetujui Bimbingan Teknis </div>,
            icon: 'cross',
          });
    });
    setModalWaitingSetujui(false);
    setTrigger(true);
  };

  const SuccessText = () => {
    return (
      <div className="d-flex">
        <div className="icon-box px-10" onClick={backToTable}>
          <LeftChevron />
        </div>
        <Row className="permintaan-data-form-success fw-bold justify-content-center align-items-center">{data.status}</Row>
      </div>
    );
  };

  const WaitingApproval = () => {
    return (
      <div className="d-flex">
        <div className="icon-box" onClick={backToTable}>
          <LeftChevron />
        </div>
        <Row className="permintaan-data-form-terproses fw-bold justify-content-center align-items-center">
          Waiting Approval
        </Row>
      </div>
    );
  };

  const WaitingRequestApproval = () => {
    return (
      <div className="d-flex">
        <div className="icon-box" onClick={backToTable}>
          <LeftChevron />
        </div>
        <Row className="permintaan-data-form-terproses fw-bold justify-content-center align-items-center">
          Waiting Request Approval
        </Row>
      </div>
    );
  };

  const DraftText = () => {
    return (
      <div className="d-flex">
        <div className="icon-box" onClick={backToTable}>
          <LeftChevron />
        </div>
        <Row className="permintaan-data-form-terproses fw-bold justify-content-center align-items-center">DRAFT</Row>
      </div>
    );
  };

  const RejectedText = () => {
    return (
      <div className="d-flex">
        <div className="icon-box" onClick={backToTable}>
          <LeftChevron />
        </div>
        <Row className="permintaan-data-form-terproses fw-bold justify-content-center align-items-center">REJECTED</Row>
      </div>
    );
  };

  const ButtonStatusPublish = () => {
    return (
      <div>
        <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => setModalUnpublish(true)}>
          Unpublish
        </Button>
      </div>
    );
  };

  const ButtonStatusApproved = () => {
    return (
      <div>
        <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => setModalPublish(true)}>
          Publish
        </Button>
      </div>
    );
  };

  const ButtonStatusWaitingRequestApproval = () => {
    return (
      <div>
        <Button className="ml-10" variant="secondary" style={{ width: '112px' }} onClick={onSetModalTolak}>
          Tolak
        </Button>
        <Button className="ml-10" variant="info" onClick={onSetModalWaitingSetujui}>
          Setujui
        </Button>
      </div>
    );
  };

  const ButtonStatusWaitingApproval = () => {
    return (
      <div>
        <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => setModalDraft(true)}>
          Kirim
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

  const ButtonStatusRejected = () => {
    return (
      <div>
        <Button className="ml-10" variant="secondary" style={{ width: '112px' }} onClick={() => setModalTolak(true)}>
          Tolak
        </Button>
      </div>
    );
  };

  const StatusBar = () => {
    switch (data.status) {
      case 'WAITING_REQUEST_APPROVAL':
        return <WaitingRequestApproval />;
      case 'PUBLISHED':
        return <SuccessText />;
      case 'WAITING_APPROVAL':
        return <WaitingApproval />;
      case 'DRAFT':
        return <DraftText />;
      case 'REJECTED':
        return <RejectedText />;
      default:
        return null;
    }
  };

  const ButtonStatusAction = () => {
    switch (data.status) {
      case 'WAITING_REQUEST_APPROVAL':
        return <ButtonStatusWaitingRequestApproval />;
      case 'PUBLISHED':
        return <ButtonStatusPublish />;
      case 'WAITING_APPROVAL':
        return <ButtonStatusWaitingApproval />;
      case 'DRAFT':
        return <ButtonStatusDraft />;
      case 'APPROVED':
        return <ButtonStatusApproved />;
      case 'REJECTED':
        return <ButtonStatusRejected />;
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
            <Form className="sdp-form">
              <Input readOnly group label="Nama Lengkap" name="requestor.nama" control={control} />
              <Input readOnly group label="Dinas Instansi" name="requestor.instansiName" control={control} />
              <Input readOnly group label="No. Handphoen" name="requestor.noHp" control={control} />
              <Input readOnly group label="Kota Pelaksana" name="kota" control={control} />
              <Input readOnly group label="Provinsi/Kab/Kota" name="requestor.provinsiName" control={control} />
              <Input readOnly group label="Jabatan / Peran Daftar" name="requestor.roles" control={control} />
              <Input readOnly group label="Email" name="requestor.email" control={control} />
              <Input readOnly group label="Ekspektasi Jumlah Peserta" name="ekspektasiJumlahPeserta" control={control} />
              <Input readOnly group label="Tagging Materi" name="tagMateri" control={control} />
              <Input
                group
                label="Nama Bimbingan Teknis"
                name="namaBimbinganTeknis"
                control={control}
                error={errors.namaBimbinganTeknis?.message}
              />
              <Input
                group
                label="Tempat"
                name="tempatBimbinganTeknis"
                control={control}
                error={errors.tempatBimbinganTeknis?.message}
              />
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Mulai Pelaksanaan Disetujui"
                    name="tanggalMulaiDisetujuiUpdate"
                    control={control}
                    rules={{ required: false }}
                    error={errors.tanggalMulaiDisetujuiUpdate?.message}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="jamMulaiDisetujuiUpdate"
                    control={control}
                    rules={{ required: false }}
                    error={errors.jamMulaiDisetujuiUpdate?.message}
                  />
                </Col>
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Selesai Pelaksanaan Disetujui"
                    name="tanggalSelesaiDisetujuiUpdate"
                    control={control}
                    rules={{ required: false }}
                    error={errors.tanggalSelesaiDisetujuiUpdate?.message}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="jamSelesaiDisetujuiUpdate"
                    control={control}
                    rules={{ required: false }}
                    error={errors.jamSelesaiDisetujuiUpdate?.message}
                  />
                </Col>
              </Row>
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
          visible={showModalSetuju}>
          <div className="mt-20 mb-20">
            <p className="mb-0">
              Apakah anda yakin ingin
              <span className="sdp-text-blue fw-bold"> Menyetujui </span>
              Permintaan Bimbingan Teknis {id} ?
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmitProses)} noValidate>
            <div className="d-flex justify-content-end">
              <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={() => setModalSetuju(false)}>
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
          visible={showModalDraft}>
          <div className="mt-20 mb-20">
            <p className="mb-0">
              Apakah anda yakin ingin
              <span className="sdp-text-blue fw-bold"> Merubah Status </span>
              Permintaan Bimbingan Teknis {id} menjadi Draft ?
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmitDraft)} noValidate>
            <div className="d-flex justify-content-end">
              <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={() => setModalDraft(false)}>
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
          visible={showModalPublish}>
          <div className="mt-20 mb-20">
            <p className="mb-0">
              Apakah anda yakin ingin
              <span className="sdp-text-blue fw-bold"> Merubah Status </span>
              Permintaan Bimbingan Teknis {id} menjadi Unpublish?
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmitPublish)} noValidate>
            <div className="d-flex justify-content-end">
              <Button
                className="mr-10"
                variant="secondary"
                style={{ width: '112px' }}
                onClick={() => setModalPublish(false)}>
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
          visible={showModalUnpublish}>
          <div className="mt-20 mb-20">
            <p className="mb-0">
              Apakah anda yakin ingin
              <span className="sdp-text-blue fw-bold"> Merubah Status </span>
              Permintaan Bimbingan Teknis {id} menjadi Unpublish?
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmitUnpublish)} noValidate>
            <div className="d-flex justify-content-end">
              <Button
                className="mr-10"
                variant="secondary"
                style={{ width: '112px' }}
                onClick={() => setModalUnpublish(false)}>
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
          visible={showModalTolak}>
          <div className="mt-20 mb-20">
            <p className="mb-0">
              Apakah anda yakin ingin
              <span className="text-danger"> Menolak </span>
              Permintaan Bimbingan Teknis {id} ?
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmitTolak)} noValidate>
            <Input as="textarea" name="catatanTolak" control={control} error={errors.catatanTolak?.message} />
            <div className="d-flex justify-content-end mt-20">
              <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={() => setModalTolak(false)}>
                Batal
              </Button>
              <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                Tolak
              </Button>
            </div>
          </Form>
        </Modal>
        <Modal
          showHeader={false}
          className="cms-bimtek-permintaan-detail"
          title="Tambah Pembicari Baru"
          visible={showModalWaitingSetujui}>
          <div className="mt-20 mb-20">
            <p className="mb-0">
              Apakah anda yakin ingin
              <span className="sdp-text-blue"> Menyetujui </span>
              Permintaan Bimbingan Teknis {id} ?
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmitSetujuiBimbingan)} noValidate>
            <div className="d-flex justify-content-end mt-20">
              <Button
                className="mr-10"
                variant="secondary"
                style={{ width: '112px' }}
                onClick={() => setModalWaitingSetujui(false)}>
                Batal
              </Button>
              <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                Konfirmasi
              </Button>
            </div>
          </Form>
        </Modal>
      </Row>
    </div>
  );
};

export default CMSBimtekPermintaanEdit;
