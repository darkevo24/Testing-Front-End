import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import * as yup from 'yup';
import isFunction from 'lodash/isFunction';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { DatePicker, Input, Modal, Table, TextEditor, Notification } from 'components';
import { apiUrls, post, put, deleteRequest } from 'utils/request';
import { LogStatus } from 'components/Sidebars/LogStatus';
import { LeftChevron, Galery, Close } from 'components/Icons';
import { getStatusClass, prefixID } from 'utils/helper';
import { CMSModal } from 'components/CMSStatusModals';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import { ReactComponent as Plus } from 'assets/plus.svg';
import RowLoader from 'components/Loader/RowLoader';
import TableLoader from 'components/Loader/TableLoader';
import { DetailHeader } from './detailHeader';
import bn from 'utils/bemNames';
import {
  bimtekJadwalDetailSelector,
  bimtekLogAktifitas,
  bimtekJadwalTags,
  getListLogAktifitas,
  getJadwalBimtekDetail,
  getListBimtekTags,
} from './reducer';

const bem = bn('content-detail');

const CMSJadwalDetail = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { records, loadingJadwalDetail } = useSelector(bimtekJadwalDetailSelector);
  const { tagsResult, tagsLoading } = useSelector(bimtekJadwalTags);
  const { dataLog } = useSelector(bimtekLogAktifitas);
  const [idPembicara, setIdPembicara] = useState('');
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState('');
  const [apiError, setAPIError] = useState('');
  const [listMateri, setListMateri] = useState([]);
  const status = (records?.status || '').toLowerCase();

  const goBack = () => {
    history.push('/cms/bimtek-jadwal');
  };

  useEffect(() => {
    if (!id) goBack();
    initialCall();
  }, []);

  const initialCall = () => {
    dispatch(getJadwalBimtekDetail(id));
    dispatch(getListLogAktifitas(id));
    dispatch(getListBimtekTags());
  };

  const handleAPICall = async (method, url, params, callBack) => {
    try {
      setLoader(true);
      await method(url, {}, params);
      handleCloseModal();
      initialCall();
      isFunction(callBack) && callBack();
    } catch (e) {
      console.log(e);
      Notification.show({
        type: 'secondary',
        message: <div> Error, {e.message} </div>,
        icon: 'cross',
      });
      handleCloseModal();
      setAPIError(e.message);
    }
  };

  const handleTagChange = (selected) => {
    // console.log(selected);
  };
  const onKirim = async () => {
    handleAPICall(post, `${apiUrls.cmsBimtekJadwal}/${id}/ubah-status/WAITING_APPROVAL`, { data: { note: '' } });
  };

  const onDelete = async () => {
    handleAPICall(post, `${apiUrls.cmsBimtekJadwal}/${id}/ubah-status/DELETED`, { data: { note: '' } }, goBack);
  };

  const onSetujui = async () => {
    handleAPICall(post, `${apiUrls.cmsBimtekJadwal}/${id}/ubah-status/APPROVED`, { data: { note: '' } });
  };

  const onTolak = async () => {
    handleAPICall(post, `${apiUrls.cmsBimtekJadwal}/${id}/ubah-status/REJECTED`, { data: { note: '' } });
  };

  const onPublish = async () => {
    handleAPICall(post, `${apiUrls.cmsBimtekJadwal}/${id}/ubah-status/PUBLISHED`, { data: { note: '' } });
  };

  const onUnpublish = async () => {
    handleAPICall(post, `${apiUrls.cmsBimtekJadwal}/${id}/ubah-status/UNPUBLISHED`, { data: { note: '' } });
  };

  const onUpdate = async (data) => {
    console.log(data);
    let obj = {
      namaBimtek: data.default.namaBimtek,
      tagMateri: data.default.tagMateri,
      kota: data.default.kotaId,
      alamat: data.default.tempat,
      tanggalMulaiDisetujui: `${moment(data.tanggalMulaiDisetujuiUpdate, 'DD/MM/YYYY').format('YYYY-MM-DD')} ${
        data.jamMulaiDisetujuiUpdate
      }:00`,
      tanggalSelesaiDisetujui: `${moment(data.tanggalSelesaiDisetujuiUpdate, 'DD/MM/YYYY').format('YYYY-MM-DD')} ${
        data.jamSelesaiDisetujuiUpdate
      }:00`,
    };
    handleAPICall(put, `${apiUrls.cmsBimtekJadwal}/${id}`, { data: obj });
  };

  const onDeleteMateri = async (idMateri) => {
    handleAPICall(deleteRequest, `${apiUrls.cmsBimtekJadwal}/${id}/materi/${idMateri}`);
  };

  const onDeletePembicara = async (idPembicara) => {
    handleAPICall(deleteRequest, `${apiUrls.cmsBimtekJadwal}/${id}/pembicara/${idPembicara}`);
  };

  const handleCloseModal = () => {
    setShowModal('');
    setLoader(false);
  };

  const onAddMateri = (data) => {
    let obj = listMateri.map((item) => ({
      nama: data.materi,
      fileName: item.fileName,
      location: item.location,
      fileType: item.fileType,
      size: item.size,
    }));
    handleAPICall(post, `${apiUrls.cmsBimtekJadwal}/${id}/materi`, { data: { materi: obj } });
    // setListMateri([]);
  };

  const onAddPembicara = (data) => {
    const nama = data.tambahPembicara;
    const tanggalMulai = `${moment(data.tambahPembicaraWaktuMulai).format('YYYY-MM-DD')} ${data.tambahPembicaraJamMulai}:00`;
    const tanggalSelesai = `${moment(data.tambahPembicaraWaktuSelesai).format('YYYY-MM-DD')} ${
      data.tambahPembicaraJamSelesai
    }:00`;
    let obj = [
      {
        nama,
        tanggalMulai,
        tanggalSelesai,
      },
    ];
    console.log(obj);
    handleAPICall(post, `${apiUrls.cmsBimtekJadwal}/${id}/pembicara`, { data: { pembicara: obj } });
  };

  const onModalEditPembicara = (data) => {
    setIdPembicara(data.id);
    reset({
      default: records,
      tambahPembicara: data.nama,
      tambahPembicaraWaktuMulai: moment(data.tambahPembicaraWaktuMulai).format('DD/MM/YYYY'),
      tambahPembicaraWaktuSelesai: moment(data.tambahPembicaraWaktuSelesai).format('DD/MM/YYYY'),
      tambahPembicaraJamMulai: moment(data.tambahPembicaraJamMulai).format('hh:mm'),
      tambahPembicaraJamSelesai: moment(data.tambahPembicaraJamSelesai).format('hh:mm'),
    });
    setShowModal('editPembicara');
  };

  const onEditPembicara = (data) => {
    const nama = data.tambahPembicara;
    const tanggalMulai = `${moment(data.tambahPembicaraWaktuMulai, 'DD/MM/YYYY').format('YYYY-MM-DD')} ${
      data.tambahPembicaraJamMulai
    }:00`;
    const tanggalSelesai = `${moment(data.tambahPembicaraWaktuSelesai, 'DD/MM/YYYY').format('YYYY-MM-DD')} ${
      data.tambahPembicaraJamSelesai
    }:00`;
    let obj = {
      nama,
      tanggalMulai,
      tanggalSelesai,
    };
    handleAPICall(put, `${apiUrls.cmsBimtekJadwal}/${id}/pembicara/${idPembicara}`, { data: obj });
  };

  const openUploadForm = (id) => {
    const elmButton = document.getElementById(id);
    elmButton.click();
  };

  const addFoto = async (e) => {
    let file = e.target.files[0];
    try {
      let materiFormData = new FormData();
      materiFormData.append('file', file);
      await post(apiUrls.uploadFoto, materiFormData, { headers: { 'Content-Type': undefined } }).then((res) => {
        setListMateri([...listMateri, res.data]);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const removeFile = (index) => {
    let selected = listMateri[index];
    setListMateri(listMateri.filter((item) => item !== selected));
  };

  useEffect(() => {
    reset({
      default: records,
      jamMulaiDisetujuiUpdate: !records.tanggalMulaiDisetujui ? '' : moment(records.tanggalMulaiDisetujui).format('hh:mm'),
      jamSelesaiDisetujuiUpdate: !records.tanggalSelesaiDisetujui
        ? ''
        : moment(records.tanggalSelesaiDisetujui).format('hh:mm'),
      tanggalMulaiDisetujuiUpdate: !records.tanggalMulaiDisetujui
        ? ''
        : moment(records.tanggalMulaiDisetujui).format('DD/MM/YYYY'),
      tanggalSelesaiDisetujuiUpdate: !records.tanggalSelesaiDisetujui
        ? ''
        : moment(records.tanggalSelesaiDisetujui).format('DD/MM/YYYY'),
    });
  }, [records]);

  const schema = yup.object({}).required();

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...records,
    },
  });

  const materiBimtek = useMemo(() => records.materi || [], [records]);
  const pembicaraBimtek = useMemo(() => records.pembicara || [], [records]);
  const filterMateriBimtek = materiBimtek.filter((data) => data !== null);
  const filterPembicaraBimtek = pembicaraBimtek.filter((data) => data !== null);
  const columnsMateri = [
    {
      Header: 'Materi',
      accessor: '',
      Cell: ({ ...rest }) => <span>{rest?.row?.original?.nama}</span>,
    },
    {
      Header: 'Lampiran',
      accessor: '',
      Cell: ({ ...rest }) => <span>{rest?.row?.original?.fileType}</span>,
    },
    {
      Header: '',
      accessor: 'action',
      Cell: ({ ...rest }) => (
        <div>
          <Button variant="outline-none" className="bg-white sdp-text-blue p-0 mr-10">
            Edit
          </Button>
          <Button
            variant="outline-none"
            className="bg-white sdp-text-grey-dark p-0"
            onClick={() => onDeleteMateri(rest.row.original?.id)}>
            Delete
          </Button>
        </div>
      ),
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
        <span> {rest.row.original?.tanggalMulai ? moment(rest.row.original?.tanggalMulai).format('hh:mm') : '---'} </span>
      ),
    },
    {
      Header: '',
      accessor: 'action',
      Cell: ({ ...rest }) => (
        <div>
          <Button
            variant="outline-none"
            className="bg-white sdp-text-blue p-0 mr-10"
            onClick={() => onModalEditPembicara(rest.row.original)}>
            Edit
          </Button>
          <Button
            variant="outline-none"
            className="bg-white sdp-text-grey-dark p-0"
            onClick={() => onDeletePembicara(rest.row.original?.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

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

  const divClass = getStatusClass(status || '');
  const tagsResultList = (tagsResult || []).map((tag) => ({ value: tag, label: tag }));
  // console.log(records);
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
              <div className={bem.e('title')}>Jadwal Bimbingan Teknis</div>
              <div>
                {!loadingJadwalDetail ? (
                  <DetailHeader
                    handleModal={(type) => setShowModal(type)}
                    record={records}
                    history={history}
                    status={status}
                  />
                ) : null}
              </div>
            </div>
            {loadingJadwalDetail ? (
              <RowLoader />
            ) : (
              <Input group label="Nama Bimtek" name="default.namaBimtek" control={control} />
            )}
            {tagsLoading ? (
              <RowLoader />
            ) : (
              <div className="mb-15">
                <label className="mb-5">Kategori Bimtek</label>
                <SingleDropDown data={[{ value: '', label: 'All' }, ...tagsResultList]} onChange={handleTagChange} />
              </div>
            )}
            <Row className="align-items-end">
              <Col>
                {loadingJadwalDetail ? (
                  <RowLoader />
                ) : (
                  <DatePicker
                    group
                    label="Tanggal Mulai Pelaksanaan Disetujui"
                    name="tanggalMulaiDisetujuiUpdate"
                    control={control}
                    rules={{ required: false }}
                    error={errors.tanggalMulaiDisetujuiUpdate?.message}
                  />
                )}
              </Col>
              <Col>
                {loadingJadwalDetail ? (
                  <RowLoader />
                ) : (
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="jamMulaiDisetujuiUpdate"
                    control={control}
                    rules={{ required: false }}
                    error={errors.jamMulaiDisetujuiUpdate?.message}
                  />
                )}
              </Col>
            </Row>
            <Row className="align-items-end">
              <Col>
                {loadingJadwalDetail ? (
                  <RowLoader />
                ) : (
                  <DatePicker
                    group
                    label="Tanggal Selesai Pelaksanaan Disetujui"
                    name="tanggalSelesaiDisetujuiUpdate"
                    control={control}
                    rules={{ required: false }}
                    error={errors.tanggalSelesaiDisetujuiUpdate?.message}
                  />
                )}
              </Col>
              <Col>
                {loadingJadwalDetail ? (
                  <RowLoader />
                ) : (
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="jamSelesaiDisetujuiUpdate"
                    control={control}
                    rules={{ required: false }}
                    error={errors.jamSelesaiDisetujuiUpdate?.message}
                  />
                )}
              </Col>
            </Row>
            {loadingJadwalDetail ? (
              <RowLoader />
            ) : (
              <Input group label="Kota Pelaksana" name="default.kota" control={control} />
            )}
            {loadingJadwalDetail ? <RowLoader /> : <Input group label="Tempat" name="default.tempat" control={control} />}
            {loadingJadwalDetail ? (
              <TableLoader />
            ) : (
              <div className="pembicara">
                <div className="d-flex justify-content-between">
                  <span className="fw-bold mb-10 d-block"> Pembicara </span>
                  <Button variant="outline-none" onClick={() => setShowModal('pembicara')}>
                    <Plus /> <span className="fw-bold text-danger"> Tambah Pembicara </span>
                  </Button>
                </div>
                <Table {...tableConfigPembicara} />
              </div>
            )}
            {loadingJadwalDetail ? (
              <TableLoader />
            ) : (
              <div className="materi">
                <div className="d-flex justify-content-between">
                  <span className="fw-bold mb-10 d-block"> Materi </span>
                  <Button variant="outline-none" onClick={() => setShowModal('materi')}>
                    <Plus /> <span className="fw-bold text-danger"> Tambah Materi </span>
                  </Button>
                </div>
                <span className="fw-bold mb-10 d-block"> Materi </span>
                <Table {...tableConfigMateri} />
              </div>
            )}
          </div>
        </Col>
        <Col sm={3}>
          <LogStatus data={dataLog} />
        </Col>
      </Row>
      {showModal === 'kirim' && (
        <CMSModal onClose={handleCloseModal} label="Kirim Jadwal Bimtek?" loader={loader} confirmButtonAction={onKirim} />
      )}
      {showModal === 'setujui' && (
        <CMSModal
          onClose={handleCloseModal}
          label={
            <>
              Apakah anda yakin ingin <span className="sdp-text-blue">menyetujui</span> Jadwal Bimtek
              <b> {prefixID(id, 'JB')}</b>?
            </>
          }
          loader={loader}
          confirmButtonAction={onSetujui}
        />
      )}
      {showModal === 'delete' && (
        <CMSModal
          onClose={handleCloseModal}
          label={
            <>
              Apakah anda yakin ingin <span className="sdp-error">menghapus</span> Jadwal Bimtek <b>{prefixID(id, 'JB')}</b>?
            </>
          }
          loader={loader}
          confirmButtonAction={onDelete}
        />
      )}
      {showModal === 'publish' && (
        <CMSModal
          onClose={handleCloseModal}
          label={
            <>
              Apakah anda yakin ingin <span className="sdp-text-blue">mempublish</span> Forum <b>{prefixID(id, 'PD')}</b>?
            </>
          }
          loader={loader}
          confirmButtonAction={onPublish}
        />
      )}
      {showModal === 'unPublish' && (
        <CMSModal
          onClose={handleCloseModal}
          label={
            <>
              Apakah anda yakin ingin <span className="sdp-text-blue">batal terbitkan </span>
              Jadwal Bimtek
              <b> {prefixID(id, 'JB')}</b>?
            </>
          }
          loader={loader}
          confirmButtonAction={onUnpublish}
        />
      )}
      {showModal === 'tolak' && (
        <CMSModal
          onClose={handleCloseModal}
          label={
            <>
              Apakah anda yakin ingin <span className="text-danger">Menolak </span>
              Jadwal Bimtek <b>{prefixID(id, 'JB')}</b>?
            </>
          }
          loader={loader}
          confirmButtonAction={onTolak}
        />
      )}
      {showModal === 'perbarui' && (
        <CMSModal
          onClose={handleCloseModal}
          label={
            <>
              Apakah anda yakin ingin <span className="sdp-text-blue">Memperbarui </span>
              Jadwal Bimtek <b>{prefixID(id, 'JB')}</b>?
            </>
          }
          loader={loader}
          confirmButtonAction={handleSubmit(onUpdate)}
        />
      )}
      {showModal === 'materi' && (
        <Modal
          className="cms-bimtek-materi"
          title="Tambah Materi Baru"
          onClose={handleCloseModal}
          visible={handleCloseModal}>
          <Form onSubmit={handleSubmit(onAddMateri)}>
            <div>
              <Input group label="Materi" name="materi" control={control} />
              <div>
                <label>Lampiran</label>
                <input id="sdp-upload-materi" multiple type="file" style={{ display: 'none' }} onChange={addFoto} />
              </div>
              <div className="wrapper-lampiran">
                <div className="wrapper-lampiran-header" onClick={() => openUploadForm('sdp-upload-materi')}>
                  <span className="upload"> Upload </span>
                  <span className="cta"> Upload Image (format .png, .jpeg, .jpg max. 512KB) </span>
                </div>
                <div className="wrapper-lampiran-file">
                  {listMateri.map((data, index) => {
                    return (
                      <span className="file mr-10 mb-10" key={index} onClick={() => removeFile(index)}>
                        <Galery /> <span> {data.fileName} </span> <Close />
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <Button className="br-4 mr-8 px-57 py-13 bg-transparent" variant="light" onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" className="mx-10" variant="info" style={{ width: '112px' }}>
                  Simpan
                </Button>
              </div>
            </div>
          </Form>
        </Modal>
      )}
      {showModal === 'pembicara' && (
        <Modal
          className="cms-bimtek-materi"
          title="Tambah Pembicari Baru"
          visible={handleCloseModal}
          onClose={handleCloseModal}>
          <Form onSubmit={handleSubmit(onAddPembicara)}>
            <div className="mb-10">
              <Row>
                <Input group label="Nama Pembicara" name="tambahPembicara" control={control} />
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker group label="Tanggal Mulai Sesi" name="tambahPembicaraWaktuMulai" control={control} />
                </Col>
                <Col>
                  <Input group className="m-0" type="time" label="" name="tambahPembicaraJamMulai" control={control} />
                </Col>
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker group label="Tanggal Selesai Sesi" name="tambahPembicaraWaktuSelesai" control={control} />
                </Col>
                <Col>
                  <Input group className="m-0" type="time" label="" name="tambahPembicaraJamSelesai" control={control} />
                </Col>
              </Row>
            </div>
            <div className="d-flex justify-content-end">
              <Button className="br-4 mr-8 px-57 py-13 bg-transparent" variant="light" onClick={handleCloseModal}>
                Batal
              </Button>
              <Button type="submit" className="mx-10" variant="info" style={{ width: '112px' }}>
                Simpan
              </Button>
            </div>
          </Form>
        </Modal>
      )}
      {showModal === 'editPembicara' && (
        <Modal className="cms-bimtek-materi" title="Ubah Pembicara" visible={handleCloseModal} onClose={handleCloseModal}>
          <Form onSubmit={handleSubmit(onEditPembicara)}>
            <div className="mb-10">
              <Row>
                <Input group label="Nama Pembicara" name="tambahPembicara" control={control} />
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker group label="Tanggal Mulai Sesi" name="tambahPembicaraWaktuMulai" control={control} />
                </Col>
                <Col>
                  <Input group className="m-0" type="time" label="" name="tambahPembicaraJamMulai" control={control} />
                </Col>
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker group label="Tanggal Selesai Sesi" name="tambahPembicaraWaktuSelesai" control={control} />
                </Col>
                <Col>
                  <Input group className="m-0" type="time" label="" name="tambahPembicaraJamSelesai" control={control} />
                </Col>
              </Row>
            </div>
            <div className="d-flex justify-content-end">
              <Button className="br-4 mr-8 px-57 py-13 bg-transparent" variant="light" onClick={handleCloseModal}>
                Batal
              </Button>
              <Button type="submit" className="mx-10" variant="info" style={{ width: '112px' }}>
                Simpan
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default CMSJadwalDetail;
