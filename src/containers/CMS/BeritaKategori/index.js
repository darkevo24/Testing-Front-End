import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import { Modal, Input } from 'components';
import Table, { FilterSearchInput } from 'components/Table';
import TableLoader from 'components/Loader/TableLoader';

import { ReactComponent as Plus } from 'assets/plus.svg';
import { ReactComponent as Pen } from 'assets/pen.svg';
import { ReactComponent as Trash } from 'assets/trash-icon.svg';
import bn from 'utils/bemNames';
import { formatDate } from 'utils/helper';
import {
  getBeritaListKategori,
  beritaKategoriCmsListSelector,
  createBeritaKategori,
  deleteBeritaKategori,
  editBeritaKategori,
} from './reducer';

const bem = bn('content-table');

const schema = yup
  .object({
    categoryName: yup.string().required(),
  })
  .required();

const CMSBeritaKategori = () => {
  const dispatch = useDispatch();

  const [modalCreate, setModalCreate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [detailKategori, setDetailKategori] = useState(null);
  const [notes, setNotes] = useState('');
  const [sortBy, setSortBy] = useState({ id: 0, sortId: 0, desc: false });
  const [filter, setFilter] = useState({
    page: 1,
    size: 10,
    query: '',
    sortBy: '',
    sortDirection: 'ASC',
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setError,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      categoryName: '',
    },
  });

  const { loading, totalPages, totalRecords, size, page, records } = useSelector(beritaKategoriCmsListSelector);
  const fetchData = (params) => {
    return dispatch(getBeritaListKategori(params));
  };

  useEffect(() => {
    fetchData({ filter });
  }, [filter]);

  const handleSearch = (value = '') => {
    setFilter({ ...filter, query: value });
  };

  const onCreate = async (data) => {
    if (data.categoryName.length) {
      dispatch(createBeritaKategori(data)).then((res) => {
        setFilter({
          page: 1,
          size: 10,
          query: '',
          sortBy: '',
          sortDirection: 'ASC',
        });
        reset();
        setModalCreate(false);
      });
    } else {
      setError('categoryName', { message: 'This field is required' });
    }
  };

  const handleDelete = (data) => {
    setDetailKategori(data);
    setModalDelete(true);
  };

  const onDelete = () => {
    dispatch(deleteBeritaKategori(detailKategori)).then((res) => {
      setDetailKategori(null);
      setFilter({
        page: 1,
        size: 10,
        query: '',
        sortBy: '',
        sortDirection: 'ASC',
      });
      setModalDelete(false);
    });
  };

  const handleEdit = (data) => {
    setDetailKategori(data);
    setValue('categoryName', data.categoryName);
    setModalCreate(true);
  };

  const onEdit = (data) => {
    dispatch(editBeritaKategori({ id: detailKategori.id, ...data })).then((res) => {
      setDetailKategori(null);
      setFilter({
        page: 1,
        size: 10,
        query: '',
        sortBy: '',
        sortDirection: 'ASC',
      });
      setModalCreate(false);
    });
  };

  const columns = useMemo(() => {
    const items = [
      {
        Header: 'Nama Kategori',
        accessor: 'categoryName',
        sortId: 0,
      },
      {
        Header: 'Tanggal Buat',
        accessor: 'createdDate',
        sortId: 1,
        Cell: ({ cell }) => formatDate(cell.row.original.createdDate),
      },
      {
        Header: 'Dibuat Oleh',
        accessor: 'createdBy',
        disableSortBy: true,
      },
      {
        id: 'actions',
        actions: [
          {
            type: 'action',
            title: <Pen />,
            classes: 'mx-5 br-4 py-8 px-12 border-0',
            callback: handleEdit,
          },
          {
            type: 'delete',
            title: <Trash />,
            classes: 'mx-5 br-4 py-8 px-12 border-0',
            callback: handleDelete,
          },
        ],
        Cell: Table.Actions,
      },
    ];
    return items;
  }, []);

  const onSortChange = ({ id, sortId, isSortedDesc }) => {
    const desc = isSortedDesc === undefined ? false : !isSortedDesc;
    setFilter({ ...filter, sortBy: sortId, sortDirection: desc ? 'DESC' : 'ASC' });
    setSortBy({ id, sortId, desc });
  };

  const tableConfig = {
    columns,
    data: records,
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
        setFilter({ ...filter, page: currentPage + 1 });
      }
    },
  };

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-3')}>Kategori Berita</div>
        <div className="d-flex justify-content-between">
          <Button variant="info" className="text-center" onClick={() => setModalCreate(true)}>
            <Plus /> Buat Kategori
          </Button>
          <div className="sdp-left-wrapper d-flex align-items-center justify-content-end">
            <FilterSearchInput searchPlaceholder="Cari Kategori Berita" setGlobalFilter={handleSearch} />
          </div>
        </div>
      </div>
      <div className={bem.e('body')}>
        {loading ? <TableLoader speed={2} width={'100%'} height={550} /> : <Table {...tableConfig} />}
      </div>
      {modalCreate ? (
        <Modal
          size="lg"
          visible={true}
          onClose={() => {
            setModalCreate(false);
            setDetailKategori(null);
            reset();
          }}
          title="Tambah Kategori Berita Baru"
          showHeader={true}
          centered={true}>
          <Input
            group
            label="Nama Kategori"
            name="categoryName"
            rules={{ required: true }}
            control={control}
            error={errors.categoryName?.message}
          />
          <div className="d-flex justify-content-end my-20">
            <Button
              className="br-4 mr-8 px-39 text-black"
              variant="secondary"
              onClick={() => {
                setModalCreate(false);
                setDetailKategori(null);
                reset();
              }}>
              Batal
            </Button>
            <Button
              className="br-4 px-39"
              variant="info"
              onClick={() => handleSubmit(detailKategori ? onEdit(getValues()) : onCreate(getValues()))}>
              {detailKategori ? 'Ubah' : 'Simpan'}
            </Button>
          </div>
        </Modal>
      ) : null}
      {modalDelete ? (
        <Modal
          visible={true}
          onClose={() => {
            setModalDelete(false);
            setDetailKategori(null);
          }}
          title=""
          showHeader={false}
          centered={true}>
          <div className="text-black">
            Apakah anda yakin ingin <span className="text-danger">menghapus</span> Forum{' '}
            <span style={{ fontWeight: 700 }}>{detailKategori?.categoryName}</span>?
          </div>
          <textarea
            placeholder="Tulis Catatan"
            name="catatan"
            value={notes}
            onChange={({ target: { value = '' } = {} }) => setNotes(value)}
            className="border-gray-stroke br-4 w-100 mt-24 mb-24 h-214"
            required
          />
          <div className="d-flex justify-content-end">
            <Button
              className="br-4 mr-8 px-56 text-black border bg-transparent"
              variant="secondary"
              onClick={() => {
                setModalDelete(false);
                setDetailKategori(null);
              }}>
              Batal
            </Button>
            <Button className="br-4 px-39" variant="info" onClick={onDelete}>
              Konfirmasi
            </Button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default CMSBeritaKategori;
