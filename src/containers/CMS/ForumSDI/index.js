import React, { useEffect } from 'react';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import Table, { FilterSearchInput } from 'components/Table';
import {
  getCMSForumSDITopik,
  getCMSForumSDIStatus,
  getCMSForumSDIListData,
  cmsForumSDIGetListSelector,
  cmsForumSDIGetStatusSelector,
  cmsForumSDIGetTopikSelector,
} from './reducer';
import TableLoader from 'components/Loader/TableLoader';
import { ComponentAccessibility } from 'components/ComponentAccess';
import { USER_ROLES } from 'utils/constants';

const CMSForumSDI = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { payload, size, loading, page, records, totalRecords, totalPages } = useSelector(cmsForumSDIGetListSelector);
  const { statusResult, statusLoading } = useSelector(cmsForumSDIGetStatusSelector);
  const { topikResult, topikLoading } = useSelector(cmsForumSDIGetTopikSelector);

  const gotoFormPage = () => {
    history.push('/cms/forum-sdi/manage-forum-sdi');
  };

  useEffect(() => {
    dispatch(getCMSForumSDITopik());
    dispatch(getCMSForumSDIStatus());
    handleAPICall({ page: 0, payload: { judul: '', status: '', topik: '' } });
  }, []);

  const redirectToDetail = (data) => {
    history.push(`/cms/forum-sdi-detail/${data.id}`);
  };

  const handleAPICall = (params) => {
    dispatch(getCMSForumSDIListData(params));
  };

  const handleTopikChange = (selected) => {
    handleAPICall({ page: 0, payload: { ...payload, topik: selected?.value || '' } });
  };

  const handleSearch = (value = '') => {
    handleAPICall({ page: 0, payload: { ...payload, judul: value } });
  };

  const handleStatusChange = (selected) => {
    handleAPICall({
      page: 0,
      payload: {
        ...payload,
        status: selected?.value || '',
      },
    });
  };

  const columns = [
    {
      Header: 'Judul Forum',
      accessor: 'judul',
    },
    {
      Header: 'Topik',
      accessor: 'topik',
    },
    {
      Header: 'Author',
      accessor: 'creator',
    },
    {
      Header: 'Tanggal Dibuat',
      accessor: 'tanggalDraft',
      Cell: ({ ...rest }) => {
        return <span>{rest.row.original.tanggalDraft.split(' ')[0]}</span>;
      },
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
    data: records || [],
    title: '',
    totalCount: totalRecords || null,
    pageCount: totalPages || null,
    pageSize: size,
    currentPage: page,
    manualPagination: true,
    showSearch: false,
    onSearch: () => {},
    variant: 'spaced',
    onPageIndexChange: (currentPage) => {
      if (currentPage !== page) {
        handleAPICall({ page: currentPage, payload });
      }
    },
  };

  const topikResultList = (topikResult || []).map((topik) => ({ value: topik.nama, label: topik.nama }));
  const statusResultList = (statusResult || [])?.map((status) => ({ value: status, label: status }));

  return (
    <div className="sdp-cms-forum-sdi-container">
      <label className="fw-bold fs-32 lh-32 p-32">Forum SDI</label>
      <div className="d-flex mx-32">
        <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR, USER_ROLES.CONTENT_CREATOR]}>
          <Button onClick={gotoFormPage} className="bg-info sdp-text-white br-4 border-0">
            + Forum Baru
          </Button>
        </ComponentAccessibility>
        <div className="d-flex flex-grow-1 align-items-center justify-content-end">
          <div className="d-flex align-items-center">
            <label className="mr-12">Topik</label>
            <SingleDropDown
              isLoading={topikLoading}
              data={[{ value: '', label: 'All' }, ...topikResultList]}
              onChange={handleTopikChange}
            />
          </div>
          <div className="d-flex align-items-center ml-16">
            <label className="mr-12">Status</label>
            <SingleDropDown
              isLoading={statusLoading}
              data={[{ value: '', label: 'All' }, ...statusResultList]}
              onChange={handleStatusChange}
            />
          </div>
          <div className="ml-16">
            <FilterSearchInput searchPlaceholder="Cari Forum" setGlobalFilter={handleSearch} />
          </div>
        </div>
      </div>
      <div className="p-32">{loading ? <TableLoader /> : <Table {...tableConfig} />}</div>
    </div>
  );
};

export default CMSForumSDI;
