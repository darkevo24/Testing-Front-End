import React from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

import CMSForm, { submitBeritaForm } from 'components/CMSForm';
import Notification from 'components/Notification';
import bn from 'utils/bemNames';
import cx from 'classnames';
import { setNewBerita } from './reducer';
import { useDispatch } from 'react-redux';

const bem = bn('content-create');

const CMSBeritaBaru = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    data.mainImageTitle = '';
    data.publishDate = data.publishDate ? data.publishDate + ' ' + data.publishTime : '';
    data.kategori = data.kategori.value;
    data.status = 0;
    data.taglineId = data.taglineId.map((tag) => tag.value);
    data.issn = data.issn ? data.issn : '';
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

  return (
    <div className={bem.e('section')}>
      <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
        <div className={bem.e('title')}>
          Buat Berita Baru
          <Button
            onClick={() => history.push('/cms/berita-konten')}
            className="ml-24"
            variant="secondary"
            style={{ width: '112px' }}>
            Batal
          </Button>
          <Button onClick={submitBeritaForm} className="ml-10" variant="info" style={{ width: '112px' }}>
            Simpan
          </Button>
        </div>
        <div>
          <Button className="ml-24" variant="secondary" style={{ width: '112px' }}>
            Preview
          </Button>
        </div>
      </div>
      <div className={bem.e('body')}>
        <CMSForm data={[]} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default CMSBeritaBaru;
