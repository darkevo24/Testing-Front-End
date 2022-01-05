import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import isFunction from 'lodash/isFunction';
import moment from 'moment';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { LogStatus } from 'components/Sidebars/LogStatus';
import { ReactComponent as Plus } from 'assets/plus.svg';
import { getStatusClass, prefixID } from 'utils/helper';
import bn from 'utils/bemNames';
import { DatePicker, Input, Modal, Table, TextEditor, Notification } from 'components';
import { DetailHeader } from './detailHeader';
import {
  bimtekDokumentasiDetailSelector,
  bimtekLogAktifitas,
  getDokumentasiDetail,
  getListLogAktifitas,
  postImageDokumentasiDetail,
} from './reducer';
import { LeftChevron } from 'components/Icons';
import { apiUrls, post, put, deleteRequest } from 'utils/request';

const bem = bn('content-detail');

const CMSDokumentasiDetail = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const [fotoDokumentasi, setFotoDokumentasi] = useState([]);
  const [urlVidio, setUrlVidio] = useState('');
  const [isiDokumentasi, setIsiDokumentasi] = useState('');
  const [showModal, setShowModal] = useState('');

  const { records } = useSelector(bimtekDokumentasiDetailSelector);
  const { logAktifitas } = useSelector(bimtekLogAktifitas);

  const initialCall = () => {
    dispatch(getDokumentasiDetail(id));
    dispatch(getListLogAktifitas(id));
  };

  useEffect(() => {
    if (!id) {
      history.goBack();
      Notification.show({
        type: 'secondary',
        message: <div> Dokumentasi tidak ditemukan </div>,
        icon: 'cross',
      });
    }
    initialCall();
  }, []);

  const dataDetailDokumentasi = records;
  const status = (records?.status || '').toLowerCase();

  const materiBimtek = useMemo(() => dataDetailDokumentasi.materi || [], [records]);
  const pembicaraBimtek = useMemo(() => dataDetailDokumentasi.pembicara || [], [records]);

  const handleNotification = (type, message, icon) => {
    Notification.show({
      type,
      message,
      icon,
    });
  };
  const handleAPICall = async (method, url, params, message, callBack) => {
    try {
      await method(url, {}, params);
      handleCloseModal();
      handleNotification('secondary', `${message}`, 'check');
      initialCall();
      isFunction(callBack) && callBack();
    } catch (e) {
      console.log(e);
      handleNotification('secondary', `Error, ${e.message}`, 'cross');
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setShowModal('');
  };

  const tanggalMulaiDisetujui = moment(dataDetailDokumentasi?.tanggalMulaiDisetujui).format('DD/MM/YYYY');
  const waktuMulaiDisetujui = moment(dataDetailDokumentasi?.tanggalMulaiDisetujui).format('hh:mm');
  const tanggalSelesaiDisetujui = moment(dataDetailDokumentasi?.tanggalSelesaiDisetujui).format('DD/MM/YYYY');
  const waktuSelesaiDisetujui = moment(dataDetailDokumentasi?.tanggalSelesaiDisetujui).format('hh:mm');
  const dataTempat = dataDetailDokumentasi?.kota;
  useEffect(() => {
    reset({
      id: dataDetailDokumentasi.id,
      idDokumentasi: dataDetailDokumentasi.dokumentasiId,
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
    setUrlVidio(dataDetailDokumentasi?.urlVidio);
    setIsiDokumentasi(dataDetailDokumentasi?.isiDokumentasi);
    setFotoDokumentasi(dataDetailDokumentasi?.images);
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

  const deleteFotoDokumentasi = (e) => {
    const filter = fotoDokumentasi.filter((item, index) => index !== e);
    setFotoDokumentasi(filter);
  };

  const openUploadForm = (id) => {
    const elmButton = document.getElementById(id);
    elmButton.click();
  };

  const columnsMateri = [
    {
      Header: 'Materi',
      accessor: '',
      Cell: ({
        row: {
          original: { nama },
        },
      }) => <span> {nama} </span>,
    },
    {
      Header: 'Lampiran',
      accessor: '',
      Cell: ({
        row: {
          original: { fileType },
        },
      }) => <span> {fileType} </span>,
    },
  ];

  const columnsPembicara = [
    {
      Header: 'Nama Pembicara',
      accessor: '',
      Cell: ({
        row: {
          original: { nama },
        },
      }) => <span> {nama} </span>,
    },
    {
      Header: 'Tanggal',
      accessor: '',
      Cell: ({ row: { original } }) => (
        <div className="d-flex">
          <span className="pr-5">
            {original?.tanggalMulai ? moment(original?.tanggalMulai).format('DD MMMM YYYY') : '---'}
            {original?.tanggalMulai ? moment(original?.tanggalMulai).format('HH:mm') : '---'}
          </span>
          <span>-</span>
          <span className="pl-5">
            {original?.tanggalSelesai ? moment(original?.tanggalSelesai).format('DD MMMM YYYY') : '---'}
            {original?.tanggalSelesai ? moment(original?.tanggalSelesai).format('HH:mm') : '---'}
          </span>
        </div>
      ),
    },
  ];
  const filterMateriBimtek = materiBimtek.filter((data) => data !== null);
  const filterPembicaraBimtek = pembicaraBimtek.filter((data) => data !== null);
  const tableConfigMateri = {
    className: 'cms-bimtek-table',
    columns: columnsMateri,
    data: filterMateriBimtek,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'link',
  };

  const tableConfigPembicara = {
    className: 'cms-bimtek-table',
    columns: columnsPembicara,
    data: filterPembicaraBimtek,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'link',
  };

  const onTest = (data) => {};

  const goBack = () => {
    history.push('/cms/bimtek-dokumentasi');
  };

  const updateDokumentasi = () => {
    let obj = {
      isiDokumentasi,
      urlVidio,
    };
    handleAPICall(
      put,
      `${apiUrls.cmsBimtekJadwal}/${dataDetailDokumentasi.id}/dokumentasi/${dataDetailDokumentasi.dokumentasiId}`,
      { data: obj },
      'Dokumentasi Berhasil Diperbarui',
    );
  };

  const deleteDokumentasi = () => {
    handleAPICall(
      deleteRequest,
      `${apiUrls.cmsBimtekJadwal}/${dataDetailDokumentasi.id}/dokumentasi/${dataDetailDokumentasi.dokumentasiId}`,
      {},
      'Berhasil Menghapus Dokumentasi',
      goBack,
    );
  };

  const onSubmitKirim = (data) => {
    let obj = {
      catatan: 'Update Waiting Approval',
    };
    handleAPICall(
      post,
      `${apiUrls.cmsBimtekJadwal}/${data.id}/dokumentasi/${data.idDokumentasi}/ubah-status/WAITING_APPROVAL`,
      { data: obj },
      'Berhasil Menyimpan Dokumentasi',
    );
  };

  const onSubmitApproved = (data) => {
    let obj = {
      catatan: 'Ubah ke Approved',
    };
    handleAPICall(
      post,
      `${apiUrls.cmsBimtekJadwal}/${data.id}/dokumentasi/${data.idDokumentasi}/ubah-status/APPROVED`,
      { data: obj },
      'Dokumentasi Berhasil Disetujui',
    );
  };

  const onSubmitPublish = (data) => {
    let obj = {
      catatan: 'Ubah ke Published',
    };
    handleAPICall(
      post,
      `${apiUrls.cmsBimtekJadwal}/${data.id}/dokumentasi/${data.idDokumentasi}/ubah-status/PUBLISHED`,
      { data: obj },
      'Dokumentasi Berhasil Ditayangkan',
    );
  };

  const onSubmitUnpublish = (data) => {
    let obj = {
      catatan: 'Ubah ke Unpublish',
    };
    handleAPICall(
      post,
      `${apiUrls.cmsBimtekJadwal}/${data.id}/dokumentasi/${data.idDokumentasi}/ubah-status/UNPUBLISHED`,
      { data: obj },
      'Dokumentasi Tidak Ditayangkan',
    );
  };

  const onSubmitRejected = (data) => {
    let obj = {
      catatan: 'Ubah ke Rejected',
    };
    handleAPICall(
      post,
      `${apiUrls.cmsBimtekJadwal}/${data.id}/dokumentasi/${data.idDokumentasi}/ubah-status/REJECTED`,
      { data: obj },
      'Dokumentasi Berhasil Ditolak',
    );
  };

  const divClass = getStatusClass(status || '');

  return (
    <div>
      <div className="d-flex align-items-center">
        <button className="bg-white border-gray-stroke p-10" onClick={goBack}>
          <LeftChevron />
        </button>
        <div className={`br-2 p-12 flex-grow-1 flex-center  ${divClass?.divBG || ''}`}>
          <span className={`fs-14 lh-17 ${divClass?.textColor || ''}`}>{divClass?.text || records?.status || ''}</span>
        </div>
      </div>
      <Row className={bem.e('section cms-bimtek')}>
        <Col sm={9}>
          <div>
            <div className="d-flex justify-content-between mb-4">
              <div className={bem.e('title')}>Dokumentasi Bimbingan Teknis</div>
              <div className="d-flex justify-content-center">
                <DetailHeader handleModal={(type) => setShowModal(type)} history={history} status={status} />
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
                  {fotoDokumentasi?.map((foto, index) => {
                    return (
                      <Col key={index} sm={4}>
                        <div className="doc-foto mb-20">
                          <img src={foto?.location} alt="img" />
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
        {showModal === 'delete' && (
          <Modal showHeader={false} className="cms-bimtek-permintaan-detail" visible={showModal}>
            <div className="mt-20 mb-20">
              <p className="mb-0">
                Apakah Anda yakin ingin menghapus dokumentasi <b>{prefixID(id, 'BD')}</b>?
              </p>
            </div>
            <Form onSubmit={handleSubmit(deleteDokumentasi)} noValidate>
              <div className="d-flex justify-content-end mt-20">
                <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                  Hapus Data
                </Button>
              </div>
            </Form>
          </Modal>
        )}
        {showModal === 'perbarui' && (
          <Modal showHeader={false} className="cms-bimtek-permintaan-detail" visible={showModal}>
            <div className="mt-20 mb-20">
              <p className="mb-0">
                Apakah Anda Yakin Ingin Memperbarui Dokumentasi Bimtek <b>{prefixID(id, 'BD')}</b> ?
              </p>
            </div>
            <div className="d-flex justify-content-end mt-20">
              <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={handleCloseModal}>
                Batal
              </Button>
              <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }} onClick={updateDokumentasi}>
                Perbarui
              </Button>
            </div>
          </Modal>
        )}
        {showModal === 'unpublish' && (
          <Modal showHeader={false} className="cms-bimtek-permintaan-detail" visible={showModal}>
            <div className="mt-20 mb-20">
              <p className="mb-0">
                Apakah anda yakin ingin
                <span className="sdp-text-blue fw-bold"> Merubah Status </span>
                Dokumentasi <b>{prefixID(id, 'BD')}</b> Menjadi Unpublish?
              </p>
            </div>
            <Form onSubmit={handleSubmit(onSubmitUnpublish)} noValidate>
              <div className="d-flex justify-content-end">
                <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                  Konfirmasi
                </Button>
              </div>
            </Form>
          </Modal>
        )}
        {showModal === 'kirim' && (
          <Modal showHeader={false} className="cms-bimtek-permintaan-detail" visible={showModal}>
            <div className="mt-20 mb-20">
              <p className="mb-0">
                Apakah anda yakin ingin
                <span className="sdp-text-blue fw-bold"> Mengirim </span>
                Dokumentasi Bimtek <b>{prefixID(id, 'BD')}</b> ?
              </p>
            </div>
            <Form onSubmit={handleSubmit(onSubmitKirim)} noValidate>
              <div className="d-flex justify-content-end">
                <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                  Kirim
                </Button>
              </div>
            </Form>
          </Modal>
        )}
        {showModal === 'setujui' && (
          <Modal showHeader={false} className="cms-bimtek-permintaan-detail" visible={showModal}>
            <div className="mt-20 mb-20">
              <p className="mb-0">
                Apakah anda yakin ingin
                <span className="sdp-text-blue"> Menyetujui </span>
                Dokumentasi Bimtek <b>{prefixID(id, 'BD')}</b> ?
              </p>
            </div>
            <Form onSubmit={handleSubmit(onSubmitApproved)} noValidate>
              <div className="d-flex justify-content-end mt-20">
                <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                  Konfirmasi
                </Button>
              </div>
            </Form>
          </Modal>
        )}
        {showModal === 'publish' && (
          <Modal showHeader={false} className="cms-bimtek-permintaan-detail" visible={showModal}>
            <div className="mt-20 mb-20">
              <p className="mb-0">
                Apakah anda yakin ingin
                <span className="sdp-text-blue"> Menayangkan </span>
                Dokumentasi Bimtek <b>{prefixID(id, 'BD')}</b> ?
              </p>
            </div>
            <Form onSubmit={handleSubmit(onSubmitPublish)} noValidate>
              <div className="d-flex justify-content-end mt-20">
                <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                  Konfirmasi
                </Button>
              </div>
            </Form>
          </Modal>
        )}
        {showModal === 'tolak' && (
          <Modal showHeader={false} className="cms-bimtek-permintaan-detail" visible={showModal}>
            <div className="mt-20 mb-20">
              <p className="mb-0">
                Apakah anda yakin ingin
                <span className="text-danger"> Menolak </span>
                Dokumentasi Bimtek <b>{prefixID(id, 'BD')}</b> ?
              </p>
            </div>
            <Form onSubmit={handleSubmit(onSubmitRejected)} noValidate>
              <div className="d-flex justify-content-end mt-20">
                <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                  Konfirmasi
                </Button>
              </div>
            </Form>
          </Modal>
        )}
      </Row>
    </div>
  );
};

export default CMSDokumentasiDetail;
