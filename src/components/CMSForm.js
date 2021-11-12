import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker, Dropdown, Input, FileInput } from 'components';

import {Editor} from '@tinymce/tinymce-react';

const schema = yup
  .object({
    title: yup.string().required(),
    category: yup.mixed().required(),
    thumbnail: yup.mixed().required()
  })
  .required();

const CMSForm = ({data, style, onSubmit}) => {
  // config tinymce
  const initConfig = {
    height: 500,
    menubar: false,
    toolbar_location: 'bottom',
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar:
      // eslint-disable-next-line no-multi-str
      'bold italic underline | \
      alignleft aligncenter alignright alignjustify | \
      numlist bullist outdent indent'
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <Form className="sdp-form" onSubmit={handleSubmit(onSubmit)} style={style}>
      <FileInput
        group
        label="Thumbnail"
        name="thumbnail"
        control={control}
        rules={{ required: true }}
        error={errors.thumbnail?.message}
      />
      <Input
        group
        label="Judul"
        name="title"
        control={control}
        rules={{ required: true }}
        error={errors.title?.message}
      />
      <Dropdown
        group
        label="Kategori"
        name="category"
        control={control}
        rules={{ required: true }}
        placeholder="Pilih Kategori"
        error={errors.category?.message}
      />
      <Input
        group
        label="Tagline"
        name="tagline"
        control={control}
        rules={{ required: false }}
        error={errors.tagline?.message}
      />
      <Form.Group controlId="berita" className="mb-4">
        <Form.Label>Isi Berita</Form.Label>
        <Editor
          apiKey="ne6hq4p5tdn0hwuirba4i005nv3yavpgeahao9yy58ka476c"
          init={initConfig}
          className="tinymce-custom"
        />
      </Form.Group>
      <Input
        group
        label="No. Referensi ISSN"
        name="reference"
        control={control}
        rules={{ required: false }}
        error={errors.reference?.message}
      />
      <Row>
        <Col>
          <DatePicker
            group
            label="Tanggal Publish"
            name="publishedDate"
            control={control}
            rules={{ required: false }}
            error={errors.publishedDate?.message}
          />
        </Col>
        <Col>
          <Input
            group
            type="time"
            label="Jam Publish"
            name="publishedTime"
            control={control}
            rules={{ required: false }}
            error={errors.publishedTime?.message}
          />
        </Col>
      </Row>
      <Form.Check
        id="switchEnabled"
        type="switch"
        label="Enable"
        variant="info"
      />
    </Form>
  );
};

export default CMSForm;
