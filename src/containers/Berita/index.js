import React from 'react';
import styled from 'styled-components';

const BeritaDiv = styled.div`
  padding: 16px;
  background-color: ${(props) => (props.color ? props.color : 'black')};
  margin: 16px;
`;

const Search = (props) => <BeritaDiv color="pink">Search {props.test}</BeritaDiv>;

const BeritaUtama = () => <BeritaDiv color="lightblue">Berita Utama</BeritaDiv>;

const TopikPopuler = () => <BeritaDiv color="lightyellow">Topik Populer</BeritaDiv>;

const layout = JSON.parse(window.localStorage.getItem('beritalayout'));

const renderComp = (el) => {
  return React.createElement(components[el.component], { ...el.props, key: el.component });
};

const components = {
  search: Search,
  beritaUtama: BeritaUtama,
  topikpopuler: TopikPopuler,
};

const Berita = () => (
  <div className="row mt-4">
    <div className="col-lg-2"></div>
    <div className="col-lg-6">{layout.kiri.map((el) => renderComp(el))}</div>
    <div className="col-lg-2">{layout.kanan.map((el) => renderComp(el))}</div>
    <div className="col-lg-2"></div>
  </div>
);

export default Berita;
