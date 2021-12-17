import React, { useEffect } from 'react';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table, { FilterSearchInput } from 'components/Table';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import { getCMSKomunitasAhliData, cmsKomunitasAhliDatasetSelector } from './reducer';
import TableLoader from 'components/Loader/TableLoader';

const DROPDOWN_LIST = [
  {
    value: '',
    label: 'All',
  },
  {
    value: 'DRAFT',
    label: 'Draft',
  },
  {
    value: 'MENUNGGU_PERSETUJUAN',
    label: 'Menunggu Persetujuan',
  },
  {
    value: 'DISETUJUI',
    label: 'Disetujui',
  },
  {
    value: 'DITAYANGKAN',
    label: 'Ditayangkan',
  },
  {
    value: 'TIDAK_DITAYANGKAN',
    label: 'Tidak Ditayangkan',
  },
  {
    value: 'DIBATALKAN',
    label: 'Dibatalkan',
  },
  {
    value: 'DITOLAK',
    label: 'Ditolak',
  },
  {
    value: 'DIARSIPKAN',
    label: 'Diarsipkan',
  },
];

const KomunitasAhli = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { q, status, size, loading, page, records, totalRecords, totalPages } = useSelector(cmsKomunitasAhliDatasetSelector);

  useEffect(() => {
    handleAPICall({ page: 0, q: '', status: '' });
  }, []);

  const redirectToDetail = (data) => {
    history.push(`/cms/komunitas-ahli-detail/${data.id}`);
  };

  const handleAPICall = (params) => {
    dispatch(getCMSKomunitasAhliData(params));
  };

  const handleSearch = (value = '') => {
    handleAPICall({ page: 0, q: value.trim(), status });
  };

  const handleStatusChange = (selected) => {
    handleAPICall({ page: 0, q, status: selected.value });
  };

  const columns = [
    {
      Header: 'Kode Ahli',
      accessor: 'kode',
    },
    {
      Header: 'Nama Ahli',
      accessor: 'nama',
    },
    {
      Header: 'Keahlian',
      accessor: 'bidangKeahlian',
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
    pageCount: totalPages || null,
    pageSize: size,
    currentPage: page,
    manualPagination: true,
    onPageIndexChange: (currentPage) => {
      if (currentPage !== page) {
        handleAPICall({ page: currentPage, q, status });
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
          <label className="mr-12">Status</label>
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
