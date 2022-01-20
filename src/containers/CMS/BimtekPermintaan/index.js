import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as setSearch from 'lodash';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Table } from 'components';
import { Search } from 'components/Icons';
import { getStatusClass } from 'utils/helper';
import bn from 'utils/bemNames';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import { bimtekPermintaanDataSelector, bimtekInstansi, getPermintaanData, getInstansi } from './reducer';

const bem = bn('content-table');

const CMSBimtekPermintaan = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [instansiId, setInstansiId] = useState('');

  const { size, page, records, totalRecords } = useSelector(bimtekPermintaanDataSelector);
  const { loading, recordsInstansi } = useSelector(bimtekInstansi);

  const fetchCmsPerminataanDataset = (params) => {
    let obj = {
      page: params.page,
    };
    if (query) obj['namaBimtek'] = query;
    if (instansiId) obj['instansi'] = instansiId;
    return dispatch(getPermintaanData(obj));
  };

  const fetchInstansi = () => {
    return dispatch(getInstansi());
  };

  const listInstansi = (recordsInstansi || [])?.map((data) => ({ value: data.id, label: data.nama }));

  useEffect(() => {
    fetchCmsPerminataanDataset({ page: 0 });
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
      Cell: ({ row: { original } }) => (
        <span> {original?.tanggalRequest ? moment(original?.tanggalRequest).format('DD MMMM YYYY') : '---'} </span>
      ),
    },
    {
      Header: 'Tanggal Permintaan Disetujui',
      accessor: 'tanggalSelesaiDisetujui',
      Cell: ({ row: { original } }) => (
        <span>
          {original?.tanggalSelesaiDisetujui ? moment(original?.tanggalSelesaiDisetujui).format('DD MMMM YYYY') : '---'}
        </span>
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
      Header: 'Tindakan',
      accessor: 'button',
      Cell: ({ ...rest }) => <Button variant="info"> Detail </Button>,
    },
  ];
  const tableConfig = {
    className: 'cms-permintaan-data',
    columns,
    data: records || [],
    title: '',
    totalCount: totalRecords || null,
    pageSize: size,
    currentPage: page,
    manualPagination: true,
    showSearch: false,
    onSearch: () => {},
    onRowClick: rowClick,
    variant: 'spaced',
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
        <Row className="justify-content-end">
          <Col xs={6} className="d-flex align-items-center">
            <div className="mr-10">Instansi</div>
            <div className="mr-10 w-100">
              <SingleDropDown
                className="mr-10 w-100"
                isLoading={loading}
                data={[{ value: '', label: 'All' }, ...listInstansi]}
                onChange={(selected) => setInstansiId(selected.value)}
              />
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
