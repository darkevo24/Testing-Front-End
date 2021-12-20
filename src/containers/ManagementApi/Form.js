import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import { ReactComponent as CopyJson } from 'assets/copy-json.svg';
import { ReactComponent as Arrow } from 'assets/arrow-left-add.svg';
import { ReactComponent as Union } from 'assets/union.svg';
import { ReactComponent as Prev } from 'assets/prev.svg';
import { ReactComponent as Next } from 'assets/next.svg';
import { Dropdown } from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import bn from 'utils/bemNames';

const bem = bn('management-api');

const FormApi = () => {
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

  const handleImport = () => {
    // If Success Import
    setDetailImport(true);
  };
  return (
    <div className="sdp-management-api add">
      <div className="container">
        <div className={bem.e('header-add')}>
          <div className="header-left">
            <Arrow onClick={() => history.push('/api')} />
            <p> Tambah Api </p>
          </div>
          {detailImport ? (
            <div className="header-right">
              <Button variant="secondary" className="mr-10" onClick={() => setDetailImport(false)}>
                Batal
              </Button>
              <Button variant="info">Simpan</Button>
            </div>
          ) : (
            <div className="header-right">
              <Button variant="secondary" disabled>
                Simpan
              </Button>
            </div>
          )}
        </div>
        <div className={bem.e('wrapper-input')}>
          <div className="form-group">
            <label htmlFor="Judul">
              <div className="wrapper-union">
                <p> Judul </p> <Union />
                <div className="wrapper-desc"> Judul API yang akan disesuaikan dengan field DCAT. </div>
              </div>
            </label>
            <input type="text" placeholder="" />
          </div>
          <div className="form-group">
            <label htmlFor="Judul">
              <div className="wrapper-union">
                <p> Deskripsi </p> <Union />
                <div className="wrapper-desc"> Deskripsi API, penjelasan mengenai data yang akan diintegrasikan. </div>
              </div>
            </label>
            <input type="text" placeholder="" />
          </div>
          <div className="form-group">
            <label htmlFor="Judul">
              <div className="wrapper-union">
                <p> Source API </p> <Union />
                <div className="wrapper-desc"> URL link endpoint json </div>
              </div>
            </label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="Judul">
              <div className="wrapper-union">
                <p> Max Data Parameter </p> <Union />
                <div className="wrapper-desc"> Nilai maksimum data per page, misal: 1000 </div>
              </div>
            </label>
            <input type="text" placeholder="1000" />
          </div>
          <Button variant="success" style={{ width: '112px;' }} onClick={handleImport}>
            Import
          </Button>
        </div>
        {detailImport && (
          <div className={bem.e('wrapper-result')}>
            <div className="wrapper-data">
              <div className="wrapper-title">
                <h1>Data</h1>
                <button>(data-ckan-api.json)</button>
              </div>
              <div className={bem.e('management-table pt-0')}>
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
                      <label htmlFor="Judul"> Nama </label>
                      <input type="text" placeholder="" />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <label htmlFor="Judul"> Email </label>
                      <input type="text" placeholder="" />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <label htmlFor="Judul"> File Download URL </label>
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
                <Button variant="success" className="my-5" onClick={() => setGenerateOutput(true)}>
                  Generate Output
                </Button>
              </div>
              {generateOutput && (
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
                  <Button variant="json">Download JSON</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormApi;
