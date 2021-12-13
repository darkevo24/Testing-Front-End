import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { LogStatus } from 'components/Sidebars/LogStatus';
import { Dropdown } from 'components';
import { ReactComponent as CopyJson } from 'assets/copy-json.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import bn from 'utils/bemNames';

const bem = bn('cms-api');

const EditApi = () => {
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

  const dataLog = [
    {
      createdAt: new Date().getDate(),
      date: '08 Desember 2021',
      status: 'Selesai',
      content: 'Dataset sudah dapat di akses di portal data.go.id',
    },
    {
      createdAt: new Date().getDate(),
      date: '08 Desember 2021',
      status: 'Selesai',
      content: 'Dataset sudah dapat di akses di portal data.go.id',
    },
    {
      createdAt: new Date().getDate(),
      date: '08 Desember 2021',
      status: 'Terkirim',
      content: 'Dataset sudah dapat di akses di portal data.go.id',
    },
    {
      createdAt: new Date().getDate(),
      date: '08 Desember 2021',
      status: 'Diproses',
      content: 'Dataset sudah dapat di akses di portal data.go.id',
    },
    {
      createdAt: new Date().getDate(),
      date: '08 Desember 2021',
      status: 'Dibuat',
      content: 'Dataset sudah dapat di akses di portal data.go.id',
    },
  ];

  return (
    <div className="sdp-cms-api log">
      <div className="container">
        <Row>
          <Col md={8}>
            <div className="header-log">
              <h1>Detail API</h1>
              <div className="wrapper-icon">
                <Button className="ml-50" variant="secondary" style={{ width: '112px' }} onClick={() => history.goBack()}>
                  Batal
                </Button>
                <Button className="ml-10" variant="info" style={{ width: '112px' }}>
                  Simpan
                </Button>
              </div>
            </div>
            <div className={bem.e('wrapper-input')}>
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
              <Button className="mt-10" variant="success" style={{ width: '112px' }}>
                Import
              </Button>
            </div>
            <div className="wrapper-result">
              <div className="wrapper-data">
                <div className="wrapper-title pt-0 pb-20">
                  <h1>Source API</h1>
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
                </div>
              </div>
              <div className="wrapper-dcat">
                <div className="wrapper-title">
                  <h1>Mapping DCAT</h1>
                </div>
                <div className={bem.e('wrapper-input pt-0')}>
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
                <div className={bem.e('management-table pt-0')}>
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
                  <Button className="mt-20 mb-20" variant="success">
                    Generate Output
                  </Button>
                </div>
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
                  Download Json
                </Button>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <LogStatus data={dataLog} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EditApi;