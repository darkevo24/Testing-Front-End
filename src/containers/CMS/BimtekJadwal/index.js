import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Search } from 'components/Icons';
import { Table } from 'components';
import { useHistory } from 'react-router-dom';
import { BimtekJadwalSelector, getJadwalBimtek } from './reducer';

import { ReactComponent as Plus } from 'assets/plus.svg';
import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-table');

const CMSBimtekPermintaan = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { size, page, records, totalRecords } = useSelector(BimtekJadwalSelector);
  const fetchJadwalBimtek = () => {
    return dispatch(getJadwalBimtek());
  };

  useEffect(() => {
    fetchJadwalBimtek();
  }, []);

  const columns = [
    {
      Header: 'Nama Bimbingan',
      accessor: 'namaBimtek',
    },
    {
      Header: 'Tanggal Mulai',
      accessor: 'tanggalMulaiDisetujui',
      Cell: ({ ...rest }) => (
        <span>
          {rest.row.original?.tanggalMulaiDisetujui
            ? moment(rest.row.original?.tanggalMulaiDisetujui).format('DD MMMM YYYY')
            : '---'}
        </span>
      ),
    },
    {
      Header: 'Tanggal Berakhir',
      accessor: 'tanggalBerakhir',
      Cell: ({ ...rest }) => (
        <span>
          {rest.row.original?.tanggalBerakhir ? moment(rest.row.original?.tanggalBerakhir).format('DD MMMM YYYY') : '---'}
        </span>
      ),
    },
    {
      Header: 'Tempat',
      accessor: 'tempat',
    },
    {
      Header: 'Pembicara',
      accessor: 'pembicara',
      Cell: ({ ...rest }) => (
        <span>
          {rest.row.original?.pembicara.map((data, index) => {
            return <span key={index}>{data.nama}</span>;
          })}
        </span>
      ),
    },
    {
      Header: 'Materi',
      accessor: 'tagMateri',
      Cell: ({ ...rest }) => (
        <span>
          {rest.row.original?.tagMateri.map((data, index) => {
            return (
              <div key={index}>
                <span>{data}</span>
              </div>
            );
          })}
        </span>
      ),
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: '',
      accessor: 'button',
      Cell: ({ ...rest }) => <Button variant="info"> Detail </Button>,
    },
  ];

  const rowClick = (data) => {
    history.push(`/cms/bimtek-jadwal/${data.id}`);
  };

  const getRowClass = (data) => {
    // if ((data?.status || '').toLowerCase() !== 'ditolak') return '';
    // return 'bg-gray';
  };

  const tableConfig = {
    className: 'cms-permintaan-data',
    columns,
    data: records,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'link',
    totalCount: totalRecords,
    pageSize: size,
    currentPage: page,
    manualPagination: true,
    onRowClick: rowClick,
    rowClass: getRowClass,
    onPageIndexChange: (currentPage) => {
      if (currentPage !== page) {
        fetchJadwalBimtek({ page: currentPage });
      }
    },
  };

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-4')}>Jadwal Bimbingan Teknis</div>
        <Row className="justify-content-between">
          <Col xs={2}>
            <Button variant="info" className="text-center" onClick={() => history.push('/cms/bimtek-jadwal/baru')}>
              <Plus /> Buat Jadwal
            </Button>
          </Col>
          <Col xs={4}>
            <InputGroup>
              <Form.Control variant="normal" type="text" placeholder="Cari Bimbingan Teknis" />
              <Search />
            </InputGroup>
          </Col>
        </Row>
      </div>
      {/* <CMSTable
        customWidth={[13, 10, 12, 10, 10, 15, 8, 7]}
        header={['Nama Bimbingan', 'Tanggal Mulai', 'Tanggal Berakhir', 'Tempat', 'Pembicara', 'Materi', 'Status']}
        data={dataBimtek.map((item) => {
          let value = {
            data: [item.name, item.dateStart, item.dateEnd, item.place, item.speaker, item.subjects, item.status],
            action: '/cms/bimtek-jadwal/' + item.id,
          };
          return value;
        })}
      /> */}
      <div className="p-30"> {<Table {...tableConfig} />} </div>
    </div>
  );
};

export default CMSBimtekPermintaan;
