import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Editor} from '@tinymce/tinymce-react';
// import { useHistory } from 'react-router-dom';

import { LogStatus } from 'components/Sidebars/LogStatus';
import { Input } from 'components';
import bn from 'utils/bemNames';
import { ReactComponent as DeleteIcon } from 'assets/trash-icon.svg';

const bem = bn('content-detail');

const schema = yup
  .object({
    title: yup.string().required(),
    category: yup.mixed().required(),
    thumbnail: yup.mixed().required()
  })
  .required();

const CMSAboutUsEdit = props => {
  // const history = useHistory();
  const dataLog = [
    {
      date: "12 Desember 2021",
      status: "Selesai",
      content: "Dataset sudah dapat di akses di portal data.go.id"
    },
    {
      date: "10 Desember 2021",
      status: "Diproses",
      content: "Dataset sudah dapat di akses di portal data.go.id"
    },
    {
      date: "08 Desember 2021",
      status: "Terkirim",
      content: "Dataset sudah dapat di akses di portal data.go.id"
    },
    {
      date: "08 Desember 2021",
      status: "Dibuat",
      content: "Dataset sudah dapat di akses di portal data.go.id"
    },
  ];

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
  } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <Row className={bem.e('section')}>
      <Col sm={8}>
        <div>
          <div className="d-flex justify-content-between mb-4">
            <div className={bem.e('title')}>
              About Us
            </div>
            <div>
              <Button variant="secondary"><DeleteIcon/></Button>
              <Button className="ml-10" variant="secondary" style={{width: "112px"}}>Simpan</Button>
              <Button className="ml-10" variant="info" style={{width: "112px"}}>Kirim</Button>
            </div>
          </div>
          <Form>
            <Input
              group
              label="Link Video"
              name="link_video"
              control={control}
              rules={{ required: true }}
              error={errors.title?.message}
            />
            <Input
              group
              label="Judul"
              name="title"
              control={control}
              rules={{ required: true }}
              error={errors.title?.message}
            />
          <Form.Group controlId="content">
              <Form.Label>Isi</Form.Label>
              <Editor
                apiKey="ne6hq4p5tdn0hwuirba4i005nv3yavpgeahao9yy58ka476c"
                init={initConfig}
                className="tinymce-custom"
              />
            </Form.Group>
          </Form>
        </div>
      </Col>
      <Col sm={3}>
        <LogStatus data={dataLog} />
      </Col>
    </Row>
  );
};

export default CMSAboutUsEdit;
