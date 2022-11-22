import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';

import Button from 'react-bootstrap/Button';
import { CMSModal } from 'components';
import moment from 'moment';
import { DatePicker } from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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

const schema = yup
  .object({
    search: yup.string().trim().max(100),
    startDate: yup.string(),
    endDate: yup.string(),
  })
  .required();

const Subscribers = ({ textSearch }) => {
  const dispatch = useDispatch();
  const [modalConfirm, setModalConfirm] = useState(false);
  const [multiApprove, setMultiApprove] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectApprove, setSelectApprove] = useState([]);
  const [searchQuery, setSearch] = useState('');
  const [sortBy, setSortBy] = useState({ id: 0, sortId: 0, desc: false });
  const [filter, setFilter] = useState({ page: 1, size: 10, sortBy: 0, sortDirection: 'ASC', judul: '', status: '' });
  const { loading, totalPages, totalRecords, size, page, records } = useSelector(beritaCmsListSelector);

  // const fetchData = (params) => {
  //   return dispatch(getListBerita(params));
  // };

  useEffect(() => {
    // fetchData({ filter });

    console.log('fetchData', filter);
  }, [filter]);

  const handleSearch = (value = '') => {
    setSearch(value);
    setFilter({ ...filter, judul: value });
  };

  const handleCheckboxChange = (data) => {
    let selected = [...selectApprove];
    if (selectApprove.includes(data.id)) {
      // remove selection
      selected = selected.filter((item) => item !== data.id);
    } else {
      // add into selection
      selected.push(data.id);
    }

    setSelectApprove(selected);
  };

  const handleSelectAll = () => {
    let currentArr = [...selectApprove];
    const newArr = records.filter((item) => item.status === 2).map((item) => item.id);
    if (currentArr.some((x) => newArr.includes(x))) {
      // remove
      currentArr = currentArr.filter((item) => !newArr.includes(item));
    } else {
      // add
      currentArr = currentArr.concat(newArr);
    }

    setSelectApprove(currentArr);
  };

  const handleApproveAll = () => {
    if (!selectApprove.length) {
      dispatch(
        setStatusBerita({
          payload: { id: selectApprove, status: 3, note: '' },
        }),
      ).then(() => setFilter({ ...filter }));
    }

    setModalConfirm(false);
  };

  const {
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const startDateValue = watch('startDate');
  const endDateValue = watch('endDate');

  const columns = useMemo(() => {
    const items = [
      {
        Header: 'No',
        accessor: 'id',
        disableSortBy: true,
      },
      {
        Header: 'Alamat Email',
        accessor: 'email',
        sortId: 0,
      },
      {
        Header: 'Tanggal Berlangganan',
        accessor: 'startDate',
        sortId: 1,
        // Cell: ({ cell }) => formatDate(cell.row.original.publishDate),
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

  const onSortChange = ({ id, sortId, isSortedDesc }) => {
    const desc = isSortedDesc === undefined ? false : !isSortedDesc;
    setFilter({ ...filter, sortBy: sortId, sortDirection: desc ? 'DESC' : 'ASC' });
    setSortBy({ id, sortId, desc });
  };

  const dummyData = [
    {
      id: 1,
      email: 'email@gmai.com',
      startDate: '2022-10-27',
      endDate: '2022-10-28',
    },
    {
      id: 2,
      email: 'ee@gmail.com',
      startDate: '2022-10-27',
      endDate: '2022-10-28',
    },
  ];

  const handleModalOpen = (e, actionType) => {
    e.preventDefault();
    setModal(true);
  };

  const tableConfig = {
    columns,
    // data: records,
    data: dummyData,
    title: '',
    sortBy,
    onSortChange,
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
        setFilter({ ...dummyData, page: currentPage + 1 });
      }
    },
  };

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-3')}>Berita</div>
        <div className="d-flex justify-content-between h-50">
          <Button className="" variant="info" onClick={(e) => handleModalOpen}>
            Download
          </Button>
          <div className="sdp-left-wrapper d-flex align-items-center justify-content-end">
            <div className="date">
              <p>Awal</p>
              <DatePicker
                className="cms-log-activity"
                name="startDate"
                control={control}
                rules={{ required: false }}
                error={errors.startDate?.message}
                arrow={true}
                max={moment().subtract(1, 'days').format('YYYY-MM-DD')}
              />
            </div>
            <div className="date">
              <p>Akhir</p>
              <DatePicker
                className="cms-log-activity"
                name="endDate"
                control={control}
                rules={{ required: false }}
                error={errors.endDate?.message}
                arrow={true}
                min={startDateValue}
                max={moment().subtract(1, 'days').format('YYYY-MM-DD')}
              />
            </div>
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

export default Subscribers;
