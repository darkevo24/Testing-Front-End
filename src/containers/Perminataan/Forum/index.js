import React, { useEffect } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import * as yup from 'yup';
import { BackArrow } from 'components/Icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker, ReadOnlyInputs } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from 'containers/Login/reducer';
import Input from 'components/Input';
import { getInstansiData, instansiDataSelector } from 'containers/App/reducer';
import { setPerminataanData, perminataanDatasetSelector, perminataanForumErrorSelector } from '../reducer';
import { SingleSelectDropdown } from 'components/DropDown/SingleSelectDropDown';
import isEqual from 'lodash/isEqual';

export const schema = yup.object({
  deskripsi: yup.string().required(),
  tujuanPermintaan: yup.string().required(),
  tanggalTarget: yup.mixed().required(),
  instansiSumber: yup.mixed().required(),
  tipeData: yup.mixed().required(),
  tipeDataText: yup.string().when('tipeData', {
    is: (value) =>
      isEqual(value, {
        value: 'Lainnya',
        label: 'Lainnya',
      }),
    then: yup.string().required('Tipe Data is required').typeError('Tipe Data is required'),
  }),
});

export const DROPDOWN_LIST = ['Statistik', 'Keuangan', 'Spasial', 'Lainnya'];

const Forum = () => {
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
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const value = watch();
  useEffect(() => {
    if (!instansiDetail?.result?.length) dispatch(getInstansiData());
  }, []);

  const onSubmit = (detail) => {
    if (loading) return;
    dispatch(
      setPerminataanData({
        deskripsi: detail.deskripsi,
        tujuanPermintaan: detail.tujuanPermintaan,
        tanggalTarget: moment(detail.tanggalTarget).format('YYYY-MM-DD'),
        instansi: {
          id: detail.instansiSumber.value,
        },
        jenisData: detail.tipeData?.value !== 'Lainnya' ? detail.tipeData.value : detail.tipeDataText,
      }),
    ).then((e) => {
      if (e?.error?.message) return;
      handleBackButton();
    });
  };

  const readOnlyFields = [
    {
      label: 'Nik',
      value: user?.nik || '',
    },
    {
      label: 'Nama Lengkap',
      value: user?.nama || '',
    },
    {
      label: 'E-mail',
      value: user?.email || '',
    },
    {
      label: 'Nomor Handphone',
      value: user?.noHp || '',
    },
    {
      label: 'Instansi Peminta',
      value: user?.instansiName || '',
    },
  ];

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
            {readOnlyFields.map((field, index) => (
              <Form.Group key={`read-only-input-${index}`} as={Col} md="6" className="mb-16">
                <ReadOnlyInputs className="sdp-text-disable" labelClass="sdp-form-label fw-normal" {...field} />
              </Form.Group>
            ))}
          </Row>
          <Col xs={12} className="sdp-table-sub-title py-16 px-24">
            Permintaan Data
          </Col>
          <Row className="mb-3 px-24">
            <Form.Group as={Col} md="6" controlId="validationFormik01" className="mb-16">
              <Input
                label="Data yang diminta"
                name="deskripsi"
                control={control}
                error={errors?.deskripsi ? 'Data yang diminta is required' : ''}
                labelClass="sdp-form-label  mb-0 fw-normal"
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormik02" className="mb-16">
              <Input
                label="Tujuan Permintaan Data"
                name="tujuanPermintaan"
                control={control}
                error={errors?.tujuanPermintaan ? 'Tujuan Permintaan Data is required' : ''}
                labelClass="sdp-form-label  mb-0 fw-normal"
              />
            </Form.Group>
            <Form.Group as={Col} md="6" className="mb-16">
              <label className="sdp-form-label ">Tipe Data</label>
              <SingleSelectDropdown
                data={DROPDOWN_LIST.map((item) => ({ value: item, label: item }))}
                placeholder=""
                control={control}
                className="sdp-form-label "
                error={errors?.tipeData?.message ? 'Tipe Data is required' : ''}
                name="tipeData"
              />
            </Form.Group>
            <Form.Group as={Col} md="6" className="mb-16">
              <label className="sdp-form-label">Instansi Sumber Data</label>
              <SingleSelectDropdown
                data={(instansiDetail?.result || []).map((item) => ({ value: item.id, label: item.nama }))}
                placeholder=""
                control={control}
                className="sdp-form-label "
                error={errors?.instansiSumber?.message ? 'Instansi Sumber Data is required' : ''}
                isLoading={instansiDetail?.loading || false}
                name="instansiSumber"
              />
            </Form.Group>
            {value?.tipeData?.value === 'Lainnya' && (
              <Form.Group as={Col} md="6" className="mb-16">
                <Input
                  label="Add New Tipe Data"
                  name="tipeDataText"
                  control={control}
                  error={errors?.tipeDataText ? 'Tipe Data is required' : ''}
                  labelClass="sdp-form-label  mb-0 fw-normal"
                />
              </Form.Group>
            )}
            <Form.Group as={Col} md="6" className="mb-16">
              <DatePicker
                label="Target Waktu"
                labelClass="sdp-form-label mb-0 fw-normal"
                name="tanggalTarget"
                control={control}
                error={errors?.tanggalTarget?.message ? 'Target Waktu is required' : ''}
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
