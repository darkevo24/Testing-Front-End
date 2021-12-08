import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker, Dropdown, Input, FileInput, TextEditor } from 'components';
import MultiDropDown from 'components/DropDown/MultiDropDown';
import { submitForm } from 'utils/helper';
import { useDispatch, useSelector } from 'react-redux';

import { getListKategori, getListTagline, kategoriSelector, taglineSelector } from 'containers/CMS/BeritaBaru/reducer';

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
      <Dropdown
        group
        label="Kategori"
        name="kategori"
        control={control}
        rules={{ required: true }}
        placeholder="Pilih Kategori"
        options={kategoriRecords.map((kategori) => ({ value: kategori.id, label: kategori.keterangan }))}
        error={errors.kategori?.message}
      />
      <Form.Group className="mb-3">
        <Form.Label>Tagline</Form.Label>
        <MultiDropDown
          placeHolder="Pilih Tagline"
          data={taglineRecords.map((tagline) => ({ label: tagline.keterangan, value: tagline.id }))}
          onChange={(e) => setValue('taglineId', e)}
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
          <DatePicker
            group
            label="Tanggal Publish"
            name="publishDate"
            control={control}
            rules={{ required: false }}
            error={errors.publishDate?.message}
          />
        </Col>
        <Col>
          <Input
            group
            type="time"
            label="Jam Publish"
            name="publishTime"
            control={control}
            rules={{ required: false }}
            error={errors.publishTime?.message}
          />
        </Col>
      </Row>
      <Button className="invisible" type="submit" />
    </Form>
  );
};

export default CMSForm;
