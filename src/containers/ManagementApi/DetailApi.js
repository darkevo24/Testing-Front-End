import { useState, useMemo, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import keys from 'lodash/keys';
import size from 'lodash/size';
import has from 'lodash/has';
import ReactJson from 'react-json-view';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useForm } from 'react-hook-form';
import bn from 'utils/bemNames';
import { useDispatch, useSelector } from 'react-redux';
import { isArrayWithLength, copyToClipboard } from 'utils/helper';
import { ReactComponent as CopyJson } from 'assets/copy-json.svg';
import { ReactComponent as Arrow } from 'assets/arrow-left-add.svg';
import { ReactComponent as Union } from 'assets/union.svg';
import { Modal, Dropdown, Input, Loader, Notification } from 'components';
import Pagination from 'components/Pagination';
import { getMangementApiDetial, portalApiDetailSelector, generatePortalApi } from './reducer';
const bem = bn('management-api');

const ApiDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPageContent, setCurrentPageContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [outputUrl, setOutputUrl] = useState(null);
  const { content } = useSelector(portalApiDetailSelector);
  const data = useMemo(() => content || {}, [content]);
  const objectKeys = useMemo(() => {
    if (has(data, 'dataSource')) return keys(data?.dataSource[0]);
    return [];
  }, [data]);

  const dcatproperties = useMemo(() => {
    if (size(content?.dcatproperties) > 0) return content?.dcatproperties;
    return [];
  }, [content]);

  const fetchApiDetail = () => {
    return dispatch(getMangementApiDetial(id));
  };

  useEffect(() => {
    reset(data);
  }, [data]);

  useEffect(() => {
    if (!isEmpty(data)) {
      const { dataSource = [] } = data;
      if (isArrayWithLength(dataSource)) {
        setTotalPages(dataSource.length);
        setCurrentPageContent(dataSource[currentPage]);
      } else {
        setTotalPages(0);
        setCurrentPageContent(null);
      }
    }
  }, [data, currentPage]);

  const changePage = (props) => {
    setCurrentPage(props.page);
  };
  useEffect(() => {
    fetchApiDetail();
  }, []);

  const {
    control,
    reset,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      ...data,
    },
  });

  const handleGenerate = (value) => {
    const { dcatproperties } = value;
    const filteredDataProperty = dcatproperties.map((item) => {
      const { equivalent, jsonKey, sourceApiKey } = item;
      return {
        equivalent,
        jsonKey,
        sourceApiKey: sourceApiKey?.value || '',
      };
    });
    const payload = {
      id,
      dcatproperties: filteredDataProperty,
    };

    dispatch(generatePortalApi({ payload })).then((res) => {
      if (res.payload) {
        Notification.show({
          type: 'success',
          message: <div>Berhasil Generate API</div>,
          icon: 'check',
        });
        const { outputUrl } = res.payload;
        setOutputUrl(outputUrl);
      } else {
        Notification.show({
          type: 'secondary',
          message: <div>Gagal Generate API</div>,
          icon: 'cross',
        });
      }
    });
  };
  const handleCopy = () => {
    copyToClipboard(outputUrl);
    Notification.show({
      type: 'success',
      message: <div>Disalin ke papan klip</div>,
      icon: 'check',
    });
  };
  const onDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = outputUrl;
    downloadLink.download = 'output.json';
    downloadLink.click();
  };

  const history = useHistory();
  const [modalProfile, setModalProfile] = useState(false);
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
            {/*Put the scroll bar always on the bottom*/}
            {isObject(currentPageContent) && (
              <div className="scroll-view">
                <ReactJson className="json-viwer" src={currentPageContent} theme="monokai" />
              </div>
            )}
            {data?.dataSource?.length > 0 && <Pagination totalPages={totalPages} onChangePage={changePage} />}
          </div>
          <div className="wrapper-dcat">
            <div className="wrapper-title">
              <h1>Mapping DCAT</h1>
            </div>
            <div className={bem.e('wrapper-input')}>
              <Form className="sdp-form" noValidate>
                <Row>
                  <Col md={12}>
                    <div className="form-group">
                      <label for="Judul"> Nama Walidata Instansi </label>
                      <Input disabled group name="userName" control={control} />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <label for="Judul"> Email Walidata Instansi</label>
                      <Input disabled group name="email" control={control} />
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
              </Form>
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
                  {dcatproperties.length &&
                    dcatproperties.map((dcat, index) => {
                      return (
                        <tr>
                          <td className="data-description">{index + 1}</td>
                          <td className="data-description">{dcat.jsonKey}</td>
                          <td className="data-description">{dcat.equivalent}</td>
                          <td className="data-description select">
                            <Dropdown
                              required
                              group
                              name={`dcatproperties[${index}].sourceApiKey`}
                              control={control}
                              placeholder={'Select'}
                              error={errors.level?.message}
                              options={objectKeys.map((lvl) => ({ value: lvl, label: lvl }))}
                              defaultValues={dcatproperties.find((level) => level.value === data.level)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <Button
                variant="success"
                className="mb-10"
                disabled={!isDirty || !isValid}
                onClick={handleSubmit(handleGenerate)}>
                Generate
              </Button>
            </div>
            <div className={bem.e('wrapper-json')}>
              <span> Output </span>
              <div className="input-group">
                <input
                  type="text"
                  id="outputUrl"
                  placeholder="https://bappenas.go.id/data.json"
                  value={outputUrl}
                  disabled
                />
                {!isEmpty(outputUrl) && (
                  <div className="input-group-append">
                    <span className="input-group-text" onClick={handleCopy}>
                      <CopyJson />
                    </span>
                  </div>
                )}
              </div>
              <Button variant="json" disabled={isEmpty(outputUrl)} onClick={onDownload}>
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
              variant="secondary">
              Batal
            </Button>
            <Button className="ml-10" variant="info">
              Konfirmasi
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ApiDetail;
