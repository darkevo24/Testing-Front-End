import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useHistory } from 'react-router-dom';

import { LogStatus } from 'components/Sidebars/LogStatus';
import { TextEditor, Loader, CMSTopDetail } from 'components';
import bn from 'utils/bemNames';
import { ReactComponent as EditIcon } from 'assets/pencil.svg';

import { useSelector, useDispatch } from 'react-redux';
import {
  getAboutUs,
  getAboutUsLogs,
  updateAboutUs,
  doAboutUs,
  tentangDetailSelector,
  logDatasetSelector,
} from '../AboutUs/reducer';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { formatDate } from 'utils/helper';
import { STATUS_DATA } from 'utils/constants';

const bem = bn('content-detail');
//
// const schema = yup
//   .object({
//     title: yup.string().required(),
//     category: yup.mixed().required(),
//     thumbnail: yup.mixed().required(),
//   })
//   .required();

const CMSAboutUsEdit = (props) => {
  let dispatch = useDispatch();
  let id = props.match.params.id;
  const { record: data, loading } = useSelector(tentangDetailSelector);
  const { records: dataLog, loading: loadingLog } = useSelector(logDatasetSelector);
  const [canEdit, setCanEdit] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchData = () => {
    dispatch(getAboutUs(id));
    dispatch(getAboutUsLogs(id));
    setCanEdit(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const history = useHistory();

  // const {
  //   // control,
  //   // formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });

  const askConfirmation = (message) => {
    return window.confirm(message);
  };

  return (
    <>
      <CMSTopDetail status={data?.status?.toLowerCase()} />
      <Row className={bem.e('section')}>
        <Col sm={8}>
          <div>
            <div className="d-flex justify-content-between mb-4">
              <div className={bem.e('title')}>About Us</div>
              <div>
                {canEdit ? (
                  <>
                    <Button
                      className="ml-10"
                      variant="secondary"
                      style={{ width: '112px' }}
                      onClick={() => (askConfirmation('Batalkan perubahan?') ? history.goBack() : null)}>
                      Batal
                    </Button>
                    <Button
                      className="ml-10"
                      variant="secondary"
                      style={{ width: '112px' }}
                      onClick={() =>
                        askConfirmation('Simpan perubahan?')
                          ? dispatch(updateAboutUs(formData)).then(() => fetchData())
                          : null
                      }>
                      Simpan
                    </Button>
                  </>
                ) : (
                  <>
                    {data.status === STATUS_DATA.draft ||
                    data.status === STATUS_DATA.waitingApproval ||
                    data.status === STATUS_DATA.unpublished ||
                    data.status === STATUS_DATA.rejected ? (
                      <Button variant="secondary" onClick={(e) => setCanEdit(true)}>
                        <EditIcon />
                      </Button>
                    ) : (
                      ''
                    )}

                    {data.status === STATUS_DATA.draft || data.status === STATUS_DATA.rejected ? (
                      <Button
                        className="ml-10"
                        variant="info"
                        style={{ width: '112px' }}
                        onClick={() =>
                          askConfirmation('Kirim tentang?')
                            ? dispatch(doAboutUs({ id: data.id, action: 'kirim' })).then(() => history.goBack())
                            : null
                        }>
                        Kirim
                      </Button>
                    ) : (
                      ''
                    )}
                    {data.status === STATUS_DATA.waitingApproval ? (
                      <>
                        <Button
                          className="ml-10"
                          variant="secondary"
                          style={{ width: '112px' }}
                          onClick={() =>
                            askConfirmation('Tolak tentang?')
                              ? dispatch(doAboutUs({ id: data.id, action: 'tolak' })).then(() => history.goBack())
                              : null
                          }>
                          Tolak
                        </Button>
                        <Button
                          className="ml-10"
                          variant="info"
                          style={{ width: '112px' }}
                          onClick={() =>
                            askConfirmation('Setujui tentang?')
                              ? dispatch(doAboutUs({ id: data.id, action: 'setujui' })).then(() => history.goBack())
                              : null
                          }>
                          Setujui
                        </Button>
                      </>
                    ) : (
                      ''
                    )}
                    {data.status === STATUS_DATA.approved || data.status === STATUS_DATA.unpublished ? (
                      <>
                        <Button
                          className="ml-10"
                          variant="info"
                          style={{ width: '112px' }}
                          onClick={() =>
                            askConfirmation('Publish tentang?')
                              ? dispatch(doAboutUs({ id: data.id, action: 'publish' })).then(() => history.goBack())
                              : null
                          }>
                          Publish
                        </Button>
                      </>
                    ) : (
                      ''
                    )}
                    {data.status === STATUS_DATA.published ? (
                      <>
                        <Button
                          className="ml-10"
                          variant="secondary"
                          style={{ width: '112px' }}
                          onClick={() =>
                            askConfirmation('Unpublish tentang?')
                              ? dispatch(doAboutUs({ id: data.id, action: 'unpublish' })).then(() => history.goBack())
                              : null
                          }>
                          Unpublish
                        </Button>
                      </>
                    ) : (
                      ''
                    )}
                  </>
                )}
              </div>
            </div>
            {loading ? null : (
              <Form>
                <Form.Group className="mb-3 mt-3">
                  <Form.Label>Link Video</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={data.video}
                    name="video_url"
                    disabled={!canEdit}
                    onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Judul</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={data.judul}
                    name="video_url"
                    disabled={!canEdit}
                    onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Isi</Form.Label>
                  <TextEditor
                    defaultValue={data.isi}
                    disabled={!canEdit}
                    onChange={(e) => setFormData({ ...formData, isi: e })}
                  />
                </Form.Group>
              </Form>
            )}
          </div>
        </Col>
        <Col sm={3}>{loadingLog ? null : <LogStatus data={dataLog} />}</Col>
      </Row>
      {loading || loadingLog ? <Loader fullscreen={true} /> : ''}
    </>
  );
};

export default CMSAboutUsEdit;
