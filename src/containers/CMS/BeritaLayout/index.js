import React, { useCallback, useEffect, useState } from 'react';
import Box from './Box';
import { useRef } from 'react';
import './beritalayout.scss';
import Berita from 'containers/Berita';
import cx from 'classnames';
import bn from 'utils/bemNames';
import { useSelector, useDispatch } from 'react-redux';
import { beritaLayoutSelector, getBertaLayout, updateBeritaLaout } from './reducer';

const bem = bn('berita-layout');
var shortid = require('shortid');

const BeritaLayout = () => {
  const [kiri, setKiri] = useState(null);
  const [kanan, setKanan] = useState(null);
  const [inactive, setInactive] = useState(null);

  const beritaLayoutState = useSelector(beritaLayoutSelector);
  const dispatch = useDispatch();

  const fetchBeritaLayoutData = useCallback(() => {
    dispatch(getBertaLayout());
  }, [beritaLayoutState]);

  useEffect(() => {
    fetchBeritaLayoutData();
    const { status, error, content } = beritaLayoutState;
    const { records } = content;
    if (status === 'idle' && !error && records.length > 0) {
      const kiriRecord = records.filter((record) => record.code === 'kiri');
      if (kiriRecord) {
        const obj = JSON.parse(kiriRecord[0].content);
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

        setKiri(itemKiri);
        setKanan(itemKanan);
        setInactive(inactiveItems);
      }
    }
  }, [fetchBeritaLayoutData]);

  const onSave = () => {
    let obj = {
      kiri: kiri.current.state.items,
      kanan: kanan.current.state.items,
      inactive: inactive.current.state.items,
    };

    updateBeritaLaout(JSON.stringify(obj));
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

    updateBeritaLaout(JSON.stringify(obj));

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
              <Box targetKey="box" items={kiri} title="Konten Utama" />
              <Box targetKey="box" items={kanan} title="Sidebar" />
              <Box targetKey="box" items={inactive} title="Sembunyikan" />
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
