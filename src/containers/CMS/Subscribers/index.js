import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import { CSVLink } from 'react-csv';
import { Notification } from 'components';
import moment from 'moment';
import { DatePicker } from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Table, { FilterSearchInput } from 'components/Table';
import styled from 'styled-components';
import TableLoader from 'components/Loader/TableLoader';
import bn from 'utils/bemNames';
import { getSubscribersData, subscriberSelector } from './reducer';

const bem = bn('content-table');

const schema = yup
  .object({
    search: yup.string().trim().max(100),
    startDate: yup.string(),
    endDate: yup.string(),
  })
  .required();

const OptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Subscribers = ({ textSearch }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearch] = useState('');
  const [filter, setFilter] = useState({ page: 1, size: 10, startDate: '', endDate: '', email: '' });
  const { loading, records, totalRecords, totalPages, size, page } = useSelector(subscriberSelector);
  const [disable, setDisable] = useState(true);
  const {
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const startDateValue = watch('startDate');
  const endDateValue = watch('endDate');
  const handleAPICall = () => {
    return dispatch(getSubscribersData({ filter }));
  };

  useEffect(() => {
    handleAPICall({ filter });
  }, [filter]);

  useEffect(() => {
    setDisable(!(startDateValue && endDateValue));
  }, [startDateValue, endDateValue]);

  useEffect(() => {
    if (startDateValue && endDateValue) {
      setFilter({
        ...filter,
        startDate: moment(startDateValue).format('YYYY-MM-DD'),
        endDate: moment(endDateValue).format('YYYY-MM-DD'),
      });
    }
    if (startDateValue && !endDateValue) {
      setFilter({
        ...filter,
        startDate: moment(startDateValue).format('YYYY-MM-DD'),
        endDate: moment(Date.now()).format('YYYY-MM-DD'),
      });
    }
    if (!startDateValue && endDateValue) {
      setFilter({
        ...filter,
        startDate: moment(Date.now()).format('YYYY-MM-DD'),
        endDate: moment(endDateValue).format('YYYY-MM-DD'),
      });
    }
  }, [startDateValue, endDateValue]);

  const handleSearch = (value = '') => {
    setSearch(value);
    setFilter({
      ...filter,
      email: value,
    });
  };

  const columns = useMemo(() => {
    const items = [
      {
        Header: 'No',
        //count number of data
        Cell: ({ row }) => {
          return row.index + 1 + (filter.page - 1) * filter.size;
        },
      },
      {
        Header: 'Alamat Email',
        accessor: 'email',
      },
      {
        Header: 'Tanggal Berlangganan',
        accessor: 'dateAdded',
      },
    ];
    return items;
  }, [page]);

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
        setFilter({ ...filter, page: currentPage + 1 });
      }
    },
  };

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-3')}>Subscribers</div>
        <OptionWrapper>
          <CSVLink
            id="download"
            data={records}
            filename="subscribers.csv"
            disabled={disable}
            className="btn btn-info"
            style={{ width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            target="_blank">
            Download
          </CSVLink>
          <div className="sdp-left-wrapper d-flex align-items-center">
            <div className="d-flex mr-7">
              <DatePicker
                placeholderText="From"
                className="mr-7 "
                name="startDate"
                control={control}
                rules={{ required: false }}
                error={errors.startDate?.message}
              />
              <DatePicker
                placeholderText="To"
                name="endDate"
                control={control}
                rules={{ required: false }}
                error={errors.endDate?.message}
                min={startDateValue}
              />
            </div>
            <FilterSearchInput searchPlaceholder="Cari Alamat Email" setGlobalFilter={handleSearch} />
          </div>
        </OptionWrapper>
      </div>
      <div className={bem.e('body')}>
        {loading ? <TableLoader speed={2} width={'100%'} height={550} /> : <Table {...tableConfig} />}
      </div>
    </div>
  );
};

export default Subscribers;
