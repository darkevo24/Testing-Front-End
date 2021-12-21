import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';
import { ReadOnlyInputs } from 'components';
import { LeftChevron } from 'components/Icons';
import Modal from 'components/Modal';
import { getCMSForumSDIDataById, cmsForumSDIGetDetailSelector } from './reducer';
import { apiUrls, deleteRequest, post } from 'utils/request';
import { DetailHeader } from './detailHeader';
import { getStatusClass, prefixID } from 'utils/helper';
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
  };

  const handleAPICall = async (method, url, params) => {
    try {
      setLoader(true);
      await method(url, {}, params);
      handleCloseModal();
      initialCall();
    } catch (e) {
      handleCloseModal();
      setAPIError(e.message);
    }
  };

  const onKirim = async () => {
    handleAPICall(post, `${apiUrls.cmsForumSDI}/${id}/ubah-status/WAITING_APPROVAL`, { data: { note: '' } });
  };

  const onDelete = async () => {
    handleAPICall(post, `${apiUrls.cmsForumSDI}/${id}/ubah-status/DELETED`, { data: { note: '' } });
  };

  const onSetujui = async () => {
    handleAPICall(post, `${apiUrls.cmsForumSDI}/${id}/ubah-status/APPROVED`);
  };

  const onTolak = async () => {
    handleAPICall(post, `${apiUrls.cmsForumSDI}/${id}/ubah-status/REJECTED`, { query: { notes } });
  };

  const onPublish = async () => {
    handleAPICall(post, `${apiUrls.cmsForumSDI}/${id}/ubah-status/PUBLISHED`);
  };

  const onUnpublish = async () => {
    handleAPICall(post, `${apiUrls.cmsForumSDI}/${id}/ubah-status/UNPUBLISHED`);
  };

  const handleCloseModal = () => {
    setShowModal('');
    setLoader(false);
  };

  const divClass = getStatusClass(detailResult?.status || '');

  return (
    <div className="cms-forum-sdi-detail-wrapper">
      <div className="d-flex bg-secondary align-items-center">
        <button className="bg-white border-gray-stroke p-10" onClick={goBack}>
          <LeftChevron />
        </button>
        <div className={`br-2 p-12 flex-grow-1 flex-center  ${divClass?.divBG || ''}`}>
          <span className={`fs-14 lh-17 ${divClass?.textColor || ''}`}>{divClass?.text || detailResult?.status || ''}</span>
        </div>
      </div>
      <div className="d-flex mt-56">
        <div className="w-75 pl-100">
          <div className="d-flex ml-24 mr-10 justify-content-between">
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
          <div className="forum-sdi-detail-wrapper">
            {apiError || detailError ? <label className="sdp-error mb-20">{apiError || detailError}</label> : null}
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
                    {detailResult?.tags.map((elem) => (
                      <label className="sdp-text-blue mr-6 bg-light-blue">{elem}</label>
                    ))}
                  </div>
                </Form.Group>
              )}
              {detailLoading ? (
                <RowLoader />
              ) : (
                <ReadOnlyInputs
                  group
                  rows={3}
                  label="Isi Forum"
                  labelClass="sdp-form-label fw-normal"
                  type="text"
                  as="textarea"
                  value={detailResult?.isi}
                />
              )}
              {detailLoading ? (
                <RowLoader />
              ) : (
                <Form.Group as={Col} className="cms-forum-sdi-input mt-5" md="12">
                  <label className="sdp-form-label mb-8">Lampiran</label>
                  <div className="input-data d-flex align-items-center bg-gray border-gray-stroke p-9 br-4">
                    {detailResult?.lampiran.map((elem) => (
                      <label className="sdp-text-blue bg-light-blue">{elem?.fileName}</label>
                    ))}
                  </div>
                </Form.Group>
              )}
            </Row>
          </div>
        </div>
        <div className="w-25 wpx-">
          <div className="mb-57">
            <label className="fw-600 fs-20">Log Status</label>
          </div>
          <div className="d-flex w-75 align-items-center pb-16">
            <span className="wpx-120">{moment(new Date()).format('DD MMMM YYYY')}</span>
            <div className="border-gray-stroke h-0 w-100" />
          </div>
          <div>
            <span className="bg-gray sdp-text-disable p-5 border-0">Dibuat</span>
          </div>
        </div>
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
            onChange={({ target: { value = '' } = {} }) => setNotes(value.trim())}
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
