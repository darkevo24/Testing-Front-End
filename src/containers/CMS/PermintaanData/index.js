import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'components/Table';
import bn from 'utils/bemNames';
import { Search } from 'components/Icons';
import { Loader } from 'components';
import { prefixID } from './constant';
import { getInstansi, getUnitkerja, getPermintaanData, permintaanDataSelector } from './reducer';

const bem = bn('content-table');

const CMSPermintaanData = () => {
  const history = useHistory();
  const [instansiId, setIntansiId] = useState('');
  const [query, setQuery] = useState('');
  const [unitKerjaId, setUnitKerja] = useState('');
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();
  const { size, loading, page, records, totalRecords, instansi, unitKerja } = useSelector(permintaanDataSelector);
  const fetchDataset = (params) => {
    let obj = {
      page: params.page,
      unitKerja: unitKerjaId,
      status,
      q: query,
    };
    return dispatch(getPermintaanData(obj));
  };

  const fetchInstansiData = () => {
    return dispatch(getInstansi());
  };

  const fetchUnitKerja = () => {
    return dispatch(getUnitkerja(instansiId));
  };

  useEffect(() => {
    fetchDataset({ page: page || 0 });
    fetchInstansiData();
  }, [query, unitKerjaId, status]);

  useEffect(() => {
    fetchUnitKerja();
  }, [instansiId]);

  const updateQuery = _.debounce((val) => {
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
      Cell: ({ ...rest }) => <span>{prefixID(rest?.row?.original?.id || '')}</span>,
    },
    {
      Header: 'Nama Peminta',
      accessor: 'user?.name',
    },
    {
      Header: 'Instansi',
      accessor: 'instansi?.id',
    },
    {
      Header: 'Unit Kerja',
      accessor: 'instansi?.unitKerja[0]',
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
          {rest.row.original?.tanggalTarget ? moment(rest.row.original?.tanggalTarget).format('DD MMMM YYYY') : '---'}
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
        <span> {rest.row.original?.createdAt ? moment(rest.row.original?.createdAt).format('DD MMMM YYYY') : '---'} </span>
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
          <Col className="option" md={8}>
            <Form.Group className="d-flex align-items-center mr-10">
              <Form.Label className="mb-0 pr-10">Instansi</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e) => setIntansiId(e.target.value)}>
                <option value="">SEMUA</option>
                {instansi &&
                  instansi.map((data, index) => {
                    return (
                      <option key={index} value={data.id}>
                        {data.nama}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="d-flex align-items-center mr-10">
              <Form.Label className="unit-kerja">Unit Kerja</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e) => setUnitKerja(e.target.value)}>
                <option value="">SEMUA</option>
                {unitKerja &&
                  unitKerja.map((data, index) => {
                    return (
                      <option key={index} value={data?.id}>
                        {data?.nama}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="d-flex align-items-center mr-10">
              <Form.Label className="mb-0 pr-10">Status</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                <option value="">SEMUA</option>
                {statusList &&
                  statusList.map((data, index) => {
                    return (
                      <option key={index} value={data.status}>
                        {data.status}
                      </option>
                    );
                  })}
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
      <div className="px-30 pt-0"> {!loading ? <Table {...tableConfig} /> : <Loader fullscreen={true} />} </div>
    </div>
  );
};

export default CMSPermintaanData;
