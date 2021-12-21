import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker, Input } from 'components';

import { LogStatus } from 'components/Sidebars/LogStatus';
import bn from 'utils/bemNames';
import { BimtekLogSelector, BimtekPermintaanDataDetail, getPermintaanDataDetail, getListLogAktifitas } from './reducer';

const bem = bn('content-detail');

const CMSBimtekPermintaanEdit = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { records } = useSelector(BimtekLogSelector);
  const detailPermintaan = useSelector(BimtekPermintaanDataDetail);
  console.log(detailPermintaan);
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

  useEffect(() => {
    reset(detailPermintaan);
  }, []);

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
      name: yup.string().required(),
    })
    .required();

  const {
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...detailPermintaan,
    },
  });

  return (
    <Row className={bem.e('section')}>
      <Col sm={9}>
        <div>
          <div className="d-flex justify-content-between mb-4">
            <div className={bem.e('title')}>Permintaan Bimbingan Teknis Baru</div>
            <div>
              <Button className="ml-10" variant="secondary" style={{ width: '112px' }}>
                Tolak
              </Button>
              <Button className="ml-10" variant="info" style={{ width: '112px' }}>
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
                  name="tanggalMulaiDisetujui"
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
                  name="tanggalSelesaiDisetujui"
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
    </Row>
  );
};

export default CMSBimtekPermintaanEdit;
