import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CMSTopDetail } from 'components';
import bn from 'utils/bemNames';
import moment from 'moment';

const bem = bn('content-detail');

const CMSBeritaPreview = () => {
  const berita = JSON.parse(window.localStorage.getItem('preview-berita'));

  return (
    <div className="mx-400 my-40">
      <div className="fs-32 fw-600 mb-24">{berita?.judul}</div>
      <div className="fs-16 mb-16">{berita?.createdBy}</div>
      <div className="sdp-text-disable mb-24 fs-14">{formatDate(berita?.publishDate)}</div>
      <img className="w-100" src={berita?.mainImage}></img>
      <div className="fs-18 mt-32" dangerouslySetInnerHTML={{ __html: berita?.content }}></div>
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

export default CMSBeritaPreview;
