import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ReactComponent as Union } from 'assets/union.svg';
import { ReactComponent as CopyJson } from 'assets/copy-json.svg';
import { Dropdown } from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import bn from 'utils/bemNames';

const bem = bn('cms-api');

const ApiForm = () => {
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

  const [detailImport, setDetailImport] = useState(false);
  const [generateOutput, setGenerateOutput] = useState(false);
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
    <div className="sdp-cms-api form">
      <div className="header-form">
        <h1>Buat API Baru</h1>
        <Button className="ml-50" variant="secondary" style={{ width: '112px' }} onClick={() => history.goBack()}>
          Batal
        </Button>
        <Button className="ml-10" variant="info" style={{ width: '112px' }}>
          Simpan
        </Button>
      </div>
      <Row className={bem.e('wrapper-input row')}>
        <Col md={8}>
          <div className={bem.e('wrapper-input pb-0')}>
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
            <Button variant="success" style={{ width: '112px' }} onClick={() => setDetailImport(true)}>
              Import
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          {detailImport && (
            <div className="wrapper-result">
              <div className="wrapper-data">
                <div className="wrapper-title">
                  <h1>Source API</h1>
                  <a href="#">(data-ckan-api.json)</a>
                </div>
                <div className={bem.e('management-table')}>
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
                <div className={bem.e('wrapper-input')}>
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
                <div className="wrapper-generate">
                  <Button variant="success" onClick={() => setGenerateOutput(true)}>
                    Generate Output
                  </Button>
                </div>
              </div>
              {generateOutput && (
                <div className={bem.e('wrapper-json')}>
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
              )}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ApiForm;
