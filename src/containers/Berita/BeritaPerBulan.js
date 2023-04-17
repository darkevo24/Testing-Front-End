import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Loader } from 'components';
import truncate from 'lodash/truncate';
import moment from 'moment';
import { ReactComponent as ArrowLeft } from 'assets/arrow-left.svg';
import Search from './Search';
import BeritaUtama from './BeritaUtama';
import BeritaUtamaLain from './BeritaUtamaLain';
import KegiatanSatuData from './KegiatanSatuData';
import ListBerita from './ListBerita';
import TopikPopuler from './TopikPopuler';
import BeritaLainnya from './BeritaLainnya';
import Populer from './Populer';
import Tweets from './Tweets';
import { beritaLayoutSelector, getBertaLayout } from 'containers/CMS/BeritaLayout/reducer';
import { newsByMonthSelector, getNewsByMonth } from './reducer';
import { SectionTitle } from '.';
import styled from 'styled-components';

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

const BeritaContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #e1e2ea;
  height: 130px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 200px;
  height: 80%;
  padding-right: 20px;
  column: 4;
`;

const renderComp = (el) => {
  return React.createElement(components[el.component], { ...el.props, key: el.component });
};
const BeritaPerBulan = () => {
  const [size, setSize] = useState(10);
  const [kanan, setKanan] = useState([]);
  const [monthName, setMonthName] = useState('');

  const { date } = useParams();
  useEffect(() => {
    if (date) {
      const month = moment(date, 'MM-YYYY').format('MMMM-YYYY');
      setMonthName(month);
    }
  }, [date]);

  const dispatch = useDispatch();
  const history = useHistory();

  const beritaLayoutState = useSelector(beritaLayoutSelector);
  const { records, loading } = useSelector(newsByMonthSelector);
  const fetchBeritaLayoutData = () => {
    dispatch(getBertaLayout());
  };
  useEffect(() => {
    const parmaValue = date.replace('-', '/');
    dispatch(getNewsByMonth(`perbulan/${parmaValue}?size=${size}`));
    // console.log('records', dispatch(getNewsByMonth(`perbulan/${parmaValue}?size=${size}`)));
  }, [dispatch, date, size]);

  useEffect(() => {
    fetchBeritaLayoutData();
  }, []);
  useEffect(() => {
    const { error, content, status } = beritaLayoutState;
    const { records } = content;
    if (status === 'idle' && !error && records.length > 0) {
      const kiriRecord = records.filter((record) => record.code === 'kiri');
      if (kiriRecord) {
        const obj = JSON.parse(kiriRecord[0].content);
        setKanan(obj.kanan);
      }
    }
  }, [beritaLayoutState]);

  const handleDetail = (event, id, slug) => {
    event.preventDefault();
    history.push(`/berita/${id}/${slug}`);
  };

  const handleLoadMore = () => {
    setSize(size + 10);
  };
  const handleBack = () => {
    history.goBack();
  };
  return (
    <div className="row mt-24">
      {loading && <Loader fullscreen />}
      <div className="col-lg-2"></div>
      <div className="col-lg-6 pr-5">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle>
              <ArrowLeft onClick={handleBack} className="cursor-pointer" />
              <strong className="ml-8">{monthName}</strong>
            </SectionTitle>
          </div>
        </div>
        {records.length
          ? records.map((record, i) => {
              const { slug, kategori, image, judul, id } = record;
              const truncatedParagrapData = truncate(slug, {
                length: 250,
                separator: ' ',
              });
              return (
                <div key={i} style={{ marginRight: '60px', marginTop: '20px' }}>
                  <BeritaContainer>
                    <ImageContainer>
                      <div>
                        <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={image} alt="" />
                      </div>
                    </ImageContainer>
                    <div className="col-lg-8">
                      <span className="topik">{kategori}</span>
                      <div className="judul" onClick={(e) => handleDetail(e, id, slug)}>
                        {judul}
                      </div>
                      {/* {slug.length > 250 ? (
                        <>
                          <div className="konten">{truncatedParagrapData}</div>
                          <button
                            className="read_more_link p-0 border-0 bg-white"
                            onClick={(event) => handleDetail(event, id)}>
                            <h6>Baca Selengkapnya</h6>
                          </button>
                        </>
                      ) : (
                        <div className="konten">{slug}</div>
                      )} */}
                    </div>
                  </BeritaContainer>
                </div>
              );
            })
          : null}
        <div className="row">
          <div className="col-md-12 text-center my-10">
            {records.length >= 10 && (
              <button className="loadMoreBUtton" onClick={handleLoadMore}>
                Muat Lebih Banyak
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="col-lg-2">{kanan.length > 0 && kanan.map((el) => renderComp(el))}</div>
    </div>
  );
};
export default BeritaPerBulan;
