import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Search } from 'components/Icons';
import { CMSTable, CMSModal } from 'components';
import Table, { FilterSearchInput } from 'components/Table';
import { ComponentAccessibility } from 'components/ComponentAccess';
import TableLoader from 'components/Loader/TableLoader';
import SingleDropDown from 'components/DropDown/SingleDropDown';

import { ReactComponent as Plus } from 'assets/plus.svg';
import bn from 'utils/bemNames';
import { formatDate } from 'utils/helper';
import { STATUS_DATA_BERITA } from 'utils/constants';
import { USER_ROLES } from 'utils/constants';
import { getListBerita, beritaCmsListSelector, setPreviewBerita, setStatusBerita } from '../BeritaBaru/reducer';

const bem = bn('content-table');
const DROPDOWN_LIST = [
  {
    value: -1,
    label: 'All',
  },
  {
    value: 0,
    label: 'Draft',
  },
  {
    value: 2,
    label: 'Menunggu Persetujuan',
  },
  {
    value: 3,
    label: 'Disetujui',
  },
  {
    value: 5,
    label: 'Ditayangkan',
  },
  {
    value: 6,
    label: 'Tidak Ditayangkan',
  },
  {
    value: 4,
    label: 'Ditolak',
  },
  {
    value: 8,
    label: 'Diarsipkan',
  },
];

const CMSBerita = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [modalConfirm, setModalConfirm] = useState(false);
  const [multiApprove, setMultiApprove] = useState(false);
  const [selectApprove, setSelectApprove] = useState([]);
  const [searchQuery, setSearch] = useState('');
  const { loading, totalPages, totalRecords, size, page, records } = useSelector(beritaCmsListSelector);
  const fetchData = (params) => {
    return dispatch(getListBerita(params));
  };

  useEffect(() => {
    fetchData({
      page: 1,
      judul: searchQuery,
    });
  }, []);

  const redirectToDetail = (data) => {
    history.push(`/cms/berita-detail/${data.id}`);
  };

  const handleSearch = (value = '') => {
    setSearch(value);
    fetchData({ page: 1, judul: value });
  };

  const handleCheckboxChange = (item) => {
    let array = [...selectApprove];
    if (selectApprove.includes(item.id)) {
      // remove
      array = array.filter((x) => x !== item.id);
    } else {
      // add
      array.push(item.id);
    }

    setSelectApprove(array);
  };

  const handleSelectAll = () => {
    let currentArr = [...selectApprove];
    const newArr = records.filter((x) => x.status === 2).map((item) => item.id);
    if (currentArr.some((x) => newArr.includes(x))) {
      // remove
      currentArr = currentArr.filter((x) => !newArr.includes(x));
    } else {
      // add
      currentArr = currentArr.concat(newArr);
    }

    setSelectApprove(currentArr);
  };

  const handleApproveAll = () => {
    if (selectApprove.length === 0) {
      return;
    }

    setModalConfirm(false);
    dispatch(
      setStatusBerita({
        payload: { id: selectApprove, status: 3, note: '' },
      }),
    ).then(() => fetchData({ page: 1, judul: searchQuery }));
  };

  const handleStatusChange = (status) => {
    // console.log('masok', status.value);
    fetchData({ page: 1, judul: searchQuery });
  };

  const columns = useMemo(() => {
    const items = [
      {
        Header: 'Judul Berita',
        accessor: 'judul',
      },
      {
        Header: 'Tanggal Publish',
        accessor: 'publishDate',
        Cell: ({ ...rest }) => formatDate(rest.row.original.publishDate),
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ ...rest }) => {
          return (
            <span className={cx('sdp-log__status', STATUS_DATA_BERITA[rest.row.original.status].toLowerCase())}>
              {STATUS_DATA_BERITA[rest.row.original.status]}
            </span>
          );
        },
      },
      {
        Header: 'Author',
        accessor: 'createBy',
      },
      {
        Header: 'Editor',
        accessor: 'editorBy',
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
    if (multiApprove) {
      items.unshift({
        id: 'checkbox',
        action: handleCheckboxChange,
        isChecked: (row) => selectApprove.includes(row.id) && row.status === 2,
        isDisabled: (row) => row.status !== 2,
        label: '',
        Cell: Table.CheckBox,
      });
    }
    return items;
  }, [multiApprove, selectApprove]);
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
    currentPage: page - 1,
    manualPagination: true,
    onPageIndexChange: (currentPage) => {
      if (currentPage + 1 !== page) {
        fetchData({ page: currentPage + 1, judul: searchQuery });
      }
    },
  };

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-3')}>Berita</div>
        <div className="d-flex justify-content-between">
          <Button
            variant="info"
            className="text-center"
            onClick={() => dispatch(setPreviewBerita({})).then(() => history.push('/cms/berita-form'))}>
            <Plus /> Buat Berita
          </Button>
          <div className="sdp-left-wrapper d-flex align-items-center justify-content-end">
            <label className="mr-12">Status</label>
            <SingleDropDown className="wpx-200 mr-16" data={DROPDOWN_LIST} onChange={handleStatusChange} />
            <ComponentAccessibility roles={[USER_ROLES.CONTENT_EDITOR]}>
              {multiApprove ? (
                <>
                  <Button onClick={() => setMultiApprove(false)} className="mr-16 wpx-90" variant="secondary">
                    Done
                  </Button>
                  <Button
                    onClick={handleSelectAll}
                    className="mr-16 wpx-90 bg-white sdp-text-grey-dark border-gray-stroke"
                    variant="light">
                    Select All
                  </Button>
                  <Button variant="success" className="mr-16" onClick={() => setModalConfirm(true)}>
                    Approve
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setMultiApprove(true)}
                  className="mr-16 wpx-90 bg-white sdp-text-grey-dark border-gray-stroke"
                  variant="light">
                  Select
                </Button>
              )}
            </ComponentAccessibility>
            <FilterSearchInput searchPlaceholder="Cari Berita" setGlobalFilter={handleSearch} />
          </div>
        </div>
      </div>
      <div className={bem.e('body')}>
        {loading ? <TableLoader speed={2} width={'100%'} height={550} /> : <Table {...tableConfig} />}
      </div>
      {modalConfirm ? (
        <CMSModal
          loader={false}
          onClose={() => setModalConfirm(false)}
          confirmButtonAction={handleApproveAll}
          label={
            <span>
              Apakah anda yakin ingin <b className="sdp-text-blue">menyetujui</b> Berita?
            </span>
          }
        />
      ) : null}
    </div>
  );
};

export default CMSBerita;
