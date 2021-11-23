import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { useHistory } from 'react-router-dom';

import { LogStatus } from 'components/Sidebars/LogStatus';
import { Input, TextEditor, Loader } from 'components';
import bn from 'utils/bemNames';
import { ReactComponent as EditIcon } from 'assets/pencil.svg';

import { useSelector, useDispatch } from 'react-redux';
import {
  getAboutUs,
  getAboutUsLogs,
  setTitle,
  setContent,
  setVideoUrl,
  setEditable,
  updateAboutUs,
  doAboutUs,
} from './reducer';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const bem = bn('content-detail');

const schema = yup
  .object({
    title: yup.string().required(),
    category: yup.mixed().required(),
    thumbnail: yup.mixed().required(),
  })
  .required();

const CMSAboutUsEdit = (props) => {
  let dispatch = useDispatch();
  let id = props.match.params.id;
  let data = useSelector((state) => state.cms.aboutUsDetail);
  let monthList = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  let dataLog = useSelector((state) =>
    state.cms.aboutUsDetail.logs.records.map((item) => {
      return {
        date: [item.action_at.getDate(), monthList[item.action_at.getMonth()], item.action_at.getFullYear()].join(' '),
        status: item.status,
        content: item.action,
      };
    }),
  );

  const fetchData = () => {
    dispatch(getAboutUs(id));
    dispatch(getAboutUsLogs(id));
  };

  useEffect(() => fetchData(), []);

  const history = useHistory();

  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const askConfirmation = (message) => {
    return window.confirm(message);
  };

  return (
    <>
      <Row className={bem.e('section')}>
        <Col sm={8}>
          <div>
            <div className="d-flex justify-content-between mb-4">
              <div className={bem.e('title')}>About Us</div>
              <div>
                {data.canEdit ? (
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
                          ? dispatch(
                              updateAboutUs({
                                id: data.id,
                                title: data.new_title || data.title,
                                content: data.new_content || data.content,
                                video_url: data.new_video_url || data.video_url,
                              }),
                            ).then(() => fetchData())
                          : null
                      }>
                      Simpan
                    </Button>
                  </>
                ) : (
                  <>
                    {data.current_data_status === 'DRAFT' ||
                    data.current_data_status === 'MENUNGGU_PERSETUJUAN' ||
                    data.current_data_status === 'TIDAK_DITAYANGKAN' ||
                    data.current_data_status === 'DITOLAK' ? (
                      <Button variant="secondary" onClick={(e) => dispatch(setEditable(true))}>
                        <EditIcon />
                      </Button>
                    ) : (
                      ''
                    )}

                    {data.current_data_status === 'DRAFT' || data.current_data_status === 'DITOLAK' ? (
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
                    {data.current_data_status === 'MENUNGGU_PERSETUJUAN' ? (
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
                    {data.current_data_status === 'DISETUJUI' || data.current_data_status === 'TIDAK_DITAYANGKAN' ? (
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
                    {data.current_data_status === 'DITAYANGKAN' ? (
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
            <Form>
              <Form.Group>
                <Form.Label>Link Video</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={data.video_url}
                  name="video_url"
                  disabled={!data.canEdit}
                  onChange={(e) => dispatch(setVideoUrl(e.target.value))}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Judul</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={data.title}
                  name="video_url"
                  disabled={!data.canEdit}
                  onChange={(e) => dispatch(setTitle(e.target.value))}
                />
              </Form.Group>
              <Form.Group controlId="content">
                <Form.Label>Isi</Form.Label>
                <TextEditor defaultValue={data.content} disabled={!data.canEdit} onChange={(e) => dispatch(setContent(e))} />
              </Form.Group>
            </Form>
          </div>
        </Col>
        <Col sm={3}>
          <LogStatus data={dataLog} />
        </Col>
      </Row>
      {data.status === 'loading' ? <Loader fullscreen={true} /> : ''}
    </>
  );
};

export default CMSAboutUsEdit;
