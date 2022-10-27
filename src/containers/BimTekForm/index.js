import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import { ReadOnlyInputs } from 'components';

const bem = bn('bimtek-form');

const BimTekForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [peserta, setPeserta] = useState('');
  const [materiTagData, setMateriTagData] = useState([]);
  const [kotaData, setKotaData] = useState(null);
  const [permintaanBimtekData, setPermintaanBimtekData] = useState(null);
  const [kotaError, setKotaError] = useState(true);
  const [ekspektasiError, setEkspektasiError] = useState(true);
  const [permintaanBimtekError, setPermintaanBimtekError] = useState(true);
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
  const permintaanBimtekOptions = [
    {
      label: 'Daring',
      value: 'Daring',
    },
    {
      label: 'Luring',
      value: 'Luring',
    },
  ];

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
    permintaanBimtekData !== undefined && setPermintaanBimtekError(true);
    materiTagData?.length > 0 && setMateriError(true);
    console.log('permintaanBimtekError', permintaanBimtekData);
  }, [peserta, kotaData, materiTagData, permintaanBimtekData]);

  const getFormulirData = async (e) => {
    e.preventDefault();
    const params = {
      kota: Number(kotaData),
      ekspektasiJumlahPeserta: Number(peserta),
      tagMateri: materiTagData && materiTagData.map((materiTags) => materiTags.value),
      permintaanBimtek: permintaanBimtekData,
    };
    if (!kotaData || !peserta || !params?.tagMateri || !params.tagMateri?.length || !permintaanBimtekData) {
      if (!kotaData || kotaData === null) {
        setKotaError(false);
      }
      if (!permintaanBimtekData || permintaanBimtekData === null) {
        setPermintaanBimtekData(false);
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
          message: <div> Permintaan Bimbingan Teknis {response.data.content.id} berhasil terkirim </div>,
          icon: 'check',
        });
        setTimeout(() => {
          history.push(`/bimtek-permintaan`);
        }, 1000);
      } catch (er) {
        Notification.show({
          type: 'warning',
          message: <div> Permintaan Bimbingan Teknis berhasil terkirim </div>,
          icon: 'cross',
        });
      }
      setKotaData(null);
      setPermintaanBimtekData(null);
      setPeserta('');
      setMateriTagData([]);
    }
  };
  const handleKotaChange = (e) => {
    setKotaData(e.value);
  };
  const handlePermintaanBimtekChange = (e) => {
    setPermintaanBimtekData(e.value);
  };
  const onEkspektasiChange = (e) => {
    setPeserta(e.target.value);
  };
  const handleMateriChange = (selected) => {
    setMateriTagData(selected);
  };

  return (
    <BimtekLayout>
      <Card className="bimtek-form">
        <Card.Header>Formulir Permintaan</Card.Header>
        <Card.Body>
          <Form onSubmit={getFormulirData}>
            <Row>
              <Form.Group as={Col} controlId="fullName">
                <ReadOnlyInputs
                  group
                  label="Nama Lengkap"
                  labelClass="sdp-form-label fw-normal"
                  type="text"
                  defaultValue={getPendaftaranData.nama}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="domisili">
                <ReadOnlyInputs
                  group
                  label="Provinsi / Kab / Kota"
                  labelClass="sdp-form-label fw-normal"
                  type="text"
                  defaultValue={getPendaftaranData.provinsiName}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="agency">
                <ReadOnlyInputs
                  group
                  label="Dinas / Instansi"
                  labelClass="sdp-form-label fw-normal"
                  type="text"
                  defaultValue={getPendaftaranData.instansiName}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="position">
                <ReadOnlyInputs
                  group
                  label="Jabatan / Peran Daftar"
                  labelClass="sdp-form-label fw-normal"
                  type="text"
                  defaultValue={getPendaftaranData.unitKerjaName}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="phoneNumber">
                <ReadOnlyInputs
                  group
                  label="Nomor Handphone"
                  labelClass="sdp-form-label fw-normal"
                  type="text"
                  defaultValue={getPendaftaranData.noHp}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="email">
                <ReadOnlyInputs
                  group
                  label="Alamat E-mail"
                  labelClass="sdp-form-label fw-normal"
                  type="text"
                  defaultValue={getPendaftaranData.email}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="city" className={bem.e('pendaftaran-form-field', 'position-relative')}>
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
              <Form.Group as={Col} controlId="talentCount" className={bem.e('pendaftaran-form-field', 'position-relative')}>
                <Form.Label>Ekspektasi Jumlah Peserta</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={peserta}
                  name="ekspektasiJumlahPeserta"
                  onChange={onEkspektasiChange}
                />
                <p hidden={ekspektasiError} className={bem.e('error-message')}>
                  Ekspektasi Jumlah Peserta is required.
                </p>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="tanggalPengajuan">
                <ReadOnlyInputs
                  group
                  label="Tanggal Pengajuan"
                  labelClass="sdp-form-label fw-normal"
                  type="text"
                  defaultValue={getPendaftaranData.tanggalPengajuan}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="jenisPermintaan">
                <ReadOnlyInputs
                  group
                  label="Jenis Permintaan"
                  labelClass="sdp-form-label fw-normal"
                  type="text"
                  defaultValue={getPendaftaranData.jenisPermintaan}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="city" className={bem.e('pendaftaran-form-field', 'position-relative')}>
                <Form.Label>Jenis Permintaan Bimtek</Form.Label>
                <SingleSelectDropdown
                  data={permintaanBimtekOptions}
                  control={control}
                  placeholder="Pilih Jenis Permintaan Bimtek"
                  name="tagMateri"
                  value={
                    permintaanBimtekData == null
                      ? null
                      : permintaanBimtekOptions.find((item) => item.value === permintaanBimtekData)
                  }
                  onChange={handlePermintaanBimtekChange}
                />
                <p hidden={kotaError} className={bem.e('error-message')}>
                  Jenis Permintaan Bimtek is required
                </p>
              </Form.Group>
              <Form.Group as={Col} controlId="materi" className={bem.e('pendaftaran-form-field', 'position-relative')}>
                <Form.Label>Topik Bimtek</Form.Label>
                <SingleSelectDropdown
                  data={tagMateri}
                  control={control}
                  placeholder="Pilih Topik"
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
            </Row>

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
