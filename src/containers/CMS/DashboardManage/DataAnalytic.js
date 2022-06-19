import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// dependency
import cx from 'classnames';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

// local import
import { Search } from 'components/Icons';
import { Loader, Modal, Notification, Table } from 'components';
import bn from 'utils/bemNames';
import { getListAnalitik, analitikCmsListSelector, setNewAnalitik, setEditAnalitik } from './reducer';

// assets
import { ReactComponent as LogoIcon } from 'assets/logo-icon.svg';
import { ReactComponent as Plus } from 'assets/plus.svg';
import { ReactComponent as Edit } from 'assets/edit.svg';
import { ReactComponent as CrossRed } from 'assets/cross-red.svg';

const bem = bn('content-table');

const CMSDataAnalytic = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [showDelete, setShowDelete] = useState(false);

  const { totalRecords, records, loading, size, page } = useSelector(analitikCmsListSelector);
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
      page: 0,
      judul: searchQuery,
    });
  }, [searchQuery]);

  useEffect(() => {
    if (data?.action === 'publish') sendData();
  }, [data]);

  const columns = [
    {
      Header: 'Judul Dashboard',
      accessor: 'title',
    },
    {
      Header: 'URL',
      accessor: 'url',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ cell: { row: { original: item } = {} } = {} }) => (
        <Row>
          <Col xs={6}>{item.publish ? 'Published' : 'Unpublished'}</Col>
          <Col xs={6}>
            <Form.Check type="switch" id={'publish' + item.id} checked={item.publish} onChange={() => publishAction(item)} />
          </Col>
        </Row>
      ),
    },
    {
      Header: '',
      accessor: 'action',
      Cell: ({ cell: { row: { original: item } = {} } = {} }) => (
        <>
          <Button variant="secondary" className="mr-8" onClick={() => editAction(item)}>
            <Edit />
          </Button>
          <Button className="btn-delete" onClick={() => deleteAction(item)}>
            <CrossRed />
          </Button>
        </>
      ),
    },
  ];

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

  const analyticAction = () => {
    window.open('https://analitik.data.go.id/superset/welcome/');
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
    onPageIndexChange: (currentPage) => {
      if (currentPage !== page) {
        fetchData({
          page: currentPage,
          judul: searchQuery,
        });
      }
    },
  };

  return (
    <div className={bem.e('section')}>
      <div className={bem.e('header')}>
        <div className={cx(bem.e('title'), 'mb-3')}>Data Prioritas</div>
        <Row className="justify-content-between">
          <Col xs={4}>
            <Button variant="info" className="text-center mr-16 d-inline-flex align-items-center" onClick={createAction}>
              <Plus className="mr-4" /> Dashboard Baru
            </Button>
            <Button variant="secondary" className="text-center d-inline-flex align-items-center" onClick={analyticAction}>
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
        {!loading ? <Table {...tableConfig} /> : <Loader fullscreen={true} />}
      </div>
      <Modal
        visible={show}
        onClose={handleClose}
        className="cms-data-analytic-form"
        title={data?.id ? 'Ubah Dashboard' : 'Tambah Dashboard'}>
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
          <div className="d-flex justify-content-end mt-16">
            <Button variant="secondary" onClick={handleClose} className="mr-4">
              Batal
            </Button>
            <Button variant="info" form="data-analytic-form" type="submit">
              Simpan
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal visible={showDelete} onClose={handleClose} showHeader={false}>
        <div>
          Apakah anda yakin ingin <span className="fw-bold sdp-text-red">menghapus</span> Dashboard{' '}
          <span className="fw-bold">{data?.title}</span>?
        </div>
        <div className="d-flex justify-content-end mt-16">
          <Button variant="secondary" onClick={handleClose} className="mr-4">
            Batal
          </Button>
          <Button variant="info" onClick={sendData}>
            Konfirmasi
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CMSDataAnalytic;
