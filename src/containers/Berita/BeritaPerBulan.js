import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Loader } from 'components';
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
const renderComp = (el) => {
  return React.createElement(components[el.component], { ...el.props, key: el.component });
};
const BeritaPerBulan = () => {
  const [kanan, setKanan] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const { date } = useParams();
  const beritaLayoutState = useSelector(beritaLayoutSelector);
  const { records, status, loading } = useSelector(newsByMonthSelector);
  const fetchBeritaLayoutData = () => {
    dispatch(getBertaLayout());
  };
  useEffect(() => {
    if (status === 'idel') {
      const parmaValue = date.replace('-', '/');
      dispatch(getNewsByMonth(`perbulan/${parmaValue}?size=${10}`));
    }
  }, [dispatch, date, status]);

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

  const handleDetail = (e, id) => {
    e.preventDefault();
    history.push(`/berita/${id}`);
  };
  return (
    <div className="row mt-24">
      {loading && <Loader fullscreen />}
      <div className="col-lg-2"></div>
      <div className="col-lg-6 wrapper" style={{ paddingRight: '5.5%' }}>
        {records.length
          ? records.map((record, i) => {
              return (
                <div key={i}>
                  <div className="row my-20 border-bottom pb-10 ">
                    <div className="col-lg-4" style={{ paddingRight: '24px' }}>
                      <img className="image" src={record.image} style={{ width: '100%' }} />
                    </div>
                    <div className="col-lg-8">
                      <div className="topik">{record.kategori}</div>
                      <div className="judul" onClick={(e) => handleDetail(e, record.id)}>
                        {record.judul}
                      </div>
                      <div className="konten">{record.slug}</div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>

      <div className="col-lg-2">{kanan.length > 0 && kanan.map((el) => renderComp(el))}</div>
    </div>
  );
};
export default BeritaPerBulan;
