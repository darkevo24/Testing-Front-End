import React, { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { BimtekLayout } from 'layouts/BimtekLayout';

import './bimtekform.scss';
import {
  bimtekJadwalLocationsDatasetSelector,
  bimtekJadwalTagsDatasetSelector,
  getBimtekJadwalLocationsData,
  getBimtekJadwalTagsData,
} from 'containers/BimTekJadwal/reducer';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { formulirPendaftaranDatasetSelector, getFormulirPendaftaranData } from './reducer';
import { apiUrls } from 'utils/constants';
import { post } from 'utils/request';
import Select from 'react-select';

const BimTekForm = () => {
  const dispatch = useDispatch();
  const [peserta, setPeserta] = useState();
  const [materiTagData, setMateriTagData] = useState();
  const [kotaData, setKotaData] = useState();
  const [kotaError, setKotaError] = useState(true);
  const [ekspektasiError, setEkspektasiError] = useState(true);
  const [materiError, setMateriError] = useState(true);
  useEffect(() => {
    dispatch(getBimtekJadwalTagsData());
    dispatch(getBimtekJadwalLocationsData());
    dispatch(getFormulirPendaftaranData());
  }, []);
  const filterCategory = useSelector(bimtekJadwalTagsDatasetSelector);
  const filterLocations = useSelector(bimtekJadwalLocationsDatasetSelector);
  const { records: getPendaftaranData } = useSelector(formulirPendaftaranDatasetSelector);
  const kotaOptions = filterLocations.map((category) => {
    return { label: category.nama, value: category.provinsi };
  });
  const tagMateri = filterCategory.map((tags) => {
    return { label: tags, value: tags };
  });

  useEffect(() => {
    peserta !== undefined && setEkspektasiError(true);
    kotaData !== undefined && setKotaError(true);
    materiTagData?.length > 0 && setMateriError(true);
  }, [peserta, kotaData, materiTagData]);

  const getFormulirData = async (e) => {
    e.preventDefault();
    const params = {
      kota: Number(kotaData),
      ekspektasiJumlahPeserta: Number(peserta),
      tagMateri: materiTagData && materiTagData.map((materiTags) => materiTags.value),
    };
    if (kotaData === undefined || peserta === undefined || !params?.tagMateri || params.tagMateri?.length === 0) {
      if (kotaData === undefined || kotaData === null) {
        setKotaError(false);
      }
      if (peserta === undefined || peserta === '') {
        setEkspektasiError(false);
      }
      if (!params?.tagMateri || params.tagMateri?.length === 0) {
        setMateriError(false);
      }
    } else {
      try {
        await post(apiUrls.addFormulirPendaftaran, params);
      } catch (er) {}
      setKotaData(null);
      setPeserta('');
      setMateriTagData([]);
    }
  };
  const handleKotaChange = (e) => {
    setKotaData(e.value);
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
          <Form onSubmit={getFormulirData}>
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
              <Form.Group as={Col} controlId="city" className="wrapper">
                <Form.Label>Kota Pelaksana</Form.Label>
                <Select
                  closeMenuOnSelect={true}
                  options={kotaOptions}
                  isMulti={false}
                  classNamePrefix="select"
                  onChange={handleKotaChange}
                  value={kotaData == null ? null : kotaOptions.find((item) => item.value === kotaData)}
                  name="tagMateri"
                  className="select-pendaftran"
                />
                <p hidden={kotaError} className="text-danger error-message">
                  Kota Pelaksana is required.
                </p>
              </Form.Group>
              <Form.Group as={Col} controlId="talentCount" className="wrapper">
                <Form.Label>Ekspektasi Jumlah Peserta</Form.Label>
                <Form.Control type="number" min={0} value={peserta} name="ekspektasiJumlahPeserta" onChange={Ekspektasi} />
                <p hidden={ekspektasiError} className="text-danger error-message">
                  Ekspektasi Jumlah Peserta is required.
                </p>
              </Form.Group>
            </Row>
            <Form.Group as={Col} controlId="materi" className="materi-wrapper">
              <Form.Label>Materi Bimtek</Form.Label>
              <CreatableSelect
                closeMenuOnSelect={true}
                options={tagMateri}
                isMulti={true}
                classNamePrefix="select"
                onChange={handleMateriChange}
                name="tagMateri"
                value={materiTagData}
                className="select-pendaftran"
              />
              <p hidden={materiError} className="text-danger error-message">
                Materi Bimtek is required.
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
