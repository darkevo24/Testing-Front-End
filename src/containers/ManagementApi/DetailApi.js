import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ReactComponent as CopyJson } from 'assets/copy-json.svg';
import { ReactComponent as Arrow } from 'assets/arrow-left-add.svg';
import { ReactComponent as Union } from 'assets/union.svg';
import { ReactComponent as Prev } from 'assets/prev.svg';
import { ReactComponent as Next } from 'assets/next.svg';
import { Modal, Dropdown } from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './index.scss';

const ApiDetail = () => {
  const schema = yup
    .object({
      nama: yup.string().required(),
      kode: yup.string().required(),
      level: yup.mixed().required(),
    })
    .required();

  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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
    <div className="management-api add">
      <div className="container">
        <div className="header-add">
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
        <div className="wrapper-input">
          <div className="form-group">
            <label for="Judul">
              <div className="wrapper-union">
                <p> Judul </p> <Union />
                <div className="wrapper-desc">
                  Keputusan Direktur Jenderal Tanaman Pangan Nomor 218/HK/310/12/2029 tentang Petunjuk Teknis Bantuan
                  Pemerintah Program Peningkatan Produksi, Produktivitas dan Mutu Tanaman Pangan Tahun Anggaran 2020
                </div>
              </div>
            </label>
            <input type="text" value="Gilghashi Dullahaim" disabled />
          </div>
          <div className="form-group">
            <label for="Judul">
              <div className="wrapper-union">
                <p> Deskripsi </p> <Union />
                <div className="wrapper-desc">
                  Keputusan Direktur Jenderal Tanaman Pangan Nomor 218/HK/310/12/2029 tentang Petunjuk Teknis Bantuan
                  Pemerintah Program Peningkatan Produksi, Produktivitas dan Mutu Tanaman Pangan Tahun Anggaran 2020
                </div>
              </div>
            </label>
            <input
              type="text"
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu morbi mi eget nullam. Ante etiam pharetra, quis viverra."
              disabled
            />
          </div>
          <div className="form-group">
            <label for="Judul">
              <div className="wrapper-union">
                <p> Source API </p> <Union />
                <div className="wrapper-desc">
                  Keputusan Direktur Jenderal Tanaman Pangan Nomor 218/HK/310/12/2029 tentang Petunjuk Teknis Bantuan
                  Pemerintah Program Peningkatan Produksi, Produktivitas dan Mutu Tanaman Pangan Tahun Anggaran 2020
                </div>
              </div>
            </label>
            <div className="input-group">
              <input className="custom-file-input detail" type="file" disabled />
              <span className="source-api">Source Api</span>
            </div>
          </div>
          <div className="form-group">
            <label for="Judul">
              <div className="wrapper-union">
                <p> Max Data Parameter </p> <Union />
                <div className="wrapper-desc">
                  Keputusan Direktur Jenderal Tanaman Pangan Nomor 218/HK/310/12/2029 tentang Petunjuk Teknis Bantuan
                  Pemerintah Program Peningkatan Produksi, Produktivitas dan Mutu Tanaman Pangan Tahun Anggaran 2020
                </div>
              </div>
            </label>
            <input type="text" value="10000" disabled />
          </div>
        </div>
        <div className="wrapper-result">
          <div className="wrapper-data">
            <div className="wrapper-title">
              <h1>Data</h1>
              <a href="#">(data-ckan-api.json)</a>
            </div>
            <div className="management-table">
              <table>
                <thead className="head-table-border">
                  <th width="25%">Field</th>
                  <th width="75%">Value</th>
                </thead>
                <tbody>
                  {LIST_TABLE.map((data) => {
                    return (
                      <tr>
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
                    <a className="page-link prev" href="#">
                      <Prev />
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link active" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      4
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link next" href="#">
                      <Next />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="wrapper-dcat">
            <div className="wrapper-title">
              <h1>Mapping DCAT</h1>
            </div>
            <div className="wrapper-input">
              <Row>
                <Col md={12}>
                  <div className="form-group">
                    <label for="Judul"> Nama </label>
                    <input type="text" value="API 1" disabled />
                  </div>
                </Col>
                <Col md={12}>
                  <div className="form-group">
                    <label for="Judul"> Email </label>
                    <input type="text" value="debbie.baker@example.com" disabled />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="form-group">
                    <label for="Judul"> File Download URL </label>
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
            <div className="management-table">
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
            <div className="wrapper-json">
              <span> Output </span>
              <div className="input-group">
                <input type="text" placeholder="https://bappenas.go.id/data.json" />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <CopyJson />
                  </span>
                </div>
              </div>
              <Button variant="json" style={{ width: '180px;' }}>
                Download JSON
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal visible={modalProfile} onClose={() => setModalProfile(false)}>
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
