import { useState, useMemo, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ReactComponent as CopyJson } from 'assets/copy-json.svg';
import { ReactComponent as Arrow } from 'assets/arrow-left-add.svg';
import { ReactComponent as Union } from 'assets/union.svg';
import { ReactComponent as Prev } from 'assets/prev.svg';
import { ReactComponent as Next } from 'assets/next.svg';
import { Modal, Dropdown, Input } from 'components';
import { useForm } from 'react-hook-form';
import bn from 'utils/bemNames';
import { useDispatch, useSelector } from 'react-redux';
import { getMangementApiDetial, portalApiDetailSelector } from './reducer';

const bem = bn('management-api');

const ApiDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { content } = useSelector(portalApiDetailSelector);
  const data = useMemo(() => content || {}, [content]);

  const fetchApiDetail = () => {
    return dispatch(getMangementApiDetial(id));
  };

  useEffect(() => {
    reset(data);
  }, [data]);

  useEffect(() => {
    fetchApiDetail();
  }, []);

  const {
    control,
    reset,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      ...data,
    },
  });

  const level = [1, 2, 3, 4, 5];

  const history = useHistory();
  const [modalProfile, setModalProfile] = useState(false);

  const LIST_TABLE = [
    {
      field: 'Title',
      value: 'Data Kependudukan',
    },
    {
      field: 'Deskription',
      value: 'Data Kependudukan',
    },
    {
      field: 'Title',
      value: 'Data Kependudukan',
    },
    {
      field: 'Deskription',
      value: 'Data Kependudukan',
    },
    {
      field: 'Title',
      value: 'Data Kependudukan',
    },
    {
      field: 'Deskription',
      value: 'Data Kependudukan',
    },
  ];

  const LIST_TABLE_DCAT = [
    {
      property: 'Title',
      equlvalent: 'Judul',
      source: 'Judul',
    },
    {
      property: 'Description',
      equlvalent: 'Deskripsi',
      source: 'Description',
    },
    {
      property: 'Title',
      equlvalent: 'Judul',
      source: 'Judul',
    },
    {
      property: 'Title',
      equlvalent: 'Judul',
      source: 'Judul',
    },
    {
      property: 'Title',
      equlvalent: 'Judul',
      source: 'Judul',
    },
    {
      property: 'Title',
      equlvalent: 'Judul',
      source: 'Judul',
    },
    {
      property: 'Description',
      equlvalent: 'Deskripsi',
      source: 'Description',
    },
    {
      property: 'Title',
      equlvalent: 'Judul',
      source: 'Judul',
    },
    {
      property: 'Title',
      equlvalent: 'Judul',
      source: 'Judul',
    },
    {
      property: 'Title',
      equlvalent: 'Judul',
      source: 'Judul',
    },
    {
      property: 'Title',
      equlvalent: 'Judul',
      source: 'Judul',
    },
    {
      property: 'Description',
      equlvalent: 'Deskripsi',
      source: 'Description',
    },
  ];

  return (
    <div className="sdp-management-api add">
      <div className="container">
        <div className={bem.e('header-add')}>
          <div className="header-left">
            <Arrow onClick={() => history.push('/api')} />
            <p> Detail Api </p>
          </div>
          <div className="header-right">
            <Button variant="secondary" className="mr-10" onClick={() => setModalProfile(true)}>
              Hapus
            </Button>
            <Button variant="info" onClick={() => history.push('/api/edit/api-1')}>
              Perbarui
            </Button>
          </div>
        </div>
        <div className={bem.e('wrapper-input')}>
          <Form className="sdp-form" noValidate>
            <div className="form-group">
              <label htmlFor="title">
                <div className="wrapper-union">
                  <p> Judul </p> <Union />
                  <div className="wrapper-desc">
                    Keputusan Direktur Jenderal Tanaman Pangan Nomor 218/HK/310/12/2029 tentang Petunjuk Teknis Bantuan
                    Pemerintah Program Peningkatan Produksi, Produktivitas dan Mutu Tanaman Pangan Tahun Anggaran 2020
                  </div>
                </div>
              </label>
              <Input disabled group name="title" control={control} />
            </div>
            <div className="form-group">
              <label htmlFor="deskripsi">
                <div className="wrapper-union">
                  <p> Deskripsi </p> <Union />
                  <div className="wrapper-desc">
                    Keputusan Direktur Jenderal Tanaman Pangan Nomor 218/HK/310/12/2029 tentang Petunjuk Teknis Bantuan
                    Pemerintah Program Peningkatan Produksi, Produktivitas dan Mutu Tanaman Pangan Tahun Anggaran 2020
                  </div>
                </div>
              </label>
              <Input disabled group name="description" control={control} />
            </div>
            <div className="form-group">
              <label htmlFor="sourceApi">
                <div className="wrapper-union">
                  <p> Source API </p> <Union />
                  <div className="wrapper-desc">
                    Keputusan Direktur Jenderal Tanaman Pangan Nomor 218/HK/310/12/2029 tentang Petunjuk Teknis Bantuan
                    Pemerintah Program Peningkatan Produksi, Produktivitas dan Mutu Tanaman Pangan Tahun Anggaran 2020
                  </div>
                </div>
              </label>
              <Input disabled group name="sourceApi" control={control} />
              <div className="input-group">{/* <span className="source-api">Source Api</span> */}</div>
            </div>
          </Form>
        </div>
        <div className={bem.e('wrapper-result')}>
          <div className="wrapper-data">
            <div className={bem.e('management-table')}>
              <table>
                <thead className="head-table-border">
                  <th width="25%">Field</th>
                  <th width="75%">Value</th>
                </thead>
                <tbody>
                  {LIST_TABLE.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td className="data-title">{data.field}</td>
                        <td className="data-description">{data.value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="wrapper-pagination">
                <ul className="pagination">
                  <li className="page-item">
                    <button className="page-link prev">
                      <Prev />
                    </button>
                  </li>
                  <li className="page-item">
                    <button className="page-link active">1</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link">2</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link">3</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link">4</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link next">
                      <Next />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="wrapper-dcat">
            <div className="wrapper-title">
              <h1>Mapping DCAT</h1>
            </div>
            <div className={bem.e('wrapper-input')}>
              <Row>
                <Col md={12}>
                  <div className="form-group">
                    <label for="Judul"> Nama Walidata Instansi </label>
                    <input type="text" value="API 1" disabled />
                  </div>
                </Col>
                <Col md={12}>
                  <div className="form-group">
                    <label for="Judul"> Email Walidata Instansi</label>
                    <input type="text" value="debbie.baker@example.com" disabled />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="form-group">
                    <label for="Judul"> URL akses file resource (csv/xlx/json) </label>
                    <input type="text" value="data.go.id/api/data" disabled />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group optional">
                    <input type="text" placeholder="(Optional)" disabled />
                  </div>
                </Col>
              </Row>
            </div>
            <div className={bem.e('management-table')}>
              <table>
                <thead className="head-table-border">
                  <th width="20%">No</th>
                  <th width="30%">DCAT Property</th>
                  <th width="30%">Equlvalent</th>
                  <th width="20%">Source API</th>
                </thead>
                <tbody>
                  {LIST_TABLE_DCAT.map((data, index) => {
                    return (
                      <tr>
                        <td className="data-description">{index + 1}</td>
                        <td className="data-description">{data.property}</td>
                        <td className="data-description">{data.equlvalent}</td>
                        <td className="data-description select">
                          <Dropdown
                            group
                            control={control}
                            placeholder={data.property}
                            error={errors.level?.message}
                            options={level.map((lvl) => ({ value: lvl, label: lvl }))}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className={bem.e('wrapper-json')}>
              <span> Output </span>
              <div className="input-group">
                <input type="text" placeholder="https://bappenas.go.id/data.json" />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <CopyJson />
                  </span>
                </div>
              </div>
              <Button variant="json" style={{ width: '180px' }}>
                Download JSON
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal showHeader={false} visible={modalProfile} onClose={() => setModalProfile(false)}>
        <div>
          <p className="mt-20">
            Apakah anda yakin ingin
            <span className="text-danger"> menghapus </span>
            Source API <span className="font-weight-bold">PD00013</span>?
          </p>
          <Form.Group className="mt-40 mb-30">
            <Form.Control as="textarea" placeholder="Tulis Catatan" />
          </Form.Group>
          <div className="d-flex justify-content-end mb-5">
            <Button
              onClick={() => setModalProfile(false)}
              className="ml-24 bg-white sdp-text-grey-dark border-gray-stroke"
              variant="secondary"
              style={{ width: '112px' }}>
              Batal
            </Button>
            <Button className="ml-10" variant="info" style={{ width: '112px' }}>
              Konfirmasi
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ApiDetail;
