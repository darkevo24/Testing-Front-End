import React from 'react';
import { Button } from 'react-bootstrap';
import bn from 'utils/bemNames';
import cx from 'classnames';
import CMSpenggunaForm, { submitpenggunaForm } from './CMSPenggunaForm';

const bem = bn('content-create');

const TambahPengguna = () => {
  const submitData = (Pdata) => {};

  return (
    <div className={bem.b()}>
      <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
        <div className={bem.e('title')}>
          Tambah Pengguna Baru
          <Button className="ml-24" variant="secondary" style={{ width: '112px' }}>
            Batal
          </Button>
          <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => submitpenggunaForm()}>
            Kirim
          </Button>
        </div>
      </div>
      <div className={bem.e('body')}>
        <CMSpenggunaForm disabled={false} onsubmit={submitData} />
      </div>
    </div>
  );
};

export default TambahPengguna;
