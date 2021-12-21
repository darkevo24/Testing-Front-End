import React, { useCallback, useEffect, useState } from 'react';
import Box from './Box';
import { useRef } from 'react';
import './beritalayout.scss';
import Berita from 'containers/Berita';
import cx from 'classnames';
import bn from 'utils/bemNames';
import { Loader } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { beritaLayoutSelector, getBertaLayout, updateBertalayout, resetBertaLayout } from './reducer';

const bem = bn('berita-layout');
var shortid = require('shortid');

const BeritaLayout = () => {
  const [kiri, setKiri] = useState([]);
  const [kanan, setKanan] = useState([]);
  const [inactive, setInactive] = useState([]);

  const kiriRef = useRef(null);
  const kananRef = useRef(null);
  const inactiveRef = useRef(null);

  const beritaLayoutState = useSelector(beritaLayoutSelector);
  const { status } = beritaLayoutState;
  const dispatch = useDispatch();

  const fetchBeritaLayoutData = () => {
    dispatch(getBertaLayout());
  };

  useEffect(() => {
    fetchBeritaLayoutData();
  }, []);

  useEffect(() => {
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
  }, [beritaLayoutState]);

  const onSave = () => {
    let obj = {
      kiri: kiriRef.current.state.items,
      kanan: kananRef.current.state.items,
      inactive: inactiveRef.current.state.items,
    };
    dispatch(updateBertalayout({ code: 'kiri', content: JSON.stringify(obj) }));
    window.location.reload();
    alert('Layout berhasil disimpan');
  };

  const preview = () => {
    let obj = {
      kiri: kiriRef?.current?.state?.items,
      kanan: kananRef?.current.state?.items,
      inactive: inactiveRef?.current?.state?.items,
    };
    dispatch(updateBertalayout({ code: 'kiri', content: JSON.stringify(obj) }));
  };

  const batal = () => {
    const obj = JSON.parse(window.localStorage.getItem('beritalayout'));
    dispatch(
      resetBertaLayout({
        content: {
          ...obj,
        },
      }),
    );
    // window.location.reload();
  };
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className={bem.e('header')}>
          <div className={bem.e('header-title')}>Layout Berita</div>
          {status === 'loading' && <Loader fullscreen />}
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
              {kiri.length > 0 && <Box targetKey="box" items={kiri} title="Konten Utama" ref={kiriRef} />}
              {kiri.length > 0 && <Box targetKey="box" items={kanan} title="Sidebar" ref={kananRef} />}
              {kiri.length > 0 && <Box targetKey="box" items={inactive} title="Sembunyikan" ref={inactiveRef} />}
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
