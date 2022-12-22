import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { TwitterShareButton, TwitterIcon, FacebookIcon, FacebookShareButton } from 'react-share';
import Loader from 'components/Loader';
import { beritaLayoutSelector, getBertaLayout } from 'containers/CMS/BeritaLayout/reducer';
import clockIcon from 'assets/clock.svg';
import viewIcon from 'assets/view.svg';
import { ReactComponent as ArrowSmall } from 'assets/arrow-small.svg';
import { ReactComponent as Stripe } from 'assets/stripe.svg';
import logoSDI from 'assets/logo-satu-data-id.jpg';
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
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { apiUrls, post } from 'utils/request';

const Tag = styled.div`
  font-size: 14px;
  color: #515154;
  background: #f5f6fa;
  border-radius: 4px;
  padding: 6px 12px;
  display: inline-block;
  margin: 0 8px 8px 0;
`;

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

  // useEffect(() => {
  //   if (!isLoading) {
  //     dispatch(getNewsDetail(`${id}`));
  //     //console.log get the title

  //     // const slug = slugify(record.judul);
  //     // console.log('+', slug);
  //   }
  // }, [dispatch, id]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getNewsDetail(`${id}`));
    };
    fetchData().catch(console.error);
  }, [dispatch, id]);

  const [kanan, setKanan] = useState([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [errorSubscribe, setErrorSubscribe] = useState(false);

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

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      sendEmail();
      setErrorSubscribe(false);
      setSubscribed(true);
      setEmail('');
    }
  };

  //try function to send email
  const sendEmail = async () => {
    try {
      const response = await post(apiUrls.userSubscribe, { email: email });
      if (response.status === 200) {
        setSubscribed(true);
      }
    } catch (error) {
      setErrorSubscribe(true);
      setSubscribed(false);
    }
  };

  return (
    <div className="row mt-24">
      {isLoading && <Loader fullscreen />}
      <div className="col-lg-2"></div>
      <div className="col-lg-6 mr-16">
        <div>
          <div className="d-flex align-items-center mb-24 mt-24">
            <a href="/" className=" text-decoration-none sdp-text-disable fs-14 text-decoration-none fw-500">
              Beranda
            </a>
            <ArrowSmall className="mx-8" />
            <a href="/berita" className="sdp-text-disable fs-14 text-decoration-none fw-500">
              Berita
            </a>
            <Stripe className="mx-8 sdp-text-grey-dark" style={{ marginBotttom: '3px' }} />
            <a href={window.location.href} className="sdp-text-grey-dark fs-14 fw-500 text-decoration-none">
              {record?.judul}
            </a>
          </div>
          <div className="fs-32 fw-600 mb-24">{record?.judul}</div>
          {record?.tagLine?.map((tag) => (
            <Tag>{tag}</Tag>
          ))}
          <div className="d-flex flex-row">
            <span className="userProfile fs-16 mt-8">{record?.createBy}</span>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex pt-20" style={{ minWidth: '300px' }}>
              <img src={clockIcon} className="mx-8 w-16 h-16" alt="" />
              <div className="sdp-text-disable mb-24 fs-14">{formatDate(record?.tanggalPublis)}</div>
            </div>
            <div className="d-flex pt-20" style={{ minWidth: '300px' }}>
              <img src={viewIcon} className="mx-8 w-16 h-16" alt="" />
              <div className="sdp-text-disable mb-24 fs-14">{formatNumber(record?.visitCounter)}</div>
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
        <div className="d-flex flex-column justify-content-between align-items-center mt-50 mb-50">
          <hr
            className="w-100 border-1"
            style={{
              position: 'relative',
              top: '13px',
            }}
          />
          <img style={{ width: '80px', position: 'absolute', border: '8px solid #FFF' }} src={logoSDI} alt="" />
          <div className="fs-18 mt-50">
            <p className="w-75 mx-auto text-center">
              "Dapatkan informasi terkini dari
              <span className="fs-18 fw-600 "> Satu Data Indonesia </span>
              langsung lewat email Anda."
            </p>
            <Form onSubmit={handleSubscribe} className="d-flex justify-content-center">
              <input
                type="email"
                placeholder="Email"
                className="form-control w-50 d-inline"
                onChange={handleEmail}
                value={email}
              />
              <Button className="ml-10" variant="dark" style={{ width: '112px' }} type="submit">
                Subscribe
              </Button>
            </Form>
            {subscribed && !errorSubscribe && <p className="text-center mt-32">Terima kasih telah berlangganan</p>}
            {errorSubscribe && <p className="text-center mt-32">Email sudah berlangganan, coba email lain.</p>}
          </div>
        </div>
      </div>
      <div className="col-lg-2">{kanan.length > 0 && kanan.map((el) => renderComp(el))}</div>
    </div>
  );
};

//function to turn 000 to K and 000000 to M
const formatNumber = (num) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(0) + 'K'; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(0) + 'M'; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
};

const formatDate = (date) => {
  if (!date) {
    return '';
  }
  let currentDate = moment(date).format('LLLL');
  return currentDate.toString();
};
export default BeritaUtamaDetail;
