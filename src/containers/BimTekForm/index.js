import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

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
import { ReadOnlyInputs, DatePicker } from 'components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const bem = bn('bimtek-form');

const BimTekForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [peserta, setPeserta] = useState('');
  const [materiTagData, setMateriTagData] = useState([]);
  const [kotaData, setKotaData] = useState(null);
  const [tanggalData, setTanggalData] = useState(null);
  const [permintaanData, setPermintaanData] = useState(null);
  const [permintaanBimtekData, setPermintaanBimtekData] = useState(null);
  const [kotaError, setKotaError] = useState(true);
  const [ekspektasiError, setEkspektasiError] = useState(true);
  const [tanggalError, setTanggalError] = useState(true);
  const [permintaanError, setPermintaanError] = useState(true);
  const [permintaanBimtekError, setPermintaanBimtekError] = useState(true);
  const [materiError, setMateriError] = useState(true);
  const startDate = moment(new Date(), 'YYYY-MM-DD').add(5, 'days').format('YYYY-MM-DD');

  useEffect(() => {
    dispatch(getBimtekJadwalTagsData());
    dispatch(getBimtekJadwalLocationsData());
    dispatch(getFormulirPendaftaranData());
  }, []);

  const schema = yup
    .object({
      tanggalData: yup.string(),
    })
    .required();
  const { control, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const tanggalDataValue = watch('tanggalData');

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
  const permintaanOptions = [
    {
      label: 'Pengusulan Bimtek (K/L/D Sebagai Penyelenggara)',
      value: 'Pengusulan Bimtek (K/L/D Sebagai Penyelenggara)',
    },
    {
      label: 'Permintaan Bimtek (Sekretariat Sebagai Penyelenggara)',
      value: 'Permintaan Bimtek (Sekretariat Sebagai Penyelenggara)',
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
    tanggalDataValue !== null && setTanggalError(true);
    permintaanData !== undefined && setPermintaanError(true);
    permintaanBimtekData !== undefined && setPermintaanBimtekError(true);
    materiTagData?.length > 0 && setMateriError(true);
  }, [peserta, kotaData, materiTagData, tanggalDataValue, permintaanData, permintaanBimtekData]);

  const formatDate = 'YYYY-MM-DD HH:mm:ss';

  const getFormulirData = async (e) => {
    e.preventDefault();
    const params = {
      kota: Number(kotaData),
      ekspektasiJumlahPeserta: Number(peserta),
      tagMateri: materiTagData && materiTagData.map((materiTags) => materiTags.value),
      tanggalRequest: moment(tanggalDataValue).format(formatDate),
      jenisPermintaan: permintaanBimtekData,
      jenisPermintaanBimtek: permintaanBimtekData,
    };
    if (
      !kotaData ||
      !peserta ||
      !params?.tagMateri ||
      !params.tagMateri?.length ||
      !tanggalDataValue ||
      !permintaanData ||
      !permintaanBimtekData
    ) {
      if (!kotaData || kotaData === null) {
        setKotaError(false);
      }
      if (!peserta || peserta === '') {
        setEkspektasiError(false);
      }
      if (!params?.tagMateri || !params.tagMateri?.length) {
        setMateriError(false);
      }
      if (!tanggalDataValue || tanggalDataValue === null) {
        setTanggalError(false);
      }
      if (!permintaanData || permintaanData === null) {
        setPermintaanError(false);
      }
      if (!permintaanBimtekData || permintaanBimtekData === null) {
        setPermintaanBimtekError(false);
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
      setPeserta('');
      setTanggalData(null);
      setMateriTagData([]);
      setPermintaanData(null);
      setPermintaanBimtekData(null);
    }
  };
  const handleKotaChange = (e) => {
    setKotaData(e.value);
  };
  const onEkspektasiChange = (e) => {
    setPeserta(e.target.value);
  };
  const handleMateriChange = (selected) => {
    setMateriTagData(selected);
  };
  const handlePermintaanChange = (e) => {
    setPermintaanData(e.value);
  };
  const handlePermintaanBimtekChange = (e) => {
    setPermintaanBimtekData(e.value);
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
                  label="Unit Kerja"
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
                  name="kota"
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
              <Form.Group
                as={Col}
                controlId="tanggalPengajuan"
                className={bem.e('pendaftaran-form-field', 'position-relative')}>
                <DatePicker
                  group
                  min={startDate}
                  label="Tanggal Pengajuan"
                  labelClass="sdp-form-label mb-0 fw-normal"
                  name="tanggalData"
                  control={control}
                />
                <p hidden={tanggalError} className={bem.e('error-message')}>
                  Tanggal Mulai Pelaksanaan Disetujui is required.
                </p>
              </Form.Group>
              <Form.Group as={Col} controlId="permintaan" className={bem.e('pendaftaran-form-field', 'position-relative')}>
                <Form.Label>Jenis Permintaan </Form.Label>
                <SingleSelectDropdown
                  data={permintaanOptions}
                  control={control}
                  placeholder="Pilih Jenis Permintaan"
                  name="jenisPermintaan"
                  value={
                    permintaanBimtekData == null
                      ? null
                      : permintaanBimtekOptions.find((item) => item.value === permintaanBimtekData)
                  }
                  onChange={handlePermintaanBimtekChange}
                />
                <p hidden={permintaanBimtekError} className={bem.e('error-message')}>
                  Jenis Permintaan Bimtek is required
                </p>
              </Form.Group>
            </Row>
            <Row className="mt-14">
              <Form.Group
                as={Col}
                controlId="permintaanBimtek"
                className={bem.e('pendaftaran-form-field', 'position-relative')}>
                <Form.Label>Jenis Permintaan Bimtek</Form.Label>
                <SingleSelectDropdown
                  data={permintaanBimtekOptions}
                  control={control}
                  placeholder="Pilih Jenis Permintaan Bimtek"
                  name="jenisPermintaanBimtek"
                  value={permintaanData == null ? null : permintaanOptions.find((item) => item.value === permintaanData)}
                  onChange={handlePermintaanChange}
                />
                <p hidden={permintaanError} className={bem.e('error-message')}>
                  Jenis Permintaan is required
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
