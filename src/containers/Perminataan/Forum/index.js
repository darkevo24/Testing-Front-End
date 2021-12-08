import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import * as yup from 'yup';
import { BackArrow } from 'components/Icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from 'containers/Login/reducer';
import Input from 'components/Input';
import { getInstansiData, instansiDataSelector } from 'containers/App/reducer';
import { setPerminataanData, perminataanDatasetSelector, perminataanForumErrorSelector } from '../reducer';

export const schema = yup.object({
  deskripsi: yup.string().required(),
  tujuanPermintaan: yup.string().required(),
  tanggalTarget: yup.string().required(),
});

export const DROPDOWN_LIST = [
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
  const [tipeData, setTipeData] = useState({});
  const [instansiSumber, setInstansiSumber] = useState({});
  const [errorDetail, setErrorDetail] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const { loading } = useSelector(perminataanDatasetSelector);
  const instansiDetail = useSelector(instansiDataSelector);
  const apiError = useSelector(perminataanForumErrorSelector);

  const handleBackButton = () => {
    history.push('/permintaan-data');
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!instansiDetail?.result?.length) dispatch(getInstansiData());
  }, []);

  const onSubmit = (detail) => {
    if (loading) return;
    let errorClone = { ...errorDetail };
    if (!tipeData?.value) errorClone = { ...errorClone, tipeData: true };
    if (!instansiSumber?.value) errorClone = { ...errorClone, instansiSumber: true };
    if (!isEmpty(errorClone)) {
      setErrorDetail(errorClone);
      return;
    }

    dispatch(
      setPerminataanData({
        deskripsi: detail.deskripsi,
        tujuanPermintaan: detail.tujuanPermintaan,
        tanggalTarget: moment(detail.tanggalTarget).format('YYYY-MM-DD'),
        instansi: {
          id: instansiSumber.value,
        },
        jenisData: tipeData?.value !== 'Lainnya' ? tipeData.value : detail.tipeDataText,
      }),
    ).then((e) => {
      if (e?.error?.message) return;
      handleBackButton();
    });
  };

  return (
    <>
      <Row className="ml-200 mr-200 mt-48 border-gray-stroke br-4">
        <Col
          xs={12}
          className="sdp-table-title p-24 border-bottom-gray-stroke d-flex align-items-center cursor-pointer"
          onClick={handleBackButton}>
          <BackArrow props={{ variant: 'dark' }} /> <span className="ml-10">Formulir Permintaan Data</span>
        </Col>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Col xs={12} className="sdp-table-sub-title py-16 px-24">
            Data-diri
          </Col>
          <Row className="mb-3 px-24">
            <Form.Group as={Col} md="6" className="mb-16">
              <label className="sdp-form-label py-8">NIK</label>
              <Form.Control className="sdp-text-disable" type="text" name="nik" value={user?.nik || ''} readOnly />
            </Form.Group>
            <Form.Group as={Col} md="6" className="mb-16">
              <label className="sdp-form-label py-8">Nama Lengkap</label>
              <Form.Control className="sdp-text-disable" type="text" name="namaLengkap" value={user?.name || ''} readOnly />
            </Form.Group>
            <Form.Group as={Col} md="6" className="mb-16">
              <label className="sdp-form-label py-8">E-mail</label>
              <Form.Control className="sdp-text-disable" type="text" name="email" value={user?.email || ''} readOnly />
            </Form.Group>
            <Form.Group as={Col} md="6" className="mb-16">
              <label className="sdp-form-label py-8">Nomor Handphone</label>
              <Form.Control
                className="sdp-text-disable"
                type="text"
                name="nomorHandphone"
                value={user?.nomorHandphone || ''}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} md="6" className="mb-16">
              <label className="sdp-form-label py-8">Instansi Peminta</label>
              <Form.Control
                className="sdp-text-disable"
                type="text"
                name="instansiPeminta"
                value={user?.instansiPeminta || ''}
                readOnly
              />
            </Form.Group>
          </Row>
          <Col xs={12} className="sdp-table-sub-title py-16 px-24">
            Permintaan Data
          </Col>
          <Row className="mb-3 px-24">
            <Form.Group as={Col} md="6" controlId="validationFormik01" className="mb-16">
              <Input
                group
                label="Data yang diminta"
                name="deskripsi"
                control={control}
                rules={{ required: true }}
                error={errors?.deskripsi ? 'Data yang diminta is required' : ''}
                labelClass="sdp-form-label py-8 mb-0 fw-normal"
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormik02" className="mb-16">
              <Input
                group
                label="Tujuan Permintaan Data"
                name="tujuanPermintaan"
                control={control}
                rules={{ required: true }}
                error={errors?.tujuanPermintaan ? 'Tujuan Permintaan Data is required' : ''}
                labelClass="sdp-form-label py-8 mb-0 fw-normal"
              />
            </Form.Group>
            <Form.Group as={Col} md="6" className="mb-16">
              <label className="sdp-form-label py-8">Tipe Data</label>
              <SingleDropDown
                data={DROPDOWN_LIST}
                onChange={(data = {}) => {
                  setTipeData(data);
                  delete errorDetail.tipeData;
                }}
                placeHolder=""
              />
              {errorDetail?.tipeData && <label className="sdp-text-red py-8">Tipe Data is required</label>}
            </Form.Group>
            <Form.Group as={Col} md="6" className="mb-16">
              <label className="sdp-form-label py-8">Instansi Sumber Data</label>
              <SingleDropDown
                data={instansiDetail?.instansiData.map((item) => ({ value: item.id, label: item.nama }))}
                isLoading={instansiDetail?.loading || false}
                onChange={(data = {}) => {
                  setInstansiSumber(data);
                  delete errorDetail.instansiData;
                }}
                placeHolder=""
              />
              {errorDetail?.instansiSumber && <label className="sdp-text-red py-8">Instansi Sumber Data is required</label>}
            </Form.Group>
            {tipeData?.value === 'Lainnya' && (
              <Form.Group as={Col} md="6" className="mb-16">
                <Input
                  label="Add New Tipe Data"
                  name="tipeDataText"
                  control={control}
                  rules={{ required: true }}
                  error={errors?.tipeDataText ? 'Tipe Data is required' : ''}
                  labelClass="sdp-form-label py-8 mb-0 fw-normal"
                />
              </Form.Group>
            )}
            <Form.Group as={Col} md="6" className="mb-16">
              <DatePicker
                label="Target Waktu"
                labelClass="sdp-form-label py-8 mb-0 fw-normal"
                name="tanggalTarget"
                control={control}
                error={errors?.tanggalTarget ? 'Target Waktu is required' : ''}
                rules={{ required: true }}
              />
            </Form.Group>

            {apiError ? (
              <Form.Group as={Col} md="12" className="mb-16">
                <label className="sdp-text-red">{apiError}</label>
              </Form.Group>
            ) : null}
          </Row>
          <div className="d-flex justify-content-end px-24">
            <Button variant="light" className="br-40 mr-12 mb-12 px-62 py-12 bg-transparent" onClick={handleBackButton}>
              Batal
            </Button>
            <Button type="submit" variant="info" className="br-40  mb-12 px-54 py-12">
              {loading && (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-10" />
              )}
              Simpan
            </Button>
          </div>
        </Form>
      </Row>
    </>
  );
};

export default Forum;
