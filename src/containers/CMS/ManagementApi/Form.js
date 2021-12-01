import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { ReactComponent as Union } from 'assets/union.svg';
import { ReactComponent as CopyJson } from 'assets/copy-json.svg';

import './index.scss';

const ApiForm = () => {
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
  return (
    <div className="management-api form">
      <div className="container">
        <div className="header-form">
          <h1>Buat API Baru</h1>
          <button className="btn btn-secondary ml-50" style={{ width: '112px' }}>
            Batal
          </button>
          <button className="btn btn-info ml-10" style={{ width: '112px' }}>
            Simpan
          </button>
        </div>
      </div>
      <Row className="wrapper-input-row">
        <Col md={8}>
          <div className="wrapper-input">
            <div className="form-group">
              <label for="Judul">Judul</label>
              <div className="box-input">
                <input type="text" placeholder="" />
                <div className="wrapper-union">
                  <Union />
                  <div className="wrapper-desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat.
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label for="Judul">Judul</label>
              <div className="box-input">
                <input type="text" placeholder="" />
                <div className="wrapper-union">
                  <Union />
                  <div className="wrapper-desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat.
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label for="Judul">Source Api</label>
              <div className="box-input">
                <div className="input-group">
                  <input className="custom-file-input" type="file" />
                  <div class="input-group-append">Upload</div>
                </div>
                <div className="wrapper-union">
                  <Union />
                  <div className="wrapper-desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat.
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label for="Judul">Max Data Parameter</label>
              <div className="box-input">
                <input
                  type="text"
                  placeholder="Kemenhub Berbagi Pengalaman Penanganan Covid-19 Sektor Transportasi Di Forum ASEAN-Republik Korea ke-11"
                />
                <div className="wrapper-union">
                  <Union />
                  <div className="wrapper-desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat.
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-success">Import</button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
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
                <button className="btn btn-success my-5">Generate Output</button>
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
      </Row>
    </div>
  );
};

export default ApiForm;
