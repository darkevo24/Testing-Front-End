import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import * as yup from 'yup';
import isFunction from 'lodash/isFunction';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { DatePicker, Input, Modal, Table, TextEditor, Notification } from 'components';
import { apiUrls, post } from 'utils/request';
import { ReactComponent as DeleteIcon } from 'assets/trash-icon.svg';
import { LogStatus } from 'components/Sidebars/LogStatus';
import { LeftChevron } from 'components/Icons';
import { getStatusClass, prefixID } from 'utils/helper';
import { CMSModal } from 'components/CMSStatusModals';
import SingleDropDown from 'components/DropDown/SingleDropDown';
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

  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState('');
  const [apiError, setAPIError] = useState('');

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
        message: <div> Gagal Merubah Status </div>,
        icon: 'cross',
      });
      handleCloseModal();
      setAPIError(e.message);
    }
  };

  const handleTagChange = (selected) => {
    // console.log(selected);
  };
  console.log(records);
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

  const handleCloseModal = () => {
    setShowModal('');
    setLoader(false);
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

  const materiBimtek = useMemo(() => records.tagMateri || [], [records]);
  const pembicaraBimtek = useMemo(() => records.pembicara || [], [records]);

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
    {
      Header: '',
      accessor: 'Edit',
      Cell: ({ ...rest }) => (
        <div>
          <Button variant="outline-none" className="bg-white sdp-text-blue p-0 mr-10">
            Edit
          </Button>
          <Button variant="outline-none" className="bg-white sdp-text-grey-dark p-0">
            Delete
          </Button>
        </div>
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
              <Input group label="Kota Pelaksana" name="default.tempat" control={control} />
            )}
            {loadingJadwalDetail ? (
              <TableLoader />
            ) : (
              <div className="pembicara">
                <span className="fw-bold mb-10 d-block"> Pembicara </span>
                <Table {...tableConfigPembicara} />
              </div>
            )}
            {loadingJadwalDetail ? (
              <TableLoader />
            ) : (
              <div className="materi">
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
          confirmButtonAction={onUnpublish}
        />
      )}
    </div>
  );
};

export default CMSJadwalDetail;
