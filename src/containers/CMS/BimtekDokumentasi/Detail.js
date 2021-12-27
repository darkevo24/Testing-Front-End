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
  postStatusDraft,
  postStatusWaitingApproval,
  postStatusApproved,
  postStatusPublish,
  postStatusRejected,
} from './reducer';
import { LeftChevron } from 'components/Icons';
import { apiUrls, post } from 'utils/request';

const bem = bn('content-detail');

const CMSDokumentasiDetail = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const [showDeleteDokumentasi, setDeleteDokumentasi] = useState(false);
  const [showUpdateDokumentasi, setUpdateDokumentasi] = useState(false);
  const [fotoDokumentasi, setFotoDokumentasi] = useState([]);
  const [urlVidio, setUrlVidio] = useState('');
  const [isiDokumentasi, setIsiDokumentasi] = useState('');
  const [showModalSimpan, setModalSimpan] = useState(false);
  const [showModalWaitingApproval, setModalWaitingApproval] = useState(false);
  const [showModalPublish, setModalPublish] = useState(false);
  const [showModalUnpublish, setModalUnpublish] = useState(false);
  const [showModalTolak, setModalTolak] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const { records } = useSelector(bimtekDokumentasiDetailSelector);
  const { logAktifitas } = useSelector(bimtekLogAktifitas);
  const fetchDokumentasiDetail = (params) => {
    return dispatch(getDokumentasiDetail(params));
  };
  const fetchLogAktifitas = (params) => {
    return dispatch(getListLogAktifitas(params));
  };

  const dataDetailDokumentasi = records;
  const materiBimtek = useMemo(() => dataDetailDokumentasi.materi || [], [records]);
  const pembicaraBimtek = useMemo(() => dataDetailDokumentasi.pembicara || [], [records]);
  useEffect(() => {
    if (id === 'null') {
      history.goBack();
      Notification.show({
        type: 'secondary',
        message: <div> Dokumentasi tidak ditemukan </div>,
        icon: 'cross',
      });
    }
    fetchDokumentasiDetail(id);
    fetchLogAktifitas(id);
  }, [trigger]);

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
  }, [dataDetailDokumentasi, trigger]);
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

  const updateDokumentasi = () => {
    let obj = {
      idDokumentasi: dataDetailDokumentasi.dokumentasiId,
      id: dataDetailDokumentasi.id,
      isiDokumentasi,
      urlVidio,
    };
    setUpdateDokumentasi(false);
    return dispatch(updateDokumentasiDetail(obj)).then((res) => {
      !res.error
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
    dispatch(deleteDokumentasiDetail(obj)).then((res) => {
      !res.error
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

  const onTest = (data) => {};

  const backToTable = () => {
    history.push('/cms/bimtek-dokumentasi');
  };

  const SuccessText = () => {
    return (
      <div className="d-flex">
        <div className="icon-box-md" onClick={backToTable}>
          <LeftChevron />
        </div>
        <Row className="permintaan-data-form-success fw-bold justify-content-center align-items-center">
          {dataDetailDokumentasi.status}
        </Row>
      </div>
    );
  };

  const WaitingApproval = () => {
    return (
      <div className="d-flex">
        <div className="icon-box-md" onClick={backToTable}>
          <LeftChevron />
        </div>
        <Row className="permintaan-data-form-terproses fw-bold justify-content-center align-items-center">
          Waiting Approval
        </Row>
      </div>
    );
  };

  const ApprovedText = () => {
    return (
      <div className="d-flex">
        <div className="icon-box-md" onClick={backToTable}>
          <LeftChevron />
        </div>
        <Row className="permintaan-data-form-terkirim fw-bold justify-content-center align-items-center">Approved</Row>
      </div>
    );
  };

  const UnpublishText = () => {
    return (
      <div className="d-flex">
        <div className="icon-box-md" onClick={backToTable}>
          <LeftChevron />
        </div>
        <Row className="permintaan-data-form-terkirim fw-bold justify-content-center align-items-center">Unpublish</Row>
      </div>
    );
  };

  const DraftText = () => {
    return (
      <div className="d-flex">
        <div className="icon-box-md" onClick={backToTable}>
          <LeftChevron />
        </div>
        <Row className="permintaan-data-form-terproses fw-bold justify-content-center align-items-center">DRAFT</Row>
      </div>
    );
  };

  const RejectedText = () => {
    return (
      <div className="d-flex">
        <div className="icon-box-md" onClick={backToTable}>
          <LeftChevron />
        </div>
        <Row className="permintaan-data-form-ditolak fw-bold justify-content-center align-items-center">REJECTED</Row>
      </div>
    );
  };

  const ButtonStatusPublish = () => {
    return (
      <div>
        <Button className="ml-10" variant="info" onClick={() => setModalUnpublish(true)}>
          Unpublish
        </Button>
      </div>
    );
  };

  const ButtonPublish = () => {
    return (
      <div>
        <Button className="ml-10" variant="info" onClick={() => setModalPublish(true)}>
          Publish
        </Button>
      </div>
    );
  };

  const ButtonStatusWaitingApproval = () => {
    return (
      <div>
        <Button className="ml-10" variant="secondary" style={{ width: '112px' }} onClick={() => setModalTolak(true)}>
          Tolak
        </Button>
        <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => setModalWaitingApproval(true)}>
          Setujui
        </Button>
      </div>
    );
  };

  const ButtonStatusDraft = () => {
    return (
      <div className="d-flex justify-content-center">
        <Button variant="secondary" onClick={() => setDeleteDokumentasi(true)}>
          Hapus
        </Button>
        <Button className="ml-10" variant="secondary" style={{ width: '112px' }} onClick={() => setUpdateDokumentasi(true)}>
          Simpan
        </Button>
        <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => setModalSimpan(true)}>
          Kirim
        </Button>
      </div>
    );
  };

  const onSubmitSimpan = (data) => {
    let obj = {
      id: data.id,
      idDokumentasi: data.idDokumentasi,
    };
    dispatch(postStatusDraft(obj)).then((res) => {
      !res.error
        ? Notification.show({
            type: 'secondary',
            message: <div> Berhasil Menyimpan Dokumentasi </div>,
            icon: 'check',
          })
        : Notification.show({
            type: 'secondary',
            message: <div> Gagal Menyimpan Dokumentasi </div>,
            icon: 'cross',
          });
    });
    setModalSimpan(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const onSubmitApproved = (data) => {
    let obj = {
      id: data.id,
      idDokumentasi: data.idDokumentasi,
    };
    dispatch(postStatusWaitingApproval(obj)).then((res) => {
      !res.error
        ? Notification.show({
            type: 'secondary',
            message: <div> Berhasil, Dokumentasi Disetujui </div>,
            icon: 'check',
          })
        : Notification.show({
            type: 'secondary',
            message: <div> Gagal Merubah Status Menjadi Disetujui </div>,
            icon: 'cross',
          });
    });
    setModalWaitingApproval(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const onSubmitPublish = (data) => {
    let obj = {
      id: data.id,
      idDokumentasi: data.idDokumentasi,
    };
    dispatch(postStatusApproved(obj)).then((res) => {
      !res.error
        ? Notification.show({
            type: 'secondary',
            message: <div> Berhasil, Dokumentasi Ditayangkan </div>,
            icon: 'check',
          })
        : Notification.show({
            type: 'secondary',
            message: <div> Gagal, Dokumentasi Gagal Ditayangkan </div>,
            icon: 'cross',
          });
    });
    setModalPublish(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const onSubmitUnpublish = (data) => {
    let obj = {
      id: data.id,
      idDokumentasi: data.idDokumentasi,
    };
    dispatch(postStatusPublish(obj)).then((res) => {
      !res.error
        ? Notification.show({
            type: 'secondary',
            message: <div> Berhasil, Dokumentasi Tidak Ditayangkan </div>,
            icon: 'check',
          })
        : Notification.show({
            type: 'secondary',
            message: <div> Gagal Merubah Status Menjadi Tidak Ditayangkan </div>,
            icon: 'cross',
          });
    });
    setModalUnpublish(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const onSubmitRejected = (data) => {
    let obj = {
      id: data.id,
      idDokumentasi: data.idDokumentasi,
    };
    dispatch(postStatusRejected(obj)).then((res) => {
      !res.error
        ? Notification.show({
            type: 'secondary',
            message: <div> Berhasil, Dokumentasi Ditolak </div>,
            icon: 'check',
          })
        : Notification.show({
            type: 'secondary',
            message: <div> Gagal, Dokumentasi Gagal Ditolak </div>,
            icon: 'cross',
          });
    });
    setModalTolak(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const StatusBar = () => {
    switch (dataDetailDokumentasi.status) {
      case 'DRAFT':
        return <DraftText />;
      case 'WAITING_APPROVAL':
        return <WaitingApproval />;
      case 'APPROVED':
        return <ApprovedText />;
      case 'PUBLISHED':
        return <SuccessText />;
      case 'UNPUBLISHED':
        return <UnpublishText />;
      case 'REJECTED':
        return <RejectedText />;
      default:
        return null;
    }
  };

  const ButtonStatusAction = () => {
    switch (dataDetailDokumentasi.status) {
      case 'WAITING_APPROVAL':
        return <ButtonStatusWaitingApproval />;
      case 'PUBLISHED':
        return <ButtonStatusPublish />;
      case 'UNPUBLISHED':
        return <ButtonPublish />;
      case 'DRAFT':
        return <ButtonStatusDraft />;
      case 'APPROVED':
        return <ButtonPublish />;
      default:
        return null;
    }
  };

  return (
    <div>
      <StatusBar />
      <Row className={bem.e('section cms-bimtek')}>
        <Col sm={9}>
          <div>
            <div className="d-flex justify-content-between mb-4">
              <div className={bem.e('title')}>Dokumentasi Bimbingan Teknis</div>
              <div className="d-flex justify-content-center">
                <ButtonStatusAction />
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
        <Modal showHeader={false} className="cms-bimtek-permintaan-detail" visible={showDeleteDokumentasi}>
          <div className="mt-20 mb-20">
            <p className="mb-0"> Apakah Anda yakin ingin menghapus dokumentasi? </p>
          </div>
          <Form onSubmit={handleSubmit(deleteDokumentasi)} noValidate>
            <div className="d-flex justify-content-end mt-20">
              <Button
                className="mr-10"
                variant="secondary"
                style={{ width: '112px' }}
                onClick={() => setDeleteDokumentasi(false)}>
                Batal
              </Button>
              <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                Hapus Data
              </Button>
            </div>
          </Form>
        </Modal>
        <Modal showHeader={false} className="cms-bimtek-permintaan-detail" visible={showUpdateDokumentasi}>
          <div className="mt-20 mb-20">
            <p className="mb-0"> Apakah Anda yakin ingin memperbarui dokumentasi? </p>
          </div>
          <div className="d-flex justify-content-end mt-20">
            <Button
              className="mr-10"
              variant="secondary"
              style={{ width: '112px' }}
              onClick={() => setUpdateDokumentasi(false)}>
              Batal
            </Button>
            <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }} onClick={updateDokumentasi}>
              Perbarui
            </Button>
          </div>
        </Modal>
        <Modal showHeader={false} className="cms-bimtek-permintaan-detail" visible={showModalUnpublish}>
          <div className="mt-20 mb-20">
            <p className="mb-0">
              Apakah anda yakin ingin
              <span className="sdp-text-blue fw-bold"> Merubah Status </span>
              Dokumentasi {id} menjadi Unpublish?
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmitUnpublish)} noValidate>
            <div className="d-flex justify-content-end">
              <Button
                className="mr-10"
                variant="secondary"
                style={{ width: '112px' }}
                onClick={() => setModalUnpublish(false)}>
                Batal
              </Button>
              <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                Konfirmasi
              </Button>
            </div>
          </Form>
        </Modal>
        <Modal showHeader={false} className="cms-bimtek-permintaan-detail" visible={showModalSimpan}>
          <div className="mt-20 mb-20">
            <p className="mb-0">
              Apakah anda yakin ingin
              <span className="sdp-text-blue fw-bold"> Mengirim </span>
              Dokumentasi Bimtek {id} ?
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmitSimpan)} noValidate>
            <div className="d-flex justify-content-end">
              <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={() => setModalSimpan(false)}>
                Batal
              </Button>
              <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                Kirim
              </Button>
            </div>
          </Form>
        </Modal>
        <Modal showHeader={false} className="cms-bimtek-permintaan-detail" visible={showModalWaitingApproval}>
          <div className="mt-20 mb-20">
            <p className="mb-0">
              Apakah anda yakin ingin
              <span className="sdp-text-blue"> Menyetujui </span>
              Dokumentasi Bimtek {id} ?
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmitApproved)} noValidate>
            <div className="d-flex justify-content-end mt-20">
              <Button
                className="mr-10"
                variant="secondary"
                style={{ width: '112px' }}
                onClick={() => setModalWaitingApproval(false)}>
                Batal
              </Button>
              <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                Konfirmasi
              </Button>
            </div>
          </Form>
        </Modal>
        <Modal showHeader={false} className="cms-bimtek-permintaan-detail" visible={showModalPublish}>
          <div className="mt-20 mb-20">
            <p className="mb-0">
              Apakah anda yakin ingin
              <span className="sdp-text-blue"> Menayangkan </span>
              Dokumentasi Bimtek {id} ?
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmitPublish)} noValidate>
            <div className="d-flex justify-content-end mt-20">
              <Button
                className="mr-10"
                variant="secondary"
                style={{ width: '112px' }}
                onClick={() => setModalPublish(false)}>
                Batal
              </Button>
              <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                Konfirmasi
              </Button>
            </div>
          </Form>
        </Modal>
        <Modal showHeader={false} className="cms-bimtek-permintaan-detail" visible={showModalTolak}>
          <div className="mt-20 mb-20">
            <p className="mb-0">
              Apakah anda yakin ingin
              <span className="text-danger"> Menolak </span>
              Dokumentasi Bimtek {id} ?
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmitRejected)} noValidate>
            <div className="d-flex justify-content-end mt-20">
              <Button className="mr-10" variant="secondary" style={{ width: '112px' }} onClick={() => setModalTolak(false)}>
                Batal
              </Button>
              <Button type="submit" className="ml-10" variant="info" style={{ width: '112px' }}>
                Konfirmasi
              </Button>
            </div>
          </Form>
        </Modal>
      </Row>
    </div>
  );
};

export default CMSDokumentasiDetail;
