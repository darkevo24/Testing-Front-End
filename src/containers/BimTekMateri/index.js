import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { BimtekLayout } from 'layouts/BimtekLayout';
import { useForm } from 'react-hook-form';
import { DatePicker, Dropdown } from 'components';
import { ReactComponent as LocationTag } from 'assets/location-tag.svg';
import { ReactComponent as DownloadIcon } from 'assets/download-red.svg';
import { NoPerminataanData } from 'components/Icons';

import './bimtekmateri.scss';

const BimtekMateri = () => {
  const {
    control,
  } = useForm({});

  const dataMateri = [
    {
      "id": 1,
      "namaFile": "Pendahuluan dan Latarbelakang",
      "namaBimtek": "Perencanaan dan Program Bimbingan Teknis",
      "tanggal": "2021-08-09",
      "lokasi": "Jakarta Selatan",
      "urlFile": ""
    },
    {
      "id": 2,
      "namaFile": "Materi Pokok",
      "namaBimtek": "Perencanaan dan Program Bimbingan Teknis",
      "tanggal": "2021-08-09",
      "lokasi": "Jakarta Selatan",
      "urlFile": ""
    },
    {
      "id": 2,
      "namaFile": "Penutupan",
      "namaBimtek": "Perencanaan dan Program Bimbingan Teknis",
      "tanggal": "2021-08-09",
      "lokasi": "Jakarta Selatan",
      "urlFile": ""
    }
  ];

  return (
    <BimtekLayout className="sdp-bimtek-materi">
      <Row className="mb-12">
        <Col xs={4}>
          <Dropdown
            name="filterName"
            control={control}
            placeholder="Nama Bimtek"
          />
        </Col>
        <Col xs={4}>
          <DatePicker
            name="filterDate"
            control={control}
            placeholder="Filter Tanggal"
          />
        </Col>
      </Row>
      {dataMateri.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center h-100 flex-column">
          <NoPerminataanData />
          <div className="text-black-50 mb-2 mt-2">No Data</div>
        </div>
      ) : null}
      {dataMateri.map((item, key) => (
        <MateriItem
          key={key}
          namaFile={item.namaFile}
          namaBimtek={item.namaBimtek}
          tanggal={item.tanggal}
          lokasi={item.lokasi}
          urlFile={item.urlFile}
        />
      ))}
    </BimtekLayout>
  );
};

const MateriItem = ({ namaFile, namaBimtek, tanggal, lokasi, urlFile }) => {
  return (
    <Row className="mb-2 ml-0 sdp-bimtek-materi__item">
      <Col sm={9}>
        <div className="fw-bold fs-16 mb-3">{namaFile}</div>
        <div className="mb-12">{namaBimtek}</div>
        <div>
          <span className="mr-40 bg-gray fs-14 p-10 mb-10">{tanggal}</span>
          <span><LocationTag className="mr-10"/> {lokasi}</span>
        </div>
      </Col>
      <Col sm={3} className="text-end">
        <Button variant="secondary" className="fs-14 p-12">
          <DownloadIcon className="mr-10" /> Download Materi
        </Button>
      </Col>
    </Row>
  );
};

export default BimtekMateri;
