import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, FileInput, TextEditor } from 'components';
import MultiDropDown from 'components/DropDown/MultiDropDown';
import SingleSelectDropdown from 'components/DropDown/SingleSelectDropDown';
import { submitForm } from 'utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { apiUrls, post } from 'utils/request';

import { getListKategori, getListTagline, setNewTagline, kategoriSelector, taglineSelector } from 'containers/App/reducer';

export const beritaFormId = 'berita-form-id';
export const submitBeritaForm = submitForm(beritaFormId);

export const submitNewKategori = async (kategori) => {
  try {
    const param = {
      kode: 'BERITA',
      keterangan: kategori,
      idParent: null,
      status: true,
    };
    const response = await post(apiUrls.setting, param);
    return response;
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }
};

const schema = yup
  .object({
    judul: yup.string().required(),
    kategori: yup.mixed().required(),
    mainImage: yup.mixed().required(),
  })
  .required();

const CMSForm = ({ data, style, onSubmit }) => {
  const dispatch = useDispatch();
  const [listKategori, setListKategori] = useState([]);
  const { records: kategoriRecords } = useSelector(kategoriSelector);
  const { records: taglineRecords } = useSelector(taglineSelector);

  useEffect(() => {
    setListKategori(kategoriRecords);
  }, [kategoriRecords]);

  const createKategori = (data) => {
    setListKategori([
      ...listKategori,
      {
        id: 'new',
        keterangan: data,
      },
    ]);
  };

  const createTagline = (data) => {
    // console.log(data);
    dispatch(setNewTagline({ keterangan: data })).then(() => dispatch(getListTagline()));
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
      kategori: data.kategori
        ? {
            value: data.kategori,
            label: kategoriRecords.find((kategori) => kategori.id === data.kategori)?.keterangan,
          }
        : null,
      taglineId: data.tagLineList?.map((tagline) => ({ label: tagline.keterangan, value: tagline.id })),
    },
  });

  useEffect(() => {
    dispatch(getListKategori('BERITA'));
    dispatch(getListTagline());
  }, []);

  const [foto, setFoto] = useState(null);
  const handleFoto = (file) => {
    // eslint-disable-next-line
    let fileName = file.name.replace(/[&\/\\#, +()$~%'":*?<>{}]/g, '');
    let blob = file;
    let newFile = new File([blob], fileName, { type: 'image/png' });
    setFoto(newFile);
  };
  const uploadFoto = async () => {
    try {
      let fotoFormData = new FormData();
      fotoFormData.append('file', foto);
      await post(apiUrls.uploadFoto, fotoFormData, { headers: { 'Content-Type': undefined } }).then((res) => {
        setValue('mainImage', res.data.location);
      });
    } catch (e) {
      errors.mainImage.message = e.error?.message;
    }
  };

  useEffect(() => {
    if (foto !== null) {
      uploadFoto();
    }
  }, [foto]);

  return (
    <Form id={beritaFormId} className="sdp-form" onSubmit={handleSubmit(onSubmit)} style={style}>
      <FileInput
        group
        label="Thumbnail"
        name="mainImage"
        control={control}
        error={errors.mainImage?.message}
        uploadInfo="Upload Image (format .png, .jpeg, .jpg max. 512KB)"
        handleOnChange={handleFoto}
      />
      <Input group label="Judul" name="judul" control={control} rules={{ required: true }} error={errors.judul?.message} />
      <Form.Group className="mb-3">
        <Form.Label>Kategori</Form.Label>
        <SingleSelectDropdown
          data={listKategori.map((kategori) => ({ id: kategori.id, value: kategori.id, label: kategori.keterangan }))}
          control={control}
          placeholder="Pilih Kategori"
          isCreatable={true}
          onCreateOption={createKategori}
          name="kategori"
        />
        <div className="sdp-error">{errors.kategori?.message}</div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tagline</Form.Label>
        <MultiDropDown
          placeHolder="Pilih Tagline"
          data={taglineRecords?.map((tagline) => ({ label: tagline.keterangan, value: tagline.id }))}
          onChange={(e) => setValue('taglineId', e)}
          defaultValue={data.tagLineList?.map((tagline) => ({ label: tagline.keterangan, value: tagline.id }))}
          isCreatable={true}
          onCreateOption={createTagline}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Isi Berita</Form.Label>
        <TextEditor defaultValue={data.content} onChange={(e) => setValue('content', e)} />
      </Form.Group>
      <Input
        group
        label="No. Referensi ISSN"
        name="issn"
        control={control}
        rules={{ required: false }}
        error={errors.issn?.message}
      />
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Tanggal Publish</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setValue('publishDate', e.target.value)}
              defaultValue={data?.publishDate?.toString().split(' ')[0]}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Jam Publish</Form.Label>
            <Form.Control
              type="time"
              onChange={(e) => setValue('publishTime', e.target.value)}
              defaultValue={data?.publishDate?.toString().split(' ')[1]}
            />
          </Form.Group>
        </Col>
      </Row>
      <Button className="invisible" type="submit" />
    </Form>
  );
};

export default CMSForm;
