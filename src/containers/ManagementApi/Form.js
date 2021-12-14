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

  const handleImport = (e) => {
    console.log(e);

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
            <label for="Judul">
              <div className="wrapper-union">
                <p> Judul </p> <Union />
                <div className="wrapper-desc">
                  Keputusan Direktur Jenderal Tanaman Pangan Nomor 218/HK/310/12/2029 tentang Petunjuk Teknis Bantuan
                  Pemerintah Program Peningkatan Produksi, Produktivitas dan Mutu Tanaman Pangan Tahun Anggaran 2020
                </div>
              </div>
            </label>
            <input type="text" placeholder="" />
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
            <input type="text" placeholder="" />
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
              <input className="custom-file-input" type="file" />
              <div class="input-group-append">Upload</div>
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
                <a href="#">(data-ckan-api.json)</a>
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
              <div className={bem.e('wrapper-input')}>
                <Row>
                  <Col md={12}>
                    <div className="form-group">
                      <label for="Judul"> Nama </label>
                      <input type="text" placeholder="" />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <label for="Judul"> Email </label>
                      <input type="text" placeholder="" />
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
                <Button variant="success" className="my-5" onClick={() => setGenerateOutput(true)}>
                  Generate Output
                </Button>
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
