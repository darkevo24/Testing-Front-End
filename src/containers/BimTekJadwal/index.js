import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BimtekLayout } from 'layouts/BimtekLayout';
import BimTekJadwalItem from './item.js';
import './bimtekjadwal.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  bimtekJadwalDatasetSelector,
  bimtekJadwalLocationsDatasetSelector,
  bimtekJadwalTagsDatasetSelector,
  getBimtekJadwalData,
  getBimtekJadwalLocationsData,
  getBimtekJadwalTagsData,
} from './reducer.js';
import moment from 'moment';
import 'moment/locale/id';
import { NoPerminataanData } from 'components/Icons.js';

moment.locale('id');

const BimTekJadwal = () => {
  let currentYear = new Date().getFullYear();
  let filterYear = [];
  const filterMonth = [
    'Januari',
    'Februari',
    'berbaris',
    'April',
    'Boleh',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const [paramsData, setParamsData] = useState({});
  const [disableOption, setDisableOption] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBimtekJadwalData());
    dispatch(getBimtekJadwalTagsData());
    dispatch(getBimtekJadwalLocationsData());
  }, []);

  useEffect(() => {
    dispatch(getBimtekJadwalData(paramsData));
  }, [paramsData]);

  const { records: jadwalData } = useSelector(bimtekJadwalDatasetSelector);
  const filterLocations = useSelector(bimtekJadwalLocationsDatasetSelector);
  const filterCategory = useSelector(bimtekJadwalTagsDatasetSelector);

  const handleFilterChange = (e) => {
    setParamsData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setDisableOption(true);
  };
  for (var i = 0; i < 10; i++) {
    filterYear.push(currentYear - i);
  }

  return (
    <BimtekLayout>
      <div className="h-100">
        <Row className="bimtek-filter mb-3">
          <Col xs={4}>
            <Form.Select name="tag" onChange={handleFilterChange}>
              <option disabled={disableOption}>Kategori Bimtek</option>
              {filterCategory.map((category, key) => (
                <option key={key} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={4}>
            <Form.Select name="kota" onChange={handleFilterChange}>
              <option disabled={disableOption}>Pilih Kota Pelaksanaan</option>
              {filterLocations?.map((city, key) => (
                <option key={key} value={city.provinsi}>
                  {city.nama}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={2}>
            <Form.Select name="tahun" onChange={handleFilterChange}>
              <option disabled={disableOption}>Pilih Tahun</option>
              {filterYear.map((year, key) => (
                <option key={key}>{year}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={2}>
            <Form.Select name="bulan" onChange={handleFilterChange}>
              <option disabled={disableOption}>Pilih Bulan</option>
              {filterMonth.map((month, key) => (
                <option value={key + 1} key={key}>
                  {month}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        {!jadwalData.length ? (
          <div className="d-flex justify-content-center align-items-center h-100 flex-column mt-5">
            <NoPerminataanData />
            <div className="text-black-50 mb-2 mt-2">No Data</div>
          </div>
        ) : (
          jadwalData.map((item, key) => (
            <BimTekJadwalItem
              key={key}
              title={item.namaBimtek}
              startDate={moment(item.tanggalMulaiDisetujui).format('D MMMM YYYY')}
              endDate={moment(item.tanggalSelesaiDisetujui).format('D MMMM YYYY')}
              city={item.kota}
              location={item.tempat}
              speaker={item.pembicara}
              materi={item.materi}
              id={item.id}
            />
          ))
        )}
      </div>
    </BimtekLayout>
  );
};

export default BimTekJadwal;
