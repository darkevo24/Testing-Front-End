import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import truncate from 'lodash/truncate';
import { ReadOnlyInputs, Popover, Loader } from 'components';
import LogoBappenas from 'assets/Logo_Bappenas_Indonesia.png';
import Table, { FilterSearchInput } from 'components/Table';
import { cmsInstansiByIDSelector, getInstansiListById } from './reducer';

const DetailInstansi = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { q, loading, error, records, page } = useSelector(cmsInstansiByIDSelector);
  const { records: data = [], totalRecords, size, instansi, groupOutputUrl } = records;

  useEffect(() => {
    dispatch(getInstansiListById({ id, page: 0, q: '' }));
  }, []);

  const handleSearch = (value = '') => {
    dispatch(getInstansiListById({ id: id, q: value.trim(), page: 0 }));
  };

  const redirectToDetail = (data) => {
    history.push(`/cms/api-detail/${data.id}`);
  };

  const columns = [
    {
      Header: 'Judul API',
      accessor: 'title',
      Cell: (data) => truncate(data.cell.value, { length: 30 }),
    },
    {
      Header: 'Deskripsi',
      accessor: 'description',
      Cell: (data) => (
        <Popover
          placement="bottom-start"
          triggerOn="hover"
          trigger={
            <span
              className="cursor-pointer"
              dangerouslySetInnerHTML={{ __html: truncate(data.cell.value, { length: 50 }) }}
            />
          }>
          <div dangerouslySetInnerHTML={{ __html: data.cell.value }} />
        </Popover>
      ),
    },
    {
      Header: 'Output JSON',
      accessor: 'outputUrl',
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
    variant: 'spaced',
    columns,
    data,
    showSearch: false,
    totalCount: totalRecords || null,
    pageSize: size,
    manualPagination: true,
    currentPage: page,
    onPageIndexChange: (currentPage = 0) => {
      if (page !== currentPage) {
        dispatch(getInstansiListById({ id: id, page: currentPage, q }));
      }
    },
  };

  if (loading) {
    return <Loader fullscreen={true} />;
  }

  return (
    <div>
      <div className="d-flex p-32 border">
        <div className="border d-flex align-items-center p-15">
          <img src={LogoBappenas} alt="logo" height="60px" width="60px" />
        </div>
        {error ? <label className="sdp-error">{error}</label> : null}
        <div className="ml-16 w-50">
          <ReadOnlyInputs
            group
            groupClass="mb-3"
            groupProps={{
              md: 30,
              as: Col,
            }}
            label={instansi?.nama}
            labelClass="sdp-sub-heading"
            type="text"
            value={groupOutputUrl || ''}
          />
          <span className="sdp-text-disable">{totalRecords} files</span>
        </div>
      </div>
      <div className="d-flex justify-content-between border">
        <Button className="mx-32 my-16" variant="info" onClick={() => history.push(`/cms/api-create/${id}`)}>
          Tambah API
        </Button>
        <div className="mx-32 my-16">
          <FilterSearchInput searchPlaceholder="Cari..." globalFilter={q} setGlobalFilter={handleSearch} />
        </div>
      </div>
      <div className="container my-30">
        <Table {...tableConfig} />
      </div>
    </div>
  );
};

export default DetailInstansi;
