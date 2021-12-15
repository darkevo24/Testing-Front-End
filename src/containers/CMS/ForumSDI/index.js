import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import Table, { FilterSearchInput } from 'components/Table';
import { getCMSForumSDIData, cmsForumSdiGetListSelector } from './reducer';

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

const CMSForumSDI = () => {
  const [status, setStatus] = useState(DROPDOWN_LIST[0]);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const { result, loading } = useSelector(cmsForumSdiGetListSelector);

  useEffect(() => {
    dispatch(getCMSForumSDIData());
  }, []);
  const redirectToDetail = (data) => {
    console.log(data);
  };
  const getData = () => {
    let data = [
      {
        judul_forum: '001',
        topik: 'Komputer dan Jaringan',
        author: 'Davis Geidt',
        tanggaldibuat: '21-2-2020',
        status: 'Published',
      },
      {
        judul_forum: '002',
        topik: 'Matematika dan Statistik',
        author: 'Erin Dias',
        tanggaldibuat: '3-8-2021',
        status: 'Archived',
      },
    ];
    if (searchText) data = data.filter((item) => item.topik.toLowerCase().includes(searchText.toLowerCase()));
    if (status.value === 'All') return data;
    return data.filter((item) => item.status === status.value);
  };

  const columns = [
    {
      Header: 'Judul Forum',
      accessor: 'judul_forum',
    },
    {
      Header: 'Topik',
      accessor: 'topik',
    },
    {
      Header: 'Author',
      accessor: 'author',
    },
    {
      Header: 'Tanggal Dibuat',
      accessor: 'tanggaldibuat',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ ...rest }) => {
        return (
          <span
            className={cx({
              'sdp-text-blue': rest.row.original.status === 'Published',
              'sdp-text-disable': rest.row.original.status === 'Archived',
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
    data: getData(),
    title: '',
    search: true,
    searchPlaceholder: 'Cari Forum',
    searchButtonText: 'Search',
    showSearch: false,
    onSearch: () => {},
    variant: 'spaced',
  };
  return (
    <>
      <label className="fw-bold fs-32 lh-32 p-32">Forum SDI</label>
      <div className="d-flex mx-32">
        <button className="bg-info sdp-text-white br-4 border-0">+ Forum Baru</button>
        <div className="d-flex flex-grow-1 align-items-center justify-content-end">
          <div className="d-flex align-items-center">
            <lable className="mr-12">Topik</lable>
            <SingleDropDown data={DROPDOWN_LIST} defaultData={status} onChange={(data) => setStatus(data)} />
          </div>
          <div className="d-flex align-items-center ml-16">
            <lable className="mr-12">Status</lable>
            <SingleDropDown data={DROPDOWN_LIST} defaultData={status} onChange={(data) => setStatus(data)} />
          </div>
          <div className="ml-16">
            <FilterSearchInput searchPlaceholder="Cari Forum" setGlobalFilter={(value) => setSearchText(value)} />
          </div>
        </div>
      </div>
      <div className="p-32">
        <Table {...tableConfig} />
      </div>
    </>
  );
};

export default CMSForumSDI;
