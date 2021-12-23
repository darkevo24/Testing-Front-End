import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

import CMSForm, { submitBeritaForm, submitNewKategori } from 'components/CMSForm';
import Notification from 'components/Notification';
import bn from 'utils/bemNames';
import cx from 'classnames';
import { setNewBerita, setPreviewBerita, detailDataSelector } from './reducer';
import { useDispatch, useSelector } from 'react-redux';

const bem = bn('content-create');

const CMSBeritaBaru = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [action, setAction] = useState('simpan');
  const { record } = useSelector(detailDataSelector);

  const onSubmit = (data) => {
    // preview berita
    if (action === 'preview') {
      return dispatch(setPreviewBerita(data)).then(() => history.push('/berita/preview'));
    }

    data.mainImageTitle = '';
    const publishDate = data.publishDate ? data.publishDate.split(' ')[0] : '';
    const publishTime = data.publishTime ? data.publishTime : '';
    data.publishDate = !publishDate ? '' : !publishTime ? publishDate + ' 00:00:00' : publishDate + ' ' + publishTime;
    data.status = 0;
    data.taglineId = data.taglineId.map((tag) => tag.value);
    data.issn = data.issn ? data.issn : '';

    if (data.kategori.value === 'new') {
      // action create kategori
      submitNewKategori(data.kategori.label).then((res) => {
        data.kategori = res.data.content.id;
        submitBerita(data);
      });
      return;
    }
    data.kategori = data.kategori.value;
    submitBerita(data);
  };

  const submitBerita = (data) => {
    dispatch(setNewBerita({ payload: data })).then((res) => {
      res?.payload
        ? Notification.show({
            type: 'secondary',
            message: (
              <div>
                Berita <span className="fw-bold">{res.payload.content.judul}</span> Berhasil Ditambahkan
              </div>
            ),
            icon: 'check',
            onClose: history.goBack(),
          })
        : Notification.show({
            message: (
              <div>
                Error <span className="fw-bold">{res.error.message}</span> Data Tidak Ditambahkan
              </div>
            ),
            icon: 'cross',
          });
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
          Buat Berita Baru
          <Button
            onClick={() => dispatch(setPreviewBerita({})).then(() => history.push('/cms/berita-konten'))}
            className="ml-24"
            variant="secondary"
            style={{ width: '112px' }}>
            Batal
          </Button>
          <Button onClick={() => actionClick('simpan')} className="ml-10" variant="info" style={{ width: '112px' }}>
            Simpan
          </Button>
        </div>
        <div>
          <Button onClick={() => actionClick('preview')} className="ml-24" variant="secondary" style={{ width: '112px' }}>
            Preview
          </Button>
        </div>
      </div>
      <div className={bem.e('body')}>
        <CMSForm data={record} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default CMSBeritaBaru;
