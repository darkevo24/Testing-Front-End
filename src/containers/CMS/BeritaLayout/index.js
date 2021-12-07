import React from 'react';
import Box from './Box';
import { useRef } from 'react';
import './beritalayout.scss';
import Berita from 'containers/Berita';
import cx from 'classnames';
import bn from 'utils/bemNames';

const bem = bn('berita-layout');
var shortid = require('shortid');

const BeritaLayout = () => {
  const kiri = useRef(null);
  const kanan = useRef(null);
  const inactive = useRef(null);

  let obj = window.localStorage.getItem('tempberitalayout')
    ? JSON.parse(window.localStorage.getItem('tempberitalayout'))
    : JSON.parse(window.localStorage.getItem('beritalayout'));

  const itemKiri = obj.kiri.map((el) => ({
    label: el.label,
    props: el.props,
    uid: shortid.generate(),
    component: el.component,
  }));

  const itemKanan = obj.kanan.map((el) => ({
    label: el.label,
    props: el.props,
    uid: shortid.generate(),
    component: el.component,
  }));

  const inactiveItems = obj.inactive.map((el) => ({
    label: el.label,
    props: el.props,
    uid: shortid.generate(),
    component: el.component,
  }));

  const onSave = () => {
    let obj = {
      kiri: kiri.current.state.items,
      kanan: kanan.current.state.items,
      inactive: inactive.current.state.items,
    };

    window.localStorage.removeItem('tempberitalayout');
    window.localStorage.setItem('beritalayout', JSON.stringify(obj));
    alert('Layout berhasil disimpan');
  };

  const preview = () => {
    let obj = {
      kiri: kiri.current.state.items,
      kanan: kanan.current.state.items,
      inactive: inactive.current.state.items,
    };

    window.localStorage.setItem('tempberitalayout', JSON.stringify(obj));
    window.location.reload();
  };

  const batal = () => {
    window.localStorage.removeItem('tempberitalayout');
    window.location.reload();
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className={bem.e('header')}>
          <div className={bem.e('header-title')}>Layout Berita</div>
          <div>
            <button className={cx(bem.e('button'), 'batal')} onClick={batal}>
              Batal
            </button>
            <button className={cx(bem.e('button'), 'preview')} onClick={preview}>
              Preview
            </button>
            <button className={cx(bem.e('button'), 'simpan')} onClick={onSave}>
              Simpan
            </button>
          </div>
        </div>
        <div className={bem.e('content')}>
          <div className="drag_things_to_boxes">
            <div className="boxes">
              <Box targetKey="box" items={itemKiri} title="Konten Utama" ref={kiri} />
              <Box targetKey="box" items={itemKanan} title="Sidebar" ref={kanan} />
              <Box targetKey="box" items={inactiveItems} title="Sembunyikan" ref={inactive} />
            </div>
          </div>
        </div>
        <div className={bem.e('preview')}>
          <div className="row" style={{ paddingTop: '64px' }}>
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <div className={bem.e('header-title')}>Layout Berita</div>
            </div>
            <div className="col-lg-2"></div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Berita />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeritaLayout;
