import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Input } from 'components';
import SingleDropDown from 'components/DropDown/SingleDropDown';

import { getListSosMed, getListSelector } from '../MediaSosial/reducer';

const CMSContactSosmed = ({ handleClose, onSubmit = () => {} }) => {
  const schema = yup
    .object({
      url: yup.string().required(),
      sosmed: yup.mixed().required(),
    })
    .required();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const { records } = useSelector(getListSelector);
  useEffect(() => dispatch(getListSosMed()), []);

  const simpanData = (data) => {
    onSubmit({
      image: data.sosmed.icon,
      tipe: data.sosmed.label,
      url: data.url,
      aktif: true,
    });
  };

  const sosmedChange = (data) => {
    setValue('sosmed', data);
    clearErrors('sosmed');
  };

  return (
    <Modal visible={true} onClose={handleClose} title="Tambah Sosial Media">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Sosial Media</Form.Label>
          <SingleDropDown
            placeHolder="Pilih Sosmed"
            data={records.map((item) => {
              return { value: item.id, label: item.tipe, icon: item.image };
            })}
            onChange={sosmedChange}
          />
          <div className="sdp-error">{errors.sosmed?.message}</div>
        </Form.Group>
        <Input group label="Link Tautan" name="url" control={control} error={errors.url?.message} />
        <div className="d-flex justify-content-end mb-12">
          <Button
            onClick={handleClose}
            className="ml-24 bg-white sdp-text-grey-dark border-gray-stroke"
            variant="secondary"
            style={{ width: '112px' }}>
            Batal
          </Button>
          <Button onClick={handleSubmit(simpanData)} className="ml-10" variant="info" style={{ width: '112px' }}>
            Simpan
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CMSContactSosmed;
