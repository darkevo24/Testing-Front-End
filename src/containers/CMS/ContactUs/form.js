import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Input } from 'components';
import { NoPerminataanData, Trash } from 'components/Icons';
import { ReactComponent as Plus } from 'assets/plus.svg';
import { Kontak_list } from 'utils/constants';
import { submitForm } from 'utils/helper';

import CMSContactSosmed from './formSosmed';

const schema = yup
  .object({
    alamatLine1: yup.string().required(),
  })
  .required();

export const formContactId = 'form-contact-id';
export const submitContactForm = submitForm(formContactId);

const CMSContactForm = ({ data, disabled, onSubmit = () => {} }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
    },
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [listSosmed, setListSosmed] = useState(data.sosialMedia);
  const addSosmed = (data) => {
    setListSosmed([...listSosmed, data]);
    setModalOpen(false);
  };

  const submitContact = (data) => {
    data.sosialMedia = listSosmed;
    onSubmit(data);
  };

  const removeSosmed = (index) => {
    const data = listSosmed[index];
    setListSosmed(listSosmed.filter((item) => item !== data));
  };

  const changeSosmed = (e, index) => {
    const data = listSosmed[index];
    let edit = [...listSosmed];
    edit[index] = { ...data, url: e.target.value };
    setListSosmed(edit);
  };

  return (
    <Form id={formContactId} onSubmit={handleSubmit(submitContact)}>
      <Input
        group
        label="Alamat Line 1"
        name="alamatLine1"
        control={control}
        disabled={disabled}
        error={errors.alamatLine1?.message}
      />
      <Input
        group
        label="Alamat Line 2"
        name="alamatLine2"
        control={control}
        disabled={disabled}
        error={errors.alamatLine2?.message}
      />
      <Input
        group
        label="Nomor Telepon"
        name="nomorTelepon"
        control={control}
        disabled={disabled}
        error={errors.nomorTelepon?.message}
      />
      <Input
        group
        label="Nomor Fax"
        name="nomorFax"
        control={control}
        disabled={disabled}
        error={errors.nomorFax?.message}
      />
      <Input group label="Email" name="email" control={control} disabled={disabled} error={errors.email?.message} />
      <div className="mt-32">
        <div className="d-flex justify-content-between mb-3">
          <div className="fs-16 fw-bold">Tautan Sosial Media</div>
          {!disabled && (
            <div onClick={() => setModalOpen(true)} className="sdp-text-red fw-600 cursor-pointer">
              <Plus width="16" /> Tambah
            </div>
          )}
        </div>
        <div>
          {!data.sosialMedia ? (
            <div className="text-center mt-62">
              <NoPerminataanData />
              <div className="text-black-50 mb-2 mt-2">No Data</div>
            </div>
          ) : (
            listSosmed.map((sosmed, index) => (
              <InputGroup key={index} className="mb-3">
                <InputGroup.Text className="bg-white">
                  <img src={sosmed.image} alt="logo" />
                </InputGroup.Text>
                <Form.Control disabled={disabled} defaultValue={sosmed.url} onChange={(e) => changeSosmed(e, index)} />
                {!disabled ? (
                  <InputGroup.Text className="bg-white">
                    <Form.Check className="mr-16" />
                    <span className="cursor-pointer" onClick={() => removeSosmed(index)}>
                      <Trash />
                    </span>
                  </InputGroup.Text>
                ) : null}
              </InputGroup>
            ))
          )}
        </div>
      </div>
      <Button className="invisible" type="submit" />
      {modalOpen ? <CMSContactSosmed handleClose={() => setModalOpen(false)} onSubmit={addSosmed} /> : null}
    </Form>
  );
};

export default CMSContactForm;
