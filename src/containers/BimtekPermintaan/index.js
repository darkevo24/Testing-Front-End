import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import { Loader } from 'components';

import { BimtekLayout } from 'layouts/BimtekLayout';
import { getBimtekPermintaan, bimtekPermintaan } from './reducer';
import { NoPerminataanData } from 'components/Icons';
import bn from 'utils/bemNames';
import moment from 'moment';
import { Table } from 'components';

const bem = bn('bimtek-permintaan');

const BimtekPermintaan = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { records: permintaanRecords, totalRecords, page, size, loading } = useSelector(bimtekPermintaan);

  const fetchDataset = (params) => {
    const obj = {
      page: params.page,
    };
    return dispatch(getBimtekPermintaan(obj));
  };
  useEffect(() => {
    fetchDataset({ page: page || 0 });
  }, []);

  const handlePermintaan = (data) => {
    history.push(`/bimtek-permintaan/${data.id}`);
  };

  const getRowClass = (data) => {
    if ((data?.status || '').toLowerCase() !== 'ditolak') return '';
    return 'bg-gray';
  };
  const columns = [
    {
      Header: 'ID',
      accessor: 'kodeBimtek',
    },
    {
      Header: 'Nama Bimtek',
      accessor: 'namaBimtek',
    },
    {
      Header: 'Topik Bimtek',
      accessor: 'tagMateri',
    },
    {
      Header: 'Kota Pelaksanaan',
      accessor: 'kota',
    },
    {
      Header: 'Tanggal Pengajuan',
      accessor: 'tanggalRequest',
      Cell: ({ row: { original } }) => (
        <span> {original?.tanggalRequest ? moment(original?.tanggalRequest).format('DD MMMM YYYY') : '---'} </span>
      ),
    },
    {
      Header: 'Status',
      Cell: ({ row: { original } }) => (
        <div className="d-flex align-items-center justify-content-start">
          <hr className={bem.e('status')} />
          <div> {original?.status ? original?.status : '-'} </div>,
        </div>
      ),
    },
  ];

  const tableConfig = {
    className: 'cms-permintaan-data',
    columns,
    data: permintaanRecords,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'link',
    totalCount: totalRecords,
    pageSize: size,
    currentPage: page,
    manualPagination: true,
    rowClass: getRowClass,
    onRowClick: handlePermintaan,
    onPageIndexChange: (currentPage) => {
      if (currentPage !== page) {
        fetchDataset({ page: currentPage });
      }
    },
  };

  return (
    <BimtekLayout className="bimtek-permintaan">
      <Row className={bem.e('', 'mb-12 ml-0')}>
        {!permintaanRecords?.length ? (
          <div className={bem.e('', 'd-flex justify-content-center align-items-center flex-column')}>
            <NoPerminataanData />
            <div className="text-black-50">No Data</div>
          </div>
        ) : (
          <div className="px-30 pt-0"> {!loading ? <Table {...tableConfig} /> : <Loader fullscreen={true} />} </div>
        )}
      </Row>
    </BimtekLayout>
  );
};

export default BimtekPermintaan;
