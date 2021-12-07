import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { ReactComponent as CopyJson } from 'assets/copy-json.svg';

import './index.scss';

const EditApi = () => {
  const history = useHistory();
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
                <button className="btn btn-secondary ml-50" style={{ width: '112px' }} onClick={() => history.goBack()}>
                  Batal
                </button>
                <button className="btn btn-info ml-10" style={{ width: '112px' }}>
                  Simpan
                </button>
              </div>
            </div>
            <div className="wrapper-input">
              <div className="form-group">
                <label for="Judul">Judul</label>
                <div className="box-input">
                  <input type="text" placeholder="Lorem Ipsum" />
                </div>
              </div>
              <div className="form-group">
                <label for="Judul">Deskripsi</label>
                <div className="box-input">
                  <input type="text" placeholder="Lorem Ipsum" />
                </div>
              </div>
              <div className="form-group">
                <label for="Judul">Source API</label>
                <div className="box-input">
                  <input type="text" placeholder="data.go.id/api/data" />
                </div>
              </div>
              <div className="form-group">
                <label for="Judul">Max Data Parameter</label>
                <div className="box-input">
                  <input type="text" placeholder="Dinas Kesehatan DKI Jakarta" />
                </div>
              </div>
              <button className="btn btn-success mt-0">Import</button>
            </div>
            <div className="wrapper-result">
              <div className="wrapper-data">
                <div className="wrapper-title">
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
              <div className="wrapper-dcat">
                <div className="wrapper-title">
                  <h1>Mapping DCAT</h1>
                </div>
                <div className="wrapper-input">
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
                        <input type="text" placeholder="example@mail.com" />
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
                              <Form.Select>
                                <option key={index}>{data.source}</option>
                              </Form.Select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="wrapper-generate">
                  <button className="btn btn-success mb-30 mt-20">Generate Output</button>
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
                <button className="btn btn-json">Download JSON</button>
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
    </div>
  );
};

export default EditApi;
