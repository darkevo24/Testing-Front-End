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
import { bimtekDokumentasiSelector, getDokumentasi } from './reducer';
import { ReactComponent as Plus } from 'assets/plus.svg';
import TableLoader from 'components/Loader/TableLoader';
import { getStatusClass } from 'utils/helper';
import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-table');

const CMSBimtekPermintaan = () => {
  const [query, setQuery] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, size, page, records, totalRecords } = useSelector(bimtekDokumentasiSelector);
  const updateQuery = setSearch.debounce((val) => {
    setQuery(val);
  }, 500);
  const fetchDokumentasi = (params) => {
    let obj = {
      page: params.page,
      namaBimtek: query,
    };
    return dispatch(getDokumentasi(obj));
  };

  useEffect(() => {
    fetchDokumentasi({ page: 0 });
  }, [query]);
  const columns = [
    {
      Header: 'Nama Bimbingan Teknis',
      accessor: 'namaBimtek',
    },
    {
      Header: 'Tanggal Pelaksanaan',
      accessor: 'tanggalMulaiDisetujui',
      Cell: ({ row: { original } }) => (
        <span>
          {original?.tanggalMulaiDisetujui ? moment(original.tanggalMulaiDisetujui).format('DD MMMM YYYY') : '---'}
        </span>
      ),
    },
    {
      Header: 'Tempat',
      accessor: 'kota',
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
    history.push(`/cms/bimtek-dokumentasi/${data?.dokumentasiId}`);
  };

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
        fetchDokumentasi({ page: currentPage });
      }
    },
  };

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-4')}>Dokumentasi Bimbingan Teknis</div>
        <Row className="justify-content-between">
          <Col xs={3}>
            <Button variant="info" className="text-center" onClick={() => history.push('/cms/bimtek-dokumentasi/baru')}>
              <Plus /> Buat Dokumentasi
            </Button>
          </Col>
          <Col xs={4}>
            <InputGroup>
              <Form.Control
                variant="normal"
                type="text"
                placeholder="Cari Bimbingan Teknis"
                onChange={(e) => updateQuery(e.target.value)}
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
