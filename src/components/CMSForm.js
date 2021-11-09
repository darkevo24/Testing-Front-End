import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {Editor} from '@tinymce/tinymce-react';

const PlaceholderUpload = styled.span`
  font-family: Myriad Pro;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  color: #858A8F;
  position: absolute;
  right: 4px;
  bottom: 8px;
`;

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

export const CMSForm = ({data, style}) => (
  <Form className="form-berita" style={style}>
    <Form.Group controlId="thumbnail" style={{position: "relative"}}>
      <Form.Label>Thumbnail</Form.Label>
      <Form.Control type="file" />
      <PlaceholderUpload>Upload Image (format .png, .jpeg, .jpg max. 512KB)</PlaceholderUpload>
    </Form.Group>
    <Form.Group controlId="title">
      <Form.Label>Judul</Form.Label>
      <Form.Control type="text" />
    </Form.Group>
    <Form.Group controlId="category">
      <Form.Label>Kategori</Form.Label>
      <Form.Select>
        <option>Pilih Kateogori</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
    </Form.Group>
    <Form.Group controlId="tagline">
      <Form.Label>Tagline</Form.Label>
      <Form.Control type="text" />
    </Form.Group>
    <Form.Group controlId="berita" className="mb-4">
      <Form.Label>Isi Berita</Form.Label>
      <Editor
        apiKey="ne6hq4p5tdn0hwuirba4i005nv3yavpgeahao9yy58ka476c"
        init={initConfig}
        className="tinymce-custom"
      />
    </Form.Group>
    <Form.Group controlId="refference">
      <Form.Label>No. Referensi ISSN</Form.Label>
      <Form.Control type="text" />
    </Form.Group>
    <Row>
      <Form.Group as={Col} controlId="publishedDate">
        <Form.Label>Tanggal Publish</Form.Label>
        <Form.Control type="date" />
      </Form.Group>
      <Form.Group as={Col} controlId="publishedTime">
        <Form.Label>Jam Publish</Form.Label>
        <Form.Control type="time" />
      </Form.Group>
    </Row>
    <Form.Check
      id="switchEnabled"
      type="switch"
      label="Enable"
    />
  </Form>
);
