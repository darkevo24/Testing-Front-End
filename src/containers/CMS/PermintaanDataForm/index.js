import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
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

const bem = bn('content-detail');

const CMSPermintaanDataView = () => {
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
    <Row className={bem.e('section')}>
      <Col sm={9}>
        <div>
          <div className="d-flex justify-content-between mb-4">
            <div className={bem.e('title')}>Detail</div>
            <div>
              <Button className="ml-10" variant="secondary" style={{ width: '112px' }}>
                Tolak
              </Button>
              <Button className="ml-10" variant="info" style={{ width: '112px' }}>
                Proses
              </Button>
              <Button className="ml-10" variant="info" style={{ width: '112px' }}>
                Selesai
              </Button>
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
      <Col sm={3}>
        <LogStatus data={dataLog} />
      </Col>
    </Row>
  );
};

export default CMSPermintaanDataView;
