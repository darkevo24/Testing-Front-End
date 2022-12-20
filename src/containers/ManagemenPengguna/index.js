import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Chip from 'components/Chip';
import Table, { FilterSearchInput } from 'components/Table';
import TableLoader from 'components/Loader/TableLoader';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import styled from 'styled-components';
import bn from 'utils/bemNames';
import {
  getUserListData,
  userlistSelector,
  getRoleData,
  rolelistSelector,
  instansiSelector,
  getInstansiData,
} from './reducer';

const bem = bn('content-table');
const Container = styled.div`
  margin: 60px auto;
  width: 70%;
`;

const ManagementPengguna = ({ textSearch }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchQuery, setSearch] = useState('');
  const [filter, setFilter] = useState({ page: 1, size: 10, roles: '', status: '', q: '' });
  const { totalPages, totalRecords, size, page, records } = useSelector(userlistSelector);
  const { roles } = useSelector(rolelistSelector);
  const { nama: namaInstansi } = useSelector(instansiSelector);
  const fetchDataset = (params) => {
    return dispatch(getUserListData({ filter }));
  };

  useEffect(() => {
    fetchDataset({ filter });
  }, [filter]);

  useEffect(() => {
    //only getting data if Role is empty
    if (roles.length === 0) {
      dispatch(getRoleData());
    }
    dispatch(getInstansiData());
  }, []);

  const handleSearch = (value = '') => {
    setSearch(value);
    setFilter({ ...filter, q: value });
  };

  const handleRoleChange = (roles) => {
    let role = '';
    if (roles.label === 'SEMUA') {
      role = '';
    } else {
      role = roles.label;
    }
    setFilter({ ...filter, roles: role });
  };

  const rowClick = (row) => {
    history.push(`/managemen-pengguna/${row.id}`);
  };

  const columns = useMemo(() => {
    const items = [
      {
        Header: 'NIK/NIP',
        accessor: 'employeeIdNumber',
        disableSortBy: true,
      },
      {
        Header: 'Nama',
        accessor: 'name',
        disableSortBy: true,
      },
      {
        Header: 'Unit Kerja',
        accessor: 'unitKerja.nama',
        disableSortBy: true,
      },
      {
        Header: 'Role',
        accessor: 'roles',
        disableSortBy: true,
      },
      {
        Header: 'Creator',
        Cell: ({ row: { original } }) => {
          if (original.createdBy == null) {
            return '-';
          } else {
            return original.createdBy.name;
          }
        },
        disableSortBy: true,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row: { original } }) => {
          if (original.status === 'ACTIVE') {
            return <Chip className="active">Active</Chip>;
          } else if (original.status === 'INACTIVE') {
            return <Chip className="inactive">Inactive</Chip>;
          } else {
            return <Chip>Deleted</Chip>;
          }
        },
        disableSortBy: true,
      },
    ];
    return items;
  }, []);

  const tableConfig = {
    columns,
    data: records,
    title: '',
    hoverPengguna: true,
    showSearch: false,
    onSearch: () => {},
    variant: 'spaced',
    totalCount: totalRecords || null,
    pageCount: totalPages || null,
    pageSize: size,
    currentPage: page - 1,
    manualPagination: true,
    onRowClick: rowClick,
    onPageIndexChange: (currentPage) => {
      if (currentPage + 1 !== page) {
        setFilter({ ...filter, page: currentPage + 1 });
      }
    },
  };

  return (
    <Container>
      <div className={bem.e('section')}>
        <div className={(bem.e('header'), 'mb-32')}>
          <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>
            Manajemen Pengguna <span style={{ color: 'gray' }}> - {namaInstansi}</span>
          </div>
          <div className="d-flex justify-content-between">
            <Button
              style={{ background: '#ED1C24', fontSize: '14px' }}
              className="text-center mr-10"
              onClick={() => history.push('/pengguna-baru')}>
              Tambah Pengguna
            </Button>
            <div className="sdp-left-wrapper d-flex align-items-center justify-content-end">
              <label className="mr-12">Roles</label>
              <SingleDropDown className="wpx-200 mr-16" data={roles} onChange={handleRoleChange} />
              <FilterSearchInput searchPlaceholder="Cari Pengguna" setGlobalFilter={handleSearch} />
            </div>
          </div>
        </div>
        <div className={bem.e('body')}>
          <Table {...tableConfig} />
        </div>
      </div>
    </Container>
  );
};

export default ManagementPengguna;
