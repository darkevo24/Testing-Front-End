import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { NoPerminataanData, StatusSvg } from 'components/Icons';
import { perminataanDatasetSelector, getPerminataanData } from './slice';
import Table from 'components/Table';
import { Loader } from 'components';
import { prefixID } from './Forum/constant';

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

  const { size, loading, page, records, totalRecords } = useSelector(perminataanDatasetSelector);

  const fetchPerminataanDataset = (page) => {
    return dispatch(getPerminataanData(page));
  };

  useEffect(() => {
    if (!records?.length) fetchPerminataanDataset(page || 0);
  }, []);

  const handleBuatPermintaan = () => {
    history.push('/forum');
  };

  const columns = [
    {
      Header: '',
      accessor: 'id',
      Cell: ({ ...rest }) => <span>{prefixID(rest.row.original.id)}</span>,
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
    },
    {
      Header: '',
      accessor: 'status',
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

  const getData = () => {
    if (!records?.length) return [];
    if (activeTab === 'semua') return records;
    return records.filter((item) => item.status.toLowerCase() === activeTab.toLowerCase());
  };
  const tableData = getData();
  const tableConfig = {
    columns,
    data: tableData,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'spaced',
    totalCount: totalRecords,
    pageSize: size,
    currentPage: page,
    manualPagination: true,
    onPageIndexChange: (currentPage) => {
      if (currentPage !== page) {
        fetchPerminataanDataset(currentPage);
      }
    },
  };

  return (
    <div className="sdp-perminataan-data-container my-40 mx-320">
      <span className="fs-24 lh-30 fw-bold sdp-text-black-dark">Permintaan Data</span>
      <Row className="mt-40">
        <Col xs={6} md={3}>
          <Button variant="primary" className="br-48 py-16 px-48" onClick={handleBuatPermintaan}>
            +&nbsp;&nbsp;Buat Permintaan
          </Button>

          <div className="sdp-perminataan-left-sidebar mr-40">
            {LIST.map((item) => (
              <div
                className={cx('sdp-perminataan-sidebar-item', {
                  active: activeTab === item.key,
                })}
                onClick={() => setActiveTab(item.key)}>
                {item.title}
              </div>
            ))}
          </div>
        </Col>
        <Col xs={12} md={9} className="">
          {!records?.length || !tableData?.length ? (
            <div className="sdp-perminataan-no-data d-flex justify-content-center align-items-center h-100 flex-column">
              <NoPerminataanData />
              <spn className="mt-10 fs-18 lh-22 sdp-text-disable">Tidak Ada Permintaan Data</spn>
            </div>
          ) : (
            <Table {...tableConfig} />
          )}
        </Col>
        {loading && <Loader fullscreen />}
      </Row>
    </div>
  );
};
