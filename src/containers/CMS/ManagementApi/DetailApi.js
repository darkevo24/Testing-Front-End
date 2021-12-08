import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import { Modal, Dropdown } from 'components';
import { ReactComponent as CopyJson } from 'assets/copy-json.svg';
import { ReactComponent as IconEdit } from 'assets/cms-api-edit.svg';
import { ReactComponent as IconDelete } from 'assets/cms-api-delete.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './index.scss';

const DetailApi = () => {
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
  ];

  const LIST_LOG = [
    {
      date: '12 Desember 2021',
      status: 'Perbarui',
      description: 'Dataset sudah dapat di akses di portal data.go.id',
    },
    {
      date: '10 Desember 2021',
      status: 'Perbarui',
      description: 'Dataset sudah dapat di akses di portal data.go.id',
    },
    {
      date: '08 Desember 2021',
      status: 'Perbarui',
      description: 'Dataset sudah dapat di akses di portal data.go.id',
    },
    {
      date: '08 Desember 2021',
      status: 'Dibuat',
      description: 'Dataset sudah dapat di akses di portal data.go.id',
    },
  ];

  return (
    <div className="management-api log">
      <div className="container">
        <Row>
          <Col md={8}>
            <div className="header-log">
              <h1>Detail API</h1>
              <div className="wrapper-icon">
                <IconDelete onClick={() => setModalProfile(true)} />
                <IconEdit onClick={() => history.push('/cms/api/edit/api-1')} />
              </div>
            </div>
            <div className="wrapper-input pb-10">
              <div className="form-group">
                <label for="Judul">Judul</label>
                <div className="box-input">
                  <input type="text" placeholder="Lorem Ipsum" disabled />
                </div>
              </div>
              <div className="form-group">
                <label for="Judul">Deskripsi</label>
                <div className="box-input">
                  <input type="text" placeholder="Lorem Ipsum" disabled />
                </div>
              </div>
              <div className="form-group">
                <label for="Judul">Source API</label>
                <div className="box-input">
                  <input type="text" placeholder="data.go.id/api/data" disabled />
                </div>
              </div>
              {/* <div className="form-group">
                <label for="Judul">Source Api</label>
                <div className="box-input">
                  <div className="input-group">
                    <input className="custom-file-input" type="file" />
                    <div class="input-group-append">Upload</div>
                  </div>
                </div>
              </div> */}
              <div className="form-group">
                <label for="Judul">Max Data Parameter</label>
                <div className="box-input">
                  <input type="text" placeholder="Dinas Kesehatan DKI Jakarta" disabled />
                </div>
              </div>
            </div>
            <div className="wrapper-result">
              <div className="wrapper-data pt-0">
                <div className="wrapper-title p-0">
                  <h1>Source API</h1>
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
                </div>
              </div>
              <div className="wrapper-dcat pb-30">
                <div className="wrapper-title pt-20 pb-0">
                  <h1>Mapping DCAT</h1>
                </div>
                <div className="wrapper-input pb-0">
                  <Row>
                    <Col md={6}>
                      <div className="form-group">
                        <label for="Judul"> Nama </label>
                        <input type="text" placeholder="" />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label for="Judul"> Email </label>
                        <input type="text" placeholder="example@mail.com" disabled />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="form-group">
                        <label for="Judul"> File Download URL </label>
                        <input type="text" placeholder="data.go.id/api/data" />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group optional">
                        <input type="text" placeholder="(Optional)" />
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="management-table pt-0">
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
                <Button variant="json" style={{ width: '180px' }}>
                  Download Json
                </Button>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="wrapper-log">
              <h1>Log Status</h1>
              {LIST_LOG.map((data, index) => {
                return (
                  <div key={index} className="card-log mb-20">
                    <p className="date">{data.date}</p>
                    <div className="d-flex align-items-center pt-15">
                      <span className={data.status === 'Perbarui' ? 'status-update' : 'status-create'}>{data.status}</span>
                      <span className="description">{data.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
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

export default DetailApi;
