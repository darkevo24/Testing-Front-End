import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { CMSTopDetail, Loader, CMSModal, Modal } from 'components';
import Notification from 'components/Notification';
import { LogStatus } from 'components/Sidebars/LogStatus';
import bn from 'utils/bemNames';

import CMSContactForm, { submitContactForm } from './form';
import CMSContactHeader from './detailHeader';
import {
  getDetailKontak,
  getLogKontak,
  contactDetailSelector,
  logDataSelector,
  updateKontak,
  updateStatusKontak,
} from './reducer';

const bem = bn('content-detail');

const CMSContactDetail = (props) => {
  const idContact = props.match.params.id;
  const dispatch = useDispatch();
  const { loading, record } = useSelector(contactDetailSelector);
  const { records: logRecords } = useSelector(logDataSelector);
  const [action, setAction] = useState('');
  const [canEdit, setCanEdit] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalLabel, setModalLabel] = useState('');
  const [notes, setNotes] = useState('');
  const [contactData, setContactData] = useState(null);
  const fetchData = (params) => {
    dispatch(getDetailKontak(params));
    dispatch(getLogKontak(params));
  };

  useEffect(() => fetchData({ id: idContact }), [idContact]);
  useEffect(() => setCanEdit(false), [record]);

  const actionClick = (status) => {
    Promise.resolve()
      .then(() => setAction(status))
      .then(() => {
        if (status === 'edit') {
          return setCanEdit(true);
        }
        return submitContactForm();
      });
  };

  const onSubmit = (data) => {
    setContactData(data);

    // open modal
    let label = '';
    switch (action) {
      case 'simpan':
        label = <span>Simpan data?</span>;
        break;
      case 'kirim':
        label = <span>Kirim data?</span>;
        break;
      case 'delete':
        label = (
          <span>
            Apakah anda yakin ingin <b className="sdp-text-blue">menghapus</b> data?
          </span>
        );
        break;
      case 'tolak':
        break;
      case 'setujui':
        label = (
          <span>
            Apakah anda yakin ingin <b className="sdp-text-blue">menyetujui</b> data?
          </span>
        );
        break;
      case 'publish':
        label = (
          <span>
            Apakah anda yakin ingin <b className="sdp-text-blue">menayangkan</b> data?
          </span>
        );
        break;
      case 'unpublish':
        label = (
          <span>
            Apakah anda yakin ingin <b className="sdp-text-blue">tidak menayangkan</b> data?
          </span>
        );
        break;
      default:
        return;
    }
    setModalLabel(label);
    setModalConfirm(true);
  };

  const onTolak = () => {
    setModalConfirm(false);
    return dispatch(updateStatusKontak({ id: idContact, action: action, note: notes })).then((res) => notifyResponse(res));
  };

  const sendData = () => {
    setModalConfirm(false);
    if (action === 'simpan') {
      return dispatch(updateKontak({ payload: contactData })).then((res) => notifyResponse(res));
    }

    return dispatch(updateStatusKontak({ id: idContact, action: action })).then((res) => notifyResponse(res));
  };

  const notifyResponse = (res) => {
    res?.payload
      ? Notification.show({
          type: 'secondary',
          message: <div>Contact Us Berhasil Disimpan</div>,
          icon: 'check',
          onClose: fetchData({ id: idContact }),
        })
      : Notification.show({
          message: (
            <div>
              Error <span className="fw-bold">{res.error?.message}</span> Data Tidak Disimpan
            </div>
          ),
          icon: 'cross',
        });
  };

  return (
    <div>
      <CMSTopDetail status={record?.status?.toLowerCase()} />
      <Row className={bem.e('section')}>
        <Col sm={8}>
          <div>
            <div className="d-flex justify-content-between mb-3">
              <div className={bem.e('title')}>Contact Us</div>
              {canEdit ? (
                <div>
                  <Button
                    variant="outline-light"
                    className="mr-16 bg-white sdp-text-grey-dark border-gray-stroke br-4 px-40"
                    onClick={() => setCanEdit(false)}>
                    Batal
                  </Button>
                  <Button variant="info" className="mr-16 br-4 px-40 border-0" onClick={() => actionClick('simpan')}>
                    Simpan
                  </Button>
                </div>
              ) : (
                <CMSContactHeader data={record} handleClick={actionClick} />
              )}
            </div>
            {!loading && <CMSContactForm data={record} disabled={!canEdit} onSubmit={onSubmit} />}
          </div>
        </Col>
        <Col sm={3}>
          <LogStatus data={logRecords} />
        </Col>
      </Row>
      {loading && <Loader fullscreen={true} />}
      {modalConfirm && action !== 'tolak' ? (
        <CMSModal loader={false} onClose={() => setModalConfirm(false)} confirmButtonAction={sendData} label={modalLabel} />
      ) : modalConfirm && action === 'tolak' ? (
        <Modal visible={true} onClose={() => setModalConfirm(false)} title="" showHeader={false} centered={true}>
          Apakah anda yakin ingin <span className="sdp-text-red">menolak</span> data?
          <textarea
            placeholder="Tulis Catatan"
            name="catatan"
            value={notes}
            onChange={({ target: { value = '' } = {} }) => setNotes(value.trim())}
            className="border-gray-stroke br-4 w-100 mt-24 mb-24 h-214"
            required
          />
          <div className="d-flex justify-content-end">
            <Button className="br-4 mr-8 px-57 py-13 bg-transparent" variant="light" onClick={() => setModalConfirm(false)}>
              Batal
            </Button>
            <Button className="br-4 px-39 py-13" variant="info" disabled={!notes.trim()} onClick={onTolak}>
              Konfirmasi
            </Button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default CMSContactDetail;
