import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { remove } from 'lodash';
import * as yup from 'yup';
import isFunction from 'lodash/isFunction';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { ReactComponent as Plus } from 'assets/plus.svg';
import { CMSModal } from 'components/CMSStatusModals';
import { Galery, Close } from 'components/Icons';
import SingleSelectDropDown from 'components/DropDown/SingleSelectDropDown';
import { apiUrls, post, put, deleteRequest } from 'utils/request';
import SingleDropDown from 'components/DropDown/SingleDropDown';
import { DatePicker, Input, Modal, Table, TextEditor, Notification } from 'components';
import { bimtekJadwalTags, bimtekListKabupaten, getListBimtekTags, getListBimtekKabupaten } from './reducer';

import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-create');

const CMSJadwalBaru = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState('');
  const [objectRequired, setObjectRequired] = useState({});
  const [records, setRecords] = useState({});
  const [kotaId, setKotaId] = useState('');
  const [idPembicara, setIdPembicara] = useState('');
  const [listMateri, setListMateri] = useState([]);
  const [dataMateri, setDataMateri] = useState([]);
  const [dataPembicara, setDataPembicara] = useState([]);
  const { tagsResult, tagsLoading } = useSelector(bimtekJadwalTags);
  const { listKabupaten } = useSelector(bimtekListKabupaten);

  const tagsResultList = (tagsResult || []).map((tag) => ({ value: tag, label: tag }));
  const tagsResultKabupaten = (listKabupaten || []).map((tag) => ({ value: tag.id, label: tag.nama }));

  useEffect(() => {
    initialCall();
  }, []);

  const initialCall = () => {
    dispatch(getListBimtekTags());
    dispatch(getListBimtekKabupaten());
  };

  const schema = yup.object(objectRequired).required();

  const {
    control,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      tambahPembicaraUpdate: '',
      tambahPembicaraWaktuMulaiUpdate: '',
      tambahPembicaraWaktuSelesaiUpdate: '',
      tambahPembicaraJamMulaiUpdate: '',
      tambahPembicaraJamSelesaiUpdate: '',
    },
  });

  const onModalEditPembicara = (data) => {
    setIdPembicara(data.id);
    setValue('tambahPembicaraUpdate', data.nama);
    setValue('tambahPembicaraWaktuMulaiUpdate', moment(data.tanggalMulai).format('DD/MM/YYYY'));
    setValue('tambahPembicaraWaktuSelesaiUpdate', moment(data.tanggalSelesai).format('DD/MM/YYYY'));
    setValue('tambahPembicaraJamMulaiUpdate', moment(data.tanggalMulai).format('HH:mm'));
    setValue('tambahPembicaraJamSelesaiUpdate', moment(data.tanggalSelesai).format('HH:mm'));
    setObjectRequired({
      tambahPembicaraUpdate: yup.string().required(),
      tambahPembicaraWaktuMulaiUpdate: yup.string().required(),
      tambahPembicaraWaktuSelesaiUpdate: yup.string().required(),
      tambahPembicaraJamMulaiUpdate: yup.string().required(),
      tambahPembicaraJamSelesaiUpdate: yup.string().required(),
    });
    setShowModal('editPembicara');
  };

  const onEditPembicara = (data) => {
    if (!idPembicara) {
      handleCloseModal();
      return handleNotification('secondary', 'Gagal Merubah Pembicara ', 'cross');
    }
    const nama = data.tambahPembicaraUpdate;
    const tanggalMulai = `${moment(data.tambahPembicaraWaktuMulaiUpdate, 'DD/MM/YYYY').format('YYYY-MM-DD')} ${
      data.tambahPembicaraJamMulaiUpdate
    }:00`;
    const tanggalSelesai = `${moment(data.tambahPembicaraWaktuSelesaiUpdate, 'DD/MM/YYYY').format('YYYY-MM-DD')} ${
      data.tambahPembicaraJamSelesaiUpdate
    }:00`;
    let obj = [
      {
        id: (Math.random() + 1).toString(36).substring(7),
        nama,
        tanggalMulai,
        tanggalSelesai,
      },
    ];
    let newDataPembicara = dataPembicara.filter((x) => x.id !== idPembicara);
    setDataPembicara([...newDataPembicara, obj[0]]);
    handleCloseModal();
    setObjectRequired({});
  };

  const onDeletePembicara = (data) => {
    let newData = remove(dataPembicara, (x) => {
      return x.id !== data;
    });
    setDataPembicara(newData);
    console.log(newData);
  };

  const onDeleteMateri = (data) => {
    let newData = remove(dataMateri, (x) => {
      return x.id !== data;
    });
    setDataMateri(newData);
  };

  const handleNotification = (type, message, icon) => {
    Notification.show({
      type,
      message,
      icon,
    });
  };

  const handleAPICall = async (method, url, params, callBack) => {
    try {
      await method(url, {}, params);
      handleCloseModal();
      handleNotification('secondary', 'Berhasil Menyimpan Jadwal', 'check');
      isFunction(callBack) && callBack();
    } catch (e) {
      console.log(e);
      handleNotification('secondary', `Error, ${e.message}`, 'cross');
      handleCloseModal();
    }
  };

  const handleProses = () => {
    setObjectRequired({
      namaBimtek: yup.string().required(),
      tags: yup.array().required().min(1),
      namaKota: yup.object().required(),
      tanggalMulaiDisetujui: yup.string().required(),
      jamMulaiDisetujui: yup.string().required(),
      tanggalSelesaiDisetujui: yup.string().required(),
      jamSelesaiDisetujui: yup.string().required(),
      dataTempat: yup.string().required(),
    });
    setShowModal('proses');
  };

  const onProses = (data) => {
    if (dataMateri.length < 1 || dataPembicara.length < 1) {
      handleCloseModal();
      return handleNotification('secondary', 'Gagal, Materi atau Pembicara harus diisi', 'cross');
    }
    let listPembicara = dataPembicara;
    listPembicara.map((x) => {
      delete x['id'];
    });
    let listMateri = dataMateri;
    listMateri.map((x) => {
      delete x['id'];
    });
    let obj = {
      namaBimtek: data.namaBimtek,
      tagMateri: data.tags.map((elem) => elem.label) || [],
      tanggalMulaiDisetujui: `${moment(data.tanggalMulaiDisetujui).format('YYYY-MM-DD')} ${data.jamMulaiDisetujui}:00`,
      tanggalSelesaiDisetujui: `${moment(data.tanggalSelesaiDisetujui).format('YYYY-MM-DD')} ${data.jamSelesaiDisetujui}:00`,
      kota: data.namaKota.value,
      alamat: data.dataTempat,
      pembicara: listPembicara,
      materi: listMateri,
      dokumentasi: [
        {
          isiDokumentasi: 'test',
          urlVidio: 'testurlvidio',
          images: [
            {
              fileName: 'test',
              location: 'test',
              fileType: 'pdf',
              size: 10,
            },
          ],
        },
      ],
    };
    handleAPICall(post, `${apiUrls.cmsBimtekJadwal}`, { data: obj });
    setObjectRequired({});
  };

  const onAddMateri = (data) => {
    if (dataMateri.length < 1) {
      handleCloseModal();
      return handleNotification('secondary', 'File Tidak Boleh Kosong', 'cross');
    }
    let newMateri = listMateri.map((item) => ({
      ...item,
      nama: data.namaMateri,
      id: (Math.random() + 1).toString(36).substring(7),
    }));
    setListMateri([]);
    setDataMateri([...dataMateri, newMateri[0]]);
    handleCloseModal();
  };

  const handleAddPembicara = () => {
    setObjectRequired({
      tambahPembicara: yup.string().required(),
      tambahPembicaraWaktuMulai: yup.string().required(),
      tambahPembicaraJamMulai: yup.string().required(),
      tambahPembicaraWaktuSelesai: yup.string().required(),
      tambahPembicaraJamSelesai: yup.string().required(),
    });
    setShowModal('pembicara');
  };

  const handleAddMateri = () => {
    setObjectRequired({
      namaMateri: yup.string().required(),
    });
    setShowModal('materi');
  };

  const onAddPembicara = (data) => {
    const nama = data.tambahPembicara;
    const tanggalMulai = `${moment(data.tambahPembicaraWaktuMulai).format('YYYY-MM-DD')} ${data.tambahPembicaraJamMulai}:00`;
    const tanggalSelesai = `${moment(data.tambahPembicaraWaktuSelesai).format('YYYY-MM-DD')} ${
      data.tambahPembicaraJamSelesai
    }:00`;
    let obj = [
      {
        id: (Math.random() + 1).toString(36).substring(7),
        nama,
        tanggalMulai,
        tanggalSelesai,
      },
    ];
    setDataPembicara([...dataPembicara, obj[0]]);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal('');
  };

  const openUploadForm = (id) => {
    const elmButton = document.getElementById(id);
    elmButton.click();
  };

  const addFile = async (e) => {
    let file = e.target.files[0];
    try {
      let materiFormData = new FormData();
      materiFormData.append('file', file);
      await post(apiUrls.publiFileUpload, materiFormData, { headers: { 'Content-Type': undefined } }).then((res) => {
        setListMateri([...listMateri, res.data]);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const removeFile = (index) => {
    let selected = listMateri[index];
    setListMateri(listMateri.filter((item) => item !== selected));
  };

  const columnsPembicara = [
    {
      Header: 'Nama Pembicara',
      accessor: 'nama',
    },
    {
      Header: 'Tanggal',
      accessor: 'tanggalMulai',
      Cell: ({ ...rest }) => (
        <span>
          {rest.row.original?.tanggalMulai ? moment(rest.row.original?.tanggalMulai).format('DD MMMM YYYY') : '---'}
        </span>
      ),
    },
    {
      Header: 'Sesi',
      accessor: 'sesi',
      Cell: ({ ...rest }) => (
        <span>
          {rest.row.original?.tanggalMulai ? moment(rest.row.original?.tanggalMulai).format('HH:mm') : '---'} -
          {rest.row.original?.tanggalSelesai ? moment(rest.row.original?.tanggalSelesai).format('HH:mm') : '---'}
        </span>
      ),
    },
    {
      Header: '',
      accessor: 'action',
      Cell: ({ ...rest }) => (
        <div>
          <Button
            variant="outline-none"
            className="bg-white sdp-text-blue p-0 mr-10"
            onClick={() => onModalEditPembicara(rest.row.original)}>
            Edit
          </Button>
          <Button
            variant="outline-none"
            className="bg-white sdp-text-grey-dark p-0"
            onClick={() => onDeletePembicara(rest.row.original.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const columnsMateri = [
    {
      Header: 'Materi',
      accessor: '',
      Cell: ({ ...rest }) => <span>{rest?.row?.original?.nama}</span>,
    },
    {
      Header: 'Lampiran',
      accessor: '',
      Cell: ({ ...rest }) => <span>{rest?.row?.original?.fileType}</span>,
    },
    {
      Header: '',
      accessor: 'action',
      Cell: ({ ...rest }) => (
        <div>
          <Button variant="outline-none" className="bg-white sdp-text-blue p-0 mr-10">
            Edit
          </Button>
          <Button
            variant="outline-none"
            className="bg-white sdp-text-grey-dark p-0"
            onClick={() => onDeleteMateri(rest.row.original.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const tableConfigMateri = {
    className: 'cms-bimtek-table',
    columns: columnsMateri,
    data: dataMateri,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'link',
  };

  const tableConfigPembicara = {
    className: 'cms-bimtek-table',
    columns: columnsPembicara,
    data: dataPembicara,
    title: '',
    showSearch: false,
    onSearch: () => {},
    variant: 'link',
  };

  return (
    <div className={bem.e('section cms-bimtek')}>
      <div className={cx(bem.e('header'), 'd-flex justify-content-between')}>
        <div className={bem.e('title')}>
          Jadwal Bimbingan Teknis Baru
          <Button onClick={() => history.goBack()} className="ml-24" variant="secondary" style={{ width: '112px' }}>
            Batal
          </Button>
          <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={handleProses}>
            Simpan
          </Button>
        </div>
        <div>Saved 1 minutes ago Draft</div>
      </div>
      <div className={bem.e('body')}>
        <Col md={9}>
          <Input
            group
            className="mb-10"
            type="text"
            label="Nama Bimtek"
            name="namaBimtek"
            control={control}
            error={errors.namaBimtek?.message}
            rules={{ required: true }}
          />
          <SingleSelectDropDown
            group
            groupClass="mb-16"
            isMulti
            control={control}
            label="Kategori Bimtek"
            labelClass="sdp-form-label fw-normal"
            placeholder=""
            name="tags"
            data={tagsResultList}
            loading={tagsLoading}
            isCreatable={true}
            error={errors.tags?.message}
            rules={{ required: true }}
          />
          <Row className="align-items-end mb-15">
            <Col>
              <DatePicker
                group
                label="Tanggal Mulai Pelaksanaan Disetujui"
                name="tanggalMulaiDisetujui"
                control={control}
                error={errors.tanggalMulaiDisetujui?.message}
                rules={{ required: true }}
              />
            </Col>
            <Col>
              <Input
                group
                className="m-0"
                type="time"
                label=""
                name="jamMulaiDisetujui"
                control={control}
                error={errors.jamMulaiDisetujui?.message}
                rules={{ required: true }}
              />
            </Col>
          </Row>
          <Row className="align-items-end mb-15">
            <Col>
              <DatePicker
                group
                label="Tanggal Selesai Pelaksanaan Disetujui"
                name="tanggalSelesaiDisetujui"
                control={control}
                error={errors.tanggalSelesaiDisetujui?.message}
                rules={{ required: true }}
              />
            </Col>
            <Col>
              <Input
                group
                className="m-0"
                type="time"
                label=""
                name="jamSelesaiDisetujui"
                control={control}
                error={errors.jamSelesaiDisetujui?.message}
                rules={{ required: true }}
              />
            </Col>
          </Row>
          <SingleSelectDropDown
            group
            groupClass="mb-16"
            control={control}
            label="Kota Pelaksana"
            labelClass="sdp-form-label fw-normal"
            placeholder=""
            name="namaKota"
            control={control}
            data={[{ value: '', label: 'All' }, ...tagsResultKabupaten]}
            loading={tagsLoading}
            isCreatable={true}
            error={errors.namaKota?.message}
            rules={{ required: true }}
          />
          <Input
            group
            className="mb-10"
            type="text"
            label="Tempat"
            name="dataTempat"
            control={control}
            error={errors.dataTempat?.message}
            rules={{ required: true }}
          />
          <div className="pembicara">
            <div className="d-flex justify-content-between">
              <span className="fw-bold mb-10 d-block"> Pembicara </span>
              <Button variant="outline-none" onClick={handleAddPembicara}>
                <Plus /> <span className="fw-bold text-danger"> Tambah Pembicara </span>
              </Button>
            </div>
            <Table {...tableConfigPembicara} />
          </div>
          <div className="materi">
            <div className="d-flex justify-content-between">
              <span className="fw-bold mb-10 d-block"> Materi </span>
              <Button variant="outline-none" onClick={handleAddMateri}>
                <Plus /> <span className="fw-bold text-danger"> Tambah Materi </span>
              </Button>
            </div>
            <span className="fw-bold mb-10 d-block"> Materi </span>
            <Table {...tableConfigMateri} />
          </div>
        </Col>
      </div>
      {showModal === 'proses' && (
        <CMSModal onClose={handleCloseModal} label="Simpan Jadwal Bimtek?" confirmButtonAction={handleSubmit(onProses)} />
      )}
      {showModal === 'materi' && (
        <Modal
          className="cms-bimtek-materi"
          title="Tambah Materi Baru"
          onClose={handleCloseModal}
          visible={handleCloseModal}>
          <Form onSubmit={handleSubmit(onAddMateri)}>
            <div>
              <Input
                group
                label="Materi"
                name="namaMateri"
                control={control}
                error={errors.namaMateri?.message}
                rules={{ required: true }}
              />
              <div>
                <label>Lampiran</label>
                <input id="sdp-upload-materi" multiple type="file" style={{ display: 'none' }} onChange={addFile} />
              </div>
              <div className="wrapper-lampiran">
                <div className="wrapper-lampiran-header" onClick={() => openUploadForm('sdp-upload-materi')}>
                  <span className="upload"> Upload </span>
                  <span className="cta"> Upload Image (format .png, .jpeg, .jpg max. 512KB) </span>
                </div>
                <div className="wrapper-lampiran-file">
                  {listMateri.map((data, index) => {
                    return (
                      <span className="file mr-10 mb-10" key={index} onClick={() => removeFile(index)}>
                        <Galery /> <span> {data.fileName} </span> <Close />
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <Button className="br-4 mr-8 px-57 py-13 bg-transparent" variant="light" onClick={handleCloseModal}>
                  Batal
                </Button>
                <Button type="submit" className="mx-10" variant="info" style={{ width: '112px' }}>
                  Simpan
                </Button>
              </div>
            </div>
          </Form>
        </Modal>
      )}
      {showModal === 'pembicara' && (
        <Modal
          className="cms-bimtek-materi"
          title="Tambah Pembicara Baru"
          visible={handleCloseModal}
          onClose={handleCloseModal}>
          <Form onSubmit={handleSubmit(onAddPembicara)}>
            <div className="mb-10">
              <Row>
                <Input
                  group
                  label="Nama Pembicara"
                  name="tambahPembicara"
                  control={control}
                  error={errors.tambahPembicara?.message}
                  rules={{ required: true }}
                />
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Mulai Sesi"
                    name="tambahPembicaraWaktuMulai"
                    control={control}
                    error={errors.tambahPembicaraWaktuMulai?.message}
                    rules={{ required: true }}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="tambahPembicaraJamMulai"
                    control={control}
                    error={errors.tambahPembicaraJamMulai?.message}
                    rules={{ required: true }}
                  />
                </Col>
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Selesai Sesi"
                    name="tambahPembicaraWaktuSelesai"
                    control={control}
                    error={errors.tambahPembicaraWaktuSelesai?.message}
                    rules={{ required: true }}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="tambahPembicaraJamSelesai"
                    control={control}
                    error={errors.tambahPembicaraJamSelesai?.message}
                    rules={{ required: true }}
                  />
                </Col>
              </Row>
            </div>
            <div className="d-flex justify-content-end">
              <Button className="br-4 mr-8 px-57 py-13 bg-transparent" variant="light" onClick={handleCloseModal}>
                Batal
              </Button>
              <Button type="submit" className="mx-10" variant="info" style={{ width: '112px' }}>
                Simpan
              </Button>
            </div>
          </Form>
        </Modal>
      )}
      {showModal === 'editPembicara' && (
        <Modal className="cms-bimtek-materi" title="Ubah Pembicara" visible={handleCloseModal} onClose={handleCloseModal}>
          <Form onSubmit={handleSubmit(onEditPembicara)}>
            <div className="mb-10">
              <Row>
                <Input
                  group
                  label="Nama Pembicara"
                  name="tambahPembicaraUpdate"
                  control={control}
                  error={errors.tambahPembicaraUpdate?.message}
                  rules={{ required: true }}
                />
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Mulai Sesi"
                    name="tambahPembicaraWaktuMulaiUpdate"
                    control={control}
                    error={errors.tambahPembicaraWaktuMulaiUpdate?.message}
                    rules={{ required: true }}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="tambahPembicaraJamMulaiUpdate"
                    control={control}
                    error={errors.tambahPembicaraJamMulaiUpdate?.message}
                    rules={{ required: true }}
                  />
                </Col>
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Selesai Sesi"
                    name="tambahPembicaraWaktuSelesaiUpdate"
                    error={errors.tambahPembicaraWaktuSelesaiUpdate?.message}
                    rules={{ required: true }}
                    control={control}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="tambahPembicaraJamSelesaiUpdate"
                    error={errors.tambahPembicaraJamSelesaiUpdate?.message}
                    rules={{ required: true }}
                    control={control}
                  />
                </Col>
              </Row>
            </div>
            <div className="d-flex justify-content-end">
              <Button className="br-4 mr-8 px-57 py-13 bg-transparent" variant="light" onClick={handleCloseModal}>
                Batal
              </Button>
              <Button type="submit" className="mx-10" variant="info" style={{ width: '112px' }}>
                Simpan
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default CMSJadwalBaru;
