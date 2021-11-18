import React from 'react';
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

const bem = bn('content-detail');

const CMSBimtekPermintaanEdit = (props) => {
  // const id = props.match.params.id;
  // const history = useHistory();
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
  } = useForm({
    resolver: yupResolver(schema),
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
            <Input disabled group label="Nama Lengkap" name="name" control={control} />
            <Input disabled group label="Dinas Instansi" name="instance" control={control} />
            <Input disabled group label="No. Handphoen" name="phoneNumber" control={control} />
            <Input disabled group label="Kota Pelaksana" name="city" control={control} />
            <Input disabled group label="Provinsi/Kab/Kota" name="domisili" control={control} />
            <Input disabled group label="Jabatan / Peran Daftar" name="position" control={control} />
            <Input disabled group label="Email" name="email" control={control} />
            <Input disabled group label="Ekspektasi Jumlah Peserta" name="talentCount" control={control} />
            <Input disabled group label="Tagging Materi" name="materi" control={control} />
            <Row className="align-items-end">
              <Col>
                <DatePicker
                  group
                  label="Tanggal Mulai Pelaksanaan Disetujui"
                  name="publishedDate"
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
                  name="publishedDate"
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
        <LogStatus data={dataLog} />
      </Col>
    </Row>
  );
};

export default CMSBimtekPermintaanEdit;
