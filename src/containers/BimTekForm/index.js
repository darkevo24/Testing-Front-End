import React, { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { BimtekLayout } from 'layouts/BimtekLayout';

import './bimtekform.scss';
import {
  bimtekJadwalLocatonsDatasetSelector,
  bimtekJadwalTagsDatasetSelector,
  getBimtekJadwalLocationsData,
  getBimtekJadwalTagsData,
} from 'containers/BimTekJadwal/reducer';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { formulirPendaftaranDatasetSelector, getFormulirPendaftaranData } from './reducer';
import { apiUrls } from 'utils/constants';
import { post } from 'utils/request';

const BimTekForm = () => {
  const dispatch = useDispatch();
  const [peserta, setPeserta] = useState();
  const [materiTagData, setMateriTagData] = useState();
  const [kotaData, setKotaData] = useState();
  const [materiError, setMateriError] = useState(true);
  useEffect(() => {
    dispatch(getBimtekJadwalTagsData());
    dispatch(getBimtekJadwalLocationsData());
    dispatch(getFormulirPendaftaranData());
  }, []);
  const filterCategory = useSelector(bimtekJadwalTagsDatasetSelector);
  const filterLocations = useSelector(bimtekJadwalLocatonsDatasetSelector);
  const { records: getPendaftaranData } = useSelector(formulirPendaftaranDatasetSelector);
  const tagMateri = filterCategory.map((tags) => {
    return { label: tags, value: tags };
  });

  useEffect(() => {
    materiTagData?.length > 0 && setMateriError(true);
  }, [materiTagData]);

  const getFormulirData = async (e) => {
    e.preventDefault();
    const params = {
      kota: Number(kotaData),
      ekspektasiJumlahPeserta: Number(peserta),
      tagMateri: materiTagData.map((materiTags) => materiTags.value),
    };
    if (!params?.tagMateri || params.tagMateri?.length === 0) {
      setMateriError(false);
    } else {
      try {
        await post(apiUrls.addFormulirPendaftaran, params);
      } catch (er) {}
      setKotaData('');
      setPeserta('');
      setMateriTagData([]);
    }
  };
  const handleKotaChange = (e) => {
    setKotaData(e.target.value);
  };
  const Ekspektasi = (e) => {
    setPeserta(e.target.value);
  };
  const handleMateriChange = (selected) => {
    setMateriTagData(selected);
  };
  return (
    <BimtekLayout>
      <Card className="bimtek-form">
        <Card.Header>Formulir Pendaftaran</Card.Header>
        <Card.Body>
          <Form onSubmit={(e) => getFormulirData(e)}>
            <Row>
              <Form.Group as={Col} controlId="fullName">
                <Form.Label>Nama Lengkap</Form.Label>
                <Form.Control type="text" value={getPendaftaranData.nama} disabled />
              </Form.Group>
              <Form.Group as={Col} controlId="domisili">
                <Form.Label>Provinsi/Kab/Kota</Form.Label>
                <Form.Control type="text" value={getPendaftaranData.provinsiName} disabled />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="agency">
                <Form.Label>Dinas Instansi</Form.Label>
                <Form.Control type="text" value={getPendaftaranData.instansiName} disabled />
              </Form.Group>
              <Form.Group as={Col} controlId="position">
                <Form.Label>Jabatan / Peran Daftar</Form.Label>
                <Form.Control type="text" value={getPendaftaranData.jabatanName} disabled />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="phoneNumber">
                <Form.Label>Nomor Handphone</Form.Label>
                <Form.Control type="number" value={getPendaftaranData.noHp} disabled />
              </Form.Group>
              <Form.Group as={Col} controlId="email">
                <Form.Label>Alamat E-mail</Form.Label>
                <Form.Control type="email" value={getPendaftaranData.email} disabled />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="city">
                <Form.Label>Kota Pelaksana</Form.Label>
                <Form.Select name="kota" value={kotaData} onChange={handleKotaChange} required placeholder="Kota Pelaksana">
                  <option></option>
                  {filterLocations.map((category, key) => (
                    <option key={key} value={category.provinsi}>
                      {category.nama}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="talentCount">
                <Form.Label>Ekspektasi Jumlah Peserta</Form.Label>
                <Form.Control type="number" value={peserta} name="ekspektasiJumlahPeserta" onChange={Ekspektasi} required />
              </Form.Group>
            </Row>
            <Form.Group as={Col} controlId="materi">
              <Form.Label>Materi Bimtek</Form.Label>
              <Select
                closeMenuOnSelect={true}
                options={tagMateri}
                isMulti={true}
                classNamePrefix="select"
                onChange={handleMateriChange}
                name="tagMateri"
                value={materiTagData}
              />
              <p hidden={materiError} className="text-danger">
                Required!!
              </p>
            </Form.Group>
            <Button variant="info" type="submit" className="mt-3">
              Kirim Pengajuan
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </BimtekLayout>
  );
};

export default BimTekForm;
