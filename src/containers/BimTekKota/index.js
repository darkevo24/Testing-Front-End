import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import { BimtekLayout } from 'layouts/BimtekLayout';
import { useForm } from 'react-hook-form';
import { Dropdown } from 'components';
import { ReactComponent as LocationTag } from 'assets/location-tag.svg';
import { Search, NoPerminataanData } from 'components/Icons';

const BimtekKota = () => {
  const { control } = useForm({});

  const dataKota = [
    {
      id: 1,
      namaFile: 'Pendahuluan dan Latarbelakang',
      namaBimtek: 'Perencanaan dan Program Bimbingan Teknis',
      tanggal: '2021-08-09',
      lokasi: 'Jakarta Selatan',
      urlFile: '',
    },
    {
      id: 2,
      namaFile: 'Materi Pokok',
      namaBimtek: 'Perencanaan dan Program Bimbingan Teknis',
      tanggal: '2021-08-09',
      lokasi: 'Jakarta Selatan',
      urlFile: '',
    },
    {
      id: 2,
      namaFile: 'Penutupan',
      namaBimtek: 'Perencanaan dan Program Bimbingan Teknis',
      tanggal: '2021-08-09',
      lokasi: 'Jakarta Selatan',
      urlFile: '',
    },
    {
      id: 3,
      namaFile: 'Penutupan',
      namaBimtek: 'Perencanaan dan Program Bimbingan Teknis',
      tanggal: '2021-08-09',
      lokasi: 'Jakarta Selatan',
      urlFile: '',
    },
  ];

  return (
    <BimtekLayout className="sdp-bimtek-kota">
      <div className="fw-bold fs-32 mb-12">Kota Pelaksana</div>
      <Row className="mb-3">
        <Col xs={3}>
          <Dropdown name="filterName" control={control} placeholder="Kota" />
        </Col>
        <Col xs={5}>
          <InputGroup>
            <Form.Control variant="normal" type="text" placeholder="Cari" />
            <Search />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {dataKota.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center h-100 flex-column">
            <NoPerminataanData />
            <div className="text-black-50 mb-2 mt-2">No Data</div>
            <div>Pilih kota atau cari bimtek untuk menampilkan data</div>
          </div>
        ) : null}
        {dataKota.map((item, key) => (
          <KotaItem key={key} nama={item.namaFile} tanggal={item.tanggal} lokasi={item.lokasi} />
        ))}
      </Row>
    </BimtekLayout>
  );
};

const KotaItem = ({ nama, tanggal, lokasi }) => {
  return (
    <Col sm={4} className="p-10">
      <div className="sdp-bimtek-kota__item">
        <div className="fw-bold fs-16 mb-3">{nama}</div>
        <div className="mb-3">
          <span className="date">{tanggal}</span> - <span className="date">{tanggal}</span>
        </div>
        <div>
          <LocationTag className="mr-10" /> {lokasi}
        </div>
      </div>
    </Col>
  );
};

export default BimtekKota;
