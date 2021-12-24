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
import { formulirPendaftaranDatasetSelector, getFormulirPendaftaranData } from './reducer';
import { apiUrls } from 'utils/constants';
import { post } from 'utils/request';
import { useForm } from 'react-hook-form';
import bn from 'utils/bemNames';
import SingleSelectDropdown from 'components/DropDown/SingleSelectDropDown';
import Notification from 'components/Notification';

const bem = bn('bimtek-form');

const BimTekForm = () => {
  const dispatch = useDispatch();
  const [peserta, setPeserta] = useState();
  const [materiTagData, setMateriTagData] = useState([]);
  const [kotaData, setKotaData] = useState();
  const [kotaError, setKotaError] = useState(true);
  const [ekspektasiError, setEkspektasiError] = useState(true);
  const [materiError, setMateriError] = useState(true);
  const { control } = useForm({});
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

  const createKategori = (data) => {
    setMateriTagData([
      ...materiTagData,
      {
        label: data,
        value: data,
      },
    ]);
  };

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
    if (!kotaData || !peserta || !params?.tagMateri || !params.tagMateri?.length) {
      if (!kotaData || kotaData === null) {
        setKotaError(false);
      }
      if (!peserta || peserta === '') {
        setEkspektasiError(false);
      }
      if (!params?.tagMateri || !params.tagMateri?.length) {
        setMateriError(false);
      }
    } else {
      try {
        const response = await post(apiUrls.addFormulirPendaftaran, params);
        Notification.show({
          type: 'secondary',
          message: <div> Permintaan Bimbingan Teknis [{response.data.content.id}] berhasil terkirim </div>,
          icon: 'check',
        });
      } catch (er) {
        Notification.show({
          type: 'secondary',
          message: <div> Permintaan Bimbingan Teknis berhasil terkirim </div>,
          icon: 'check',
        });
      }
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
                <Form.Label>Unit Kerja</Form.Label>
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
              <Form.Group as={Col} controlId="city" className={bem.e('kota-dropdown', 'position-relative')}>
                <Form.Label>Kota Pelaksana</Form.Label>
                <SingleSelectDropdown
                  data={kotaOptions}
                  control={control}
                  placeholder="Pilih Kota"
                  name="tagMateri"
                  value={kotaData == null ? null : kotaOptions.find((item) => item.value === kotaData)}
                  onChange={handleKotaChange}
                />
                <p hidden={kotaError} className={bem.e('error-message')}>
                  Kota Pelaksana is required.
                </p>
              </Form.Group>
              <Form.Group as={Col} controlId="talentCount" className={bem.e('', 'position-relative')}>
                <Form.Label>Ekspektasi Jumlah Peserta</Form.Label>
                <Form.Control type="number" min={0} value={peserta} name="ekspektasiJumlahPeserta" onChange={Ekspektasi} />
                <p hidden={ekspektasiError} className={bem.e('error-message')}>
                  Ekspektasi Jumlah Peserta is required.
                </p>
              </Form.Group>
            </Row>
            <Form.Group as={Col} controlId="materi" className={bem.e('materi-dropdown', 'position-relative')}>
              <Form.Label>Materi Bimtek</Form.Label>
              <SingleSelectDropdown
                data={tagMateri}
                control={control}
                placeholder="Pilih Materi"
                isCreatable={true}
                onCreateOption={createKategori}
                name="tagMateri"
                onChange={handleMateriChange}
                value={materiTagData}
                isMulti
              />
              <p hidden={materiError} className={bem.e('error-message')}>
                Materi Bimtek is required.
              </p>
            </Form.Group>
            <Button variant="info" type="submit" className="mt-28">
              Kirim Pengajuan
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </BimtekLayout>
  );
};

export default BimTekForm;
