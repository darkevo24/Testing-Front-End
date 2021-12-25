import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { LogStatus } from 'components/Sidebars/LogStatus';
import { ReactComponent as Plus } from 'assets/plus.svg';
import { ReactComponent as DeleteIcon } from 'assets/trash-icon.svg';
import bn from 'utils/bemNames';
import { DatePicker, Input, Modal, Table, TextEditor, Notification } from 'components';
import {
  bimtekDokumentasiDetailSelector,
  bimtekLogAktifitas,
  getDokumentasiDetail,
  getListLogAktifitas,
  postImageDokumentasiDetail,
  updateDokumentasiDetail,
  deleteDokumentasiDetail,
} from './reducer';
import { apiUrls, post } from 'utils/request';

const bem = bn('content-detail');

const CMSDokumentasiDetail = (props) => {
  const [showDeleteDokumentasi, setDeleteDokumentasi] = useState(false);
  const [showUpdateDokumentasi, setUpdateDokumentasi] = useState(false);
  const [fotoDokumentasi, setFotoDokumentasi] = useState([]);
  const [urlVidio, setUrlVidio] = useState('');
  const [isiDokumentasi, setIsiDokumentasi] = useState('');
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const { records } = useSelector(bimtekDokumentasiDetailSelector);
  const { logAktifitas } = useSelector(bimtekLogAktifitas);
  const fetchDokumentasiDetail = (params) => {
    return dispatch(getDokumentasiDetail(params));
  };
  const fetchLogAktifitas = (params) => {
    return dispatch(getListLogAktifitas(params));
  };

  const dataDetailDokumentasi = useMemo(() => records || [], [records]);
  const materiBimtek = useMemo(() => dataDetailDokumentasi.materi || [], [records]);
  const pembicaraBimtek = useMemo(() => dataDetailDokumentasi.pembicara || [], [records]);
  console.log(dataDetailDokumentasi);
  useEffect(() => {
    if (id === 'null') {
      history.push('/cms/bimtek-dokumentasi');
      Notification.show({
        type: 'secondary',
        message: <div> Dokumentasi tidak ditemukan </div>,
        icon: 'cross',
      });
    }
    fetchDokumentasiDetail(id);
    fetchLogAktifitas(id);
  }, [id]);

  const tanggalMulaiDisetujui = moment(dataDetailDokumentasi?.tanggalMulaiDisetujui).format('DD/MM/YYYY');
  const waktuMulaiDisetujui = moment(dataDetailDokumentasi?.tanggalMulaiDisetujui).format('hh:mm');
  const tanggalSelesaiDisetujui = moment(dataDetailDokumentasi?.tanggalSelesaiDisetujui).format('DD/MM/YYYY');
  const waktuSelesaiDisetujui = moment(dataDetailDokumentasi?.tanggalSelesaiDisetujui).format('hh:mm');
  const dataTempat = dataDetailDokumentasi?.kota;
  useEffect(() => {
    reset({
      waktuMulaiDisetujui,
      waktuSelesaiDisetujui,
      tanggalMulaiDisetujui,
      tanggalSelesaiDisetujui,
      dataTempat,
    });
  }, [dataDetailDokumentasi]);
  const schema = yup
    .object({
      // name: yup.string().required(),
    })
    .required();

  const {
    control,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      tanggalMulaiDisetujui,
      tanggalSelesaiDisetujui,
      waktuMulaiDisetujui,
      waktuSelesaiDisetujui,
      dataTempat,
    },
  });

  useEffect(() => {
    setUrlVidio(dataDetailDokumentasi.urlVidio);
    setIsiDokumentasi(dataDetailDokumentasi.isiDokumentasi);
    setFotoDokumentasi([dataDetailDokumentasi.image]);
  }, [dataDetailDokumentasi]);

  const addFoto = async (e) => {
    let file = e.target.files[0];
    try {
      let fotoFormData = new FormData();
      fotoFormData.append('file', file);
      await post(apiUrls.uploadFoto, fotoFormData, { headers: { 'Content-Type': undefined } }).then((res) => {
        Notification.show({
          type: 'secondary',
          message: <div> Berhasil Upload Gambar Dokumentasi </div>,
          icon: 'check',
        });
        setFotoDokumentasi([...fotoDokumentasi, res.data]);
        let obj = {
          idDokumentasi: dataDetailDokumentasi.dokumentasiId,
          id: dataDetailDokumentasi.id,
          images: fotoDokumentasi,
        };
        return dispatch(postImageDokumentasiDetail(obj));
      });
    } catch (e) {
      Notification.show({
        type: 'secondary',
        message: <div> Gagal Upload Gambar Dokumentasi </div>,
        icon: 'cross',
      });
    }
  };

  function deleteFotoDokumentasi(e) {
    const filter = fotoDokumentasi.filter((item, index) => index !== e);
    setFotoDokumentasi(filter);
    console.log(filter);
  }

  const openUploadForm = (id) => {
    const elmButton = document.getElementById(id);
    elmButton.click();
  };

  const updateDokumentasi = () => {
    let obj = {
      idDokumentasi: dataDetailDokumentasi.dokumentasiId,
      id: dataDetailDokumentasi.id,
      isiDokumentasi,
      urlVidio,
    };
    setUpdateDokumentasi(false);
    return dispatch(updateDokumentasiDetail(obj)).then((res) => {
      res.payload
        ? Notification.show({
            type: 'secondary',
            message: <div> Berhasil Update Dokumentasi </div>,
            icon: 'check',
          })
        : Notification.show({
            type: 'secondary',
            message: <div> Gagal Update Dokumentasi </div>,
            icon: 'cross',
          });
    });
  };
  const deleteDokumentasi = () => {
    let obj = {
      idDokumentasi: dataDetailDokumentasi.dokumentasiId,
      id: dataDetailDokumentasi.id,
    };
    setDeleteDokumentasi(false);
    return dispatch(deleteDokumentasiDetail(obj)).then((res) => {
      res.payload
        ? Notification.show({
            type: 'secondary',
            message: <div> Berhasil Menghapus Dokumentasi </div>,
            icon: 'check',
          })
        : Notification.show({
            type: 'secondary',
            message: <div> Gagal Menghapus Dokumentasi </div>,
            icon: 'cross',
          });
    });
  };
  const columnsMateri = [
    {
      Header: 'Materi',
      accessor: 'nama',
    },
    {
      Header: 'Lampiran',
      accessor: 'fileType',
    },
  ];

  const columnsPembicara = [
    {
      Header: 'Nama Pembicara',
      accessor: 'nama',
    },
    {
      Header: 'Tanggal',
      accessor: 'tanggalMulai',
      Cell: ({ ...rest }) => (
        <span>
          {rest.row.original?.tanggalMulai ? moment(rest.row.original?.tanggalMulai).format('DD MMMM YYYY') : '---'}
        </span>
      ),
    },
    {
      Header: 'Sesi',
      accessor: 'sesi',
      Cell: ({ ...rest }) => (
        <span> {rest.row.original?.tanggalMulai ? moment(rest.row.original?.tanggalMulai).format('hh:mm:ss') : '---'} </span>
      ),
    },
  ];

  const tableConfigMateri = {
    className: 'cms-bimtek-table',
    columns: columnsMateri,
    data: materiBimtek,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'link',
  };

  const tableConfigPembicara = {
    className: 'cms-bimtek-table',
    columns: columnsPembicara,
    data: pembicaraBimtek,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'link',
  };
  const onTest = (data) => {
    console.log(data);
  };
  return (
    <Row className={bem.e('section cms-bimtek')}>
      <Col sm={9}>
        <div>
          <div className="d-flex justify-content-between mb-4">
            <div className={bem.e('title')}>Dokumentasi Bimbingan Teknis</div>
            <div>
              <Button variant="secondary" onClick={() => setDeleteDokumentasi(true)}>
                <DeleteIcon />
              </Button>
              <Button
                className="ml-10"
                variant="secondary"
                style={{ width: '112px' }}
                onClick={() => setUpdateDokumentasi(true)}>
                Perbarui
              </Button>
            </div>
          </div>
          <Form className="sdp-form" onSubmit={handleSubmit(onTest)}>
            <Row className="align-items-end mb-15">
              <Col>
                <DatePicker
                  group
                  readOnly
                  label="Tanggal Mulai Pelaksanaan Disetujui"
                  name="tanggalMulaiDisetujui"
                  control={control}
                  rules={{ required: false }}
                />
              </Col>
              <Col>
                <Input
                  group
                  readOnly
                  className="m-0"
                  type="time"
                  label=""
                  name="waktuMulaiDisetujui"
                  control={control}
                  rules={{ required: false }}
                />
              </Col>
            </Row>
            <Row className="align-items-end mb-15">
              <Col>
                <DatePicker
                  group
                  readOnly
                  label="Tanggal Selesai Pelaksanaan Disetujui"
                  name="tanggalSelesaiDisetujui"
                  control={control}
                  rules={{ required: false }}
                />
              </Col>
              <Col>
                <Input
                  group
                  readOnly
                  className="m-0"
                  type="time"
                  label=""
                  name="waktuSelesaiDisetujui"
                  control={control}
                  rules={{ required: false }}
                />
              </Col>
            </Row>
            <Input
              group
              readOnly
              className="mb-10"
              type="text"
              label="tempat"
              name="dataTempat"
              control={control}
              rules={{ required: false }}
            />
            <div className="pembicara">
              <span className="fw-bold mb-10 d-block"> Pembicara </span>
              <Table {...tableConfigPembicara} />
            </div>
            <div className="materi">
              <span className="fw-bold mb-10 d-block"> Materi </span>
              <Table {...tableConfigMateri} />
            </div>
            <div className="wrapper-upload">
              <div className="wrapper-title">
                <span className="fw-bold mb-10 d-block"> Foto dan Video Kegiatan </span>
                <div className="text-danger d-flex icon" onClick={() => openUploadForm('sdp-upload-dokumentasi')}>
                  <Plus /> Upload Foto
                </div>
              </div>
              <Row>
                {fotoDokumentasi.map((foto, index) => {
                  return (
                    <Col key={index} sm={4}>
                      <div className="doc-foto">
                        <img src={foto.location} alt="img" />
                        <Button onClick={() => deleteFotoDokumentasi(index)}>
                          <span> Remove Photo </span>
                        </Button>
                      </div>
                    </Col>
                  );
                })}
              </Row>
              <input id="sdp-upload-dokumentasi" type="file" style={{ display: 'none' }} onChange={addFoto} />
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Url Vidio</Form.Label>
              <Form.Control value={urlVidio || ''} type="text" onChange={(e) => setUrlVidio(e.target.value)} />
            </Form.Group>
            <TextEditor defaultValue={dataDetailDokumentasi.isiDokumentasi} onChange={(e) => setIsiDokumentasi(e)} />
          </Form>
        </div>
      </Col>
      <Col sm={3}>
        <LogStatus data={logAktifitas} />
      </Col>
      <Modal showHeader={false} visible={showDeleteDokumentasi} onClose={() => setDeleteDokumentasi(false)}>
        <div className="mt-20 mb-20">
          <p className="mb-0"> Apakah Anda yakin ingin menghapus Data? </p>
        </div>
        <Form onSubmit={handleSubmit(deleteDokumentasi)} noValidate>
          <div className="d-flex justify-content-end mt-20">
            <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={() => setDeleteDokumentasi()}>
              Batal
            </Button>
            <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
              Hapus Data
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal showHeader={false} visible={showUpdateDokumentasi} onClose={() => setUpdateDokumentasi(false)}>
        <div className="mt-20 mb-20">
          <p className="mb-0"> Apakah Anda yakin ingin memperbarui Data? </p>
        </div>
        <Form onSubmit={handleSubmit(updateDokumentasi)} noValidate>
          <div className="d-flex justify-content-end mt-20">
            <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={() => setUpdateDokumentasi()}>
              Batal
            </Button>
            <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
              Perbarui
            </Button>
          </div>
        </Form>
      </Modal>
    </Row>
  );
};

export default CMSDokumentasiDetail;
