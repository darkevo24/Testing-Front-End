import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { ReactComponent as ForumSDIImage } from 'assets/ForumSDIImage.svg';
import { ForumSearch } from './ForumSearch';
import { useDispatch, useSelector } from 'react-redux';
import { forumSDIDatasetSelector, getForumSDIData } from './reducer';
import { getCMSForumSDITags } from '../CMS/ForumSDI/reducer';
import RowLoader from 'components/Loader/RowLoader';
import { Col, Row } from 'react-bootstrap';

export const ForumSDI = () => {
  const dispatch = useDispatch();
  const { payload, loading, records } = useSelector(forumSDIDatasetSelector);

  useEffect(() => {
    handleAPICall({ page: 0, q: '', status: '' });
  }, []);

  const handleAPICall = (params) => {
    dispatch(getCMSForumSDITags());
    dispatch(getForumSDIData(params));
  };

  const handleOnSearch = (value = '') => {
    handleAPICall({ page: 0, payload: { ...payload, q: value.trim() } });
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
        <Col lg="8">
          <div className="sdp-forum-sdi-bottom">
            <ForumSearch handleOnSearch={handleOnSearch} handleOnTagChange={handleOnTagChange} />
            <div className="border-bottom mb-26 mt-40">
              <h5 className="fw-600">Semua Topik</h5>
            </div>
            {loading ? (
              <RowLoader />
            ) : (
              records.map((item, index) => (
                <div className="border rounded-3" key={`topic-${index}`}>
                  <div className="border p-15">
                    <div className="rounded-pill border-0 btn sdp-link-blue bg-blue-light">{item.topik}</div>
                  </div>
                  {item.data.map((dataItem, dataIndex) => (
                    <div className="bg-secondary d-flex p-8" key={`tag-${dataIndex}`}>
                      <Card className="m-8" style={{ width: '300px', height: '115px' }}>
                        <Card.Title className="h6 fw-600">{dataItem.judul}</Card.Title>
                        <Card.Body className="d-flex pt-10 pl-0">
                          <Card.Img
                            src={dataItem?.creator?.image || ''}
                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                          />
                          <div className="mt-6">
                            <Card.Text className="ml-16 mb-2 fs-14">{dataItem?.creator?.name}</Card.Text>
                            <Card.Subtitle className="ml-16 text-muted fs-14">16 Februari 2020</Card.Subtitle>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};
