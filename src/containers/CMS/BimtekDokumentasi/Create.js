import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Plus } from 'assets/plus.svg';
import Notification from 'components/Notification';
import { DatePicker, Input, Modal, Table, TextEditor } from 'components';
import { bimtekListSelector, getDokumentasiList, postImageDokumentasi } from './reducer';
import { bimtekJadwalDetailSelector, getJadwalBimtekDetail } from 'containers/CMS/BimtekJadwal/reducer';
import { apiUrls, post } from 'utils/request';

import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-create');

const CMSJadwalBaru = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [fotoDokumentasi, setFotoDokumentasi] = useState([]);
  const [urlVidio, setUrlVidio] = useState('');
  const [isiDokumentasi, setIsiDokumentasi] = useState('');
  const [BimtekId, setBimtekId] = useState(0);
  const { records } = useSelector(bimtekListSelector);
  const DetailBimtek = useSelector(bimtekJadwalDetailSelector);

  const fetchDokumentasiList = () => {
    return dispatch(getDokumentasiList());
  };

  const dataListBimtek = records;
  const dataDetailBimtek = useMemo(() => DetailBimtek || [], [DetailBimtek]);
  const materiBimtek = useMemo(() => DetailBimtek.records.materi || [], [DetailBimtek]);
  const pembicaraBimtek = useMemo(() => DetailBimtek.records.pembicara || [], [DetailBimtek]);

  useEffect(() => {
    fetchDokumentasiList();
  }, []);

  useEffect(() => {
    return dispatch(getJadwalBimtekDetail(BimtekId));
  }, [BimtekId]);

  const tanggalMulaiDisetujui = moment(dataDetailBimtek.records.tanggalMulaiDisetujui).format('YYYY/MM/DD');
  const waktuMulaiDisetujui = moment(dataDetailBimtek.records.tanggalMulaiDisetujui).format('hh:mm');
  const tanggalSelesaiDisetujui = moment(dataDetailBimtek.records.tanggalMulaiDisetujui).format('YYYY/MM/DD');
  const waktuSelesaiDisetujui = moment(dataDetailBimtek.records.tanggalSelesaiDisetujui).format('hh:mm');

  useEffect(() => {
    reset({
      default: dataDetailBimtek.records,
      waktuMulaiDisetujui,
      waktuSelesaiDisetujui,
      tanggalMulaiDisetujui,
      tanggalSelesaiDisetujui,
    });
  }, [dataDetailBimtek]);

  const schema = yup
    .object({
      // name: yup.string().required(),
    })
    .required();

  const {
    control,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...dataDetailBimtek,
    },
  });

  const onProses = (data) => {};

  const addFoto = async (e) => {
    let file = e.target.files[0];
    try {
      let fotoFormData = new FormData();
      fotoFormData.append('file', file);
      await post(apiUrls.uploadFoto, fotoFormData, { headers: { 'Content-Type': undefined } }).then((res) => {
        Notification.show({
          type: 'secondary',
          message: <div> Berhasil Upload Gambar Dokumentasi </div>,
          icon: 'check',
        });
        setFotoDokumentasi([...fotoDokumentasi, res.data]);
      });
    } catch (e) {
      Notification.show({
        type: 'secondary',
        message: <div> Gagal Upload Gambar Dokumentasi </div>,
        icon: 'cross',
      });
    }
  };

  const openUploadForm = (id) => {
    const elmButton = document.getElementById(id);
    elmButton.click();
  };

  const columnsMateri = [
    {
      Header: 'Materi',
      accessor: 'nama',
    },
    {
      Header: 'Lampiran',
      accessor: 'fileType',
    },
  ];

  const columnsPembicara = [
    {
      Header: 'Nama Pembicara',
      accessor: 'nama',
    },
    {
      Header: 'Tanggal',
      accessor: 'tanggalMulai',
    },
    {
      Header: 'Sesi',
      accessor: 'sesi',
    },
  ];

  const tableConfigMateri = {
    className: 'cms-bimtek-dokumentasi',
    columns: columnsMateri,
    data: materiBimtek,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'link',
  };

  const tableConfigPembicara = {
    className: 'cms-bimtek-dokumentasi',
    columns: columnsPembicara,
    data: pembicaraBimtek,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'link',
  };

  const postDokumentasi = () => {
    let obj = {
      id: BimtekId,
      isiDokumentasi,
      urlVidio,
      images: fotoDokumentasi,
    };
    return dispatch(postImageDokumentasi(obj)).then((res) => {
      res.payload
        ? Notification.show({
            type: 'secondary',
            message: <div> Berhasil Menambahkan Dokumentasi </div>,
            icon: 'check',
          })
        : Notification.show({
            type: 'secondary',
            message: <div> Gagal Menambahkan Dokumentasi </div>,
            icon: 'cross',
          });
      setTimeout(() => {
        history.push(`/cms/bimtek-dokumentasi`);
      }, 1000);
    });
  };
  return (
    <div className={bem.e('section cms-bimtek-dokumentasi-detail')}>
      <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
        <div className={bem.e('title')}>
          Dokumentasi Bimbingan Teknis Baru
          <Button onClick={() => history.goBack()} className="ml-24" variant="secondary" style={{ width: '112px' }}>
            Batal
          </Button>
          <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={() => postDokumentasi()}>
            Simpan
          </Button>
        </div>
        <div>Saved 1 minutes ago Draft</div>
      </div>
      <div className={bem.e('body')}>
        <Form className="sdp-form" onSubmit={handleSubmit(onProses)}>
          <Form.Group className="mb-15">
            <Form.Label>Nama Bimtek</Form.Label>
            {dataListBimtek && (
              <Form.Select onChange={(e) => setBimtekId(e.target.value)}>
                <option value="0"> PILIH BIMTEK </option>
                {dataListBimtek.map((data, index) => {
                  return (
                    <option value={data.id} key={index}>
                      {data.namaBimtek}
                    </option>
                  );
                })}
              </Form.Select>
            )}
          </Form.Group>
          <Row className="align-items-end mb-15">
            <Col>
              <DatePicker
                group
                readOnly
                label="Tanggal Mulai Pelaksanaan Disetujui"
                name={tanggalMulaiDisetujui !== 'Invalid date' ? 'tanggalMulaiDisetujui' : ''}
                control={control}
                rules={{ required: false }}
                error={errors.publishedDate?.message}
              />
            </Col>
            <Col>
              <Input
                group
                readOnly
                className="m-0"
                type="time"
                label=""
                name="waktuMulaiDisetujui"
                control={control}
                rules={{ required: false }}
                error={errors.publishedTime?.message}
              />
            </Col>
          </Row>
          <Row className="align-items-end mb-15">
            <Col>
              <DatePicker
                group
                readOnly
                label="Tanggal Selesai Pelaksanaan Disetujui"
                name={tanggalSelesaiDisetujui !== 'Invalid date' ? 'tanggalSelesaiDisetujui' : ''}
                control={control}
                rules={{ required: false }}
                error={errors.publishedDate?.message}
              />
            </Col>
            <Col>
              <Input
                group
                readOnly
                className="m-0"
                type="time"
                label=""
                name="waktuSelesaiDisetujui"
                control={control}
                rules={{ required: false }}
                error={errors.publishedTime?.message}
              />
            </Col>
          </Row>
          <Input
            group
            readOnly
            className="mb-10"
            type="text"
            label=""
            name="default.tempat"
            control={control}
            rules={{ required: false }}
            error={errors.publishedTime?.message}
          />
          <div className="pembicara">
            <span className="fw-bold mb-10 d-block"> Pembicara </span>
            <Table {...tableConfigPembicara} />
          </div>
          <div className="materi">
            <span className="fw-bold mb-10 d-block"> Materi </span>
            <Table {...tableConfigMateri} />
          </div>
          <div className="wrapper-upload">
            <div className="wrapper-title">
              <span className="fw-bold mb-10 d-block"> Foto dan Video Kegiatan </span>
              <div className="text-danger d-flex icon" onClick={() => openUploadForm('sdp-upload-dokumentasi')}>
                <Plus /> Upload Foto
              </div>
            </div>
            <Row>
              {fotoDokumentasi.map((foto, index) => {
                return (
                  <Col key={index} sm={4}>
                    <div className="doc-foto" style={{ backgroundImage: "url('" + foto.location + "')" }}></div>
                  </Col>
                );
              })}
            </Row>
            <input id="sdp-upload-dokumentasi" type="file" style={{ display: 'none' }} onChange={addFoto} />
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Url Vidio</Form.Label>
            <Form.Control type="text" onChange={(e) => setUrlVidio(e.target.value)} />
          </Form.Group>
          <TextEditor onChange={(e) => setIsiDokumentasi(e)} />
        </Form>
      </div>
    </div>
  );
};

export default CMSJadwalBaru;
