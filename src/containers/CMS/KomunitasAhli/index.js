import React, { useState } from 'react';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';
import Table, { FilterSearchInput } from 'components/Table';
import SingleDropDown from 'components/DropDown/SingleDropDown';

const DROPDOWN_LIST = [
  {
    value: 'All',
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
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState(DROPDOWN_LIST[0]);
  const history = useHistory();
  const redirectToDetail = (data) => {
    console.log(data);
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
    data: [
      {
        kode_ahli: '001',
        name_ahli: 'Davis Geidt',
        keahlian: 'Komputer dan Jaringan',
        level: 'Pusat',
        penyelenggara: 'Wali Data',
        status: 'Approved',
      },
      {
        kode_ahli: '002',
        name_ahli: 'Erin Dias',
        keahlian: 'Matematika dan Statistik',
        level: 'Pusat',
        penyelenggara: 'Wali Data',
        status: 'Rejected',
      },
    ],
    title: '',
    search: true,
    searchPlaceholder: 'Cari...',
    searchButtonText: 'Search',
    showSearch: false,
    onSearch: () => {},
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
          <SingleDropDown data={DROPDOWN_LIST} defaultData={status} onChange={(data) => setStatus(data)} />
          <FilterSearchInput
            searchPlaceholder="Cari..."
            globalFilter={searchText}
            setGlobalFilter={(value) => setSearchText(value)}
          />
        </div>
      </div>
      <div className="p-32">
        <Table {...tableConfig} />
      </div>
    </div>
  );
};

export default KomunitasAhli;
