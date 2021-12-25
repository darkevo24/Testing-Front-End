import React from 'react';
import moment from 'moment';
import { detailDataSelector } from '../CMS/BeritaBaru/reducer';
import { useSelector } from 'react-redux';
import { CMSTopDetail } from 'components';

const CMSBeritaPreview = () => {
  // const berita = JSON.parse(window.localStorage.getItem('preview-berita'));
  const { record } = useSelector(detailDataSelector);

  return (
    <div>
      <CMSTopDetail status="Preview" />
      <div className="mx-400 my-40">
        <div className="fs-32 fw-600 mb-24">{record?.judul}</div>
        <div className="fs-16 mb-16">{record?.createdByDesc}</div>
        <div className="sdp-text-disable mb-24 fs-14">{formatDate(record?.publishDate)}</div>
        <img className="w-100" alt="thumbnail" src={record?.mainImage}></img>
        <div className="fs-18 mt-32" dangerouslySetInnerHTML={{ __html: record?.content }}></div>
      </div>
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
