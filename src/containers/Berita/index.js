import React from 'react';
import styled from 'styled-components';

const BeritaDiv = styled.div`
  padding: 16px;
  background-color: ${(props) => (props.color ? props.color : 'black')};
  margin: 16px;
`;

const BeritaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => (props.columns ? props.columns : 1)}, minmax(0, 1fr));
`;

const Search = () => <BeritaDiv color="pink">Search</BeritaDiv>;

const BeritaUtama = () => <BeritaDiv color="lightblue">Berita Utama</BeritaDiv>;

const TopikPopuler = (props) => {
  return (
    <BeritaDiv color="lightyellow">
      <h5>Topik Populer</h5>
      {Array.apply(null, { length: props.jumlah }).map((e, i) => (
        <div>Topik {i + 1}</div>
      ))}
    </BeritaDiv>
  );
};

const BeritaUtamaLain = (props) => {
  return (
    <BeritaDiv color="lightgreen">
      <h5>Berita Utama Lainnya</h5>
      <BeritaGrid columns={props.columns}>
        {Array.apply(null, { length: props.jumlah }).map((e, i) => (
          <div>Berita {i + 1}</div>
        ))}
      </BeritaGrid>
    </BeritaDiv>
  );
};

const KegiatanSatuData = (props) => {
  return (
    <BeritaDiv color="lightgrey">
      <h5>Kegiatan Satu Data Indonesia</h5>
      <BeritaGrid columns={props.columns}>
        {Array.apply(null, { length: props.jumlah }).map((e, i) => (
          <div>Berita {i + 1}</div>
        ))}
      </BeritaGrid>
    </BeritaDiv>
  );
};

const ListBerita = (props) => {
  return (
    <BeritaDiv color="plum">
      <h5>List Berita</h5>
      <BeritaGrid columns={props.columns}>
        {Array.apply(null, { length: props.jumlah }).map((e, i) => (
          <div>Berita {i + 1}</div>
        ))}
      </BeritaGrid>
    </BeritaDiv>
  );
};

const BeritaLainnya = () => <BeritaDiv color="orange">Berita Lainnya</BeritaDiv>;

const Populer = (props) => {
  return (
    <BeritaDiv color="beige">
      <h5>Populer</h5>
      <BeritaGrid columns={props.columns}>
        {Array.apply(null, { length: props.jumlah }).map((e, i) => (
          <div>Berita {i + 1}</div>
        ))}
      </BeritaGrid>
    </BeritaDiv>
  );
};

const Tweets = () => <BeritaDiv color="skyblue">Tweets</BeritaDiv>;

const layout = JSON.parse(window.localStorage.getItem('beritalayout'));

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

const Berita = () => (
  <div className="row mt-4">
    <div className="col-lg-2"></div>
    <div className="col-lg-6">{layout.kiri.map((el) => renderComp(el))}</div>
    <div className="col-lg-2">{layout.kanan.map((el) => renderComp(el))}</div>
    <div className="col-lg-2"></div>
  </div>
);

export default Berita;
