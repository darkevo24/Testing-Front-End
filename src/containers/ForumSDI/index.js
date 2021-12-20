import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { ReactComponent as ForumSDIImage } from 'assets/ForumSDIImage.svg';
import { ForumSearch } from './ForumSearch';
import Image1 from './images/image1.png';
import Image2 from './images/image2.png';
import Image3 from './images/image3.png';
import { useDispatch /*, useSelector*/ } from 'react-redux';
import { /*forumSDIDatasetSelector, */ getForumSDIData } from './reducer';

export const ForumSDI = () => {
  const dispatch = useDispatch();
  // const { payload, size, loading, page, records, totalRecords } = useSelector(forumSDIDatasetSelector);

  useEffect(() => {
    handleAPICall({ page: 0, q: '', status: '' });
  }, []);

  const handleAPICall = (params) => {
    dispatch(getForumSDIData(params));
  };

  // const handleOnSearch = (value = '') => {
  //   handleAPICall({ page: 0, q: value.trim() });
  // };
  //
  // const handleOnTagChange = (value = '') => {
  //   handleAPICall({ page: 0, q: value.trim() });
  // };

  return (
    <div className="sdp-forum-sdi-container">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <ForumSDIImage />
      </div>
      <div className="sdp-forum-sdi-bottom">
        <ForumSearch />
        <div className="border-bottom mb-26 mt-40">
          <h5 className="fw-600">Semua Topik</h5>
        </div>
        <div className="border rounded-3">
          <div className="border p-15">
            <button className="rounded-pill border-0 btn sdp-link-blue bg-blue-light">Rapat Dewan Pengarah</button>
          </div>
          <div className="bg-secondary d-flex p-8">
            <Card className="m-8" style={{ width: '300px', height: '115px' }}>
              <Card.Title className="h6 fw-600">Notulensi Rapat Dewan Pengarah</Card.Title>
              <Card.Body className="d-flex pt-10 pl-0">
                <Card.Img src={Image1} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div className="mt-6">
                  <Card.Text className="ml-16 mb-2 fs-14">Kukuh Teguh Sugianto</Card.Text>
                  <Card.Subtitle className="ml-16 text-muted fs-14">16 Februari 2020</Card.Subtitle>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="border rounded-3 mt-24">
          <div className="border p-15">
            <button className="rounded-pill border-0 btn sdp-error bg-red-light">Perencanaan Data</button>
          </div>
          <div className="bg-secondary d-flex flex-wrap p-8">
            <Card className="m-8" style={{ width: '300px', height: '115px' }}>
              <Card.Title className="h6 fw-600">Notulensi Rapat Dewan Pengarah</Card.Title>
              <Card.Body className="d-flex pt-10 pl-0">
                <Card.Img src={Image2} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div className="mt-6">
                  <Card.Text className="ml-16 mb-2 fs-14">Kukuh Teguh Sugianto</Card.Text>
                  <Card.Subtitle className="ml-16 text-muted fs-14">16 Februari 2020</Card.Subtitle>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="border rounded-3 mt-24">
          <div className="border p-15">
            <button className="rounded-pill border-0 btn sdp-text-purple bg-purple-light">Pengumpulan Data</button>
          </div>
          <div className="bg-secondary d-flex flex-wrap p-8">
            <Card className="m-8" style={{ width: '300px', height: '115px' }}>
              <Card.Title className="h6 fw-600">Notulensi Rapat Dewan Pengarah</Card.Title>
              <Card.Body className="d-flex pt-10 pl-0">
                <Card.Img src={Image3} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div className="mt-6">
                  <Card.Text className="ml-16 mb-2 fs-14">Kukuh Teguh Sugianto</Card.Text>
                  <Card.Subtitle className="ml-16 text-muted fs-14">16 Februari 2020</Card.Subtitle>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="border rounded-3 mt-24">
          <div className="border p-15">
            <button className="rounded-pill border-0 btn sdp-text-green bg-green-light">Pemeriksaan Data</button>
          </div>
          <div className="bg-secondary d-flex flex-wrap p-8">
            <Card className="m-8" style={{ width: '300px', height: '115px' }}>
              <Card.Title className="h6 fw-600">Notulensi Rapat Dewan Pengarah</Card.Title>
              <Card.Body className="d-flex pt-10 pl-0">
                <Card.Img src={Image1} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div className="mt-6">
                  <Card.Text className="ml-16 mb-2 fs-14">Kukuh Teguh Sugianto</Card.Text>
                  <Card.Subtitle className="ml-16 text-muted fs-14">16 Februari 2020</Card.Subtitle>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="border rounded-3 mt-24 mb-214">
          <div className="border p-15">
            <button className="rounded-pill border-0 btn sdp-text-grey-dark bg-gray">Penyebarluasan Data</button>
          </div>
          <div className="bg-secondary d-flex flex-wrap p-8">
            <Card className="m-8" style={{ width: '300px', height: '115px' }}>
              <Card.Title className="h6 fw-600">Notulensi Rapat Dewan Pengarah</Card.Title>
              <Card.Body className="d-flex pt-10 pl-0">
                <Card.Img src={Image2} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div className="mt-6">
                  <Card.Text className="ml-16 mb-2 fs-14">Kukuh Teguh Sugianto</Card.Text>
                  <Card.Subtitle className="ml-16 text-muted fs-14">16 Februari 2020</Card.Subtitle>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
