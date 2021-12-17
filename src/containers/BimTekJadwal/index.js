import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BimtekLayout } from 'layouts/BimtekLayout';
import BimTekJadwalItem from './item.js';
import './bimtekjadwal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  bimtekJadwalDatasetSelector,
  bimtekJadwalTagsDatasetSelector,
  getBimtekJadwalData,
  getBimtekJadwalTagsData,
} from './reducer.js';
import moment from 'moment';
import 'moment/locale/id';

moment.locale('id');

const BimTekJadwal = () => {
  let currentYear = new Date().getFullYear();
  let filterCity = [];
  let filterYear = [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBimtekJadwalData());
    dispatch(getBimtekJadwalTagsData());
  }, []);

  const { records: jadwalData } = useSelector(bimtekJadwalDatasetSelector);
  const filterCategory = useSelector(bimtekJadwalTagsDatasetSelector);

  const filterCategoryData = (e) => {
    dispatch(getBimtekJadwalData({ tags: e.target.value }));
  };
  for (var i = 0; i < 10; i++) {
    filterYear.push(currentYear - i);
  }
  return (
    <BimtekLayout>
      <div>
        <Row className="bimtek-filter mb-3">
          <Col xs={4}>
            <Form.Select onChange={(e) => filterCategoryData(e)}>
              <option>Kategori Bimtek</option>
              {filterCategory.map((category, key) => (
                <option key={key} value={category}>
                  {category}
                </option>
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
        {jadwalData.map((item, key) => (
          <BimTekJadwalItem
            key={key}
            title={item.namaBimtek}
            startDate={moment(item.tanggalMulaiDisetujui).format('D MMMM YYYY')}
            endDate={moment(item.tanggalSelesaiDisetujui).format('D MMMM YYYY')}
            city={item.kota}
            location={item.tempat}
            speaker={item.pembicara}
            materi={item.materi}
          />
        ))}
      </div>
    </BimtekLayout>
  );
};

export default BimTekJadwal;
