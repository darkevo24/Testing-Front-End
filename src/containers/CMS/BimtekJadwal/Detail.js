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
import { DatePicker, Input, Table, Notification } from 'components';
import { apiUrls, post, put, deleteRequest } from 'utils/request';
import { LogStatus } from 'components/Sidebars/LogStatus';
import { LeftChevron } from 'components/Icons';
import { getStatusClass, prefixID } from 'utils/helper';
import { CMSModal } from 'components/CMSStatusModals';
import SingleSelectDropDown from 'components/DropDown/SingleSelectDropDown';
import { ReactComponent as Plus } from 'assets/plus.svg';
import RowLoader from 'components/Loader/RowLoader';
import TableLoader from 'components/Loader/TableLoader';
import { DetailHeader } from './detailHeader';
import { ModalDetailMateri, ModalDetailPembicara } from './Modals';
import bn from 'utils/bemNames';
import {
  bimtekJadwalDetailSelector,
  bimtekListKabupaten,
  bimtekLogAktifitas,
  bimtekJadwalTags,
  getListLogAktifitas,
  getJadwalBimtekDetail,
  getListBimtekTags,
  getListBimtekKabupaten,
} from './reducer';

const bem = bn('content-detail');

const CMSJadwalDetail = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { records, loadingJadwalDetail } = useSelector(bimtekJadwalDetailSelector);
  const { listKabupaten } = useSelector(bimtekListKabupaten);
  const { tagsResult, tagsLoading } = useSelector(bimtekJadwalTags);
  const { dataLog } = useSelector(bimtekLogAktifitas);
  const [idPembicara, setIdPembicara] = useState('');
  const [dataEditPembicara, setDataEditPembicara] = useState('');
  const [idMateri, setIdMateri] = useState(false);
  const [namaMateri, setNamaMateri] = useState('');
  const [loader, setLoader] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [buttonUpdate, setButtonUpdate] = useState(false);
  const [showModal, setShowModal] = useState('');
  const [apiError, setAPIError] = useState(false);
  const [listMateri, setListMateri] = useState([]);
  const status = (records?.status || '').toLowerCase();
  const goBack = () => {
    history.push('/cms/bimtek-jadwal');
  };

  useEffect(() => {
    if (!id) goBack();
    initialCall();
  }, []);

  const schemaEdit = yup
    .object({
      namaBimtek: yup.string().required(),
      tags: yup.array().required().min(1),
      tagsKota: yup.object().required(),
      tanggalMulaiDisetujuiUpdate: yup.string().required(),
      jamMulaiDisetujuiUpdate: yup.string().required(),
      tanggalSelesaiDisetujuiUpdate: yup.string().required(),
      jamSelesaiDisetujuiUpdate: yup.string().required(),
      tempat: yup.string().required(),
    })
    .required();

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schemaEdit),
    defaultValues: {
      ...records,
    },
  });

  const initialCall = () => {
    dispatch(getJadwalBimtekDetail(id));
    dispatch(getListLogAktifitas(id));
    dispatch(getListBimtekTags());
    dispatch(getListBimtekKabupaten());
  };

  const tagsResultKabupaten = (listKabupaten || []).map((tag) => ({ value: tag.id, label: tag.nama }));

  const handleNotification = (type, message, icon) => {
    Notification.show({
      type,
      message,
      icon,
    });
  };

  const handleAPICall = async (method, url, params, message, callBack) => {
    try {
      setLoader(true);
      await method(url, {}, params);
      handleCloseModal();
      handleNotification('secondary', `${message}`, 'check');
      initialCall();
      isFunction(callBack) && callBack();
      setAPIError(false);
    } catch (e) {
      setAPIError(true);
      handleCloseModal();
      return handleNotification('secondary', `Error, ${e.message}`, 'cross');
    }
  };

  const onKirim = async () => {
    handleAPICall(
      post,
      `${apiUrls.cmsBimtekJadwal}/${id}/ubah-status/WAITING_APPROVAL`,
      { data: { note: '' } },
      'Berhasil Merubah Status',
    );
  };

  const onDelete = async () => {
    handleAPICall(
      post,
      `${apiUrls.cmsBimtekJadwal}/${id}/ubah-status/DELETED`,
      { data: { note: '' } },
      'Berhasil Merubah Status',
      goBack,
    );
  };

  const onSetujui = async () => {
    handleAPICall(
      post,
      `${apiUrls.cmsBimtekJadwal}/${id}/ubah-status/APPROVED`,
      { data: { note: '' } },
      'Berhasil Merubah Status',
    );
  };

  const onTolak = async () => {
    handleAPICall(
      post,
      `${apiUrls.cmsBimtekJadwal}/${id}/ubah-status/REJECTED`,
      { data: { note: '' } },
      'Berhasil Merubah Status',
    );
  };

  const onPublish = async () => {
    handleAPICall(
      post,
      `${apiUrls.cmsBimtekJadwal}/${id}/ubah-status/PUBLISHED`,
      { data: { note: '' } },
      'Berhasil Merubah Status',
    );
  };

  const onUnpublish = async () => {
    handleAPICall(
      post,
      `${apiUrls.cmsBimtekJadwal}/${id}/ubah-status/UNPUBLISHED`,
      { data: { note: '' } },
      'Berhasil Merubah Status',
    );
  };

  const handleUpdate = () => {
    setReadOnly(false);
    setButtonUpdate(true);
    setIdMateri('');
    handleCloseModal();
  };

  const onUpdate = async (data) => {
    let tanggalMulai = moment(data.tanggalMulaiDisetujuiUpdate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    let tanggalSelesai = moment(data.tanggalSelesaiDisetujuiUpdate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    if (tanggalMulai === 'Invalid date') {
      tanggalMulai = moment(data.tanggalMulaiDisetujuiUpdate).format('YYYY-MM-DD');
    }
    if (tanggalSelesai === 'Invalid date') {
      tanggalSelesai = moment(data.tanggalSelesaiDisetujuiUpdate).format('YYYY-MM-DD');
    }
    let tanggalMulaiDisetujui = `${tanggalMulai} ${data.jamMulaiDisetujuiUpdate}:00`,
      tanggalSelesaiDisetujui = `${tanggalSelesai} ${data.jamSelesaiDisetujuiUpdate}:00`;
    if (!moment(tanggalSelesaiDisetujui).isAfter(tanggalMulaiDisetujui)) {
      handleCloseModal();
      return handleNotification('secondary', 'Gagal, Rentang Waktu Tidak Valid', 'cross');
    }
    let obj = {
      namaBimtek: data.namaBimtek,
      tagMateri: data.tags.map((elem) => elem.label) || [],
      kota: data.tagsKota[0]?.value || data.tagsKota.value,
      alamat: data.tempat,
      tanggalMulaiDisetujui,
      tanggalSelesaiDisetujui,
    };
    handleAPICall(put, `${apiUrls.cmsBimtekJadwal}/${id}`, { data: obj }, 'Berhasil Merubah Data');
    if (!apiError) {
      setReadOnly(true);
      setButtonUpdate(false);
    }
  };

  const onDeleteMateri = async (idMateri) => {
    handleAPICall(deleteRequest, `${apiUrls.cmsBimtekJadwal}/${id}/materi/${idMateri}`, '', 'Berhasil Menghapus Materi');
  };

  const onDeletePembicara = async (idPembicara) => {
    handleAPICall(
      deleteRequest,
      `${apiUrls.cmsBimtekJadwal}/${id}/pembicara/${idPembicara}`,
      '',
      'Berhasil Menghapus Pembicara',
    );
  };

  const handleCloseModal = () => {
    setShowModal('');
    setLoader(false);
    setListMateri([]);
  };

  const handleEditMateri = (data) => {
    setNamaMateri(data.nama);
    setIdMateri(data.id);
    setListMateri([data]);
    setShowModal('editMateri');
  };

  const onModalEditPembicara = (data) => {
    setIdPembicara(data.id);
    setDataEditPembicara(data);
    setShowModal('editPembicara');
  };

  let filterKota = tagsResultKabupaten.filter((item) => item.label === records.kota);
  useEffect(() => {
    setValue('namaBimtek', records.namaBimtek);
    setValue('tempat', records.tempat);
    setValue(
      'tags',
      (records.tagMateri || []).map((elem) => ({ value: elem, label: elem })),
    );
    setValue('tagsKota', filterKota[0]);
    setValue(
      'jamMulaiDisetujuiUpdate',
      !records.tanggalMulaiDisetujui ? '' : moment(records.tanggalMulaiDisetujui).format('HH:mm'),
    );
    setValue(
      'jamSelesaiDisetujuiUpdate',
      !records.tanggalSelesaiDisetujui ? '' : moment(records.tanggalSelesaiDisetujui).format('HH:mm'),
    );
    setValue(
      'tanggalMulaiDisetujuiUpdate',
      !records.tanggalMulaiDisetujui ? '' : moment(records.tanggalMulaiDisetujui).format('DD/MM/YYYY'),
    );
    setValue(
      'tanggalSelesaiDisetujuiUpdate',
      !records.tanggalSelesaiDisetujui ? '' : moment(records.tanggalSelesaiDisetujui).format('DD/MM/YYYY'),
    );
  }, [records, listKabupaten]);

  const materiBimtek = useMemo(() => records.materi || [], [records]);
  const pembicaraBimtek = useMemo(() => records.pembicara || [], [records]);
  const filterMateriBimtek = materiBimtek.filter((data) => data !== null);
  const filterPembicaraBimtek = pembicaraBimtek.filter((data) => data !== null);
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
    {
      Header: '',
      accessor: 'action',
      Cell: ({ row: { original } }) => (
        <div>
          {buttonUpdate ? (
            <>
              <Button
                variant="outline-none"
                className="bg-white sdp-text-blue p-0 mr-10"
                onClick={() => handleEditMateri(original)}>
                Edit
              </Button>
              <Button
                variant="outline-none"
                className="bg-white sdp-text-grey-dark p-0"
                onClick={() => onDeleteMateri(original?.id)}>
                Delete
              </Button>
            </>
          ) : null}
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
      Cell: ({ row: { original } }) => (
        <div className="d-flex">
          <span className="pr-5">
            {original?.tanggalMulai ? moment(original?.tanggalMulai).format('DD MMMM YYYY') + ' ' : '---'}
            {original?.tanggalMulai ? moment(original?.tanggalMulai).format('HH:mm') : '---'}
          </span>
          <span>-</span>
          <span className="pl-5">
            {original?.tanggalSelesai ? moment(original?.tanggalSelesai).format('DD MMMM YYYY') + ' ' : '---'}
            {original?.tanggalSelesai ? moment(original?.tanggalSelesai).format('HH:mm') : '---'}
          </span>
        </div>
      ),
    },
    {
      Header: '',
      accessor: 'action',
      Cell: ({ row: { original } }) => (
        <div>
          {buttonUpdate ? (
            <>
              <Button
                variant="outline-none"
                className="bg-white sdp-text-blue p-0 mr-10"
                onClick={() => onModalEditPembicara(original)}>
                Edit
              </Button>
              <Button
                variant="outline-none"
                className="bg-white sdp-text-grey-dark p-0"
                onClick={() => onDeletePembicara(original?.id)}>
                Delete
              </Button>
            </>
          ) : null}
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
    variant: 'link',
  };

  const tableConfigPembicara = {
    className: 'cms-bimtek-table',
    columns: columnsPembicara,
    data: filterPembicaraBimtek,
    title: '',
    showSearch: false,
    variant: 'link',
  };

  const divClass = getStatusClass(status || '');
  const tagsResultList = (tagsResult || []).map((tag) => ({ value: tag, label: tag }));
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
                    handleUpdate={handleUpdate}
                    record={records}
                    history={history}
                    status={status}
                    buttonUpdate={buttonUpdate}
                  />
                ) : null}
              </div>
            </div>
            {loadingJadwalDetail ? (
              <RowLoader />
            ) : (
              <Input
                readOnly={readOnly}
                group
                label="Nama Bimtek"
                name="namaBimtek"
                control={control}
                error={errors.namaBimtek?.message}
                rules={{ required: true }}
              />
            )}
            {tagsLoading ? (
              <RowLoader />
            ) : buttonUpdate ? (
              <div className="mb-15">
                <SingleSelectDropDown
                  group
                  groupClass="mb-16"
                  isMulti
                  control={control}
                  label="Kategori Bimtek"
                  labelClass="sdp-form-label fw-normal"
                  placeholder=""
                  name="tags"
                  data={tagsResultList}
                  loading={tagsLoading}
                  isCreatable={true}
                  error={errors.tags?.message}
                  rules={{ required: true }}
                />
              </div>
            ) : (
              <Form.Group>
                <label className="sdp-form-label mb-8">Kategori Bimtek</label>
                <div className="tag-data d-flex align-items-center bg-gray-dark border-gray-stroke p-9 br-4">
                  {(records.tagMateri || []).map((elem, index) => (
                    <label className="sdp-text-blue mr-6 px-10 bg-light-blue" key={`tag-label-${index}`}>
                      {elem}
                    </label>
                  ))}
                </div>
              </Form.Group>
            )}
            <Row className="align-items-end">
              <Col>
                {loadingJadwalDetail ? (
                  <RowLoader />
                ) : (
                  <DatePicker
                    readOnly={readOnly}
                    group
                    label="Tanggal Mulai Pelaksanaan Disetujui"
                    name="tanggalMulaiDisetujuiUpdate"
                    control={control}
                    rules={{ required: true }}
                    error={errors.tanggalMulaiDisetujuiUpdate?.message}
                  />
                )}
              </Col>
              <Col>
                {loadingJadwalDetail ? (
                  <RowLoader />
                ) : (
                  <Input
                    readOnly={readOnly}
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="jamMulaiDisetujuiUpdate"
                    control={control}
                    rules={{ required: true }}
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
                    readOnly={readOnly}
                    group
                    label="Tanggal Selesai Pelaksanaan Disetujui"
                    name="tanggalSelesaiDisetujuiUpdate"
                    control={control}
                    rules={{ required: true }}
                    error={errors.tanggalSelesaiDisetujuiUpdate?.message}
                  />
                )}
              </Col>
              <Col>
                {loadingJadwalDetail ? (
                  <RowLoader />
                ) : (
                  <Input
                    readOnly={readOnly}
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="jamSelesaiDisetujuiUpdate"
                    control={control}
                    rules={{ required: true }}
                    error={errors.jamSelesaiDisetujuiUpdate?.message}
                  />
                )}
              </Col>
            </Row>
            {loadingJadwalDetail ? (
              <RowLoader />
            ) : buttonUpdate ? (
              <div className="mb-15">
                <SingleSelectDropDown
                  group
                  groupClass="mb-16"
                  control={control}
                  label="Kota Pelaksana"
                  labelClass="sdp-form-label fw-normal"
                  placeholder=""
                  name="tagsKota"
                  control={control}
                  data={[{ value: '', label: 'All' }, ...tagsResultKabupaten]}
                  loading={tagsLoading}
                  isCreatable={true}
                />
              </div>
            ) : (
              <Form.Group className="mb-15">
                <label className="sdp-form-label mb-8">Kota Pelaksana</label>
                <div className="tag-data d-flex align-items-center bg-gray-dark border-gray-stroke p-9 br-4">
                  <label className="sdp-text-blue mr-6 px-10 bg-light-blue"> {records?.kota} </label>
                </div>
              </Form.Group>
            )}
            {loadingJadwalDetail ? (
              <RowLoader />
            ) : (
              <Input
                readOnly={readOnly}
                group
                label="Tempat"
                name="tempat"
                control={control}
                error={errors.tempat?.message}
                rules={{ required: true }}
              />
            )}
            {loadingJadwalDetail ? (
              <TableLoader />
            ) : (
              <div className="pembicara">
                <div className="d-flex justify-content-between">
                  <span className="fw-bold mb-10 d-block"> Pembicara </span>
                  {buttonUpdate ? (
                    <Button variant="outline-none" onClick={() => setShowModal('pembicara')}>
                      <Plus /> <span className="fw-bold text-danger"> Tambah Pembicara </span>
                    </Button>
                  ) : null}
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
                  {buttonUpdate ? (
                    <Button variant="outline-none" onClick={() => setShowModal('materi')}>
                      <Plus /> <span className="fw-bold text-danger"> Tambah Materi </span>
                    </Button>
                  ) : null}
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
      {showModal === 'updateBimtek' && (
        <CMSModal
          onClose={handleCloseModal}
          label={
            <>
              Apakah anda yakin ingin <span className="sdp-text-blue">Memperbarui</span> Jadwal Bimtek
              <b> {prefixID(id, 'JB')}</b>?
            </>
          }
          loader={loader}
          confirmButtonAction={handleSubmit(onUpdate)}
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
      {showModal === 'materi' || 'editMateri' ? (
        <ModalDetailMateri
          statusModal={showModal}
          idJadwal={id}
          idMateri={idMateri}
          initialCall={initialCall}
          visible={handleCloseModal}
          listMateri={listMateri}
          setListMateri={(data) => setListMateri(data)}
          namaMateriEdit={namaMateri ? namaMateri : null}
          apiError={apiError}
          setAPIError={(data) => setAPIError(data)}
        />
      ) : null}
      {showModal === 'pembicara' || 'editPembicara' ? (
        <ModalDetailPembicara
          statusModal={showModal}
          visible={handleCloseModal}
          idPembicara={idPembicara ? idPembicara : null}
          initialCall={initialCall}
          idJadwal={id}
          apiError={apiError}
          setAPIError={(data) => setAPIError(data)}
          dataEditPembicara={dataEditPembicara ? dataEditPembicara : null}
        />
      ) : null}
    </div>
  );
};

export default CMSJadwalDetail;
