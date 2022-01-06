import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';
import isFunction from 'lodash/isFunction';
import truncate from 'lodash/truncate';
import { ReadOnlyInputs } from 'components';
import { LeftChevron } from 'components/Icons';
import Modal from 'components/Modal';
import {
  getCMSForumSDIDataById,
  cmsForumSDIGetDetailSelector,
  cmsForumSDIGetLogSelector,
  getCMSForumSDILogById,
} from './reducer';
import { apiUrls, post } from 'utils/request';
import { DetailHeader } from './detailHeader';
import { getStatusClass, prefixID, splitByLastChar } from 'utils/helper';
import RowLoader from 'components/Loader/RowLoader';
import { CMSModal } from 'components/CMSStatusModals';

const CMSForumSDIDetail = () => {
  const [showModal, setShowModal] = useState('');
  const [notes, setNotes] = useState('');
  const [loader, setLoader] = useState(false);
  const [apiError, setAPIError] = useState('');
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const { detailResult, detailError, detailLoading } = useSelector(cmsForumSDIGetDetailSelector);
  const { logResult, logLoading } = useSelector(cmsForumSDIGetLogSelector);

  const status = (detailResult?.status || '').toLowerCase();

  const goBack = () => {
    history.push('/cms/forum-sdi');
  };

  useEffect(() => {
    if (!id) goBack();
    initialCall();
  }, []);

  const initialCall = () => {
    dispatch(getCMSForumSDIDataById(id));
    dispatch(getCMSForumSDILogById(id));
  };

  const handleAPICall = async (method, url, params, callBack) => {
    try {
      setLoader(true);
      await method(url, {}, params);
      handleCloseModal();
      initialCall();
      isFunction(callBack) && callBack();
    } catch (e) {
      handleCloseModal();
      setAPIError(e.message);
    }
  };

  const onKirim = async () => {
    handleAPICall(post, `${apiUrls.cmsForumSDI}/${id}/ubah-status/WAITING_APPROVAL`, { data: { note: '' } });
  };

  const onDelete = async () => {
    handleAPICall(post, `${apiUrls.cmsForumSDI}/${id}/ubah-status/DELETED`, { data: { note: '' } }, goBack);
  };

  const onSetujui = async () => {
    handleAPICall(post, `${apiUrls.cmsForumSDI}/${id}/ubah-status/APPROVED`, { data: { note: '' } });
  };

  const onTolak = async () => {
    handleAPICall(post, `${apiUrls.cmsForumSDI}/${id}/ubah-status/REJECTED`, { data: { note: notes } });
  };

  const onPublish = async () => {
    handleAPICall(post, `${apiUrls.cmsForumSDI}/${id}/ubah-status/PUBLISHED`, { data: { note: '' } });
  };

  const onUnpublish = async () => {
    handleAPICall(post, `${apiUrls.cmsForumSDI}/${id}/ubah-status/UNPUBLISHED`, { data: { note: '' } });
  };

  const handleCloseModal = () => {
    setShowModal('');
    setLoader(false);
  };

  const divClass = getStatusClass(status || '');

  return (
    <div className="cms-forum-sdi-detail-wrapper">
      <div className="d-flex align-items-center">
        <button className="bg-white border-gray-stroke p-10" onClick={goBack}>
          <LeftChevron />
        </button>
        <div className={`br-2 p-12 flex-grow-1 flex-center  ${divClass?.divBG || ''}`}>
          <span className={`fs-14 lh-17 ${divClass?.textColor || ''}`}>{divClass?.text || detailResult?.status || ''}</span>
        </div>
      </div>
      <div className="d-flex">
        <Row className="mt-56 justify-content-md-center">
          <Col xs={12} md={8}>
            <div className="d-flex ml-24 mr-10 mb-20 justify-content-between">
              <div>
                <label className="fw-bold fs-24">Forum SDI</label>
              </div>
              <div>
                {!detailLoading ? (
                  <DetailHeader
                    handleModal={(type) => setShowModal(type)}
                    record={detailResult}
                    history={history}
                    status={status}
                  />
                ) : null}
              </div>
            </div>
            {apiError || detailError ? <label className="sdp-error mb-20">{apiError || detailError}</label> : null}
            <div className="forum-sdi-detail-wrapper">
              <Row className="mb-3 px-24">
                {detailLoading ? (
                  <RowLoader />
                ) : (
                  <ReadOnlyInputs
                    group
                    label="Judul"
                    labelClass="sdp-form-label fw-normal"
                    type="text"
                    value={detailResult?.judul}
                  />
                )}
                {detailLoading ? (
                  <RowLoader />
                ) : (
                  <ReadOnlyInputs
                    group
                    label="Topik"
                    labelClass="sdp-form-label fw-normal"
                    type="text"
                    value={detailResult?.topik}
                  />
                )}
                {detailLoading ? (
                  <RowLoader />
                ) : (
                  <Form.Group as={Col} className="cms-forum-sdi-tag mt-5 mb-24" md="12">
                    <label className="sdp-form-label mb-8">Tag</label>
                    <div className="tag-data d-flex align-items-center bg-gray border-gray-stroke p-9 br-4">
                      {detailResult?.tags.map((elem, index) => (
                        <label className="sdp-text-blue mr-6 bg-light-blue" key={`tag-label-${index}`}>
                          {elem}
                        </label>
                      ))}
                    </div>
                  </Form.Group>
                )}
                {detailLoading ? (
                  <RowLoader />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: detailResult?.isi }} className="mt-44 sdp-text-editor-control" />
                )}
                {detailLoading ? (
                  <RowLoader />
                ) : (
                  <Form.Group as={Col} className="cms-forum-sdi-input mt-5" md="12">
                    <label className="sdp-form-label mb-8">Lampiran</label>
                    <div className="input-data d-flex align-items-center bg-gray border-gray-stroke p-9 br-4">
                      {detailResult?.lampiran.map((elem, index) => (
                        <label className="sdp-text-blue bg-light-blue mr-10" key={`topik-label-${index}`}>
                          {truncate(splitByLastChar(elem.fileName, '_'))}
                        </label>
                      ))}
                    </div>
                  </Form.Group>
                )}
              </Row>
            </div>
          </Col>
          <Col xs={12} md={3}>
            <label className="fs-20 lh-25 mb-20 fw-bold">Log Status</label>
            {logLoading ? (
              <RowLoader />
            ) : (
              (logResult || []).map((item, index) => {
                const status = (item?.status || '').toLowerCase();
                const classDetail = getStatusClass(status);
                return (
                  <div className="mb-24" key={`log-record-${index}`}>
                    <div className="d-flex align-items-center">
                      <span className="fs-14 lh-17 mr-5 sdp-text-black-dark mw-fit-content">
                        {moment(item.createdAt).format('DD MMMM YYYY')}
                      </span>
                      <div className="border-gray-stroke h-0 w-100" />
                    </div>
                    <div className="d-flex mt-12  ">
                      <div className={`br-2 py-4 px-6 mr-8 h-fit-content ${classDetail?.divBG || ''}`}>
                        <span className={`fs-14 lh-17 ${classDetail?.textColor || ''}`}>
                          {classDetail?.text || item.status}
                        </span>
                      </div>
                      <span className="sdp-text-disable">{item.displayMessage}</span>
                    </div>
                  </div>
                );
              })
            )}
          </Col>
        </Row>
      </div>
      {showModal === 'kirim' && (
        <CMSModal onClose={handleCloseModal} label="Kirim Forum SDI?" loader={loader} confirmButtonAction={onKirim} />
      )}
      {showModal === 'setujui' && (
        <CMSModal
          onClose={handleCloseModal}
          label={
            <>
              Apakah anda yakin ingin <span className="sdp-text-blue">menyetujui</span> Forum SDI <b>{prefixID(id, '')}</b>?
            </>
          }
          loader={loader}
          confirmButtonAction={onSetujui}
        />
      )}
      {showModal === 'delete' && (
        <CMSModal
          onClose={handleCloseModal}
          label={
            <>
              Apakah anda yakin ingin <span className="sdp-error">menghapus</span> Forum <b>{prefixID(id, '')}</b>?
            </>
          }
          loader={loader}
          confirmButtonAction={onDelete}
        />
      )}
      {showModal === 'publish' && (
        <CMSModal
          onClose={handleCloseModal}
          label={
            <>
              Apakah anda yakin ingin <span className="sdp-text-blue">mempublish</span> Forum <b>{prefixID(id, 'PD')}</b>?
            </>
          }
          loader={loader}
          confirmButtonAction={onPublish}
        />
      )}
      {showModal === 'unPublish' && (
        <CMSModal
          onClose={handleCloseModal}
          label={
            <>
              Apakah anda yakin ingin <span className="sdp-text-blue">batal terbitkan</span> Forum{' '}
              <b>{prefixID(id, 'KA')}</b>?
            </>
          }
          loader={loader}
          confirmButtonAction={onUnpublish}
        />
      )}
      {showModal === 'tolak' && (
        <Modal visible={true} onClose={handleCloseModal} title="" showHeader={false} centered={true}>
          Apakah anda yakin ingin <span className="sdp-text-red">menolak</span> Forum <b>{prefixID(id, 'PD')}</b>?
          <textarea
            placeholder="Tulis Catatan"
            name="catatan"
            value={notes}
            onChange={({ target: { value = '' } = {} }) => setNotes(value)}
            className="border-gray-stroke br-4 w-100 mt-24 mb-24 h-214"
            required
          />
          <div className="d-flex justify-content-end">
            <Button className="br-4 mr-8 px-57 py-13 bg-transparent" variant="light" onClick={handleCloseModal}>
              Batal
            </Button>
            <Button className="br-4 px-39 py-13" variant="info" disabled={!notes.trim()} onClick={onTolak}>
              {loader && (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-10" />
              )}
              Konfirmasi
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CMSForumSDIDetail;
