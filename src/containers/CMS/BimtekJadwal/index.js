import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import * as setSearch from 'lodash';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Search } from 'components/Icons';
import { Table } from 'components';
import { useHistory } from 'react-router-dom';
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
  const { loading, size, page, records, totalRecords } = useSelector(bimtekJadwalSelector);
  const fetchJadwalBimtek = (params) => {
    let obj = {
      page: params.page,
      namaBimtek: query,
    };
    return dispatch(getJadwalBimtek(obj));
  };

  useEffect(() => {
    fetchJadwalBimtek({ page: 0 });
  }, [query]);

  console.log(records);
  const columns = [
    {
      Header: 'Nama Bimbingan',
      accessor: 'namaBimtek',
    },
    {
      Header: 'Tanggal Mulai',
      accessor: 'tanggalMulaiDisetujui',
      Cell: ({ ...rest }) => (
        <span>
          {rest.row.original?.tanggalMulaiDisetujui
            ? moment(rest.row.original?.tanggalMulaiDisetujui).format('DD MMMM YYYY')
            : '---'}
        </span>
      ),
    },
    {
      Header: 'Tanggal Berakhir',
      accessor: 'tanggalSelesaiDisetujui',
      Cell: ({ ...rest }) => (
        <span>
          {rest.row.original?.tanggalSelesaiDisetujui
            ? moment(rest.row.original?.tanggalSelesaiDisetujui).format('DD MMMM YYYY')
            : '---'}
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
      Cell: ({ ...rest }) => (
        <span>
          {rest.row.original?.pembicara?.map((data, index) => {
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
          {original?.materi
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

  const getRowClass = (data) => {
    // if ((data?.status || '').toLowerCase() !== 'ditolak') return '';
    // return 'bg-gray';
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
    rowClass: getRowClass,
    onPageIndexChange: (currentPage) => {
      if (currentPage !== page) {
        fetchJadwalBimtek({ page: currentPage });
      }
    },
  };

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
          <Col xs={4}>
            <InputGroup>
              <Form.Control
                onChange={(e) => updateQuery(e.target.value)}
                variant="normal"
                type="text"
                placeholder="Cari Bimbingan Teknis"
              />
              <Search />
            </InputGroup>
          </Col>
        </Row>
      </div>
      <div className="px-30"> {!loading ? <Table {...tableConfig} /> : <TableLoader />} </div>
    </div>
  );
};

export default CMSBimtekPermintaan;
