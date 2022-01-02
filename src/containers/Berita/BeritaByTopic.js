import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Loader } from 'components';
import { ReactComponent as ArrowLeft } from 'assets/arrow-left.svg';
import { beritaLayoutSelector, getBertaLayout } from 'containers/CMS/BeritaLayout/reducer';
import Search from './Search';
import BeritaUtama from './BeritaUtama';
import BeritaUtamaLain from './BeritaUtamaLain';
import KegiatanSatuData from './KegiatanSatuData';
import ListBerita from './ListBerita';
import TopikPopuler from './TopikPopuler';
import BeritaLainnya from './BeritaLainnya';
import Populer from './Populer';
import Tweets from './Tweets';
import { getNewsByTopic, newsByTopicSelector, popularTopicSelector } from './reducer';
import { SectionTitle } from '.';

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
const BeritaByTopik = () => {
  const { id } = useParams();
  const [kanan, setKanan] = useState([]);
  const [pageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [topic, setTopic] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const beritaLayoutState = useSelector(beritaLayoutSelector);
  const { records, loading } = useSelector(newsByTopicSelector);
  const { records: dataPopularTopic } = useSelector(popularTopicSelector);

  useEffect(() => {
    if (id) {
      const topic = dataPopularTopic.find((el) => el.id === parseInt(id));
      setTopic(topic?.keterangan);
    }
  }, [id, dataPopularTopic]);

  const fetchBeritaLayoutData = () => {
    dispatch(getBertaLayout());
  };
  useEffect(() => {
    dispatch(getNewsByTopic(`tagline/${id}?pageNo=${pageNo}&pageSize=${pageSize}`));
  }, [dispatch, id, pageSize]);

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

  const handleLoadMore = () => {
    setPageSize(pageSize + 10);
  };
  const handleBack = () => {
    history.goBack();
  };
  return (
    <div className="row mt-24">
      {loading && <Loader fullscreen />}
      <div className="col-lg-2"></div>
      <div className="col-lg-6  pr-5">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle>
              <ArrowLeft onClick={handleBack} className="cursor-pointer" />
              <strong className="ml-8">Topic: {topic}</strong>
            </SectionTitle>
          </div>
        </div>
        {records.length
          ? records.map((record, i) => {
              return (
                <div key={i}>
                  <div className="row my-20 border-bottom pb-10 ">
                    <div className="col-lg-4 pr-24">
                      <img className="image w-100" src={record.image} />
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
        <div className="row">
          {records.length >= 10 && (
            <button className="loadMoreBUtton" onClick={handleLoadMore}>
              Muat Lebih Banyak
            </button>
          )}
        </div>
      </div>

      <div className="col-lg-2">{kanan.length > 0 && kanan.map((el) => renderComp(el))}</div>
    </div>
  );
};
export default BeritaByTopik;
