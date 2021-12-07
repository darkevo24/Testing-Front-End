import React from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

import CMSForm, { submitBeritaForm } from 'components/CMSForm';
import { formatDate } from 'utils/helper';
import bn from 'utils/bemNames';
import cx from 'classnames';
import { setNewBerita } from './reducer';
import { useDispatch } from 'react-redux';

const bem = bn('content-create');

const CMSBeritaBaru = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    data.mainImage = 'https://rembangkab.go.id/haribawana/uploads/pemerintah-kabupaten-rembang-no-image.jpg';
    data.taglineId = [];
    data.mainImageTitle = '';
    data.publishedDate = data.publishedDate ? formatDate(data.publishedDate) : '';
    data.kategori = data.kategori.value;
    data.status = 0;

    dispatch(setNewBerita({ payload: data })).then(() => {
      history.goBack();
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
