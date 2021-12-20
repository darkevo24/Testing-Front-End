import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { DatePicker, Input, TextEditor, Modal } from 'components';
import { submitForm } from 'utils/helper';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ReactComponent as Plus } from 'assets/plus.svg';
import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('bimtek-form');

export const jadwalBimtekFormId = 'cms-bimtek-create';
export const SubmitJadwalBimtekForm = submitForm(jadwalBimtekFormId);

const BimtekTable = ({ modal, headers, label, action }) => (
  <div className={bem.e('section')}>
    <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
      <div className={bem.e('header-title')}>{label}</div>
      {modal ? (
        <div className={bem.e('header-add')} onClick={action}>
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

const CMSBimtekForm = ({ data, disabled = false, namaBimtek, modalAction = true, isDocumentation = false, onSubmit }) => {
  const schema = yup
    .object({
      name: yup.string().required(),
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

  const [listFoto, setListFoto] = useState([]);
  const [modalPeserta, setModalPeserta] = useState(false);

  const addFoto = (e) => {
    let fileData = {
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    };
    console.log(e.target.files[0]);
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

  function modalPesertaAction() {
    setModalPeserta(true);
  }
  return (
    <div className="sdp-form">
      <Form id={jadwalBimtekFormId} onSubmit={handleSubmit(onSubmit)}>
        {isDocumentation ? (
          <Form.Group className="mb-15">
            <Form.Label>Nama Bimtek</Form.Label>
            <Form.Select>
              {namaBimtek.map((data, index) => {
                return (
                  <option value={data.id} key={index}>
                    {data.namaBimtek}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        ) : (
          <Input
            group
            label="Nama Bimtek"
            name="name"
            control={control}
            onChange={(e) => setValue('test', e.target.value)}
          />
        )}
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
              name="approvedDate"
              control={control}
            />
          </Col>
          <Col>
            <Input disabled={disabled} group className="m-0" type="time" label="" name="approvedTime" control={control} />
          </Col>
        </Row>
        <Input disabled={disabled} group label="Tempat" name="place" control={control} />
        <BimtekTable
          modal={modalAction}
          action={modalPesertaAction}
          label="Pembicara"
          headers={['Nama Pembicara', 'Tanggal', 'Sesi', '']}
        />
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
        <Button className="invisible" type="submit" />
      </Form>
      <Modal
        className="cms-bimtek-materi"
        title="Tambah Materi Baru"
        visible={modalPeserta}
        onClose={() => setModalPeserta(false)}>
        <div>
          <Input group label="Materi" name="place" control={control} />
          <Form.Group className="mb-15">
            <Form.Label>Lampiran</Form.Label>
            <Form.Control type="email" className="custom-file" />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => setModalPeserta(false)}
              className="ml-24 bg-white sdp-text-grey-dark border-gray-stroke"
              variant="secondary"
              style={{ width: '112px' }}>
              Batal
            </Button>
            <Button className="mx-10" variant="info" style={{ width: '112px' }}>
              Konfirmasi
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CMSBimtekForm;
