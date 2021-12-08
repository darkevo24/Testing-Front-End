import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table, { FilterSearchInput } from 'components/Table';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import { getCMSKomunitasAhliData, cmsKomunitasAhliDatasetSelector } from './reducer';
import { perminataanDatasetSelector } from 'containers/Perminataan/reducer';
import TableLoader from 'components/Loader/TableLoader';

const DROPDOWN_LIST = [
  {
    value: '',
    label: 'All',
  },
  {
    value: 'Approved',
    label: 'Approved',
  },
  {
    value: 'Rejected',
    label: 'Rejected',
  },
];

const KomunitasAhli = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { q, status, error, size, loading, page, records, totalRecords } = useSelector(cmsKomunitasAhliDatasetSelector);

  useEffect(() => {
    handleAPICall({ page: 0, q: '', status: '' });
  }, []);

  const redirectToDetail = (data) => {
    console.log(data);
  };

  const handleAPICall = (params) => {
    dispatch(getCMSKomunitasAhliData(params));
  };

  const handleSearch = (value = '') => {
    handleAPICall({ page: 0, q: value.trim(), status });
  };

  const handleStatusChange = ({ selected: { value = '' } }) => {
    handleAPICall({ page: 0, q: value.trim(), status: value });
  };

  const columns = [
    {
      Header: 'Kode Ahli',
      accessor: 'kode_ahli',
    },
    {
      Header: 'Nama Ahli',
      accessor: 'name_ahli',
    },
    {
      Header: 'Keahlian',
      accessor: 'keahlian',
    },
    {
      Header: 'Level',
      accessor: 'level',
    },
    {
      Header: 'Penyelenggara',
      accessor: 'penyelenggara',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ ...rest }) => {
        return (
          <span
            className={cx({
              'sdp-text-blue': rest.row.original.status === 'Approved',
              'sdp-text-red': rest.row.original.status === 'Rejected',
            })}>
            {rest.row.original.status}
          </span>
        );
      },
    },
    {
      id: 'actions',
      actions: [
        {
          type: 'detail',
          title: 'Detail',
          classes: 'bg-info sdp-text-white mx-32 br-4 py-8 px-15 border-0',
          callback: redirectToDetail,
        },
      ],
      Cell: Table.Actions,
    },
  ];
  const tableConfig = {
    columns,
    data: records,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'spaced',
    totalCount: totalRecords || null,
    pageSize: size,
    currentPage: page,
    manualPagination: true,
    onPageIndexChange: (currentPage) => {
      if (currentPage !== page) {
        handleAPICall({});
      }
    },
  };
  return (
    <div className="sdp-komunitas-container">
      <label className="fw-bold fs-32 lh-32 p-32">Komunitas Ahli</label>
      <div className="d-flex mx-32 justify-content-between">
        <button
          className="bg-info sdp-text-white  br-4 py-13 px-16 border-0"
          onClick={() => history.push('/cms/manage-komunitas-ahli')}>
          + Ahli Baru
        </button>
        <div className="sdp-left-wrapper d-flex align-items-center">
          <lable className="mr-12">Status</lable>
          <SingleDropDown data={DROPDOWN_LIST} defaultData={status} onChange={handleStatusChange} />
          <FilterSearchInput searchPlaceholder="Cari..." globalFilter={q} setGlobalFilter={handleSearch} />
        </div>
      </div>
      <div className="p-32">
        {loading ? <TableLoader speed={2} width={'100%'} height={550} /> : <Table {...tableConfig} />}
      </div>
    </div>
  );
};

export default KomunitasAhli;
