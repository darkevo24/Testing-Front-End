import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { DatePicker, Input, TextEditor, Modal } from 'components';
import { Galery, Close } from 'components/Icons';
import { submitForm } from 'utils/helper';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ReactComponent as Plus } from 'assets/plus.svg';
import bn from 'utils/bemNames';
import cx from 'classnames';
// import { postImageDokumentasi } from 'containers/CMS/BimtekDokumentasi/reducer';
import { getJadwalBimtekDetail, bimtekJadwalDetailSelector } from 'containers/CMS/BimtekJadwal/reducer';
import { apiUrls, post } from 'utils/request';

const bem = bn('bimtek-form');

export const jadwalBimtekFormId = 'cms-bimtek-create';
export const SubmitJadwalBimtekForm = submitForm(jadwalBimtekFormId);

const BimtekTable = ({ modal, headers, label, action, pembicara, materi }) => (
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
        {pembicara &&
          pembicara.map((data, index) => {
            return (
              <tr key={index}>
                <td> {data.nama} </td>
                <td> {data.tanggalMulai} </td>
                <td> {data.tanggalSelesai} </td>
              </tr>
            );
          })}
        {materi &&
          materi.map((data, index) => {
            return (
              <tr key={index}>
                <td> {data.nama} </td>
                <td> {data.fileType} </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  </div>
);

const CMSBimtekForm = ({
  data,
  disabled = false,
  namaBimtek,
  modalAction = true,
  isDocumentation = false,
  onSubmit,
  createDokumentasi,
}) => {
  const [listFoto, setListFoto] = useState([]);
  const [foto, setFoto] = useState([]);
  const [dokumentasi, setDokumentasi] = useState('');
  // const [urlVideo, setUrlVideo] = useState('');
  // const [listMateri, setListMateri] = useState([]);
  const [modalMateri, setModalMateri] = useState(false);
  const [modalPembicara, setModalPembicara] = useState(false);
  const [detailBimtekId, setDetailBimtekId] = useState('');
  const dispatch = useDispatch();
  const { records } = useSelector(bimtekJadwalDetailSelector);
  // console.log(dokumentasi);
  useEffect(() => {
    return dispatch(getJadwalBimtekDetail(detailBimtekId));
  }, [detailBimtekId]);

  const dataDokumentasiDetail = useMemo(() => records || {}, [records]);

  // console.log(dataDokumentasiDetail);
  // console.log(moment(dataDokumentasiDetail?.tanggalMulaiDisetujui).format('HH:mm'));

  useEffect(() => {
    reset(dataDokumentasiDetail);
  }, [dataDokumentasiDetail]);

  const schema = yup
    .object({
      name: yup.string().required(),
    })
    .required();
  const {
    control,
    // formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...dataDokumentasiDetail,
      listFoto,
      dokumentasi,
      // urlVideo,
    },
  });

  const addFoto = async (e) => {
    // let fileData = {
    //   file: e.target.files[0],
    //   preview: URL.createObjectURL(e.target.files[0]),
    // };
    // setListFoto([...listFoto, fileData]);
    // e.target.value = '';
    // console.log(fileData);
    // console.log(e.target.files[0]);
    // console.log(e);
    try {
      let fotoFormData = new FormData();
      fotoFormData.append('file', e.target.files[0]);
      await post(apiUrls.uploadFoto, fotoFormData, { headers: { 'Content-Type': undefined } }).then((res) => {
        // console.log(res);
        setFoto([...foto, res.data]);
      });
    } catch (e) {
      // console.log(e);
    }
  };

  // console.log(foto);

  const removeFoto = (index) => {
    let selected = listFoto[index];
    setListFoto(listFoto.filter((item) => item !== selected));
  };
  const openUploadForm = (id) => {
    const elmButton = document.getElementById(id);
    elmButton.click();
  };

  const modalMateriAction = () => {
    setModalMateri(true);
  };

  const modalPembicaraAction = () => {
    setModalPembicara(true);
  };
  return (
    <div className="sdp-form">
      <Form id={jadwalBimtekFormId} onSubmit={handleSubmit(onSubmit)}>
        {isDocumentation ? (
          <Form.Group className="mb-15">
            <Form.Label>Nama Bimtek</Form.Label>
            {namaBimtek && (
              <Form.Select onChange={(e) => setDetailBimtekId(e.target.value)}>
                <option value="0"> PILIH BIMTEK </option>
                {namaBimtek.map((data, index) => {
                  return (
                    <option value={data.id} key={index}>
                      {data.namaBimtek}
                    </option>
                  );
                })}
              </Form.Select>
            )}
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
            <Input
              disabled={disabled}
              group
              className="m-0"
              type="time"
              label=""
              name="tanggalMulaiDisetujui"
              control={control}
            />
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
        <Input disabled={disabled} group label="Tempat" name="tempat" control={control} />
        <BimtekTable
          pembicara={records?.pembicara}
          modal={modalAction}
          action={modalPembicaraAction}
          label="Pembicara"
          headers={['Nama Pembicara', 'Tanggal', 'Sesi', '']}
        />
        <BimtekTable
          materi={records?.materi}
          modal={modalAction}
          action={modalMateriAction}
          label="Materi"
          headers={['Materi', 'Lampiran', '']}
        />
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
                {foto.map((foto, index) => (
                  <Col key={index} sm={4} className="mb-12">
                    <div className={bem.e('doc-foto')} style={{ backgroundImage: "url('" + foto.location + "')" }}>
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
              <TextEditor onChange={(e) => setDokumentasi(e)} />
            </Form.Group>
          </>
        ) : null}
        <Button className="invisible" type="submit" />
      </Form>
      <Modal
        className="cms-bimtek-materi"
        title="Tambah Materi Baru"
        visible={modalMateri}
        onClose={() => setModalMateri(false)}>
        <div>
          <Input group label="Materi" name="materi" control={control} />
          <Form.Group>
            <Form.Label>Lampiran</Form.Label>
            <Form.Control id="sdp-upload-materi" multiple type="file" style={{ display: 'none' }} onChange={addFoto} />
          </Form.Group>
          <div className="wrapper-lampiran">
            <div className="wrapper-lampiran-header" onClick={() => openUploadForm('sdp-upload-materi')}>
              <span className="upload"> Upload </span>
              <span className="cta"> Upload Image (format .png, .jpeg, .jpg max. 512KB) </span>
            </div>
            <div className="wrapper-lampiran-file">
              {listFoto.map((list, index) => {
                return (
                  <span className="file mr-10 mb-10" key={index} onClick={() => removeFoto(index)}>
                    <Galery /> <span> {list.file?.name} </span> <Close />
                  </span>
                );
              })}
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => setModalMateri(false)}
              className="ml-24 bg-white sdp-text-grey-dark border-gray-stroke"
              variant="secondary"
              style={{ width: '112px' }}>
              Batal
            </Button>
            <Button className="mx-10" variant="info" style={{ width: '112px' }}>
              Simpan
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        className="cms-bimtek-materi"
        title="Tambah Pembicari Baru"
        visible={modalPembicara}
        onClose={() => setModalPembicara(false)}>
        <div className="mb-10">
          <Row>
            <Input group label="Nama Pembicara" name="place" control={control} />
          </Row>
          <Row className="align-items-end">
            <Col>
              <DatePicker disabled={disabled} group label="Tanggal Mulai Sesi" name="publishedDate" control={control} />
            </Col>
            <Col>
              <Input disabled={disabled} group className="m-0" type="time" label="" name="publishedTime" control={control} />
            </Col>
          </Row>
          <Row className="align-items-end">
            <Col>
              <DatePicker disabled={disabled} group label="Tanggal Selesai Sesi" name="publishedDate" control={control} />
            </Col>
            <Col>
              <Input disabled={disabled} group className="m-0" type="time" label="" name="publishedTime" control={control} />
            </Col>
          </Row>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => setModalPembicara(false)}
            className="ml-24 bg-white sdp-text-grey-dark border-gray-stroke"
            variant="secondary"
            style={{ width: '112px' }}>
            Batal
          </Button>
          <Button className="mx-10" variant="info" style={{ width: '112px' }}>
            Simpan
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CMSBimtekForm;
