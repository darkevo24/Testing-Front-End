import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { LogStatus } from 'components/Sidebars/LogStatus';
import { CMSForm, Loader, CMSTopDetail, CMSModal, Modal } from 'components';
import { submitBeritaForm, getDate } from 'components/CMSForm';
import Notification from 'components/Notification';
import bn from 'utils/bemNames';
import { DetailHeader } from './detailHeader';
import {
  setDetailBerita,
  detailDataSelector,
  setPreviewBerita,
  setStatusBerita,
  getLogBerita,
  logBeritaSelector,
} from '../BeritaBaru/reducer';

const bem = bn('content-detail');

const CMSBeritaDetail = (props) => {
  const idBerita = props.match.params.id;
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, record } = useSelector(detailDataSelector);
  const { loading: loadingLog, records: logRecords } = useSelector(logBeritaSelector);
  const fetchData = (params) => {
    dispatch(setDetailBerita(params));
    dispatch(getLogBerita(params));
  };

  useEffect(() => {
    if (record.id?.toString() !== idBerita) {
      fetchData({ id: idBerita });
    }
  }, [idBerita]);

  const [beritaStatus, setBeritaStatus] = useState(record);
  const [modalLabel, setModalLabel] = useState('');
  const [modalConfirm, setModalConfirm] = useState(false);
  const [dataBerita, setDataBerita] = useState({});
  const [notes, setNotes] = useState('');
  const [labelNotif, setLabelNotif] = useState('');

  const onSubmit = (data) => {
    // preview berita
    if (beritaStatus === 9) {
      return dispatch(setPreviewBerita(data)).then(() => history.push('/berita/preview'));
    }

    const publishDate = getDate(data.publishDate);
    const publishTime = data.publishTime ? data.publishTime + ':00' : '';
    data.publishDate = !publishDate ? '' : !publishTime ? publishDate + ' 00:00:00' : publishDate + ' ' + publishTime;
    // set default publishDate when publish
    if (beritaStatus === 5) {
      const currentDate = new Date().toISOString();
      data.publishDate = currentDate.split('T')[0] + ' ' + currentDate.split('T')[1].split('.')[0];
    }

    data.taglineId = data.taglineId?.map((tag) => tag.value) || [];
    data.status = beritaStatus;

    if (data.kategori.value !== 'new') {
      data.kategori = data.kategori.id;
    }

    // open modal
    let label = '';
    switch (data.status) {
      case 2:
        label = <span>Kirim Berita?</span>;
        setLabelNotif('Dikirim');
        break;
      case 3:
        label = (
          <span>
            Apakah anda yakin ingin <b className="sdp-text-blue">menyetujui</b> Berita <b>{data.judul}</b>?
          </span>
        );
        setLabelNotif('Disetujui');
        break;
      case 4:
        label = (
          <span>
            Apakah anda yakin ingin <b className="sdp-text-blue">menolak</b> Berita <b>{data.judul}</b>?
          </span>
        );
        setLabelNotif('Ditolak');
        break;
      case 5:
        label = (
          <span>
            Apakah anda yakin ingin <b className="sdp-text-blue">menayangkan</b> Berita <b>{data.judul}</b>?
          </span>
        );
        setLabelNotif('Ditayangkan');
        break;
      case 6:
        label = (
          <span>
            Apakah anda yakin ingin <b className="sdp-text-blue">tidak menayangkan</b> Berita <b>{data.judul}</b>?
          </span>
        );
        setLabelNotif('Tidak Ditayangkan');
        break;
      case 7:
        label = (
          <span>
            Apakah anda yakin ingin <b className="sdp-text-blue">menghapus</b> Berita <b>{data.judul}</b>?
          </span>
        );
        setLabelNotif('Dihapus');
        break;
      default:
        return;
    }
    setModalLabel(label);
    setModalConfirm(true);
    // set data
    setDataBerita(data);
  };

  const submitEditBerita = () => {
    setModalConfirm(false);

    return dispatch(
      setStatusBerita({
        payload: { id: [idBerita], status: dataBerita.status, note: notes || '' },
      }),
    )
      .then((res) => notifyResponse(res))
      .then(() => fetchData({ id: idBerita }));
  };

  const notifyResponse = (res) => {
    res?.payload
      ? Notification.show({
          type: 'secondary',
          message: (
            <div>
              Berita <span className="fw-bold">{res.meta.arg?.payload?.judul}</span> Berhasil {labelNotif}
            </div>
          ),
          icon: 'check',
        })
      : Notification.show({
          message: (
            <div>
              Error <span className="fw-bold">{res.error?.message}</span> Data Tidak Dapat Diubah
            </div>
          ),
          icon: 'cross',
        });
  };

  const actionClick = (status) => {
    Promise.resolve()
      .then(() => setBeritaStatus(status))
      .then(() => submitBeritaForm());
  };

  return (
    <div>
      <CMSTopDetail status={record?.status} />
      <Row className={bem.e('section')}>
        <Col sm={8}>
          <div>
            <div className="d-flex justify-content-between mb-3">
              <div className={bem.e('title')}>Edit Berita</div>
              <DetailHeader record={record} history={history} handleClick={actionClick} />
            </div>
            {!loading ? <CMSForm data={record} onSubmit={onSubmit} disabled={true} /> : null}
          </div>
        </Col>
        <Col sm={3}>
          <LogStatus
            data={logRecords.map((log) => {
              return {
                status: log.status.split(' ').join('_'),
                createdAt: log.createdAt,
                displayMessage: log.displayMessage,
              };
            })}
          />
        </Col>
        {loading && <Loader fullscreen={true} />}
      </Row>
      {modalConfirm && beritaStatus !== 4 && beritaStatus !== 7 ? (
        <CMSModal
          loader={false}
          onClose={() => setModalConfirm(false)}
          confirmButtonAction={submitEditBerita}
          label={modalLabel}
        />
      ) : modalConfirm && (beritaStatus === 4 || beritaStatus === 7) ? (
        <Modal visible={true} onClose={() => setModalConfirm(false)} title="" showHeader={false} centered={true}>
          {modalLabel}
          <textarea
            placeholder="Tulis Catatan"
            name="catatan"
            value={notes}
            onChange={({ target: { value = '' } = {} }) => setNotes(value)}
            className="border-gray-stroke br-4 w-100 mt-24 mb-24 h-214"
            required
          />
          <div className="d-flex justify-content-end">
            <Button className="br-4 mr-8 px-57 py-13 bg-transparent" variant="light" onClick={() => setModalConfirm(false)}>
              Batal
            </Button>
            <Button className="br-4 px-39 py-13" variant="info" disabled={!notes.trim()} onClick={submitEditBerita}>
              Konfirmasi
            </Button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default CMSBeritaDetail;
