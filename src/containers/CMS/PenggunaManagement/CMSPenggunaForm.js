import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FileInput, Input } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { submitForm } from 'utils/helper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SingleSelectDropdown from 'components/DropDown/SingleSelectDropDown';
import { getPenggunaDetails, penggunanDataDetailSelector } from '../PenggunaManagementDetails/reducer';
import {
  getPenggunaRoleList,
  getPenggunaStatusList,
  getInstansiData,
  getUnitKerjaData,
  penggunaRoleDataSelector,
  instansiDataSelector,
  unitKerjaDataSelector,
} from './reducer';
import { post } from 'utils/request';
import { apiUrls } from 'utils/constants';

export const penggunaFormId = 'pengguna-form-id';
export const submitpenggunaForm = submitForm(penggunaFormId);

const CMSpenggunaForm = ({ disabled, onSubmit, data }) => {
  const [disableForm, setDisableForm] = useState(false);
  const [penggunaDetails, setPenggunaDetails] = useState({});
  const [instansiErr, setInstansiErr] = useState(false);
  const [fileErr, setFileErr] = useState(false);
  const [role, setRole] = useState('');
  const dispatch = useDispatch();

  const { records: penggunaRoleData } = useSelector(penggunaRoleDataSelector);
  const { records: penggunaInstansiData } = useSelector(instansiDataSelector);
  const { records: penggunaUnitKerjaData } = useSelector(unitKerjaDataSelector);
  const { records: penggunaDetailsData } = useSelector(penggunanDataDetailSelector);
  const penggunaStatusData = ['PNS', 'PPNPN'];
  useEffect(() => {
    setValue('roles', role);
  }, [role]);

  const schema = yup
    .object({
      employeeIdNumber: yup.number().positive().required('NIK/NIP is required field'),
      employeeStatus: yup
        .object({
          label: yup.string().nullable().required(),
          value: yup.string().nullable().required('Status is a required field'),
        })
        .required(),
      name: yup.string().required(),
      instansi: yup.mixed().required(),
      unitKerja: yup
        .object({
          label: yup.string().defined().required(),
          value: yup.string().defined('unitKerja is a required field').required(),
        })
        .required(),
      email: yup.string().email().required(),
      phoneArea: yup.string().nullable().required(),
      phoneNumber: yup.string().length(10).nullable().required(),
      supervisorName: yup.mixed().required(),
      roles: yup.string().required(),
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
        roles: penggunaDetailsData.roles,
        officialMemo: penggunaDetailsData.officialMemo,
      };
      setPenggunaDetails(updatedData);
    }
  }, [penggunaDetailsData]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: penggunaDetails,
  });

  useEffect(() => {
    setDisableForm(disabled);
  }, [disabled]);

  useEffect(() => {
    dispatch(getPenggunaRoleList());
    dispatch(getPenggunaStatusList());
    dispatch(getInstansiData());
  }, []);
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
    setRole(penggunaDetails.roles);
  }, [penggunaDetails]);

  const changeInstansi = (e) => {
    setValue('instansi', e);
    dispatch(getUnitKerjaData(e.value));
    setInstansiErr(true);
    setValue('unitKerja', null);
  };

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
        type="number"
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
      <SingleSelectDropdown
        data={penggunaInstansiData?.map((kategori) => ({ value: kategori.id, label: kategori.nama }))}
        control={control}
        name="instansi"
        isDisabled={disableForm}
        className="mb-3"
        onChange={changeInstansi}
      />
      <div className="sdp-error" hidden={instansiErr}>
        {errors.instansi?.message}
      </div>

      <Form.Label>Unit Kerja</Form.Label>
      <SingleSelectDropdown
        data={penggunaUnitKerjaData.map((kategori) => ({ value: kategori.id, label: kategori.nama }))}
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

      <Form.Label>Role</Form.Label>
      <Form.Group>
        <div className="radio-group">
          <Controller
            name="roles"
            control={control}
            render={({ field }) =>
              penggunaRoleData.map((data, index) => {
                return (
                  <Form.Check
                    key={index}
                    {...field}
                    inline
                    label={data}
                    value={role}
                    checked={data === role}
                    type="radio"
                    disabled={disableForm}
                    onChange={() => setRole(data)}
                  />
                );
              })
            }
          />
        </div>
        <div className="sdp-error">{errors.roles?.message}</div>
      </Form.Group>
      {disableForm ? (
        <div>
          {penggunaDetailsData?.officialMemo?.fileName ? penggunaDetailsData?.officialMemo?.fileName : 'No File'} is Selected
        </div>
      ) : (
        <>
          <FileInput
            group
            disabled={disableForm}
            label="Nota Dinas"
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
      <Button className="invisible" type="submit" />
    </Form>
  );
};

export default CMSpenggunaForm;
