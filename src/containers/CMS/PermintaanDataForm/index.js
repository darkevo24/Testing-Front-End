import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getPermintaanDataDetail, permintaanDataDetailSelector } from './reducer';
import { Input } from '../../../components';
import bn from '../../../utils/bemNames';
import { LogStatus } from '../../../components/Sidebars/LogStatus';
import { LeftChevron } from '../../../components/Icons';
import Modal from '../../../components/Modal';

const bem = bn('content-detail');

const SuccessText = () => {
  const history = useHistory();
  const backToTable = () => {
    history.push('/permintaan-data');
  };
  return (
    <Row className="d-flex">
      <div className="icon-box py-4 px-4 w-auto" onClick={backToTable}>
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
      <div className="icon-box py-4 px-4 w-auto" onClick={backToTable}>
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
      <div className="icon-box py-4 px-4 w-auto" onClick={backToTable}>
        <LeftChevron></LeftChevron>
      </div>
      <Row className="permintaan-data-form-terproses fw-bold justify-content-center align-items-center">Terproses</Row>
    </Row>
  );
};

const TerkirimButton = (onTolak, onProses) => {
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

const DiprosesButton = (onSelesai) => {
  return (
    <div>
      <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={onSelesai}>
        Selesai
      </Button>
    </div>
  );
};

const CMSPermintaanDataView = () => {
  const [showTolakModal, setShowTolakModal] = useState(false);
  const [showProsesModal, setShowProsesModal] = useState(false);
  const [showSelesaiModal, setShowSelesaiModal] = useState(false);

  const dataLog = [];
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

  const dispatch = useDispatch();
  const result = useSelector(permintaanDataDetailSelector);
  const fetchDataset = () => {
    const url = window.location.pathname;
    const id = url.split('/')[3];
    return dispatch(getPermintaanDataDetail(id));
  };
  useEffect(() => {
    fetchDataset();
  }, []);
  const data = useMemo(() => result?.results || [], [result]);
  useEffect(() => {
    fetchDataset();
  }, []);

  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
    },
  });

  return (
    <div>
      {data.status === 'Selesai' ? <SuccessText /> : null}
      {data.status === 'Terkirim' ? <TerkirimText /> : null}
      {data.status === 'Diproses' ? <DiprosesText /> : null}
      <Row className={bem.e('section')}>
        <Col sm={9} className="my-5">
          <div>
            <div className="d-flex justify-content-between mb-4">
              <div className={bem.e('title')}>Detail</div>
              <div>
                {data.status === 'Terkirim' ? <TerkirimButton /> : null}
                {data.status === 'Diproses' ? <DiprosesButton /> : null}
              </div>
            </div>
            <Form className="sdp-form">
              <Input isDisabled group label="Deskripsi Data" name="deskripsi" control={control} />
              <Input isDisabled group label="Tujuan Permintaan data" name="tujuan" control={control} />
              <Input isDisabled group label="Target Waktu" name="targetWaktu" control={control} />
              <Input isDisabled group label="Produsen Data" name="produsen" control={control} />
              <Input isDisabled group label="Jenis Data" name="jenisData" control={control} />
              <Input isDisabled group isLink label="URL Dataset" name="position" control={control} />
            </Form>
            <div>
              <h5 className="fw-bold mb-3 border-bottom-gray-stroke py-2">Informasi Peminta Data</h5>
              <ul>
                <div className="d-flex flex-row">
                  <div className="col-2">
                    <p className="fw-bold">Nama Lengkap</p>
                  </div>
                  <div className="col-2">
                    <p className="fw-light">{data.namaPeminta}</p>
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div className="col-2">
                    <p className="fw-bold">NIP/NIK</p>
                  </div>
                  <div className="col-2">
                    <p className="fw-light">{data.NIK}</p>
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div className="col-2">
                    <p className="fw-bold">Instansi</p>
                  </div>
                  <div className="col-2">
                    <p className="fw-light">{data.instansi}</p>
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div className="col-2">
                    <p className="fw-bold">Unit Kerja</p>
                  </div>
                  <div className="col-2">
                    <p className="fw-light">{data.unitKerja}</p>
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
      </Row>
      <Modal
        Visible={showTolakModal}
        onClose={() => setShowTolakModal(false)}
        subtitle="Apakah anda menolak Permintaan Data?"
        actions={[
          { variant: 'secondary', text: 'Batal', onClick: () => setShowTolakModal(false) },
          { text: 'Konfirmasi', type: 'submit', onClick: () => setShowTolakModal(false) },
        ]}>
        <Form noValidate>
          <Form.Group as={Col} md="8" className="mb-16">
            <Form.Control type="text area" name="link" rules={{ required: true }} />
          </Form.Group>
        </Form>
      </Modal>
      <Modal
        Visible={showProsesModal}
        onClose={() => setShowProsesModal(false)}
        subtitle="Apakah anda memproses Permintaan Data?"
        actions={[
          { variant: 'secondary', text: 'Batal', onClick: () => setShowProsesModal(false) },
          { text: 'Konfirmasi', type: 'submit', onClick: () => setShowProsesModal(false) },
        ]}>
        <Form noValidate>
          <Form.Group as={Col} md="8" className="mb-16">
            <Form.Control type="text area" name="link" rules={{ required: true }} />
          </Form.Group>
        </Form>
      </Modal>
      <Modal
        Visible={showSelesaiModal}
        onClose={() => setShowSelesaiModal(false)}
        subtitle="Apakah anda ingin menyelesaikan Permintaan Data?"
        actions={[
          { variant: 'secondary', text: 'Batal', onClick: () => setShowSelesaiModal(false) },
          { text: 'Konfirmasi', type: 'submit', onClick: () => setShowSelesaiModal(false) },
        ]}>
        <Form noValidate>
          <Form.Group as={Col} md="8" className="mb-16">
            <Form.Control type="text area" name="link" rules={{ required: true }} />
          </Form.Group>
        </Form>
      </Modal>
    </div>
  );
};

export default CMSPermintaanDataView;
