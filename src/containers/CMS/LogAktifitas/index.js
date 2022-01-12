import { useState, useEffect } from 'react';
import moment from 'moment';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker } from 'components';
import { Search, ModalAlertDanger } from 'components/Icons';
import { Modal, Table, Notification } from 'components';
import TableLoader from 'components/Loader/TableLoader';
import { useDebounce } from 'utils/hooks';
import bn from 'utils/bemNames';
import { getCMSLogActifitasData, cmsLogAktifitasDataSelector, bacUpLogActivity, downloadLogActivity } from './reducer';
const DEBOUNCE_DELAY = 500;
const ACTION_TYPE = {
  DOWNLOAD: 'download',
  BACKUP: 'backup',
};

const bem = bn('log-activity');

const schema = yup
  .object({
    search: yup.string().trim().max(100),
    startDate: yup.string(),
    endDate: yup.string(),
  })
  .required();

const LogActivity = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [disable, setDisable] = useState(true);
  const [actionType, setActionType] = useState(ACTION_TYPE.DOWNLOAD);

  const { page, startDate, endDate, size, loading, records, totalRecords, totalPages } =
    useSelector(cmsLogAktifitasDataSelector);

  const handleAPICall = (params) => {
    return dispatch(getCMSLogActifitasData(params));
  };

  const [modalProfile, setModalProfile] = useState(false);
  const {
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const startDateValue = watch('startDate');
  const endDateValue = watch('endDate');

  useEffect(() => {
    const params = { page: page };
    if (query) params.q = query;
    if (startDateValue) params.startDate = moment(startDateValue).format('YYYY-MM-DD');
    if (endDateValue) params.endDate = moment(endDateValue).format('YYYY-MM-DD');
    handleAPICall(params);
  }, [startDateValue, endDateValue, query, page]);

  useEffect(() => {
    if (startDateValue && endDateValue) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [startDateValue, endDateValue]);

  const handleModalOpen = (e, actionType) => {
    e.preventDefault();
    setActionType(actionType);
    setModalProfile(true);
  };

  const handleNotification = (response) => {
    if (response.payload) {
      Notification.show({
        type: 'secondary',
        message: <div> Sukses </div>,
        icon: 'check',
      });
    } else {
      Notification.show({
        type: 'secondary',
        message: <div> Kesalahan Silakan coba lagi </div>,
        icon: 'cross',
      });
    }
  };
  const handleModalSubmit = (e) => {
    e.preventDefault();
    const params = {
      startDate: moment(startDateValue).format('YYYY-MM-DD'),
      endDate: moment(endDateValue).format('YYYY-MM-DD'),
    };
    setModalProfile(false);
    if (actionType === ACTION_TYPE.DOWNLOAD) {
      dispatch(downloadLogActivity(params)).then((res) => {
        handleNotification(res);
      });
    } else {
      dispatch(bacUpLogActivity(params)).then((res) => {
        handleNotification(res);
      });
    }
  };

  const handleUserInputChange = (event) => {
    const { value } = event.target;
    delayedQuery(value);
  };
  const delayedQuery = useDebounce((query) => setQuery(query), DEBOUNCE_DELAY);

  useEffect(() => {
    return delayedQuery.cancel;
  }, [query, delayedQuery]);

  const columns = [
    {
      Header: 'ID Pengguna',
      accessor: 'username',
    },
    {
      Header: 'Alamat IP',
      accessor: 'ip',
    },
    {
      Header: 'Waktu',
      accessor: 'createdAt',
    },
    {
      Header: 'Activity',
      accessor: 'remark',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({
        row: {
          original: { status = '' },
        },
      }) => {
        return (
          <span
            className={cx({
              'sdp-text-red': ['Error', 'Gagal'].includes(status),
              'sdp-text-green': ['Success', 'Berhasil'].includes(status),
            })}>
            {status}
          </span>
        );
      },
    },
  ];

  const tableConfig = {
    className: 'cms-table-log',
    columns,
    data: records,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'link',
    totalCount: totalRecords || null,
    pageCount: totalPages || null,
    pageSize: size,
    currentPage: page,
    manualPagination: true,
    onPageIndexChange: (nextPage) => {
      if (nextPage !== page) {
        handleAPICall({ page: nextPage, q: query, startDate, endDate });
      }
    },
  };

  return (
    <div className="sdp-log-activity">
      <div className={bem.e('header-log')}>
        <div className="wrapper-left">
          <h1> Log Aktivitas </h1>
          <Button className="" variant="info" onClick={(e) => handleModalOpen(e, ACTION_TYPE.DOWNLOAD)} disabled={disable}>
            Download
          </Button>
          <Button
            className="ml-10 bg-white sdp-text-grey-dark border-gray-stroke secondary"
            variant="secondary"
            onClick={(e) => handleModalOpen(e, ACTION_TYPE.BACKUP)}
            disabled={disable}>
            Backup
          </Button>
        </div>
        <div className="wrapper-right">
          <div className="date">
            <p>Awal</p>
            <DatePicker
              className="cms-log-activity"
              name="startDate"
              control={control}
              rules={{ required: false }}
              error={errors.startDate?.message}
              arrow={true}
              max={moment().subtract(1, 'days').format('YYYY-MM-DD')}
            />
          </div>
          <div className="date">
            <p>Akhir</p>
            <DatePicker
              className="cms-log-activity"
              name="endDate"
              control={control}
              rules={{ required: false }}
              error={errors.endDate?.message}
              arrow={true}
              min={startDateValue}
              max={moment().subtract(1, 'days').format('YYYY-MM-DD')}
            />
          </div>
          <InputGroup>
            <Form.Control variant="normal" type="text" placeholder="Pencarian" onChange={handleUserInputChange} />
            <Search />
          </InputGroup>
        </div>
      </div>
      {loading ? <TableLoader speed={2} width={'100%'} height={550} /> : <Table {...tableConfig} />}
      <Modal className="cms-log-activity" showHeader={false} visible={modalProfile} onClose={() => setModalProfile(false)}>
        <div className="alert">
          {actionType === ACTION_TYPE.BACKUP ? (
            <>
              <ModalAlertDanger />
              <p className="text-danger pt-15">
                Data log yang di-backup akan didownload ke dalam bentuk csv dan
                <span className="font-weight-bold"> akan dihapus dari sistem </span>
              </p>
            </>
          ) : null}
        </div>
        <p className="date-backup">
          {actionType === ACTION_TYPE.DOWNLOAD ? 'Download' : 'Backup'} Log Aktivitas dari tanggal{' '}
          <span className="ml-10 mr-5 p-5">
            {' '}
            {moment(startDateValue).format('DD-MMMM-YYYY')} - {moment(endDateValue).format('DD-MMMM-YYYY')}{' '}
          </span>
          ?
        </p>
        <div>
          <div className="d-flex justify-content-end pb-20 pr-10">
            <Button
              onClick={() => setModalProfile(false)}
              className="ml-24 bg-white sdp-text-grey-dark border-gray-stroke"
              variant="secondary"
              style={{ width: '112px' }}>
              Batal
            </Button>
            <Button className="mx-10" variant="info" style={{ width: '112px' }} onClick={handleModalSubmit}>
              Konfirmasi
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LogActivity;
