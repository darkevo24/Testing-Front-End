import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import { BimtekLayout } from 'layouts/BimtekLayout';
import { useForm } from 'react-hook-form';
import { Dropdown } from 'components';
import { ReactComponent as LocationTag } from 'assets/location-tag.svg';
import { Search, NoPerminataanData } from 'components/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { bimtekDokumentasiDatasetSelector, getBimtekDokumentasi } from './reducer';
import moment from 'moment';
import { bimtekJadwalLocationsDatasetSelector, getBimtekJadwalLocationsData } from 'containers/BimTekJadwal/reducer';
import './bimtekKota.scss';

const BimtekKota = () => {
  const { control, watch } = useForm({});
  const dispatch = useDispatch();
  const watchNamaBimtek = watch('filterName');
  const [filterNamaBimtek, setFilterNamaBimtek] = useState();

  useEffect(() => {
    dispatch(getBimtekDokumentasi());
    dispatch(getBimtekJadwalLocationsData());
  }, []);

  useEffect(() => {
    const params = {
      ...(filterNamaBimtek ? { nama: filterNamaBimtek } : {}),
      ...(watchNamaBimtek?.value ? { kota: watchNamaBimtek?.value } : {}),
    };
    dispatch(getBimtekDokumentasi(params));
  }, [watchNamaBimtek, filterNamaBimtek]);
  const { records: dataKota } = useSelector(bimtekDokumentasiDatasetSelector);
  const kotaFilterData = useSelector(bimtekJadwalLocationsDatasetSelector);

  const changeNamaBimtek = (e) => {
    setFilterNamaBimtek(e.target.value);
  };
  return (
    <BimtekLayout className="sdp-bimtek-kota">
      <div className="fw-bold fs-32 mb-12">Kota Pelaksana</div>
      <Row className="mb-3">
        <Col xs={3}>
          <Dropdown
            name="filterName"
            control={control}
            placeholder="Kota"
            options={kotaFilterData.map((kota) => ({
              value: kota.id,
              label: kota.nama,
            }))}
          />
        </Col>
        <Col xs={5}>
          <InputGroup>
            <Form.Control variant="normal" type="text" placeholder="Cari" onChange={changeNamaBimtek} />
            <div className="searchNamaBimtek">
              <Search />
            </div>
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
          <KotaItem key={key} nama={item.namaBimtek} tanggal={moment(item.tanggal).format('YYYY-MM-D')} lokasi={item.kota} />
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
