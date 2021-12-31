import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch /*, useSelector*/ } from 'react-redux';
import { getForumSDIDataByID /*, forumSDIDetailSelector*/ } from './reducer';
import { Col, Row } from 'react-bootstrap';

export const ForumSDIDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const { loading, error, detail } = useSelector(forumSDIDetailSelector);

  useEffect(() => {
    dispatch(getForumSDIDataByID(id));
  }, []);

  return (
    <div className="sdp-forum-sdi-detail-container">
      <Row className="justify-content-md-center mx-16">
        <Col lg="9" />
        <Col />
      </Row>
    </div>
  );
};
