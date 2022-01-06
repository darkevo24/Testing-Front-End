import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListAnalitik, analitikCmsListSelector, setPreviewBerita } from './reducer';
import { defaultNumberOfRows } from 'utils/request';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Search } from 'components/Icons';

import { ReactComponent as LogoIcon } from 'assets/logo-icon.svg';
import { ReactComponent as Plus } from 'assets/plus.svg';
import { ReactComponent as Edit } from 'assets/edit.svg';
import { ReactComponent as CrossRed } from 'assets/cross-red.svg';
import { useHistory } from 'react-router-dom';
import bn from 'utils/bemNames';
import cx from 'classnames';
import { Table } from 'ant-table-extensions';
import { Space, Switch } from 'antd';

import './index.scss';

const bem = bn('content-table');

const CMSDataAnalytic = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [searchQuery, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { totalRecords, records, loading } = useSelector(analitikCmsListSelector);
  const fetchData = (params) => {
    return dispatch(getListAnalitik(params));
  };

  useEffect(() => {
    fetchData({
      page: page,
      judul: searchQuery,
    });
  }, [page]);

  useEffect(() => {
    fetchData({
      page: 1,
      judul: searchQuery,
    });
  }, [searchQuery]);

  const columns = [
    {
      title: 'Judul Dashboard',
      dataIndex: 'judul',
      key: 'judul',
    },
    {
      title: 'URL',
      key: 'url',
      render: (text, record) => <a href={'mailto:' + record.emailCreateBy}>{record.emailCreateBy}</a>,
    },
    {
      title: 'Status',
      key: 'status',
      width: '20%',
      render: (text, record) => (
        <Row>
          <Col xs={6}>{record.status === 0 ? 'Unpublished' : 'Published'}</Col>
          <Col xs={6}>
            <Switch defaultChecked={record.status !== 0} />
          </Col>
        </Row>
      ),
    },
    {
      title: '',
      key: 'action',
      width: '15%',
      render: (text, record) => (
        <Space size="middle">
          <Button variant="secondary">
            <Edit />
          </Button>
          <Button className="btn-delete">
            <CrossRed style={{ width: '15px' }} />
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
  };

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-3')}>Data Analytic</div>
        <Row className="justify-content-between">
          <Col xs={4}>
            <Button variant="info" className="text-center mr-16 d-inline-flex align-items-center">
              <Plus className="mr-4" /> Dashboard Baru
            </Button>
            <Button
              variant="secondary"
              className="text-center d-inline-flex align-items-center"
              style={{ color: '#515154' }}>
              <LogoIcon className="mr-4" /> Analytics
            </Button>
          </Col>
          <Col xs={4}>
            <InputGroup>
              <Form.Control onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Cari Dashboard" />
              <Search />
            </InputGroup>
          </Col>
        </Row>
      </div>
      <div className={cx(bem.e('body'), 'cms-data-analytic')}>
        <Table
          rowKey={(record) => record.id}
          dataSource={records}
          columns={columns}
          pagination={{ current: page, pageSize: defaultNumberOfRows, total: totalRecords, showSizeChanger: false }}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default CMSDataAnalytic;
