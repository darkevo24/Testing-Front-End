import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import truncate from 'lodash/truncate';
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';
import { getForumSDIDataByID, forumSDIDetailSelector } from './reducer';
import { ReactComponent as Download } from 'assets/download-red.svg';
import { Attachment } from 'components/Icons';
import { get } from 'utils/request';
import { splitByLastChar } from 'utils/helper';
import { Loader } from 'components';

export const ForumSDIDetail = () => {
  const [loader, setLoader] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, detail } = useSelector(forumSDIDetailSelector);

  useEffect(() => {
    dispatch(getForumSDIDataByID(id));
  }, []);

  const downloadFile = async (url, fileName = '') => {
    setLoader(fileName);
    await get(url, { download: true, fileName })
      .then(() => {
        setLoader(null);
      })
      .catch(() => {
        setLoader(null);
      });
  };

  return (
    <div className="sdp-forum-sdi-detail-container mt-80 mb-184">
      {loading && <Loader fullscreen />}
      <Row className="justify-content-md-center mx-16">
        {error ? <span className="sdp-error">{error}</span> : null}
        <Col lg="6" className="d-flex flex-col">
          <span className="pb-16 sdp-text-grey-dark">{detail?.topik}</span>
          <label className="pb-16 sdp-heading">{detail?.judul}</label>
          <span className="pb-16 sdp-text-disable">
            {moment(detail?.tanggalDraft, 'DD-MMMM-YYYY').format('DD MMMM YYYY')}
          </span>
          <div>
            {detail?.tags.map((elem) => (
              <span className="border-light p-5 bg-gray w-fit-content mr-16">{elem}</span>
            ))}
          </div>
          <div dangerouslySetInnerHTML={{ __html: detail?.isi }} className="mt-40 sdp-text-editor-control" />
        </Col>
        <Col lg="2">
          <label className="sdp-sub-heading pb-16">
            <Attachment />
            <span className="ml-11">Lampiran</span>
          </label>
          <div className="border-bottom" />
          {detail?.lampiran.map((elem) => (
            <>
              <div className="p-16 d-flex justify-content-between">
                <span className="mr-11">{truncate(splitByLastChar(elem?.fileName, '_'))}</span>
                <div onClick={() => downloadFile(elem.location, elem.fileName)}>
                  {loader === elem.fileName ? (
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-10" />
                  ) : (
                    <Download />
                  )}
                </div>
              </div>
              <div className="border-bottom" />
            </>
          ))}
        </Col>
      </Row>
    </div>
  );
};
