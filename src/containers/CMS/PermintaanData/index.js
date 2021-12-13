import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPermintaanData, permintaanDataSelector } from './reducer';
import * as _ from 'lodash';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'components/Table';
import cx from 'classnames';
import bn from '../../../utils/bemNames';
import { prefixID } from '../../Perminataan/constant';
import { Search } from '../../../components/Icons';
import { CMSTable } from '../../../components';

const bem = bn('content-table');

const CMSPermintaanData = () => {
  const history = useHistory();
  const [instansiId, setIntansiId] = useState();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { size, loading, page, records, totalRecords, totalPages } = useSelector(permintaanDataSelector);

  const fetchDataset = (params) => {
    let obj = {
      page: params.page,
      q: query,
    };
    return dispatch(getPermintaanData(obj));
  };

  useEffect(() => {
    fetchDataset({ page: page || 0 });
  }, [query]);
  const updateInstansi = (val) => {
    setIntansiId(val);
  };

  const updateQuery = _.debounce((val) => {
    setQuery(val);
  }, 500);

  const columns = [
    {
      Header: 'Id',
      accessor: 'perminataanID',
      Cell: ({ ...rest }) => <span>{prefixID(rest?.row?.original?.id || '')}</span>,
    },
    {
      Header: 'Nama Peminta',
      accessor: 'user.name',
    },
    {
      Header: 'Instansi',
      accessor: 'instansi.nama',
    },
    {
      Header: 'Unit Kerja',
      accessor: 'instansi.unitKerja[0]',
    },
    {
      Header: 'Deskripsi Data',
      accessor: 'deskripsi',
    },
    {
      Header: 'Target Waktu',
      accessor: 'tanggalTarget',
      Cell: ({ ...rest }) => (
        <span>
          {rest.row.original?.tanggalTarget ? moment(rest.row.original.tanggalTarget).format('DD MMMM YYYY') : '---'}
        </span>
      ),
    },
    {
      Header: 'Jenis Data',
      accessor: 'jenisData',
    },
    {
      Header: 'Tanggal Permintaan',
      accessor: 'tanggalPermintaan',
      Cell: ({ ...rest }) => (
        <span> {rest.row.original?.createdAt ? moment(rest.row.original.createdAt).format('DD MMMM YYYY') : '---'} </span>
      ),
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ ...rest }) => (
        <span className={`status ${rest?.row?.original?.status.toLowerCase()}`}> {rest?.row?.original?.status} </span>
      ),
    },
    {
      Header: '',
      accessor: 'button',
      Cell: ({ ...rest }) => <Button variant="info"> Detail </Button>,
    },
  ];

  const rowClick = (data) => {
    // if ((data?.status || '').toLowerCase() === 'ditolak') return;
    history.push(`/cms/permintaan-data/${data.id}`);
  };

  const getRowClass = (data) => {
    if ((data?.status || '').toLowerCase() !== 'ditolak') return '';
    return 'bg-gray';
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
    rowClass: getRowClass,
    onPageIndexChange: (currentPage) => {
      if (currentPage !== page) {
        fetchDataset({ page: currentPage });
      }
    },
  };

  return (
    <div className={bem.e('section cms-permintaan-data')}>
      <div className={bem.e('header')}>
        <div className={bem.e('title pb-20')}>Permintaan Data</div>
        <Row className="justify-content-between">
          <Col className="d-flex align-items-center" md={8}>
            <Form.Group className="d-flex align-items-center mr-10">
              <Form.Label className="mb-0 pr-10">Instansi</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e) => updateInstansi(e.target.value)}>
                <option value="0">Kosong</option>
                <option value="1">Badan Pusat</option>
                <option value="2">Badan Pusat 2</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="d-flex align-items-center mr-10">
              <Form.Label className="unit-kerja">Unit Kerja</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e) => updateInstansi(e.target.value)}>
                <option value="0">Kosong</option>
                <option value="1">Badan Pusat</option>
                <option value="2">Badan Pusat 2</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="d-flex align-items-center mr-10">
              <Form.Label className="mb-0 pr-10">Status</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e) => updateInstansi(e.target.value)}>
                <option value="0">Menunggu Persetujuan</option>
                <option value="1">Badan Pusat</option>
                <option value="2">Badan Pusat 2</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={4} className="d-flex align-items-center">
            <InputGroup>
              <Form.Control
                variant="normal"
                type="text"
                placeholder="Cari Permintaan Data"
                onChange={(e) => updateQuery(e.target.value)}
              />
              <Search />
            </InputGroup>
          </Col>
        </Row>
      </div>
      <div className="p-30"> {!loading && <Table {...tableConfig} />} </div>
    </div>
  );
};

export default CMSPermintaanData;
