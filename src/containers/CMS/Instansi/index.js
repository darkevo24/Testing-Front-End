import cx from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import bn from 'utils/bemNames';
import { Button, InputGroup, Form } from 'react-bootstrap';
import TableLoader from 'components/Loader/TableLoader';
import { Search } from 'components/Icons';
import { Table } from 'components';
import { useDebounce } from 'utils/hooks';
import { getInstansi, instansiDataSelector } from './reducer';
const DEBOUNCE_DELAY = 500;
const bem = bn('instansi');

const Instansi = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const { page, size, loading, records, totalRecords, totalPages } = useSelector(instansiDataSelector);
  const handleAPICall = (params) => {
    return dispatch(getInstansi(params));
  };

  useEffect(() => {
    handleAPICall({ page, q: query });
  }, [query]);
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
      Header: 'Kode Instansi',
      accessor: 'id',
    },
    {
      Header: 'Nama Instansi',
      accessor: 'nama',
    },
    {
      Header: 'Level Instansi',
      accessor: 'level',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ row: { original } }) => {
        const { status = '' } = original;
        return (
          <div
            className={cx(bem.e('status'), {
              [bem.e('draft')]: status === 'DRAFT',
              [bem.e('approved')]: status === 'APPROVED',
              [bem.e('rejected')]: status === 'REJECTED',
              [bem.e('waiting-approval')]: status === 'Waiting Approval',
            })}>
            {status}
          </div>
        );
      },
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ original: data }) => {
        return (
          <div className={bem.e('action')}>
            <Button variant="info" onClick={() => history.push(`/cms/instansi-detail/${data.id}`)}>
              Detail
            </Button>
          </div>
        );
      },
    },
  ];

  const rowClick = (data) => {
    history.push(`/cms/instansi/${data.id}`);
  };
  const handleCreate = (e) => {
    e.preventDefault();
    history.push('/cms/instansi/form');
  };

  const tableConfig = {
    className: 'cms-table-log',
    columns,
    data: records,
    variant: 'link',
    title: '',
    showSearch: false,
    onSearch: () => {},
    totalCount: totalRecords,
    pageCount: totalPages,
    pageSize: size,
    currentPage: page,
    manualPagination: true,
    onRowClick: rowClick,
    onPageIndexChange: (nextPage) => {
      if (nextPage !== page) {
        handleAPICall({ page: nextPage, q: query });
      }
    },
  };

  return (
    <div className="sdp-instansi">
      <div className={bem.e('header-log')}>
        <div className="wrapper-left">
          <h1>Instansi</h1>
          <Button className="" variant="info" style={{ width: '112px' }} onClick={handleCreate}>
            Buat Baru
          </Button>
        </div>
        <div className="wrapper-right">
          <InputGroup>
            <Form.Control variant="normal" type="text" placeholder="Cari Pencarian" onChange={handleUserInputChange} />
            <Search />
          </InputGroup>
        </div>
      </div>
      <div className="px-30 pt-0">
        {loading ? <TableLoader speed={2} width={'100%'} height={550} /> : <Table {...tableConfig} />}
      </div>
    </div>
  );
};

export default Instansi;
