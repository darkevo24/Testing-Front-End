import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormLabel } from 'react-bootstrap';
import moment from 'moment';
import { Controller, useForm } from 'react-hook-form';
import { ReadOnlyInputs, FileInput, Input, DatePicker } from 'components';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { submitForm } from 'utils/helper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SingleSelectDropdown from 'components/DropDown/SingleSelectDropDown';
import {
  instansiSelector,
  getInstansiData,
  getUnitKerjaData,
  unitKerjaSelector,
  getRoleData,
  rolelistSelector,
} from './reducer';
import { getPenggunaDetails, penggunanDataDetailSelector } from './reducer';
import { post } from 'utils/request';
import { apiUrls } from 'utils/constants';
import Switch from 'components/Switch';

export const penggunaFormId = 'pengguna-form-id';
export const submitpenggunaForm = submitForm(penggunaFormId);

const NotaWrapper = styled.div`
  display: inline-block;
  padding: 10px;
  border: 1px solid #e1e2ea;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const PenggunaForm = ({ disabled, onSubmit, data, onStatusChange = () => {} }) => {
  const [disableForm, setDisableForm] = useState(false);
  const [penggunaDetails, setPenggunaDetails] = useState({});
  const [fileErr, setFileErr] = useState(false);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { records: instansi } = useSelector(instansiSelector);
  const { unitKerja: unitkerja } = useSelector(unitKerjaSelector);
  const { roles } = useSelector(rolelistSelector);
  const { records: penggunaDetailsData } = useSelector(penggunanDataDetailSelector);
  const penggunaStatusData = ['PNS', 'PPNPN'];

  useEffect(() => {
    dispatch(getRoleData());
    dispatch(getInstansiData());
  }, []);

  // const fetchPenggunanData = (id) => {
  //   dispatch(getPenggunaDetails(id));
  // };

  useEffect(() => {
    if (instansi?.instansiId) {
      dispatch(getUnitKerjaData(instansi.instansiId));
    }
  }, [instansi]);

  const schema = yup
    .object({
      employeeIdNumber: yup.string().required('NIK/NIP is required field'),
      employeeStatus: yup
        .object({
          label: yup.string().nullable().required(),
          value: yup.string().nullable().required('Status is a required field'),
        })
        .required(),
      name: yup.string().required(),
      instansi: yup.mixed().required().default(instansi?.instansiId),
      unitKerja: yup
        .object({
          label: yup.string().defined().required(),
          value: yup.string().defined('unitKerja is a required field').required(),
        })
        .required('Unit Kerja is a required field'),
      email: yup.string().email().required(),
      phoneArea: yup.string().nullable().required(),
      startActiveDate: yup.string().nullable().required(),
      endActiveDate: yup.string().nullable().required(),
      phoneNumber: yup.string().required(),
      supervisorName: yup.mixed().required(),
      roles: yup.mixed().required(),
      officialMemo: yup.mixed().nullable().required(),
    })
    .required();

  useEffect(() => {
    if (penggunaDetailsData && !isEmpty(penggunaDetailsData)) {
      const updatedData = {
        ...penggunaDetailsData,
        employeeStatus: {
          ...penggunaDetailsData.employeeStatus,
          label: penggunaDetailsData.employeeStatus,
          value: penggunaDetailsData.employeeStatus,
        },
        instansi: {
          ...penggunaDetailsData.instansi,
          label: penggunaDetailsData.instansi?.nama,
          value: penggunaDetailsData.instansi?.nama,
        },
        unitKerja: {
          ...penggunaDetailsData.unitKerja,
          label: penggunaDetailsData.unitKerja?.nama,
          value: penggunaDetailsData.unitKerja?.id,
        },
        roles: {
          ...penggunaDetailsData.roles,
          label: penggunaDetailsData.roles,
          value: penggunaDetailsData.roles,
        },
        officialMemo: penggunaDetailsData.officialMemo,
        startActiveDate: penggunaDetailsData.startActiveDate,
        endActiveDate: penggunaDetailsData.endActiveDate,
      };
      setPenggunaDetails(updatedData);
    }
  }, [penggunaDetailsData]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: penggunaDetails,
  });

  const minStartDate = moment(new Date(), 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
  const startActiveValue = watch('startActiveDate');

  useEffect(() => {
    setDisableForm(disabled);
  }, [disabled]);

  useEffect(() => {
    if (data) {
      dispatch(getPenggunaDetails(data));
    } else {
      setPenggunaDetails({});
    }
  }, [data]);

  useEffect(() => {
    if (penggunaDetails) {
      reset(penggunaDetails);
    }
  }, [penggunaDetails]);

  const uploadMemo = async (fileData) => {
    const fileFormData = new FormData();
    fileFormData.append('file', fileData);

    try {
      const res = await post(apiUrls.publicFileUpload, fileFormData, { headers: { 'Content-Type': '' } });
      setValue('officialMemo', res.data, { shouldValidate: true });
      setFileErr(true);
    } catch (error) {}
  };

  return (
    <Form id={penggunaFormId} className="sdp-form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Input
        group
        disabled={disableForm}
        label="NIK/NIP"
        name="employeeIdNumber"
        control={control}
        type="text"
        error={errors.employeeIdNumber?.message}
      />

      <Form.Label>Status Kepegawaian</Form.Label>
      <SingleSelectDropdown
        data={penggunaStatusData.map((kategori) => ({ value: kategori, label: kategori }))}
        control={control}
        name="employeeStatus"
        isDisabled={disableForm}
        className="mb-3"
      />
      <div className="sdp-error">{errors.employeeStatus?.value?.message}</div>
      <Input group disabled={disableForm} label="Nama" name="name" control={control} error={errors.name?.message} />
      <Form.Label>Instansi</Form.Label>
      <ReadOnlyInputs
        group
        labelClass="sdp-form-label fw-normal"
        type="text"
        control={control}
        defaultValue={instansi.instansiName}
      />
      <div className="sdp-error">{errors.instansi?.message}</div>
      <Form.Label>Unit Kerja</Form.Label>
      <SingleSelectDropdown
        data={unitkerja.map((kategori) => ({ value: kategori.id, label: kategori.nama }))}
        control={control}
        name="unitKerja"
        isDisabled={disableForm}
        className="mb-3"
      />
      <div className="sdp-error">{errors.unitKerja?.value?.message}</div>
      <Input
        group
        disabled={disableForm}
        label="Email"
        name="email"
        control={control}
        type="email"
        error={errors.email?.message}
      />

      <div className="sdp-form-phone">
        <Input
          group
          disabled={disableForm}
          label="Kode Area"
          name="phoneArea"
          control={control}
          type="number"
          error={errors.phoneArea?.message}
        />
        <Input
          group
          disabled={disableForm}
          label="Nomor Handphone"
          name="phoneNumber"
          type="number"
          control={control}
          error={errors.phoneNumber?.message}
        />
      </div>

      <Input
        group
        disabled={disableForm}
        label="Nama Atasan"
        name="supervisorName"
        control={control}
        error={errors.supervisorName?.message}
      />
      <Form.Group>
        <Form.Label>Role</Form.Label>
        <SingleSelectDropdown data={roles} control={control} name="roles" isDisabled={disableForm} className="mb-3" />
        <div className="sdp-error">{errors.roles?.message}</div>
      </Form.Group>
      <Row className="align-items-end mb-15">
        <>
          <Col>
            <DatePicker
              group
              label="Dari Tanggal"
              name="startActiveDate"
              control={control}
              error={errors.startActiveDate?.message}
              rules={{ required: true }}
              min={minStartDate}
              disabled={disableForm}
            />
          </Col>
          <Col>
            <DatePicker
              group
              label="Sampai Tanggal"
              name="endActiveDate"
              control={control}
              error={errors.endActiveDate?.message}
              rules={{ required: true }}
              min={startActiveValue ? startActiveValue : minStartDate}
              disabled={disableForm}
            />
          </Col>
        </>
      </Row>
      <Form.Group>
        <FormLabel className="w-100">Nota Dinas</FormLabel>
        {disableForm ? (
          <NotaWrapper>
            {penggunaDetailsData?.officialMemo?.fileName ? penggunaDetailsData?.officialMemo?.fileName : 'No File'}
          </NotaWrapper>
        ) : (
          <>
            <FileInput
              group
              disabled={disableForm}
              name="officialMemo"
              control={control}
              uploadInfo="Upload Image (format .png, .jpeg, .jpg max. 512KB)"
              handleOnChange={uploadMemo}
            />
            <div className="sdp-error" hidden={fileErr}>
              {errors.officialMemo?.message}
            </div>
          </>
        )}
      </Form.Group>
      <Form.Label>Status</Form.Label>
      <Switch isOn={status} handleToggle={() => setStatus(!status)} type={'ACTIVE'} />
      <Button className="invisible" type="submit" />
    </Form>
  );
};

export default PenggunaForm;
