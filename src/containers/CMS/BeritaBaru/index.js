import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

import CMSForm, { submitBeritaForm, submitNewKategori, getDate } from 'components/CMSForm';
import { CMSModal, Loader } from 'components';
import Notification from 'components/Notification';
import bn from 'utils/bemNames';
import cx from 'classnames';
import { setNewBerita, setPreviewBerita, detailDataSelector, setEditBerita } from './reducer';
import { useDispatch, useSelector } from 'react-redux';

const bem = bn('content-create');

const CMSBeritaBaru = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [action, setAction] = useState('');
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalLabel, setModalLabel] = useState('');
  const [dataBerita, setDataBerita] = useState({});
  const { loading, record } = useSelector(detailDataSelector);

  const onSubmit = (data) => {
    // preview berita
    if (action === 'preview') {
      return dispatch(setPreviewBerita(data)).then(() => history.push('/berita/preview'));
    }

    data.mainImageTitle = '';
    const publishDate = getDate(data.publishDate);
    const publishTime = data.publishTime ? data.publishTime : '';
    data.publishDate = !publishDate ? '' : !publishTime ? publishDate + ' 00:00:00' : publishDate + ' ' + publishTime;
    data.taglineId = data.taglineId?.map((tag) => tag.value) || [];
    data.issn = data.issn ? data.issn : '';

    if (data.kategori.value !== 'new') {
      data.kategori = data.kategori.value;
    }

    data.status = 0;
    if (action === 'kirim') {
      data.status = 2;
    }
    // set data
    setDataBerita(data);

    // open modal
    let label = '';
    switch (action) {
      case 'simpan':
        label = 'Simpan Berita?';
        break;
      case 'kirim':
        label = 'Kirim Berita?';
        break;
      default:
        return;
    }
    setModalLabel(<span dangerouslySetInnerHTML={{ __html: label }}></span>);
    setModalConfirm(true);
  };

  const submitBerita = () => {
    setModalConfirm(false);

    // create new kategori
    if (dataBerita.kategori?.id && dataBerita.kategori.id === 'new') {
      submitNewKategori(dataBerita.kategori.label).then((res) => {
        Promise.resolve()
          .then(() =>
            setDataBerita({
              ...dataBerita,
              kategori: res.data.content.id,
            }),
          )
          .then(() => sendData());
      });
      return;
    }
    sendData();
  };

  const sendData = () => {
    if (dataBerita.id) {
      // edit berita
      const idBerita = dataBerita.id;
      // delete dataBerita.id;
      return dispatch(setEditBerita({ payload: dataBerita, id: idBerita })).then((res) => notifyResponse(res));
    }
    // kirim
    if (dataBerita.status === 2) {
      return dispatch(setNewBerita({ payload: dataBerita }))
        .then((res) => dispatch(setEditBerita({ payload: dataBerita, id: res.payload.content.id })))
        .then((res) => notifyResponse(res));
    }
    // simpan
    dispatch(setNewBerita({ payload: dataBerita })).then((res) => notifyResponse(res));
  };

  const notifyResponse = (res) => {
    res?.payload
      ? Notification.show({
          type: 'secondary',
          message: (
            <div>
              Berita <span className="fw-bold">{res.meta.arg?.payload?.judul}</span> Berhasil Disimpan
            </div>
          ),
          icon: 'check',
          onClose: history.goBack(),
        })
      : Notification.show({
          message: (
            <div>
              Error <span className="fw-bold">{res.error?.message}</span> Data Tidak Diubah
            </div>
          ),
          icon: 'cross',
        });
  };

  const actionClick = (status) => {
    Promise.resolve()
      .then(() => setAction(status))
      .then(() => submitBeritaForm());
  };

  return (
    <div className={bem.e('section')}>
      <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
        <div className={bem.e('title')}>
          {record.id ? 'Edit Berita' : 'Buat Berita Baru'}
          <Button
            onClick={() => dispatch(setPreviewBerita({})).then(() => history.goBack())}
            className="ml-24"
            variant="secondary"
            style={{ width: '112px' }}>
            Batal
          </Button>
          <Button
            onClick={() => actionClick('simpan')}
            className="ml-10 bg-white sdp-text-grey-dark border-gray-stroke"
            variant="light"
            style={{ width: '112px' }}>
            Simpan
          </Button>
          <Button onClick={() => actionClick('kirim')} className="ml-10" variant="info" style={{ width: '112px' }}>
            Kirim
          </Button>
        </div>
        <div>
          <Button
            onClick={() => actionClick('preview')}
            className="ml-24 bg-white sdp-text-grey-dark border-gray-stroke"
            variant="light"
            style={{ width: '112px' }}>
            Preview
          </Button>
        </div>
      </div>
      <div className={bem.e('body')}>
        <CMSForm data={record} onSubmit={onSubmit} />
      </div>
      {modalConfirm ? (
        <CMSModal
          loader={false}
          onClose={() => setModalConfirm(false)}
          confirmButtonAction={submitBerita}
          label={modalLabel}
        />
      ) : null}
      {loading && <Loader fullscreen={true} />}
    </div>
  );
};

export default CMSBeritaBaru;
