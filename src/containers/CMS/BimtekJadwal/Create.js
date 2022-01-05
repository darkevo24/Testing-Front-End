import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { remove } from 'lodash';
import * as yup from 'yup';
import isFunction from 'lodash/isFunction';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { DatePicker, Input, Modal, Table, TextEditor, Notification } from 'components';
import { ReactComponent as Plus } from 'assets/plus.svg';
import { Galery, Close } from 'components/Icons';
import { CMSModal } from 'components/CMSStatusModals';
import SingleSelectDropDown from 'components/DropDown/SingleSelectDropDown';
import { apiUrls, post } from 'utils/request';
import { bimtekJadwalTags, bimtekListKabupaten, getListBimtekTags, getListBimtekKabupaten } from './reducer';

import bn from 'utils/bemNames';
import cx from 'classnames';

const bem = bn('content-create');

const CMSJadwalBaru = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState('');
  const [idPembicara, setIdPembicara] = useState('');
  const [idMateri, setIdMateri] = useState(false);
  const [listMateri, setListMateri] = useState([]);
  const [dataMateri, setDataMateri] = useState([]);
  const [dataPembicara, setDataPembicara] = useState([]);
  const { tagsResult, tagsLoading } = useSelector(bimtekJadwalTags);
  const { listKabupaten } = useSelector(bimtekListKabupaten);

  const tagsResultList = (tagsResult || []).map((tag) => ({ value: tag, label: tag }));
  const tagsResultKabupaten = (listKabupaten || []).map((tag) => ({ value: tag.id, label: tag.nama }));
  const goBack = () => {
    history.push('/cms/bimtek-jadwal');
  };

  useEffect(() => {
    initialCall();
  }, []);

  const initialCall = () => {
    dispatch(getListBimtekTags());
    dispatch(getListBimtekKabupaten());
  };

  const schemaCreate = yup
    .object({
      namaBimtek: yup.string().required(),
      tags: yup.array().required().min(1),
      namaKota: yup.object().required(),
      tanggalMulaiDisetujui: yup.string().required(),
      jamMulaiDisetujui: yup.string().required(),
      tanggalSelesaiDisetujui: yup.string().required(),
      jamSelesaiDisetujui: yup.string().required(),
      dataTempat: yup.string().required(),
    })
    .required();

  const schemaPembicara = yup
    .object({
      tambahPembicara: yup.string().required(),
      tambahPembicaraWaktuMulai: yup.string().required(),
      tambahPembicaraJamMulai: yup.string().required(),
      tambahPembicaraWaktuSelesai: yup.string().required(),
      tambahPembicaraJamSelesai: yup.string().required(),
    })
    .required();

  const schemaEditPembicara = yup
    .object({
      tambahPembicaraUpdate: yup.string().required(),
      tambahPembicaraWaktuMulaiUpdate: yup.string().required(),
      tambahPembicaraJamMulaiUpdate: yup.string().required(),
      tambahPembicaraWaktuSelesaiUpdate: yup.string().required(),
      tambahPembicaraJamSelesaiUpdate: yup.string().required(),
    })
    .required();

  const schemaMateri = yup
    .object({
      namaMateri: yup.string().required(),
    })
    .required();

  const schemaEditMateri = yup
    .object({
      namaMateriUpdate: yup.string().required(),
    })
    .required();

  const {
    control: controlCreate,
    formState: { errors: errorsCreate },
    reset: resetCreate,
    setValue: setValueCreate,
    handleSubmit: handleSubmitCreate,
  } = useForm({
    resolver: yupResolver(schemaCreate),
    defaultValues: {
      namaMateri: '',
      tambahPembicara: '',
      tambahPembicaraWaktuMulai: '',
      tambahPembicaraJamMulai: '',
      tambahPembicaraWaktuSelesai: '',
      tambahPembicaraJamSelesai: '',
      tambahPembicaraUpdate: '',
      tambahPembicaraWaktuMulaiUpdate: '',
      tambahPembicaraWaktuSelesaiUpdate: '',
      tambahPembicaraJamMulaiUpdate: '',
      tambahPembicaraJamSelesaiUpdate: '',
    },
  });

  const {
    control: controlPembicara,
    formState: { errors: errorsPembicara },
    reset: resetPembicara,
    setValue: setValuePembicara,
    handleSubmit: handleSubmitPembicara,
  } = useForm({
    resolver: yupResolver(schemaPembicara),
    defaultValues: {
      tambahPembicara: '',
      tambahPembicaraWaktuMulai: '',
      tambahPembicaraJamMulai: '',
      tambahPembicaraWaktuSelesai: '',
      tambahPembicaraJamSelesai: '',
    },
  });

  const {
    control: controlEditPembicara,
    formState: { errors: errorsEditPembicara },
    reset: resetEditPembicara,
    setValue: setValueEditPembicara,
    handleSubmit: handleSubmitEditPembicara,
  } = useForm({
    resolver: yupResolver(schemaEditPembicara),
    defaultValues: {
      tambahPembicaraUpdate: '',
      tambahPembicaraWaktuMulaiUpdate: '',
      tambahPembicaraJamMulaiUpdate: '',
      tambahPembicaraWaktuSelesaiUpdate: '',
      tambahPembicaraJamSelesaiUpdate: '',
    },
  });

  const {
    control: controlMateri,
    formState: { errors: errorsMateri },
    reset: resetMateri,
    setValue: setValueMateri,
    handleSubmit: handleSubmitMateri,
  } = useForm({
    resolver: yupResolver(schemaMateri),
    defaultValues: {
      namaMateri: '',
    },
  });

  const {
    control: controlEditMateri,
    formState: { errors: errorsEditMateri },
    reset: resetEditMateri,
    setValue: setValueEditMateri,
    handleSubmit: handleSubmitEditMateri,
  } = useForm({
    resolver: yupResolver(schemaEditMateri),
    defaultValues: {
      namaMateriUpdate: '',
    },
  });

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

  const handleCloseModal = () => {
    setShowModal('');
    setListMateri([]);
  };

  const onAddMateri = (data) => {
    if (listMateri.length < 1) {
      handleCloseModal();
      return handleNotification('secondary', 'File Tidak Boleh Kosong', 'cross');
    }
    let newMateri = listMateri.map((item) => ({
      ...item,
      nama: data.namaMateri,
      id: (Math.random() + 1).toString(36).substring(7),
    }));
    setDataMateri([...dataMateri, newMateri[0]]);
    setValueMateri('namaMateri', '');
    handleCloseModal();
    setListMateri([]);
    return handleNotification('secondary', 'Berhasil Menambahkan Materi', 'check');
  };

  const onModalEditMateri = (data) => {
    setIdMateri(data.id);
    setValueEditMateri('namaMateriUpdate', data.nama);
    setListMateri([data]);
    setShowModal('editMateri');
  };

  const onEditMateri = (data) => {
    if (!idMateri) {
      handleCloseModal();
      return handleNotification('secondary', 'Gagal Merubah Materi ', 'cross');
    }
    let obj = listMateri.map((item) => ({
      id: idMateri,
      nama: data.namaMateriUpdate,
      fileName: item.fileName,
      location: item.location,
      fileType: item.fileType,
      size: item.size,
    }));
    let newDataMateri = dataMateri.filter((x) => x.id !== idMateri);
    setDataMateri([...newDataMateri, obj[0]]);
    handleCloseModal();
    setListMateri([]);
    return handleNotification('secondary', 'Berhasil Merubah Materi ', 'check');
  };

  const onDeleteMateri = (data) => {
    let newData = remove(dataMateri, (x) => {
      return x.id !== data;
    });
    setDataMateri(newData);
  };

  const onAddPembicara = (data) => {
    const nama = data.tambahPembicara;
    const tanggalMulai = `${moment(data.tambahPembicaraWaktuMulai).format('YYYY-MM-DD')} ${data.tambahPembicaraJamMulai}:00`;
    const tanggalSelesai = `${moment(data.tambahPembicaraWaktuSelesai).format('YYYY-MM-DD')} ${
      data.tambahPembicaraJamSelesai
    }:00`;
    if (!moment(tanggalSelesai).isAfter(tanggalMulai)) {
      handleCloseModal();
      return handleNotification('secondary', 'Gagal, Rentang Waktu Tidak Valid', 'cross');
    }
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
    setValuePembicara('tambahPembicara', '');
    setValuePembicara('tambahPembicaraWaktuMulai', '');
    setValuePembicara('tambahPembicaraWaktuSelesai', '');
    setValuePembicara('tambahPembicaraJamMulai', '');
    setValuePembicara('tambahPembicaraJamSelesai', '');
    return handleNotification('secondary', 'Berhasil Menambahkan Pembicara', 'check');
  };

  const onModalEditPembicara = (data) => {
    setIdPembicara(data.id);
    setValueEditPembicara('tambahPembicaraUpdate', data.nama);
    setValueEditPembicara('tambahPembicaraWaktuMulaiUpdate', moment(data.tanggalMulai).format('DD/MM/YYYY'));
    setValueEditPembicara('tambahPembicaraWaktuSelesaiUpdate', moment(data.tanggalSelesai).format('DD/MM/YYYY'));
    setValueEditPembicara('tambahPembicaraJamMulaiUpdate', moment(data.tanggalMulai).format('HH:mm'));
    setValueEditPembicara('tambahPembicaraJamSelesaiUpdate', moment(data.tanggalSelesai).format('HH:mm'));
    setShowModal('editPembicara');
  };

  const onEditPembicara = (data) => {
    if (!idPembicara) {
      handleCloseModal();
      return handleNotification('secondary', 'Gagal Merubah Pembicara ', 'cross');
    }
    let tanggalMulaiCheck = moment(data.tambahPembicaraWaktuMulaiUpdate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    let tanggalSelesaiCheck = moment(data.tambahPembicaraWaktuSelesaiUpdate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    if (tanggalMulaiCheck === 'Invalid date') {
      tanggalMulaiCheck = moment(data.tambahPembicaraWaktuMulaiUpdate).format('YYYY-MM-DD');
    }
    if (tanggalSelesaiCheck === 'Invalid date') {
      tanggalSelesaiCheck = moment(data.tambahPembicaraWaktuSelesaiUpdate).format('YYYY-MM-DD');
    }
    if (!moment(tanggalSelesaiCheck).isAfter(tanggalMulaiCheck)) {
      handleCloseModal();
      return handleNotification('secondary', 'Gagal, Rentang Waktu Tidak Valid', 'cross');
    }
    const nama = data.tambahPembicaraUpdate;
    const tanggalMulai = `${tanggalMulaiCheck} ${data.tambahPembicaraJamMulaiUpdate}:00`;
    const tanggalSelesai = `${tanggalSelesaiCheck} ${data.tambahPembicaraJamSelesaiUpdate}:00`;
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
    return handleNotification('secondary', 'Berhasil Merubah Pembicara ', 'check');
  };

  const onDeletePembicara = (data) => {
    let newData = remove(dataPembicara, (x) => {
      return x.id !== data;
    });
    setDataPembicara(newData);
    return handleNotification('secondary', 'Berhasil Menghapus Pembicara', 'check');
  };

  const handleProses = () => {
    setShowModal('proses');
  };

  const onProses = (data) => {
    if (dataPembicara.length < 1) {
      handleCloseModal();
      return handleNotification('secondary', 'Gagal, Pembicara Harus Diisi', 'cross');
    }
    if (!data.namaKota.value) {
      handleCloseModal();
      return handleNotification('secondary', 'Gagal, Kota Pelaksana Harus Diisi', 'cross');
    }
    let listPembicara = dataPembicara;
    listPembicara.map((x) => {
      delete x['id'];
    });
    let listMateri = dataMateri;
    listMateri.map((x) => {
      delete x['id'];
    });
    let tanggalMulaiDisetujui = `${moment(data.tanggalMulaiDisetujui).format('YYYY-MM-DD')} ${data.jamMulaiDisetujui}:00`,
      tanggalSelesaiDisetujui = `${moment(data.tanggalSelesaiDisetujui).format('YYYY-MM-DD')} ${
        data.jamSelesaiDisetujui
      }:00`;
    if (!moment(tanggalSelesaiDisetujui).isAfter(tanggalMulaiDisetujui)) {
      handleCloseModal();
      return handleNotification('secondary', 'Gagal, Rentang Waktu Tidak Valid', 'cross');
    }
    let obj = {
      namaBimtek: data.namaBimtek,
      tagMateri: data.tags.map((elem) => elem.label) || [],
      tanggalMulaiDisetujui,
      tanggalSelesaiDisetujui,
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
    handleAPICall(post, `${apiUrls.cmsBimtekJadwal}`, { data: obj }, goBack);
  };

  const openUploadForm = (id) => {
    if (idMateri) {
      if (listMateri.length >= 1) handleCloseModal();
      return handleNotification('secondary', 'Error, Maksimal File Edit 1', 'cross');
    }
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
        <>
          <span>
            {rest.row.original?.tanggalMulai ? moment(rest.row.original?.tanggalMulai).format('DD MMMM YYYY') + ' ' : '---'}
            {rest.row.original?.tanggalMulai ? moment(rest.row.original?.tanggalMulai).format('HH:mm') : '---'}
          </span>
          <span> - </span>
          <span>
            {rest.row.original?.tanggalSelesai
              ? moment(rest.row.original?.tanggalSelesai).format('DD MMMM YYYY') + ' '
              : '---'}
            {rest.row.original?.tanggalSelesai ? moment(rest.row.original?.tanggalSelesai).format('HH:mm') : '---'}
          </span>
        </>
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
          <Button
            variant="outline-none"
            className="bg-white sdp-text-blue p-0 mr-10"
            onClick={() => onModalEditMateri(rest.row.original)}>
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
          <Button className="ml-10" variant="info" style={{ width: '112px' }} onClick={handleSubmitCreate(handleProses)}>
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
            control={controlCreate}
            error={errorsCreate.namaBimtek?.message}
            rules={{ required: true }}
          />
          <SingleSelectDropDown
            group
            groupClass="mb-16"
            isMulti
            control={controlCreate}
            label="Kategori Bimtek"
            labelClass="sdp-form-label fw-normal"
            placeholder=""
            name="tags"
            data={tagsResultList}
            loading={tagsLoading}
            isCreatable={true}
            error={errorsCreate.tags?.message}
            rules={{ required: true }}
          />
          <Row className="align-items-end mb-15">
            <Col>
              <DatePicker
                group
                label="Tanggal Mulai Pelaksanaan Disetujui"
                name="tanggalMulaiDisetujui"
                control={controlCreate}
                error={errorsCreate.tanggalMulaiDisetujui?.message}
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
                control={controlCreate}
                error={errorsCreate.jamMulaiDisetujui?.message}
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
                control={controlCreate}
                error={errorsCreate.tanggalSelesaiDisetujui?.message}
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
                control={controlCreate}
                error={errorsCreate.jamSelesaiDisetujui?.message}
                rules={{ required: true }}
              />
            </Col>
          </Row>
          <SingleSelectDropDown
            group
            groupClass="mb-16"
            control={controlCreate}
            label="Kota Pelaksana"
            labelClass="sdp-form-label fw-normal"
            placeholder=""
            name="namaKota"
            control={controlCreate}
            data={[{ value: '', label: 'All' }, ...tagsResultKabupaten]}
            loading={tagsLoading}
            isCreatable={true}
            error={errorsCreate.namaKota?.message}
            rules={{ required: true }}
          />
          <Input
            group
            className="mb-10"
            type="text"
            label="Tempat"
            name="dataTempat"
            control={controlCreate}
            error={errorsCreate.dataTempat?.message}
            rules={{ required: true }}
          />
          <div className="pembicara">
            <div className="d-flex justify-content-between">
              <span className="fw-bold mb-10 d-block"> Pembicara </span>
              <Button variant="outline-none" onClick={() => setShowModal('pembicara')}>
                <Plus /> <span className="fw-bold text-danger"> Tambah Pembicara </span>
              </Button>
            </div>
            <Table {...tableConfigPembicara} />
          </div>
          <div className="materi">
            <div className="d-flex justify-content-between">
              <span className="fw-bold mb-10 d-block"> Materi </span>
              <Button variant="outline-none" onClick={() => setShowModal('materi')}>
                <Plus /> <span className="fw-bold text-danger"> Tambah Materi </span>
              </Button>
            </div>
            <span className="fw-bold mb-10 d-block"> Materi </span>
            <Table {...tableConfigMateri} />
          </div>
        </Col>
      </div>
      {showModal === 'proses' && (
        <CMSModal
          onClose={handleCloseModal}
          label="Simpan Jadwal Bimtek?"
          confirmButtonAction={handleSubmitCreate(onProses)}
        />
      )}
      {showModal === 'materi' && (
        <Modal
          className="cms-bimtek-materi"
          title="Tambah Materi Baru"
          onClose={handleCloseModal}
          visible={handleCloseModal}>
          <Form onSubmit={handleSubmitMateri(onAddMateri)}>
            <div>
              <Input
                group
                label="Materi"
                name="namaMateri"
                control={controlMateri}
                error={errorsMateri.namaMateri?.message}
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
                <Button className="br-4 mr-8 px-40 py-5 bg-transparent" variant="outline-none" onClick={handleCloseModal}>
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
      {showModal === 'editMateri' && (
        <Modal className="cms-bimtek-materi" title="Ubah Materi" onClose={handleCloseModal} visible={handleCloseModal}>
          <Form onSubmit={handleSubmitEditMateri(onEditMateri)}>
            <div>
              <Input
                group
                label="Materi"
                name="namaMateriUpdate"
                control={controlEditMateri}
                error={errorsEditMateri.namaMateriUpdate?.message}
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
                <Button className="br-4 mr-8 px-40 py-5 bg-transparent" variant="outline-none" onClick={handleCloseModal}>
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
          <Form onSubmit={handleSubmitPembicara(onAddPembicara)}>
            <div className="mb-10">
              <Row>
                <Input
                  group
                  label="Nama Pembicara"
                  name="tambahPembicara"
                  control={controlPembicara}
                  error={errorsPembicara.tambahPembicara?.message}
                  rules={{ required: true }}
                />
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Mulai Sesi"
                    name="tambahPembicaraWaktuMulai"
                    control={controlPembicara}
                    error={errorsPembicara.tambahPembicaraWaktuMulai?.message}
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
                    control={controlPembicara}
                    error={errorsPembicara.tambahPembicaraJamMulai?.message}
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
                    control={controlPembicara}
                    error={errorsPembicara.tambahPembicaraWaktuSelesai?.message}
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
                    control={controlPembicara}
                    error={errorsPembicara.tambahPembicaraJamSelesai?.message}
                    rules={{ required: true }}
                  />
                </Col>
              </Row>
            </div>
            <div className="d-flex justify-content-end">
              <Button className="br-4 mr-8 px-40 py-5 bg-transparent" variant="outline-none" onClick={handleCloseModal}>
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
          <Form onSubmit={handleSubmitEditPembicara(onEditPembicara)}>
            <div className="mb-10">
              <Row>
                <Input
                  group
                  label="Nama Pembicara"
                  name="tambahPembicaraUpdate"
                  control={controlEditPembicara}
                  error={errorsEditPembicara.tambahPembicaraUpdate?.message}
                  rules={{ required: true }}
                />
              </Row>
              <Row className="align-items-end">
                <Col>
                  <DatePicker
                    group
                    label="Tanggal Mulai Sesi"
                    name="tambahPembicaraWaktuMulaiUpdate"
                    control={controlEditPembicara}
                    error={errorsEditPembicara.tambahPembicaraWaktuMulaiUpdate?.message}
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
                    control={controlEditPembicara}
                    error={errorsEditPembicara.tambahPembicaraJamMulaiUpdate?.message}
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
                    error={errorsEditPembicara.tambahPembicaraWaktuSelesaiUpdate?.message}
                    rules={{ required: true }}
                    control={controlEditPembicara}
                  />
                </Col>
                <Col>
                  <Input
                    group
                    className="m-0"
                    type="time"
                    label=""
                    name="tambahPembicaraJamSelesaiUpdate"
                    error={errorsEditPembicara.tambahPembicaraJamSelesaiUpdate?.message}
                    rules={{ required: true }}
                    control={controlEditPembicara}
                  />
                </Col>
              </Row>
            </div>
            <div className="d-flex justify-content-end">
              <Button className="br-4 mr-8 px-40 py-5 bg-transparent" variant="outline-none" onClick={handleCloseModal}>
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
