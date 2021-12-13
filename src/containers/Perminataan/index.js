import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { NoPerminataanData, StatusSvg } from 'components/Icons';
import { perminataanDatasetSelector, getPerminataanData } from './reducer';
import Table from 'components/Table';
import { prefixID } from './constant';
import SideBarLoader from 'components/Loader/Sidebar';
import TableLoader from 'components/Loader/TableLoader';

const LIST = [
  {
    title: 'Semua',
    key: 'semua',
  },
  {
    title: 'Terkirim',
    key: 'terkirim',
  },
  {
    title: 'Diproses',
    key: 'diproses',
  },
  {
    title: 'Selesai',
    key: 'selesai',
  },
  {
    title: 'Ditolak',
    key: 'ditolak',
  },
  {
    title: 'Draft',
    key: 'draft',
  },
];

export const Perminataan = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('semua');
  const dispatch = useDispatch();

  const { size, loading, page, status, records, totalRecords } = useSelector(perminataanDatasetSelector);

  const fetchPerminataanDataset = (params) => {
    return dispatch(getPerminataanData(params));
  };

  useEffect(() => {
    fetchPerminataanDataset({ page: page || 0, status });
  }, []);

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
    fetchPerminataanDataset({ page: 0, status: tab !== 'semua' ? tab.toUpperCase() : '' });
  };

  const handleBuatPermintaan = () => {
    history.push('/forum');
  };

  const rowClick = (data) => {
    if ((data?.status || '').toLowerCase() === 'ditolak') return;
    history.push(`/permintaan-data-detail/${data.id}`);
  };

  const getRowClass = (data) => {
    if ((data?.status || '').toLowerCase() !== 'ditolak') return '';
    return 'bg-gray';
  };

  const columns = [
    {
      Header: '',
      accessor: 'perminataanID',
      Cell: ({ ...rest }) => <span>{prefixID(rest?.row?.original?.id || '')}</span>,
    },
    {
      Header: '',
      accessor: 'deskripsi',
    },
    {
      Header: '',
      accessor: 'jenisData',
    },
    {
      Header: '',
      accessor: 'tanggalTarget',
      Cell: ({ ...rest }) => (
        <span>
          {rest.row.original?.tanggalTarget ? moment(rest.row.original.tanggalTarget).format('DD MMMM YYYY') : '---'}
        </span>
      ),
    },
    {
      Header: '',
      accessor: 'statusInfo',
      Cell: ({ ...rest }) => {
        const className = {
          draft: 'stroke',
          terkirim: 'blue',
          diproses: 'orange',
          selesai: 'green',
          ditolak: 'danger',
        };
        return (
          <div className="d-flex align-items-center">
            <StatusSvg variant={className?.[(rest?.row?.original?.status || '').toLowerCase()] || ''} />
            <span
              className={cx('ml-10', {
                'sdp-text-disable': (rest?.row?.original?.status || '').toLowerCase() === 'zzz ',
              })}>
              {rest?.row?.original?.status}
            </span>
          </div>
        );
      },
    },
  ];

  const tableConfig = {
    columns,
    data: records,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'spaced',
    totalCount: totalRecords,
    pageSize: size,
    currentPage: page,
    manualPagination: true,
    onRowClick: rowClick,
    rowClass: getRowClass,
    onPageIndexChange: (currentPage) => {
      if (currentPage !== page) {
        fetchPerminataanDataset({ page: currentPage, status });
      }
    },
  };

  return (
    <div className="sdp-perminataan-data-container my-40 mx-320">
      <span className="fs-24 lh-30 fw-bold sdp-text-black-dark">Permintaan Data</span>
      <Row className="mt-40">
        <Col xs={6} md={3}>
          {loading ? (
            <SideBarLoader />
          ) : (
            <>
              <Button variant="primary" className="br-48 py-16 px-48" onClick={handleBuatPermintaan}>
                +&nbsp;&nbsp;Buat Permintaan
              </Button>

              <div className="sdp-perminataan-left-sidebar mr-40">
                {LIST.map((item) => (
                  <div
                    className={cx('sdp-perminataan-sidebar-item cursor-pointer', {
                      active: activeTab === item.key,
                    })}
                    onClick={() => handleActiveTab(item.key)}>
                    {item.title}
                  </div>
                ))}
              </div>
            </>
          )}
        </Col>
        <Col xs={12} md={9} className="">
          {loading ? (
            <TableLoader speed={2} width={'100%'} height={610} />
          ) : !records?.length ? (
            <div className="sdp-perminataan-no-data d-flex justify-content-center align-items-center h-100 flex-column">
              <NoPerminataanData />
              <spn className="mt-10 fs-18 lh-22 sdp-text-disable">Tidak Ada Permintaan Data</spn>
            </div>
          ) : (
            <Table {...tableConfig} />
          )}
        </Col>
      </Row>
    </div>
  );
};

/*<Loader fullscreen />*/
