import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import * as setSearch from 'lodash';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Table } from 'components';
import { Search } from 'components/Icons';
import { useHistory } from 'react-router-dom';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import { bimtekJadwalSelector, getJadwalBimtek } from './reducer';
import { getStatusClass } from 'utils/helper';
import { ReactComponent as Plus } from 'assets/plus.svg';
import TableLoader from 'components/Loader/TableLoader';
import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-table');

const CMSBimtekPermintaan = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const { loading, size, page, records, totalRecords } = useSelector(bimtekJadwalSelector);

  const fetchJadwalBimtek = (params) => {
    let obj = {
      page: params.page,
    };
    if (query) obj['namaBimtek'] = query;
    if (status) obj['status'] = status;
    return dispatch(getJadwalBimtek(obj));
  };

  useEffect(() => {
    fetchJadwalBimtek({ page: 0 });
  }, [query, status]);

  const statusList = [
    {
      id: 1,
      status: 'DRAFT',
    },
    {
      id: 2,
      status: 'PUBLISHED',
    },
    {
      id: 3,
      status: 'UNPUBLISHED',
    },
    {
      id: 4,
      status: 'REJECTED',
    },
    {
      id: 5,
      status: 'DELETED',
    },
    {
      id: 6,
      status: 'WAITING_APPROVAL',
    },
  ];

  const columns = [
    {
      Header: 'Nama Bimbingan',
      accessor: 'namaBimtek',
    },
    {
      Header: 'Tanggal Mulai',
      accessor: 'tanggalMulaiDisetujui',
      Cell: ({ row: { original } }) => (
        <span>
          {original?.tanggalMulaiDisetujui ? moment(original?.tanggalMulaiDisetujui).format('DD MMMM YYYY') : '---'}
        </span>
      ),
    },
    {
      Header: 'Tanggal Berakhir',
      accessor: 'tanggalSelesaiDisetujui',
      Cell: ({ row: { original } }) => (
        <span>
          {original?.tanggalSelesaiDisetujui ? moment(original?.tanggalSelesaiDisetujui).format('DD MMMM YYYY') : '---'}
        </span>
      ),
    },
    {
      Header: 'Tempat',
      accessor: 'tempat',
    },
    {
      Header: 'Pembicara',
      accessor: 'pembicara',
      Cell: ({ row: { original } }) => (
        <span>
          {original.pembicara &&
            original.pembicara.map((data, index) => {
              return <span key={index}>{data?.nama},</span>;
            })}
        </span>
      ),
    },
    {
      Header: 'Materi',
      accessor: 'materi',
      Cell: ({ row: { original } }) => (
        <div>
          {original.materi &&
            original.materi
              .filter((data) => data !== null)
              .map((data, index) => {
                return <span key={index}>{data?.nama},</span>;
              })}
        </div>
      ),
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ row: { original } }) => (
        <span className={getStatusClass(original?.status.toLowerCase() || '').textColor}> {original?.status} </span>
      ),
    },
    {
      Header: '',
      accessor: 'button',
      Cell: ({ ...rest }) => <Button variant="info"> Detail </Button>,
    },
  ];

  const rowClick = (data) => {
    history.push(`/cms/bimtek-jadwal/${data.id}`);
  };

  const updateQuery = setSearch.debounce((val) => {
    setQuery(val);
  }, 500);

  const tableConfig = {
    className: 'cms-permintaan-data',
    columns,
    data: records,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'link',
    totalCount: totalRecords,
    pageSize: size,
    currentPage: page,
    manualPagination: true,
    onRowClick: rowClick,
    onPageIndexChange: (currentPage) => {
      if (currentPage !== page) {
        fetchJadwalBimtek({ page: currentPage });
      }
    },
  };

  const listStatus = statusList.map((data) => ({ value: data.status, label: data.status }));
  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-4')}>Jadwal Bimbingan Teknis</div>
        <Row className="justify-content-between">
          <Col xs={2}>
            <Button variant="info" className="text-center" onClick={() => history.push('/cms/bimtek-jadwal/baru')}>
              <Plus /> Buat Jadwal
            </Button>
          </Col>
          <Col xs={5}>
            <div className="d-flex">
              <SingleDropDown
                className="mr-10 w-100"
                isLoading={loading}
                data={[{ value: '', label: 'All' }, ...listStatus]}
                onChange={(selected) => setStatus(selected.value)}
              />
              <InputGroup>
                <Form.Control
                  onChange={(e) => updateQuery(e.target.value)}
                  variant="normal"
                  type="text"
                  placeholder="Cari Bimbingan Teknis"
                />
                <Search />
              </InputGroup>
            </div>
          </Col>
        </Row>
      </div>
      <div className="px-30"> {!loading ? <Table {...tableConfig} /> : <TableLoader />} </div>
    </div>
  );
};

export default CMSBimtekPermintaan;
