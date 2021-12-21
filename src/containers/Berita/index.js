import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Search from './Search';
import BeritaUtama from './BeritaUtama';
import BeritaUtamaLain from './BeritaUtamaLain';
import KegiatanSatuData from './KegiatanSatuData';
import ListBerita from './ListBerita';
import TopikPopuler from './TopikPopuler';
import BeritaLainnya from './BeritaLainnya';
import Populer from './Populer';
import Tweets from './Tweets';
import { Loader } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { beritaLayoutSelector, getBertaLayout, updateBertalayout } from '../CMS/BeritaLayout/reducer';

export const BeritaDiv = styled.div`
  background-color: ${(props) => (props.color ? props.color : 'white')};
  margin: 16px 0;
`;

export const BeritaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => (props.columns ? props.columns : 1)}, minmax(0, 1fr));
  grid-column-gap: 8.34px;
  grid-row-gap: 16px;
`;

export const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #2d2627;

  &:after {
    content: '';
    display: block;
    height: 4px;
    width: 48px;
    background: #ff0000;
    margin: 12px 0 24px;
  }
`;

const renderComp = (el) => {
  return React.createElement(components[el.component], { ...el.props, key: el.component });
};

const components = {
  search: Search,
  beritaUtama: BeritaUtama,
  beritaUtamaLain: BeritaUtamaLain,
  kegiatanSatuData: KegiatanSatuData,
  listBerita: ListBerita,
  topikPopuler: TopikPopuler,
  beritaLainnya: BeritaLainnya,
  populer: Populer,
  tweets: Tweets,
};

const Berita = () => {
  const [kiri, setKiri] = useState([]);
  const [kanan, setKanan] = useState([]);

  const beritaLayoutState = useSelector(beritaLayoutSelector);
  const dispatch = useDispatch();
  const { status } = beritaLayoutState;
  const fetchBeritaLayoutData = () => {
    dispatch(getBertaLayout());
  };

  useEffect(() => {
    fetchBeritaLayoutData();
  }, []);

  useEffect(() => {
    const { error, content } = beritaLayoutState;
    const { records } = content;
    if (status === 'idle' && !error && records.length > 0) {
      const kiriRecord = records.filter((record) => record.code === 'kiri');
      if (kiriRecord) {
        const obj = JSON.parse(kiriRecord[0].content);
        setKiri(obj.kiri);
        setKanan(obj.kanan);
      }
    }
  }, [beritaLayoutState]);

  return (
    <div className="row mt-4">
      {status === 'loading' && <Loader fullscreen />}
      <div className="col-lg-2"></div>
      <div className="col-lg-6" style={{ paddingRight: '5.5%' }}>
        {kiri.length > 0 && kiri.map((el) => renderComp(el))}
      </div>
      <div className="col-lg-2">{kanan.length > 0 && kanan.map((el) => renderComp(el))}</div>
      <div className="col-lg-2"></div>
    </div>
  );
};

export default Berita;
