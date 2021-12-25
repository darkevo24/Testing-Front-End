import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as setSearch from 'lodash';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Search } from 'components/Icons';
import { Table } from 'components';
import { bimtekPermintaanDataSelector, bimtekInstansi, getPermintaanData, getInstansi } from './reducer';
import bn from 'utils/bemNames';

const bem = bn('content-table');

const CMSBimtekPermintaan = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [instansiId, setInstansiId] = useState('');

  const { size, page, records, totalRecords } = useSelector(bimtekPermintaanDataSelector);
  const instansiData = useSelector(bimtekInstansi);

  const fetchCmsPerminataanDataset = (params) => {
    let obj = {
      page: params.page,
      q: query,
      instansiId,
    };
    return dispatch(getPermintaanData(obj));
  };
  const fetchInstansi = () => {
    return dispatch(getInstansi());
  };
  const instansi = useMemo(() => instansiData || [], [instansiData]);

  useEffect(() => {
    fetchCmsPerminataanDataset({ page: page || 0 });
  }, [query, instansiId]);

  useEffect(() => {
    fetchInstansi();
  }, []);

  const updateQuery = setSearch.debounce((val) => {
    setQuery(val);
  }, 500);

  const rowClick = (data) => {
    history.push(`/cms/bimtek-permintaan/${data.id}`);
  };

  const columns = [
    {
      Header: 'Nama Peminta',
      accessor: 'namaLengkap',
    },
    {
      Header: 'Instansi',
      accessor: 'namaInstansi',
    },
    {
      Header: 'Tanggal Permintaan',
      accessor: 'tanggalRequest',
      Cell: ({ ...rest }) => (
        <span>
          {rest.row.original?.tanggalRequest ? moment(rest.row.original?.tanggalRequest).format('DD MMMM YYYY') : '---'}
        </span>
      ),
    },
    {
      Header: 'Tanggal Permintaan Disetujui',
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
      Header: 'Status',
      accessor: 'status',
      Cell: ({ ...rest }) => (
        <span className={`status ${rest?.row?.original?.status?.toLowerCase()}`}> {rest?.row?.original?.status} </span>
      ),
    },
    {
      Header: 'Tindakan',
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
    onPageIndexChange: (currentPage) => {
      if (currentPage !== page) {
        fetchCmsPerminataanDataset({ page: currentPage });
      }
    },
  };

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={bem.e('title')}>Permintaan Bimbingan Teknis</div>
        <Row className="justify-content-between">
          <Col xs={2}></Col>
          <Col xs={5} className="d-flex align-items-center">
            <div className="mr-10">Instansi</div>
            <div className="mr-10">
              <Form.Select aria-label="Default select example" onChange={(e) => setInstansiId(e.target.value)}>
                {instansi &&
                  instansi.map((data, index) => {
                    return (
                      <option key={index} value={data.id}>
                        {data.nama}
                      </option>
                    );
                  })}
              </Form.Select>
            </div>
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
      <div className="p-30"> {<Table {...tableConfig} />} </div>
    </div>
  );
};

export default CMSBimtekPermintaan;
