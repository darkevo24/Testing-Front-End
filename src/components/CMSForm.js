import React, { useEffect } from 'react';
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

import { getListKategori, getListTagline, kategoriSelector, taglineSelector } from 'containers/App/reducer';

export const beritaFormId = 'berita-form-id';
export const submitBeritaForm = submitForm(beritaFormId);
const schema = yup
  .object({
    judul: yup.string().required(),
    issn: yup.string().required(),
    kategori: yup.mixed().required(),
  })
  .required();

const CMSForm = ({ data, style, onSubmit }) => {
  const dispatch = useDispatch();
  const { records: kategoriRecords } = useSelector(kategoriSelector);
  const { records: taglineRecords } = useSelector(taglineSelector);

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

  useEffect(() => {
    dispatch(getListKategori('BERITA'));
    dispatch(getListTagline());
  }, []);

  // const uploadFile = (e) => {
  //   var file = e.target.files[0];
  //   console.log(file);
  //   if (file.size > 512000) {
  //     return console.log('max size reached');
  //   }
  // };

  return (
    <Form id={beritaFormId} className="sdp-form" onSubmit={handleSubmit(onSubmit)} style={style}>
      <FileInput
        group
        label="Thumbnail"
        name="mainImage"
        control={control}
        rules={{ required: true }}
        error={errors.mainImage?.message}
        uploadInfo="Upload Image (format .png, .jpeg, .jpg max. 512KB)"
      />
      <Input group label="Judul" name="judul" control={control} rules={{ required: true }} error={errors.judul?.message} />
      <Form.Group className="mb-3">
        <Form.Label>Kategori</Form.Label>
        <SingleSelectDropdown
          data={kategoriRecords.map((kategori) => ({ id: kategori.id, value: kategori.id, label: kategori.keterangan }))}
          onChange={(e) => setValue('kategori', e.id)}
          control={control}
          placeholder="Pilih Kategori"
          defaultValue={
            data.kategori
              ? {
                  value: data.kategori,
                  label: kategoriRecords.find((kategori) => kategori.id === data.kategori)?.keterangan,
                }
              : null
          }
        />
        <div className="sdp-error">{errors.kategori?.message}</div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tagline</Form.Label>
        <MultiDropDown
          placeHolder="Pilih Tagline"
          data={taglineRecords.map((tagline) => ({ label: tagline.keterangan, value: tagline.id }))}
          onChange={(e) => setValue('taglineId', e)}
          defaultValue={data.tagLineList?.map((tagline) => ({ label: tagline.keterangan, value: tagline.id }))}
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
