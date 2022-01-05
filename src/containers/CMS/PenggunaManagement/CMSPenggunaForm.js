import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FileInput, Input } from 'components';
import { useForm } from 'react-hook-form';
import SingleSelectDropdown from 'components/DropDown/SingleSelectDropDown';
import { getPenggunaDetails, penggunanDataDetailSelector } from '../PenggunaManagementDetails/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getPenggunaRoleList, getPenggunaStatusList, penggunaRoleDataSelector, penggunaStatusDataSelector } from './reducer';
import { getInstansiData, instansiDataSelector } from 'containers/App/reducer';
import { isEmpty } from 'lodash';
import { submitForm } from 'utils/helper';

export const penggunaFormId = 'pengguna-form-id';
export const submitpenggunaForm = submitForm(penggunaFormId);

const CMSpenggunaForm = ({ disabled, onsubmit, data }) => {
  const [disableForm, setDisableForm] = useState(false);
  const [penggunaDetails, setPenggunaDetails] = useState({});
  const [checkRole, setCheckRole] = useState([]);
  const dispatch = useDispatch();

  const { records: penggunaRoleData } = useSelector(penggunaRoleDataSelector);
  const { records: penggunaStatusData } = useSelector(penggunaStatusDataSelector);
  const { result: penggunaInstansiData } = useSelector(instansiDataSelector);
  const { records: _penggunaDetails } = useSelector(penggunanDataDetailSelector);

  useEffect(() => {
    if (_penggunaDetails && !isEmpty(_penggunaDetails)) {
      const updatedData = {
        ..._penggunaDetails,
        employeeStatus: {
          ..._penggunaDetails.employeeStatus,
          label: _penggunaDetails.employeeStatus,
          value: _penggunaDetails.employeeStatus,
        },
        instansi: {
          ..._penggunaDetails.instansi,
          label: _penggunaDetails.instansi?.nama,
          value: _penggunaDetails.instansi?.nama,
        },
        unitKerja: {
          ..._penggunaDetails.unitKerja,
          label: _penggunaDetails.unitKerja?.nama,
          value: _penggunaDetails.unitKerja?.id,
        },
      };
      setPenggunaDetails(updatedData);
    }
  }, [_penggunaDetails]);

  const { control, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: penggunaDetails,
  });

  const values = getValues();
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
  }, [penggunaDetails]);
  useEffect(() => {
    setValue('Role', checkRole);
  }, [checkRole]);

  const DropDownData = [
    {
      label: 'Registered',
      value: 1,
    },
    {
      label: 'Eksekutif',
      value: 2,
    },
    {
      label: 'Walidata',
      value: 3,
    },
    {
      label: 'Administrator',
      value: 4,
    },
    {
      label: 'PIC SDGs',
      value: 5,
    },
  ];

  const selectRole = (e) => {
    if (e.target.checked) {
      setCheckRole([...checkRole, e.target.value]);
    } else {
      let index = checkRole.indexOf(e.target.value);
      if (index !== -1) {
        checkRole.splice(index, 1);
        setCheckRole([...checkRole]);
      }
    }
  };

  const changeStatus = (e) => {
    setValue('employeeStatus', e.value);
  };

  const changeInstansi = (e) => {
    setValue('instansi', {
      id: e.value,
    });
  };

  const changeUnitKerja = (e) => {
    setValue('unitKerja', {
      id: e.value,
    });
  };

  const uploadMemo = (e) => {
    const fileData = e.target.files[0];
    setValue('officialMemo', {
      fileName: fileData.name,
      location: `http://localhost:8080/file/download/${fileData.name}`,
      fileType: fileData.type,
      size: fileData.size,
    });
  };

  return (
    <Form id={penggunaFormId} className="sdp-form" noValidate onSubmit={handleSubmit(onsubmit)}>
      <Input
        group
        disabled={disableForm}
        label="NIK/NIP"
        name="employeeIdNumber"
        control={control}
        onChange={(e) => setValue('employeeIdNumber', e)}
        rules={{ require: true }}
        type="number"
      />

      <Form.Label>Status Kepegawaian</Form.Label>
      <SingleSelectDropdown
        data={penggunaStatusData.map((kategori) => ({ value: kategori, label: kategori }))}
        control={control}
        name="employeeStatus"
        isDisabled={disableForm}
        className="mb-3"
        onChange={changeStatus}
        rules={{ require: true }}
        value={values.employeeStatus}
      />

      <Input group disabled={disableForm} label="Nama" name="name" control={control} onChange={(e) => setValue('name', e)} />

      <Form.Label>Instansi</Form.Label>
      <SingleSelectDropdown
        data={penggunaInstansiData?.map((kategori) => ({ value: kategori.id, label: kategori.nama }))}
        control={control}
        name="instansi"
        isDisabled={disableForm}
        className="mb-3"
        onChange={changeInstansi}
        rules={{ require: true }}
        value={values.instansi}
      />

      <Form.Label>Unit Kerja</Form.Label>
      <SingleSelectDropdown
        data={DropDownData.map((kategori) => ({ value: kategori.value, label: kategori.label }))}
        control={control}
        name="unitKerja"
        isDisabled={disableForm}
        className="mb-3"
        onChange={changeUnitKerja}
        rules={{ require: true }}
        value={values.unitKerja}
      />

      <Input
        group
        disabled={disableForm}
        label="Email"
        name="email"
        control={control}
        onChange={(e) => setValue('email', e)}
        rules={{ require: true }}
        type="email"
      />

      <div className="sdp-form-phone">
        <Input
          group
          disabled={disableForm}
          label="Kode Area"
          name="phoneArea"
          control={control}
          onChange={(e) => setValue('phoneArea', e)}
          rules={{ require: true }}
        />
        <Input
          group
          disabled={disableForm}
          label="Nomor Handphone"
          name="phoneNumber"
          control={control}
          onChange={(e) => setValue('phoneNumber', e)}
          rules={{ require: true }}
        />
      </div>

      <Input
        group
        disabled={disableForm}
        label="Nama Atasan"
        name="supervisorName"
        control={control}
        onChange={(e) => setValue('supervisorName', e)}
        rules={{ require: true }}
      />

      <Form.Label>Role</Form.Label>
      <Form.Group>
        <div className="checkbox-group ">
          {penggunaRoleData.map((data) => {
            return (
              <Form.Check
                inline
                label={data}
                name={data}
                type="checkbox"
                disabled={disableForm}
                onChange={selectRole}
                value={data}
                required
              />
            );
          })}
        </div>
      </Form.Group>

      <FileInput
        group
        disabled={disableForm}
        label="Nota Dinas"
        name="officialMemo"
        control={control}
        uploadInfo="Upload Image (format .png, .jpeg, .jpg max. 512KB)"
        onChange={uploadMemo}
        rules={{ require: true }}
      />

      <Button className="invisible" type="submit" />
    </Form>
  );
};

export default CMSpenggunaForm;
