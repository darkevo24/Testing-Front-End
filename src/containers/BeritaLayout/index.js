import React from 'react';
import styled from 'styled-components';
import Box from './Box';
import { useRef } from 'react';
import './beritalayout.scss';
var shortid = require('shortid');

const HeaderWrapper = styled.div`
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e1e2ea;
`;

const HeaderTitle = styled.div`
  font-weight: bold;
  font-size: 32px;
  color: #000000;
`;

const Button = styled.button`
  width: 112px;
  text-align: center;
  padding-top: 13px;
  padding-bottom: 13px;
  font-weight: 600;
  font-size: 14px;
  margin-left: 8px;
  border-radius: 4px;
  border: 0;

  &.batal {
    color: #858a8f;
    background: #f5f6fa;
  }

  &.preview {
    color: #515154;
    background: #ffffff;
    border: 1px solid #e1e2ea;
  }

  &.simpan {
    background: #007aff;
    color: #ffffff;
  }
`;

const ContentWrapper = styled.div`
  padding: 32px;
`;

const BeritaLayout = () => {
  const kiri = useRef(null);
  const kanan = useRef(null);
  const inactive = useRef(null);

  let obj = JSON.parse(window.localStorage.getItem('beritalayout'));

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

    window.localStorage.setItem('beritalayout', JSON.stringify(obj));
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <HeaderWrapper>
          <HeaderTitle>Layout Berita</HeaderTitle>
          <div>
            <Button className="batal">Batal</Button>
            <Button className="preview">Preview</Button>
            <Button className="simpan" onClick={onSave}>
              Simpan
            </Button>
          </div>
        </HeaderWrapper>
        <ContentWrapper>
          <div className="drag_things_to_boxes">
            <div className="boxes">
              <Box targetKey="box" items={itemKiri} title="Konten Utama" ref={kiri} />
              <Box targetKey="box" items={itemKanan} title="Sidebar" ref={kanan} />
              <Box targetKey="box" items={inactiveItems} title="Sembunyikan" ref={inactive} />
            </div>
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default BeritaLayout;
