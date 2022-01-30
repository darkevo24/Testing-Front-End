import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'components/Table';
import bn from 'utils/bemNames';
import { Loader } from 'components';
import { Search } from 'components/Icons';
import {
  getPenggunaData,
  getPenggunaRoleList,
  getPenggunaStatusList,
  getInstansiData,
  penggunaDataSelector,
  penggunaRoleDataSelector,
  penggunaStatusDataSelector,
  instansiDataSelector,
} from './reducer';

const bem = bn('content-table');

const CMSPenggunaManagement = () => {
  const history = useHistory();
  const [instansiId, setIntansiId] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [roles, setRoles] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPenggunaRoleList());
    dispatch(getPenggunaStatusList());
    dispatch(getInstansiData());
  }, []);

  const { records: penggunaDataset, totalRecords, page, size, loading } = useSelector(penggunaDataSelector);
  const { records: penggunaRoleData } = useSelector(penggunaRoleDataSelector);
  const { records: penggunaStatusData } = useSelector(penggunaStatusDataSelector);
  const { records: penggunaInstansiData } = useSelector(instansiDataSelector);

  const fetchDataset = (params) => {
    const obj = {
      page: params.page,
      roles,
      instansiId,
      status,
      q: query,
    };
    return dispatch(getPenggunaData(obj));
  };

  useEffect(() => {
    fetchDataset({ page: page || 0 });
  }, [query, instansiId, roles, status]);

  const updateQuery = debounce((val) => {
    setQuery(val);
  }, 500);

  const viewDetail = (id) => {
    history.push(`/cms/pengguna-management/${id}`);
  };

  const getRowClass = (data) => {
    if ((data?.status || '').toLowerCase() !== 'ditolak') return '';
    return 'bg-gray';
  };

  const columns = [
    {
      Header: 'NIK/NIP',
      accessor: 'employeeIdNumber',
    },
    {
      Header: 'Nama',
      accessor: 'name',
    },
    {
      Header: 'Instansi',
      accessor: 'instansi.nama',
    },
    {
      Header: 'Unit Kerja',
      accessor: 'unitKerja.nama',
    },
    {
      Header: 'Role',
      accessor: 'roles',
    },
    {
      Header: 'Creator',
      accessor: 'createdBy.name',
    },
    {
      Header: 'Approver',
      accessor: 'approvedBy.name',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({
        row: {
          original: { status = '' },
        },
      }) => <span className={`status ${status.toLowerCase()}`}> {status}</span>,
    },
    {
      Header: '',
      accessor: 'button',
      Cell: ({ row }) => (
        <Button variant="info" onClick={() => viewDetail(row?.original?.id)}>
          Detail
        </Button>
      ),
    },
  ];

  const tableConfig = {
    className: 'cms-permintaan-data',
    columns,
    data: penggunaDataset,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'link',
    totalCount: totalRecords,
    pageSize: size,
    currentPage: page,
    manualPagination: true,
    rowClass: getRowClass,
    onPageIndexChange: (currentPage) => {
      if (currentPage !== page) {
        fetchDataset({ page: currentPage });
      }
    },
  };

  return (
    <div className={bem.b()}>
      <div className={bem.e('section cms-permintaan-data')}>
        <div className={bem.e('header')}>
          <div className={bem.e('title pb-20')}>Pengguna</div>
          <Row className="justify-content-between">
            <Col xs={3} className="d-flex align-items-center">
              <InputGroup>
                <Button className="br-4" variant="info" onClick={() => history.push('/cms/pengguna-management/add')}>
                  Tambah Pengguna
                </Button>
              </InputGroup>
              <InputGroup>
                <Button variant="outline-secondary" className="br-6 hpx-35">
                  Upload
                </Button>
              </InputGroup>
            </Col>
            <Col className="option position-relative" md={5}>
              <Form.Group className="d-flex align-items-center mr-10">
                <Form.Label className="mb-0 pr-10">Role</Form.Label>
                <Form.Select onChange={(e) => setRoles(e.target.value)}>
                  <option value="">SEMUA</option>
                  {penggunaRoleData.map((role, key) => (
                    <option key={key} value={role}>
                      {role}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="d-flex align-items-center mr-10">
                <Form.Label className="unit-kerja">Instansi</Form.Label>
                <Form.Select onChange={(e) => setIntansiId(e.target.value)}>
                  <option value="">SEMUA</option>
                  {penggunaInstansiData &&
                    penggunaInstansiData.map((data, index) => (
                      <option key={index} value={data?.id}>
                        {data?.nama}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="d-flex align-items-center mr-10">
                <Form.Label className="mb-0 pr-10">Status</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                  <option value="">SEMUA</option>
                  {penggunaStatusData &&
                    penggunaStatusData?.map((status, index) => {
                      return (
                        <option key={index} value={status}>
                          {status}
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
                  onChange={(e) => updateQuery(e.target.value)}
                  placeholder="Cari Permintaan Data"
                />
                <Search />
              </InputGroup>
            </Col>
          </Row>
        </div>
        <div className="px-30 pt-0"> {!loading ? <Table {...tableConfig} /> : <Loader fullscreen={true} />} </div>
      </div>
    </div>
  );
};

export default CMSPenggunaManagement;
