import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BimtekLayout } from 'layouts/BimtekLayout';
import BimTekJadwalItem from './item.js';
import './bimtekjadwal.scss';

const BimTekJadwal = () => {
  let currentYear = new Date().getFullYear();
  let filterCategory = [];
  let filterCity = [];
  let filterYear = [];
  let dataJadwal = [
    {
      title: 'Perencanaan dan Program Bimbingan Teknis Tahap 1',
      startDate: '09 Agustus 2021',
      endDate: '12 Agustus 2021',
      city: 'Jakarta',
      location: 'Grand Ball Room, Hotel Mulia Senayan,  Senayan, Kebayoran Baru, Jakarta Selatan,  DKI Jakarta',
      speaker: 'Dr. Amelia Suganda',
      materi:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      title: 'Perencanaan dan Program Bimbingan Teknis Tahap 2',
      startDate: '13 Agustus 2021',
      endDate: '15 Agustus 2021',
      city: 'Jakarta',
      location: 'Grand Ball Room, Hotel Mulia Senayan,  Senayan, Kebayoran Baru, Jakarta Selatan,  DKI Jakarta',
      speaker: 'Dr. Amelia Suganda',
      materi:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];

  for (var i = 0; i < 10; i++) {
    filterYear.push(currentYear - i);
  }

  return (
    <BimtekLayout>
      <div>
        <Row className="bimtek-filter mb-3">
          <Col xs={4}>
            <Form.Select>
              <option>Kategori Bimtek</option>
              {filterCategory.map((category, key) => (
                <option key={key}>{category}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={4}>
            <Form.Select>
              <option>Pilih Kota Pelaksanaan</option>
              {filterCity.map((city, key) => (
                <option key={key}>{city}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={2}>
            <Form.Select>
              {filterYear.map((year, key) => (
                <option key={key}>{year}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        {dataJadwal.map((item, key) => (
          <BimTekJadwalItem
            key={key}
            title={item.title}
            startDate={item.startDate}
            endDate={item.endDate}
            city={item.city}
            location={item.location}
            speaker={item.speaker}
            materi={item.materi}
          />
        ))}
      </div>
    </BimtekLayout>
  );
};

export default BimTekJadwal;
