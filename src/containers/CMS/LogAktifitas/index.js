import { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import cx from 'classnames';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker } from 'components';
import { Search, ModalAlertDanger } from 'components/Icons';
import { Modal, Table } from 'components';
import TableLoader from 'components/Loader/TableLoader';
import bn from 'utils/bemNames';
import { getCMSLogActifitasData, cmsLogAktifitasDataSelector } from './reducer';
const DEBOUNCE_DELAY = 1500;

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
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  const { q, startDate, endDate, size, loading, records, totalRecords, totalPages } =
    useSelector(cmsLogAktifitasDataSelector);

  useEffect(() => {
    dispatch(getCMSLogActifitasData({ page: currentPage, q, startDate, endDate }));
  }, [dispatch, q, startDate, endDate, currentPage]);

  const [modalProfile, setModalProfile] = useState(false);
  const {
    control,
    formState: { errors },
    watch,
    // handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const startDateValue = watch('startDate');
  const endDateValue = watch('endDate');

  useEffect(() => {
    if (startDateValue && endDateValue) {
      dispatch(
        getCMSLogActifitasData({
          page: 0,
          q: query,
          startDate: moment(startDateValue).format('YYYY-MM-DD'),
          endDate: moment(endDateValue).format('YYYY-MM-DD'),
        }),
      );
    }
  }, [startDateValue, endDateValue]);

  const rowClick = (data) => {
    // history.push(`/cms/permintaan-data/${data.id}`);
  };

  const getRowClass = (data) => {
    // if ((data?.status || '').toLowerCase() !== 'ditolak') return '';
    // return 'bg-gray';
  };

  const handleSearch = () => {
    dispatch(getCMSLogActifitasData({ page: 0, q: query, startDate, endDate }));
  };
  const handleUserInputChange = (event) => {
    const { value } = event.target;
    setQuery(value);
  };
  const delayedQuery = useCallback(debounce(handleSearch, DEBOUNCE_DELAY), [query]);

  useEffect(() => {
    delayedQuery();

    return delayedQuery.cancel;
  }, [query, delayedQuery]);

  const columns = [
    {
      Header: 'ID Pengguna',
      accessor: 'email',
      Cell: ({
        row: {
          original: { data },
        },
      }) => {
        const { email = '' } = data?.user;
        return <span>{email}</span>;
      },
    },
    {
      Header: 'Alamat IP',
      accessor: 'ip',
    },
    {
      Header: 'Waktu',
      accessor: 'createdAt',
      Cell: ({ ...rest }) => (
        <span>
          {rest.row.original?.createdAt ? moment(rest.row.original?.createdAt).format('DD/MM YYYY : HH:MM') : '---'}{' '}
        </span>
      ),
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
          original: { data = {} },
        },
      }) => {
        const { status = '' } = data;
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
    currentPage: currentPage,
    manualPagination: true,
    onRowClick: rowClick,
    rowClass: getRowClass,
    onPageIndexChange: (nextPage) => {
      if (nextPage !== currentPage) {
        setCurrentPage(nextPage);
      }
    },
  };

  return (
    <div className="sdp-log-activity">
      <div className="container">
        <div className={bem.e('header-log')}>
          <div className="wrapper-left">
            <h1> Log Aktivitas </h1>
            <Button className="" variant="info" style={{ width: '112px' }} onClick={() => setModalProfile(true)}>
              Download
            </Button>
            <Button
              className="ml-10 bg-white sdp-text-grey-dark border-gray-stroke secondary"
              variant="secondary"
              style={{ width: '112px' }}
              onClick={() => setModalProfile(true)}>
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
              />
            </div>
            <InputGroup>
              <Form.Control variant="normal" type="text" placeholder="Pencarian" onChange={handleUserInputChange} />
              <Search />
            </InputGroup>
          </div>
        </div>
        {loading ? <TableLoader speed={2} width={'100%'} height={550} /> : <Table {...tableConfig} />}
      </div>
      <Modal className="cms-log-activity" showHeader={false} visible={modalProfile} onClose={() => setModalProfile(false)}>
        <div className="alert">
          <ModalAlertDanger />
          <p className="text-danger pt-15">
            Data log yang di-backup akan didownload ke dalam bentuk csv dan
            <span className="font-weight-bold"> akan dihapus dari sistem </span>
          </p>
        </div>
        <p className="date-backup">
          Backup Log Aktivitas
          <span className="ml-10 mr-5 p-5"> 1 Jan 2021 - 1 Des 2021 </span>?
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
            <Button className="mx-10" variant="info" style={{ width: '112px' }}>
              Konfirmasi
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LogActivity;
