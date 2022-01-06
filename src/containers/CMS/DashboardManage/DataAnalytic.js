import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListAnalitik, analitikCmsListSelector, setNewAnalitik, setEditAnalitik } from './reducer';
import { defaultNumberOfRows } from 'utils/request';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import { Search } from 'components/Icons';
import Notification from 'components/Notification';

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
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [showDelete, setShowDelete] = useState(false);

  const { totalRecords, records, loading } = useSelector(analitikCmsListSelector);
  const fetchData = (params) => {
    return dispatch(getListAnalitik(params));
  };
  const handleClose = () => {
    setShow(false);
    setShowDelete(false);
    setErrors({});
    setForm({});
  };
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    setData({
      ...data,
      [field]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
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

  useEffect(() => {
    if (data?.action === 'publish') sendData();
  }, [data]);

  const columns = [
    {
      title: 'Judul Dashboard',
      dataIndex: 'title',
      key: 'judul',
    },
    {
      title: 'URL',
      key: 'url',
      render: (text, record) => <a href={record.url}>{record.url}</a>,
    },
    {
      title: 'Status',
      key: 'status',
      width: '15%',
      render: (text, record) => (
        <Row>
          <Col xs={6}>{record.status === 0 ? 'Unpublished' : 'Published'}</Col>
          <Col xs={6}>
            <Switch defaultChecked={record.publish} onChange={() => publishAction(record)} />
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
          <Button variant="secondary" onClick={() => editAction(record)}>
            <Edit />
          </Button>
          <Button className="btn-delete" onClick={() => deleteAction(record)}>
            <CrossRed style={{ width: '15px' }} />
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
  };

  const createAction = () => {
    setData(null);
    setShow(true);
  };

  const editAction = (record) => {
    setData({ id: record.id, url: record.url, title: record.title, is_active: record.is_active, publish: record.publish });
    setShow(true);
    setForm({ title: record.title, url: record.url });
  };

  const deleteAction = (record) => {
    setData({ id: record.id, url: record.url, title: record.title, is_active: false, publish: record.publish });
    setShowDelete(true);
  };

  const publishAction = (record) => {
    setData({
      id: record.id,
      url: record.url,
      title: record.title,
      is_active: record.is_active,
      publish: !record.publish,
      action: 'publish',
    });
  };

  const findFormErrors = () => {
    const { title, url } = form;
    const newErrors = {};

    if (!title) newErrors.title = 'Isi judul dashboard';

    if (!url) newErrors.url = 'Isi URL Dashboard';
    else {
      try {
        new URL(url);
      } catch (e) {
        newErrors.url = 'URL tidak valid';
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      sendData();
    }
  };

  const sendData = () => {
    Notification.hide();
    if (data?.id) {
      return dispatch(setEditAnalitik({ payload: data }))
        .then((res) => notifyResponse(res))
        .then(handleClose);
    }
    // simpan
    dispatch(setNewAnalitik({ payload: data }))
      .then((res) => notifyResponse(res))
      .then(handleClose);
  };

  const notifyResponse = (res) => {
    res?.payload
      ? Notification.show({
          type: 'secondary',
          message: (
            <div>
              Berita <span className="fw-bold">{res.meta.arg?.payload?.title}</span> Berhasil Disimpan
            </div>
          ),
          icon: 'check',
        })
      : Notification.show({
          message: (
            <div>
              Error <span className="fw-bold">{res.error?.message}</span> Data Tidak Diubah
            </div>
          ),
          icon: 'cross',
        });

    if (res?.payload) {
      fetchData({
        page: page,
        judul: searchQuery,
      });
    }
  };

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-3')}>Data Analytic</div>
        <Row className="justify-content-between">
          <Col xs={4}>
            <Button variant="info" className="text-center mr-16 d-inline-flex align-items-center" onClick={createAction}>
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
      <Modal show={show} onHide={handleClose} className="cms-data-analytic-form">
        <Modal.Header closeButton>
          <Modal.Title>{data?.id ? 'Ubah Dashboard' : 'Tambah Dashboard'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="data-analytic-form">
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Judul Dashboard</Form.Label>
              <Form.Control
                defaultValue={data?.title}
                onChange={(e) => setField('title', e.target.value)}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="url">
              <Form.Label>URL</Form.Label>
              <Form.Control
                defaultValue={data?.url}
                onChange={(e) => setField('url', e.target.value)}
                isInvalid={!!errors.url}
              />
              <Form.Text>Contoh URL : http://www.google.com</Form.Text>
              <Form.Control.Feedback type="invalid">{errors.url}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="info" form="data-analytic-form" type="submit">
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDelete} onHide={handleClose}>
        <Modal.Body>
          Apakah anda yakin ingin <span style={{ color: 'red', fontWeight: 'bold' }}>menghapus</span> Dashboard{' '}
          <span style={{ fontWeight: 'bold' }}>{data?.title}</span>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="info" onClick={sendData}>
            Konfirmasi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CMSDataAnalytic;
