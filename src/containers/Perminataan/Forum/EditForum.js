import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'components/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Input from 'components/Input';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import { DatePicker } from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, DROPDOWN_LIST } from './index';
import { useDispatch, useSelector } from 'react-redux';
import {
  getInstansiData,
  instansiiDatasetSelector,
  perminataanDatasetSelector,
  perminataanForumErrorSelector,
  setPerminataanData,
  updateResult,
} from '../slice';
import isEmpty from 'lodash/isEmpty';
import { usePrevious } from 'utils/hooks';

export const EditForum = ({ onClose, data }) => {
  const [tipeData, setTipeData] = useState({});
  const [instansiSumber, setInstansiSumber] = useState({});
  const [errorDetail, setErrorDetail] = useState({});
  const dispatch = useDispatch();
  const { newRecord, records, loading } = useSelector(perminataanDatasetSelector);
  const instansiDetail = useSelector(instansiiDatasetSelector);
  const apiError = useSelector(perminataanForumErrorSelector);
  const prevRecord = usePrevious(newRecord) || {};

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!instansiDetail?.instansiData?.length) dispatch(getInstansiData());
  }, []);

  useEffect(() => {
    const index = records.findIndex((item) => item.id === newRecord?.id);
    if (index !== -1 || isEmpty(newRecord)) return;
    dispatch(updateResult([...records, newRecord]));
    if (isEmpty(prevRecord) && !isEmpty(newRecord)) {
      onClose();
    }
  }, [newRecord]);

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
        tanggalTarget: detail.tanggalTarget,
        instansi: {
          id: instansiSumber.value,
        },
        jenisData: tipeData?.value !== 'Lainnya' ? tipeData.value : detail.tipeDataText,
      }),
    );
  };

  return (
    <Modal size="lg" visible={true} onClose={onClose} title="Formulir Permintaan Data">
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3 px-24">
          <Input
            group
            label="Data yang diminta"
            name="deskripsi"
            control={control}
            rules={{ required: true }}
            error={errors?.deskripsi ? 'Data yang diminta is required' : ''}
            labelClass="sdp-form-label py-8 mb-0 fw-normal"
          />
          <Input
            group
            label="Tujuan Permintaan Data"
            name="tujuanPermintaan"
            control={control}
            rules={{ required: true }}
            error={errors?.tujuanPermintaan ? 'Tujuan Permintaan Data is required' : ''}
            labelClass="sdp-form-label py-8 mb-0 fw-normal"
          />
          <Form.Group as={Col} md="12" className="mb-16">
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
          {tipeData?.value === 'Lainnya' && (
            <Input
              group
              label="Add New Tipe Data"
              name="tipeDataText"
              control={control}
              rules={{ required: true }}
              error={errors?.tipeDataText ? 'Tipe Data is required' : ''}
              labelClass="sdp-form-label py-8 mb-0 fw-normal"
            />
          )}
          <Form.Group as={Col} md="12" className="mb-16">
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

          <DatePicker
            group
            label="Target Waktu"
            labelClass="sdp-form-label py-8 mb-0 fw-normal"
            name="tanggalTarget"
            control={control}
            error={errors?.tanggalTarget ? 'Target Waktu is required' : ''}
            rules={{ required: true }}
          />

          {apiError ? (
            <Form.Group as={Col} md="12" className="mb-16">
              <label className="sdp-text-red">{apiError}</label>
            </Form.Group>
          ) : null}
        </Row>
        <div className="d-flex justify-content-end px-24">
          <Button variant="light" className="border-0 mr-12 mb-12 px-62 py-12 bg-transparent sdp-text-red" onClick={onClose}>
            Betal
          </Button>
          <Button type="submit" variant="outline-primary" className="br-40 mb-12 mr-12 px-54 py-12">
            {loading && (
              <Spinner
                variant="danger"
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="mr-10"
              />
            )}
            Simpan
          </Button>
          <Button type="submit" className="br-40 mb-12 px-54 py-12">
            {loading && (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-10" />
            )}
            Kirim
          </Button>
        </div>
      </Form>
    </Modal>
  );
};