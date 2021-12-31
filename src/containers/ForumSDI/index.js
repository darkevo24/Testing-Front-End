import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import truncate from 'lodash/truncate';
import { ReactComponent as ForumSDIImage } from 'assets/ForumSDIImage.svg';
import { ForumSearch } from './ForumSearch';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { forumSDIDatasetSelector, getForumSDIData } from './reducer';
import { getCMSForumSDITags } from '../CMS/ForumSDI/reducer';
import RowLoader from 'components/Loader/RowLoader';
import { Col, Row } from 'react-bootstrap';
import UserImage from 'assets/userImage.png';

export const ForumSDI = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const { payload, loading, records } = useSelector(forumSDIDatasetSelector);

  useEffect(() => {
    dispatch(getCMSForumSDITags());
    handleAPICall({ page: 0, topik: '' });
  }, []);

  const handleAPICall = (params) => {
    dispatch(getForumSDIData(params));
  };

  const handleOnSearch = (value = '') => {
    handleAPICall({ page: 0, payload: { ...payload, topik: value.trim() } });
  };

  const handleOnTagChange = (data) => {
    handleAPICall({
      page: 0,
      payload: {
        ...payload,
        tag: data?.value || '',
      },
    });
  };

  return (
    <div className="sdp-forum-sdi-container">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <ForumSDIImage />
      </div>
      <Row className="justify-content-md-center mx-16">
        <Col lg="9">
          <div className="sdp-forum-sdi-bottom">
            <ForumSearch handleOnSearch={handleOnSearch} handleOnTagChange={handleOnTagChange} />
            <div className="border-bottom mb-26 mt-40">
              <h5 className="fw-600">Semua Topik</h5>
            </div>
            {loading ? (
              <RowLoader />
            ) : (
              records.map((item, index) => (
                <div className="border rounded-3 mb-24" key={`topic-${index}`}>
                  <div className="border p-15">
                    <div className="rounded-pill border-0 btn sdp-link-blue bg-blue-light">{item.topik}</div>
                  </div>
                  <div className="bg-secondary d-flex p-24">
                    <Row xs={1} md={4}>
                      {item.data.map((dataItem, dataIndex) => (
                        <Card
                          className="m-8 cursor-pointer"
                          style={{ width: '300px', height: '115px' }}
                          key={`tag-${dataIndex}`}
                          // onClick={() => history.push(`/forum-sdi/${dataItem.id}`)}
                        >
                          <Card.Title className="h6 fw-600">{truncate(dataItem.judul)}</Card.Title>
                          <Card.Body className="d-flex pt-10 pl-0">
                            <Card.Img
                              src={dataItem?.creator?.createdBy?.image || UserImage}
                              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                            />
                            <div className="mt-6">
                              <Card.Text className="ml-16 mb-10 fs-14 lh-17 sdp-text-grey-dark">
                                {dataItem?.creator?.name}
                              </Card.Text>
                              <Card.Subtitle className="ml-16 text-muted fs-14 sdp-text-disable">
                                {!dataItem?.tanggalPublish ? null : moment(dataItem.tanggalPublish).format('DD MMMM YYYY')}
                              </Card.Subtitle>
                            </div>
                          </Card.Body>
                        </Card>
                      ))}
                    </Row>
                  </div>
                </div>
              ))
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};
