import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { ReactComponent as SearchSvg } from 'assets/search.svg';
import Table from 'components/Table';
import Image1 from './images/image1.png';
import Image2 from './images/image2.png';
import Image3 from './images/image3.png';
import { Kontak_list } from 'utils/constants';

const tempData = [
  {
    id: 1,
    name: 'Dr. Amelia Suganda',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vulputate lorem ut nisi aliquet condimentum. Pellentesque fringilla sagittis ante, eu ornare nisi bibendum nec.',
    rate: 3,
    icon: Image1,
    tags: ['Ahli Statistik', 'Komunitas Ekonomi Indonesia', 'DKI Jakarta'],
    kontak: [
      { name: 'facebook', link: '' },
      { name: 'twitter', link: '' },
      { name: 'instagram', link: '' },
      { name: 'youtube', link: '' },
    ],
  },
  {
    id: 2,
    name: 'Corey Korsgaard',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vulputate lorem ut nisi aliquet condimentum. Pellentesque fringilla sagittis ante, eu ornare nisi bibendum nec.',
    rate: 5,
    icon: Image2,
    tags: ['Ahli Statistik', 'Komunitas Ekonomi Indonesia', 'DKI Jakarta'],
    kontak: [
      { name: 'facebook', link: '' },
      { name: 'twitter', link: '' },
      { name: 'instagram', link: '' },
      { name: 'youtube', link: '' },
    ],
  },
  {
    id: 3,
    name: 'Kadin Bator',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vulputate lorem ut nisi aliquet condimentum. Pellentesque fringilla sagittis ante, eu ornare nisi bibendum nec.',
    rate: 0,
    icon: Image3,
    tags: ['Ahli Statistik', 'Komunitas Ekonomi Indonesia', 'DKI Jakarta'],
    kontak: [
      { name: 'facebook', link: '' },
      { name: 'twitter', link: '' },
      { name: 'instagram', link: '' },
      { name: 'youtube', link: '' },
    ],
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
            <div className="mt-16 d-flex mb-12">
              {item.tags.map((tag) => (
                <div className="br-2 border-gray-stroke px-6 py-5 sdp-text-grey-dark mr-8 bg-gray">{tag}</div>
              ))}
            </div>
            <p>{item.description}</p>
            <div className="sdp-rating-wrapper d-flex justify-content-between">
              <div className="d-flex">
                {item.kontak.map((kontak_item) => {
                  const kontakDetail = Kontak_list.find((kontak) => kontak.name === kontak_item.name);
                  return <div className="br-5 border-gray-stroke p-10 sdp-text-grey-dark mr-8">{kontakDetail.icon}</div>;
                })}
              </div>
              <Button variant="primary" className="sdp-rate-button justify-content-end">
                Lihat CV
              </Button>
            </div>
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
