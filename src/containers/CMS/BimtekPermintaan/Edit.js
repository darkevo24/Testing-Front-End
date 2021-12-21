import React, { useEffect, useMemo, useState } from 'react';
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
  BimtekLogSelector,
  BimtekPermintaanDataDetail,
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
  const { records } = useSelector(BimtekLogSelector);
  const detailPermintaan = useSelector(BimtekPermintaanDataDetail);
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
      ...detailPermintaan,
    },
  });

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

  const TerkirimText = () => {
    const history = useHistory();
    const backToTable = () => {
      history.push('/cms/bimtek-permintaan');
    };
    return (
      <div className="d-flex">
        <div className="icon-box pr-10 pl-5" onClick={backToTable}>
          <LeftChevron></LeftChevron>
        </div>
        <Row className="permintaan-data-form-terkirim fw-bold justify-content-center align-items-center">Terkirim</Row>
      </div>
    );
  };

  return (
    <div>
      {data.status === 'PUBLISHED' ? <SuccessText /> : null}
      {data.status === 'WAITING_REQUEST_APPROVAL' ? <WaitingText /> : null}
      {data.status === 'WAITING_APPROVAL' ? <WaitingText /> : null}
      <Row className={bem.e('section')}>
        <Col sm={9}>
          <div>
            <div className="d-flex justify-content-between mb-4">
              <div className={bem.e('title')}>Permintaan Bimbingan Teknis Baru</div>
              <div>
                <Button className="ml-10" variant="secondary" style={{ width: '112px' }} onClick={() => setModalTolak(true)}>
                  Tolak
                </Button>
                <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => setModalSetuju(true)}>
                  Setujui
                </Button>
              </div>
            </div>
            <Form className="sdp-form">
              <Input disabled group label="Nama Lengkap" name="requestor.nama" control={control} />
              <Input disabled group label="Dinas Instansi" name="requestor.instansiName" control={control} />
              <Input disabled group label="No. Handphoen" name="requestor.noHp" control={control} />
              <Input disabled group label="Kota Pelaksana" name="kota" control={control} />
              <Input disabled group label="Provinsi/Kab/Kota" name="requestor.provinsiName" control={control} />
              <Input disabled group label="Jabatan / Peran Daftar" name="requestor.roles" control={control} />
              <Input disabled group label="Email" name="requestor.email" control={control} />
              <Input disabled group label="Ekspektasi Jumlah Peserta" name="talentCount" control={control} />
              <Input disabled group label="Tagging Materi" name="tagMateri" control={control} />
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
                    name="publishedTime"
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
              <span className="text-blue"> Menyetujui </span>
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
