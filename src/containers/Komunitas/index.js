import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { ReactComponent as SearchSvg } from 'assets/search.svg';
import Table from 'components/Table';
import Image1 from './images/image1.png';
import Image2 from './images/image2.png';
import Image3 from './images/image3.png';

const tempData = [
  {
    id: 1,
    name: 'Dr. Amelia Suganda',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vulputate lorem ut nisi aliquet condimentum. Pellentesque fringilla sagittis ante, eu ornare nisi bibendum nec.',
    rate: 3,
    icon: Image1,
  },
  {
    id: 2,
    name: 'Corey Korsgaard',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vulputate lorem ut nisi aliquet condimentum. Pellentesque fringilla sagittis ante, eu ornare nisi bibendum nec.',
    rate: 5,
    icon: Image2,
  },
  {
    id: 3,
    name: 'Kadin Bator',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vulputate lorem ut nisi aliquet condimentum. Pellentesque fringilla sagittis ante, eu ornare nisi bibendum nec.',
    rate: 0,
    icon: Image3,
  },
];

const getElem = (data) => {
  const cards = [];
  data.forEach((item) => {
    cards.push({
      card: (
        <div key={item.id} className="d-flex br-4 border-gray-stroke">
          <div className="br-12 m-16">
            <img src={item.icon} alt="" className="br-120" />
          </div>
          <div className="sdp-info-wrapper m-16">
            <label className="sdp-title">{item.name}</label>
            <p>{item.description}</p>
          </div>
          <div className="sdp-rating-wrapper m-16">
            <StarRatings
              rating={item.rate}
              starRatedColor="#FF0000"
              starEmptyColor="#E1E2EA"
              starHoverColor="#FF0000"
              changeRating={() => {}}
              name="rating"
            />
            <Button variant="outline-primary" className="sdp-rate-button">
              Ahli Statistik
            </Button>
          </div>
        </div>
      ),
    });
  });
  return cards;
};

const KomunitasAhliPage = () => {
  const tableConfig = {
    columns: [
      {
        accessor: 'card',
        Header: 'Card',
      },
    ],
    data: getElem(tempData),
    subTitle: 'Top 5 Ahli Minggu Ini',
    search: true,
    searchPlaceholder: 'Cari Ahli Berdasarkan Nama',
    searchButtonText: <SearchSvg />,
    onSearch: (searchText) => {
      // Todo: handle Search
    },
    showHeader: false,
  };

  return (
    <div className="sdp-komunitas-wrapper">
      <Row className="mx-500 mt-48">
        <Col>
          <Table {...tableConfig} />
        </Col>
      </Row>
    </div>
  );
};

export default KomunitasAhliPage;
