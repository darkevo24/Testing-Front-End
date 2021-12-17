import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Modal, Input } from 'components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { apiUrls, post } from 'utils/request';

const CMSStrukturProfile = ({ handleClose, show, title, data = null, idBidang = null, onSubmit = () => {} }) => {
  const schema = yup
    .object({
      nama: yup.string().required(),
      jabatan: yup.string().required(),
    })
    .required();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
    },
  });

  const profileFormId = 'profile-form-id';
  const simpanData = (data) => {
    if (idBidang && data.id) {
      //  action edit profile
    } else if (idBidang) {
      // action add profile
    }
    onSubmit(data);
  };

  const [foto, setFoto] = useState(null);
  const [fotoLoading, setFotoLoading] = useState(false);
  const handleFoto = (file) => {
    let fileName = file.name.replace(/[&\/\\#, +()$~%'":*?<>{}]/g, '');
    let blob = file;
    let newFile = new File([blob], fileName, { type: 'image/png' });
    setFoto(newFile);
  };
  const uploadFoto = async () => {
    setFotoLoading(true);
    try {
      let fotoFormData = new FormData();
      fotoFormData.append('file', foto);
      await post(apiUrls.uploadFoto, fotoFormData, { headers: { 'Content-Type': undefined } }).then((res) => {
        setFotoLoading(false);
        setValue('foto', res.data.location);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (foto !== null) {
      uploadFoto();
    }
  }, [foto]);

  return (
    <Modal visible={show} onClose={handleClose} title={title}>
      <Form>
        <Input group label="Nama" name="nama" control={control} error={errors.nama?.message} />
        <Input group label="Jabatan" name="jabatan" control={control} error={errors.jabatan?.message} />
        <Form.Group className="mb-24">
          <Form.Label>Foto</Form.Label>
          <Form.Control type="file" name="file" onChange={(e) => handleFoto(e.target.files[0])} />
        </Form.Group>
        <div className="d-flex justify-content-end mb-12">
          <Button
            onClick={handleClose}
            className="ml-24 bg-white sdp-text-grey-dark border-gray-stroke"
            variant="secondary"
            style={{ width: '112px' }}>
            Batal
          </Button>
          <Button
            disabled={fotoLoading}
            onClick={handleSubmit(simpanData)}
            className="ml-10"
            variant="info"
            style={{ width: '112px' }}>
            Simpan
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CMSStrukturProfile;
