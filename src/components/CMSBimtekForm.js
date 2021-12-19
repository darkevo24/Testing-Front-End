import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { DatePicker, Input, TextEditor } from 'components';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ReactComponent as Plus } from 'assets/plus.svg';
import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('bimtek-form');

const BimtekTable = ({ modal, headers, label }) => (
  <div className={bem.e('section')}>
    <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
      <div className={bem.e('header-title')}>{label}</div>
      {modal ? (
        <div className={bem.e('header-add')}>
          <Plus /> Tambah {label}
        </div>
      ) : null}
    </div>
    <Table className={bem.e('table')}>
      <thead>
        <tr>
          {headers.map((item) => (
            <th>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-center" colSpan={headers.length}>
            Tidak ada data
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
);

const CMSBimtekForm = ({ data, disabled = false, modalAction = false, isDocumentation = false, onSubmit }) => {
  const schema = yup
    .object({
      name: yup.string().required(),
    })
    .required();

  const {
    control,
    // formState: { errors },
    // handleSubmit,
    // setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
    },
  });

  const [listFoto, setListFoto] = useState([]);
  const addFoto = (e) => {
    let fileData = {
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    };

    setListFoto([...listFoto, fileData]);
    e.target.value = '';
  };
  const removeFoto = (index) => {
    let selected = listFoto[index];
    setListFoto(listFoto.filter((item) => item !== selected));
  };
  const openUploadForm = (id) => {
    const elmButton = document.getElementById(id);
    elmButton.click();
  };

  return (
    <div className="sdp-form">
      <Input group label="Nama Bimtek" name="name" control={control} />
      <Row className="align-items-end">
        <Col>
          <DatePicker
            disabled={disabled}
            group
            label="Tanggal Mulai Pelaksanaan Disetujui"
            name="publishedDate"
            control={control}
          />
        </Col>
        <Col>
          <Input disabled={disabled} group className="m-0" type="time" label="" name="publishedTime" control={control} />
        </Col>
      </Row>
      <Row className="align-items-end">
        <Col>
          <DatePicker
            disabled={disabled}
            group
            label="Tanggal Selesai Pelaksanaan Disetujui"
            name="publishedDate"
            control={control}
          />
        </Col>
        <Col>
          <Input disabled={disabled} group className="m-0" type="time" label="" name="publishedTime" control={control} />
        </Col>
      </Row>
      <Input disabled={disabled} group label="Tempat" name="place" control={control} />
      <BimtekTable modal={modalAction} label="Pembicara" headers={['Nama Pembicara', 'Tanggal', 'Sesi', '']} />
      <BimtekTable modal={modalAction} label="Materi" headers={['Materi', 'Lampiran', '']} />
      {isDocumentation ? (
        <>
          <div className={bem.e('section')}>
            <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
              <div className={bem.e('header-title')}>Foto dan Video Kegiatan</div>
              <div className={bem.e('header-add')} onClick={() => openUploadForm('sdp-upload-fle')}>
                <Plus /> Upload Foto
              </div>
            </div>
            <Row>
              {listFoto.map((foto, index) => (
                <Col key={index} sm={4} className="mb-12">
                  <div className={bem.e('doc-foto')} style={{ backgroundImage: "url('" + foto.preview + "')" }}>
                    <button className="sdp-text-white" onClick={() => removeFoto(index)}>
                      Hapus Foto
                    </button>
                  </div>
                </Col>
              ))}
            </Row>
            <input id="sdp-upload-fle" type="file" style={{ display: 'none' }} onChange={addFoto} />
          </div>
          <Input group label="Link Video" name="url_video" control={control} />
          <Form.Group>
            <Form.Label>Isi Berita</Form.Label>
            <TextEditor />
          </Form.Group>
        </>
      ) : null}
    </div>
  );
};

export default CMSBimtekForm;
