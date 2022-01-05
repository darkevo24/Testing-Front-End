import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { TwitterShareButton, TwitterIcon, FacebookIcon, FacebookShareButton } from 'react-share';
import Loader from 'components/Loader';
import { beritaLayoutSelector, getBertaLayout } from 'containers/CMS/BeritaLayout/reducer';
import userIcon from 'assets/user.svg';
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
import { facebookAppId } from 'utils/constants';

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

  const shareUrl = window.location.origin + window.location.pathname;
  const shareTitle = record.title;

  useEffect(() => {
    if (!isLoading) {
      dispatch(getNewsDetail(`${id}`));
    }
  }, [dispatch, id]);

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
      <div className="col-lg-6 pr-5">
        <div>
          <div className="fs-32 fw-600 mb-24">{record?.judul}</div>
          <div className="d-flex flex-row">
            <img src={userIcon} alt="" />
            <span className="userProfile fs-16 mt-8">{record?.createBy}</span>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex pt-20" style={{ minWidth: '300px' }}>
              <img src={clockIcon} className="mx-8 w-16 h-16" alt="" />
              <div className="sdp-text-disable mb-24 fs-14">{formatDate(record?.tanggalPublis)}</div>
            </div>
            <div className="mr-8 my-12">
              <TwitterShareButton className="mx-4" url={shareUrl} title={shareTitle}>
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              <FacebookShareButton className="mx-4" url={shareUrl} appId={facebookAppId}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
            </div>
          </div>
          <img className="w-100" src={record.mainImage} alt="" />
          <div className="fs-18 mt-32 beritaDetailContent" dangerouslySetInnerHTML={{ __html: record?.content }}></div>
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
