import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as setSearch from 'lodash';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'components/Table';
import bn from 'utils/bemNames';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import TableLoader from 'components/Loader/TableLoader';
import { Search } from 'components/Icons';
import { prefixID } from './constant';
import { getStatusClass } from 'utils/helper';
import { getInstansi, getUnitkerja, getPermintaanData, permintaanDataSelector } from './reducer';

const bem = bn('content-table');

const CMSPermintaanData = () => {
  const history = useHistory();
  const [instansiId, setInstansiId] = useState('');
  const [query, setQuery] = useState('');
  const [unitKerjaId, setUnitKerja] = useState('');
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();
  const { size, loading, page, records, totalRecords, instansi, unitKerja } = useSelector(permintaanDataSelector);
  const fetchDataset = (params) => {
    let obj = {
      page: params.page,
      sort_direction: 'DESC',
    };
    if (instansiId) obj['instansiId'] = instansiId;
    if (unitKerjaId) obj['unitKerjaId'] = unitKerjaId;
    if (status) obj['status'] = status;
    if (query) obj['q'] = query;
    return dispatch(getPermintaanData(obj));
  };
  console.log(records);
  const fetchInstansiData = () => {
    return dispatch(getInstansi());
  };

  const fetchUnitKerja = () => {
    return dispatch(getUnitkerja(instansiId));
  };

  useEffect(() => {
    fetchDataset({ page: page || 0 });
    fetchInstansiData();
  }, [query, instansiId, unitKerjaId, status]);

  useEffect(() => {
    fetchUnitKerja();
  }, [instansiId]);

  const updateQuery = setSearch.debounce((val) => {
    setQuery(val);
  }, 500);

  const statusList = [
    {
      id: 1,
      status: 'DRAFT',
    },
    {
      id: 2,
      status: 'TERKIRIM',
    },
    {
      id: 3,
      status: 'DIPROSES',
    },
    {
      id: 4,
      status: 'SELESAI',
    },
    {
      id: 5,
      status: 'DIBATALKAN',
    },
    {
      id: 6,
      status: 'DITOLAK',
    },
  ];

  const rowClick = (data) => {
    history.push(`/cms/permintaan-data/${data.id}`);
  };

  const getRowClass = (data) => {
    if ((data?.status || '').toLowerCase() !== 'ditolak') return '';
    return 'bg-gray';
  };

  const columns = [
    {
      Header: 'Id',
      accessor: 'id',
      Cell: ({ row: { original } }) => <span>{prefixID(original?.id || '')}</span>,
    },
    {
      Header: 'Nama Peminta',
      accessor: 'user.name',
    },
    {
      Header: 'Instansi',
      Cell: ({
        row: {
          original: {
            user: { instansi },
          },
        },
      }) => <span>{instansi?.nama}</span>,
    },
    {
      Header: 'Unit Kerja',
      Cell: ({
        row: {
          original: {
            user: { unitKerja },
          },
        },
      }) => <span>{unitKerja?.nama}</span>,
    },
    {
      Header: 'Deskripsi Data',
      accessor: 'deskripsi',
    },
    {
      Header: 'Target Waktu',
      accessor: 'tanggalTarget',
      Cell: ({ row: { original } }) => (
        <span> {original?.tanggalTarget ? moment(original?.tanggalTarget).format('DD MMMM YYYY') : '---'} </span>
      ),
    },
    {
      Header: 'Jenis Data',
      accessor: 'jenisData',
    },
    {
      Header: 'Tanggal Permintaan',
      accessor: 'tanggalPermintaan?',
      Cell: ({ row: { original } }) => (
        <span> {original?.createdAt ? moment(original?.createdAt).format('DD MMMM YYYY') : '---'} </span>
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
  const listInstansi = (instansi || [])?.map((data) => ({ value: data.id, label: data.nama }));
  const listUnitKerja = (unitKerja || [])?.map((data) => ({ value: data.id, label: data.nama }));
  const listStatus = (statusList || [])?.map((data) => ({ value: data.status, label: data.status }));
  return (
    <div className={bem.e('section cms-permintaan-data')}>
      <div className={bem.e('header')}>
        <div className={bem.e('title pb-20')}>Permintaan Data</div>
        <Row className="justify-content-between">
          <Col className="option" md={8}>
            <Form.Group className="d-flex align-items-center mr-10">
              <Form.Label className="mb-0 pr-10">Instansi</Form.Label>
              <SingleDropDown
                isLoading={loading}
                data={[{ value: '', label: 'All' }, ...listInstansi]}
                onChange={(selected) => setInstansiId(selected.value)}
              />
            </Form.Group>
            <Form.Group className="d-flex align-items-center mr-10">
              <Form.Label className="unit-kerja">Unit Kerja</Form.Label>
              <SingleDropDown
                isLoading={loading}
                data={[{ value: '', label: 'All' }, ...listUnitKerja]}
                onChange={(selected) => setUnitKerja(selected.value)}
              />
            </Form.Group>
            <Form.Group className="d-flex align-items-center mr-10">
              <Form.Label className="mb-0 pr-10">Status</Form.Label>
              <SingleDropDown
                isLoading={loading}
                data={[{ value: '', label: 'All' }, ...listStatus]}
                onChange={(selected) => setStatus(selected.value)}
              />
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
      <div className="px-30 pt-0"> {!loading ? <Table {...tableConfig} /> : <TableLoader />} </div>
    </div>
  );
};

export default CMSPermintaanData;
