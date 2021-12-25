import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Loader from 'components/Loader';
import { beritaLayoutSelector, getBertaLayout } from 'containers/CMS/BeritaLayout/reducer';
import userIcon from 'assets/user.svg';
import worldIcon from 'assets/world.svg';
import fbIcon from 'assets/fb.svg';
import twitterIcon from 'assets/twitterIcon.svg';
import shareIcon from 'assets/share.svg';
import clockIcon from 'assets/clock.svg';
import Search from './Search';
import BeritaUtama from './BeritaUtama';
import BeritaUtamaLain from './BeritaUtamaLain';
import KegiatanSatuData from './KegiatanSatuData';
import ListBerita from './ListBerita';
import TopikPopuler from './TopikPopuler';
import BeritaLainnya from './BeritaLainnya';
import Populer from './Populer';
import Tweets from './Tweets';
import { newsDetailSelector, getNewsDetail } from './reducer';
import './berita.scss';

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

const BeritaUtamaDetail = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { record, isLoading } = useSelector(newsDetailSelector);

  useEffect(() => {
    if (!isLoading) {
      dispatch(getNewsDetail(`${id}`));
    }
  }, [dispatch]);

  const [kanan, setKanan] = useState([]);

  const beritaLayoutState = useSelector(beritaLayoutSelector);
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
        setKanan(obj.kanan);
      }
    }
  }, [beritaLayoutState]);

  return (
    <div className="row mt-24">
      {isLoading && <Loader fullscreen />}
      <div className="col-lg-2"></div>
      <div className="col-lg-6" style={{ paddingRight: '5.5%' }}>
        <div>
          <div className="fs-32 fw-600 mb-24">{record?.judul}</div>
          <div className="d-flex flex-row">
            <img src={userIcon} />
            <span className="userProfile fs-16 mt-8">{record?.createBy}</span>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <img src={clockIcon} className="mx-8" />
            <div className="sdp-text-disable mb-24 fs-14">{formatDate(record?.publishDate)}</div>
            <div className="mr-8 my-12">
              <img src={worldIcon} className="mx-8" />
              <img src={fbIcon} className="mx-8" />
              <img src={twitterIcon} className="mx-8" />
              <img src={shareIcon} className="mx-8" />
            </div>
          </div>
          <img className="w-100" src={record.mainImage} />
          <div className="fs-18 mt-32 overview" dangerouslySetInnerHTML={{ __html: record?.content }}></div>
        </div>
      </div>
      <div className="col-lg-2">{kanan.length > 0 && kanan.map((el) => renderComp(el))}</div>
    </div>
  );
};

const formatDate = (date) => {
  if (!date) {
    return '';
  }
  let currentDate = moment(date).format('LLLL');
  return currentDate.toString();
};
export default BeritaUtamaDetail;
