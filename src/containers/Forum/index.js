import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  data_yang_diminta: yup.string().required(),
  tujuan_permintaan_data: yup.string().required(),
  tipe_data: yup.string().required(),
  instansi_dumber_data: yup.string().required(),
});

const DROPDOWN_LIST = [
  {
    value: 'Statistik',
    label: 'Statistik',
  },
  {
    value: 'Keuangan',
    label: 'Keuangan',
  },
  {
    value: 'Spasial',
    label: 'Spasial',
  },
  {
    value: 'Lainnya',
    label: 'Lainnya',
  },
];

const Forum = () => {
  const data = {
    nik: 3174082803910005,
    namaLengkap: 'Gilghashi Dullahaim',
    email: 'gilghashi@gmail.com',
    nomorHandphone: '0812192214',
    instansiPeminta: 'Arsip Nasional Republik Indonesia',
  };
  return (
    <Row className="ml-200 mr-200 mt-48 border-gray-stroke br-4">
      <Col xs={12} className="sdp-table-title p-24 border-bottom-gray-stroke">
        Formulir Permintaan Data
      </Col>
      <Formik
        validationSchema={schema}
        onSubmit={() => {}}
        initialValues={{
          data_yang_diminta: '',
          tujuan_permintaan_data: '',
        }}>
        {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Col xs={12} className="sdp-table-sub-title py-16 px-24">
              Data-diri
            </Col>
            <Row className="mb-3 px-24">
              <Form.Group as={Col} md="6" className="mb-16">
                <label className="sdp-form-label py-8">NIK</label>
                <Form.Control className="sdp-text-disable" type="text" name="nik" value={data.nik} readOnly />
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-16">
                <label className="sdp-form-label py-8">Nama Lengkap</label>
                <Form.Control
                  className="sdp-text-disable"
                  type="text"
                  name="namaLengkap"
                  value={data.namaLengkap}
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-16">
                <label className="sdp-form-label py-8">E-mail</label>
                <Form.Control className="sdp-text-disable" type="text" name="email" value={data.email} readOnly />
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-16">
                <label className="sdp-form-label py-8">Nomor Handphone</label>
                <Form.Control
                  className="sdp-text-disable"
                  type="text"
                  name="nomorHandphone"
                  value={data.nomorHandphone}
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-16">
                <label className="sdp-form-label py-8">Instansi Peminta</label>
                <Form.Control
                  className="sdp-text-disable"
                  type="text"
                  name="instansiPeminta"
                  value={data.instansiPeminta}
                  readOnly
                />
              </Form.Group>
            </Row>
            <Col xs={12} className="sdp-table-sub-title py-16 px-24">
              Permintaan Data
            </Col>
            <Row className="mb-3 px-24">
              <Form.Group as={Col} md="6" controlId="validationFormik01" className="mb-16">
                <label className="sdp-form-label py-8">Data yang diminta</label>
                <Form.Control
                  type="text"
                  name="data_yang_diminta"
                  value={values.data_yang_diminta}
                  onChange={handleChange}
                  isValid={touched.data_yang_diminta && !errors.data_yang_diminta}
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationFormik02" className="mb-16">
                <label className="sdp-form-label py-8">Tujuan Permintaan Data</label>
                <Form.Control
                  type="text"
                  name="tujuan_permintaan_data"
                  value={values.tujuan_permintaan_data}
                  onChange={handleChange}
                  isValid={touched.tujuan_permintaan_data && !errors.tujuan_permintaan_data}
                />
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-16">
                <label className="sdp-form-label py-8">Tipe Data</label>
                <SingleDropDown data={DROPDOWN_LIST} />
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-16">
                <label className="sdp-form-label py-8">Instansi Sumber Data</label>
                <SingleDropDown data={DROPDOWN_LIST} />
              </Form.Group>
            </Row>
            <Button type="submit" className="br-40 m-24 px-97 py-10">
              Kirit
            </Button>
          </Form>
        )}
      </Formik>
    </Row>
  );
};

export default Forum;
